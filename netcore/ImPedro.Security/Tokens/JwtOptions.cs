namespace ImPedro.Security.Tokens;

public sealed class JwtOptions
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "ImPedro";
    public string Audience { get; set; } = "ImPedro.Api";
    public int ExpiryMinutes { get; set; } = 60;
}
