namespace ImPedro.Entity.Entities;

public class MetaDayView
{
    public int IDDayView { get; set; }
    public string? CodDayView { get; set; }
    public string DayView { get; set; } = null!;
    public string? Location { get; set; }
    public DateTime BeginDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public string? Description { get; set; }
    public string? RememberInfo { get; set; }
    public string? RecurrenceInfo { get; set; }
    public bool AllDay { get; set; }
    public string? ResourceID { get; set; }
    public int? LabelID { get; set; }
    public int? TypeID { get; set; }
    public int? StatusID { get; set; }
    public int? IDUser { get; set; }
    public string? OutlookEntryID { get; set; }
    public int? PercentageComplete { get; set; }
    public int? CreatedById { get; set; }
    public bool IsDeleted { get; set; }
    public string? Timespan { get; set; }
    public bool? Locked { get; set; }
    public int? LockedBy { get; set; }
    public DateTime? LockedAt { get; set; }
    public string? Guid { get; set; }
}
