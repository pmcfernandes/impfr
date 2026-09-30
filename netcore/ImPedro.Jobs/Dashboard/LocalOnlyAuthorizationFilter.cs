using Hangfire.Dashboard;
using Microsoft.AspNetCore.Http;

namespace ImPedro.Jobs.Dashboard;

public sealed class LocalOnlyAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        var httpContext = context.GetHttpContext();
        var remote = httpContext.Connection.RemoteIpAddress;
        return remote is null || System.Net.IPAddress.IsLoopback(remote);
    }
}
