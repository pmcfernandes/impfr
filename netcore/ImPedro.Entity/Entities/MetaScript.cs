namespace ImPedro.Entity.Entities;

public class MetaScript
{
    public int IDScript { get; set; }
    public string Name { get; set; } = null!;
    public string SourceCode { get; set; } = null!;
    public bool Enabled { get; set; }
    public string InterfaceFullname { get; set; } = null!;
    public string HostFullname { get; set; } = null!;
    public string? AssemblyPath { get; set; }
    public int Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public int ModifiedBy { get; set; }
}
