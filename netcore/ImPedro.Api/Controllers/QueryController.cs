using ImPedro.Api.Auth;
using ImPedro.Api.Helpers;
using ImPedro.Api.Models;
using ImPedro.Data.Services;
using ImPedro.Query;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/query")]
[RequireAuthentication]
public sealed class QueryController : ControllerBase
{
    private readonly ISqlQuery _query;
    private readonly MetaService _meta;

    public QueryController(ISqlQuery query, MetaService meta)
    {
        _query = query;
        _meta = meta;
    }

    [HttpPost("procedure/{name}")]
    [RequirePermission("query", "execute")]
    public async Task<ActionResult> ExecuteProcedure(string name, ProcedureRequest request, CancellationToken ct)
    {
        try
        {
            var rows = await _query.ProcedureTableAsync(name, JsonValues.ToDictionary(request.Parameters), ct);
            return Ok(rows);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("graph/{id:int}")]
    [RequirePermission("query", "execute")]
    public async Task<ActionResult> ExecuteGraph(int id, CancellationToken ct)
    {
        var graphs = await _meta.GetGraphsAsync(null, false, ct);
        var graph = graphs.FirstOrDefault(g => g.IDGraph == id);
        if (graph is null) return NotFound();
        if (string.IsNullOrWhiteSpace(graph.SQLSyntax)) return BadRequest(new { error = "Graph has no SQL." });
        var rows = await _query.QueryTableAsync(graph.SQLSyntax, null, ct);
        return Ok(rows);
    }
}
