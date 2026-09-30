using System.Reflection;
using System.Runtime.ExceptionServices;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace ImPedro.ConventionApi;

internal static class ConventionApiInvoker
{
    public static async Task<object?> InvokeAsync(
        object service,
        string operation,
        bool read,
        JsonElement? body,
        IQueryCollection query,
        CancellationToken cancellationToken)
    {
        var method = ResolveMethod(service.GetType(), operation, read);
        var arguments = BindArguments(method, body, query, cancellationToken);
        try
        {
            return await AwaitAsync(method.Invoke(service, arguments));
        }
        catch (TargetInvocationException exception) when (exception.InnerException is not null)
        {
            ExceptionDispatchInfo.Capture(exception.InnerException).Throw();
            throw;
        }
    }

    private static MethodInfo ResolveMethod(Type serviceType, string operation, bool read)
    {
        var method = serviceType.GetMethods(BindingFlags.Instance | BindingFlags.Public)
            .Where(candidate => !candidate.IsSpecialName && candidate.DeclaringType != typeof(object))
            .SingleOrDefault(candidate => ServiceName.Operation(candidate.Name).Equals(operation, StringComparison.OrdinalIgnoreCase)
                && IsRead(candidate.Name) == read);
        return method ?? throw new KeyNotFoundException($"Operation '{operation}' was not found.");
    }

    private static object?[] BindArguments(MethodInfo method, JsonElement? body, IQueryCollection query, CancellationToken cancellationToken)
    {
        return method.GetParameters().Select(parameter =>
        {
            if (parameter.ParameterType == typeof(CancellationToken)) return (object?)cancellationToken;
            if (TryRead(body, query, parameter, out var value)) return value;
            if (parameter.HasDefaultValue) return parameter.DefaultValue;
            throw new ArgumentException($"Missing required argument '{parameter.Name}'.");
        }).ToArray();
    }

    private static bool TryRead(JsonElement? body, IQueryCollection query, ParameterInfo parameter, out object? value)
    {
        var name = parameter.Name ?? throw new InvalidOperationException("Unnamed service parameters are unsupported.");
        if (body is { ValueKind: JsonValueKind.Object } json && TryGetProperty(json, name, out var property))
        {
            value = property.Deserialize(parameter.ParameterType, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            return true;
        }
        if (query.TryGetValue(name, out var queryValue))
        {
            value = parameter.ParameterType == typeof(string)
                ? queryValue.ToString()
                : JsonSerializer.Deserialize(queryValue.ToString(), parameter.ParameterType, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            return true;
        }
        value = null;
        return false;
    }

    private static bool TryGetProperty(JsonElement element, string name, out JsonElement value)
    {
        foreach (var property in element.EnumerateObject())
        {
            if (property.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                value = property.Value;
                return true;
            }
        }
        value = default;
        return false;
    }

    private static async Task<object?> AwaitAsync(object? invocation)
    {
        if (invocation is not Task task) return invocation;
        await task;
        return task.GetType().IsGenericType ? task.GetType().GetProperty("Result")!.GetValue(task) : null;
    }

    private static bool IsRead(string name) => name.StartsWith("Get", StringComparison.Ordinal)
        || name.StartsWith("Find", StringComparison.Ordinal)
        || name.StartsWith("List", StringComparison.Ordinal)
        || name.StartsWith("Query", StringComparison.Ordinal)
        || name.StartsWith("Count", StringComparison.Ordinal)
        || name.StartsWith("Exists", StringComparison.Ordinal);
}
