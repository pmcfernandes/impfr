import { useState } from "react";
import {
  AlertBox,
  Button,
  PanelContainer,
  SubHeader,
  fetchJson,
  useCreate,
  useDelete,
  useDeleteMany,
  useGetList,
  useGetMany,
  useGetOne,
  useInfiniteGetList,
  useStore,
  useUpdate,
} from "@pmcfernandes/app-shell";
import ResultJson from "./ResultJson.jsx";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500";

export default function ApiData() {
  const [listEnabled, setListEnabled] = useState(true);
  const list = useGetList("/api/tasks", { enabled: listEnabled });

  const [selectedId, setSelectedId] = useState(null);
  const detail = useGetOne("/api/tasks", selectedId);

  const sampleIds = (list.data || []).slice(0, 2).map((task) => task.id);
  const many = useGetMany("/api/tasks", sampleIds);

  const infinite = useInfiniteGetList("/api/tasks", { pageParam: "page", pageSize: 5, pageSizeParam: "pageSize" });

  const { create, isLoading: isCreating } = useCreate("/api/tasks");
  const { update, isLoading: isUpdating } = useUpdate("/api/tasks");
  const { remove, isLoading: isRemoving } = useDelete("/api/tasks");
  const { removeMany, isLoading: isRemovingMany } = useDeleteMany("/api/tasks");

  const [draft, setDraft, clearDraft] = useStore("demo:task-draft", "");
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [teams, setTeams] = useState(null);
  const [actionError, setActionError] = useState(null);

  const rows = list.data || [];
  const mutating = isCreating || isUpdating || isRemoving || isRemovingMany;

  function refresh() {
    list.refetch();
    infinite.refetch();
  }

  async function handleCreate(event) {
    event.preventDefault();
    setActionError(null);
    try {
      if (editingId === null) {
        await create({ title, owner, status: "Open", priority: "Medium" });
      } else {
        await update(editingId, { title, owner });
        setEditingId(null);
      }
      setTitle("");
      setOwner("");
      refresh();
    } catch (error) {
      setActionError(error.message);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setTitle(task.title);
    setOwner(task.owner);
    setActionError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setOwner("");
  }

  async function handleRemove(id) {
    setActionError(null);
    try {
      await remove(id);
      if (selectedId === id) setSelectedId(null);
      if (editingId === id) cancelEdit();
      refresh();
    } catch (error) {
      setActionError(error.message);
    }
  }

  async function handleRemoveCompleted() {
    setActionError(null);
    const ids = rows.filter((task) => task.status === "Complete").map((task) => task.id);
    if (ids.length === 0) return;
    try {
      await removeMany(ids);
      refresh();
    } catch (error) {
      setActionError(error.message);
    }
  }

  async function handleLoadTeams() {
    setActionError(null);
    try {
      setTeams(await fetchJson("/api/teams"));
    } catch (error) {
      setActionError(error.message);
    }
  }

  return (
    <section className="space-y-6">
      <SubHeader
        title="API Data"
        description="REST hooks from @pmcfernandes/app-shell against an in-browser mock API (/api/*) with latency and localStorage persistence."
      />

      {actionError && <AlertBox variant="danger" title="Request failed" description={actionError} />}

      <PanelContainer
        title="Tasks · useGetList"
        description="GET /api/tasks with an enabled toggle and manual refetch."
        actions={
          <>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <input
                checked={listEnabled}
                className="h-4 w-4 rounded border-gray-300 accent-blue-600 dark:border-gray-700"
                onChange={(event) => setListEnabled(event.target.checked)}
                type="checkbox"
              />
              Enabled
            </label>
            <Button variant="secondary" onClick={() => list.refetch()}>Refetch</Button>
          </>
        }
      >
        {list.isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading tasks…</p>}
        {list.error && <AlertBox variant="danger" title="Could not load tasks" description={list.error.message} />}
        {!list.isLoading && !list.error && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {rows.map((task) => (
              <li key={task.id} className="flex flex-wrap items-center gap-2 py-2">
                <button
                  className={`flex-1 min-w-40 text-left ${selectedId === task.id ? "font-semibold text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-50"}`}
                  onClick={() => setSelectedId(task.id)}
                  type="button"
                >
                  <span className="block truncate text-sm">{task.title}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    #{task.id} · {task.owner} · {task.status} · {task.priority}
                  </span>
                </button>
                <Button variant="secondary" onClick={() => startEdit(task)}>Edit</Button>
                <Button variant="danger" onClick={() => handleRemove(task.id)}>Delete</Button>
              </li>
            ))}
            {rows.length === 0 && <li className="py-2 text-sm text-gray-500 dark:text-gray-400">No tasks yet. Create one below.</li>}
          </ul>
        )}
      </PanelContainer>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelContainer title="Detail · useGetOne" description="GET /api/tasks/:id. Select a task above; the hook skips the request while no id is selected.">
          {detail.isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading detail…</p>}
          {detail.error && <AlertBox variant="danger" title="Could not load task" description={detail.error.message} />}
          {!detail.isLoading && !detail.error && selectedId === null && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No task selected.</p>
          )}
          <ResultJson title={`Task #${selectedId ?? "—"}`} data={detail.data} />
        </PanelContainer>

        <PanelContainer title="Create / Edit · useCreate + useUpdate" description="POST and PATCH /api/tasks, then refetch the lists.">
          <form className="space-y-3" onSubmit={handleCreate}>
            <input className={inputClass} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" required value={title} />
            <input className={inputClass} onChange={(event) => setOwner(event.target.value)} placeholder="Owner" required value={owner} />
            <div className="flex gap-2">
              <Button type="submit" disabled={mutating}>
                {isCreating || isUpdating ? "Saving…" : editingId === null ? "Create task" : `Save #${editingId}`}
              </Button>
              {editingId !== null && (
                <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
              )}
            </div>
          </form>
        </PanelContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelContainer title="Delete · useDelete + useDeleteMany" description="DELETE /api/tasks/:id and bulk DELETE /api/tasks with { ids }.">
          <div className="flex flex-wrap gap-2">
            <Button variant="danger" disabled={mutating} onClick={handleRemoveCompleted}>
              {isRemovingMany ? "Deleting…" : "Delete completed tasks"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Individual deletions use the Delete button on each row above (204 No Content responses).
          </p>
        </PanelContainer>

        <PanelContainer title="Infinite list · useInfiniteGetList" description="GET /api/tasks?page=N&pageSize=5, appended page by page.">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {(infinite.data || []).map((task) => (
              <li key={task.id} className="py-2 text-sm text-gray-900 dark:text-gray-50">
                <span className="font-medium">#{task.id}</span> {task.title}
                <span className="text-xs text-gray-500 dark:text-gray-400"> · {task.status}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button variant="secondary" disabled={!infinite.hasNextPage || infinite.isLoadingMore} onClick={() => infinite.fetchNextPage()}>
              {infinite.isLoading ? "Loading…" : infinite.isLoadingMore ? "Loading more…" : infinite.hasNextPage ? "Load more" : "No more pages"}
            </Button>
          </div>
        </PanelContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelContainer title="Many + fetchJson · useGetMany" description="GET /api/tasks?ids=… for the first two rows, plus a direct fetchJson call.">
          <ResultJson title="First two tasks" data={many.data} />
          {many.isLoading && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading selection…</p>}
          <div className="mt-3">
            <Button variant="secondary" onClick={handleLoadTeams}>Load teams via fetchJson</Button>
          </div>
          <ResultJson title="GET /api/teams" data={teams} />
        </PanelContainer>

        <PanelContainer title="Persistent draft · useStore" description="JSON value synced with localStorage across tabs.">
          <input className={inputClass} onChange={(event) => setDraft(event.target.value)} placeholder="Type a draft note…" value={draft} />
          <div className="mt-3 flex items-center gap-2">
            <Button variant="secondary" onClick={() => clearDraft()}>Clear</Button>
            <span className="text-xs text-gray-500 dark:text-gray-400">Stored under demo:task-draft.</span>
          </div>
        </PanelContainer>
      </div>
    </section>
  );
}
