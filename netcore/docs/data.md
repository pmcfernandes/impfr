# ImPedro.Data

## Framework Initializer

`IFrameworkInitializer` idempotently creates the bootstrap records present in `data.sql`: the `AdaptiveERP` application, the `admin` user, the `Administradores` group, and their membership. It does not modify existing records.

In the API, the initializer only runs at startup when `Initializer:Enabled=true`. Configure `Initializer:AdminPassword` through a secret or environment variable before enabling it; the password is not included in `appsettings.json`. The remaining values can be adjusted in the `Initializer` section.

Data access functions over `ImPedro.Entity`, ready to be consumed by the API. References `ImPedro.Entity` and `Microsoft.EntityFrameworkCore`.

## Infrastructure

- `Repositories/IRepository<T>` + `Repositories/Repository<T>` — `Query()`/`QueryTracking()`, `FindAsync`, `FirstOrDefaultAsync`, `ListAsync`, `CountAsync`, `AnyAsync`, `PagedAsync` (optional page, size, predicate, and ordering), `AddAsync`/`AddRangeAsync`, `Update`, `Remove`/`RemoveRange`. Reads are tracking-free.
- `IUnitOfWork` / `UnitOfWork` — per-type repository access (`Repository<T>()`), `SaveChangesAsync`, and `ExecuteInTransactionAsync` (with and without a return value).
- `Dtos/PagedResult<T>` — `Items`, `Page`, `PageSize`, `TotalCount`, `TotalPages`.
- `Dtos/UserDto` — user without password (`FromEntity`).
- `Security/PasswordHasher` — uppercase-hex MD5, compatible with `fn_ToMD5` (`ToMd5`, `VerifyMd5`).

## Services

- `UserService` — `AuthenticateAsync` (MD5, excludes deleted users and groups), `GetByTokenAsync` (`M_Guid`), `GetByUsernameAsync`/`GetByIdAsync`, `GetActiveUsersAsync`, `GetGroupsAsync`, `GetGroupsByUserAsync` / `GetUsersByGroupAsync` (joins like `fn_GetGroupsByUser`), membership (`AddUserToGroupAsync`/`RemoveUserFromGroupAsync`), `CreateAsync`, `UpdateAsync`, `SoftDeleteAsync` (`M_IsDeleted`), `SetPasswordAsync`, `SetLockedAsync`.
- `PermissionService` — `HasPermissionAsync(user, table, code)` and shortcuts `CanSelect/CanInsert/CanUpdate/CanDelete` (`MetaPermissionGranted` → `MetaTypePermission` → `MetaPermission` join, like the `fn_Get*Permission` functions), `GetUserPermissionsAsync` (`table.CODE`), `UserInProfileAsync`, `GrantAsync`/`RevokeAsync`, permission/profile/type listings.
- `MetaService` — catalog: tables (`GetTableAsync`/`GetTableByNameAsync`, like `fn_GetTablename`), fields (`GetFieldsAsync`, like `fn_GetFields`), applications, modules, menus, contexts, reports (+ parameters, categories, views), graphs (+ searches), dashboards, scripts, appointments (`MetaDayView` by user/range, plus saving) and scheduler resources.
- `SystemService` — `GetParameterAsync`/`SetParameterAsync` (like `fn_GetParameterValue`), `NextSequenceValueAsync` (reads like `fn_GetLastSequenceID` and increments `CurrentValue`), mail servers (+ default) and custom values (`Get/Set/DeleteCustomValueAsync` by table+id+name).
- `AuditService` — `LogTableAsync`/`LogFieldAsync` and paged queries with filters (user, table, field, range).
- `WorkflowService` — definitions, `StartWorkflowAsync`, paged tasks with filters (user, workflow, finished), `CreateTaskAsync`, `FinishTaskAsync` (marks finished + records history), fields (`GetTaskFieldsAsync`/`SaveTaskFieldAsync`), attachments and history.
