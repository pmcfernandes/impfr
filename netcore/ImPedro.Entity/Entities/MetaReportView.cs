namespace ImPedro.Entity.Entities;

public class MetaReportView
{
    public int IDReportView { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string ConnectionString { get; set; } = null!;
}
