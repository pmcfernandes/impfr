using ImPedro.Data.Dtos;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class AuditService
{
    private readonly FrameworkDbContext _context;

    public AuditService(FrameworkDbContext context)
    {
        _context = context;
    }

    public async Task LogTableAsync(
        int userId,
        int tableId,
        int? relatedTableId = null,
        int? permissionId = null,
        string? comments = null,
        CancellationToken cancellationToken = default)
    {
        await _context.MetaTableAudits.AddAsync(new MetaTableAudit
        {
            IDUser = userId,
            DateTime = DateTime.Now,
            IDTable = tableId,
            IDRelatedTable = relatedTableId,
            IDPermission = permissionId,
            Comments = comments,
        }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task LogFieldAsync(
        int userId,
        int tableId,
        int fieldId,
        int relatedFieldId,
        string? oldValue,
        string? newValue,
        string? version = null,
        CancellationToken cancellationToken = default)
    {
        await _context.MetaFieldAudits.AddAsync(new MetaFieldAudit
        {
            IDUser = userId,
            DateTime = DateTime.Now,
            IDTable = tableId,
            IDField = fieldId,
            IDRelatedField = relatedFieldId,
            OldValue = oldValue,
            NewValue = newValue,
            Version = version,
        }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<PagedResult<MetaTableAudit>> GetTableAuditsAsync(
        int page,
        int pageSize,
        int? userId = null,
        int? tableId = null,
        DateTime? from = null,
        DateTime? to = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.MetaTableAudits.AsNoTracking().AsQueryable();
        if (userId.HasValue) query = query.Where(a => a.IDUser == userId.Value);
        if (tableId.HasValue) query = query.Where(a => a.IDTable == tableId.Value);
        if (from.HasValue) query = query.Where(a => a.DateTime >= from.Value);
        if (to.HasValue) query = query.Where(a => a.DateTime <= to.Value);
        return ToPagedAsync(query.OrderByDescending(a => a.DateTime), page, pageSize, cancellationToken);
    }

    public Task<PagedResult<MetaFieldAudit>> GetFieldAuditsAsync(
        int page,
        int pageSize,
        int? tableId = null,
        int? fieldId = null,
        int? relatedFieldId = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.MetaFieldAudits.AsNoTracking().AsQueryable();
        if (tableId.HasValue) query = query.Where(a => a.IDTable == tableId.Value);
        if (fieldId.HasValue) query = query.Where(a => a.IDField == fieldId.Value);
        if (relatedFieldId.HasValue) query = query.Where(a => a.IDRelatedField == relatedFieldId.Value);
        return ToPagedAsync(query.OrderByDescending(a => a.DateTime), page, pageSize, cancellationToken);
    }

    private static async Task<PagedResult<T>> ToPagedAsync<T>(
        IQueryable<T> query,
        int page,
        int pageSize,
        CancellationToken cancellationToken)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;
        var totalCount = await query.CountAsync(cancellationToken);
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);
        return new PagedResult<T> { Items = items, Page = page, PageSize = pageSize, TotalCount = totalCount };
    }
}
