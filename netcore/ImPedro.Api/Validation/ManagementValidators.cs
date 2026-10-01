using ImPedro.Api.Models;

namespace ImPedro.Api.Validation;

public sealed class CreateUserRequestValidator : IValidator<CreateUserRequest>
{
    public ValidationResult Validate(CreateUserRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Username)) result.AddError("username", "Username is required.");
        else if (value.Username.Trim().Length < 3) result.AddError("username", "Username must have at least 3 characters.");
        if (string.IsNullOrWhiteSpace(value.Email)) result.AddError("email", "Email is required.");
        else result.Merge("email", EmailValidator.Instance.Validate(value.Email));
        if (string.IsNullOrEmpty(value.Password)) result.AddError("password", "Password is required.");
        else if (value.Password.Length < 6) result.AddError("password", "Password must have at least 6 characters.");
        UserContactValidation.ValidateUserContactFields(value.Address, value.City, value.ZipCode, value.Phone, value.Mobile, result);
        return result;
    }
}

public sealed class UpdateUserRequestValidator : IValidator<UpdateUserRequest>
{
    public ValidationResult Validate(UpdateUserRequest value)
    {
        var result = new ValidationResult();
        if (value.Username is null && value.Fullname is null && value.Email is null
            && value.Address is null && value.City is null && value.ZipCode is null
            && value.Phone is null && value.Mobile is null && value.PhotoName is null)
            result.AddError("", "At least one field must be supplied.");
        if (value.Email is not null && !EmailValidator.IsValid(value.Email))
            result.AddError("email", "Email format is invalid.");
        UserContactValidation.ValidateUserContactFields(value.Address, value.City, value.ZipCode, value.Phone, value.Mobile, result);
        return result;
    }
}

public sealed class SetPasswordRequestValidator : IValidator<SetPasswordRequest>
{
    public ValidationResult Validate(SetPasswordRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrEmpty(value.NewPassword)) result.AddError("newPassword", "New password is required.");
        else if (value.NewPassword.Length < 6) result.AddError("newPassword", "New password must have at least 6 characters.");
        return result;
    }
}

public sealed class CreateGroupRequestValidator : IValidator<CreateGroupRequest>
{
    public ValidationResult Validate(CreateGroupRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Name)) result.AddError("name", "Group name is required.");
        if (value.Email is not null && !EmailValidator.IsValid(value.Email))
            result.AddError("email", "Email format is invalid.");
        return result;
    }
}

public sealed class SetGroupPermissionsRequestValidator : IValidator<SetGroupPermissionsRequest>
{
    public ValidationResult Validate(SetGroupPermissionsRequest value)
    {
        var result = new ValidationResult();
        for (var i = 0; i < value.Assignments.Count; i++)
        {
            if (string.IsNullOrWhiteSpace(value.Assignments[i].TableName))
                result.AddError($"assignments[{i}].tableName", "Table name is required.");
            if (string.IsNullOrWhiteSpace(value.Assignments[i].PermissionCode))
                result.AddError($"assignments[{i}].permissionCode", "Permission code is required.");
        }
        return result;
    }
}

public sealed class CreateTaskRequestValidator : IValidator<CreateTaskRequest>
{
    public ValidationResult Validate(CreateTaskRequest value)
    {
        var result = new ValidationResult();
        if (value.WorkflowId <= 0) result.AddError("workflowId", "Workflow id must be positive.");
        if (string.IsNullOrWhiteSpace(value.Task)) result.AddError("task", "Task payload is required.");
        if (value.UserId <= 0) result.AddError("userId", "User id must be positive.");
        if (string.IsNullOrWhiteSpace(value.Name)) result.AddError("name", "Task name is required.");
        return result;
    }
}

public sealed class AddAttachmentRequestValidator : IValidator<AddAttachmentRequest>
{
    public ValidationResult Validate(AddAttachmentRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.Name)) result.AddError("name", "Attachment name is required.");
        if (string.IsNullOrWhiteSpace(value.Filename)) result.AddError("filename", "Filename is required.");
        return result;
    }
}

public sealed class SetCustomValueRequestValidator : IValidator<SetCustomValueRequest>
{
    public ValidationResult Validate(SetCustomValueRequest value)
    {
        var result = new ValidationResult();
        if (string.IsNullOrWhiteSpace(value.TableName)) result.AddError("tableName", "Table name is required.");
        if (value.RelatedId <= 0) result.AddError("relatedId", "Related id must be positive.");
        if (string.IsNullOrWhiteSpace(value.Name)) result.AddError("name", "Name is required.");
        if (value.Value.ValueKind == System.Text.Json.JsonValueKind.Undefined)
            result.AddError("value", "Value is required.");
        return result;
    }
}

internal static class UserContactValidation
{
    public static void ValidateUserContactFields(
        string? address,
        string? city,
        string? zipCode,
        string? phone,
        string? mobile,
        ValidationResult result)
    {
        if (address is not null && address.Length > 255)
            result.AddError("address", "Address must have at most 255 characters.");
        if (city is not null && city.Length > 80)
            result.AddError("city", "City must have at most 80 characters.");
        if (zipCode is not null && zipCode.Length > 8)
            result.AddError("zipCode", "Zip code must have at most 8 characters.");
        if (phone is not null && phone.Length > 15)
            result.AddError("phone", "Phone must have at most 15 characters.");
        if (mobile is not null && mobile.Length > 15)
            result.AddError("mobile", "Mobile must have at most 15 characters.");
    }
}
