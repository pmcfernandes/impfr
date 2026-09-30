using ImPedro.Data.Dtos;
using ImPedro.Data.Security;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class UserService
{
    private readonly FrameworkDbContext _context;

    public UserService(FrameworkDbContext context)
    {
        _context = context;
    }

    public Task<MetaUser?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => _context.MetaUsers.AsNoTracking().FirstOrDefaultAsync(u => u.IDUser == id, cancellationToken);

    public Task<MetaUser?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default)
        => _context.MetaUsers.AsNoTracking().FirstOrDefaultAsync(u => u.Username == username, cancellationToken);

    public Task<MetaUser?> GetByTokenAsync(string token, CancellationToken cancellationToken = default)
        => _context.MetaUsers.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Guid == token && !u.IsDeleted, cancellationToken);

    public async Task<UserDto?> AuthenticateAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        var user = await _context.MetaUsers.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username && !u.IsDeleted && !u.IsGroup, cancellationToken);
        if (user is null || !PasswordHasher.VerifyMd5(password, user.Password)) return null;
        return UserDto.FromEntity(user);
    }

    public Task<List<MetaUser>> GetActiveUsersAsync(CancellationToken cancellationToken = default)
        => _context.MetaUsers.AsNoTracking()
            .Where(u => !u.IsDeleted && !u.IsGroup)
            .OrderBy(u => u.Username)
            .ToListAsync(cancellationToken);

    public Task<List<MetaUser>> GetGroupsAsync(CancellationToken cancellationToken = default)
        => _context.MetaUsers.AsNoTracking()
            .Where(u => u.IsGroup && !u.IsDeleted)
            .OrderBy(u => u.Username)
            .ToListAsync(cancellationToken);

    public Task<List<MetaUser>> GetGroupsByUserAsync(int userId, CancellationToken cancellationToken = default)
        => (from link in _context.MetaGroupUsers
            join grp in _context.MetaUsers on link.IDGroup equals grp.IDUser
            where link.IDUser == userId
            orderby grp.Username
            select grp).AsNoTracking().ToListAsync(cancellationToken);

    public Task<List<MetaUser>> GetUsersByGroupAsync(int groupId, CancellationToken cancellationToken = default)
        => (from link in _context.MetaGroupUsers
            join user in _context.MetaUsers on link.IDUser equals user.IDUser
            where link.IDGroup == groupId && !user.IsDeleted && !user.IsGroup
            orderby user.Username
            select user).AsNoTracking().ToListAsync(cancellationToken);

    public async Task AddUserToGroupAsync(int userId, int groupId, CancellationToken cancellationToken = default)
    {
        var exists = await _context.MetaGroupUsers.AnyAsync(
            link => link.IDUser == userId && link.IDGroup == groupId, cancellationToken);
        if (exists) return;
        await _context.MetaGroupUsers.AddAsync(new MetaGroupUser { IDUser = userId, IDGroup = groupId }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveUserFromGroupAsync(int userId, int groupId, CancellationToken cancellationToken = default)
    {
        var link = await _context.MetaGroupUsers
            .FirstOrDefaultAsync(l => l.IDUser == userId && l.IDGroup == groupId, cancellationToken);
        if (link is null) return;
        _context.MetaGroupUsers.Remove(link);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<MetaUser> CreateAsync(MetaUser user, CancellationToken cancellationToken = default)
    {
        user.IsDeleted = false;
        await _context.MetaUsers.AddAsync(user, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return user;
    }

    public async Task UpdateAsync(MetaUser user, CancellationToken cancellationToken = default)
    {
        _context.MetaUsers.Update(user);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SoftDeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var user = await _context.MetaUsers.FirstOrDefaultAsync(u => u.IDUser == id, cancellationToken);
        if (user is null) return;
        user.IsDeleted = true;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SetPasswordAsync(int id, string password, CancellationToken cancellationToken = default)
    {
        var user = await _context.MetaUsers.FirstOrDefaultAsync(u => u.IDUser == id, cancellationToken)
            ?? throw new KeyNotFoundException($"User {id} not found.");
        user.Password = PasswordHasher.ToMd5(password);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SetLockedAsync(int id, bool locked, int? lockedBy, CancellationToken cancellationToken = default)
    {
        var user = await _context.MetaUsers.FirstOrDefaultAsync(u => u.IDUser == id, cancellationToken)
            ?? throw new KeyNotFoundException($"User {id} not found.");
        user.Locked = locked;
        user.LockedBy = locked ? lockedBy : null;
        user.LockedAt = locked ? DateTime.Now : null;
        await _context.SaveChangesAsync(cancellationToken);
    }
}
