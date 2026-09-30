namespace ImPedro.ConventionApi;

public sealed class ConventionApiOptions
{
    public string ServiceSuffix { get; set; } = "AppService";

    public ISet<Type> IncludedServices { get; } = new HashSet<Type>();

    public ConventionApiOptions Include<TService>() where TService : class
    {
        IncludedServices.Add(typeof(TService));
        return this;
    }
}
