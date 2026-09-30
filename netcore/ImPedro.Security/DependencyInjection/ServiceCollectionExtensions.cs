using ImPedro.Data.Services;
using ImPedro.Security.Services;
using ImPedro.Security.Tokens;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Security.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroSecurity(this IServiceCollection services)
    {
        services.AddScoped<UserService>();
        services.AddScoped<PermissionService>();
        services.AddScoped<AuthService>();
        services.AddScoped<ExternalAuthService>();
        services.AddScoped<GroupService>();
        services.AddScoped<AccessControlService>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        return services;
    }
}
