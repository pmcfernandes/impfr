namespace ImPedro.Mail.Models;

public sealed record EmailResult(bool Success, string? Error)
{
    public static EmailResult Ok() => new(true, null);
    public static EmailResult Fail(string error) => new(false, error);
}
