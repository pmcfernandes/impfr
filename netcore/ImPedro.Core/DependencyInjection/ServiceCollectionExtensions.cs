using System.Reflection;
using ImPedro.Core.Validation;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Core.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroCore(this IServiceCollection services, params Assembly[] validatorAssemblies)
    {
        if (validatorAssemblies.Length > 0) services.AddImPedroFluentValidation(validatorAssemblies);
        return services;
    }
}
