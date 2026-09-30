using System.Text.Json;

namespace ImPedro.Api.Json;

public sealed class LowerCaseNamingPolicy : JsonNamingPolicy
{
    public static LowerCaseNamingPolicy Instance { get; } = new();

    private LowerCaseNamingPolicy()
    {
    }

    public override string ConvertName(string name) => name.ToLowerInvariant();
}
