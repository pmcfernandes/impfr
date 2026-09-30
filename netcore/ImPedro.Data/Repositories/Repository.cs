using System.Linq.Expressions;
using ImPedro.Data.Dtos;
using ImPedro.Entity;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Repositories;

public sealed class Repository<T> : IRepository<T> where T : class
{
    private readonly FrameworkDbContext _context;
    private readonly DbSet<T> _set;

    public Repository(FrameworkDbContext context)
    {
        _context = context;
        _set = context.Set<T>();
    }

    public IQueryable<T> Query() => _set.AsNoTracking();

    public IQueryable<T> QueryTracking() => _set;

    public Task<T?> FindAsync(object?[]? keyValues, CancellationToken cancellationToken = default)
        => _set.FindAsync(keyValues, cancellationToken).AsTask();

    public Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        => _set.AsNoTracking().FirstOrDefaultAsync(predicate, cancellationToken);

    public Task<List<T>> ListAsync(CancellationToken cancellationToken = default)
        => _set.AsNoTracking().ToListAsync(cancellationToken);

    public Task<List<T>> ListAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        => _set.AsNoTracking().Where(predicate).ToListAsync(cancellationToken);

    public Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null, CancellationToken cancellationToken = default)
        => predicate is null ? _set.CountAsync(cancellationToken) : _set.CountAsync(predicate, cancellationToken);

    public Task<bool> AnyAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        => _set.AnyAsync(predicate, cancellationToken);

    public async Task<PagedResult<T>> PagedAsync(
        int page,
        int pageSize,
        Expression<Func<T, bool>>? predicate = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        CancellationToken cancellationToken = default)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;

        IQueryable<T> query = _set.AsNoTracking();
        if (predicate is not null) query = query.Where(predicate);

        var totalCount = await query.CountAsync(cancellationToken);
        if (orderBy is not null) query = orderBy(query);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<T>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
        };
    }

    public Task AddAsync(T entity, CancellationToken cancellationToken = default)
        => _set.AddAsync(entity, cancellationToken).AsTask();

    public Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
        => _set.AddRangeAsync(entities, cancellationToken);

    public void Update(T entity) => _set.Update(entity);

    public void Remove(T entity) => _set.Remove(entity);

    public void RemoveRange(IEnumerable<T> entities) => _set.RemoveRange(entities);
}
