using ImPedro.Query.Mapping;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Query.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroQuery(this IServiceCollection services)
    {
        services.AddScoped<ISqlQuery, SqlQueryService>();
        services.AddSingleton<IMapper, Mapper>();
        return services;
    }
}
