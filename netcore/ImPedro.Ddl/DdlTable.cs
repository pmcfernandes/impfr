namespace ImPedro.Ddl;

public sealed record DdlTable(string Name, IReadOnlyList<DdlColumn> Columns, string Schema = "dbo");
