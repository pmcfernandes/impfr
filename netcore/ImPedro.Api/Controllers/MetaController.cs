using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/meta")]
[RequireAuthentication]
public sealed class MetaController : ControllerBase
{
    private readonly MetaService _meta;
    private readonly SystemService _system;
    private readonly AuditService _audit;

    public MetaController(MetaService meta, SystemService system, AuditService audit)
    {
        _meta = meta;
        _system = system;
        _audit = audit;
    }

    [HttpGet("tables")]
    public async Task<ActionResult> GetTables([FromQuery] int? applicationId, CancellationToken ct)
        => Ok(await _meta.GetTablesAsync(applicationId, ct));

    [HttpGet("tables/{id:int}")]
    public async Task<ActionResult> GetTable(int id, CancellationToken ct)
        => await _meta.GetTableAsync(id, ct) is { } table ? Ok(table) : NotFound();

    [HttpGet("tables/by-name/{name}")]
    public async Task<ActionResult> GetTableByName(string name, CancellationToken ct)
        => await _meta.GetTableByNameAsync(name, ct) is { } table ? Ok(table) : NotFound();

    [HttpGet("tables/{id:int}/fields")]
    public async Task<ActionResult> GetFields(int id, CancellationToken ct)
        => Ok(await _meta.GetFieldsAsync(id, ct));

    [HttpGet("parameters/{name}")]
    public async Task<ActionResult> GetParameter(string name, CancellationToken ct)
    {
        var value = await _system.GetParameterAsync(name, ct);
        return value is null ? NotFound() : Ok(new { name, value });
    }

    [HttpPut("parameters/{name}")]
    public async Task<ActionResult> SetParameter(string name, SetParameterRequest request, CancellationToken ct)
    {
        await _system.SetParameterAsync(name, request.Value, ct);
        return NoContent();
    }

    [HttpPost("sequences/{name}/next")]
    public async Task<ActionResult> NextSequence(string name, CancellationToken ct)
    {
        try
        {
            return Ok(new { name, value = await _system.NextSequenceValueAsync(name, ct) });
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("applications")]
    public async Task<ActionResult> GetApplications(CancellationToken ct)
        => Ok(await _meta.GetApplicationsAsync(ct));

    [HttpGet("modules")]
    public async Task<ActionResult> GetModules([FromQuery] int? applicationId, CancellationToken ct)
        => Ok(await _meta.GetModulesAsync(applicationId, ct));

    [HttpGet("menus")]
    public async Task<ActionResult> GetMenus(CancellationToken ct)
        => Ok(await _meta.GetMenuItemsAsync(ct));

    [HttpGet("contexts")]
    public async Task<ActionResult> GetContexts([FromQuery] int? moduleId, CancellationToken ct)
        => Ok(await _meta.GetContextsAsync(moduleId, ct));

    [HttpGet("reports")]
    public async Task<ActionResult> GetReports([FromQuery] int? categoryId, CancellationToken ct)
        => Ok(await _meta.GetReportsAsync(categoryId, ct));

    [HttpGet("reports/{id:int}/parameters")]
    public async Task<ActionResult> GetReportParameters(int id, CancellationToken ct)
        => Ok(await _meta.GetReportParametersAsync(id, ct));

    [HttpGet("report-categories")]
    public async Task<ActionResult> GetReportCategories(CancellationToken ct)
        => Ok(await _meta.GetReportCategoriesAsync(ct));

    [HttpGet("report-views")]
    public async Task<ActionResult> GetReportViews(CancellationToken ct)
        => Ok(await _meta.GetReportViewsAsync(ct));

    [HttpGet("graphs")]
    public async Task<ActionResult> GetGraphs([FromQuery] int? applicationId, CancellationToken ct)
        => Ok(await _meta.GetGraphsAsync(applicationId, true, ct));

    [HttpGet("graphs/{id:int}/searches")]
    public async Task<ActionResult> GetGraphSearches(int id, CancellationToken ct)
        => Ok(await _meta.GetGraphSearchesAsync(id, ct));

    [HttpGet("dashboards")]
    public async Task<ActionResult> GetDashboards([FromQuery] int? applicationId, CancellationToken ct)
        => Ok(await _meta.GetDashboardsAsync(applicationId, ct));

    [HttpGet("scripts")]
    public async Task<ActionResult> GetScripts(CancellationToken ct)
        => Ok(await _meta.GetScriptsAsync(true, ct));

    [HttpGet("appointments")]
    public async Task<ActionResult> GetAppointments(
        [FromQuery] int? userId, [FromQuery] DateTime? from, [FromQuery] DateTime? to, CancellationToken ct)
        => Ok(await _meta.GetAppointmentsAsync(userId, from, to, ct));

    [HttpGet("scheduler-resources")]
    public async Task<ActionResult> GetSchedulerResources(CancellationToken ct)
        => Ok(await _meta.GetSchedulerResourcesAsync(ct));

    [HttpGet("mail-servers")]
    public async Task<ActionResult> GetMailServers(CancellationToken ct)
        => Ok(await _system.GetMailServersAsync(ct));

    [HttpGet("mail-servers/default")]
    public async Task<ActionResult> GetDefaultMailServer(CancellationToken ct)
    {
        var server = await _system.GetDefaultMailServerAsync(ct);
        return server is null ? NotFound() : Ok(server);
    }

    [HttpGet("custom-values")]
    public async Task<ActionResult> GetCustomValue(
        [FromQuery] string tableName, [FromQuery] int relatedId, [FromQuery] string name, CancellationToken ct)
    {
        var value = await _system.GetCustomValueAsync(tableName, relatedId, name, ct);
        return value is null ? NotFound() : Ok(new { tableName, relatedId, name, value });
    }

    [HttpPut("custom-values")]
    public async Task<ActionResult> SetCustomValue(SetCustomValueRequest request, CancellationToken ct)
    {
        var value = Helpers.JsonValues.ToClr(request.Value);
        if (value is null) return BadRequest(new { error = "Null values are not supported." });
        await _system.SetCustomValueAsync(request.TableName, request.RelatedId, request.Name, value, ct);
        return NoContent();
    }

    [HttpDelete("custom-values")]
    public async Task<ActionResult> DeleteCustomValue(
        [FromQuery] string tableName, [FromQuery] int relatedId, [FromQuery] string name, CancellationToken ct)
    {
        await _system.DeleteCustomValueAsync(tableName, relatedId, name, ct);
        return NoContent();
    }

    [HttpGet("audits/tables")]
    public async Task<ActionResult> GetTableAudits(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20,
        [FromQuery] int? userId = null, [FromQuery] int? tableId = null,
        [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null,
        CancellationToken ct = default)
        => Ok(await _audit.GetTableAuditsAsync(page, pageSize, userId, tableId, from, to, ct));

    [HttpGet("audits/fields")]
    public async Task<ActionResult> GetFieldAudits(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20,
        [FromQuery] int? tableId = null, [FromQuery] int? fieldId = null,
        [FromQuery] int? relatedFieldId = null,
        CancellationToken ct = default)
        => Ok(await _audit.GetFieldAuditsAsync(page, pageSize, tableId, fieldId, relatedFieldId, ct));
}
