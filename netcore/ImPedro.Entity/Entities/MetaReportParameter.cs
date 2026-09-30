namespace ImPedro.Entity.Entities;

public class MetaReportParameter
{
    public int IDParameter { get; set; }
    public int IDReport { get; set; }
    public string? Description { get; set; }
    public string ParameterName { get; set; } = null!;
    public string? ParameterValue { get; set; }
    public string? ParameterType { get; set; }
    public string? MinValue { get; set; }
    public string? MaxValue { get; set; }
    public string? DataSourceTable { get; set; }
}
