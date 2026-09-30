using ImPedro.Data.Services;
using ImPedro.Data.Initialization;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Data.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroData(this IServiceCollection services)
    {
        services.AddOptions<FrameworkInitializerOptions>();
        services.AddScoped<UserService>();
        services.AddScoped<PermissionService>();
        services.AddScoped<MetaService>();
        services.AddScoped<SystemService>();
        services.AddScoped<AuditService>();
        services.AddScoped<WorkflowService>();
        services.AddScoped<IFrameworkInitializer, FrameworkInitializer>();
        return services;
    }
}
