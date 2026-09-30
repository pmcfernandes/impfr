using ImPedro.Entity;
using ImPedro.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImPedro.Data.Services;

public sealed class MetaService
{
    private readonly FrameworkDbContext _context;

    public MetaService(FrameworkDbContext context)
    {
        _context = context;
    }

    public Task<MetaTable?> GetTableAsync(int id, CancellationToken cancellationToken = default)
        => _context.MetaTables.AsNoTracking().FirstOrDefaultAsync(t => t.IDTable == id, cancellationToken);

    public Task<MetaTable?> GetTableByNameAsync(string tableName, CancellationToken cancellationToken = default)
        => _context.MetaTables.AsNoTracking().FirstOrDefaultAsync(t => t.Tablename == tableName, cancellationToken);

    public Task<List<MetaTable>> GetTablesAsync(int? applicationId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaTables.AsNoTracking().AsQueryable();
        if (applicationId.HasValue) query = query.Where(t => t.IDApplication == applicationId.Value);
        return query.OrderBy(t => t.Tablename).ToListAsync(cancellationToken);
    }

    public Task<List<MetaField>> GetFieldsAsync(int tableId, CancellationToken cancellationToken = default)
        => _context.MetaFields.AsNoTracking()
            .Where(f => f.IDTable == tableId)
            .OrderBy(f => f.IDField)
            .ToListAsync(cancellationToken);

    public async Task<List<MetaField>> GetFieldsByTableNameAsync(string tableName, CancellationToken cancellationToken = default)
    {
        var table = await GetTableByNameAsync(tableName, cancellationToken);
        if (table is null) return new List<MetaField>();
        return await GetFieldsAsync(table.IDTable, cancellationToken);
    }

    public Task<List<MetaApplication>> GetApplicationsAsync(CancellationToken cancellationToken = default)
        => _context.MetaApplications.AsNoTracking().OrderBy(a => a.Application).ToListAsync(cancellationToken);

    public Task<List<MetaModule>> GetModulesAsync(int? applicationId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaModules.AsNoTracking().AsQueryable();
        if (applicationId.HasValue) query = query.Where(m => m.IDApplication == applicationId.Value);
        return query.OrderBy(m => m.ItemOrder).ThenBy(m => m.ModuleCaption0).ToListAsync(cancellationToken);
    }

    public Task<List<MetaMenuItem>> GetMenuItemsAsync(CancellationToken cancellationToken = default)
        => _context.MetaMenuItems.AsNoTracking()
            .Where(m => m.Visible)
            .OrderBy(m => m.ItemOrder)
            .ToListAsync(cancellationToken);

    public Task<List<MetaContext>> GetContextsAsync(int? moduleId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaContexts.AsNoTracking().Where(c => c.Visible).AsQueryable();
        if (moduleId.HasValue) query = query.Where(c => c.IDModule == moduleId.Value);
        return query.OrderBy(c => c.ItemOrder).ToListAsync(cancellationToken);
    }

    public Task<List<MetaReport>> GetReportsAsync(int? categoryId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaReports.AsNoTracking().AsQueryable();
        if (categoryId.HasValue) query = query.Where(r => r.IDReportCategory == categoryId.Value);
        return query.OrderBy(r => r.ReportName).ToListAsync(cancellationToken);
    }

    public Task<List<MetaReportParameter>> GetReportParametersAsync(int reportId, CancellationToken cancellationToken = default)
        => _context.MetaReportParameters.AsNoTracking()
            .Where(p => p.IDReport == reportId)
            .OrderBy(p => p.IDParameter)
            .ToListAsync(cancellationToken);

    public Task<List<MetaReportCategory>> GetReportCategoriesAsync(CancellationToken cancellationToken = default)
        => _context.MetaReportCategories.AsNoTracking().OrderBy(c => c.Name).ToListAsync(cancellationToken);

    public Task<List<MetaReportView>> GetReportViewsAsync(CancellationToken cancellationToken = default)
        => _context.MetaReportViews.AsNoTracking().OrderBy(v => v.Name).ToListAsync(cancellationToken);

    public Task<List<MetaGraph>> GetGraphsAsync(int? applicationId = null, bool enabledOnly = true, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaGraphs.AsNoTracking().AsQueryable();
        if (applicationId.HasValue) query = query.Where(g => g.IDApplication == applicationId.Value);
        if (enabledOnly) query = query.Where(g => g.Enabled);
        return query.OrderBy(g => g.GraphName).ToListAsync(cancellationToken);
    }

    public Task<List<MetaGraphSearch>> GetGraphSearchesAsync(int graphId, CancellationToken cancellationToken = default)
        => _context.MetaGraphSearches.AsNoTracking()
            .Where(s => s.IDGraph == graphId)
            .OrderBy(s => s.ItemOrder)
            .ToListAsync(cancellationToken);

    public Task<List<MetaDashboard>> GetDashboardsAsync(int? applicationId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaDashboards.AsNoTracking().AsQueryable();
        if (applicationId.HasValue) query = query.Where(d => d.IDApplication == applicationId.Value);
        return query.OrderBy(d => d.Name).ToListAsync(cancellationToken);
    }

    public Task<List<MetaScript>> GetScriptsAsync(bool enabledOnly = true, CancellationToken cancellationToken = default)
    {
        var query = _context.MetaScripts.AsNoTracking().AsQueryable();
        if (enabledOnly) query = query.Where(s => s.Enabled);
        return query.OrderBy(s => s.Name).ToListAsync(cancellationToken);
    }

    public Task<List<MetaDayView>> GetAppointmentsAsync(
        int? userId = null,
        DateTime? from = null,
        DateTime? to = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.MetaDayView.AsNoTracking().Where(a => !a.IsDeleted).AsQueryable();
        if (userId.HasValue) query = query.Where(a => a.IDUser == userId.Value);
        if (from.HasValue) query = query.Where(a => a.EndDateTime >= from.Value);
        if (to.HasValue) query = query.Where(a => a.BeginDateTime <= to.Value);
        return query.OrderBy(a => a.BeginDateTime).ToListAsync(cancellationToken);
    }

    public async Task<MetaDayView> SaveAppointmentAsync(MetaDayView appointment, CancellationToken cancellationToken = default)
    {
        if (appointment.IDDayView == 0) await _context.MetaDayView.AddAsync(appointment, cancellationToken);
        else _context.MetaDayView.Update(appointment);
        await _context.SaveChangesAsync(cancellationToken);
        return appointment;
    }

    public Task<List<ResourcesScheduler>> GetSchedulerResourcesAsync(CancellationToken cancellationToken = default)
        => _context.ResourcesScheduler.AsNoTracking().OrderBy(r => r.ResourceName).ToListAsync(cancellationToken);
}
