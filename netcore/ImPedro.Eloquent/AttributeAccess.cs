using System.Globalization;
using System.Reflection;

namespace ImPedro.Eloquent;

internal static class AttributeAccess
{
    internal static PropertyInfo Resolve(Type type, string name)
    {
        var property = type.GetProperty(name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
        return property is null
            ? throw new InvalidOperationException($"Unknown attribute '{name}' on {type.Name}.")
            : property;
    }

    internal static IEnumerable<PropertyInfo> Writable(Type type) => type
        .GetProperties(BindingFlags.Instance | BindingFlags.Public)
        .Where(p => p.CanWrite && p.GetIndexParameters().Length == 0);

    internal static IEnumerable<PropertyInfo> Readable(Type type) => type
        .GetProperties(BindingFlags.Instance | BindingFlags.Public)
        .Where(p => p.CanRead && p.GetIndexParameters().Length == 0);

    internal static bool IsAllowed(string name, IEnumerable<string>? fillable, IEnumerable<string>? guarded)
    {
        var fillableList = fillable?.ToList();
        if (fillableList is { Count: > 0 }) return fillableList.Contains(name, StringComparer.OrdinalIgnoreCase);
        var guardedList = guarded?.ToList() ?? ["*"];
        return !guardedList.Any(g => g == "*" || string.Equals(g, name, StringComparison.OrdinalIgnoreCase));
    }

    internal static object? Convert(object? value, Type targetType, string owner, string name)
    {
        var underlying = Nullable.GetUnderlyingType(targetType) ?? targetType;
        if (value is null || value is DBNull)
            return targetType.IsValueType && underlying == targetType ? Activator.CreateInstance(targetType) : null;
        if (underlying.IsInstanceOfType(value)) return value;
        try
        {
            if (underlying.IsEnum)
                return value is string text ? Enum.Parse(underlying, text, ignoreCase: true) : Enum.ToObject(underlying, value);
            if (underlying == typeof(Guid) && value is string guidText) return Guid.Parse(guidText);
            if (underlying == typeof(bool) && value is string boolText)
            {
                if (bool.TryParse(boolText, out var parsed)) return parsed;
                if (boolText == "1") return true;
                if (boolText == "0") return false;
            }
            return System.Convert.ChangeType(value, underlying, CultureInfo.InvariantCulture);
        }
        catch (Exception ex) when (ex is FormatException or InvalidCastException or OverflowException or ArgumentException)
        {
            throw new InvalidOperationException($"Cannot assign '{name}' on {owner}.", ex);
        }
    }
}
