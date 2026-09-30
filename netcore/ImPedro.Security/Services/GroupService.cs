using ImPedro.Data.Services;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using ImPedro.Security.Models;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Security.Services;

public sealed class GroupService
{
    private readonly FrameworkDbContext _context;
    private readonly UserService _users;
    private readonly PermissionService _permissions;

    public GroupService(FrameworkDbContext context, UserService users, PermissionService permissions)
    {
        _context = context;
        _users = users;
        _permissions = permissions;
    }

    public Task<List<MetaUser>> GetGroupsAsync(CancellationToken cancellationToken = default)
        => _users.GetGroupsAsync(cancellationToken);

    public async Task<MetaUser?> GetGroupAsync(int groupId, CancellationToken cancellationToken = default)
    {
        var group = await _users.GetByIdAsync(groupId, cancellationToken);
        return group is not null && group.IsGroup && !group.IsDeleted ? group : null;
    }

    public async Task<MetaUser> CreateGroupAsync(
        string name,
        string? email = null,
        string? description = null,
        CancellationToken cancellationToken = default)
    {
        name = name.Trim();
        if (name.Length == 0) throw new ArgumentException("Group name is required.", nameof(name));

        var taken = await _context.MetaUsers
            .AnyAsync(u => u.Username.ToUpper() == name.ToUpper(), cancellationToken);
        if (taken) throw new InvalidOperationException($"Group '{name}' already exists.");

        var group = new MetaUser
        {
            Username = name,
            Email = string.IsNullOrWhiteSpace(email) ? $"{name}@groups.local" : email.Trim(),
            Fullname = description,
            IsGroup = true,
            IsDeleted = false,
        };
        await _context.MetaUsers.AddAsync(group, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return group;
    }

    public async Task RenameGroupAsync(
        int groupId,
        string? name,
        string? description,
        CancellationToken cancellationToken = default)
    {
        var group = await GetGroupAsync(groupId, cancellationToken)
            ?? throw new KeyNotFoundException($"Group {groupId} not found.");
        if (!string.IsNullOrWhiteSpace(name)) group.Username = name.Trim();
        if (description is not null) group.Fullname = description;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteGroupAsync(int groupId, CancellationToken cancellationToken = default)
    {
        var group = await GetGroupAsync(groupId, cancellationToken)
            ?? throw new KeyNotFoundException($"Group {groupId} not found.");
        group.IsDeleted = true;

        var links = await _context.MetaGroupUsers
            .Where(l => l.IDGroup == groupId || l.IDUser == groupId)
            .ToListAsync(cancellationToken);
        _context.MetaGroupUsers.RemoveRange(links);

        var grants = await _context.MetaPermissionsGranted
            .Where(g => g.IDUser == groupId)
            .ToListAsync(cancellationToken);
        _context.MetaPermissionsGranted.RemoveRange(grants);

        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<MetaUser>> GetMembersAsync(int groupId, CancellationToken cancellationToken = default)
        => _users.GetUsersByGroupAsync(groupId, cancellationToken);

    public Task AddMemberAsync(int groupId, int userId, CancellationToken cancellationToken = default)
        => _users.AddUserToGroupAsync(userId, groupId, cancellationToken);

    public Task RemoveMemberAsync(int groupId, int userId, CancellationToken cancellationToken = default)
        => _users.RemoveUserFromGroupAsync(userId, groupId, cancellationToken);

    public Task<List<string>> GetGroupPermissionsAsync(int groupId, CancellationToken cancellationToken = default)
        => _permissions.GetUserPermissionsAsync(groupId, null, cancellationToken);

    public async Task SetGroupPermissionsAsync(
        int groupId,
        IEnumerable<PermissionAssignment> assignments,
        CancellationToken cancellationToken = default)
    {
        _ = await GetGroupAsync(groupId, cancellationToken)
            ?? throw new KeyNotFoundException($"Group {groupId} not found.");

        var resolved = new List<(int TypePermissionId, int PermissionId)>();
        foreach (var assignment in assignments.Distinct())
        {
            var type = await _context.MetaTypePermissions.AsNoTracking().FirstOrDefaultAsync(
                t => t.Tablename == assignment.TableName, cancellationToken)
                ?? throw new KeyNotFoundException($"Permission table '{assignment.TableName}' not found.");
            var permission = await _context.MetaPermissions.AsNoTracking().FirstOrDefaultAsync(
                p => p.CodPermission == assignment.PermissionCode, cancellationToken)
                ?? throw new KeyNotFoundException($"Permission code '{assignment.PermissionCode}' not found.");
            resolved.Add((type.IDTypePermission, permission.IDPermission));
        }

        var existing = await _context.MetaPermissionsGranted
            .Where(g => g.IDUser == groupId)
            .ToListAsync(cancellationToken);
        _context.MetaPermissionsGranted.RemoveRange(existing);

        foreach (var (typePermissionId, permissionId) in resolved.Distinct())
        {
            await _context.MetaPermissionsGranted.AddAsync(new MetaPermissionGranted
            {
                IDUser = groupId,
                IDTypePermission = typePermissionId,
                IDRelatedTable = groupId,
                IDPermission = permissionId,
            }, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
