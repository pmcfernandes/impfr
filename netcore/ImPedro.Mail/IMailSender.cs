using ImPedro.Mail.Models;

namespace ImPedro.Mail;

public interface IMailSender
{
    Task<EmailResult> SendAsync(
        EmailMessage message,
        int? accountId = null,
        CancellationToken cancellationToken = default);
}
