namespace ImPedro.Core.Extensions;

public static class BooleanExtensions
{
    public static bool? ToNullableBoolean(this string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        return value.Trim().ToLowerInvariant() switch
        {
            "yes" or "y" or "sim" or "s" or "true" or "t" or "on" or "1" or "-1" => true,
            "no" or "n" or "nao" or "não" or "false" or "f" or "off" or "0" => false,
            _ => null,
        };
    }

    public static bool ToBoolean(this string? value, bool defaultValue = false)
        => value.ToNullableBoolean() ?? defaultValue;
}
