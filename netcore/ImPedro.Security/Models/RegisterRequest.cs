namespace ImPedro.Security.Models;

public sealed record RegisterRequest(
    string Username,
    string Email,
    string Password,
    string? Fullname = null,
    IReadOnlyList<int>? GroupIds = null);
