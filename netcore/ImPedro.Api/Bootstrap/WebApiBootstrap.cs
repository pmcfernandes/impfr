namespace ImPedro.Api.Bootstrap;

public static class WebApiBootstrap
{
    public static IServiceCollection AddImPedroWebApi(this IServiceCollection services, IConfiguration configuration)
        => SharedApiBootstrap.AddServices(services, configuration);

    public static WebApplication UseImPedroWebApi(this WebApplication app)
    {
        SharedApiBootstrap.UsePipeline(app);
        app.MapControllers();
        return app;
    }
}
