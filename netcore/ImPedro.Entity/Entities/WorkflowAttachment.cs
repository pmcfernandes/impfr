namespace ImPedro.Entity.Entities;

public class WorkflowAttachment
{
    public int IDAttachment { get; set; }
    public int IDWorkflow { get; set; }
    public string Name { get; set; } = null!;
    public string Filename { get; set; } = null!;
    public DateTime CreatedDate { get; set; }
}
