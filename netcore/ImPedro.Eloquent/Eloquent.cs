using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Linq.Expressions;
using System.Reflection;

namespace ImPedro.Eloquent;

public static class Eloquent
{
    private static readonly AsyncLocal<DbContext?> CurrentScope = new();

    public static DbContext? Current => CurrentScope.Value;

    public static IDisposable Use(DbContext context)
    {
        var previous = CurrentScope.Value;
        CurrentScope.Value = context;
        return new Scope(() => CurrentScope.Value = previous);
    }

    internal static DbContext Require() => Current
        ?? throw new InvalidOperationException(
            "No Eloquent context is active. Wrap calls in Eloquent.Use(context) or register the UseEloquent() middleware.");

    public static EloquentQuery<T> Query<T>() where T : class => new(Require());

    public static async Task<List<T>> AllAsync<T>(CancellationToken cancellationToken = default) where T : class
        => await Query<T>().GetAsync(cancellationToken);

    public static async Task<T?> FindAsync<T>(object?[]? keys, CancellationToken cancellationToken = default) where T : class
        => (T?)await Require().FindAsync(typeof(T), keys, cancellationToken);

    public static async Task<T> FindOrFailAsync<T>(object?[]? keys, CancellationToken cancellationToken = default) where T : class
        => await FindAsync<T>(keys, cancellationToken)
            ?? throw new KeyNotFoundException($"{typeof(T).Name} not found.");

    public static void Fill(
        object entity,
        IDictionary<string, object?> values,
        IEnumerable<string>? fillable = null,
        IEnumerable<string>? guarded = null)
    {
        ArgumentNullException.ThrowIfNull(entity);
        if (values is null) return;

        IReadOnlyList<string>? fill = null;
        IReadOnlyList<string>? guard = null;
        if (entity is Model model)
        {
            fill ??= model.Fillable.Count > 0 ? model.Fillable : null;
            guard ??= model.Fillable.Count > 0 ? null : model.Guarded;
        }
        fill ??= fillable?.ToList();
        guard ??= guarded?.ToList();

        var lookup = new Dictionary<string, object?>(values, StringComparer.OrdinalIgnoreCase);
        foreach (var property in AttributeAccess.Writable(entity.GetType()))
        {
            if (!AttributeAccess.IsAllowed(property.Name, fill, guard)) continue;
            if (!lookup.TryGetValue(property.Name, out var value)) continue;
            property.SetValue(entity, AttributeAccess.Convert(value, property.PropertyType, entity.GetType().Name, property.Name));
        }
    }

    public static T? GetAttribute<T>(
        object entity,
        string name,
        Func<object?, object?>? cast = null)
    {
        ArgumentNullException.ThrowIfNull(entity);
        var property = AttributeAccess.Resolve(entity.GetType(), name);
        if (entity is Model model
            && cast is null
            && model.Casts.TryGetValue(property.Name, out var modelCast))
            cast = modelCast;

        var raw = property.GetValue(entity);
        if (cast is not null) raw = cast(raw);
        if (raw is null || raw is DBNull) return default;
        if (raw is T typed) return typed;
        return (T?)Convert.ChangeType(raw, Nullable.GetUnderlyingType(typeof(T)) ?? typeof(T), CultureInfo.InvariantCulture);
    }

    public static void SetAttribute(object entity, string name, object? value)
    {
        ArgumentNullException.ThrowIfNull(entity);
        var property = AttributeAccess.Resolve(entity.GetType(), name);
        property.SetValue(entity, AttributeAccess.Convert(value, property.PropertyType, entity.GetType().Name, property.Name));
    }

    public static IDictionary<string, object?> ToDictionary(
        object entity,
        IDictionary<string, Func<object?, object?>>? casts = null)
    {
        ArgumentNullException.ThrowIfNull(entity);
        if (entity is Model model && casts is null) casts = model.Casts;

        var result = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        foreach (var property in AttributeAccess.Readable(entity.GetType()))
            result[property.Name] = GetAttribute<object?>(entity, property.Name,
                casts is not null && casts.TryGetValue(property.Name, out var cast) ? cast : null);
        return result;
    }

