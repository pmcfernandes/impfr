namespace ImPedro.Entity.Entities;

public class MetaFieldAudit
{
    public int IDUser { get; set; }
    public DateTime DateTime { get; set; }
    public string? Version { get; set; }
    public int IDTable { get; set; }
    public int IDField { get; set; }
    public int IDRelatedField { get; set; }
    public MetaField Field { get; set; } = null!;
    public MetaField RelatedField { get; set; } = null!;
    public string? OldValue { get; set; }
    public string? NewValue { get; set; }
}
