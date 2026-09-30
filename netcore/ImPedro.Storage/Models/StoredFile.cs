namespace ImPedro.Storage.Models;

public sealed record StoredFile(
    string Name,
    string OriginalName,
    string? ContentType,
    long Size,
    DateTime StoredAtUtc);
