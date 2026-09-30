namespace ImPedro.Data.Initialization;

public interface IFrameworkInitializer
{
    Task<FrameworkInitializationResult> InitializeAsync(CancellationToken cancellationToken = default);
}

public sealed record FrameworkInitializationResult(
    int ApplicationId,
    int AdminUserId,
    int AdministratorGroupId,
    bool ApplicationCreated,
    bool AdminUserCreated,
    bool AdministratorGroupCreated,
    bool MembershipCreated);
