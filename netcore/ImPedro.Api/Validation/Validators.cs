using System.Text.RegularExpressions;

namespace ImPedro.Api.Validation;

public sealed partial class EmailValidator : IValidator<string>
{
    public static EmailValidator Instance { get; } = new();

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
    private static partial Regex EmailRegex();

    public static bool IsValid(string? value)
        => !string.IsNullOrWhiteSpace(value) && EmailRegex().IsMatch(value);

    public ValidationResult Validate(string value)
        => IsValid(value) ? ValidationResult.Success() : ValidationResult.Failure("", "Email format is invalid.");
}

public sealed class RegexValidator : IValidator<string>
{
    private readonly Regex _regex;
    private readonly string _errorMessage;

    public RegexValidator(string pattern, string errorMessage, RegexOptions options = RegexOptions.None)
    {
        _regex = new Regex(pattern, options | RegexOptions.Compiled, TimeSpan.FromSeconds(1));
        _errorMessage = errorMessage;
    }

    public bool IsValid(string? value) => string.IsNullOrEmpty(value) || _regex.IsMatch(value);

    public string? ErrorMessage(string? value) => IsValid(value) ? null : _errorMessage;

    public ValidationResult Validate(string value)
        => IsValid(value) ? ValidationResult.Success() : ValidationResult.Failure("", _errorMessage);
}
