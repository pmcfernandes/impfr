using System.Text.Json;
using ImPedro.Storage.Models;
using Microsoft.Extensions.Options;

namespace ImPedro.Storage;

public sealed class LocalFileStorage : IFileStorage
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly string _root;

    public LocalFileStorage(IOptions<StorageOptions> options)
    {
        var root = options.Value.RootPath;
        if (string.IsNullOrWhiteSpace(root)) root = Path.Combine(AppContext.BaseDirectory, "uploads");
        _root = Path.GetFullPath(root);
        Directory.CreateDirectory(_root);
    }

    public async Task<StoredFile> SaveAsync(
        Stream content,
        string originalName,
        string? contentType,
        CancellationToken cancellationToken = default)
    {
        var extension = Path.GetExtension(originalName ?? string.Empty).ToLowerInvariant();
        var name = Guid.NewGuid().ToString("N") + extension;
        var path = Resolve(name);

        await using (var file = new FileStream(path, FileMode.CreateNew, FileAccess.Write, FileShare.None, 81920, useAsync: true))
        {
            await content.CopyToAsync(file, cancellationToken);
        }

        var info = new FileInfo(path);
        var stored = new StoredFile(
            name,
            string.IsNullOrWhiteSpace(originalName) ? name : originalName,
            contentType,
            info.Length,
            DateTime.UtcNow);
        await File.WriteAllTextAsync(SidecarPath(path), JsonSerializer.Serialize(stored, JsonOptions), cancellationToken);
        return stored;
    }

    public Task<(Stream Content, StoredFile File)> OpenReadAsync(string name, CancellationToken cancellationToken = default)
    {
        var path = Resolve(name);
        if (!File.Exists(path)) throw new FileNotFoundException($"File '{name}' not found.");
        Stream content = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 81920, useAsync: true);
        return Task.FromResult((content, ReadMetadata(path, name)));
    }

    public Task<bool> DeleteAsync(string name, CancellationToken cancellationToken = default)
    {
        var path = Resolve(name);
        var deleted = false;
        if (File.Exists(path))
        {
            File.Delete(path);
            deleted = true;
        }
        var sidecar = SidecarPath(path);
        if (File.Exists(sidecar)) File.Delete(sidecar);
        return Task.FromResult(deleted);
    }

    public Task<bool> ExistsAsync(string name, CancellationToken cancellationToken = default)
        => Task.FromResult(File.Exists(Resolve(name)));

    public Task<IReadOnlyList<StoredFile>> ListAsync(CancellationToken cancellationToken = default)
    {
        var files = Directory
            .EnumerateFiles(_root, "*", SearchOption.TopDirectoryOnly)
            .Where(path => !path.EndsWith(".meta", StringComparison.OrdinalIgnoreCase))
            .Select(path => ReadMetadata(path, Path.GetFileName(path)))
            .OrderByDescending(file => file.StoredAtUtc)
            .ToList();
        return Task.FromResult<IReadOnlyList<StoredFile>>(files);
    }

    internal string Resolve(string name)
    {
        if (string.IsNullOrWhiteSpace(name)
            || name.IndexOfAny(['/', '\\']) >= 0
            || name.Contains("..", StringComparison.Ordinal)
            || name == "."
            || Path.IsPathRooted(name))
            throw new ArgumentException("Invalid file name.", nameof(name));

        var full = Path.GetFullPath(Path.Combine(_root, name));
        if (!full.StartsWith(_root + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase))
            throw new ArgumentException("Invalid file name.", nameof(name));
        return full;
    }

    private static string SidecarPath(string path) => path + ".meta";

    private static StoredFile ReadMetadata(string path, string name)
    {
        var sidecar = SidecarPath(path);
        if (File.Exists(sidecar))
        {
            try
            {
                var stored = JsonSerializer.Deserialize<StoredFile>(File.ReadAllText(sidecar), JsonOptions);
                if (stored is not null) return stored with { Size = new FileInfo(path).Length };
            }
            catch (Exception ex) when (ex is IOException or JsonException)
            {
                // Fall through to synthesized metadata.
            }
        }
        var fallback = new FileInfo(path);
        return new StoredFile(name, name, null, fallback.Length, fallback.LastWriteTimeUtc);
    }
}
