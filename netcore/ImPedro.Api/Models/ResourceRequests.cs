namespace ImPedro.Api.Models;

public sealed record CreateUserRequest(
    string Username,
    string Email,
    string Password,
    string? Fullname = null,
    string? Address = null,
    string? City = null,
    string? ZipCode = null,
    string? Phone = null,
    string? Mobile = null,
    string? PhotoName = null);

public sealed record UpdateUserRequest(
    string? Username = null,
    string? Fullname = null,
    string? Email = null,
    string? Address = null,
    string? City = null,
    string? ZipCode = null,
    string? Phone = null,
    string? Mobile = null,
    string? PhotoName = null);

public sealed record SetPasswordRequest(string NewPassword);

public sealed record CreateGroupRequest(string Name, string? Email = null, string? Description = null);

public sealed record UpdateGroupRequest(string? Name = null, string? Description = null);

public sealed record PermissionAssignmentDto(string TableName, string PermissionCode);

public sealed record SetGroupPermissionsRequest(List<PermissionAssignmentDto> Assignments);

public sealed record SetParameterRequest(string? Value);

public sealed record SetCustomValueRequest(string TableName, int RelatedId, string Name, System.Text.Json.JsonElement Value);

public sealed record ProcedureRequest(Dictionary<string, System.Text.Json.JsonElement>? Parameters = null);

public sealed record SaveFieldValueRequest(string? Value);

public sealed record FinishTaskRequest(string? Comments = null, string? FromState = null, string? ToState = null);

public sealed record AddAttachmentRequest(string Name, string Filename);

public sealed record CreateTaskRequest(
    int WorkflowId,
    string Task,
    int UserId,
    string Name,
    string? Subject = null,
    string? Comments = null,
    int WorkflowDefinitionId = 0,
    DateTime? ExpirationDate = null);
