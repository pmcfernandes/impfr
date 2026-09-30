using Microsoft.AspNetCore.Http;

namespace ImPedro.ConventionApi;

public interface IConventionApiAuthorizer
{
    Task<bool> AuthorizeAsync(HttpContext context, Type serviceType, string operation, CancellationToken cancellationToken = default);
}
