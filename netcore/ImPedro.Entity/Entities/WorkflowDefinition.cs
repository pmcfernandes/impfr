namespace ImPedro.Entity.Entities;

public class WorkflowDefinition
{
    public int IDWorkflowDefinition { get; set; }
    public string Name { get; set; } = null!;
    public string? Label { get; set; }
    public bool Deprecated { get; set; }
    public byte[]? Diagram { get; set; }
}
