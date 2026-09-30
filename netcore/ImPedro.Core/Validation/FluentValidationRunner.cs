using System.Reflection;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.DependencyInjection;

namespace ImPedro.Core.Validation;

internal static class FluentValidationRunner
{
    private static readonly MethodInfo ValidateMethod = typeof(FluentValidationRunner)
        .GetMethod(nameof(ValidateTypedAsync), BindingFlags.Static | BindingFlags.NonPublic)!;

    public static Task<ValidationResult?> ValidateAsync(IServiceProvider services, object value, CancellationToken cancellationToken)
    {
        var method = ValidateMethod.MakeGenericMethod(value.GetType());
        return (Task<ValidationResult?>)method.Invoke(null, [services, value, cancellationToken])!;
    }

    private static async Task<ValidationResult?> ValidateTypedAsync<T>(IServiceProvider services, object value, CancellationToken cancellationToken)
    {
        var validator = services.GetService<IValidator<T>>();
        return validator is null ? null : await validator.ValidateAsync((T)value, cancellationToken);
    }
}
