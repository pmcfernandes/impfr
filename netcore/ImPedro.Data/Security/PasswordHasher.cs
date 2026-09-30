using System.Security.Cryptography;
using System.Text;

namespace ImPedro.Data.Security;

public static class PasswordHasher
{
    public static string ToMd5(string value)
    {
        var bytes = MD5.HashData(Encoding.UTF8.GetBytes(value ?? string.Empty));
        return Convert.ToHexString(bytes);
    }

    public static bool VerifyMd5(string value, string? hash)
        => string.Equals(ToMd5(value), hash, StringComparison.OrdinalIgnoreCase);
}
