using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Data.Services;
using ImPedro.Entity.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/workflows")]
[RequireAuthentication]
public sealed class WorkflowController : ControllerBase
{
    private readonly WorkflowService _workflows;

    public WorkflowController(WorkflowService workflows)
    {
        _workflows = workflows;
    }

    [HttpGet("definitions")]
    public async Task<ActionResult> GetDefinitions([FromQuery] bool activeOnly = true, CancellationToken ct = default)
        => Ok(await _workflows.GetDefinitionsAsync(activeOnly, ct));

    [HttpPost("start/{definitionId:int}")]
    public async Task<ActionResult> Start(int definitionId, CancellationToken ct)
        => Ok(await _workflows.StartWorkflowAsync(definitionId, ct));

    [HttpGet("tasks")]
    public async Task<ActionResult> GetTasks(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20,
        [FromQuery] int? userId = null, [FromQuery] int? workflowId = null,
        [FromQuery] bool? finished = null,
        CancellationToken ct = default)
        => Ok(await _workflows.GetTasksAsync(page, pageSize, userId, workflowId, finished, ct));

    [HttpGet("tasks/{id:int}")]
    public async Task<ActionResult> GetTask(int id, CancellationToken ct)
        => await _workflows.GetTaskAsync(id, ct) is { } task ? Ok(task) : NotFound();

    [HttpPost("tasks")]
    public async Task<ActionResult> CreateTask(CreateTaskRequest request, CancellationToken ct)
    {
        var created = await _workflows.CreateTaskAsync(new WorkflowTask
        {
            IDWorkflow = request.WorkflowId,
            Task = request.Task,
            IDUser = request.UserId,
            Name = request.Name,
            Subject = request.Subject,
            Comments = request.Comments,
            IDWorkflowDefinition = request.WorkflowDefinitionId,
            ExpirationDate = request.ExpirationDate,
        }, ct);
        return Created($"/api/workflows/tasks/{created.IDWorkflowTask}", created);
    }

    [HttpPost("tasks/{id:int}/finish")]
    public async Task<ActionResult> FinishTask(int id, FinishTaskRequest request, CancellationToken ct)
    {
        var userId = HttpContext.RequestServices
            .GetRequiredService<ImPedro.Security.Services.ICurrentUser>().UserId ?? 0;
        try
        {
            await _workflows.FinishTaskAsync(id, userId, request.Comments, request.FromState, request.ToState, ct);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("tasks/{id:int}/fields")]
    public async Task<ActionResult> GetTaskFields(int id, CancellationToken ct)
        => Ok(await _workflows.GetTaskFieldsAsync(id, ct));

    [HttpPut("fields/{fieldId:int}")]
    public async Task<ActionResult> SaveField(int fieldId, SaveFieldValueRequest request, CancellationToken ct)
    {
        try
        {
            await _workflows.SaveTaskFieldAsync(fieldId, request.Value, ct);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("workflows/{workflowId:int}/attachments")]
    public async Task<ActionResult> GetAttachments(int workflowId, CancellationToken ct)
        => Ok(await _workflows.GetAttachmentsAsync(workflowId, ct));

    [HttpPost("workflows/{workflowId:int}/attachments")]
    public async Task<ActionResult> AddAttachment(int workflowId, AddAttachmentRequest request, CancellationToken ct)
        => Ok(await _workflows.AddAttachmentAsync(workflowId, request.Name, request.Filename, ct));

    [HttpGet("tasks/{id:int}/history")]
    public async Task<ActionResult> GetHistory(int id, CancellationToken ct)
        => Ok(await _workflows.GetHistoryAsync(id, ct));
}
