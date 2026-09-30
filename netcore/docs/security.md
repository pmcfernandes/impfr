# ImPedro.Security

Security layer over `ImPedro.Data`: token authentication, registration, password recovery, logged-in user, groups, and permissions. Registered with `AddImPedroSecurity()` (scoped services).

## Tokens and sessions

The session token lives in the `MetaUser.M_Guid` column (32-char hex), as in the legacy model (`fn_GetIdUserByToken`). It is rotated on login, logout, password change, and reset — so those operations invalidate other sessions. There is no expiry column in the schema: requesting a reset invalidates active sessions, and expiry may live in the API or a future table.

## `AuthService`

- `LoginAsync(username, password)` → `AuthResult(Ok(User, Token) | Fail(error))`. Rejects empty, unknown, deleted, group, wrong-password (MD5), and locked (`M_Locked`) accounts. Errors in `AuthErrors`: `InvalidCredentials`, `AccountLocked`, etc.
- `LogoutAsync(userId)` — rotates the token.
- `GetUserByTokenAsync(token)` → `UserDto?` (rejects locked/deleted users).
- `RegisterAsync(RegisterRequest)` — validates input and uniqueness (`UsernameTaken`, `EmailTaken`), creates the user with MD5, attaches optional groups (unknown group throws `KeyNotFoundException`), and auto-logs in (returns `User` + `Token`).
- `ChangePasswordAsync(userId, current, new)` — requires the current one, stores MD5, and rotates the token. Returns `bool`.
- `RequestPasswordResetAsync(usernameOrEmail)` → `PasswordResetTicket(Email, Token)?` (null when not found; the API decides whether to disclose and send the email).
- `ResetPasswordAsync(token, newPassword)` — consumes the ticket, stores MD5, and rotates the token. Returns `bool`.

## Logged-in user (`ICurrentUser` / `CurrentUser`, scoped)

`UserId`, `IsAuthenticated`, `SetCurrentUser(id?)`, `Clear()`, `GetCurrentUserAsync()`, `HasPermissionAsync(table, code)`, and `RequirePermissionAsync` (throws `UnauthorizedAccessException`). The future API fills it from the token (e.g. middleware: `GetUserByTokenAsync` → `SetCurrentUser`).

## Groups (`GroupService`)

Groups are `MetaUser` rows with `IsGroup`. Create (omitted email generates `name@groups.local`), rename, delete (soft delete + member and permission cleanup), members (`Get/Add/RemoveMemberAsync`), and group permissions (`GetGroupPermissionsAsync`, `SetGroupPermissionsAsync` with atomic replacement; unknown table/code throws `KeyNotFoundException`).

## Permissions (`AccessControlService`)

`GetEffectivePermissionsAsync(userId)` — union of direct permissions with group-inherited ones (`MetaGroupUsers`), in `table.CODE` format; `HasAccessAsync` (case-insensitive) and `RevokeAsync` (removes direct grants). Profile-based evaluation (`CodProfile`) remains available in `PermissionService.UserInProfileAsync`.
