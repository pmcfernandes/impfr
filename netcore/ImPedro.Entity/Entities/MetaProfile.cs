namespace ImPedro.Entity.Entities;

public class MetaProfile
{
    public int IDProfile { get; set; }
    public string CodProfile { get; set; } = null!;
    public string Profile { get; set; } = null!;
    public bool IsDeleted { get; set; }
}
