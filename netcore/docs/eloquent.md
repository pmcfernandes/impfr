# ImPedro.Eloquent

Eloquent-style (Laravel) layer over `ImPedro.Entity`: Active Record, fluent query builder, soft deletes, mass assignment, and casts. It has no `ImPedro.Data` dependency and works with any `DbContext` (in practice, `FrameworkDbContext`).

## Scope (`Eloquent.Use` / `UseEloquent()`)

The ambient context is held in an `AsyncLocal`: `using (Eloquent.Use(context)) { … }`, or use `app.UseEloquent()` middleware (which resolves `FrameworkDbContext` from the request). Without a scope, operations throw `InvalidOperationException`. Nested scopes restore the previous context.

## Generic API and optional `Model`

`ImPedro.Entity` entities are POCOs. Use `Eloquent.Fill`, `GetAttribute`, `SetAttribute`, `ToDictionary`, `SaveAsync`, `DeleteAsync`, `RefreshAsync`, and `RestoreAsync` directly with any EF entity. `ImPedro.Eloquent.Model` is an optional base for custom models and provides `Fillable` (default empty) / `Guarded` (default `["*"]`, secure by default), `Get<T>`, `Set`, casts, and instance persistence methods.

## `EloquentQuery<T>` (via `Eloquent.Query<T>()`)

`Where`, `OrWhere`, `WhereIn`, `WhereNull`, `WhereNotNull`, `OrderBy`/`OrderByDescending`/`ThenBy`/`ThenByDescending`, `Take`/`Limit`, `Skip`/`Offset`, `Include`/`With`, `OnlyTrashed`/`WithoutTrashed` (`IsDeleted` convention), `GetAsync`, `FirstAsync`, `FirstOrDefaultAsync`, `FindAsync`, `FindOrFailAsync`, `CountAsync`, `ExistsAsync`, `SumAsync`, `AverageAsync`, `MinAsync`, `MaxAsync`, `PluckAsync` (name or expression), `PaginateAsync` (`Page<T>`), `FirstOrCreateAsync`, `UpdateOrCreateAsync`, `DeleteManyAsync`, `UpdateManyAsync` (dictionary → `ExecuteUpdate`), and `AsQueryable()` (escape hatch for unrestricted LINQ).

## Notas

- The schema has no foreign keys, so no navigations are generated; `Include`/`With` support future models that define them.
- `ISoftDeletable` lives in `ImPedro.Eloquent`; generic soft deletes use a writable boolean `IsDeleted` property on `MailServer`, `MetaProfile`, `MetaUser`, and `MetaDayView`. There are no global filters: use `WithoutTrashed`/`OnlyTrashed` to select records.
- Bulk `UpdateMany`/`DeleteMany` runs in SQL and bypasses the tracker; reread using a fresh context.
- `UpdateManyAsync` with an empty dictionary and `ThenBy` without `OrderBy` throw `ArgumentException`/`InvalidOperationException`; unknown columns throw `InvalidOperationException`.
