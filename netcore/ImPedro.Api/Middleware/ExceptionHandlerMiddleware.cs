using System.Diagnostics;
using System.Text.Json;

namespace ImPedro.Api.Middleware;

public sealed class ExceptionHandlerMiddleware
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlerMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlerMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var (status, title) = MapException(ex);
            if (status >= 500) _logger.LogError(ex, "Unhandled exception: {Method} {Path}", context.Request.Method, context.Request.Path);
            else _logger.LogWarning(ex, "Request failed: {Method} {Path} -> {Status}", context.Request.Method, context.Request.Path, status);

            if (context.Response.HasStarted) throw;

            var detail = status >= 500 && !_environment.IsDevelopment()
                ? "An unexpected error occurred."
                : ex.Message;

            var problem = new
            {
                type = $"https://httpstatuses.io/{status}",
                title,
                status,
                detail,
                instance = context.Request.Path.Value,
                traceId = Activity.Current?.Id ?? context.TraceIdentifier,
            };

            context.Response.StatusCode = status;
            context.Response.ContentType = "application/problem+json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(problem, JsonOptions));
        }
    }

    private static (int Status, string Title) MapException(Exception ex) => ex switch
    {
        KeyNotFoundException => (StatusCodes.Status404NotFound, "Not found."),
        UnauthorizedAccessException => (StatusCodes.Status403Forbidden, "Forbidden."),
        ArgumentException => (StatusCodes.Status400BadRequest, "Invalid request."),
        InvalidOperationException => (StatusCodes.Status400BadRequest, "Invalid request."),
        _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred."),
    };

    public static string ReasonPhrase(int status) => status switch
    {
        400 => "Bad Request",
        401 => "Unauthorized",
        403 => "Forbidden",
        404 => "Not Found",
        500 => "Internal Server Error",
        _ => "Error",
    };
}

public static class ExceptionHandlerExtensions
{
    public static IApplicationBuilder UseImPedroExceptionHandler(this IApplicationBuilder app)
        => app.UseMiddleware<ExceptionHandlerMiddleware>();
}
