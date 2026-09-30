# ImPedro.Core

Cross-cutting library for generic functions reusable across the other layers. The first feature is FluentValidation.

## Extensions

Extensions are in the `ImPedro.Core.Extensions` namespace and modernize the `CSoft.Core.Types` utilities:

- `EnumExtensions`: `Mask<TEnum>()`, `ParseEnum<TEnum>()`, `IsDefined<TEnum>()`, `Description()` e `ValuesWithDescriptions<TEnum>()`.
- `StringExtensions`: extraction between delimiters, aliases, collection prefixes/suffixes, casing, UTF-8 Base64, diacritic removal, `Left`/`Right`, safe HTML truncation, word count, and cryptographically secure `RandomString`.
- `BooleanExtensions`: `ToNullableBoolean()` and `ToBoolean()`, accepting `yes/no`, `on/off`, `1/0`, and equivalents.
- `DateTimeExtensions`: start of week/quarter, week of month, following business days/weekends, month bounds, ranges, and Unix time.
- `NumericExtensions`: `NullIfZero`, ranges, parity, primality, multiples, sign, decimal formatting, and safe digit extraction.

`BinaryFormatter`, `Encoding.Default`, global date state, and non-cryptographic random generators were not migrated. Use `System.Text.Json`, explicit UTF-8, `DateTime.UtcNow`/clock injection, and `RandomNumberGenerator`, respectively.

## IO

`ImPedro.Core.IO` modernizes `StreamHelper` and `Files` with portable asynchronous APIs:

- `StreamExtensions`: creates UTF-8/memory streams, reads bytes or text while preserving seekable-stream position, writes bytes, and copies streams.
- `FileSystem`: SHA-256 hashing, copying with `FileCopyMode`, content comparison, locked-file detection, path normalization/sanitization, listings, date-based cleanup, directory copies, file splitting/joining, and human-readable size.

Destructive operations (`DeleteFilesOlderThan`, `DeleteFilesNewerThan`) always require explicit directory and cutoff date. Windows/ASPNET-specific ACLs, `Encoding.Default`-based detection, and MD5 as the default hash were not migrated.

## FluentValidation

`AddImPedroCore(assemblies)` discovers and registers all `AbstractValidator<T>`/`IValidator<T>` in the specified assemblies as scoped services. The focused `AddImPedroFluentValidation(assemblies)` extension is available when only validator registration is needed.

```csharp
public sealed class CreateInvoiceValidator : AbstractValidator<CreateInvoice>
{
    public CreateInvoiceValidator()
    {
        RuleFor(request => request.CustomerId).GreaterThan(0);
        RuleFor(request => request.Amount).GreaterThan(0);
    }
}

services.AddImPedroCore(typeof(CreateInvoiceValidator).Assembly);
```

For MVC, `FluentValidationActionFilter` converts failures into `400 ValidationProblemDetails`. For Minimal APIs, add `.ValidateWithFluentValidation<T>()` to the endpoint. The main API already registers both filters and searches for Fluent validators in the `ImPedro.Api` assembly.

The API's previous validation mechanism remains active for compatibility; new contracts should prefer FluentValidation's `AbstractValidator<T>`.
