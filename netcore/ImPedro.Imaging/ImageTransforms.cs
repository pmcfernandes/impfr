using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ImPedro.Core.Imaging;

public static class ImageTransforms
{
    public static bool IsSupportedImagePath(string path)
        => Path.GetExtension(path) is ".jpg" or ".jpeg" or ".png" or ".gif" or ".bmp" or ".webp" or ".tif" or ".tiff";

    public static Size ResizeToFit(Size source, int maxWidth, int maxHeight, bool allowEnlarge = false)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(maxWidth);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(maxHeight);
        if (source.Width <= 0 || source.Height <= 0) throw new ArgumentOutOfRangeException(nameof(source));
        var scale = Math.Min((double)maxWidth / source.Width, (double)maxHeight / source.Height);
        if (!allowEnlarge) scale = Math.Min(scale, 1);
        return new Size(Math.Max(1, (int)Math.Round(source.Width * scale)), Math.Max(1, (int)Math.Round(source.Height * scale)));
    }

    public static Image<Rgba32> ResizeToFit(this Image<Rgba32> image, int maxWidth, int maxHeight, bool allowEnlarge = false)
    {
        ArgumentNullException.ThrowIfNull(image);
        var size = ResizeToFit(image.Size, maxWidth, maxHeight, allowEnlarge);
        return image.Clone(context => context.Resize(size.Width, size.Height));
    }

    public static Image<Rgba32> Crop(this Image<Rgba32> image, int width, int height, ImageAlignment vertical = ImageAlignment.Center, ImageAlignment horizontal = ImageAlignment.Center)
    {
        ArgumentNullException.ThrowIfNull(image);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(width);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(height);
        width = Math.Min(width, image.Width);
        height = Math.Min(height, image.Height);
        var x = horizontal switch { ImageAlignment.Left => 0, ImageAlignment.Right => image.Width - width, _ => (image.Width - width) / 2 };
        var y = vertical switch { ImageAlignment.Top => 0, ImageAlignment.Bottom => image.Height - height, _ => (image.Height - height) / 2 };
        return image.Clone(context => context.Crop(new Rectangle(x, y, width, height)));
    }

    public static Image<Rgba32> Sepia(this Image<Rgba32> image) => image.Clone(context => context.Sepia());

    public static Image<Rgba32> Disabled(this Image<Rgba32> image) => image.Clone(context => context.Grayscale().Brightness(1.2f));

    public static Image<Rgba32> Threshold(this Image<Rgba32> image, float threshold)
    {
        ArgumentNullException.ThrowIfNull(image);
        threshold = Math.Clamp(threshold, 0, 1);
        var output = image.Clone();
        output.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
                foreach (ref var pixel in accessor.GetRowSpan(y))
                {
                    var luminance = (pixel.R * .299f + pixel.G * .587f + pixel.B * .114f) / 255f;
                    var color = luminance >= threshold ? (byte)255 : (byte)0;
                    pixel = new Rgba32(color, color, color, pixel.A);
                }
        });
        return output;
    }

    public static Image<Rgba32> Watermark(this Image<Rgba32> image, Image<Rgba32> watermark, Point location, float opacity = 1)
    {
        ArgumentNullException.ThrowIfNull(image);
        ArgumentNullException.ThrowIfNull(watermark);
        return image.Clone(context => context.DrawImage(watermark, location, Math.Clamp(opacity, 0, 1)));
    }

    public static Image<Rgba32> Flip(this Image<Rgba32> image, bool horizontal, bool vertical)
    {
        ArgumentNullException.ThrowIfNull(image);
        if (!horizontal && !vertical) return image.Clone();
        return image.Clone(context =>
        {
            if (horizontal) context.Flip(FlipMode.Horizontal);
            if (vertical) context.Flip(FlipMode.Vertical);
        });
    }

    public static Image<Rgba32> Rotate(this Image<Rgba32> image, float degrees) => image.Clone(context => context.Rotate(degrees));

    public static Image<Rgba32> Invert(this Image<Rgba32> image) => image.Clone(context => context.Invert());

    public static Image<Rgba32> AppendBorder(this Image<Rgba32> image, int width, Rgba32 color)
    {
        ArgumentNullException.ThrowIfNull(image);
        ArgumentOutOfRangeException.ThrowIfNegative(width);
        var output = new Image<Rgba32>(image.Width + width * 2, image.Height + width * 2, color);
        output.Mutate(context => context.DrawImage(image, new Point(width, width), 1));
        return output;
    }

    public static Image<Rgba32> CombineHorizontally(IEnumerable<Image<Rgba32>> images, Rgba32? background = null)
    {
        ArgumentNullException.ThrowIfNull(images);
        var source = images.ToArray();
        if (source.Length == 0) throw new ArgumentException("At least one image is required.", nameof(images));
        var output = new Image<Rgba32>(source.Sum(image => image.Width), source.Max(image => image.Height), background ?? default);
        output.Mutate(context =>
        {
            var x = 0;
            foreach (var image in source)
            {
                context.DrawImage(image, new Point(x, 0), 1);
                x += image.Width;
            }
        });
        return output;
    }
}
