# ImPedro.Ddl

SQL Server layer for managing dynamic-platform schemas without accepting arbitrary SQL. `ISqlSchema` exposes `TableExistsAsync`, `GetColumnsAsync`, `CreateTableAsync`, `DropTableAsync`, `AddColumnAsync`, `AlterColumnAsync`, and `DropColumnAsync`.

`DdlTable` defines the name, schema (default `dbo`), and a list of `DdlColumn` values. Each column accepts a name, SQL type, nullability, `Identity`, primary-key flag, and restricted `DefaultSql` value.

## Security

- Identifiers accept only letters, digits, and `_`, and are always delimited as SQL Server identifiers.
- Types belong to an explicit SQL Server type allowlist; client-provided SQL is never interpolated.
- Defaults only accept `NULL`, numbers, escaped string literals, and `GETDATE()`, `GETUTCDATE()`, `SYSUTCDATETIME()`, or `NEWID()`.
- Altering columns only changes type and nullability. Identity, primary key, and defaults require an explicit migration.

## HTTP

The Minimal API endpoints are under `/api/schema`: `GET /tables/{schema}/{table}` for reads, table creation/deletion, and column creation/alteration/deletion. All require the `schema.manage` permission; do not grant it to regular users.
