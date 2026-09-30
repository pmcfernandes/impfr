using Hangfire;
using Hangfire.Dashboard;
using Hangfire.Storage;
using ImPedro.Jobs.Dashboard;
using ImPedro.Jobs.Jobs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Jobs.DependencyInjection;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseImPedroJobs(this IApplicationBuilder app, JobsOptions? options = null)
    {
        options ??= app.ApplicationServices.GetService<Microsoft.Extensions.Options.IOptions<JobsOptions>>()?.Value
            ?? new JobsOptions();

        IDashboardAuthorizationFilter authorization =
            options.DashboardAuthorizationFilter ?? new LocalOnlyAuthorizationFilter();

        app.UseHangfireDashboard(options.DashboardPath, new DashboardOptions
        {
            Authorization = new[] { authorization },
        });

        if (options.RecurringJobsEnabled)
        {
            var storage = app.ApplicationServices.GetRequiredService<JobStorage>();
            var manager = new RecurringJobManager(storage);
            manager.AddOrUpdate<WorkflowDueJob>(
                "impedro-workflow-due",
                job => job.ExecuteAsync(JobCancellationToken.Null),
                options.WorkflowDueCron);
            manager.AddOrUpdate<AuditCleanupJob>(
                "impedro-audit-cleanup",
                job => job.ExecuteAsync(JobCancellationToken.Null),
                options.AuditCleanupCron);
            manager.AddOrUpdate<TempCleanupJob>(
                "impedro-temp-cleanup",
                job => job.ExecuteAsync(JobCancellationToken.Null),
                options.TempCleanupCron);
        }

        return app;
    }
}
