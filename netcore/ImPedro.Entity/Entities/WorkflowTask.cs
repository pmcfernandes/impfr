namespace ImPedro.Entity.Entities;

public class WorkflowTask
{
    public int IDWorkflowTask { get; set; }
    public int IDWorkflow { get; set; }
    public string Task { get; set; } = null!;
    public DateTime CreatedDate { get; set; }
    public int IDUser { get; set; }
    public string Name { get; set; } = null!;
    public string? Subject { get; set; }
    public string? Comments { get; set; }
    public int IDWorkflowDefinition { get; set; }
    public bool Finished { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedUser { get; set; }
    public DateTime? ExpirationDate { get; set; }
}
