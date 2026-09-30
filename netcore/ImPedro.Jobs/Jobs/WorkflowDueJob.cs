using ImPedro.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ImPedro.Jobs.Jobs;

public sealed class WorkflowDueJob
{
    private readonly FrameworkDbContext _context;
    private readonly ILogger<WorkflowDueJob> _logger;

    public WorkflowDueJob(FrameworkDbContext context, ILogger<WorkflowDueJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task ExecuteAsync(Hangfire.IJobCancellationToken cancellationToken)
    {
        var now = DateTime.Now;
        var overdue = await _context.WorkflowTasks
            .Where(t => !t.Finished && t.ExpirationDate != null && t.ExpirationDate < now)
            .Select(t => t.IDWorkflowTask)
            .ToListAsync();

        var marked = 0;
        foreach (var taskId in overdue)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var latest = await _context.WorkflowHistories.AsNoTracking()
                .Where(h => h.IDWorkflowTask == taskId)
                .OrderByDescending(h => h.Date)
                .ThenByDescending(h => h.IDWorkflowHistory)
                .Select(h => h.State2)
                .FirstOrDefaultAsync();
            if (string.Equals(latest, "Expired", StringComparison.OrdinalIgnoreCase)) continue;

            await _context.WorkflowHistories.AddAsync(new Entity.Entities.WorkflowHistory
            {
                IDWorkflowTask = taskId,
                Date = now,
                State1 = "Open",
                State2 = "Expired",
            });
            marked++;
        }

        if (marked > 0) await _context.SaveChangesAsync();
        _logger.LogInformation("WorkflowDueJob finished: {Overdue} overdue tasks, {Marked} marked as expired.", overdue.Count, marked);
    }
}
