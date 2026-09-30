namespace ImPedro.Entity.Entities;

public class MetaTableAudit
{
    public int IDUser { get; set; }
    public DateTime DateTime { get; set; }
    public int IDTable { get; set; }
    public int? IDRelatedTable { get; set; }
    public int? IDPermission { get; set; }
    public string? Comments { get; set; }
    public MetaTable Table { get; set; } = null!;
    public MetaTable? RelatedTable { get; set; }
}
