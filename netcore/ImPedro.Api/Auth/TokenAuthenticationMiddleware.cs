using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ImPedro.Security.Services;

namespace ImPedro.Api.Auth;

public sealed class TokenAuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenAuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, AuthService auth, ICurrentUser currentUser)
    {
        currentUser.Clear();
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var idValue = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? context.User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (int.TryParse(idValue, out var userId)) currentUser.SetCurrentUser(userId);
        }
        else if (context.Request.Headers.TryGetValue("Authorization", out var header))
        {
            const string prefix = "Bearer ";
            var value = header.ToString();
            if (value.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
            {
                var token = value.Substring(prefix.Length).Trim();
                if (!token.Contains('.'))
                {
                    var user = await auth.GetUserByTokenAsync(token);
                    if (user is not null) currentUser.SetCurrentUser(user.IDUser);
                }
            }
        }
        await _next(context);
    }
}

public static class TokenAuthenticationExtensions
{
    public static IApplicationBuilder UseImPedroAuth(this IApplicationBuilder app)
        => app.UseMiddleware<TokenAuthenticationMiddleware>();
}
