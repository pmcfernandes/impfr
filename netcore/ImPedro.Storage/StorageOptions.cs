namespace ImPedro.Storage;

public sealed class StorageOptions
{
    public string RootPath { get; set; } = string.Empty;

    public long MaxFileBytes { get; set; } = 10 * 1024 * 1024;

    public string[] AllowedExtensions { get; set; } = [];
}
