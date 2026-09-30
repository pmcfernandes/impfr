namespace ImPedro.Entity.Entities;

public class MetaContext
{
    public int IDContext { get; set; }
    public int IDModule { get; set; }
    public string ContextCaption0 { get; set; } = null!;
    public string? ContextCaption1 { get; set; }
    public string? ContextDescription0 { get; set; }
    public string? ContextDescription1 { get; set; }
    public int? ContextImage { get; set; }
    public string ContextUrl { get; set; } = null!;
    public string? ContextImageUrl { get; set; }
    public string ContextTarget { get; set; } = null!;
    public bool Visible { get; set; }
    public int ItemOrder { get; set; }
}
