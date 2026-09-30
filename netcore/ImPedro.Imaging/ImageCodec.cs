using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace ImPedro.Core.Imaging;

public static class ImageCodec
{
    public static async Task<Image<Rgba32>> LoadAsync(Stream stream, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(stream);
        return await Image.LoadAsync<Rgba32>(stream, cancellationToken);
    }

    public static async Task<Image<Rgba32>> LoadAsync(string path, CancellationToken cancellationToken = default)
    {
        await using var stream = File.OpenRead(path);
        return await LoadAsync(stream, cancellationToken);
    }

    public static async Task SaveAsync(this Image<Rgba32> image, string path, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(image);
        var directory = Path.GetDirectoryName(Path.GetFullPath(path));
        Directory.CreateDirectory(directory!);
        var extension = Path.GetExtension(path).ToLowerInvariant();
        await using var stream = File.Open(path, FileMode.Create, FileAccess.Write, FileShare.None);
        switch (extension)
        {
            case ".jpg" or ".jpeg": await image.SaveAsJpegAsync(stream, cancellationToken); break;
            case ".gif": await image.SaveAsGifAsync(stream, cancellationToken); break;
            case ".bmp": await image.SaveAsBmpAsync(stream, cancellationToken); break;
            case ".webp": await image.SaveAsWebpAsync(stream, cancellationToken); break;
            default: await image.SaveAsPngAsync(stream, cancellationToken); break;
        }
    }

    public static async Task<string> ToBase64PngAsync(this Image<Rgba32> image, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(image);
        await using var stream = new MemoryStream();
        await image.SaveAsPngAsync(stream, cancellationToken);
        return Convert.ToBase64String(stream.ToArray());
    }

    public static async Task<Image<Rgba32>> FromBase64Async(string value, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(value);
        await using var stream = new MemoryStream(Convert.FromBase64String(value), writable: false);
        return await LoadAsync(stream, cancellationToken);
    }
}
