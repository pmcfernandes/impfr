using ImPedro.Entity;
using ImPedro.Entity.Entities;
using ImPedro.Workflow.Models;
using Microsoft.EntityFrameworkCore;
using WorkflowInstance = ImPedro.Entity.Entities.Workflow;

namespace ImPedro.Workflow;

public sealed class WorkflowEngine : IWorkflowEngine
{
    private readonly FrameworkDbContext _context;

    public WorkflowEngine(FrameworkDbContext context) => _context = context;

    public async Task<WorkflowInstance> StartAsync(StartWorkflowCommand command, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(command);
        var definition = await _context.WorkflowDefinitions
            .AnyAsync(item => item.IDWorkflowDefinition == command.DefinitionId && !item.Deprecated, cancellationToken);
        if (!definition) throw new KeyNotFoundException($"Active workflow definition {command.DefinitionId} was not found.");

        var now = DateTime.UtcNow;
        var workflow = new WorkflowInstance
        {
            IDWorkflowDefinition = command.DefinitionId,
            CreatedDate = now,
            ModifiedDate = now,
            Nextrun = command.NextRun,
            Diagram = Array.Empty<byte>(),
        };
        await _context.Workflows.AddAsync(workflow, cancellationToken);
        foreach (var task in command.InitialTasks ?? []) AddTask(workflow, task, now);
        await _context.SaveChangesAsync(cancellationToken);
        return workflow;
    }

    public async Task<WorkflowTask> AddTaskAsync(int workflowId, WorkflowTaskDraft draft, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(draft);
        var workflow = await ActiveWorkflowAsync(workflowId, cancellationToken);
        var now = DateTime.UtcNow;
        var task = AddTask(workflow, draft, now);
        workflow.ModifiedDate = now;
        await _context.SaveChangesAsync(cancellationToken);
        return task;
    }

