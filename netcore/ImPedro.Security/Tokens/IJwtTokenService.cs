using ImPedro.Data.Dtos;

namespace ImPedro.Security.Tokens;

public interface IJwtTokenService
{
    string CreateToken(UserDto user, IEnumerable<string>? permissions = null);
}
