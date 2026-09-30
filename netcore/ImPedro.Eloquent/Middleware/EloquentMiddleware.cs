using ImPedro.Entity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Eloquent.Middleware;

public sealed class EloquentMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var dbContext = context.RequestServices.GetService<FrameworkDbContext>();
        if (dbContext is null)
        {
            await next(context);
            return;
        }
        using (Eloquent.Use(dbContext)) await next(context);
    }
}

public static class EloquentExtensions
{
    public static IApplicationBuilder UseEloquent(this IApplicationBuilder app)
        => app.UseMiddleware<EloquentMiddleware>();
}
