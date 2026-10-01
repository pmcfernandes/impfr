using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Data.Dtos;
using ImPedro.Data.Services;
using ImPedro.Security.Models;
using ImPedro.Security.Services;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/groups")]
[RequireAuthentication]
public sealed class GroupsController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetGroups(GroupService groups)
        => Ok((await groups.GetGroupsAsync()).Select(UserDto.FromEntity));

    [HttpGet("permissions/catalog")]
    public async Task<ActionResult> GetPermissionCatalog(PermissionService permissions)
    {
        var types = await permissions.GetTypePermissionsAsync();
        var actions = await permissions.GetPermissionsAsync();
        return Ok(
            from type in types
            from action in actions
            select new
            {
                key = $"{type.Tablename}.{action.CodPermission}",
                label = $"{type.TypePermission0 ?? type.Tablename} - {action.PermissionCaption0 ?? action.CodPermission}",
            });
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetGroup(int id, GroupService groups)
        => await groups.GetGroupAsync(id) is { } group ? Ok(UserDto.FromEntity(group)) : NotFound();

    [HttpPost]
    public async Task<ActionResult> CreateGroup(CreateGroupRequest request, GroupService groups)
    {
        try
        {
            var created = await groups.CreateGroupAsync(request.Name, request.Email, request.Description);
            return Created($"/api/groups/{created.IDUser}", UserDto.FromEntity(created));
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { error = exception.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateGroup(int id, UpdateGroupRequest request, GroupService groups)
    {
        try
        {
            await groups.RenameGroupAsync(id, request.Name, request.Description);
            return Ok(UserDto.FromEntity((await groups.GetGroupAsync(id))!));
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id:int}")]
    [RequirePermission("groups", "manage")]
    public async Task<ActionResult> DeleteGroup(int id, GroupService groups)
    {
        try
        {
            await groups.DeleteGroupAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("{id:int}/members")]
    public async Task<ActionResult> GetMembers(int id, GroupService groups)
    {
        if (await groups.GetGroupAsync(id) is null) return NotFound();
        return Ok((await groups.GetMembersAsync(id)).Select(UserDto.FromEntity));
    }

    [HttpPost("{id:int}/members/{userId:int}")]
    public async Task<ActionResult> AddMember(int id, int userId, GroupService groups)
    {
        if (await groups.GetGroupAsync(id) is null) return NotFound();
        await groups.AddMemberAsync(id, userId);
        return NoContent();
    }

    [HttpDelete("{id:int}/members/{userId:int}")]
    public async Task<ActionResult> RemoveMember(int id, int userId, GroupService groups)
    {
        if (await groups.GetGroupAsync(id) is null) return NotFound();
        await groups.RemoveMemberAsync(id, userId);
        return NoContent();
    }

    [HttpGet("{id:int}/permissions")]
    public async Task<ActionResult> GetPermissions(int id, GroupService groups)
    {
        if (await groups.GetGroupAsync(id) is null) return NotFound();
        return Ok(await groups.GetGroupPermissionsAsync(id));
    }

    [HttpPut("{id:int}/permissions")]
    [RequirePermission("groups", "manage")]
    public async Task<ActionResult> SetPermissions(int id, SetGroupPermissionsRequest request, GroupService groups)
    {
        try
        {
            await groups.SetGroupPermissionsAsync(
                id,
                request.Assignments.Select(assignment => new PermissionAssignment(assignment.TableName, assignment.PermissionCode)));
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { error = exception.Message });
        }
    }
}
