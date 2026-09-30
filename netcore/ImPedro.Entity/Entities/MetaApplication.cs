namespace ImPedro.Entity.Entities;

public class MetaApplication
{
    public int IDApplication { get; set; }
    public string CodApplication { get; set; } = null!;
    public string Application { get; set; } = null!;
    public bool Installed { get; set; }
    public string DBAppVersion { get; set; } = null!;
    public string? LicenseName { get; set; }
    public string? LicenseCode { get; set; }
    public DateTime? ExpireDate { get; set; }
    public string? ConnectionString { get; set; }
}
