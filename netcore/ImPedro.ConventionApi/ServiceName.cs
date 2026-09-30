using System.Text;

namespace ImPedro.ConventionApi;

internal static class ServiceName
{
    public static string For(Type type)
    {
        var name = type.Name;
        if (name.StartsWith('I') && name.Length > 1 && char.IsUpper(name[1])) name = name[1..];
        foreach (var suffix in new[] { "ApplicationService", "AppService", "Service" })
        {
            if (name.EndsWith(suffix, StringComparison.Ordinal))
            {
                name = name[..^suffix.Length];
                break;
            }
        }
        return ToKebab(name);
    }

    public static string Operation(string name) => ToKebab(name.EndsWith("Async", StringComparison.Ordinal) ? name[..^5] : name);

    private static string ToKebab(string value)
    {
        var output = new StringBuilder(value.Length + 8);
        for (var index = 0; index < value.Length; index++)
        {
            var current = value[index];
            if (index > 0 && char.IsUpper(current) && (char.IsLower(value[index - 1]) || char.IsDigit(value[index - 1]))) output.Append('-');
            output.Append(char.ToLowerInvariant(current));
        }
        return output.ToString();
    }
}
