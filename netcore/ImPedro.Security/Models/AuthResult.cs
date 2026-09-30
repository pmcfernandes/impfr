using ImPedro.Data.Dtos;

namespace ImPedro.Security.Models;

public sealed record AuthResult(bool Success, string? Error, UserDto? User, string? Token, string? JwtToken = null)
{
    public static AuthResult Ok(UserDto user, string token, string? jwtToken = null) => new(true, null, user, token, jwtToken);
    public static AuthResult Fail(string error) => new(false, error, null, null);
}
