using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using ImPedro.Data.Services;
using ImPedro.Mail.Models;
using Microsoft.Extensions.Options;

namespace ImPedro.Mail;

public sealed class SmtpMailSender : IMailSender
{
    private readonly SystemService _system;
    private readonly MailSenderOptions _options;

    public SmtpMailSender(SystemService system, IOptions<MailSenderOptions> options)
    {
        _system = system;
        _options = options.Value;
    }

    public async Task<EmailResult> SendAsync(
        EmailMessage message,
        int? accountId = null,
        CancellationToken cancellationToken = default)
    {
        if (message.To.Count == 0 && message.Cc.Count == 0 && message.Bcc.Count == 0)
            throw new ArgumentException("At least one recipient is required.", nameof(message));

        var account = accountId.HasValue
            ? (await _system.GetMailServersAsync(cancellationToken)).FirstOrDefault(m => m.Id == accountId.Value)
            : await _system.GetDefaultMailServerAsync(cancellationToken);
        if (account is null) throw new InvalidOperationException("No mail account is configured.");
        if (!account.Sending) throw new InvalidOperationException($"Mail account '{account.Name}' is not enabled for sending.");
        if (string.IsNullOrWhiteSpace(account.Server))
            throw new InvalidOperationException($"Mail account '{account.Name}' has no server configured.");

        var from = message.From ?? account.Sender ?? account.Username;
        if (string.IsNullOrWhiteSpace(from))
            throw new InvalidOperationException($"Mail account '{account.Name}' has no sender address.");

        using var mail = new MailMessage
        {
            From = new MailAddress(from),
            Subject = message.Subject,
            Body = message.Body,
            IsBodyHtml = message.IsBodyHtml,
        };
        foreach (var address in message.To) mail.To.Add(address.Trim());
        foreach (var address in message.Cc) mail.CC.Add(address.Trim());
        foreach (var address in message.Bcc) mail.Bcc.Add(address.Trim());
        foreach (var attachment in message.Attachments)
        {
            mail.Attachments.Add(attachment.ContentType is null
                ? new Attachment(new MemoryStream(attachment.Content, writable: false), attachment.Filename)
                : new Attachment(new MemoryStream(attachment.Content, writable: false), attachment.Filename, attachment.ContentType));
        }

        using var client = new SmtpClient(account.Server, account.Port)
        {
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            EnableSsl = account.Port != 25,
            Timeout = _options.TimeoutMilliseconds,
        };
        if (!string.IsNullOrWhiteSpace(account.Username))
            client.Credentials = new NetworkCredential(account.Username, account.Password ?? string.Empty);

        try
        {
            await client.SendMailAsync(mail, cancellationToken);
            return EmailResult.Ok();
        }
        catch (Exception ex) when (ex is SmtpException or SmtpFailedRecipientsException or InvalidOperationException)
        {
            return EmailResult.Fail(ex.Message);
        }
    }
}
