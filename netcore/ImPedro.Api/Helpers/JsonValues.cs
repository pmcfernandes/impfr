using System.Text.Json;

namespace ImPedro.Api.Helpers;

public static class JsonValues
{
    public static object? ToClr(JsonElement element) => element.ValueKind switch
    {
        JsonValueKind.String => element.GetString(),
        JsonValueKind.Number => element.TryGetInt64(out var l) ? l : element.GetDouble(),
        JsonValueKind.True => true,
        JsonValueKind.False => false,
        JsonValueKind.Null or JsonValueKind.Undefined => null,
        _ => element.GetRawText(),
    };

    public static Dictionary<string, object?> ToDictionary(IDictionary<string, JsonElement>? elements)
    {
        var result = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        if (elements is null) return result;
        foreach (var (key, element) in elements) result[key] = ToClr(element);
        return result;
    }
}
