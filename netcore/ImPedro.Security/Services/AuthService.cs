using ImPedro.Data.Dtos;
using ImPedro.Data.Security;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using ImPedro.Security.Models;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Security.Services;

public sealed class AuthService
{
    private readonly FrameworkDbContext _context;

    public AuthService(FrameworkDbContext context)
    {
        _context = context;
    }

    public async Task<AuthResult> LoginAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            return AuthResult.Fail(AuthErrors.InvalidCredentials);

        var user = await _context.MetaUsers
            .FirstOrDefaultAsync(u => (u.Username == username || u.Email == username) && !u.IsDeleted && !u.IsGroup, cancellationToken);
        if (user is null || !PasswordHasher.VerifyMd5(password, user.Password))
            return AuthResult.Fail(AuthErrors.InvalidCredentials);
        if (user.Locked == true)
            return AuthResult.Fail(AuthErrors.AccountLocked);

        user.Guid = NewToken();
        await _context.SaveChangesAsync(cancellationToken);
        return AuthResult.Ok(UserDto.FromEntity(user), user.Guid!);
    }

    public async Task<bool> LogoutAsync(int userId, CancellationToken cancellationToken = default)
    {
        var user = await _context.MetaUsers
            .FirstOrDefaultAsync(u => u.IDUser == userId, cancellationToken);
        if (user is null) return false;
        user.Guid = NewToken();
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<UserDto?> GetUserByTokenAsync(string token, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(token)) return null;
        var user = await _context.MetaUsers.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Guid == token && !u.IsDeleted && !u.IsGroup, cancellationToken);
        if (user is null || user.Locked == true) return null;
        return UserDto.FromEntity(user);
    }

    public async Task<AuthResult> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var username = request.Username?.Trim() ?? string.Empty;
        var email = request.Email?.Trim() ?? string.Empty;
        if (username.Length == 0 || email.Length == 0 || string.IsNullOrEmpty(request.Password))
            return AuthResult.Fail(AuthErrors.InvalidRequest);

        var usernameTaken = await _context.MetaUsers
            .AnyAsync(u => u.Username.ToUpper() == username.ToUpper(), cancellationToken);
        if (usernameTaken) return AuthResult.Fail(AuthErrors.UsernameTaken);

        var emailTaken = await _context.MetaUsers
            .AnyAsync(u => u.Email.ToUpper() == email.ToUpper(), cancellationToken);
        if (emailTaken) return AuthResult.Fail(AuthErrors.EmailTaken);

        var user = new MetaUser
        {
            Username = username,
            Email = email,
            Password = PasswordHasher.ToMd5(request.Password),
            Fullname = request.Fullname,
            IsGroup = false,
            IsAuditable = false,
            IsDeleted = false,
            Guid = NewToken(),
        };
        await _context.MetaUsers.AddAsync(user, cancellationToken);

        if (request.GroupIds is { Count: > 0 })
        {
            foreach (var groupId in request.GroupIds.Distinct())
            {
                var groupExists = await _context.MetaUsers
                    .AnyAsync(g => g.IDUser == groupId && g.IsGroup && !g.IsDeleted, cancellationToken);
                if (!groupExists) throw new KeyNotFoundException($"Group {groupId} not found.");
                await _context.MetaGroupUsers.AddAsync(
                    new MetaGroupUser { IDUser = user.IDUser, IDGroup = groupId }, cancellationToken);
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
        return AuthResult.Ok(UserDto.FromEntity(user), user.Guid!);
    }

    public async Task<bool> ChangePasswordAsync(
        int userId,
        string currentPassword,
        string newPassword,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(newPassword)) return false;
        var user = await _context.MetaUsers
            .FirstOrDefaultAsync(u => u.IDUser == userId && !u.IsDeleted, cancellationToken);
        if (user is null || !PasswordHasher.VerifyMd5(currentPassword, user.Password)) return false;
        user.Password = PasswordHasher.ToMd5(newPassword);
        user.Guid = NewToken();
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<PasswordResetTicket?> RequestPasswordResetAsync(
        string usernameOrEmail,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(usernameOrEmail)) return null;
        var key = usernameOrEmail.Trim();
        var user = await _context.MetaUsers.FirstOrDefaultAsync(
            u => (u.Username == key || u.Email == key) && !u.IsDeleted && !u.IsGroup,
            cancellationToken);
        if (user is null) return null;

        user.Guid = NewToken();
        await _context.SaveChangesAsync(cancellationToken);
        return new PasswordResetTicket(user.Email, user.Guid!);
    }

    public async Task<bool> ResetPasswordAsync(
        string token,
        string newPassword,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(token) || string.IsNullOrEmpty(newPassword)) return false;
        var user = await _context.MetaUsers
            .FirstOrDefaultAsync(u => u.Guid == token && !u.IsDeleted && !u.IsGroup, cancellationToken);
        if (user is null) return false;
        user.Password = PasswordHasher.ToMd5(newPassword);
        user.Guid = NewToken();
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static string NewToken() => Guid.NewGuid().ToString("N");
}
