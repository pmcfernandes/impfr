using ImPedro.Api.Endpoints;

namespace ImPedro.Api.Bootstrap;

public static class MinimalApiBootstrap
{
    public static IServiceCollection AddImPedroMinimalApi(this IServiceCollection services, IConfiguration configuration)
        => SharedApiBootstrap.AddServices(services, configuration);

    public static WebApplication UseImPedroMinimalApi(this WebApplication app)
    {
        SharedApiBootstrap.UsePipeline(app);
        app.MapAuthEndpoints();
        app.MapUserEndpoints();
        app.MapGroupEndpoints();
        app.MapSchemaEndpoints();
        return app;
    }
}
