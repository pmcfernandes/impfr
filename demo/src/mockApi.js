const TASKS_KEY = "react-framework-demo:tasks";

const seedTasks = [
  { id: 1, title: "Design landing page", owner: "Ava", status: "Complete", priority: "High" },
  { id: 2, title: "Implement login flow", owner: "Noah", status: "Complete", priority: "High" },
  { id: 3, title: "Write API documentation", owner: "Mia", status: "In progress", priority: "Medium" },
  { id: 4, title: "Set up CI pipeline", owner: "Liam", status: "In progress", priority: "Medium" },
  { id: 5, title: "User interviews", owner: "Ava", status: "Planning", priority: "Low" },
  { id: 6, title: "Database migration", owner: "Noah", status: "Planning", priority: "High" },
  { id: 7, title: "Accessibility audit", owner: "Mia", status: "Open", priority: "Medium" },
  { id: 8, title: "Performance budget", owner: "Liam", status: "Open", priority: "Low" },
  { id: 9, title: "Onboarding emails", owner: "Ava", status: "Open", priority: "Low" },
  { id: 10, title: "Error tracking setup", owner: "Noah", status: "In progress", priority: "High" },
  { id: 11, title: "Design system tokens", owner: "Mia", status: "Complete", priority: "Medium" },
  { id: 12, title: "Release checklist", owner: "Liam", status: "Planning", priority: "Medium" },
];

const teams = [
  { id: "frontend", name: "Frontend team" },
  { id: "backend", name: "Backend team" },
  { id: "design", name: "Design team" },
  { id: "data", name: "Data team" },
];

function loadTasks() {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // corrupted storage: fall back to the seed
  }
  return seedTasks.map((task) => ({ ...task }));
}

let tasks = loadTasks();
let nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;

function persist() {
  try {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // storage unavailable: keep the in-memory copy only
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function readJsonBody(init) {
  try {
    if (typeof init.body === "string" && init.body) return JSON.parse(init.body);
  } catch {
    // invalid JSON: handled as an empty payload
  }
  return {};
}

async function handleTasks(url, method, init) {
  const parts = url.pathname.split("/").filter(Boolean);
  const rawId = parts[2];
  const id = rawId === undefined ? null : Number(rawId);

  if (method === "GET" && id === null) {
    let rows = [...tasks];
    const idsParam = url.searchParams.get("ids");
    if (idsParam) {
      const wanted = new Set(idsParam.split(",").map(Number));
      return jsonResponse(rows.filter((task) => wanted.has(task.id)));
    }
    const page = Number(url.searchParams.get("page") || "1");
    const pageSize = Number(url.searchParams.get("pageSize") || "0");
    if (pageSize > 0) rows = rows.slice((page - 1) * pageSize, page * pageSize);
    return jsonResponse(rows);
  }

  if (method === "GET") {
    const row = tasks.find((task) => task.id === id);
    return row ? jsonResponse(row) : jsonResponse({ message: "Task not found" }, 404);
  }

  if (method === "POST") {
    const body = await readJsonBody(init);
    const row = { id: nextId++, status: "Open", priority: "Medium", ...body };
    tasks = [...tasks, row];
    persist();
    return jsonResponse(row, 201);
  }

  if (method === "PATCH" && id !== null) {
    const body = await readJsonBody(init);
    if (!tasks.some((task) => task.id === id)) {
      return jsonResponse({ message: "Task not found" }, 404);
    }
    tasks = tasks.map((task) => (task.id === id ? { ...task, ...body } : task));
    persist();
    return jsonResponse(tasks.find((task) => task.id === id));
  }

  if (method === "DELETE" && id !== null) {
    if (!tasks.some((task) => task.id === id)) {
      return jsonResponse({ message: "Task not found" }, 404);
    }
    tasks = tasks.filter((task) => task.id !== id);
    persist();
    return new Response(null, { status: 204 });
  }

  if (method === "DELETE") {
    const body = await readJsonBody(init);
    const wanted = new Set((body.ids || []).map(Number));
    const before = tasks.length;
    tasks = tasks.filter((task) => !wanted.has(task.id));
    persist();
    return jsonResponse({ deleted: before - tasks.length });
  }

  return jsonResponse({ message: "Method not allowed" }, 405);
}

export function installMockApi() {
  if (typeof window === "undefined" || window.__demoMockApi) return;
  window.__demoMockApi = true;

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const rawUrl = typeof input === "string" ? input : input.url;
    const method = String(init.method || (typeof input !== "string" && input.method) || "GET").toUpperCase();
    let url;
    try {
      url = new URL(rawUrl, window.location.href);
    } catch {
      return realFetch(input, init);
    }
    if (!url.pathname.startsWith("/api/")) return realFetch(input, init);

    await new Promise((resolve) => setTimeout(resolve, 200));

    if (url.pathname === "/api/teams" && method === "GET") return jsonResponse(teams);
    if (url.pathname === "/api/tasks" || url.pathname.startsWith("/api/tasks/")) {
      return handleTasks(url, method, init);
    }
    return jsonResponse({ message: "Not found" }, 404);
  };
}
