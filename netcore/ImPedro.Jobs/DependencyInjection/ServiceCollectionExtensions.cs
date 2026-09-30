using Hangfire;
using Hangfire.SqlServer;
using ImPedro.Jobs.Jobs;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Jobs.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddImPedroJobs(this IServiceCollection services, Action<JobsOptions>? configure = null)
    {
        var options = new JobsOptions();
        configure?.Invoke(options);
        services.AddSingleton(Microsoft.Extensions.Options.Options.Create(options));

        services.AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSqlServerStorage(options.StorageConnectionString, new SqlServerStorageOptions
            {
                SchemaName = options.SchemaName,
            }));

        services.AddHangfireServer(serverOptions =>
        {
            if (options.WorkerCount.HasValue) serverOptions.WorkerCount = options.WorkerCount.Value;
            serverOptions.Queues = options.Queues;
            serverOptions.ShutdownTimeout = TimeSpan.FromSeconds(15);
        });

        services.AddScoped<WorkflowDueJob>();
        services.AddScoped<AuditCleanupJob>();
        services.AddScoped<TempCleanupJob>();
        return services;
    }
}
