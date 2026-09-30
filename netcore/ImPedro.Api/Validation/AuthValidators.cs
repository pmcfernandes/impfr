using ImPedro.Api.Models;
using ImPedro.Security.Models;

namespace ImPedro.Api.Validation;

public sealed class LoginRequestValidator : IValidator<LoginRequest>
{
    public ValidationResult Validate(LoginRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Username)) result.AddError("username", "Username is required.");
        if (string.IsNullOrWhiteSpace(value.Password)) result.AddError("password", "Password is required.");
        return result;
    }
}

public sealed class RegisterRequestValidator : IValidator<RegisterRequest>
{
    public ValidationResult Validate(RegisterRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Username)) result.AddError("username", "Username is required.");
        else if (value.Username.Trim().Length < 3) result.AddError("username", "Username must have at least 3 characters.");
        if (string.IsNullOrWhiteSpace(value.Email)) result.AddError("email", "Email is required.");
        else result.Merge("email", EmailValidator.Instance.Validate(value.Email));
        if (string.IsNullOrEmpty(value.Password)) result.AddError("password", "Password is required.");
        else if (value.Password.Length < 6) result.AddError("password", "Password must have at least 6 characters.");
        return result;
    }
}

public sealed class ChangePasswordRequestValidator : IValidator<ChangePasswordRequest>
{
    public ValidationResult Validate(ChangePasswordRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.CurrentPassword)) result.AddError("currentPassword", "Current password is required.");
        if (string.IsNullOrEmpty(value.NewPassword)) result.AddError("newPassword", "New password is required.");
        else if (value.NewPassword.Length < 6) result.AddError("newPassword", "New password must have at least 6 characters.");
        else if (value.NewPassword == value.CurrentPassword) result.AddError("newPassword", "New password must differ from the current one.");
        return result;
    }
}

public sealed class RequestResetRequestValidator : IValidator<RequestResetRequest>
{
    public ValidationResult Validate(RequestResetRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.UsernameOrEmail)) result.AddError("usernameOrEmail", "Username or email is required.");
        return result;
    }
}

public sealed class ResetPasswordRequestValidator : IValidator<ResetPasswordRequest>
{
    public ValidationResult Validate(ResetPasswordRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Token)) result.AddError("token", "Token is required.");
        if (string.IsNullOrEmpty(value.NewPassword)) result.AddError("newPassword", "New password is required.");
        else if (value.NewPassword.Length < 6) result.AddError("newPassword", "New password must have at least 6 characters.");
        return result;
    }
}
