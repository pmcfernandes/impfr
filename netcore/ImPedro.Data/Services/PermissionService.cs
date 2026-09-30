using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class PermissionService
{
    private readonly FrameworkDbContext _context;

    public PermissionService(FrameworkDbContext context)
    {
        _context = context;
    }

    public async Task<bool> HasPermissionAsync(
        int userId,
        string tableName,
        string permissionCode,
        CancellationToken cancellationToken = default)
    {
        return await (
            from granted in _context.MetaPermissionsGranted
            join type in _context.MetaTypePermissions on granted.IDTypePermission equals type.IDTypePermission
            join permission in _context.MetaPermissions on granted.IDPermission equals permission.IDPermission
            where granted.IDUser == userId
                && permission.CodPermission == permissionCode
                && type.Tablename == tableName
            select granted.IDPermissionGranted
        ).AnyAsync(cancellationToken);
    }

    public Task<bool> CanSelectAsync(int userId, string tableName, CancellationToken cancellationToken = default)
        => HasPermissionAsync(userId, tableName, "SELECT", cancellationToken);

    public Task<bool> CanInsertAsync(int userId, string tableName, CancellationToken cancellationToken = default)
        => HasPermissionAsync(userId, tableName, "INSERT", cancellationToken);

    public Task<bool> CanUpdateAsync(int userId, string tableName, CancellationToken cancellationToken = default)
        => HasPermissionAsync(userId, tableName, "UPDATE", cancellationToken);

    public Task<bool> CanDeleteAsync(int userId, string tableName, CancellationToken cancellationToken = default)
        => HasPermissionAsync(userId, tableName, "DELETE", cancellationToken);

    public Task<List<string>> GetUserPermissionsAsync(
        int userId,
        string? tableName = null,
        CancellationToken cancellationToken = default)
    {
        var query =
            from granted in _context.MetaPermissionsGranted
            join type in _context.MetaTypePermissions on granted.IDTypePermission equals type.IDTypePermission
            join permission in _context.MetaPermissions on granted.IDPermission equals permission.IDPermission
            where granted.IDUser == userId
            select new { type.Tablename, permission.CodPermission };

        if (!string.IsNullOrWhiteSpace(tableName)) query = query.Where(x => x.Tablename == tableName);

        return query
            .Select(x => x.Tablename + "." + x.CodPermission)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> UserInProfileAsync(int userId, string codProfile, CancellationToken cancellationToken = default)
    {
        return await (
            from granted in _context.MetaPermissionsGranted
            join profile in _context.MetaProfiles on granted.IDProfile equals profile.IDProfile
            where granted.IDUser == userId && profile.CodProfile == codProfile
            select granted.IDPermissionGranted
        ).AnyAsync(cancellationToken);
    }

    public async Task<MetaPermissionGranted> GrantAsync(
        int userId,
        int typePermissionId,
        int relatedTableId,
        int permissionId,
        int? profileId = null,
        CancellationToken cancellationToken = default)
    {
        var granted = new MetaPermissionGranted
        {
            IDUser = userId,
            IDTypePermission = typePermissionId,
            IDRelatedTable = relatedTableId,
            IDPermission = permissionId,
            IDProfile = profileId,
        };
        await _context.MetaPermissionsGranted.AddAsync(granted, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return granted;
    }

    public async Task RevokeAsync(int permissionGrantedId, CancellationToken cancellationToken = default)
    {
        var granted = await _context.MetaPermissionsGranted
            .FirstOrDefaultAsync(g => g.IDPermissionGranted == permissionGrantedId, cancellationToken);
        if (granted is null) return;
        _context.MetaPermissionsGranted.Remove(granted);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<MetaPermission>> GetPermissionsAsync(CancellationToken cancellationToken = default)
        => _context.MetaPermissions.AsNoTracking().OrderBy(p => p.CodPermission).ToListAsync(cancellationToken);

    public Task<List<MetaProfile>> GetProfilesAsync(bool includeDeleted = false, CancellationToken cancellationToken = default)
        => _context.MetaProfiles.AsNoTracking()
            .Where(p => includeDeleted || !p.IsDeleted)
            .OrderBy(p => p.Profile)
            .ToListAsync(cancellationToken);

    public Task<List<MetaTypePermission>> GetTypePermissionsAsync(string? tableName = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaTypePermissions.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(tableName)) query = query.Where(t => t.Tablename == tableName);
        return query.OrderBy(t => t.Tablename).ThenBy(t => t.TypePermission0).ToListAsync(cancellationToken);
    }
}
