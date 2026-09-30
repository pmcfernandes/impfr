namespace ImPedro.Entity.Entities;

public class VwAllActiveUser
{
    public int IDUser { get; set; }
    public string Username { get; set; } = null!;
    public string? Fullname { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? ZipCode { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public string Email { get; set; } = null!;
    public bool IsAuditable { get; set; }
    public int? IDApplication { get; set; }
}
