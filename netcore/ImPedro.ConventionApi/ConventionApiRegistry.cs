namespace ImPedro.ConventionApi;

internal sealed class ConventionApiRegistry
{
    public IReadOnlyList<Type> ServiceTypes { get; set; } = [];
}
