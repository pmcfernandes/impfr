using ImPedro.Data.Dtos;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class WorkflowService
{
    private readonly FrameworkDbContext _context;

    public WorkflowService(FrameworkDbContext context)
    {
        _context = context;
    }

    public Task<List<WorkflowDefinition>> GetDefinitionsAsync(bool activeOnly = true, CancellationToken cancellationToken = default)
    {
        var query = _context.WorkflowDefinitions.AsNoTracking().AsQueryable();
        if (activeOnly) query = query.Where(d => !d.Deprecated);
        return query.OrderBy(d => d.Name).ToListAsync(cancellationToken);
    }

    public async Task<Workflow> StartWorkflowAsync(int definitionId, CancellationToken cancellationToken = default)
    {
        var now = DateTime.Now;
        var workflow = new Workflow
        {
            IDWorkflowDefinition = definitionId,
            CreatedDate = now,
            ModifiedDate = now,
            Diagram = Array.Empty<byte>(),
        };
        await _context.Workflows.AddAsync(workflow, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return workflow;
    }

    public Task<PagedResult<WorkflowTask>> GetTasksAsync(
        int page,
        int pageSize,
        int? userId = null,
        int? workflowId = null,
        bool? finished = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.WorkflowTasks.AsNoTracking().AsQueryable();
        if (userId.HasValue) query = query.Where(t => t.IDUser == userId.Value);
        if (workflowId.HasValue) query = query.Where(t => t.IDWorkflow == workflowId.Value);
        if (finished.HasValue) query = query.Where(t => t.Finished == finished.Value);
        return ToPagedAsync(query.OrderByDescending(t => t.CreatedDate), page, pageSize, cancellationToken);
    }

    public Task<WorkflowTask?> GetTaskAsync(int taskId, CancellationToken cancellationToken = default)
        => _context.WorkflowTasks.AsNoTracking()
            .FirstOrDefaultAsync(t => t.IDWorkflowTask == taskId, cancellationToken);

    public async Task<WorkflowTask> CreateTaskAsync(WorkflowTask task, CancellationToken cancellationToken = default)
    {
        task.CreatedDate = DateTime.Now;
        await _context.WorkflowTasks.AddAsync(task, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return task;
    }

    public async Task FinishTaskAsync(
        int taskId,
        int userId,
        string? comments = null,
        string? fromState = null,
        string? toState = null,
        CancellationToken cancellationToken = default)
    {
        var task = await _context.WorkflowTasks
            .FirstOrDefaultAsync(t => t.IDWorkflowTask == taskId, cancellationToken)
            ?? throw new KeyNotFoundException($"Workflow task {taskId} not found.");

        task.Finished = true;
        task.ModifiedDate = DateTime.Now;
        task.ModifiedUser = userId;
        if (comments is not null) task.Comments = comments;

        await _context.WorkflowHistories.AddAsync(new WorkflowHistory
        {
            IDWorkflowTask = taskId,
            Date = DateTime.Now,
            IDUser = userId,
            State1 = fromState,
            State2 = toState ?? "Finished",
        }, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<WorkflowField>> GetTaskFieldsAsync(int taskId, CancellationToken cancellationToken = default)
        => _context.WorkflowFields.AsNoTracking()
            .Where(f => f.IDWorkflowTask == taskId)
            .OrderBy(f => f.IDWorkflowField)
            .ToListAsync(cancellationToken);

    public async Task SaveTaskFieldAsync(int fieldId, string? value, CancellationToken cancellationToken = default)
    {
        var field = await _context.WorkflowFields
            .FirstOrDefaultAsync(f => f.IDWorkflowField == fieldId, cancellationToken)
            ?? throw new KeyNotFoundException($"Workflow field {fieldId} not found.");
        field.Value = value;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<WorkflowAttachment>> GetAttachmentsAsync(int workflowId, CancellationToken cancellationToken = default)
        => _context.WorkflowAttachments.AsNoTracking()
            .Where(a => a.IDWorkflow == workflowId)
            .OrderBy(a => a.CreatedDate)
            .ToListAsync(cancellationToken);

    public async Task<WorkflowAttachment> AddAttachmentAsync(
        int workflowId,
        string name,
        string filename,
        CancellationToken cancellationToken = default)
    {
        var attachment = new WorkflowAttachment
        {
            IDWorkflow = workflowId,
            Name = name,
            Filename = filename,
            CreatedDate = DateTime.Now,
        };
        await _context.WorkflowAttachments.AddAsync(attachment, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return attachment;
    }

    public Task<List<WorkflowHistory>> GetHistoryAsync(int taskId, CancellationToken cancellationToken = default)
        => _context.WorkflowHistories.AsNoTracking()
            .Where(h => h.IDWorkflowTask == taskId)
            .OrderByDescending(h => h.Date)
            .ToListAsync(cancellationToken);

    private static async Task<PagedResult<T>> ToPagedAsync<T>(
        IQueryable<T> query,
        int page,
        int pageSize,
        CancellationToken cancellationToken)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;
        var totalCount = await query.CountAsync(cancellationToken);
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);
        return new PagedResult<T> { Items = items, Page = page, PageSize = pageSize, TotalCount = totalCount };
    }
}
