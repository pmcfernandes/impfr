using Microsoft.Data.SqlClient;

namespace ImPedro.Query;

public interface ISqlQuery
{
    Task<List<T>> QueryAsync<T>(FormattableString sql, CancellationToken cancellationToken = default);
    Task<List<T>> QueryAsync<T>(string sql, IEnumerable<SqlParameter>? parameters = null, CancellationToken cancellationToken = default) where T : class;
    Task<T?> QueryFirstOrDefaultAsync<T>(FormattableString sql, CancellationToken cancellationToken = default);
    Task<T> QuerySingleAsync<T>(FormattableString sql, CancellationToken cancellationToken = default);
    Task<T?> QuerySingleOrDefaultAsync<T>(FormattableString sql, CancellationToken cancellationToken = default);
    Task<int> ExecuteAsync(FormattableString sql, CancellationToken cancellationToken = default);
    Task<int> ExecuteAsync(string sql, IEnumerable<SqlParameter>? parameters = null, CancellationToken cancellationToken = default);
    Task<List<T>> ProcedureAsync<T>(
        string procedure,
        IDictionary<string, object?>? parameters = null,
        CancellationToken cancellationToken = default) where T : class;
    Task<T?> ProcedureFirstOrDefaultAsync<T>(
        string procedure,
        IDictionary<string, object?>? parameters = null,
        CancellationToken cancellationToken = default) where T : class;
    Task<List<Dictionary<string, object?>>> QueryTableAsync(FormattableString sql, CancellationToken cancellationToken = default);
    Task<List<Dictionary<string, object?>>> QueryTableAsync(string sql, IEnumerable<SqlParameter>? parameters = null, CancellationToken cancellationToken = default);
    Task<List<Dictionary<string, object?>>> ProcedureTableAsync(string procedure, IDictionary<string, object?>? parameters = null, CancellationToken cancellationToken = default);
}
