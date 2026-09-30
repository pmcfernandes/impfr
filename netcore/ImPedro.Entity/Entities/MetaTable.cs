namespace ImPedro.Entity.Entities;

public class MetaTable
{
    public int IDTable { get; set; }
    public string Tablename { get; set; } = null!;
    public string TableCaption0 { get; set; } = null!;
    public string? TableCaption1 { get; set; }
    public bool AuditSelect { get; set; }
    public bool AuditInsert { get; set; }
    public bool AuditUpdate { get; set; }
    public bool AuditDelete { get; set; }
    public int? IDApplication { get; set; }
}
