# ImPedro.Workflow

Orchestration layer over `Workflow`, `WorkflowDefinition`, `WorkflowTask`, `WorkflowField`, `WorkflowHistory`, and `WorkflowAttachment`. It does not replace `ImPedro.Data.Services.WorkflowService`, which retains legacy queries and endpoints.

## Lifecycle

1. `StartAsync(StartWorkflowCommand)` validates an active definition, creates the instance, and can create initial tasks.
2. `AddTaskAsync` creates a task for a user, with configurable fields (`Required`, `ReadOnly`, `EditorType`).
3. `SetFieldValueAsync` only permits changes by the assigned user while the task is open.
4. `CompleteTaskAsync` validates required fields, marks the task complete, writes `WorkflowHistory`, and automatically closes the instance when no open tasks remain.
5. `AddAttachmentAsync` associates attachment metadata with an open instance. `GetDueTasksAsync` returns open tasks whose expiration has passed.

Timestamps are recorded in UTC. The legacy schema has no state/transition definition table; history `State1` and `State2` record `Open` and the supplied destination state, or `Completed` by default.

## HTTP

`WorkflowEngineController` exposes:

- `POST /api/workflow-engine/start`
- `GET /api/workflow-engine/{workflowId}`
- `POST /api/workflow-engine/{workflowId}/tasks`
- `PUT /api/workflow-engine/fields/{fieldId}`
- `POST /api/workflow-engine/tasks/{taskId}/complete`
- `POST /api/workflow-engine/{workflowId}/attachments`
- `GET /api/workflow-engine/due?now=...`

All endpoints require authentication. Updating fields and completing tasks also require the current user to be the assigned user (`WorkflowTask.IDUser`).
