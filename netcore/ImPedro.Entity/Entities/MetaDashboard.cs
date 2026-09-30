namespace ImPedro.Entity.Entities;

public class MetaDashboard
{
    public int IDDashboard { get; set; }
    public string Name { get; set; } = null!;
    public string? Filename { get; set; }
    public byte[] Stream { get; set; } = null!;
    public int? IDApplication { get; set; }
    public Guid? gui { get; set; }
}
