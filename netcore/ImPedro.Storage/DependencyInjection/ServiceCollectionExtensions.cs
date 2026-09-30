using ImPedro.Storage.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Storage.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroStorage(this IServiceCollection services, Action<StorageOptions>? configure = null)
    {
        if (configure is not null) services.Configure(configure);
        services.AddSingleton<IFileStorage, LocalFileStorage>();
        services.AddScoped<UploadService>();
        return services;
    }
}
