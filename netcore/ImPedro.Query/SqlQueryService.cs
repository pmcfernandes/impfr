using System.Data;
using System.Text.RegularExpressions;
using ImPedro.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Query;

public sealed partial class SqlQueryService : ISqlQuery
{
    private readonly FrameworkDbContext _context;

    public SqlQueryService(FrameworkDbContext context)
    {
        _context = context;
    }

    public Task<List<T>> QueryAsync<T>(FormattableString sql, CancellationToken cancellationToken = default)
        => _context.Database.SqlQuery<T>(sql).ToListAsync(cancellationToken);

    public Task<List<T>> QueryAsync<T>(
        string sql,
        IEnumerable<SqlParameter>? parameters = null,
        CancellationToken cancellationToken = default) where T : class
    {
        var args = parameters?.Cast<object>().ToArray() ?? Array.Empty<object>();
        if (_context.Model.FindEntityType(typeof(T))?.FindPrimaryKey() is not null)
            return _context.Set<T>().FromSqlRaw(sql, args).AsNoTracking().ToListAsync(cancellationToken);
        return _context.Database.SqlQueryRaw<T>(sql, args).ToListAsync(cancellationToken);
    }

    public async Task<T?> QueryFirstOrDefaultAsync<T>(FormattableString sql, CancellationToken cancellationToken = default)
    {
        var items = await QueryAsync<T>(sql, cancellationToken);
        return items.Count == 0 ? default : items[0];
    }

    public async Task<T> QuerySingleAsync<T>(FormattableString sql, CancellationToken cancellationToken = default)
    {
        var items = await QueryAsync<T>(sql, cancellationToken);
        return items.Count == 1
            ? items[0]
            : throw new InvalidOperationException($"Expected a single row but got {items.Count}.");
    }

    public async Task<T?> QuerySingleOrDefaultAsync<T>(FormattableString sql, CancellationToken cancellationToken = default)
    {
        var items = await QueryAsync<T>(sql, cancellationToken);
        return items.Count switch
        {
            0 => default,
            1 => items[0],
            _ => throw new InvalidOperationException($"Expected a single row but got {items.Count}."),
        };
    }

    public Task<int> ExecuteAsync(FormattableString sql, CancellationToken cancellationToken = default)
        => _context.Database.ExecuteSqlAsync(sql, cancellationToken);

    public Task<int> ExecuteAsync(
        string sql,
        IEnumerable<SqlParameter>? parameters = null,
        CancellationToken cancellationToken = default)
    {
        var args = parameters?.Cast<object>().ToArray() ?? Array.Empty<object>();
        return _context.Database.ExecuteSqlRawAsync(sql, args, cancellationToken);
    }

    public Task<List<T>> ProcedureAsync<T>(
        string procedure,
        IDictionary<string, object?>? parameters = null,
        CancellationToken cancellationToken = default) where T : class
    {
        var (commandText, sqlParameters) = BuildProcedureCall(procedure, parameters);
        return QueryAsync<T>(commandText, sqlParameters, cancellationToken);
    }

    public async Task<T?> ProcedureFirstOrDefaultAsync<T>(
        string procedure,
        IDictionary<string, object?>? parameters = null,
        CancellationToken cancellationToken = default) where T : class
    {
        var items = await ProcedureAsync<T>(procedure, parameters, cancellationToken);
        return items.Count == 0 ? default : items[0];
    }

    public Task<List<Dictionary<string, object?>>> QueryTableAsync(
        FormattableString sql,
        CancellationToken cancellationToken = default)
    {
        var (commandText, sqlParameters) = SplitFormattable(sql);
        return ExecuteTableAsync(commandText, sqlParameters, cancellationToken);
    }

    public Task<List<Dictionary<string, object?>>> QueryTableAsync(
        string sql,
        IEnumerable<SqlParameter>? parameters = null,
        CancellationToken cancellationToken = default)
        => ExecuteTableAsync(sql, (parameters ?? Enumerable.Empty<SqlParameter>()).ToArray(), cancellationToken);

    public Task<List<Dictionary<string, object?>>> ProcedureTableAsync(
        string procedure,
        IDictionary<string, object?>? parameters = null,
        CancellationToken cancellationToken = default)
    {
        var (commandText, sqlParameters) = BuildProcedureCall(procedure, parameters);
        return ExecuteTableAsync(commandText, sqlParameters, cancellationToken);
    }

    private async Task<List<Dictionary<string, object?>>> ExecuteTableAsync(
        string commandText,
        SqlParameter[] sqlParameters,
        CancellationToken cancellationToken)
    {
        var connection = _context.Database.GetDbConnection();
        var openedHere = connection.State == ConnectionState.Closed;
        if (openedHere) await connection.OpenAsync(cancellationToken);

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = commandText;
            command.CommandType = CommandType.Text;
            var timeout = _context.Database.GetCommandTimeout();
            if (timeout.HasValue) command.CommandTimeout = timeout.Value;
            foreach (var parameter in sqlParameters) command.Parameters.Add(parameter);

            await using var reader = await command.ExecuteReaderAsync(cancellationToken);
            var rows = new List<Dictionary<string, object?>>();
            while (await reader.ReadAsync(cancellationToken))
            {
                var row = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
                for (var i = 0; i < reader.FieldCount; i++)
                {
                    var value = await reader.GetFieldValueAsync<object>(i, cancellationToken);
                    row[reader.GetName(i)] = value is DBNull ? null : value;
                }
                rows.Add(row);
            }
            return rows;
        }
        finally
        {
            if (openedHere) await connection.CloseAsync();
        }
    }

    private static (string CommandText, SqlParameter[] Parameters) BuildProcedureCall(
        string procedure,
        IDictionary<string, object?>? parameters)
    {
        if (string.IsNullOrWhiteSpace(procedure) || !ProcedureNameRegex().IsMatch(procedure))
            throw new ArgumentException("Invalid procedure name.", nameof(procedure));

        if (parameters is null || parameters.Count == 0) return ($"EXEC {procedure}", Array.Empty<SqlParameter>());

        var sqlParameters = parameters
            .Select(kv => new SqlParameter(kv.Key.TrimStart('@'), kv.Value ?? DBNull.Value))
            .ToArray();
        var assignments = string.Join(", ", sqlParameters.Select(p => "@" + p.ParameterName));
        return ($"EXEC {procedure} {assignments}", sqlParameters);
    }

    private static (string CommandText, SqlParameter[] Parameters) SplitFormattable(FormattableString sql)
    {
        var text = sql.Format.Replace("{{", "\u0000").Replace("}}", "\u0001");
        var parameters = new List<SqlParameter>();
        var index = 0;
        var result = PlaceholderRegex().Replace(text, match =>
        {
            var position = int.Parse(match.Groups[1].Value, System.Globalization.CultureInfo.InvariantCulture);
            var name = "p" + index++;
            parameters.Add(new SqlParameter(name, sql.GetArgument(position) ?? DBNull.Value));
            return "@" + name;
        });
        result = result.Replace("\u0000", "{{").Replace("\u0001", "}}");
        return (result, parameters.ToArray());
    }

    [GeneratedRegex(@"^[A-Za-z_][\w\.]*$")]
    private static partial Regex ProcedureNameRegex();

    [GeneratedRegex(@"\{(\d+)(?:,[^}]*)?(?:\:[^}]*)?\}")]
    private static partial Regex PlaceholderRegex();
}
