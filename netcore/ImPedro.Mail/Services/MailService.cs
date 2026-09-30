using ImPedro.Data.Services;
using ImPedro.Mail.Models;

namespace ImPedro.Mail.Services;

public sealed class MailService
{
    private readonly IMailSender _sender;
    private readonly UserService _users;

    public MailService(IMailSender sender, UserService users)
    {
        _sender = sender;
        _users = users;
    }

    public Task<EmailResult> SendAsync(
        EmailMessage message,
        int? accountId = null,
        CancellationToken cancellationToken = default)
        => _sender.SendAsync(message, accountId, cancellationToken);

    public Task<EmailResult> SendAsync(
        string to,
        string subject,
        string body,
        bool isHtml = true,
        int? accountId = null,
        CancellationToken cancellationToken = default)
        => _sender.SendAsync(new EmailMessage
        {
            To = [to],
            Subject = subject,
            Body = body,
            IsBodyHtml = isHtml,
        }, accountId, cancellationToken);

    public async Task<EmailResult> SendToUserAsync(
        int userId,
        string subject,
        string body,
        bool isHtml = true,
        int? accountId = null,
        CancellationToken cancellationToken = default)
    {
        var user = await _users.GetByIdAsync(userId, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.Email))
            return EmailResult.Fail($"User {userId} not found or has no email address.");
        return await SendAsync(user.Email, subject, body, isHtml, accountId, cancellationToken);
    }
}
