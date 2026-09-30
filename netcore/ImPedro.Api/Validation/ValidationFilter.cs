namespace ImPedro.Api.Validation;

public sealed class ValidationFilter<T> : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var validator = context.HttpContext.RequestServices.GetService<IValidator<T>>();
        if (validator is null) return await next(context);

        var target = context.Arguments.OfType<T>().FirstOrDefault();
        if (target is null) return await next(context);

        var result = validator.Validate(target);
        if (!result.IsValid) return Results.ValidationProblem(result.Errors);
        return await next(context);
    }
}

public static class ValidationEndpointExtensions
{
    public static RouteHandlerBuilder Validate<T>(this RouteHandlerBuilder builder)
        => builder.AddEndpointFilter<ValidationFilter<T>>();
}
