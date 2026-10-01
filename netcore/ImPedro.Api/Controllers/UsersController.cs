using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Data.Dtos;
using ImPedro.Data.Security;
using ImPedro.Data.Services;
using ImPedro.Entity.Entities;
using ImPedro.Security.Services;
using ImPedro.Storage.Services;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/users")]
[RequireAuthentication]
public sealed class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetUsers(UserService users)
        => Ok((await users.GetActiveUsersAsync()).Select(UserDto.FromEntity));

    [HttpGet("groups")]
    public async Task<ActionResult> GetGroups(UserService users)
        => Ok((await users.GetGroupsAsync()).Select(UserDto.FromEntity));

    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetUser(int id, UserService users)
        => await users.GetByIdAsync(id) is { } user ? Ok(UserDto.FromEntity(user)) : NotFound();

    [HttpPost]
    public async Task<ActionResult> CreateUser(CreateUserRequest request, UserService users, UploadService uploads, CancellationToken ct)
    {
        var user = new MetaUser
        {
            Username = request.Username.Trim(),
            Email = request.Email.Trim(),
            Password = PasswordHasher.ToMd5(request.Password),
            Fullname = request.Fullname,
            Address = request.Address,
            City = request.City,
            ZipCode = request.ZipCode,
            Phone = request.Phone,
            Mobile = request.Mobile,
            IsGroup = false,
            IsDeleted = false,
        };
        var photo = await ReadPhotoBytesAsync(uploads, request.PhotoName, ct);
        if (photo is null && !string.IsNullOrWhiteSpace(request.PhotoName))
            return BadRequest(new { error = "Photo not found." });
        user.Picture = photo;
        var created = await users.CreateAsync(user, ct);
        return Created($"/api/users/{created.IDUser}", UserDto.FromEntity(created));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateUser(int id, UpdateUserRequest request, UserService users, UploadService uploads, CancellationToken ct)
    {
        var user = await users.GetByIdAsync(id, ct);
        if (user is null) return NotFound();
        if (request.Username is not null) user.Username = request.Username;
        if (request.Fullname is not null) user.Fullname = request.Fullname;
        if (request.Email is not null) user.Email = request.Email;
        if (request.Address is not null) user.Address = request.Address;
        if (request.City is not null) user.City = request.City;
        if (request.ZipCode is not null) user.ZipCode = request.ZipCode;
        if (request.Phone is not null) user.Phone = request.Phone;
        if (request.Mobile is not null) user.Mobile = request.Mobile;
        if (request.PhotoName is not null)
        {
            var photo = await ReadPhotoBytesAsync(uploads, request.PhotoName, ct);
            if (photo is null && !string.IsNullOrWhiteSpace(request.PhotoName))
                return BadRequest(new { error = "Photo not found." });
            user.Picture = photo;
        }
        await users.UpdateAsync(user, ct);
        return Ok(UserDto.FromEntity(user));
    }

    [HttpDelete("{id:int}")]
    [RequirePermission("users", "delete")]
    public async Task<ActionResult> DeleteUser(int id, UserService users)
    {
        if (await users.GetByIdAsync(id) is null) return NotFound();
        await users.SoftDeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id:int}/password")]
    public async Task<ActionResult> SetPassword(int id, SetPasswordRequest request, UserService users)
    {
        try
        {
            await users.SetPasswordAsync(id, request.NewPassword);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("{id:int}/groups")]
    public async Task<ActionResult> GetUserGroups(int id, UserService users)
    {
        if (await users.GetByIdAsync(id) is null) return NotFound();
        return Ok((await users.GetGroupsByUserAsync(id)).Select(UserDto.FromEntity));
    }

    [HttpGet("{id:int}/permissions")]
    public async Task<ActionResult> GetUserPermissions(int id, AccessControlService access)
        => Ok(await access.GetEffectivePermissionsAsync(id));

    [HttpGet("{id:int}/photo")]
    public async Task<ActionResult> GetUserPhoto(int id, UserService users)
    {
        var user = await users.GetByIdAsync(id);
        if (user?.Picture is not { Length: > 0 }) return NotFound();
        return File(user.Picture, SniffImageContentType(user.Picture));
    }

    private static async Task<byte[]?> ReadPhotoBytesAsync(UploadService uploads, string? photoName, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(photoName)) return null;
        if (!await uploads.ExistsAsync(photoName, ct)) return null;
        var (content, _) = await uploads.DownloadAsync(photoName, ct);
        await using var _ = content;
        using var buffer = new MemoryStream();
        await content.CopyToAsync(buffer, ct);
        var bytes = buffer.ToArray();
        return bytes.Length == 0 ? null : bytes;
    }

    private static string SniffImageContentType(byte[] bytes)
    {
        if (bytes.Length >= 8
            && bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47)
            return "image/png";
        if (bytes.Length >= 3 && bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF)
            return "image/jpeg";
        if (bytes.Length >= 6 && bytes[0] == 0x47 && bytes[1] == 0x49 && bytes[2] == 0x46)
            return "image/gif";
        return "application/octet-stream";
    }
}
