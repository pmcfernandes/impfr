using ImPedro.Mail.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Mail.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroMail(this IServiceCollection services, Action<MailSenderOptions>? configure = null)
    {
        if (configure is not null) services.Configure(configure);
        services.AddScoped<IMailSender, SmtpMailSender>();
        services.AddScoped<MailService>();
        return services;
    }
}
