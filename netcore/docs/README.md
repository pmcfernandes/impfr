# ImPedro backend — documentation

Data and security layer in .NET 10 / Entity Framework Core 10 for the `Framework.Data2` database (modeled from `framework.sql`, at the repository root).

## Projects

| Project | Role | References |
|---|---|---|
| [ImPedro.Entity](entity.md) | Entities (37 tables + 2 views) and `FrameworkDbContext` with Fluent API | `Microsoft.EntityFrameworkCore.SqlServer` |
| [ImPedro.Data](data.md) | Generic repository, Unit of Work, and domain services consumable by the API | `ImPedro.Entity`, `Microsoft.EntityFrameworkCore` |
| [ImPedro.Ddl](ddl.md) | Validated SQL Server DDL for dynamic tables and columns | `ImPedro.Entity`, EF Core Relational |
| [ImPedro.ConventionApi](convention-api.md) | MVC controllers generated from application services by convention | ASP.NET Core MVC |
| [ImPedro.Core](core.md) | Cross-cutting generic utilities, starting with FluentValidation | FluentValidation |
| [ImPedro.Imaging](imaging.md) | Portable image processing and codecs | SixLabors.ImageSharp |
| [ImPedro.Workflow](workflow.md) | Workflow instance, task, field, history, and attachment orchestration | `ImPedro.Entity`, EF Core |
| [ImPedro.Security](security.md) | Login, registration, password recovery, logged-in user, groups, and permissions | `ImPedro.Data`, `Microsoft.Extensions.DependencyInjection.Abstractions` |
| [ImPedro.Query](query.md) | Direct SQL queries, stored procedures, and dynamic reading | `ImPedro.Entity`, `Microsoft.EntityFrameworkCore` |
| [ImPedro.Jobs](jobs.md) | Background processes (Hangfire + SqlServer) and dashboard | `ImPedro.Data`, Hangfire 1.8 |
| [ImPedro.Api](api.md) | HTTP layer: Minimal API and Web API controllers over all layers | All projects, `Microsoft.AspNetCore.OpenAPI` |
| [ImPedro.Storage](storage.md) | File storage on disk + upload service with validation | BCL only |
| [ImPedro.Eloquent](eloquent.md) | Laravel-style layer: Active Record, fluent query builder, soft deletes, mass assignment, casts | `ImPedro.Entity`, EF Core |

Project dependencies: `Security` → `Data` → `Entity` ← `Query`. No circular references.

## Building

```powershell
dotnet build backend/ImPedro.slnx
```

Restore uses NuGet (network required). Target framework: `net10.0` in every project.

## Connection configuration

`FrameworkDbContext` receives `DbContextOptions<FrameworkDbContext>` via DI. Without configured options, it uses the `FRAMEWORK_CONNECTION` environment variable, falling back to `(localdb)\MSSQLLocalDB`, database `Framework.Data2` (see `FrameworkDbContext.DefaultConnectionString`).

Typical registration in the future API (`Program.cs`):

```csharp
builder.Services.AddDbContext<FrameworkDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Framework")));
builder.Services.AddImPedroSecurity();
builder.Services.AddImPedroQuery();
```

## Conventions

- Class/property names match columns except legacy `M_` fields, which use clean names and explicit `HasColumnName` mappings; tables are mapped explicitly with `ToTable` and PK names preserved (`HasName`).
- C# nullable types reflect SQL `NULL`; required strings use `= null!;`.
- `varchar(n)` → `HasMaxLength(n).IsUnicode(false)`; `text`/`ntext`/`image`/`varchar(max)`/`varbinary(max)`/`smalldatetime`/`char` via `HasColumnType`; `sql_variant` → `object`.
- `IDENTITY` → `ValueGeneratedOnAdd`; script defaults via `HasDefaultValueSql` (`getdate()`, `newid()`, `((0))`, …).
- The script declares no foreign keys: no navigation properties; joins live in LINQ inside the services.
- Async methods with optional `CancellationToken`; reads with `AsNoTracking`.

## Roadmap (future API layer)

- `ImPedro.Api` project with `Microsoft.EntityFrameworkCore.Design` for migrations: `dotnet ef migrations add Initial --project backend/ImPedro.Entity --startup-project backend/ImPedro.Api`.
- Authentication middleware: read the token from the header, `AuthService.GetUserByTokenAsync`, `ICurrentUser.SetCurrentUser`.
- Reset email sending (`RequestPasswordResetAsync` returns the ticket; sending is the API's responsibility).
