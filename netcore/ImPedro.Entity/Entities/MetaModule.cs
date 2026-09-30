namespace ImPedro.Entity.Entities;

public class MetaModule
{
    public int IDModule { get; set; }
    public int? IDModuleParent { get; set; }
    public string ModuleCaption0 { get; set; } = null!;
    public string? ModuleCaption1 { get; set; }
    public bool Visible { get; set; }
    public int ItemOrder { get; set; }
    public int? IDApplication { get; set; }
}
