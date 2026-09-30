namespace ImPedro.Eloquent;

public sealed record Page<T>(
    IReadOnlyList<T> Items,
    int CurrentPage,
    int PageSize,
    int TotalCount)
{
    public int TotalPages => PageSize <= 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
}
