namespace ImPedro.Entity.Entities;

public class MetaGraphSearch
{
    public int IDGraphSearch { get; set; }
    public int IDGraph { get; set; }
    public string FieldCaption0 { get; set; } = null!;
    public string Operator { get; set; } = null!;
    public string ParameterName { get; set; } = null!;
    public string? DefaultValue { get; set; }
    public int ItemOrder { get; set; }
    public string? ControlType { get; set; }
    public int? IDTable { get; set; }
    public string? Pagename { get; set; }
    public bool IsTitle { get; set; }
}
