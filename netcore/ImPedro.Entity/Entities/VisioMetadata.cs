namespace ImPedro.Entity.Entities;

public class VisioMetadata
{
    public int ID { get; set; }
    public string Filename { get; set; } = null!;
    public int PageID { get; set; }
    public int ShapeID { get; set; }
    public int? WorkflowID { get; set; }
    public string? WorkflowTable { get; set; }
    public int? WorkflowTableID { get; set; }
}
