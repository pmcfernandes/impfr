# ImPedro.Query

Generic layer for direct database queries over `ImPedro.Entity`. Registered with `AddImPedroQuery()` (`ISqlQuery` → `SqlQueryService`, scoped; `IMapper` → `Mapper`, singleton). Uses the `DbContext` connection (participates in the ambient transaction) and honors the configured timeout.

## `ISqlQuery`

- `QueryAsync<T>(FormattableString)` — interpolated SQL with automatic parameterization; `T` can be an entity, DTO, or scalar.
- `QueryAsync<T>(string, SqlParameter[]?)` — SQL with explicit parameters; `T` must be a class (mapped entities use `FromSqlRaw`, DTOs use `SqlQueryRaw`).
- `QueryFirstOrDefaultAsync`, `QuerySingleAsync`, `QuerySingleOrDefaultAsync` (interpolated).
- `ExecuteAsync` (interpolated or `string` + parameters) — commands without results; returns affected rows.
- `ProcedureAsync<T>` / `ProcedureFirstOrDefaultAsync<T>` — `EXEC name @p1, @p2…` with a parameter dictionary; the name is validated against injection. Serves the `xp_*` stored procedures in `framework.sql`.
- `QueryTableAsync(FormattableString)` — unknown shapes as `List<Dictionary<string, object?>>` (case-insensitive names, `DBNull` → `null`); ideal for stored SQL, e.g. `MetaGraph.SQLSyntax`.

## Rules

- Interpolating values (`$"… {value} …"`) is safe (becomes a parameter); never concatenate values into the text.
- Procedure names only accept `[A-Za-z_][\w.]*`.
- DTO properties must match the columns; reads are tracking-free.

## `IMapper` / `Mapper`

Row dictionaries (e.g. from `QueryTableAsync`) to DTOs: `Map<T>`, `MapList<T>`, `MapTo` (updates an existing instance). Typical composition:

```csharp
var dtos = mapper.MapList<MyDto>(await sql.QueryTableAsync($"SELECT * FROM MetaUser WHERE IsGroup = 0"));
```

Column lookup is case-insensitive; missing columns keep defaults; `DBNull` maps to nullables; strings/numbers convert to enums, `Guid`, `DateTime`, `bool` (`"1"`/`"0"` accepted) and numerics; incompatible values throw `InvalidOperationException`. Interface/collection properties are skipped, and the property map is cached per type.
