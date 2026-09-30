namespace ImPedro.Entity.Entities;

public class MetaMenuItem
{
    public int IDMenuItem { get; set; }
    public string? CodMenuItem { get; set; }
    public string MenuItem0 { get; set; } = null!;
    public string? MenuItem1 { get; set; }
    public int? IDMenuItemParent { get; set; }
    public string MenuType { get; set; } = null!;
    public string? Function { get; set; }
    public string? ImageIcon { get; set; }
    public int ItemOrder { get; set; }
    public bool Visible { get; set; }
}
