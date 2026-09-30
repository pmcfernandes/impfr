using ImPedro.Entity.Entities;

namespace ImPedro.Data.Dtos;

public sealed class UserDto
{
    public int IDUser { get; set; }
    public string Username { get; set; } = string.Empty;
    public string? Fullname { get; set; }
    public string Email { get; set; } = string.Empty;
    public bool IsGroup { get; set; }
    public int? IDApplication { get; set; }

    public static UserDto FromEntity(MetaUser user) => new()
    {
        IDUser = user.IDUser,
        Username = user.Username,
        Fullname = user.Fullname,
        Email = user.Email,
        IsGroup = user.IsGroup,
        IDApplication = user.IDApplication,
    };
}
