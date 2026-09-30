using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Api.Validation;
using ImPedro.Security;
using ImPedro.Security.Models;
using ImPedro.Security.Services;
using ImPedro.Security.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace ImPedro.Api.Endpoints;

public static class AuthEndpoints
{
    public static RouteGroupBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (LoginRequest request, AuthService auth, AccessControlService access, IJwtTokenService jwt) =>
        {
            var result = await auth.LoginAsync(request.Username, request.Password);
            if (!result.Success) return Results.Unauthorized();
            return Results.Ok(result with { JwtToken = await TryIssueJwtAsync(jwt, access, result) });
        }).Validate<LoginRequest>();

        group.MapGet("/external/{provider}", (string provider, HttpContext context, IOptions<ExternalAuthenticationOptions> options) =>
        {
            if (!IsEnabled(provider, options.Value)) return Results.NotFound();
            var callback = $"{context.Request.PathBase}/api/auth/external/complete";
            return Results.Challenge(new AuthenticationProperties { RedirectUri = callback }, [ProviderScheme(provider)]);
        });

        group.MapGet("/external/complete", async (HttpContext context, ExternalAuthService external, AccessControlService access, IJwtTokenService jwt, IOptions<ExternalAuthenticationOptions> options) =>
        {
            if (!options.Value.Google.Enabled && !options.Value.Microsoft.Enabled && !options.Value.Apple.Enabled) return Results.NotFound();
            var result = await context.AuthenticateAsync("External");
            if (!result.Succeeded || result.Principal is null) return Results.Unauthorized();
            await context.SignOutAsync("External");
            var email = result.Principal.FindFirstValue(ClaimTypes.Email) ?? result.Principal.FindFirstValue("email");
            var name = result.Principal.FindFirstValue(ClaimTypes.Name) ?? result.Principal.FindFirstValue("name");
            var login = await external.LoginAsync(email ?? string.Empty, name);
            return login.Success ? Results.Ok(login with { JwtToken = await TryIssueJwtAsync(jwt, access, login) }) : Results.Unauthorized();
        });

        group.MapPost("/logout", async (AuthService auth, ICurrentUser currentUser) =>
        {
            if (!currentUser.UserId.HasValue) return Results.Unauthorized();
            await auth.LogoutAsync(currentUser.UserId.Value);
            return Results.NoContent();
        }).AddEndpointFilter(RequireAuthFilter.Invoke);

        group.MapGet("/me", async (ICurrentUser currentUser) =>
        {
            if (!currentUser.IsAuthenticated) return Results.Unauthorized();
            var user = await currentUser.GetCurrentUserAsync();
            return user is null ? Results.NotFound() : Results.Ok(user);
        });

        group.MapPost("/register", async (RegisterRequest request, AuthService auth, AccessControlService access, IJwtTokenService jwt) =>
        {
            var result = await auth.RegisterAsync(request);
            if (!result.Success) return Results.BadRequest(result);
            return Results.Ok(result with { JwtToken = await TryIssueJwtAsync(jwt, access, result) });
        }).Validate<RegisterRequest>();

        group.MapPost("/change-password", async (ChangePasswordRequest request, AuthService auth, ICurrentUser currentUser) =>
        {
            if (!currentUser.UserId.HasValue) return Results.Unauthorized();
            var changed = await auth.ChangePasswordAsync(currentUser.UserId.Value, request.CurrentPassword, request.NewPassword);
            return changed ? Results.NoContent() : Results.BadRequest(new { error = "Invalid current password." });
        }).Validate<ChangePasswordRequest>();

        group.MapPost("/request-reset", async (RequestResetRequest request, AuthService auth) =>
        {
            var ticket = await auth.RequestPasswordResetAsync(request.UsernameOrEmail);
            return ticket is null ? Results.NotFound() : Results.Ok(ticket);
        }).Validate<RequestResetRequest>();

        group.MapPost("/reset-password", async (ResetPasswordRequest request, AuthService auth) =>
        {
            var reset = await auth.ResetPasswordAsync(request.Token, request.NewPassword);
            return reset ? Results.NoContent() : Results.BadRequest(new { error = "Invalid token." });
        }).Validate<ResetPasswordRequest>();

        return group;
    }

    private static async Task<string?> TryIssueJwtAsync(IJwtTokenService jwt, AccessControlService access, AuthResult result)
    {
        if (result.User is null) return null;
        try
        {
            var permissions = await access.GetEffectivePermissionsAsync(result.User.IDUser);
            return jwt.CreateToken(result.User, permissions);
        }
        catch (InvalidOperationException)
        {
            return null;
        }
    }

    private static bool IsEnabled(string provider, ExternalAuthenticationOptions options) => provider.ToLowerInvariant() switch
    {
        "google" => options.Google.Enabled,
        "microsoft" => options.Microsoft.Enabled,
        "apple" => options.Apple.Enabled,
        _ => false,
    };

    private static string ProviderScheme(string provider) => provider.ToLowerInvariant() switch
    {
        "google" => "Google",
        "microsoft" => "Microsoft",
        "apple" => "Apple",
        _ => throw new ArgumentException("Unsupported external authentication provider.", nameof(provider)),
    };
}
