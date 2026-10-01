namespace ImPedro.Data.Initialization;

public sealed class FrameworkInitializerOptions
{
    public bool Enabled { get; set; }
    public string ApplicationCode { get; set; } = "app";
    public string ApplicationName { get; set; } = "Main App";
    public string ApplicationVersion { get; set; } = "1.00.00.00";
    public string AdminUsername { get; set; } = "admin";
    public string AdminPassword { get; set; } = "admin";
    public string AdminName { get; set; } = "Administrator";
    public string AdminEmail { get; set; } = "admin@example.com";
    public string AdministratorGroupName { get; set; } = "Administradores";
}
