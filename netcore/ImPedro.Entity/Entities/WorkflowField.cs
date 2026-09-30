namespace ImPedro.Entity.Entities;

public class WorkflowField
{
    public int IDWorkflowField { get; set; }
    public int IDWorkflowTask { get; set; }
    public string Name { get; set; } = null!;
    public string Label { get; set; } = null!;
    public int EditorType { get; set; }
    public bool ReadOnly { get; set; }
    public bool Required { get; set; }
    public string? Value { get; set; }
}
