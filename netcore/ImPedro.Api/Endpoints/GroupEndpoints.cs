using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Api.Validation;
using ImPedro.Data.Dtos;
using ImPedro.Security.Models;
using ImPedro.Security.Services;

namespace ImPedro.Api.Endpoints;

public static class GroupEndpoints
{
    public static RouteGroupBuilder MapGroupEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/groups").WithTags("Groups");

        group.MapGet("/", async (GroupService groups) =>
        {
            var rows = await groups.GetGroupsAsync();
            return Results.Ok(rows.Select(UserDto.FromEntity));
        });

        group.MapGet("/{id:int}", async (int id, GroupService groups) =>
        {
            var row = await groups.GetGroupAsync(id);
            return row is null ? Results.NotFound() : Results.Ok(UserDto.FromEntity(row));
        });

        group.MapPost("/", async (CreateGroupRequest request, GroupService groups) =>
        {
            try
            {
                var created = await groups.CreateGroupAsync(request.Name, request.Email, request.Description);
                return Results.Created($"/api/groups/{created.IDUser}", UserDto.FromEntity(created));
            }
            catch (InvalidOperationException ex)
            {
                return Results.Conflict(new { error = ex.Message });
            }
        }).AddEndpointFilter(RequireAuthFilter.Invoke).Validate<CreateGroupRequest>();

        group.MapPut("/{id:int}", async (int id, UpdateGroupRequest request, GroupService groups) =>
        {
            try
            {
                await groups.RenameGroupAsync(id, request.Name, request.Description);
                var row = await groups.GetGroupAsync(id);
                return Results.Ok(UserDto.FromEntity(row!));
            }
            catch (KeyNotFoundException)
            {
                return Results.NotFound();
            }
        }).AddEndpointFilter(RequireAuthFilter.Invoke);

        group.MapDelete("/{id:int}", async (int id, GroupService groups) =>
        {
            try
            {
                await groups.DeleteGroupAsync(id);
                return Results.NoContent();
            }
            catch (KeyNotFoundException)
            {
                return Results.NotFound();
            }
        }).AddEndpointFilter(RequirePermissionFilter.For("groups", "manage"));

        group.MapGet("/{id:int}/members", async (int id, GroupService groups) =>
        {
            if (await groups.GetGroupAsync(id) is null) return Results.NotFound();
            var rows = await groups.GetMembersAsync(id);
            return Results.Ok(rows.Select(UserDto.FromEntity));
        });

        group.MapPost("/{id:int}/members/{userId:int}", async (int id, int userId, GroupService groups) =>
        {
            if (await groups.GetGroupAsync(id) is null) return Results.NotFound();
            await groups.AddMemberAsync(id, userId);
            return Results.NoContent();
        }).AddEndpointFilter(RequireAuthFilter.Invoke);

        group.MapDelete("/{id:int}/members/{userId:int}", async (int id, int userId, GroupService groups) =>
        {
            if (await groups.GetGroupAsync(id) is null) return Results.NotFound();
            await groups.RemoveMemberAsync(id, userId);
            return Results.NoContent();
        }).AddEndpointFilter(RequireAuthFilter.Invoke);

        group.MapGet("/{id:int}/permissions", async (int id, GroupService groups) =>
        {
            if (await groups.GetGroupAsync(id) is null) return Results.NotFound();
            return Results.Ok(await groups.GetGroupPermissionsAsync(id));
        });

        group.MapPut("/{id:int}/permissions", async (int id, SetGroupPermissionsRequest request, GroupService groups) =>
        {
            try
            {
                await groups.SetGroupPermissionsAsync(
                    id,
                    request.Assignments.Select(a => new PermissionAssignment(a.TableName, a.PermissionCode)));
                return Results.NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return Results.NotFound(new { error = ex.Message });
            }
        }).AddEndpointFilter(RequirePermissionFilter.For("groups", "manage")).Validate<SetGroupPermissionsRequest>();

        return group;
    }
}
