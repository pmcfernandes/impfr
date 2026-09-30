using System.ComponentModel;

namespace ImPedro.Core.Extensions;

public static class EnumExtensions
{
    public static TEnum Mask<TEnum>() where TEnum : struct, Enum
    {
        ulong mask = 0;
        foreach (var value in Enum.GetValues<TEnum>()) mask |= Convert.ToUInt64(value);
        return (TEnum)Enum.ToObject(typeof(TEnum), mask);
    }

    public static TEnum ParseEnum<TEnum>(this string value, bool ignoreCase = true) where TEnum : struct, Enum
        => Enum.Parse<TEnum>(value, ignoreCase);

    public static bool IsDefined<TEnum>(this string value, bool ignoreCase = true) where TEnum : struct, Enum
        => Enum.TryParse<TEnum>(value, ignoreCase, out var parsed) && Enum.IsDefined(parsed);

    public static string Description(this Enum value)
    {
        ArgumentNullException.ThrowIfNull(value);
        var member = value.GetType().GetMember(value.ToString()).FirstOrDefault();
        return member?.GetCustomAttributes(typeof(DescriptionAttribute), false)
            .OfType<DescriptionAttribute>().FirstOrDefault()?.Description ?? value.ToString();
    }

    public static IReadOnlyList<KeyValuePair<long, string>> ValuesWithDescriptions<TEnum>() where TEnum : struct, Enum
        => Enum.GetValues<TEnum>().Select(value => new KeyValuePair<long, string>(Convert.ToInt64(value), ((Enum)(object)value).Description())).ToArray();
}
