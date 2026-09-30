namespace ImPedro.Security;

public static class AuthErrors
{
    public const string InvalidCredentials = "InvalidCredentials";
    public const string AccountLocked = "AccountLocked";
    public const string UserNotFound = "UserNotFound";
    public const string UsernameTaken = "UsernameTaken";
    public const string EmailTaken = "EmailTaken";
    public const string TokenInvalid = "TokenInvalid";
    public const string InvalidRequest = "InvalidRequest";
    public const string ExternalIdentityInvalid = "ExternalIdentityInvalid";
}
