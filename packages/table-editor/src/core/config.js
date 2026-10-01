/**
 * Normalização e validação do JSON de configuração do DataView.
 *
 * Forma esperada do input:
 * {
 *   data: [...],            // obrigatório — linhas de dados
 *   columns?: [...],        // opcional — inferido a partir de `data`
 *   title?, description?,
 *   hideHeader?: boolean,   // esconde o título/descrição (vistas via viewModes)
 *   idKey?: string,         // default "id"
 *   viewModes?: ["table","list","cards"],
 *   defaultView?: "table",
 *   searchable?, searchKeys?,
 *   fieldSearch?: boolean | string[], // inputs de pesquisa por coluna
 *   columnVisibility?: boolean, hiddenColumns?: string[],
 *   sortable?, paginated?, pageSize?,
 *   groupBy?: string,       // chave da coluna para agrupar a vista tabela
 *   selectable?, multiDelete?, editable?, addable?, deletable?,
 *   onDeleteSelected?: (ctx) => boolean | void,
 *   exportable?: boolean,  // mostra/esconde o botão Exportar CSV (default true)
 * }
 *
 * Forma de cada coluna:
 * {
 *   key, label?, type?: "text"|"number"|"currency"|"percent"|"date"|"datetime"|"boolean"|"badge"|"select",
 *   sortable?, editable?, align?: "left"|"center"|"right",
 *   currency?, options?, badgeMap?,
 *   description?: boolean, // na tabela, mostra o valor numa linha abaixo do registo
 *   subGrid?: { title?, columns?, idKey?, collapsible?: boolean }, // tabela aninhada em row[key]
 *   template?: (value, view) => string | ReactNode,  // todas as vistas
 *   templates?: { table?, list?, cards? }            // por vista (sobrepõe `template`)
 * }
 */

export const VIEW_MODES = ["table", "list", "cards"];

const DEFAULTS = {
  idKey: "id",
  viewModes: ["table", "list", "cards"],
  defaultView: "table",
  searchable: true,
  fieldSearch: false,
  columnVisibility: true,
  hiddenColumns: [],
  sortable: true,
  paginated: true,
  pageSize: 8,
  selectable: false,
  multiDelete: false,
  editable: true,
  addable: true,
  deletable: true,
  exportable: true,
};

function inferColumns(data) {
  const first = data.find((row) => row && typeof row === "object") ?? {};
  return Object.keys(first).map((key) => ({
    key,
    label: key,
    type: "text",
    sortable: true,
    editable: true,
  }));
}

function normalizeColumns(columns, data) {
  const base = Array.isArray(columns) && columns.length > 0 ? columns : inferColumns(data);
  return base.map((col, index) => ({
    label: col.key,
    type: "text",
    sortable: true,
    editable: true,
    align: "left",
    ...col,
    key: col.key ?? `col-${index}`,
  }));
}

export function normalizeConfig(rawConfig = {}) {
  const data = Array.isArray(rawConfig.data) ? rawConfig.data : [];

  const viewModes =
    Array.isArray(rawConfig.viewModes) && rawConfig.viewModes.length > 0
      ? rawConfig.viewModes.filter((v) => VIEW_MODES.includes(v))
      : [...DEFAULTS.viewModes];

  const defaultView = VIEW_MODES.includes(rawConfig.defaultView)
    ? rawConfig.defaultView
    : viewModes[0] ?? DEFAULTS.defaultView;

  const columns = normalizeColumns(rawConfig.columns, data);
  const normalized = {
    ...DEFAULTS,
    ...rawConfig,
    data,
    columns,
    viewModes: viewModes.length > 0 ? viewModes : [...DEFAULTS.viewModes],
    defaultView,
  };

  // Multi-delete pressupõe seleção de linhas, sem exigir ambas as flags.
  if (normalized.multiDelete) normalized.selectable = true;
  normalized.fieldSearchKeys = resolveFieldSearchKeys(normalized.fieldSearch, columns);

  return normalized;
}

/** Resolve `true` para todas as colunas ou valida uma lista de chaves. */
export function resolveFieldSearchKeys(fieldSearch, columns = []) {
  if (fieldSearch === true) return columns.map((column) => column.key);
  if (!Array.isArray(fieldSearch)) return [];
  return fieldSearch.filter((key) => columns.some((column) => column.key === key));
}

export function getRowId(row, idKey = "id", fallbackIndex = 0) {
  if (row && row[idKey] !== undefined && row[idKey] !== null) return String(row[idKey]);
  return `row-${fallbackIndex}`;
}
