# ImPedro.Imaging

Independent ImageSharp-based imaging library with no GDI+/`System.Drawing` dependency. It operates on `Image<Rgba32>`.

- `ImageCodec`: loading, extension-based saving (`png`, `jpeg`, `gif`, `bmp`, `webp`), and Base64 PNG.
- `ImageTransforms`: proportional resizing, aligned cropping, sepia, disabled/grayscale, threshold, watermark, flip, rotation, inversion, borders, and horizontal composition.
- `ImageColor`: hex conversion (`ToHtmlHex`), opposite color, interpolation, and average color.

Returned images are new instances and must be disposed by the consumer. Windows-specific GDI+ behavior was not ported: icons, CMYK, 1-bit dithering, `BitmapData` manipulation, and text/font drawing.
