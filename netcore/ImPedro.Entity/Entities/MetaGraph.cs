namespace ImPedro.Entity.Entities;

public class MetaGraph
{
    public int IDGraph { get; set; }
    public string? CodGraph { get; set; }
    public string GraphName { get; set; } = null!;
    public int? IDContext { get; set; }
    public int? IDGraphParent { get; set; }
    public string GraphCaption0 { get; set; } = null!;
    public string? GraphCaption1 { get; set; }
    public string SQLSyntax { get; set; } = null!;
    public int? GraphType { get; set; }
    public bool ShowReport { get; set; }
    public bool Enabled { get; set; }
    public int? IDApplication { get; set; }
}
