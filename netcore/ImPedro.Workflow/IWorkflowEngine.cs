using ImPedro.Entity.Entities;
using ImPedro.Workflow.Models;
using WorkflowInstance = ImPedro.Entity.Entities.Workflow;

namespace ImPedro.Workflow;

public interface IWorkflowEngine
{
    Task<WorkflowInstance> StartAsync(StartWorkflowCommand command, CancellationToken cancellationToken = default);
    Task<WorkflowTask> AddTaskAsync(int workflowId, WorkflowTaskDraft draft, CancellationToken cancellationToken = default);
    Task SetFieldValueAsync(int fieldId, int userId, string? value, CancellationToken cancellationToken = default);
    Task CompleteTaskAsync(int taskId, int userId, string? comments = null, string? nextState = null, CancellationToken cancellationToken = default);
    Task<WorkflowAttachment> AddAttachmentAsync(int workflowId, string name, string filename, CancellationToken cancellationToken = default);
    Task<WorkflowSnapshot?> GetAsync(int workflowId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<WorkflowTask>> GetDueTasksAsync(DateTime utcNow, CancellationToken cancellationToken = default);
}
