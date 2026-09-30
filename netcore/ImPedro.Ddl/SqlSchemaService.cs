using System.Data;
using System.Data.Common;
using System.Text.RegularExpressions;
using ImPedro.Entity;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Ddl;

public sealed partial class SqlSchemaService : ISqlSchema
{
    private readonly FrameworkDbContext _context;

    public SqlSchemaService(FrameworkDbContext context) => _context = context;

    public async Task<bool> TableExistsAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        ValidateIdentifier(table, nameof(table));
        ValidateIdentifier(schema, nameof(schema));
        return await ScalarAsync<int>(
            "SELECT COUNT(*) FROM sys.tables t INNER JOIN sys.schemas s ON s.schema_id = t.schema_id WHERE t.name = @table AND s.name = @schema",
            [("@table", table), ("@schema", schema)], cancellationToken) > 0;
    }

    public async Task<IReadOnlyList<DdlColumn>> GetColumnsAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        ValidateIdentifier(table, nameof(table));
        ValidateIdentifier(schema, nameof(schema));
        var connection = _context.Database.GetDbConnection();
        var openedHere = connection.State == ConnectionState.Closed;
        if (openedHere) await connection.OpenAsync(cancellationToken);
        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = """
                SELECT c.name, TYPE_NAME(c.user_type_id), c.max_length, c.precision, c.scale, c.is_nullable, c.is_identity,
                       CASE WHEN pk.column_id IS NULL THEN CAST(0 AS bit) ELSE CAST(1 AS bit) END
                FROM sys.columns c
                INNER JOIN sys.tables t ON t.object_id = c.object_id
                INNER JOIN sys.schemas s ON s.schema_id = t.schema_id
                LEFT JOIN (
                    SELECT ic.object_id, ic.column_id
                    FROM sys.indexes i INNER JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
                    WHERE i.is_primary_key = 1
                ) pk ON pk.object_id = c.object_id AND pk.column_id = c.column_id
                WHERE t.name = @table AND s.name = @schema
                ORDER BY c.column_id
                """;
            Add(command, "@table", table);
            Add(command, "@schema", schema);
            await using var reader = await command.ExecuteReaderAsync(cancellationToken);
            var columns = new List<DdlColumn>();
            while (await reader.ReadAsync(cancellationToken))
            {
                var type = reader.GetString(1).ToLowerInvariant();
                var maxLength = reader.GetInt16(2);
                var precision = reader.GetByte(3);
                var scale = reader.GetByte(4);
                columns.Add(new DdlColumn(reader.GetString(0), DisplayType(type, maxLength, precision, scale), reader.GetBoolean(5), reader.GetBoolean(6), null, reader.GetBoolean(7)));
            }
            return columns;
        }
        finally
        {
            if (openedHere) await connection.CloseAsync();
        }
    }

    public async Task CreateTableAsync(DdlTable table, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(table);
        if (table.Columns is null || table.Columns.Count == 0) throw new ArgumentException("A table needs at least one column.", nameof(table));
        ValidateIdentifier(table.Name, nameof(table.Name));
        ValidateIdentifier(table.Schema, nameof(table.Schema));
        if (await TableExistsAsync(table.Name, table.Schema, cancellationToken))
            throw new InvalidOperationException($"Table '{table.Schema}.{table.Name}' already exists.");

        var names = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var definitions = table.Columns.Select(column =>
        {
            if (!names.Add(column.Name)) throw new ArgumentException($"Duplicate column '{column.Name}'.", nameof(table));
            return ColumnDefinition(column, includeDefault: true);
        }).ToList();
        var primaryKeys = table.Columns.Where(c => c.PrimaryKey).Select(c => Quote(c.Name)).ToArray();
        if (primaryKeys.Length > 0) definitions.Add($"CONSTRAINT {Quote("PK_" + table.Name)} PRIMARY KEY ({string.Join(", ", primaryKeys)})");
        await ExecuteAsync($"CREATE TABLE {Qualified(table.Schema, table.Name)} ({string.Join(", ", definitions)})", cancellationToken);
    }

    public async Task DropTableAsync(string table, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        await EnsureTableAsync(table, schema, cancellationToken);
        await ExecuteAsync($"DROP TABLE {Qualified(schema, table)}", cancellationToken);
    }

    public async Task AddColumnAsync(string table, DdlColumn column, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(column);
        await EnsureTableAsync(table, schema, cancellationToken);
        if (column.PrimaryKey) throw new ArgumentException("Adding a primary key requires an explicit migration.", nameof(column));
        await ExecuteAsync($"ALTER TABLE {Qualified(schema, table)} ADD {ColumnDefinition(column, includeDefault: true)}", cancellationToken);
    }

    public async Task AlterColumnAsync(string table, DdlColumn column, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(column);
        await EnsureTableAsync(table, schema, cancellationToken);
        if (column.Identity || column.PrimaryKey || column.DefaultSql is not null)
            throw new ArgumentException("ALTER COLUMN only supports type and nullability changes.", nameof(column));
        await ExecuteAsync($"ALTER TABLE {Qualified(schema, table)} ALTER COLUMN {ColumnDefinition(column, includeDefault: false)}", cancellationToken);
    }

    public async Task DropColumnAsync(string table, string column, string schema = "dbo", CancellationToken cancellationToken = default)
    {
        await EnsureTableAsync(table, schema, cancellationToken);
        ValidateIdentifier(column, nameof(column));
        await ExecuteAsync($"ALTER TABLE {Qualified(schema, table)} DROP COLUMN {Quote(column)}", cancellationToken);
    }

    private async Task EnsureTableAsync(string table, string schema, CancellationToken cancellationToken)
    {
        ValidateIdentifier(table, nameof(table));
        ValidateIdentifier(schema, nameof(schema));
        if (!await TableExistsAsync(table, schema, cancellationToken))
            throw new KeyNotFoundException($"Table '{schema}.{table}' was not found.");
    }

    private Task ExecuteAsync(string sql, CancellationToken cancellationToken)
        => _context.Database.ExecuteSqlRawAsync(sql, cancellationToken);

    private async Task<T> ScalarAsync<T>(string sql, IReadOnlyList<(string Name, object Value)> parameters, CancellationToken cancellationToken)
    {
        var connection = _context.Database.GetDbConnection();
        var openedHere = connection.State == ConnectionState.Closed;
        if (openedHere) await connection.OpenAsync(cancellationToken);
        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = sql;
            foreach (var parameter in parameters) Add(command, parameter.Name, parameter.Value);
            var result = await command.ExecuteScalarAsync(cancellationToken);
            if (result is null || result is DBNull) throw new InvalidOperationException("Expected a scalar SQL result.");
            return (T)Convert.ChangeType(result, typeof(T), System.Globalization.CultureInfo.InvariantCulture);
        }
        finally
        {
            if (openedHere) await connection.CloseAsync();
        }
    }

    private static void Add(DbCommand command, string name, object value)
    {
        var parameter = command.CreateParameter();
        parameter.ParameterName = name;
        parameter.Value = value;
        command.Parameters.Add(parameter);
    }

    private static string ColumnDefinition(DdlColumn column, bool includeDefault)
    {
        ValidateIdentifier(column.Name, nameof(column.Name));
        if (column.PrimaryKey && column.Nullable)
            throw new ArgumentException("A primary key column cannot be nullable.", nameof(column));
        var definition = $"{Quote(column.Name)} {ValidateType(column.Type)}";
        if (column.Identity) definition += " IDENTITY(1,1)";
        definition += column.Nullable ? " NULL" : " NOT NULL";
        if (includeDefault && column.DefaultSql is not null) definition += " DEFAULT " + ValidateDefault(column.DefaultSql);
        return definition;
    }

    private static string ValidateType(string type)
    {
        if (string.IsNullOrWhiteSpace(type) || !TypeRegex().IsMatch(type.Trim()))
            throw new ArgumentException("Unsupported SQL type.", nameof(type));
        var normalized = type.Trim().ToLowerInvariant().Replace(" ", string.Empty);
        var baseType = normalized.Split('(')[0];
        if (baseType is not ("bigint" or "binary" or "bit" or "char" or "date" or "datetime" or "datetime2" or "decimal" or "float" or "image" or "int" or "money" or "nchar" or "ntext" or "numeric" or "nvarchar" or "real" or "smalldatetime" or "smallint" or "smallmoney" or "text" or "time" or "timestamp" or "tinyint" or "uniqueidentifier" or "varbinary" or "varchar" or "xml"))
            throw new ArgumentException("Unsupported SQL type.", nameof(type));
        return normalized;
    }

    private static string ValidateDefault(string value)
    {
        var trimmed = value.Trim();
        if (!DefaultRegex().IsMatch(trimmed)) throw new ArgumentException("Unsupported default SQL expression.", nameof(value));
        return trimmed;
    }

    private static string Qualified(string schema, string table)
    {
        ValidateIdentifier(schema, nameof(schema));
        ValidateIdentifier(table, nameof(table));
        return $"{Quote(schema)}.{Quote(table)}";
    }

    private static string Quote(string identifier) => "[" + identifier.Replace("]", "]]", StringComparison.Ordinal) + "]";

    private static void ValidateIdentifier(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value) || !IdentifierRegex().IsMatch(value))
            throw new ArgumentException("Invalid SQL identifier.", parameterName);
    }

    private static string DisplayType(string type, short maxLength, byte precision, byte scale) => type switch
    {
        "varchar" or "char" or "varbinary" or "binary" => maxLength == -1 ? $"{type}(max)" : $"{type}({maxLength})",
        "nvarchar" or "nchar" => maxLength == -1 ? $"{type}(max)" : $"{type}({maxLength / 2})",
        "decimal" or "numeric" => $"{type}({precision},{scale})",
        "datetime2" or "time" => $"{type}({scale})",
        _ => type,
    };

    [GeneratedRegex("^[A-Za-z_][A-Za-z0-9_]{0,127}$")]
    private static partial Regex IdentifierRegex();

    [GeneratedRegex("^[A-Za-z]+(?:\\((?:max|[0-9]+(?:,[0-9]+)?)\\))?$")]
    private static partial Regex TypeRegex();

    [GeneratedRegex("^(?:NULL|GETDATE\\(\\)|GETUTCDATE\\(\\)|SYSUTCDATETIME\\(\\)|NEWID\\(\\)|[+-]?[0-9]+(?:\\.[0-9]+)?|'(?:''|[^'])*')$", RegexOptions.IgnoreCase)]
    private static partial Regex DefaultRegex();
}
