using ImPedro.Entity.Entities;

namespace ImPedro.Data.Dtos;

public sealed class UserDto
{
    public int IDUser { get; set; }
    public string Username { get; set; } = string.Empty;
    public string? Fullname { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? ZipCode { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public bool HasPhoto { get; set; }
    public bool IsGroup { get; set; }
    public int? IDApplication { get; set; }

    public static UserDto FromEntity(MetaUser user) => new()
    {
        IDUser = user.IDUser,
        Username = user.Username,
        Fullname = user.Fullname,
        Email = user.Email,
        Address = user.Address,
        City = user.City,
        ZipCode = user.ZipCode,
        Phone = user.Phone,
        Mobile = user.Mobile,
        HasPhoto = user.Picture is { Length: > 0 },
        IsGroup = user.IsGroup,
        IDApplication = user.IDApplication,
    };
}
