namespace ImPedro.Entity.Entities;

public class MetaGroupUser
{
    public int IDUser { get; set; }
    public int IDGroup { get; set; }
    public MetaUser User { get; set; } = null!;
    public MetaUser Group { get; set; } = null!;
}
