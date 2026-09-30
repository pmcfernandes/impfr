namespace ImPedro.Security.Models;

public sealed record PasswordResetTicket(string Email, string Token);

public sealed record PermissionAssignment(string TableName, string PermissionCode);
