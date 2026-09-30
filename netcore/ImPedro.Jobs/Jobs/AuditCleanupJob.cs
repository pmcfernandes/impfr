using ImPedro.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ImPedro.Jobs.Jobs;

public sealed class AuditCleanupJob
{
    private readonly FrameworkDbContext _context;
    private readonly JobsOptions _options;
    private readonly ILogger<AuditCleanupJob> _logger;

    public AuditCleanupJob(FrameworkDbContext context, IOptions<JobsOptions> options, ILogger<AuditCleanupJob> logger)
    {
        _context = context;
        _options = options.Value;
        _logger = logger;
    }

    public async Task ExecuteAsync(Hangfire.IJobCancellationToken cancellationToken)
    {
        if (_options.AuditRetentionDays <= 0)
        {
            _logger.LogInformation("AuditCleanupJob skipped: retention is disabled.");
            return;
        }

        var cutoff = DateTime.Now.AddDays(-_options.AuditRetentionDays);
        cancellationToken.ThrowIfCancellationRequested();
        var shutdown = cancellationToken.ShutdownToken;

        var tables = await _context.MetaTableAudits
            .Where(a => a.DateTime < cutoff)
            .ExecuteDeleteAsync(shutdown);
        var fields = await _context.MetaFieldAudits
            .Where(a => a.DateTime < cutoff)
            .ExecuteDeleteAsync(shutdown);

        _logger.LogInformation(
            "AuditCleanupJob finished: removed {Tables} table audits and {Fields} field audits older than {Cutoff:yyyy-MM-dd}.",
            tables, fields, cutoff);
    }
}
