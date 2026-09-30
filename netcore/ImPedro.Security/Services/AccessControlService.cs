using ImPedro.Entity;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Security.Services;

public sealed class AccessControlService
{
    private readonly FrameworkDbContext _context;

    public AccessControlService(FrameworkDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<string>> GetEffectivePermissionsAsync(
        int userId,
        CancellationToken cancellationToken = default)
    {
        var groupIds = await _context.MetaGroupUsers.AsNoTracking()
            .Where(l => l.IDUser == userId)
            .Select(l => l.IDGroup)
            .ToListAsync(cancellationToken);

        var holderIds = groupIds.Append(userId).Distinct().ToList();

        return await (
            from granted in _context.MetaPermissionsGranted
            join type in _context.MetaTypePermissions on granted.IDTypePermission equals type.IDTypePermission
            join permission in _context.MetaPermissions on granted.IDPermission equals permission.IDPermission
            where holderIds.Contains(granted.IDUser)
            select type.Tablename + "." + permission.CodPermission
        ).Distinct().OrderBy(x => x).ToListAsync(cancellationToken);
    }

    public async Task<bool> HasAccessAsync(
        int userId,
        string tableName,
        string permissionCode,
        CancellationToken cancellationToken = default)
    {
        var effective = await GetEffectivePermissionsAsync(userId, cancellationToken);
        return effective.Contains($"{tableName}.{permissionCode}", StringComparer.OrdinalIgnoreCase);
    }

    public async Task RevokeAsync(
        int userId,
        string tableName,
        string permissionCode,
        CancellationToken cancellationToken = default)
    {
        var grants = await (
            from granted in _context.MetaPermissionsGranted
            join type in _context.MetaTypePermissions on granted.IDTypePermission equals type.IDTypePermission
            join permission in _context.MetaPermissions on granted.IDPermission equals permission.IDPermission
            where granted.IDUser == userId
                && type.Tablename == tableName
                && permission.CodPermission == permissionCode
            select granted
        ).ToListAsync(cancellationToken);

        if (grants.Count == 0) return;
        _context.MetaPermissionsGranted.RemoveRange(grants);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
