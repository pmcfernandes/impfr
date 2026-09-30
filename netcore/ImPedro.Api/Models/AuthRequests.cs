namespace ImPedro.Api.Models;

public sealed record LoginRequest(string Username, string Password);

public sealed record ChangePasswordRequest(string CurrentPassword, string NewPassword);

public sealed record RequestResetRequest(string UsernameOrEmail);

public sealed record ResetPasswordRequest(string Token, string NewPassword);
