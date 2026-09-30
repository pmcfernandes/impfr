using System.Text;

namespace ImPedro.Core.IO;

public static class StreamExtensions
{
    public static MemoryStream ToUtf8Stream(this string value)
    {
        ArgumentNullException.ThrowIfNull(value);
        return new MemoryStream(Encoding.UTF8.GetBytes(value), writable: false);
    }

    public static MemoryStream ToMemoryStream(this byte[] bytes)
    {
        ArgumentNullException.ThrowIfNull(bytes);
        return new MemoryStream(bytes.ToArray(), writable: false);
    }

    public static async Task<byte[]> ReadAllBytesAsync(this Stream stream, bool rewind = true, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(stream);
        var originalPosition = stream.CanSeek ? stream.Position : 0;
        if (rewind && stream.CanSeek) stream.Position = 0;
        try
        {
            await using var output = new MemoryStream();
            await stream.CopyToAsync(output, cancellationToken);
            return output.ToArray();
        }
        finally
        {
            if (stream.CanSeek) stream.Position = originalPosition;
        }
    }

    public static async Task<string> ReadUtf8Async(this Stream stream, bool rewind = true, CancellationToken cancellationToken = default)
        => Encoding.UTF8.GetString(await stream.ReadAllBytesAsync(rewind, cancellationToken));

    public static Task WriteAllBytesAsync(this Stream stream, ReadOnlyMemory<byte> bytes, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(stream);
        return stream.WriteAsync(bytes, cancellationToken).AsTask();
    }

    public static Task CopyToStreamAsync(this Stream source, Stream destination, int bufferSize = 81_920, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(source);
        ArgumentNullException.ThrowIfNull(destination);
        return source.CopyToAsync(destination, bufferSize, cancellationToken);
    }

    public static string ToCommaSeparatedBytes(this ReadOnlySpan<byte> bytes) => string.Join(',', bytes.ToArray());
}
