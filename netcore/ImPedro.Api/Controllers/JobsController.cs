using Hangfire;
using Hangfire.Storage;
using ImPedro.Api.Auth;
using ImPedro.Jobs.Jobs;
using Microsoft.AspNetCore.Mvc;

namespace ImPedro.Api.Controllers;

[ApiController]
[Route("api/jobs")]
[RequireAuthentication]
public sealed class JobsController : ControllerBase
{
    private readonly IBackgroundJobClient _background;
    private readonly JobStorage _storage;

    public JobsController(IBackgroundJobClient background, JobStorage storage)
    {
        _background = background;
        _storage = storage;
    }

    [HttpGet("recurring")]
    public ActionResult GetRecurring()
    {
        using var connection = _storage.GetConnection();
        var jobs = connection.GetRecurringJobs().Select(job => new
        {
            job.Id,
            job.Cron,
            job.NextExecution,
            job.LastExecution,
            job.LastJobState,
            job.Error,
        });
        return Ok(jobs);
    }

    [HttpPost("trigger/{jobName}")]
    [RequirePermission("jobs", "execute")]
    public ActionResult Trigger(string jobName)
    {
        RecurringJob.TriggerJob(jobName);
        return Accepted(new { jobName });
    }

    [HttpPost("run/temp-cleanup")]
    [RequirePermission("jobs", "execute")]
    public ActionResult RunTempCleanup()
    {
        var jobId = _background.Enqueue<TempCleanupJob>(job => job.ExecuteAsync(JobCancellationToken.Null));
        return Accepted(new { jobId });
    }
}
