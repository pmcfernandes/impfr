using System.Text;
using ImPedro.Data.Dtos;
using ImPedro.Data.Security;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using ImPedro.Security.Models;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Security.Services;

public sealed class ExternalAuthService
{
    private readonly FrameworkDbContext _context;

    public ExternalAuthService(FrameworkDbContext context) => _context = context;

    // Provider handlers validate the identity token before this service receives its claims.
    public async Task<AuthResult> LoginAsync(string email, string? fullName, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(email)) return AuthResult.Fail(AuthErrors.ExternalIdentityInvalid);
        var normalizedEmail = email.Trim();
        var user = await _context.MetaUsers.FirstOrDefaultAsync(
            u => u.Email.ToUpper() == normalizedEmail.ToUpper() && !u.IsDeleted && !u.IsGroup,
            cancellationToken);
        if (user is null)
        {
            user = new MetaUser
            {
                Username = await CreateUsernameAsync(normalizedEmail, cancellationToken),
                Email = normalizedEmail,
                Fullname = string.IsNullOrWhiteSpace(fullName) ? normalizedEmail : fullName.Trim(),
                Password = PasswordHasher.ToMd5(Guid.NewGuid().ToString("N")),
                IsGroup = false,
                IsAuditable = false,
                IsDeleted = false,
            };
            await _context.MetaUsers.AddAsync(user, cancellationToken);
        }
        if (user.Locked == true) return AuthResult.Fail(AuthErrors.AccountLocked);

        user.Guid = Guid.NewGuid().ToString("N");
        await _context.SaveChangesAsync(cancellationToken);
        return AuthResult.Ok(UserDto.FromEntity(user), user.Guid);
    }

    private async Task<string> CreateUsernameAsync(string email, CancellationToken cancellationToken)
    {
        var local = email.Split('@')[0];
        var cleaned = new string(local.Where(char.IsLetterOrDigit).ToArray()).ToLowerInvariant();
        var baseName = string.IsNullOrEmpty(cleaned) ? "external" : cleaned[..Math.Min(cleaned.Length, 40)];
        for (var suffix = 0; ; suffix++)
        {
            var candidate = suffix == 0 ? baseName : $"{baseName}{suffix}";
            var taken = await _context.MetaUsers.AnyAsync(u => u.Username == candidate, cancellationToken);
            if (!taken) return candidate;
        }
    }
}
