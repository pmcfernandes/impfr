namespace ImPedro.Entity.Entities;

public class CustomValue
{
    public string Tablename { get; set; } = null!;
    public int IDRelatedTable { get; set; }
    public string Name { get; set; } = null!;
    public object Value { get; set; } = null!;
}
