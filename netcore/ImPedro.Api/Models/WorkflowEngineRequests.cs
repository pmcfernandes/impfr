namespace ImPedro.Api.Models;

public sealed record SetWorkflowFieldValueRequest(string? Value);
public sealed record CompleteWorkflowTaskRequest(string? Comments = null, string? NextState = null);
public sealed record AddWorkflowAttachmentRequest(string Name, string Filename);
