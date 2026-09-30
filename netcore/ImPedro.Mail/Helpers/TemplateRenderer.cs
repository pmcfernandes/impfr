namespace ImPedro.Mail.Helpers;

public static class TemplateRenderer
{
    public static string Render(string template, IDictionary<string, string?> variables)
    {
        if (string.IsNullOrEmpty(template) || variables is null) return template ?? string.Empty;
        var result = template;
        foreach (var (key, value) in variables)
            result = result.Replace("{{" + key + "}}", value ?? string.Empty, StringComparison.Ordinal);
        return result;
    }
}
