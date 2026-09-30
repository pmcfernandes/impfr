using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ImPedro.Jobs.Jobs;

public sealed class TempCleanupJob
{
    private readonly JobsOptions _options;
    private readonly ILogger<TempCleanupJob> _logger;

    public TempCleanupJob(IOptions<JobsOptions> options, ILogger<TempCleanupJob> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public Task ExecuteAsync(Hangfire.IJobCancellationToken cancellationToken)
    {
        if (_options.TempRetentionDays <= 0)
        {
            _logger.LogInformation("TempCleanupJob skipped: retention is disabled.");
            return Task.CompletedTask;
        }

        var folder = ResolveFolder(_options.TempFolderPath);
        if (IsDangerousRoot(folder))
        {
            _logger.LogWarning("TempCleanupJob skipped: refusing to clean '{Folder}'.", folder);
            return Task.CompletedTask;
        }
        if (!Directory.Exists(folder))
        {
            _logger.LogInformation("TempCleanupJob skipped: folder '{Folder}' does not exist.", folder);
            return Task.CompletedTask;
        }

        var cutoff = DateTime.Now.AddDays(-_options.TempRetentionDays);
        long freedBytes = 0;
        var deletedFiles = 0;
        var deletedDirs = 0;
        var errors = 0;
        var checkedFiles = 0;

        foreach (var file in EnumerateFilesSafe(folder))
        {
            if (checkedFiles++ % 100 == 0) cancellationToken.ThrowIfCancellationRequested();

            FileInfo info;
            try
            {
                info = new FileInfo(file);
                if (info.LastWriteTime >= cutoff) continue;
                freedBytes += info.Exists ? info.Length : 0;
                info.Attributes = FileAttributes.Normal;
                info.Delete();
                deletedFiles++;
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                errors++;
                _logger.LogWarning(ex, "TempCleanupJob could not delete file '{File}'.", file);
            }
        }

        var dirs = EnumerateDirectoriesSafe(folder)
            .OrderByDescending(d => d.Count(c => c == Path.DirectorySeparatorChar))
            .ToList();
        foreach (var dir in dirs)
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                if (!Directory.EnumerateFileSystemEntries(dir).Any())
                {
                    Directory.Delete(dir);
                    deletedDirs++;
                }
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                errors++;
                _logger.LogWarning(ex, "TempCleanupJob could not delete directory '{Directory}'.", dir);
            }
        }

        _logger.LogInformation(
            "TempCleanupJob finished on '{Folder}': {Files} files ({Bytes} bytes) and {Dirs} empty directories removed, {Errors} errors.",
            folder, deletedFiles, freedBytes, deletedDirs, errors);
        return Task.CompletedTask;
    }

    internal static string ResolveFolder(string? configured)
    {
        string raw;
        if (string.IsNullOrWhiteSpace(configured))
        {
            raw = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Temp");
        }
        else
        {
            raw = configured.Trim();
            if (raw.StartsWith("~", StringComparison.Ordinal))
                raw = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + raw.Substring(1);
        }
        return Path.GetFullPath(raw);
    }

    internal static bool IsDangerousRoot(string folder)
    {
        if (string.IsNullOrWhiteSpace(folder)) return true;

        var full = Path.GetFullPath(folder.Trim()).TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        var root = Path.GetPathRoot(full)?.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        if (string.Equals(full, root, StringComparison.OrdinalIgnoreCase)) return true;

        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile).TrimEnd(Path.DirectorySeparatorChar);
        if (!string.IsNullOrEmpty(home) && string.Equals(full, home, StringComparison.OrdinalIgnoreCase)) return true;

        string[] protectedDirs =
        [
            Environment.GetFolderPath(Environment.SpecialFolder.Windows),
            Environment.GetFolderPath(Environment.SpecialFolder.System),
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
        ];
        return protectedDirs
            .Where(d => !string.IsNullOrEmpty(d))
            .Any(d => string.Equals(full, d.TrimEnd(Path.DirectorySeparatorChar), StringComparison.OrdinalIgnoreCase));
    }

    private static IEnumerable<string> EnumerateFilesSafe(string root)
    {
        foreach (var entry in EnumerateEntriesSafe(root, includeFiles: true, includeDirectories: false))
            yield return entry;
    }

    private static IEnumerable<string> EnumerateDirectoriesSafe(string root)
    {
        foreach (var entry in EnumerateEntriesSafe(root, includeFiles: false, includeDirectories: true))
            yield return entry;
    }

    private static IEnumerable<string> EnumerateEntriesSafe(string root, bool includeFiles, bool includeDirectories)
    {
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var stack = new Stack<string>();
        stack.Push(Path.GetFullPath(root));

        while (stack.Count > 0)
        {
            var dir = stack.Pop();
            if (!visited.Add(dir)) continue;

            string[] entries;
            try
            {
                entries = Directory.GetFileSystemEntries(dir);
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                continue;
            }

            foreach (var entry in entries)
            {
                FileAttributes attributes;
                try
                {
                    attributes = File.GetAttributes(entry);
                }
                catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
                {
                    continue;
                }

                var isDirectory = (attributes & FileAttributes.Directory) != 0;
                var isReparsePoint = (attributes & FileAttributes.ReparsePoint) != 0;
                if (isDirectory)
                {
                    if (includeDirectories) yield return entry;
                    if (!isReparsePoint) stack.Push(entry);
                }
                else if (includeFiles)
                {
                    yield return entry;
                }
            }
        }
    }
}
