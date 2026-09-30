namespace ImPedro.Ddl;

public sealed record DdlColumn(
    string Name,
    string Type,
    bool Nullable = true,
    bool Identity = false,
    string? DefaultSql = null,
    bool PrimaryKey = false);