    public async Task SetFieldValueAsync(int fieldId, int userId, string? value, CancellationToken cancellationToken = default)
    {
        var field = await _context.WorkflowFields.FirstOrDefaultAsync(item => item.IDWorkflowField == fieldId, cancellationToken)
            ?? throw new KeyNotFoundException($"Workflow field {fieldId} was not found.");
        if (field.ReadOnly) throw new InvalidOperationException($"Workflow field '{field.Name}' is read-only.");
        var task = await AssignedOpenTaskAsync(field.IDWorkflowTask, userId, cancellationToken);
        field.Value = value;
        task.ModifiedDate = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task CompleteTaskAsync(int taskId, int userId, string? comments = null, string? nextState = null, CancellationToken cancellationToken = default)
    {
        var task = await AssignedOpenTaskAsync(taskId, userId, cancellationToken);
        var missing = await _context.WorkflowFields.AsNoTracking()
            .Where(field => field.IDWorkflowTask == taskId && field.Required && string.IsNullOrWhiteSpace(field.Value))
            .Select(field => field.Name)
            .ToListAsync(cancellationToken);
        if (missing.Count > 0) throw new InvalidOperationException($"Required workflow fields are missing: {string.Join(", ", missing)}.");

        var now = DateTime.UtcNow;
        task.Finished = true;
        task.ModifiedDate = now;
        task.ModifiedUser = userId;
        if (comments is not null) task.Comments = comments;
        await _context.WorkflowHistories.AddAsync(new WorkflowHistory
        {
            IDWorkflowTask = taskId,
            Date = now,
            IDUser = userId,
            State1 = "Open",
            State2 = nextState ?? "Completed",
        }, cancellationToken);

        var workflow = await _context.Workflows.FirstAsync(item => item.IDWorkflow == task.IDWorkflow, cancellationToken);
        workflow.ModifiedDate = now;
        var hasOpenTasks = await _context.WorkflowTasks.AnyAsync(item => item.IDWorkflow == task.IDWorkflow && !item.Finished && item.IDWorkflowTask != taskId, cancellationToken);
        if (!hasOpenTasks) workflow.FinishedDate = now;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<WorkflowAttachment> AddAttachmentAsync(int workflowId, string name, string filename, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(filename)) throw new ArgumentException("Attachment name and filename are required.");
        await ActiveWorkflowAsync(workflowId, cancellationToken);
        var attachment = new WorkflowAttachment { IDWorkflow = workflowId, Name = name.Trim(), Filename = filename.Trim(), CreatedDate = DateTime.UtcNow };
        await _context.WorkflowAttachments.AddAsync(attachment, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return attachment;
    }

    public async Task<WorkflowSnapshot?> GetAsync(int workflowId, CancellationToken cancellationToken = default)
    {
        var workflow = await _context.Workflows.AsNoTracking().FirstOrDefaultAsync(item => item.IDWorkflow == workflowId, cancellationToken);
        if (workflow is null) return null;
        var tasks = await _context.WorkflowTasks.AsNoTracking().Where(item => item.IDWorkflow == workflowId).OrderBy(item => item.CreatedDate).ToListAsync(cancellationToken);
        var taskIds = tasks.Select(item => item.IDWorkflowTask).ToArray();
        var fields = await _context.WorkflowFields.AsNoTracking().Where(item => taskIds.Contains(item.IDWorkflowTask)).ToListAsync(cancellationToken);
        return new WorkflowSnapshot(workflow.IDWorkflow, workflow.IDWorkflowDefinition, workflow.CreatedDate, workflow.ModifiedDate, workflow.FinishedDate, workflow.Nextrun,
            tasks.Select(task => new WorkflowTaskSnapshot(task.IDWorkflowTask, task.IDUser, task.Task, task.Name, task.Subject, task.Comments, task.Finished, task.CreatedDate, task.ModifiedDate, task.ExpirationDate,
                fields.Where(field => field.IDWorkflowTask == task.IDWorkflowTask).Select(field => new WorkflowFieldSnapshot(field.IDWorkflowField, field.Name, field.Label, field.EditorType, field.ReadOnly, field.Required, field.Value)).ToArray())).ToArray());
    }

    public async Task<IReadOnlyList<WorkflowTask>> GetDueTasksAsync(DateTime utcNow, CancellationToken cancellationToken = default)
        => await _context.WorkflowTasks.AsNoTracking().Where(task => !task.Finished && task.ExpirationDate != null && task.ExpirationDate <= utcNow).OrderBy(task => task.ExpirationDate).ToListAsync(cancellationToken);

    private WorkflowTask AddTask(WorkflowInstance workflow, WorkflowTaskDraft draft, DateTime now)
    {
        if (draft.AssigneeUserId <= 0 || string.IsNullOrWhiteSpace(draft.Task) || string.IsNullOrWhiteSpace(draft.Name))
            throw new ArgumentException("Task, name, and assignee user are required.", nameof(draft));
        var task = new WorkflowTask
        {
            IDWorkflow = workflow.IDWorkflow,
            IDWorkflowDefinition = workflow.IDWorkflowDefinition,
            IDUser = draft.AssigneeUserId,
            Task = draft.Task.Trim(),
            Name = draft.Name.Trim(),
            Subject = draft.Subject,
            Comments = draft.Comments,
            ExpirationDate = draft.ExpirationDate,
            CreatedDate = now,
            Finished = false,
        };
        _context.WorkflowTasks.Add(task);
        foreach (var field in draft.Fields ?? [])
        {
            if (string.IsNullOrWhiteSpace(field.Name) || string.IsNullOrWhiteSpace(field.Label)) throw new ArgumentException("Workflow field name and label are required.", nameof(draft));
            _context.WorkflowFields.Add(new WorkflowField { IDWorkflowTask = task.IDWorkflowTask, Name = field.Name.Trim(), Label = field.Label.Trim(), EditorType = field.EditorType, Required = field.Required, ReadOnly = field.ReadOnly, Value = field.Value });
        }
        return task;
    }

    private async Task<WorkflowInstance> ActiveWorkflowAsync(int workflowId, CancellationToken cancellationToken)
    {
        var workflow = await _context.Workflows.FirstOrDefaultAsync(item => item.IDWorkflow == workflowId, cancellationToken)
            ?? throw new KeyNotFoundException($"Workflow {workflowId} was not found.");
        if (workflow.FinishedDate is not null) throw new InvalidOperationException($"Workflow {workflowId} is already finished.");
        return workflow;
    }

    private async Task<WorkflowTask> AssignedOpenTaskAsync(int taskId, int userId, CancellationToken cancellationToken)
    {
        var task = await _context.WorkflowTasks.FirstOrDefaultAsync(item => item.IDWorkflowTask == taskId, cancellationToken)
            ?? throw new KeyNotFoundException($"Workflow task {taskId} was not found.");
        if (task.IDUser != userId) throw new UnauthorizedAccessException("Only the assigned user can change this workflow task.");
        if (task.Finished) throw new InvalidOperationException($"Workflow task {taskId} is already finished.");
        return task;
    }
}
