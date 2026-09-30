namespace ImPedro.Entity.Entities;

public class MetaUser
{
    public int IDUser { get; set; }
    public string Username { get; set; } = null!;
    public string? Password { get; set; }
    public string? Fullname { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? ZipCode { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public string Email { get; set; } = null!;
    public bool IsGroup { get; set; }
    public bool IsAuditable { get; set; }
    public byte[]? Picture { get; set; }
    public int? IDApplication { get; set; }
    public int? CreatedById { get; set; }
    public bool IsDeleted { get; set; }
    public string? Timespan { get; set; }
    public bool? Locked { get; set; }
    public int? LockedBy { get; set; }
    public DateTime? LockedAt { get; set; }
    public string? Guid { get; set; }
}
