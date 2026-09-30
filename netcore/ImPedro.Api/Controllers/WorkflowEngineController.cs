using ImPedro.Api.Auth;
using ImPedro.Api.Models;
using ImPedro.Security.Services;
using ImPedro.Workflow;
using ImPedro.Workflow.Models;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/workflow-engine")]
[RequireAuthentication]
public sealed class WorkflowEngineController : ControllerBase
{
    private readonly IWorkflowEngine _workflow;
    private readonly ICurrentUser _currentUser;

    public WorkflowEngineController(IWorkflowEngine workflow, ICurrentUser currentUser)
    {
        _workflow = workflow;
        _currentUser = currentUser;
    }

    [HttpPost("start")]
    public async Task<ActionResult> Start(StartWorkflowCommand command, CancellationToken cancellationToken)
    {
        var workflow = await _workflow.StartAsync(command, cancellationToken);
        return CreatedAtAction(nameof(Get), new { workflowId = workflow.IDWorkflow }, await _workflow.GetAsync(workflow.IDWorkflow, cancellationToken));
    }

    [HttpGet("{workflowId:int}")]
    public async Task<ActionResult> Get(int workflowId, CancellationToken cancellationToken)
        => await _workflow.GetAsync(workflowId, cancellationToken) is { } workflow ? Ok(workflow) : NotFound();

    [HttpPost("{workflowId:int}/tasks")]
    public async Task<ActionResult> AddTask(int workflowId, WorkflowTaskDraft task, CancellationToken cancellationToken)
    {
        var created = await _workflow.AddTaskAsync(workflowId, task, cancellationToken);
        return Created($"/api/workflow-engine/{workflowId}", created);
    }

    [HttpPut("fields/{fieldId:int}")]
    public async Task<ActionResult> SetFieldValue(int fieldId, SetWorkflowFieldValueRequest request, CancellationToken cancellationToken)
    {
        await _workflow.SetFieldValueAsync(fieldId, RequiredUserId(), request.Value, cancellationToken);
        return NoContent();
    }

    [HttpPost("tasks/{taskId:int}/complete")]
    public async Task<ActionResult> CompleteTask(int taskId, CompleteWorkflowTaskRequest request, CancellationToken cancellationToken)
    {
        await _workflow.CompleteTaskAsync(taskId, RequiredUserId(), request.Comments, request.NextState, cancellationToken);
        return NoContent();
    }

    [HttpPost("{workflowId:int}/attachments")]
    public async Task<ActionResult> AddAttachment(int workflowId, AddWorkflowAttachmentRequest request, CancellationToken cancellationToken)
        => Ok(await _workflow.AddAttachmentAsync(workflowId, request.Name, request.Filename, cancellationToken));

    [HttpGet("due")]
    public async Task<ActionResult> GetDueTasks([FromQuery] DateTime? now, CancellationToken cancellationToken)
        => Ok(await _workflow.GetDueTasksAsync((now ?? DateTime.UtcNow).ToUniversalTime(), cancellationToken));

    private int RequiredUserId() => _currentUser.UserId ?? throw new UnauthorizedAccessException();
}