    public static async Task SaveAsync(object entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        var context = Require();
        var tracked = context.ChangeTracker.Entries()
            .FirstOrDefault(e => e.Entity.GetType() == entity.GetType() && SameKey(context, e.Entity, entity));
        if (tracked is not null)
        {
            tracked.CurrentValues.SetValues(entity);
        }
        else if (IsNew(context, entity))
        {
            context.Add(entity);
        }
        else
        {
            context.Update(entity);
        }
        await context.SaveChangesAsync(cancellationToken);
    }

    public static async Task DeleteAsync(object entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        var context = Require();
        if (SoftDeleteFlag(entity) is { } flag)
        {
            flag.SetValue(entity, true);
            context.Update(entity);
        }
        else
        {
            context.Remove(entity);
        }
        await context.SaveChangesAsync(cancellationToken);
    }

    public static Task RefreshAsync(object entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        return Require().Entry(entity).ReloadAsync(cancellationToken);
    }

    public static async Task RestoreAsync(object entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        if (SoftDeleteFlag(entity) is not { } flag)
            throw new InvalidOperationException($"{entity.GetType().Name} does not support soft deletes.");
        flag.SetValue(entity, false);
        var context = Require();
        context.Update(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public static async Task<T> CreateAsync<T>(
        IDictionary<string, object?> values,
        IEnumerable<string>? fillable = null,
        IEnumerable<string>? guarded = null,
        CancellationToken cancellationToken = default)
        where T : class, new()
    {
        var entity = new T();
        Fill(entity, values, fillable, guarded);
        await SaveAsync(entity, cancellationToken);
        return entity;
    }

    public static async Task<T> FirstOrCreateAsync<T>(
        Expression<Func<T, bool>> predicate,
        IDictionary<string, object?>? values = null,
        IEnumerable<string>? fillable = null,
        IEnumerable<string>? guarded = null,
        CancellationToken cancellationToken = default)
        where T : class, new()
    {
        var existing = await Query<T>().Where(predicate).FirstOrDefaultAsync(cancellationToken);
        if (existing is not null) return existing;
        return await CreateAsync<T>(values ?? new Dictionary<string, object?>(), fillable, guarded, cancellationToken);
    }

    public static async Task<T> UpdateOrCreateAsync<T>(
        Expression<Func<T, bool>> predicate,
        IDictionary<string, object?> values,
        IEnumerable<string>? fillable = null,
        IEnumerable<string>? guarded = null,
        CancellationToken cancellationToken = default)
        where T : class, new()
    {
        var existing = await Query<T>().Where(predicate).FirstOrDefaultAsync(cancellationToken);
        if (existing is null) return await CreateAsync<T>(values, fillable, guarded, cancellationToken);
        Fill(existing, values, fillable, guarded);
        await SaveAsync(existing, cancellationToken);
        return existing;
    }

    private static PropertyInfo? SoftDeleteFlag(object entity)
    {
        var flag = entity.GetType().GetProperty(
            "IsDeleted",
            BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
        return flag is not null && flag.CanWrite && flag.PropertyType == typeof(bool) ? flag : null;
    }

    private static bool SameKey(DbContext context, object tracked, object entity)
    {
        var key = context.Model.FindEntityType(entity.GetType())?.FindPrimaryKey();
        if (key is null) return false;
        return key.Properties.All(p => Equals(p.PropertyInfo?.GetValue(tracked), p.PropertyInfo?.GetValue(entity)));
    }

    private static bool IsNew(DbContext context, object entity)
    {
        var key = context.Model.FindEntityType(entity.GetType())?.FindPrimaryKey();
        if (key is null) return true;
        foreach (var property in key.Properties)
        {
            var value = property.PropertyInfo?.GetValue(entity);
            if (property.ClrType.IsValueType)
            {
                if (!Equals(value, Activator.CreateInstance(property.ClrType))) return false;
            }
            else if (value is not null)
            {
                return false;
            }
        }
        return true;
    }

    private sealed class Scope(Action restore) : IDisposable
    {
        public void Dispose() => restore();
    }
}
