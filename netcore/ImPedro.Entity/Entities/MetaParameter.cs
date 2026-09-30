namespace ImPedro.Entity.Entities;

public class MetaParameter
{
    public int IDParameter { get; set; }
    public string ParameterName { get; set; } = null!;
    public string? ParameterValue { get; set; }
    public string? Description { get; set; }
    public int? IDApplication { get; set; }
}
