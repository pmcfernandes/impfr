using ImPedro.Security.Services;

namespace ImPedro.Api.Auth;

public static class RequireAuthFilter
{
    public static async ValueTask<object?> Invoke(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var currentUser = context.HttpContext.RequestServices.GetRequiredService<ICurrentUser>();
        if (!currentUser.IsAuthenticated) return Results.Unauthorized();
        return await next(context);
    }
}

public static class RequirePermissionFilter
{
    public static Func<EndpointFilterInvocationContext, EndpointFilterDelegate, ValueTask<object?>> For(
        string table,
        string code)
        => async (context, next) =>
        {
            var currentUser = context.HttpContext.RequestServices.GetRequiredService<ICurrentUser>();
            if (!currentUser.IsAuthenticated) return Results.Unauthorized();
            if (!await currentUser.HasPermissionAsync(table, code)) return Results.Forbid();
            return await next(context);
        };
}
