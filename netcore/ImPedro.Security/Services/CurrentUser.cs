using ImPedro.Data.Dtos;
using ImPedro.Data.Services;

namespace ImPedro.Security.Services;

public interface ICurrentUser
{
    int? UserId { get; }
    bool IsAuthenticated { get; }
    void SetCurrentUser(int? userId);
    void Clear();
    Task<UserDto?> GetCurrentUserAsync(CancellationToken cancellationToken = default);
    Task<bool> HasPermissionAsync(string tableName, string permissionCode, CancellationToken cancellationToken = default);
    Task RequirePermissionAsync(string tableName, string permissionCode, CancellationToken cancellationToken = default);
}

public sealed class CurrentUser : ICurrentUser
{
    private readonly UserService _users;
    private readonly AccessControlService _access;
    private int? _userId;

    public CurrentUser(UserService users, AccessControlService access)
    {
        _users = users;
        _access = access;
    }

    public int? UserId => _userId;

    public bool IsAuthenticated => _userId.HasValue;

    public void SetCurrentUser(int? userId) => _userId = userId;

    public void Clear() => _userId = null;

    public async Task<UserDto?> GetCurrentUserAsync(CancellationToken cancellationToken = default)
    {
        if (!_userId.HasValue) return null;
        var user = await _users.GetByIdAsync(_userId.Value, cancellationToken);
        return user is null ? null : UserDto.FromEntity(user);
    }

    public Task<bool> HasPermissionAsync(string tableName, string permissionCode, CancellationToken cancellationToken = default)
    {
        if (!_userId.HasValue) return Task.FromResult(false);
        return _access.HasAccessAsync(_userId.Value, tableName, permissionCode, cancellationToken);
    }

    public async Task RequirePermissionAsync(string tableName, string permissionCode, CancellationToken cancellationToken = default)
    {
        if (!await HasPermissionAsync(tableName, permissionCode, cancellationToken))
            throw new UnauthorizedAccessException($"Access denied: {tableName}.{permissionCode}.");
    }
}
