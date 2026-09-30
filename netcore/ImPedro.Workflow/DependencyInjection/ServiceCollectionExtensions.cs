using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Workflow.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroWorkflow(this IServiceCollection services)
    {
        services.AddScoped<IWorkflowEngine, WorkflowEngine>();
        return services;
    }
}
