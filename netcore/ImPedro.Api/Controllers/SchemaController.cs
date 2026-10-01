using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Ddl;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/schema")]
[RequirePermission("schema", "manage")]
public sealed class SchemaController : ControllerBase
{
    [HttpGet("tables/{schema}/{table}")]
    public async Task<ActionResult> GetColumns(string schema, string table, ISqlSchema ddl)
        => Ok(await ddl.GetColumnsAsync(table, schema));

    [HttpPost("tables")]
    public async Task<ActionResult> CreateTable(CreateTableRequest request, ISqlSchema ddl)
    {
        await ddl.CreateTableAsync(new DdlTable(request.Name, request.Columns, request.Schema));
        return Created($"/api/schema/tables/{request.Schema}/{request.Name}", null);
    }

    [HttpDelete("tables")]
    public async Task<ActionResult> DropTable(TableRequest request, ISqlSchema ddl)
    {
        await ddl.DropTableAsync(request.Name, request.Schema);
        return NoContent();
    }

    [HttpPost("columns")]
    public async Task<ActionResult> AddColumn(ColumnRequest request, ISqlSchema ddl)
    {
        await ddl.AddColumnAsync(request.Table, request.Column, request.Schema);
        return NoContent();
    }

    [HttpPut("columns")]
    public async Task<ActionResult> AlterColumn(ColumnRequest request, ISqlSchema ddl)
    {
        await ddl.AlterColumnAsync(request.Table, request.Column, request.Schema);
        return NoContent();
    }

    [HttpDelete("columns")]
    public async Task<ActionResult> DropColumn(DropColumnRequest request, ISqlSchema ddl)
    {
        await ddl.DropColumnAsync(request.Table, request.Column, request.Schema);
        return NoContent();
    }
}
