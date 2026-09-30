using ImPedro.Api.Auth;
using ImPedro.Storage.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/uploads")]
[RequireAuthentication]
public sealed class UploadsController : ControllerBase
{
    private readonly UploadService _uploads;
    private readonly FileExtensionContentTypeProvider _contentTypes = new();

    public UploadsController(UploadService uploads)
    {
        _uploads = uploads;
    }

    [HttpGet]
    public async Task<ActionResult> List(CancellationToken ct)
        => Ok(await _uploads.ListAsync(ct));

    [HttpPost]
    public async Task<ActionResult> Upload([FromForm] IFormFileCollection files, CancellationToken ct)
    {
        if (files.Count == 0) return BadRequest(new { error = "No files supplied." });

        try
        {
            var stored = new List<object>();
            foreach (var file in files)
            {
                await using var stream = file.OpenReadStream();
                stored.Add(await _uploads.UploadAsync(stream, file.FileName, file.ContentType, ct));
            }
            return Created("/api/uploads", stored);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{name}")]
    public async Task<ActionResult> Download(string name, CancellationToken ct)
    {
        if (!await _uploads.ExistsAsync(name, ct)) return NotFound();
        var (content, file) = await _uploads.DownloadAsync(name, ct);
        var contentType = file.ContentType;
        if (string.IsNullOrWhiteSpace(contentType)
            && !_contentTypes.TryGetContentType(file.OriginalName, out contentType))
            contentType = "application/octet-stream";
        return File(content, contentType, file.OriginalName);
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult> Delete(string name, CancellationToken ct)
    {
        if (!await _uploads.ExistsAsync(name, ct)) return NotFound();
        await _uploads.DeleteAsync(name, ct);
        return NoContent();
    }
}
