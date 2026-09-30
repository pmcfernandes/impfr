using System.Globalization;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace ImPedro.Eloquent;

public sealed class EloquentQuery<T>
    where T : class
{
    private readonly DbContext _context;
    private readonly IQueryable<T> _base;
    private Expression<Func<T, bool>>? _filter;
    private readonly List<(LambdaExpression Key, bool Descending, bool Then)> _orderings = new();
    private readonly List<LambdaExpression> _includes = new();
    private int? _take;
    private int? _skip;

    internal EloquentQuery(DbContext context)
    {
        _context = context;
        _base = context.Set<T>().AsNoTracking();
    }

    public EloquentQuery<T> Where(Expression<Func<T, bool>> predicate)
    {
        _filter = _filter is null ? predicate : Combine(_filter, predicate, Expression.AndAlso);
        return this;
    }

    public EloquentQuery<T> OrWhere(Expression<Func<T, bool>> predicate)
    {
        _filter = _filter is null ? predicate : Combine(_filter, predicate, Expression.OrElse);
        return this;
    }

    public EloquentQuery<T> WhereIn<TValue>(Expression<Func<T, TValue>> selector, IEnumerable<TValue> values)
    {
        var list = values?.ToList() ?? [];
        var parameter = Expression.Parameter(typeof(T), "e");
        var member = selector.Body.ReplaceParameter(selector.Parameters[0], parameter);
        var body = Expression.Call(
            typeof(Enumerable),
            nameof(Enumerable.Contains),
            [typeof(TValue)],
            Expression.Constant(list),
            member);
        return Where(Expression.Lambda<Func<T, bool>>(body, parameter));
    }

    public EloquentQuery<T> WhereNull(Expression<Func<T, object?>> selector)
    {
        var parameter = Expression.Parameter(typeof(T), "e");
        var body = Expression.Equal(
            selector.Body.ReplaceParameter(selector.Parameters[0], parameter),
            Expression.Constant(null, typeof(object)));
        return Where(Expression.Lambda<Func<T, bool>>(body, parameter));
    }

    public EloquentQuery<T> WhereNotNull(Expression<Func<T, object?>> selector)
    {
        var parameter = Expression.Parameter(typeof(T), "e");
        var body = Expression.NotEqual(
            selector.Body.ReplaceParameter(selector.Parameters[0], parameter),
            Expression.Constant(null, typeof(object)));
        return Where(Expression.Lambda<Func<T, bool>>(body, parameter));
    }

    public EloquentQuery<T> OrderBy<TKey>(Expression<Func<T, TKey>> selector)
    {
        _orderings.Add((selector, false, false));
        return this;
    }

    public EloquentQuery<T> OrderByDescending<TKey>(Expression<Func<T, TKey>> selector)
    {
        _orderings.Add((selector, true, false));
        return this;
    }

    public EloquentQuery<T> ThenBy<TKey>(Expression<Func<T, TKey>> selector)
    {
        RequireOrdered();
        _orderings.Add((selector, false, true));
        return this;
    }

    public EloquentQuery<T> ThenByDescending<TKey>(Expression<Func<T, TKey>> selector)
    {
        RequireOrdered();
        _orderings.Add((selector, true, true));
        return this;
    }

    public EloquentQuery<T> Take(int count)
    {
        _take = count;
        return this;
    }

    public EloquentQuery<T> Limit(int count) => Take(count);

    public EloquentQuery<T> Skip(int count)
    {
        _skip = count;
        return this;
    }

    public EloquentQuery<T> Offset(int count) => Skip(count);

    public EloquentQuery<T> Include<TProperty>(Expression<Func<T, TProperty>> include)
    {
        _includes.Add(include);
        return this;
    }

    public EloquentQuery<T> With<TProperty>(Expression<Func<T, TProperty>> include) => Include(include);

    public EloquentQuery<T> OnlyTrashed() => Where(DeletedFlag(true));

    public EloquentQuery<T> WithoutTrashed() => Where(DeletedFlag(false));

    public IQueryable<T> AsQueryable() => Build();

    public Task<List<T>> GetAsync(CancellationToken cancellationToken = default)
        => Build().ToListAsync(cancellationToken);

    public Task<T> FirstAsync(CancellationToken cancellationToken = default)
        => Build().FirstAsync(cancellationToken);

    public Task<T?> FirstOrDefaultAsync(CancellationToken cancellationToken = default)
        => Build().FirstOrDefaultAsync(cancellationToken);

    public async Task<T?> FindAsync(object?[]? keys, CancellationToken cancellationToken = default)
        => (T?)await _context.FindAsync(typeof(T), keys, cancellationToken);

    public async Task<T> FindOrFailAsync(object?[]? keys, CancellationToken cancellationToken = default)
        => await FindAsync(keys, cancellationToken)
            ?? throw new KeyNotFoundException($"{typeof(T).Name} not found.");

    public Task<int> CountAsync(CancellationToken cancellationToken = default)
        => Build().CountAsync(cancellationToken);

    public Task<bool> ExistsAsync(CancellationToken cancellationToken = default)
        => Build().AnyAsync(cancellationToken);

    public Task<decimal> SumAsync(Expression<Func<T, decimal>> selector, CancellationToken cancellationToken = default)
        => Build().SumAsync(selector, cancellationToken);

    public Task<decimal> AverageAsync(Expression<Func<T, decimal>> selector, CancellationToken cancellationToken = default)
        => Build().AverageAsync(selector, cancellationToken);

    public Task<decimal> MinAsync(Expression<Func<T, decimal>> selector, CancellationToken cancellationToken = default)
        => Build().MinAsync(selector, cancellationToken);

    public Task<decimal> MaxAsync(Expression<Func<T, decimal>> selector, CancellationToken cancellationToken = default)
        => Build().MaxAsync(selector, cancellationToken);

    public async Task<List<TValue>> PluckAsync<TValue>(string column, CancellationToken cancellationToken = default)
    {
        var property = typeof(T).GetProperty(
            column, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase)
            ?? throw new InvalidOperationException($"Unknown column '{column}' on {typeof(T).Name}.");
        var parameter = Expression.Parameter(typeof(T), "e");
        var lambda = Expression.Lambda<Func<T, TValue>>(
            Expression.Convert(Expression.Property(parameter, property), typeof(TValue)), parameter);
        return await Build().Select(lambda).ToListAsync(cancellationToken);
    }

    public Task<List<TValue>> PluckAsync<TValue>(Expression<Func<T, TValue>> selector, CancellationToken cancellationToken = default)
        => Build().Select(selector).ToListAsync(cancellationToken);

    public async Task<Page<T>> PaginateAsync(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;
        var query = Build();
        var total = await query.CountAsync(cancellationToken);
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);
        return new Page<T>(items, page, pageSize, total);
    }

    public Task<int> DeleteManyAsync(CancellationToken cancellationToken = default)
        => Build(includeIncludes: false).ExecuteDeleteAsync(cancellationToken);

    public Task<int> UpdateManyAsync(IDictionary<string, object?> values, CancellationToken cancellationToken = default)
    {
        if (values is null || values.Count == 0)
            throw new ArgumentException("At least one value is required.", nameof(values));
        return Build(includeIncludes: false).ExecuteUpdateAsync(setters =>
        {
            foreach (var (name, value) in values) ApplySetter(setters, name, value);
        }, cancellationToken);
    }

    private IQueryable<T> Build(bool includeIncludes = true)
    {
        var query = _base;
        if (includeIncludes)
        {
            foreach (var include in _includes)
            {
                query = (IQueryable<T>)typeof(EntityFrameworkQueryableExtensions)
                    .GetMethods()
                    .First(m => m.Name == nameof(EntityFrameworkQueryableExtensions.Include)
                        && m.IsGenericMethodDefinition
                        && m.GetParameters().Length == 2)
                    .MakeGenericMethod(typeof(T), include.ReturnType)
                    .Invoke(null, [query, include])!;
            }
        }
        if (_filter is not null) query = query.Where(_filter);
        foreach (var (key, descending, then) in _orderings)
        {
            var method = (!then ? (descending ? "OrderByDescending" : "OrderBy") : (descending ? "ThenByDescending" : "ThenBy"));
            query = (IQueryable<T>)typeof(Queryable)
                .GetMethods()
                .First(m => m.Name == method && m.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(T), key.ReturnType)
                .Invoke(null, [query, key])!;
        }
        if (_skip.HasValue) query = query.Skip(_skip.Value);
        if (_take.HasValue) query = query.Take(_take.Value);
        return query;
    }

    private static Expression<Func<T, bool>> Combine(
        Expression<Func<T, bool>> left,
        Expression<Func<T, bool>> right,
        Func<Expression, Expression, BinaryExpression> merge)
    {
        var parameter = Expression.Parameter(typeof(T), "e");
        var body = merge(
            left.Body.ReplaceParameter(left.Parameters[0], parameter),
            right.Body.ReplaceParameter(right.Parameters[0], parameter));
        return Expression.Lambda<Func<T, bool>>(body, parameter);
    }

    private static Expression<Func<T, bool>> DeletedFlag(bool deleted)
    {
        var property = typeof(T).GetProperty(
            "IsDeleted", BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
        if (property is null || property.PropertyType != typeof(bool))
            throw new InvalidOperationException($"{typeof(T).Name} does not support soft deletes.");
        var parameter = Expression.Parameter(typeof(T), "e");
        Expression access = Expression.Property(parameter, property);
        if (!deleted) access = Expression.Not(access);
        return Expression.Lambda<Func<T, bool>>(access, parameter);
    }

    private static void ApplySetter(UpdateSettersBuilder<T> setters, string name, object? value)
    {
        var property = typeof(T).GetProperty(
            name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase)
            ?? throw new InvalidOperationException($"Unknown column '{name}' on {typeof(T).Name}.");
        if (!property.CanWrite)
            throw new InvalidOperationException($"Column '{name}' on {typeof(T).Name} is read-only.");

        var method = typeof(UpdateSettersBuilder<T>)
            .GetMethods()
            .First(m => m.Name == "SetProperty"
                && m.IsGenericMethodDefinition
                && m.GetParameters().Length == 2
                && !typeof(LambdaExpression).IsAssignableFrom(m.GetParameters()[1].ParameterType))
            .MakeGenericMethod(property.PropertyType);

        var entityParameter = Expression.Parameter(typeof(T), "e");
        var propertyAccess = Expression.Lambda(
            typeof(Func<,>).MakeGenericType(typeof(T), property.PropertyType),
            Expression.Property(entityParameter, property),
            entityParameter);
        method.Invoke(setters, [propertyAccess, ConvertValue(value, property.PropertyType, name)]);
    }

    private static object? ConvertValue(object? value, Type propertyType, string name)
    {
        if (value is null || propertyType.IsInstanceOfType(value)) return value;
        try
        {
            var underlying = Nullable.GetUnderlyingType(propertyType) ?? propertyType;
            var converted = Convert.ChangeType(value, underlying, CultureInfo.InvariantCulture);
            if (underlying == propertyType) return converted;
            return Activator.CreateInstance(propertyType, converted);
        }
        catch (Exception ex) when (ex is FormatException or InvalidCastException or OverflowException or ArgumentException)
        {
            throw new InvalidOperationException($"Cannot assign '{name}'.", ex);
        }
    }

    private void RequireOrdered()
    {
        if (_orderings.Count == 0)
            throw new InvalidOperationException("ThenBy requires a preceding OrderBy.");
    }
}

internal static class ExpressionExtensions
{
    internal static Expression ReplaceParameter(this Expression body, ParameterExpression from, ParameterExpression to)
        => new ReplaceVisitor(from, to).Visit(body)!;

    private sealed class ReplaceVisitor(ParameterExpression from, ParameterExpression to) : ExpressionVisitor
    {
        protected override Expression VisitParameter(ParameterExpression node)
            => node == from ? to : base.VisitParameter(node);
    }
}
