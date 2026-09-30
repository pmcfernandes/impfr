namespace ImPedro.Query.Mapping;

public interface IMapper
{
    T Map<T>(IDictionary<string, object?> row) where T : new();
    List<T> MapList<T>(IEnumerable<IDictionary<string, object?>> rows) where T : new();
    void MapTo<T>(IDictionary<string, object?> row, T destination);
}
