using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Ddl.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroDdl(this IServiceCollection services)
    {
        services.AddScoped<ISqlSchema, SqlSchemaService>();
        return services;
    }
}
