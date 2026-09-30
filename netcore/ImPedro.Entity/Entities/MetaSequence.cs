namespace ImPedro.Entity.Entities;

public class MetaSequence
{
    public int IDSequence { get; set; }
    public string? Name { get; set; }
    public string? Tablename { get; set; }
    public int InitialValue { get; set; }
    public int CurrentValue { get; set; }
}
