namespace ImPedro.Api.Validation;

public sealed class ValidationResult
{
    public Dictionary<string, string[]> Errors { get; } = new(StringComparer.OrdinalIgnoreCase);

    public bool IsValid => Errors.Count == 0;

    public static ValidationResult Success() => new();

    public static ValidationResult Failure(string field, string message)
    {
        var result = new ValidationResult();
        result.AddError(field, message);
        return result;
    }

    public void AddError(string field, string message)
    {
        if (Errors.TryGetValue(field, out var messages)) Errors[field] = [.. messages, message];
        else Errors[field] = [message];
    }

    public void Merge(string field, ValidationResult other)
    {
        foreach (var messages in other.Errors.Values)
            foreach (var message in messages)
                AddError(field, message);
    }
}

public interface IValidator<in T>
{
    ValidationResult Validate(T value);
}
