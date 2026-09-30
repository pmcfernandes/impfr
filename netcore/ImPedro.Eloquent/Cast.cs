using System.Globalization;
using System.Text.Json;

namespace ImPedro.Eloquent;

public static class Cast
{
    public static Func<object?, object?> Boolean() => value =>
        value is null || value is DBNull ? null
        : value is string text
            ? bool.TryParse(text, out var parsed) ? parsed : text == "1" ? true : text == "0" ? false : throw new FormatException($"Cannot cast '{text}' to boolean.")
            : Convert.ToBoolean(value, CultureInfo.InvariantCulture);

    public static Func<object?, object?> Integer() => value =>
        value is null || value is DBNull ? null : Convert.ToInt32(value, CultureInfo.InvariantCulture);

    public static Func<object?, object?> Decimal(int places = 2) => value =>
        value is null || value is DBNull ? null : Math.Round(Convert.ToDecimal(value, CultureInfo.InvariantCulture), places);

    public static Func<object?, object?> DateTime() => value =>
        value is null || value is DBNull ? null : Convert.ToDateTime(value, CultureInfo.InvariantCulture);

    public static Func<object?, object?> Guid() => value =>
        value is null || value is DBNull ? null
        : value is Guid guid ? guid
        : System.Guid.Parse(value.ToString()!);

    public static Func<object?, object?> Json<T>() => value =>
        value is null || value is DBNull ? null
        : value is string text && text.Length > 0 ? JsonSerializer.Deserialize<T>(text) : value;

    public static Func<object?, object?> ToJson() => value =>
        value is null || value is DBNull ? null
        : value is string ? value
        : JsonSerializer.Serialize(value);
}
