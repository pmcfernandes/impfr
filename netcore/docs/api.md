# ImPedro.Api

HTTP layer over the other projects, in the two styles supported by ASP.NET Core: **Minimal API** (`Endpoints/`, routes `/api/auth`, `/api/users`, `/api/groups`) and **Web API** (`Controllers/`, `MetaController`, `WorkflowController`, `QueryController`, `JobsController`). Both delegate to the same services (`ImPedro.Data`, `ImPedro.Security`, `ImPedro.Query`, `ImPedro.Jobs`); business logic lives in the services, not the endpoints.

## Bootstrap

- `Bootstrap/WebApiBootstrap` — `AddImPedroWebApi(services, config)` + `UseImPedroWebApi(app)` (mapeia Controllers).
- `Bootstrap/MinimalApiBootstrap` — `AddImPedroMinimalApi(services, config)` + `UseImPedroMinimalApi(app)` (maps Minimal API endpoints).
- An idempotent internal shared core (registration marker and `app.Properties`) makes using both in the same host safe. `Program.cs` uses both.

## Run

```powershell
dotnet run --project backend/ImPedro.Api
```

Configure the connection in `ConnectionStrings:Framework` (`appsettings.json`; LocalDB by default, with SQL Server required to be running). OpenAPI is at `/openapi/v1.json`, Swagger UI at `/swagger`, and the Hangfire dashboard at `/hangfire`.

Initial bootstrap is optional: setting `Initializer:Enabled=true` and providing `Initializer:AdminPassword` idempotently creates the application, admin, and administrative group defined in `data.sql`.

## Authentication

Custom middleware (`UseImPedroAuth`) reads `Authorization: Bearer <token>`, resolves it with `AuthService.GetUserByTokenAsync`, and populates scoped `ICurrentUser`. Requests without a valid token remain anonymous. Opaque (`M_Guid`) tokens and JWTs coexist: when `Jwt:Secret` is configured (at least 32 characters), `JwtBearer` validates JWTs and the middleware adopts `sub` as the user; login and registration return the JWT in `AuthResult.JwtToken` (with permission claims).

External OAuth: configure `ExternalAuthentication:Google|Microsoft|Apple` with `ClientId` and `ClientSecret`. Each provider is only registered when both properties are present. `GET /api/auth/external/{google|microsoft|apple}` starts the flow; the callback creates or associates a non-group user using the provider-validated email, rotates the opaque token, and returns `AuthResult` (including a JWT when configured). For Apple, `ClientSecret` is the client-secret JWT generated for the Apple key and the redirect URI is `/signin-apple`.

- Minimal API: `RequireAuthFilter` (401) and `RequirePermissionFilter.For(table, code)` (401/403).
- Controllers: `[RequireAuthentication]` and `[RequirePermission(table, code)]`.

Public (no auth): login, register, request-reset, and reset-password. Everything else requires authentication; sensitive operations require permission: `DELETE /api/users/{id}` (`users.delete`), group-permission management (`groups.manage`), procedure/graph execution (`query.execute`), and job triggering (`jobs.execute`). Grants are created with `GroupService`/`SetGroupPermissionsAsync`.

## Rotas principais

- Auth (Minimal): `POST /api/auth/login|logout|register|change-password|request-reset|reset-password`, `GET /api/auth/me`.
- Schema (Minimal): `GET/POST/DELETE /api/schema/tables…`, `POST/PUT/DELETE /api/schema/columns` (`schema.manage`; ver `ddl.md`).
- Convention API (MVC): services DI ending in `AppService` can be exposed under `/api/services/{service}/{operation}`; see `convention-api.md`.
- Users (Minimal): `GET /api/users` (ativos), `/groups`, `/{id}`, `/{id}/groups`, `/{id}/permissions`; `POST /`, `PUT /{id}`, `DELETE /{id}`, `POST /{id}/password`.
- Groups (Minimal): CRUD at `/api/groups`, members (`/{id}/members…`), permissions (`/{id}/permissions`).
- Meta (Controller): tables, fields, parameters, sequences (`POST sequences/{name}/next`), applications, modules, menus, contexts, reports, graphs, dashboards, scripts, appointments, resources, mail servers, custom values, and paginated audits.
- Workflows (Controller): definitions, starts, tasks (paginated with filters), completion with history, fields, attachments, and history.
- Workflow engine (Controller): functional lifecycle at `/api/workflow-engine` (instances, assigned tasks, required fields, history, attachments, and automatic closure); see `workflow.md`.
- Query (Controller): `POST /api/query/procedure/{name}` and `POST /api/query/graph/{id}` (dynamic result). Arbitrary SQL is not exposed for security.
- Jobs (Controller): `GET /api/jobs/recurring`, `POST /api/jobs/trigger/{jobName}`, `POST /api/jobs/run/temp-cleanup`.
- Uploads (Controller): `GET /api/uploads`, `POST /api/uploads` (multipart, 201), `GET /api/uploads/{name}` (download), `DELETE /api/uploads/{name}`, served by `UploadService` (`ImPedro.Storage`).

## Cross-cutting

- **Swagger**: Swashbuckle with a global Bearer scheme (authorize once in the UI) and `MapOpenApi`.
- **RoutePrefix** (`UseRoutePrefix`, configuration `RoutePrefix:Prefix`): moves the prefix into `PathBase` to host under a subpath. An empty value is a no-op.
- **Exceptions** (`UseImPedroExceptionHandler`, outermost): `KeyNotFoundException`→404, `UnauthorizedAccessException`→403, `ArgumentException`/`InvalidOperationException`→400, and other exceptions→500, always as `application/problem+json` with `traceId`; 500 details are hidden outside Development.
- **Lowercase JSON** (`LowerCaseNamingPolicy` in Minimal APIs and Controllers, for properties and keys).
- **Validation** (`IValidator<T>` + `ValidationResult` with `Merge`): `EmailValidator` and `RegexValidator` implement `IValidator<string>` (primitives are excluded from automatic registration so standalone `string` values are not validated) and are composed by contracts; use `.Validate<T>()` in Minimal APIs and the global `ValidationActionFilter` in Controllers (400 `ValidationProblemDetails`), with assembly registration through `AddApiValidators`.
- **FluentValidation** (`ImPedro.Core`): `AbstractValidator<T>` validators in the API assembly are registered automatically. The MVC filter is global; Minimal APIs can use `.ValidateWithFluentValidation<T>()`. See `core.md`.
