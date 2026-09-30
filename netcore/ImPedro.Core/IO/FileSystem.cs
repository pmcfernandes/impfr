using System.Security.Cryptography;
using System.Text;
using System.Globalization;

namespace ImPedro.Core.IO;

public static class FileSystem
{
    private static readonly HashSet<string> ImageExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".gif", ".bmp", ".png", ".tif", ".tiff", ".webp",
    };

    public static async Task<string> ComputeSha256Async(string path, CancellationToken cancellationToken = default)
    {
        await using var stream = File.OpenRead(path);
        var hash = await SHA256.HashDataAsync(stream, cancellationToken);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }

    public static void MakeWritable(string path)
    {
        if (!File.Exists(path)) return;
        File.SetAttributes(path, File.GetAttributes(path) & ~FileAttributes.ReadOnly);
    }

    public static void RemoveReadOnlyAndHidden(string path)
    {
        if (!File.Exists(path)) return;
        File.SetAttributes(path, File.GetAttributes(path) & ~(FileAttributes.ReadOnly | FileAttributes.Hidden));
    }

    public static bool HasBlockedAttributes(FileAttributes attributes)
        => (attributes & (FileAttributes.Hidden | FileAttributes.System | FileAttributes.ReadOnly)) != 0;

    public static async Task<bool> CopyFileAsync(string source, string destination, FileCopyMode mode = FileCopyMode.Overwrite, CancellationToken cancellationToken = default)
    {
        if (!File.Exists(source)) return false;
        var destinationDirectory = Path.GetDirectoryName(Path.GetFullPath(destination));
        Directory.CreateDirectory(destinationDirectory!);
        var exists = File.Exists(destination);
        if (mode == FileCopyMode.SkipExisting && exists) return false;
        if (mode == FileCopyMode.IfSourceIsNewer && exists && File.GetLastWriteTimeUtc(source) <= File.GetLastWriteTimeUtc(destination)) return false;

        RemoveReadOnlyAndHidden(destination);
        await using var input = File.Open(source, FileMode.Open, FileAccess.Read, FileShare.Read);
        await using var output = File.Open(destination, FileMode.Create, FileAccess.Write, FileShare.None);
        await input.CopyToAsync(output, cancellationToken);
        return true;
    }

    public static async Task<bool> AreEqualAsync(string firstPath, string secondPath, CancellationToken cancellationToken = default)
    {
        if (string.Equals(Path.GetFullPath(firstPath), Path.GetFullPath(secondPath), StringComparison.OrdinalIgnoreCase)) return true;
        var first = new FileInfo(firstPath);
        var second = new FileInfo(secondPath);
        if (!first.Exists || !second.Exists || first.Length != second.Length) return false;

        await using var firstStream = first.OpenRead();
        await using var secondStream = second.OpenRead();
        var firstBuffer = new byte[81_920];
        var secondBuffer = new byte[81_920];
        while (true)
        {
            var firstRead = await firstStream.ReadAsync(firstBuffer, cancellationToken);
            var secondRead = await secondStream.ReadAsync(secondBuffer, cancellationToken);
            if (firstRead != secondRead) return false;
            if (firstRead == 0) return true;
            if (!firstBuffer.AsSpan(0, firstRead).SequenceEqual(secondBuffer.AsSpan(0, secondRead))) return false;
        }
    }

    public static bool IsDirectoryEmpty(string path) => !Directory.EnumerateFileSystemEntries(path).Any();

    public static string TempFilePath(string extension)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(extension);
        return Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString("N") + (extension.StartsWith('.') ? extension : "." + extension));
    }

    public static bool IsFileLocked(string path)
    {
        try
        {
            using var stream = File.Open(path, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
            return false;
        }
        catch (IOException)
        {
            return true;
        }
    }

    public static bool IsImageFile(string path) => ImageExtensions.Contains(Path.GetExtension(path));

    public static string NormalizePath(string path)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(path);
        var fullPath = Path.GetFullPath(path);
        var root = Path.GetPathRoot(fullPath)!;
        return fullPath.Equals(root, StringComparison.OrdinalIgnoreCase)
            ? fullPath
            : fullPath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
    }

    public static string SanitizeFileName(string name, char replacement = '_')
    {
        ArgumentNullException.ThrowIfNull(name);
        var invalid = Path.GetInvalidFileNameChars();
        var output = new StringBuilder(name.Length);
        foreach (var character in name) output.Append(invalid.Contains(character) ? replacement : character);
        return output.ToString().TrimEnd('.', ' ');
    }

    public static IReadOnlyList<FileInfo> ListFiles(string directory, bool recursive = false)
    {
        if (!Directory.Exists(directory)) return [];
        return Directory.EnumerateFiles(directory, "*", recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly)
            .Select(path => new FileInfo(path)).ToArray();
    }

    public static IReadOnlyList<DirectoryInfo> ListDirectories(string directory)
    {
        if (!Directory.Exists(directory)) return [];
        return Directory.EnumerateDirectories(directory).Select(path => new DirectoryInfo(path)).ToArray();
    }

    public static void DeleteFilesOlderThan(string directory, DateTime cutoffUtc, bool recursive = false)
        => DeleteFiles(directory, cutoffUtc, older: true, recursive);

    public static void DeleteFilesNewerThan(string directory, DateTime cutoffUtc, bool recursive = false)
        => DeleteFiles(directory, cutoffUtc, older: false, recursive);

    public static async Task CopyDirectoryAsync(string source, string destination, bool recursive = true, FileCopyMode mode = FileCopyMode.Overwrite, CancellationToken cancellationToken = default)
    {
        if (!Directory.Exists(source)) throw new DirectoryNotFoundException($"Source directory '{source}' was not found.");
        Directory.CreateDirectory(destination);
        foreach (var file in Directory.EnumerateFiles(source))
            await CopyFileAsync(file, Path.Combine(destination, Path.GetFileName(file)), mode, cancellationToken);
        if (!recursive) return;
        foreach (var directory in Directory.EnumerateDirectories(source))
            await CopyDirectoryAsync(directory, Path.Combine(destination, Path.GetFileName(directory)), true, mode, cancellationToken);
    }

    public static async Task<IReadOnlyList<string>> SplitFileAsync(string path, int segmentLength, CancellationToken cancellationToken = default)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(segmentLength);
        await using var input = File.OpenRead(path);
        var segments = new List<string>();
        var buffer = new byte[Math.Min(segmentLength, 81_920)];
        for (var part = 1; input.Position < input.Length; part++)
        {
            var segment = $"{path}.{part:D3}";
            await using var output = File.Open(segment, FileMode.Create, FileAccess.Write, FileShare.None);
            var remaining = segmentLength;
            while (remaining > 0)
            {
                var read = await input.ReadAsync(buffer.AsMemory(0, Math.Min(buffer.Length, remaining)), cancellationToken);
                if (read == 0) break;
                await output.WriteAsync(buffer.AsMemory(0, read), cancellationToken);
                remaining -= read;
            }
            segments.Add(segment);
        }
        return segments;
    }

    public static async Task JoinFilesAsync(IEnumerable<string> paths, string destination, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(paths);
        var sources = paths.ToArray();
        if (sources.Length == 0) throw new ArgumentException("At least one source file is required.", nameof(paths));
        var directory = Path.GetDirectoryName(Path.GetFullPath(destination));
        Directory.CreateDirectory(directory!);
        await using var output = File.Open(destination, FileMode.Create, FileAccess.Write, FileShare.None);
        foreach (var path in sources)
        {
            await using var input = File.OpenRead(path);
            await input.CopyToAsync(output, cancellationToken);
        }
    }

    public static string ToReadableSize(long bytes)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(bytes);
        string[] units = ["B", "KB", "MB", "GB", "TB"];
        double size = bytes;
        var unit = 0;
        while (size >= 1024 && unit < units.Length - 1)
        {
            size /= 1024;
            unit++;
        }
        return size.ToString("0.##", CultureInfo.InvariantCulture) + " " + units[unit];
    }

    private static void DeleteFiles(string directory, DateTime cutoffUtc, bool older, bool recursive)
    {
        foreach (var file in ListFiles(directory, recursive))
        {
            var match = older ? file.LastWriteTimeUtc < cutoffUtc : file.LastWriteTimeUtc > cutoffUtc;
            if (match) file.Delete();
        }
    }
}
