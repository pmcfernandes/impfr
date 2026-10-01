using System.Security.Claims;
using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Security;
using ImPedro.Security.Models;
using ImPedro.Security.Services;
using ImPedro.Security.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginRequest request, AuthService auth, AccessControlService access, IJwtTokenService jwt)
    {
        var result = await auth.LoginAsync(request.Username, request.Password);
        return result.Success ? Ok(result with { JwtToken = await TryIssueJwtAsync(jwt, access, result) }) : Unauthorized();
    }

    [HttpGet("external/{provider}")]
    public ActionResult ExternalLogin(string provider, IOptions<ExternalAuthenticationOptions> options)
    {
        if (!IsEnabled(provider, options.Value)) return NotFound();
        var callback = $"{Request.PathBase}/api/auth/external/complete";
        return Challenge(new AuthenticationProperties { RedirectUri = callback }, ProviderScheme(provider));
    }

    [HttpGet("external/complete")]
    public async Task<ActionResult> CompleteExternalLogin(
        ExternalAuthService external,
        AccessControlService access,
        IJwtTokenService jwt,
        IOptions<ExternalAuthenticationOptions> options)
    {
        if (!options.Value.Google.Enabled && !options.Value.Microsoft.Enabled && !options.Value.Apple.Enabled) return NotFound();
        var result = await HttpContext.AuthenticateAsync("External");
        if (!result.Succeeded || result.Principal is null) return Unauthorized();

        await HttpContext.SignOutAsync("External");
        var email = result.Principal.FindFirstValue(ClaimTypes.Email) ?? result.Principal.FindFirstValue("email");
        var name = result.Principal.FindFirstValue(ClaimTypes.Name) ?? result.Principal.FindFirstValue("name");
        var login = await external.LoginAsync(email ?? string.Empty, name);
        return login.Success ? Ok(login with { JwtToken = await TryIssueJwtAsync(jwt, access, login) }) : Unauthorized();
    }

    [HttpPost("logout")]
    [RequireAuthentication]
    public async Task<ActionResult> Logout(AuthService auth, ICurrentUser currentUser)
    {
        await auth.LogoutAsync(currentUser.UserId!.Value);
        return NoContent();
    }

    [HttpGet("me")]
    [RequireAuthentication]
    public async Task<ActionResult> Me(ICurrentUser currentUser)
        => await currentUser.GetCurrentUserAsync() is { } user ? Ok(user) : NotFound();

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterRequest request, AuthService auth, AccessControlService access, IJwtTokenService jwt)
    {
        var result = await auth.RegisterAsync(request);
        return result.Success ? Ok(result with { JwtToken = await TryIssueJwtAsync(jwt, access, result) }) : BadRequest(result);
    }

    [HttpPost("change-password")]
    [RequireAuthentication]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request, AuthService auth, ICurrentUser currentUser)
    {
        var changed = await auth.ChangePasswordAsync(currentUser.UserId!.Value, request.CurrentPassword, request.NewPassword);
        return changed ? NoContent() : BadRequest(new { error = "Invalid current password." });
    }

    [HttpPost("request-reset")]
    public async Task<ActionResult> RequestReset(RequestResetRequest request, AuthService auth)
        => await auth.RequestPasswordResetAsync(request.UsernameOrEmail) is { } ticket ? Ok(ticket) : NotFound();

    [HttpPost("reset-password")]
    public async Task<ActionResult> ResetPassword(ResetPasswordRequest request, AuthService auth)
        => await auth.ResetPasswordAsync(request.Token, request.NewPassword)
            ? NoContent()
            : BadRequest(new { error = "Invalid token." });

    private static async Task<string?> TryIssueJwtAsync(IJwtTokenService jwt, AccessControlService access, AuthResult result)
    {
        if (result.User is null) return null;
        try
        {
            return jwt.CreateToken(result.User, await access.GetEffectivePermissionsAsync(result.User.IDUser));
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
