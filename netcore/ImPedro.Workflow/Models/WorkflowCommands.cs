namespace ImPedro.Workflow.Models;

public sealed record WorkflowFieldDraft(string Name, string Label, int EditorType = 1, bool Required = false, bool ReadOnly = false, string? Value = null);

public sealed record WorkflowTaskDraft(
    int AssigneeUserId,
    string Task,
    string Name,
    string? Subject = null,
    string? Comments = null,
    DateTime? ExpirationDate = null,
    IReadOnlyList<WorkflowFieldDraft>? Fields = null);

public sealed record StartWorkflowCommand(
    int DefinitionId,
    DateTime? NextRun = null,
    IReadOnlyList<WorkflowTaskDraft>? InitialTasks = null);

public sealed record WorkflowTaskSnapshot(
    int TaskId,
    int AssigneeUserId,
    string Task,
    string Name,
    string? Subject,
    string? Comments,
    bool Finished,
    DateTime CreatedDate,
    DateTime? ModifiedDate,
    DateTime? ExpirationDate,
    IReadOnlyList<WorkflowFieldSnapshot> Fields);

public sealed record WorkflowFieldSnapshot(int FieldId, string Name, string Label, int EditorType, bool ReadOnly, bool Required, string? Value);

public sealed record WorkflowSnapshot(
    int WorkflowId,
    int DefinitionId,
    DateTime CreatedDate,
    DateTime ModifiedDate,
    DateTime? FinishedDate,
    DateTime? NextRun,
    IReadOnlyList<WorkflowTaskSnapshot> Tasks);
