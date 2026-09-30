namespace ImPedro.Mail.Models;

public sealed class EmailAttachment
{
    public string Filename { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public byte[] Content { get; set; } = [];
}

public sealed class EmailMessage
{
    public List<string> To { get; set; } = [];
    public List<string> Cc { get; set; } = [];
    public List<string> Bcc { get; set; } = [];
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public bool IsBodyHtml { get; set; } = true;
    public string? From { get; set; }
    public List<EmailAttachment> Attachments { get; set; } = [];
}
