using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Core.Validation;

public static class FluentValidationServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroFluentValidation(this IServiceCollection services, params Assembly[] assemblies)
    {
        ArgumentNullException.ThrowIfNull(assemblies);
        foreach (var assembly in assemblies.Distinct())
        {
            foreach (var validator in assembly.DefinedTypes.Where(type => type is { IsAbstract: false, IsInterface: false }))
            {
                foreach (var contract in validator.ImplementedInterfaces.Where(contract =>
                    contract.IsGenericType && contract.GetGenericTypeDefinition() == typeof(IValidator<>)))
                {
                    services.AddScoped(contract, validator.AsType());
                }
            }
        }
        return services;
    }
}
