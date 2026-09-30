namespace ImPedro.Entity.Entities;

public class ResourcesScheduler
{
    public int ResourceID { get; set; }
    public string ResourceName { get; set; } = null!;
    public string? Description { get; set; }
    public string Color { get; set; } = null!;
    public byte[]? Image { get; set; }
}
