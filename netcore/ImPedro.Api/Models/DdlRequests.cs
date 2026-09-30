using ImPedro.Ddl;

namespace ImPedro.Api.Models;

public sealed record CreateTableRequest(string Name, IReadOnlyList<DdlColumn> Columns, string Schema = "dbo");
public sealed record TableRequest(string Name, string Schema = "dbo");
public sealed record ColumnRequest(string Table, DdlColumn Column, string Schema = "dbo");
public sealed record DropColumnRequest(string Table, string Column, string Schema = "dbo");
