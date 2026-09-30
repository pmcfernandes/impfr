namespace ImPedro.Entity.Entities;

public class Workflow
{
    public int IDWorkflow { get; set; }
    public int IDWorkflowDefinition { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public DateTime? FinishedDate { get; set; }
    public DateTime? Nextrun { get; set; }
    public byte[] Diagram { get; set; } = null!;
}
