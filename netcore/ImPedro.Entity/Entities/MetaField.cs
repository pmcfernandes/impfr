namespace ImPedro.Entity.Entities;

public class MetaField
{
    public int IDField { get; set; }
    public int IDTable { get; set; }
    public string Fieldname { get; set; } = null!;
    public int FieldType { get; set; }
    public int FieldSize { get; set; }
    public string FieldCaption0 { get; set; } = null!;
    public string? FieldCaption1 { get; set; }
    public string? FieldDescription0 { get; set; }
    public string? FieldDescription1 { get; set; }
    public bool PrimaryKey { get; set; }
    public bool ReadOnly { get; set; }
    public bool AutoIncrement { get; set; }
    public bool Required { get; set; }
    public bool? Updatable { get; set; }
    public string? ForeignTable { get; set; }
    public string? ForeignField { get; set; }
    public string? ForeignDescription { get; set; }
    public string? RowSource { get; set; }
    public string? ControlType { get; set; }
    public string? DefaultValue { get; set; }
    public string? Format { get; set; }
    public string? ValidationRule { get; set; }
    public string? ValidationText { get; set; }
    public bool Searchable { get; set; }
    public bool SearchResult { get; set; }
    public int SearchOrder { get; set; }
    public bool AuditSelect { get; set; }
    public bool AuditInsert { get; set; }
    public bool AuditUpdate { get; set; }
    public bool AuditDelete { get; set; }
}
