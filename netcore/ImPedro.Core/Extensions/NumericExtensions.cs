using System.Globalization;

namespace ImPedro.Core.Extensions;

public static class NumericExtensions
{
    public static int? NullIfZero(this int value) => value == 0 ? null : value;

    public static bool IsBetween(this int value, int minimum, int maximum) => value >= minimum && value <= maximum;

    public static bool IsEven(this int value) => value % 2 == 0;

    public static bool IsMultipleOf(this int value, int divisor)
    {
        ArgumentOutOfRangeException.ThrowIfZero(divisor);
        return value % divisor == 0;
    }

    public static bool IsPositive(this int value) => value > 0;

    public static bool IsNegative(this int value) => value < 0;

    public static bool IsZero(this int value) => value == 0;

    public static bool IsPrime(this int value)
    {
        if (value < 2) return false;
        if (value == 2) return true;
        if (value.IsEven()) return false;
        for (var divisor = 3; divisor <= value / divisor; divisor += 2)
            if (value.IsMultipleOf(divisor)) return false;
        return true;
    }

    public static string ToDecimalString(this double value, char decimalSeparator = '.')
        => value.ToString("0.0#", CultureInfo.InvariantCulture).Replace('.', decimalSeparator);

    public static bool TryDigitsAsInt(this string? value, out int result)
    {
        var digits = value is null ? string.Empty : new string(value.Where(char.IsDigit).ToArray());
        return int.TryParse(digits, NumberStyles.None, CultureInfo.InvariantCulture, out result);
    }
}
