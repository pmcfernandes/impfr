using ImPedro.Storage.Models;

namespace ImPedro.Storage;

public interface IFileStorage
{
    Task<StoredFile> SaveAsync(
        Stream content,
        string originalName,
        string? contentType,
        CancellationToken cancellationToken = default);
    Task<(Stream Content, StoredFile File)> OpenReadAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string name, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<StoredFile>> ListAsync(CancellationToken cancellationToken = default);
}
