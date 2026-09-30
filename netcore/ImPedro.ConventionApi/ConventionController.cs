using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.ConventionApi;

[ApiController]
[Route("api/services/[controller]")]
public sealed class ConventionController<TService> : ControllerBase where TService : class
{
    private readonly TService _service;
    private readonly IConventionApiAuthorizer _authorizer;

    public ConventionController(TService service, IConventionApiAuthorizer authorizer)
    {
        _service = service;
        _authorizer = authorizer;
    }

    [HttpGet("{operation}")]
    public Task<ActionResult<object?>> Get(string operation, CancellationToken cancellationToken)
        => InvokeAsync(operation, true, null, cancellationToken);

    [HttpPost("{operation}")]
    public Task<ActionResult<object?>> Post(string operation, [FromBody] JsonElement? arguments, CancellationToken cancellationToken)
        => InvokeAsync(operation, false, arguments, cancellationToken);

    private async Task<ActionResult<object?>> InvokeAsync(string operation, bool read, JsonElement? arguments, CancellationToken cancellationToken)
    {
        if (!await _authorizer.AuthorizeAsync(HttpContext, typeof(TService), operation, cancellationToken)) return Unauthorized();
        var result = await ConventionApiInvoker.InvokeAsync(_service, operation, read, arguments, Request.Query, cancellationToken);
        return Ok(result);
    }
}
