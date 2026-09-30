using System.Collections.Concurrent;
using System.Reflection;

namespace ImPedro.Query.Mapping;

public sealed class Mapper : IMapper
{
    private static readonly ConcurrentDictionary<Type, PropertyMap[]> Cache = new();

    public T Map<T>(IDictionary<string, object?> row) where T : new()
    {
        var destination = new T();
        ApplyMap(destination, GetMap(typeof(T)), row);
        return destination;
    }

    public List<T> MapList<T>(IEnumerable<IDictionary<string, object?>> rows) where T : new()
    {
        var map = GetMap(typeof(T));
        var list = new List<T>();
        foreach (var row in rows)
        {
            var destination = new T();
            ApplyMap(destination, map, row);
            list.Add(destination);
        }
        return list;
    }

    public void MapTo<T>(IDictionary<string, object?> row, T destination)
    {
        ArgumentNullException.ThrowIfNull(row);
        ArgumentNullException.ThrowIfNull(destination);
        ApplyMap(destination, GetMap(typeof(T)), row);
    }

    private static void ApplyMap<T>(T destination, PropertyMap[] map, IDictionary<string, object?> row)
    {
        foreach (var entry in map)
        {
            if (!row.TryGetValue(entry.ColumnName, out var value)) continue;
            entry.Property.SetValue(destination, ConvertValue(value, entry.TargetType, entry.ColumnName, typeof(T)));
        }
    }

    private static PropertyMap[] GetMap(Type type) => Cache.GetOrAdd(type, BuildMap);

    private static PropertyMap[] BuildMap(Type type)
    {
        var properties = type
            .GetProperties(BindingFlags.Instance | BindingFlags.Public)
            .Where(p => p.CanWrite && p.GetIndexParameters().Length == 0)
            .ToArray();

        var map = new List<PropertyMap>(properties.Length);
        foreach (var property in properties)
        {
            var targetType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
            if (targetType == typeof(object) || targetType.IsInterface)
                continue;
            map.Add(new PropertyMap(property.Name, property, targetType));
        }
        return map.ToArray();
    }

    private static object? ConvertValue(object? value, Type targetType, string column, Type destinationType)
    {
        if (value is null || value is DBNull) return targetType.IsValueType && Nullable.GetUnderlyingType(targetType) is null
            ? Activator.CreateInstance(targetType)
            : null;

        var sourceType = value.GetType();
        if (targetType.IsAssignableFrom(sourceType)) return value;

        try
        {
            if (targetType.IsEnum)
                return value is string text
                    ? Enum.Parse(targetType, text, ignoreCase: true)
                    : Enum.ToObject(targetType, value);

            if (targetType == typeof(Guid))
                return value is string guidText ? Guid.Parse(guidText) : new Guid((byte[])value);

            if (targetType == typeof(bool) && value is string boolText)
            {
                if (bool.TryParse(boolText, out var parsed)) return parsed;
                if (boolText == "1") return true;
                if (boolText == "0") return false;
            }

            if (targetType == typeof(byte[]) && value is string base64)
                return Convert.FromBase64String(base64);

            return Convert.ChangeType(value, targetType, System.Globalization.CultureInfo.InvariantCulture);
        }
        catch (Exception ex) when (ex is FormatException or InvalidCastException or OverflowException or ArgumentException)
        {
            throw new InvalidOperationException(
                $"Cannot map column '{column}' ({sourceType.Name}) to '{destinationType.Name}.{targetType.Name}'.", ex);
        }
    }

    private sealed record PropertyMap(string ColumnName, PropertyInfo Property, Type TargetType);
}
