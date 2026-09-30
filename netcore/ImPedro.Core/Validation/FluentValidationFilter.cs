using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Core.Validation;

public sealed class FluentValidationActionFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        foreach (var argument in context.ActionArguments.Values.Where(value => value is not null))
        {
            var result = await FluentValidationRunner.ValidateAsync(context.HttpContext.RequestServices, argument!, context.HttpContext.RequestAborted);
            if (result is null || result.IsValid) continue;
            context.Result = new BadRequestObjectResult(new ValidationProblemDetails(ToErrors(result)));
            return;
        }
        await next();
    }

    internal static Dictionary<string, string[]> ToErrors(ValidationResult result) => result.Errors
        .GroupBy(error => error.PropertyName, StringComparer.OrdinalIgnoreCase)
        .ToDictionary(group => group.Key, group => group.Select(error => error.ErrorMessage).Distinct().ToArray(), StringComparer.OrdinalIgnoreCase);
}

public sealed class FluentValidationEndpointFilter<T> : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var validator = context.HttpContext.RequestServices.GetService<IValidator<T>>();
        var target = context.Arguments.OfType<T>().FirstOrDefault();
        if (validator is null || target is null) return await next(context);
        var result = await validator.ValidateAsync(target, context.HttpContext.RequestAborted);
        return result.IsValid ? await next(context) : Results.ValidationProblem(FluentValidationActionFilter.ToErrors(result));
    }
}

public static class FluentValidationEndpointExtensions
{
    public static RouteHandlerBuilder ValidateWithFluentValidation<T>(this RouteHandlerBuilder builder)
        => builder.AddEndpointFilter<FluentValidationEndpointFilter<T>>();
}
