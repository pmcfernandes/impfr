using Microsoft.Extensions.Options;

namespace ImPedro.Api.Middleware;

public sealed class RoutePrefixOptions
{
    public string Prefix { get; set; } = string.Empty;
}

public sealed class RoutePrefixMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _prefix;

    public RoutePrefixMiddleware(RequestDelegate next, IOptions<RoutePrefixOptions> options)
    {
        _next = next;
        var prefix = (options.Value.Prefix ?? string.Empty).Trim();
        if (prefix.Length > 0 && !prefix.StartsWith('/')) prefix = "/" + prefix;
        _prefix = prefix.TrimEnd('/');
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (_prefix.Length > 0 && context.Request.Path.StartsWithSegments(_prefix, out var remaining))
        {
            context.Request.PathBase = context.Request.PathBase.Add(_prefix);
            context.Request.Path = remaining;
        }
        await _next(context);
    }
}

public static class RoutePrefixExtensions
{
    public static IApplicationBuilder UseRoutePrefix(this IApplicationBuilder app)
        => app.UseMiddleware<RoutePrefixMiddleware>();
}
