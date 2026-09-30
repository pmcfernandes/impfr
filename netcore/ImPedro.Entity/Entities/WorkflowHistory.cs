namespace ImPedro.Entity.Entities;

public class WorkflowHistory
{
    public int IDWorkflowHistory { get; set; }
    public int IDWorkflowTask { get; set; }
    public DateTime? Date { get; set; }
    public int? IDUser { get; set; }
    public string? State1 { get; set; }
    public string? State2 { get; set; }
}
