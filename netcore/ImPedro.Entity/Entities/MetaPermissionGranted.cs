namespace ImPedro.Entity.Entities;

public class MetaPermissionGranted
{
    public int IDPermissionGranted { get; set; }
    public int IDTypePermission { get; set; }
    public int IDRelatedTable { get; set; }
    public int IDPermission { get; set; }
    public int IDUser { get; set; }
    public int? IDProfile { get; set; }
}
