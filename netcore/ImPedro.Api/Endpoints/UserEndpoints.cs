using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Api.Validation;
using ImPedro.Data.Dtos;
using ImPedro.Data.Security;
using ImPedro.Data.Services;
using ImPedro.Entity.Entities;
using ImPedro.Security.Services;

namespace ImPedro.Api.Endpoints;

public static class UserEndpoints
{
    public static RouteGroupBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/users").WithTags("Users");

        group.MapGet("/", async (UserService users) =>
        {
            var rows = await users.GetActiveUsersAsync();
            return Results.Ok(rows.Select(UserDto.FromEntity));
        });

        group.MapGet("/groups", async (UserService users) =>
        {
            var rows = await users.GetGroupsAsync();
            return Results.Ok(rows.Select(UserDto.FromEntity));
        });

        group.MapGet("/{id:int}", async (int id, UserService users) =>
        {
            var user = await users.GetByIdAsync(id);
            return user is null ? Results.NotFound() : Results.Ok(UserDto.FromEntity(user));
        });

        group.MapPost("/", async (CreateUserRequest request, UserService users) =>
        {
            var user = new MetaUser
            {
                Username = request.Username.Trim(),
                Email = request.Email.Trim(),
                Password = PasswordHasher.ToMd5(request.Password),
                Fullname = request.Fullname,
                IsGroup = false,
                IsDeleted = false,
            };
            var created = await users.CreateAsync(user);
            return Results.Created($"/api/users/{created.IDUser}", UserDto.FromEntity(created));
        }).AddEndpointFilter(RequireAuthFilter.Invoke).Validate<CreateUserRequest>();

        group.MapPut("/{id:int}", async (int id, UpdateUserRequest request, UserService users) =>
        {
            var user = await users.GetByIdAsync(id);
            if (user is null) return Results.NotFound();
            if (request.Username is not null) user.Username = request.Username;
            if (request.Fullname is not null) user.Fullname = request.Fullname;
            if (request.Email is not null) user.Email = request.Email;
            await users.UpdateAsync(user);
            return Results.Ok(UserDto.FromEntity(user));
        }).AddEndpointFilter(RequireAuthFilter.Invoke).Validate<UpdateUserRequest>();

        group.MapDelete("/{id:int}", async (int id, UserService users) =>
        {
            var user = await users.GetByIdAsync(id);
            if (user is null) return Results.NotFound();
            await users.SoftDeleteAsync(id);
            return Results.NoContent();
        }).AddEndpointFilter(RequirePermissionFilter.For("users", "delete"));

        group.MapPost("/{id:int}/password", async (int id, SetPasswordRequest request, UserService users) =>
        {
            try
            {
                await users.SetPasswordAsync(id, request.NewPassword);
                return Results.NoContent();
            }
            catch (KeyNotFoundException)
            {
                return Results.NotFound();
            }
        }).AddEndpointFilter(RequireAuthFilter.Invoke).Validate<SetPasswordRequest>();

        group.MapGet("/{id:int}/groups", async (int id, UserService users) =>
        {
            var user = await users.GetByIdAsync(id);
            if (user is null) return Results.NotFound();
            var rows = await users.GetGroupsByUserAsync(id);
            return Results.Ok(rows.Select(UserDto.FromEntity));
        });

        group.MapGet("/{id:int}/permissions", async (int id, AccessControlService access) =>
            Results.Ok(await access.GetEffectivePermissionsAsync(id)));

        return group;
    }
}
