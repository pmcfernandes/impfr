using ImPedro.Entity;

namespace ImPedro.Jobs;

public sealed class JobsOptions
{
    public string StorageConnectionString { get; set; } = FrameworkDbContext.DefaultConnectionString;

    public string SchemaName { get; set; } = "Hangfire";

    public int? WorkerCount { get; set; }

    public string[] Queues { get; set; } = ["default"];

    public string DashboardPath { get; set; } = "/hangfire";

    public Hangfire.Dashboard.IDashboardAuthorizationFilter? DashboardAuthorizationFilter { get; set; }

    public bool RecurringJobsEnabled { get; set; } = true;

    public string WorkflowDueCron { get; set; } = "*/15 * * * *";

    public string AuditCleanupCron { get; set; } = "0 0 * * *";

    public int AuditRetentionDays { get; set; } = 180;

    public string? TempFolderPath { get; set; }

    public int TempRetentionDays { get; set; } = 7;

    public string TempCleanupCron { get; set; } = "0 1 * * *";
}
