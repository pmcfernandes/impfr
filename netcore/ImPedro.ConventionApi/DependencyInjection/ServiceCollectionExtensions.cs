using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.ConventionApi.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddConventionApi(this IServiceCollection services, Action<ConventionApiOptions>? configure = null)
    {
        var options = new ConventionApiOptions();
        configure?.Invoke(options);
        var serviceTypes = services
            .Where(descriptor => IsCandidate(descriptor, options))
            .Select(descriptor => descriptor.ServiceType)
            .Distinct()
            .ToArray();
        var registry = services.FirstOrDefault(d => d.ServiceType == typeof(ConventionApiRegistry))?.ImplementationInstance as ConventionApiRegistry;
        if (registry is null)
        {
            registry = new ConventionApiRegistry();
            services.AddSingleton(registry);
        }
        registry.ServiceTypes = serviceTypes;
        if (serviceTypes.Length == 0) return services;

        services.Configure<MvcOptions>(mvc => mvc.Conventions.Add(new ConventionControllerNameConvention()));
        return services;
    }

    public static IMvcBuilder AddConventionApiControllers(this IMvcBuilder builder)
    {
        var registry = builder.Services.FirstOrDefault(d => d.ServiceType == typeof(ConventionApiRegistry))?.ImplementationInstance as ConventionApiRegistry;
        if (registry?.ServiceTypes.Count > 0)
            builder.ConfigureApplicationPartManager(manager => manager.FeatureProviders.Add(new ConventionControllerFeatureProvider(registry.ServiceTypes)));
        return builder;
    }

    private static bool IsCandidate(ServiceDescriptor descriptor, ConventionApiOptions options)
    {
        if (options.IncludedServices.Contains(descriptor.ServiceType)) return true;
        var implementation = descriptor.ImplementationType ?? descriptor.ServiceType;
        return implementation.IsClass && implementation.Name.EndsWith(options.ServiceSuffix, StringComparison.Ordinal);
    }
}
