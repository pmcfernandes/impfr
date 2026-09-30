namespace ImPedro.Entity.Entities;

public class MailServer
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Server { get; set; }
    public int Port { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Sender { get; set; }
    public bool IsDefault { get; set; }
    public bool Sending { get; set; }
    public bool Receiving { get; set; }
    public string? tenant { get; set; }
    public string? client_id { get; set; }
    public string? client_secret { get; set; }
    public bool IsDeleted { get; set; }
}
