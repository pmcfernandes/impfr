using ImPedro.Storage.Models;
using Microsoft.Extensions.Options;

namespace ImPedro.Storage.Services;

public sealed class UploadService
{
    private readonly IFileStorage _storage;
    private readonly StorageOptions _options;

    public UploadService(IFileStorage storage, IOptions<StorageOptions> options)
    {
        _storage = storage;
        _options = options.Value;
    }

    public Task<StoredFile> UploadAsync(
        Stream content,
        string? originalName,
        string? contentType,
        CancellationToken cancellationToken = default)
    {
        var safeName = string.IsNullOrWhiteSpace(originalName) ? "file" : Path.GetFileName(originalName.Trim());
        if (safeName.Length == 0) safeName = "file";

        var extension = Path.GetExtension(safeName).ToLowerInvariant();
        if (_options.AllowedExtensions.Length > 0
            && !_options.AllowedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
            throw new InvalidOperationException($"Extension '{extension}' is not allowed.");

        if (_options.MaxFileBytes > 0 && content.CanSeek && content.Length - content.Position > _options.MaxFileBytes)
            throw new InvalidOperationException($"File exceeds the {_options.MaxFileBytes} bytes limit.");

        return _storage.SaveAsync(content, safeName, contentType, cancellationToken);
    }

    public Task<(Stream Content, StoredFile File)> DownloadAsync(string name, CancellationToken cancellationToken = default)
        => _storage.OpenReadAsync(name, cancellationToken);

    public Task<bool> ExistsAsync(string name, CancellationToken cancellationToken = default)
        => _storage.ExistsAsync(name, cancellationToken);

    public Task<bool> DeleteAsync(string name, CancellationToken cancellationToken = default)
        => _storage.DeleteAsync(name, cancellationToken);

    public Task<IReadOnlyList<StoredFile>> ListAsync(CancellationToken cancellationToken = default)
        => _storage.ListAsync(cancellationToken);
}
