/**
 * Pesquisa, ordenação e paginação — funções puras para facilitar testes.
 */

export function applySearch(rows, query, searchKeys = []) {
  const q = String(query ?? "").trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => {
    const keys = searchKeys.length > 0 ? searchKeys : Object.keys(row);
    return keys.some((key) => String(row[key] ?? "").toLowerCase().includes(q));
  });
}

/** Filtra por campo: cada campo preenchido tem de corresponder à respetiva coluna. */
export function applyFieldFilters(rows, filters = {}) {
  const activeFilters = Object.entries(filters).filter(([, value]) => String(value ?? "").trim());
  if (activeFilters.length === 0) return rows;

  return rows.filter((row) =>
    activeFilters.every(([key, filter]) =>
      String(row[key] ?? "").toLowerCase().includes(String(filter).trim().toLowerCase()),
    ),
  );
}

export function applySort(rows, sortKey, sortDir = "asc") {
  if (!sortKey) return rows;
  const dir = sortDir === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av === bv) return 0;
    if (av === null || av === undefined) return 1;
    if (bv === null || bv === undefined) return -1;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

/**
 * Agrupa linhas por uma propriedade, preservando a ordem recebida.
 * A chave `null` representa valores vazios para que também tenham grupo.
 */
export function groupRows(rows, groupBy) {
  if (!groupBy) return [];

  const groups = new Map();
  rows.forEach((row) => {
    const value = row[groupBy];
    const key = value === null || value === undefined || value === "" ? "__empty__" : String(value);
    if (!groups.has(key)) groups.set(key, { key, value, rows: [] });
    groups.get(key).rows.push(row);
  });

  return [...groups.values()];
}

export function paginate(rows, page = 1, pageSize = 8) {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    page: safePage,
    totalPages,
    total,
    rows: rows.slice(start, start + pageSize),
  };
}

export function exportToCsv(rows, columns) {
  const header = columns.map((c) => c.label ?? c.key).join(";");
  const lines = rows.map((row) =>
    columns.map((c) => JSON.stringify(row[c.key] ?? "")).join(";"),
  );
  return [header, ...lines].join("\n");
}
