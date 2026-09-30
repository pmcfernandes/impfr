using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace ImPedro.Core.Extensions;

public static partial class StringExtensions
{
    private const string Alphanumeric = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string PasswordSymbols = "#$%&()?";

    public static string ExtractBetween(this string? source, string beginDelimiter, string endDelimiter, StringComparison comparison = StringComparison.Ordinal)
    {
        if (string.IsNullOrEmpty(source)) return string.Empty;
        ArgumentNullException.ThrowIfNull(beginDelimiter);
        ArgumentNullException.ThrowIfNull(endDelimiter);
        var start = source.IndexOf(beginDelimiter, comparison);
        if (start < 0) return string.Empty;
        start += beginDelimiter.Length;
        var end = source.IndexOf(endDelimiter, start, comparison);
        return end < 0 ? string.Empty : source[start..end];
    }

    public static string RemoveSpecialCharacters(this string value) => SpecialCharactersRegex().Replace(value, string.Empty);

    public static string[] SplitNonEmpty(this string? value, char delimiter = ',')
        => string.IsNullOrEmpty(value) ? [] : value.Split(delimiter, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    public static string Prefix(this string value, string prefix) => prefix + value;

    public static IEnumerable<string> PrefixEach(this IEnumerable<string> values, string prefix, bool skipLast = false)
        => DecorateEach(values, value => prefix + value, skipLast);

    public static IEnumerable<string> SuffixEach(this IEnumerable<string> values, string suffix, bool skipLast = false)
        => DecorateEach(values, value => value + suffix, skipLast);

    public static string Alias(this string value)
    {
        var index = value.IndexOf('.');
        return index < 0 ? string.Empty : value[..index];
    }

    public static bool IsAliased(this string? value) => !string.IsNullOrEmpty(value) && value.Contains('.');

    public static string WithoutAlias(this string value)
    {
        var index = value.IndexOf('.');
        return index < 0 ? value : value[(index + 1)..];
    }

    public static string EnsureEndsWith(this string value, string suffix, StringComparison comparison = StringComparison.Ordinal)
        => value.EndsWith(suffix, comparison) ? value : value + suffix;

    public static string EnsureNotEndsWith(this string value, string suffix, StringComparison comparison = StringComparison.Ordinal)
        => value.EndsWith(suffix, comparison) ? value[..^suffix.Length] : value;

    public static string InsertSpacesBeforeCaps(this string value) => CapitalsRegex().Replace(value, " $1").TrimStart();

    public static string ToProperCase(this string value, CultureInfo? culture = null)
        => (culture ?? CultureInfo.CurrentCulture).TextInfo.ToTitleCase(value.ToLower(culture ?? CultureInfo.CurrentCulture));

    public static string ToCamelCase(this string value)
    {
        var words = WordRegex().Matches(value).Select(match => match.Value).ToArray();
        if (words.Length == 0) return string.Empty;
        return string.Concat(words.Select((word, index) => index == 0
            ? word.ToLowerInvariant()
            : char.ToUpperInvariant(word[0]) + word[1..].ToLowerInvariant()));
    }

    public static string ToBase64(this string value) => Convert.ToBase64String(Encoding.UTF8.GetBytes(value));

    public static string FromBase64(this string value) => Encoding.UTF8.GetString(Convert.FromBase64String(value));

    public static string RemoveDiacritics(this string value)
    {
        var normalized = value.Normalize(NormalizationForm.FormD);
        var output = new StringBuilder(normalized.Length);
        foreach (var character in normalized)
            if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark) output.Append(character);
        return output.ToString().Normalize(NormalizationForm.FormC);
    }

    public static string Left(this string value, int length) => length <= 0 ? string.Empty : value[..Math.Min(length, value.Length)];

    public static string Right(this string value, int length) => length <= 0 ? string.Empty : value[Math.Max(0, value.Length - length)..];

    public static string Truncate(this string value, int length, string suffix = "...")
    {
        ArgumentOutOfRangeException.ThrowIfNegative(length);
        var text = HtmlRegex().Replace(value, " ").Trim();
        return text.Length <= length ? text : text[..length].TrimEnd() + suffix;
    }

    public static int WordCount(this string? value) => string.IsNullOrWhiteSpace(value) ? 0 : WordRegex().Count(value);

    public static bool IsNullOrWhiteSpaceOrZero(this string? value)
        => string.IsNullOrWhiteSpace(value) || value.Trim() == "0";

    public static string ReverseText(this string value) => new(value.Reverse().ToArray());

    public static string RandomString(int length, bool includeSymbols = false)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(length);
        var alphabet = includeSymbols ? Alphanumeric + PasswordSymbols : Alphanumeric;
        var output = new char[length];
        for (var index = 0; index < output.Length; index++) output[index] = alphabet[RandomNumberGenerator.GetInt32(alphabet.Length)];
        return new string(output);
    }

    private static IEnumerable<string> DecorateEach(IEnumerable<string> values, Func<string, string> decorate, bool skipLast)
    {
        ArgumentNullException.ThrowIfNull(values);
        var materialized = values.ToArray();
        for (var index = 0; index < materialized.Length; index++)
            yield return skipLast && index == materialized.Length - 1 ? materialized[index] : decorate(materialized[index]);
    }

    [GeneratedRegex("[^a-zA-Z0-9_. ]+")]
    private static partial Regex SpecialCharactersRegex();

    [GeneratedRegex("([A-Z])")]
    private static partial Regex CapitalsRegex();

    [GeneratedRegex("[\\p{L}\\p{N}]+")]
    private static partial Regex WordRegex();

    [GeneratedRegex("<[^>]+>", RegexOptions.IgnoreCase)]
    private static partial Regex HtmlRegex();
}
