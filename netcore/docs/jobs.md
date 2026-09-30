# ImPedro.Jobs

Background processes with Hangfire 1.8 over `ImPedro.Data`. Storage in SQL Server (own tables in the `Hangfire` schema, separate from the framework `dbo`). Registered with `AddImPedroJobs()` and enabled with `UseImPedroJobs()` in the future API.

## `JobsOptions`

`StorageConnectionString` (defaults to the `FrameworkDbContext` one), `SchemaName` (`Hangfire`), `WorkerCount` (defaults to the Hangfire default), `Queues` (`default`), `DashboardPath` (`/hangfire`), `DashboardAuthorizationFilter` (defaults to local-only requests), `RecurringJobsEnabled`, crons `WorkflowDueCron` (`*/15 * * * *`) and `AuditCleanupCron` (daily) and `AuditRetentionDays` (180; `<= 0` disables cleanup).

## Jobs

- `WorkflowDueJob` — unfinished tasks past `ExpirationDate` get a history entry (`Open` → `Expired`); idempotent (skips those already `Expired` as latest state).
- `AuditCleanupJob` — deletes `MetaTableAudit`/`MetaFieldAudit` older than the retention via `ExecuteDeleteAsync`.
- `TempCleanupJob` — deletes files older than `TempRetentionDays` (default 7) in `TempFolderPath` (default `~/Temp`) and removes directories left empty; never deletes the configured root, refuses drive roots, the home folder, and system folders, ignores links, tolerates locked files, and runs on the `TempCleanupCron` schedule (default daily at 01:00).

All receive `IJobCancellationToken` (graceful shutdown), use the per-job scoped `DbContext`, and log results via `ILogger`.

## Startup in the API

```csharp
builder.Services.AddImPedroJobs(o => o.StorageConnectionString = connString);
var app = builder.Build();
app.UseImPedroJobs(); // dashboard + idempotent recurring job registration
```

The dashboard is restricted to local requests unless a custom filter is supplied in `DashboardAuthorizationFilter`.
    