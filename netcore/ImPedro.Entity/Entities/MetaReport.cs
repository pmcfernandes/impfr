namespace ImPedro.Entity.Entities;

public class MetaReport
{
    public int IDReport { get; set; }
    public string ReportName { get; set; } = null!;
    public string? Description { get; set; }
    public string? Filename { get; set; }
    public byte[]? Stream { get; set; }
    public string? ExportTo { get; set; }
    public DateTime ExportDate { get; set; }
    public int? IDReportView { get; set; }
    public int? IDReportCategory { get; set; }
    public int? IDApplication { get; set; }
}
