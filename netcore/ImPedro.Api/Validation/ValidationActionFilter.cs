using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ImPedro.Api.Validation;

public sealed class ValidationActionFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        foreach (var argument in context.ActionArguments.Values)
        {
            if (argument is null) continue;
            var validatorType = typeof(IValidator<>).MakeGenericType(argument.GetType());
            if (context.HttpContext.RequestServices.GetService(validatorType) is not { } validator) continue;
            var method = validatorType.GetMethod("Validate");
            if (method?.Invoke(validator, [argument]) is ValidationResult result && !result.IsValid)
            {
                context.Result = new BadRequestObjectResult(new ValidationProblemDetails(
                    result.Errors.ToDictionary(entry => entry.Key, entry => entry.Value)));
                return;
            }
        }
        await next();
    }
}

public static class ValidationServiceExtensions
{
    public static IServiceCollection AddApiValidators(this IServiceCollection services)
    {
        var validatorContracts = typeof(ValidationServiceExtensions).Assembly
            .GetTypes()
            .Where(type => !type.IsAbstract && !type.IsInterface)
            .SelectMany(type => type.GetInterfaces()
                .Where(contract => contract.IsGenericType && contract.GetGenericTypeDefinition() == typeof(IValidator<>))
                // Primitive building blocks (e.g. IValidator<string>) are composed manually,
                // never auto-registered: otherwise every string action argument would be validated.
                .Where(contract => contract.GetGenericArguments()[0].Assembly != typeof(object).Assembly)
                .Select(contract => (Contract: contract, Implementation: type)))
            .ToList();

        foreach (var (contract, implementation) in validatorContracts)
            services.AddScoped(contract, implementation);

        return services;
    }
}
