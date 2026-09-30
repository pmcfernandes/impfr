namespace ImPedro.Security;

public sealed class ExternalAuthenticationOptions
{
    public ExternalProviderOptions Google { get; set; } = new();
    public ExternalProviderOptions Microsoft { get; set; } = new();
    public ExternalProviderOptions Apple { get; set; } = new();
}

public sealed class ExternalProviderOptions
{
    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public bool Enabled => !string.IsNullOrWhiteSpace(ClientId) && !string.IsNullOrWhiteSpace(ClientSecret);
}
