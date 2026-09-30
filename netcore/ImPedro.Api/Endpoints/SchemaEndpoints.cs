using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Ddl;

namespace ImPedro.Api.Endpoints;

public static class SchemaEndpoints
{
    public static RouteGroupBuilder MapSchemaEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/schema").WithTags("Schema");
        var manage = RequirePermissionFilter.For("schema", "manage");

        group.MapGet("/tables/{schema}/{table}", async (string schema, string table, ISqlSchema ddl) =>
            Results.Ok(await ddl.GetColumnsAsync(table, schema))).AddEndpointFilter(manage);

        group.MapPost("/tables", async (CreateTableRequest request, ISqlSchema ddl) =>
        {
            await ddl.CreateTableAsync(new DdlTable(request.Name, request.Columns, request.Schema));
            return Results.Created($"/api/schema/tables/{request.Schema}/{request.Name}", null);
        }).AddEndpointFilter(manage);

        group.MapDelete("/tables", async (TableRequest request, ISqlSchema ddl) =>
        {
            await ddl.DropTableAsync(request.Name, request.Schema);
            return Results.NoContent();
        }).AddEndpointFilter(manage);

        group.MapPost("/columns", async (ColumnRequest request, ISqlSchema ddl) =>
        {
            await ddl.AddColumnAsync(request.Table, request.Column, request.Schema);
            return Results.NoContent();
        }).AddEndpointFilter(manage);

        group.MapPut("/columns", async (ColumnRequest request, ISqlSchema ddl) =>
        {
            await ddl.AlterColumnAsync(request.Table, request.Column, request.Schema);
            return Results.NoContent();
        }).AddEndpointFilter(manage);

        group.MapDelete("/columns", async (DropColumnRequest request, ISqlSchema ddl) =>
        {
            await ddl.DropColumnAsync(request.Table, request.Column, request.Schema);
            return Results.NoContent();
        }).AddEndpointFilter(manage);

        return group;
    }
}
