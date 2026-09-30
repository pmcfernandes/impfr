using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class SystemService
{
    private readonly FrameworkDbContext _context;

    public SystemService(FrameworkDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetParameterAsync(string name, CancellationToken cancellationToken = default)
    {
        var parameter = await _context.MetaParameters.AsNoTracking()
            .FirstOrDefaultAsync(p => p.ParameterName == name, cancellationToken);
        return parameter?.ParameterValue;
    }

    public async Task SetParameterAsync(string name, string? value, CancellationToken cancellationToken = default)
    {
        var parameter = await _context.MetaParameters
            .FirstOrDefaultAsync(p => p.ParameterName == name, cancellationToken);
        if (parameter is null)
        {
            await _context.MetaParameters.AddAsync(
                new MetaParameter { ParameterName = name, ParameterValue = value }, cancellationToken);
        }
        else
        {
            parameter.ParameterValue = value;
        }
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> NextSequenceValueAsync(string name, CancellationToken cancellationToken = default)
    {
        var sequence = await _context.MetaSequences
            .FirstOrDefaultAsync(s => s.Name == name, cancellationToken)
            ?? throw new KeyNotFoundException($"Sequence '{name}' not found.");

        var value = sequence.CurrentValue == 0 ? sequence.InitialValue : sequence.CurrentValue;
        sequence.CurrentValue = value + 1;
        await _context.SaveChangesAsync(cancellationToken);
        return value;
    }

    public Task<List<MailServer>> GetMailServersAsync(CancellationToken cancellationToken = default)
        => _context.MailServers.AsNoTracking()
            .Where(m => !m.IsDeleted)
            .OrderBy(m => m.Name)
            .ToListAsync(cancellationToken);

    public Task<MailServer?> GetDefaultMailServerAsync(CancellationToken cancellationToken = default)
        => _context.MailServers.AsNoTracking()
            .FirstOrDefaultAsync(m => !m.IsDeleted && m.IsDefault, cancellationToken);

    public async Task<object?> GetCustomValueAsync(
        string tableName,
        int relatedId,
        string name,
        CancellationToken cancellationToken = default)
    {
        var row = await _context.CustomValues.AsNoTracking().FirstOrDefaultAsync(
            c => c.Tablename == tableName && c.IDRelatedTable == relatedId && c.Name == name,
            cancellationToken);
        return row?.Value;
    }

    public async Task SetCustomValueAsync(
        string tableName,
        int relatedId,
        string name,
        object value,
        CancellationToken cancellationToken = default)
    {
        var row = await _context.CustomValues.FirstOrDefaultAsync(
            c => c.Tablename == tableName && c.IDRelatedTable == relatedId && c.Name == name,
            cancellationToken);
        if (row is null)
        {
            await _context.CustomValues.AddAsync(
                new CustomValue { Tablename = tableName, IDRelatedTable = relatedId, Name = name, Value = value },
                cancellationToken);
        }
        else
        {
            row.Value = value;
        }
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteCustomValueAsync(
        string tableName,
        int relatedId,
        string name,
        CancellationToken cancellationToken = default)
    {
        var row = await _context.CustomValues.FirstOrDefaultAsync(
            c => c.Tablename == tableName && c.IDRelatedTable == relatedId && c.Name == name,
            cancellationToken);
        if (row is null) return;
        _context.CustomValues.Remove(row);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
