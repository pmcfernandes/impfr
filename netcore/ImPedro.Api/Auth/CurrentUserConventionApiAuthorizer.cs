using ImPedro.ConventionApi;
using ImPedro.Security.Services;

namespace ImPedro.Api.Auth;

internal sealed class CurrentUserConventionApiAuthorizer : IConventionApiAuthorizer
{
    public Task<bool> AuthorizeAsync(HttpContext context, Type serviceType, string operation, CancellationToken cancellationToken = default)
        => Task.FromResult(context.RequestServices.GetRequiredService<ICurrentUser>().IsAuthenticated);
}
