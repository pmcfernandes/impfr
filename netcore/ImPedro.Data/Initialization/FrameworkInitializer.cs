using ImPedro.Data.Security;
using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ImPedro.Data.Initialization;

public sealed class FrameworkInitializer : IFrameworkInitializer
{
    private readonly FrameworkDbContext _context;
    private readonly FrameworkInitializerOptions _options;

    public FrameworkInitializer(FrameworkDbContext context, IOptions<FrameworkInitializerOptions> options)
    {
        _context = context;
        _options = options.Value;
    }

    public async Task<FrameworkInitializationResult> InitializeAsync(CancellationToken cancellationToken = default)
    {
        ValidateOptions();
        var application = await _context.MetaApplications.FirstOrDefaultAsync(item => item.CodApplication == _options.ApplicationCode, cancellationToken);
        var applicationCreated = application is null;
        if (application is null)
        {
            application = new MetaApplication
            {
                CodApplication = _options.ApplicationCode,
                Application = _options.ApplicationName,
                Installed = true,
                DBAppVersion = _options.ApplicationVersion,
            };
            await _context.MetaApplications.AddAsync(application, cancellationToken);
        }

        var admin = await _context.MetaUsers.FirstOrDefaultAsync(item => item.Username == _options.AdminUsername && !item.IsGroup, cancellationToken);
        var adminCreated = admin is null;
        if (admin is null)
        {
            admin = new MetaUser
            {
                Username = _options.AdminUsername,
                Password = PasswordHasher.ToMd5(_options.AdminPassword),
                Fullname = _options.AdminName,
                Email = _options.AdminEmail,
                Address = string.Empty,
                City = string.Empty,
                ZipCode = string.Empty,
                Phone = string.Empty,
                Mobile = string.Empty,
                IsGroup = false,
                IsAuditable = false,
                IsDeleted = false,
            };
            await _context.MetaUsers.AddAsync(admin, cancellationToken);
        }

        var group = await _context.MetaUsers.FirstOrDefaultAsync(item => item.Username == _options.AdministratorGroupName && item.IsGroup, cancellationToken);
        var groupCreated = group is null;
        if (group is null)
        {
            group = new MetaUser
            {
                Username = _options.AdministratorGroupName,
                Password = string.Empty,
                Fullname = _options.AdministratorGroupName,
                Email = "@",
                Address = string.Empty,
                City = string.Empty,
                ZipCode = string.Empty,
                Phone = string.Empty,
                Mobile = string.Empty,
                IsGroup = true,
                IsAuditable = false,
                IsDeleted = false,
            };
            await _context.MetaUsers.AddAsync(group, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);
        var membership = await _context.MetaGroupUsers.AnyAsync(item => item.IDUser == admin.IDUser && item.IDGroup == group.IDUser, cancellationToken);
        if (!membership)
        {
            await _context.MetaGroupUsers.AddAsync(new MetaGroupUser { IDUser = admin.IDUser, IDGroup = group.IDUser }, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return new FrameworkInitializationResult(application.IDApplication, admin.IDUser, group.IDUser, applicationCreated, adminCreated, groupCreated, !membership);
    }

    private void ValidateOptions()
    {
        if (string.IsNullOrWhiteSpace(_options.ApplicationCode) || string.IsNullOrWhiteSpace(_options.ApplicationName)
            || string.IsNullOrWhiteSpace(_options.AdminUsername) || string.IsNullOrEmpty(_options.AdminPassword)
            || string.IsNullOrWhiteSpace(_options.AdministratorGroupName))
            throw new InvalidOperationException("Framework initializer settings are incomplete.");
    }
}
