namespace ImPedro.Ddl;

public interface ISqlSchema
{
    Task<bool> TableExistsAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default);
    Task<IReadOnlyList<DdlColumn>> GetColumnsAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default);
    Task CreateTableAsync(DdlTable table, CancellationToken cancellationToken = default);
    Task DropTableAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default);
    Task AddColumnAsync(string table, DdlColumn column, string schema = "dbo", CancellationToken cancellationToken = default);
    Task AlterColumnAsync(string table, DdlColumn column, string schema = "dbo", CancellationToken cancellationToken = default);
    Task DropColumnAsync(string table, string column, string schema = "dbo", CancellationToken cancellationToken = default);
}
