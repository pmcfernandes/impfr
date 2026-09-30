using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace ImPedro.Core.Imaging;

public static class ImageColor
{
    public static Rgba32 FromHex(string value) => Color.ParseHex(value).ToPixel<Rgba32>();

    public static string ToHtmlHex(this Rgba32 value) => $"#{value.R:X2}{value.G:X2}{value.B:X2}";

    public static Rgba32 Opposite(this Rgba32 value) => new((byte)(255 - value.R), (byte)(255 - value.G), (byte)(255 - value.B), value.A);

    public static Rgba32 Lerp(this Rgba32 start, Rgba32 end, float amount)
    {
        amount = Math.Clamp(amount, 0, 1);
        return new Rgba32(
            (byte)MathF.Round(start.R + (end.R - start.R) * amount),
            (byte)MathF.Round(start.G + (end.G - start.G) * amount),
            (byte)MathF.Round(start.B + (end.B - start.B) * amount),
            (byte)MathF.Round(start.A + (end.A - start.A) * amount));
    }

    public static Rgba32 AverageColor(this Image<Rgba32> image)
    {
        ArgumentNullException.ThrowIfNull(image);
        if (image.Width == 0 || image.Height == 0) return default;
        long red = 0, green = 0, blue = 0, alpha = 0;
        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
                foreach (var pixel in accessor.GetRowSpan(y))
                {
                    red += pixel.R;
                    green += pixel.G;
                    blue += pixel.B;
                    alpha += pixel.A;
                }
        });
        var count = (long)image.Width * image.Height;
        return new Rgba32((byte)(red / count), (byte)(green / count), (byte)(blue / count), (byte)(alpha / count));
    }
}
