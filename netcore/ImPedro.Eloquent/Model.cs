namespace ImPedro.Eloquent;

public abstract class Model
{
    public virtual IReadOnlyList<string> Fillable => [];

    public virtual IReadOnlyList<string> Guarded => ["*"];

    protected internal virtual IDictionary<string, Func<object?, object?>> Casts => new Dictionary<string, Func<object?, object?>>();

    public Model Fill(IDictionary<string, object?> values)
    {
        Eloquent.Fill(this, values,
            Fillable.Count > 0 ? Fillable : null,
            Fillable.Count > 0 ? null : Guarded);
        return this;
    }

    public T? Get<T>(string name)
    {
        var property = AttributeAccess.Resolve(GetType(), name);
        return Eloquent.GetAttribute<T>(this, property.Name,
            Casts.TryGetValue(property.Name, out var cast) ? cast : null);
    }

    public void Set(string name, object? value) => Eloquent.SetAttribute(this, name, value);

    public IDictionary<string, object?> ToDictionary() => Eloquent.ToDictionary(this, Casts);

    public Task SaveAsync(CancellationToken cancellationToken = default)
        => Eloquent.SaveAsync(this, cancellationToken);

    public Task DeleteAsync(CancellationToken cancellationToken = default)
        => Eloquent.DeleteAsync(this, cancellationToken);

    public Task RefreshAsync(CancellationToken cancellationToken = default)
        => Eloquent.RefreshAsync(this, cancellationToken);

    public Task RestoreAsync(CancellationToken cancellationToken = default)
        => Eloquent.RestoreAsync(this, cancellationToken);
}
