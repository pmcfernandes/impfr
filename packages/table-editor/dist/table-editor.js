import { jsx as r, jsxs as u, Fragment as Q } from "react/jsx-runtime";
import { useState as T, useEffect as Y, useMemo as ie, forwardRef as ve, createElement as de, Fragment as Ae } from "react";
const ce = ["table", "list", "cards"], J = {
  idKey: "id",
  viewModes: ["table", "list", "cards"],
  defaultView: "table",
  searchable: !0,
  fieldSearch: !1,
  columnVisibility: !0,
  hiddenColumns: [],
  sortable: !0,
  paginated: !0,
  pageSize: 8,
  selectable: !1,
  multiDelete: !1,
  editable: !0,
  addable: !0,
  deletable: !0,
  exportable: !0
};
function De(e) {
  const t = e.find((a) => a && typeof a == "object") ?? {};
  return Object.keys(t).map((a) => ({
    key: a,
    label: a,
    type: "text",
    sortable: !0,
    editable: !0
  }));
}
function Me(e, t) {
  return (Array.isArray(e) && e.length > 0 ? e : De(t)).map((l, n) => ({
    label: l.key,
    type: "text",
    sortable: !0,
    editable: !0,
    align: "left",
    ...l,
    key: l.key ?? `col-${n}`
  }));
}
function Te(e = {}) {
  const t = Array.isArray(e.data) ? e.data : [], a = Array.isArray(e.viewModes) && e.viewModes.length > 0 ? e.viewModes.filter((c) => ce.includes(c)) : [...J.viewModes], l = ce.includes(e.defaultView) ? e.defaultView : a[0] ?? J.defaultView, n = Me(e.columns, t), s = {
    ...J,
    ...e,
    data: t,
    columns: n,
    viewModes: a.length > 0 ? a : [...J.viewModes],
    defaultView: l
  };
  return s.multiDelete && (s.selectable = !0), s.fieldSearchKeys = Ne(s.fieldSearch, n), s;
}
function Ne(e, t = []) {
  return e === !0 ? t.map((a) => a.key) : Array.isArray(e) ? e.filter((a) => t.some((l) => l.key === a)) : [];
}
function F(e, t = "id", a = 0) {
  return e && e[t] !== void 0 && e[t] !== null ? String(e[t]) : `row-${a}`;
}
function Ve(e, t, a = []) {
  const l = String(t ?? "").trim().toLowerCase();
  return l ? e.filter((n) => (a.length > 0 ? a : Object.keys(n)).some((c) => String(n[c] ?? "").toLowerCase().includes(l))) : e;
}
function je(e, t = {}) {
  const a = Object.entries(t).filter(([, l]) => String(l ?? "").trim());
  return a.length === 0 ? e : e.filter(
    (l) => a.every(
      ([n, s]) => String(l[n] ?? "").toLowerCase().includes(String(s).trim().toLowerCase())
    )
  );
}
function Ee(e, t, a = "asc") {
  if (!t) return e;
  const l = a === "desc" ? -1 : 1;
  return [...e].sort((n, s) => {
    const c = n[t], g = s[t];
    return c === g ? 0 : c == null ? 1 : g == null ? -1 : typeof c == "number" && typeof g == "number" ? (c - g) * l : String(c).localeCompare(String(g)) * l;
  });
}
function Ke(e, t) {
  if (!t) return [];
  const a = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    const n = l[t], s = n == null || n === "" ? "__empty__" : String(n);
    a.has(s) || a.set(s, { key: s, value: n, rows: [] }), a.get(s).rows.push(l);
  }), [...a.values()];
}
function Le(e, t = 1, a = 8) {
  const l = e.length, n = Math.max(1, Math.ceil(l / a)), s = Math.min(Math.max(1, t), n), c = (s - 1) * a;
  return {
    page: s,
    totalPages: n,
    total: l,
    rows: e.slice(c, c + a)
  };
}
function Fe(e, t) {
  const a = t.map((n) => n.label ?? n.key).join(";"), l = e.map(
    (n) => t.map((s) => JSON.stringify(n[s.key] ?? "")).join(";")
  );
  return [a, ...l].join(`
`);
}
function Ie(e, t = 250) {
  const [a, l] = T(e);
  return Y(() => {
    const n = setTimeout(() => l(e), t);
    return () => clearTimeout(n);
  }, [e, t]), a;
}
function Ge(e, t) {
  const [a, l] = T(e.data), [n, s] = T(e.defaultView), [c, g] = T(""), [h, N] = T({}), [d, m] = T(e.hiddenColumns ?? []), [x, f] = T(null), [b, I] = T("asc"), [K, G] = T(1), [p, S] = T([]), [k, O] = T(null), [L, P] = T(e.pageSize);
  Y(() => {
    l(e.data), G(1), S([]), O(null), N({}), m(e.hiddenColumns ?? []);
  }, [e.data]), Y(() => {
    s(e.defaultView), P(e.pageSize);
  }, [e.defaultView, e.pageSize]);
  const V = Ie(c), j = ie(() => {
    const o = Ve(a, V, e.searchKeys ?? []), y = je(o, h);
    return Ee(y, x, b);
  }, [a, V, h, e.searchKeys, x, b]), D = ie(() => e.paginated ? Le(j, K, L) : { page: 1, totalPages: 1, total: j.length, rows: j }, [j, e.paginated, K, L]);
  Y(() => {
    K !== D.page && G(D.page);
  }, [K, D.page]);
  function R(o) {
    l(o), t == null || t(o);
  }
  function z(o) {
    x !== o ? (f(o), I("asc")) : I((y) => y === "asc" ? "desc" : "asc");
  }
  function q(o) {
    S(
      (y) => y.includes(o) ? y.filter((v) => v !== o) : [...y, o]
    );
  }
  function U(o) {
    const y = o.map((C, W) => F(C, e.idKey, W)), v = y.every((C) => p.includes(C));
    S(v ? [] : y);
  }
  function i(o) {
    if ((k == null ? void 0 : k.mode) === "create") {
      const y = o[e.idKey] === void 0 || o[e.idKey] === "" ? { ...o, [e.idKey]: ze(a, e.idKey) } : o;
      R([...a, y]);
    } else if ((k == null ? void 0 : k.mode) === "edit") {
      const y = F(k.row, e.idKey);
      R(
        a.map(
          (v, C) => F(v, e.idKey, C) === y ? { ...v, ...o } : v
        )
      );
    }
    O(null);
  }
  function w(o) {
    const y = F(o, e.idKey);
    R(a.filter((v, C) => F(v, e.idKey, C) !== y)), S((v) => v.filter((C) => C !== y));
  }
  function M() {
    R(
      a.filter(
        (o, y) => !p.includes(F(a[y], e.idKey, y))
      )
    ), S([]);
  }
  return {
    rows: a,
    visibleRows: D.rows,
    total: D.total,
    totalPages: D.totalPages,
    page: D.page,
    view: n,
    setView: s,
    query: c,
    setQuery: g,
    fieldFilters: h,
    setFieldFilters: N,
    hiddenColumnKeys: d,
    setHiddenColumnKeys: m,
    sortKey: x,
    sortDir: b,
    toggleSort: z,
    setPage: G,
    pageSize: L,
    setPageSize: P,
    selectedIds: p,
    toggleSelect: q,
    toggleSelectAll: U,
    editingRow: k,
    setEditingRow: O,
    saveRow: i,
    deleteRow: w,
    deleteSelected: M,
    allFilteredRows: j
  };
}
function ze(e, t) {
  const a = e.map((l) => Number(l[t])).filter((l) => Number.isFinite(l));
  return a.length > 0 ? Math.max(...a) + 1 : e.length + 1;
}
const He = {
  search: "Search…",
  add: "Add",
  edit: "Edit",
  delete: "Delete",
  deleteSelected: "Delete selected",
  save: "Save",
  cancel: "Cancel",
  viewTable: "Table",
  viewList: "List",
  viewCards: "Cards",
  showing: "Showing",
  of: "of",
  rows: "rows",
  emptyTitle: "No results",
  emptyHint: "Adjust the search or add a new record.",
  createTitle: "New record",
  editTitle: "Edit record",
  confirmDelete: "Delete this record?",
  selected: "selected",
  export: "Export CSV",
  noColumns: "No columns configured.",
  columns: "Columns",
  showColumns: "Show columns",
  group: "Grouped by",
  items: "items",
  emptyGroup: "No value"
}, Oe = {
  search: "Pesquisar…",
  add: "Adicionar",
  edit: "Editar",
  delete: "Eliminar",
  deleteSelected: "Eliminar seleção",
  save: "Guardar",
  cancel: "Cancelar",
  viewTable: "Tabela",
  viewList: "Lista",
  viewCards: "Cartões",
  showing: "A mostrar",
  of: "de",
  rows: "registos",
  emptyTitle: "Sem resultados",
  emptyHint: "Ajusta a pesquisa ou adiciona um novo registo.",
  createTitle: "Novo registo",
  editTitle: "Editar registo",
  confirmDelete: "Eliminar este registo?",
  selected: "selecionados",
  export: "Exportar CSV",
  noColumns: "Sem colunas configuradas.",
  columns: "Colunas",
  showColumns: "Mostrar colunas",
  group: "Agrupado por",
  items: "itens",
  emptyGroup: "Sem valor"
}, se = { pt: Oe, en: He };
function Pe(e = "pt") {
  const t = se[e] ?? se.pt;
  return (a) => t[a] ?? se.en[a] ?? a;
}
function E(...e) {
  return e.filter(Boolean).join(" ");
}
const ge = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  error: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
};
function ee({ children: e, variant: t = "default", className: a }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: E(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        ge[t] ?? ge.default,
        a
      ),
      children: e
    }
  );
}
function te(e, t = {}) {
  return e in t ? t[e] : "default";
}
const be = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
};
function H({ variant: e = "secondary", className: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      className: E(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        be[e] ?? be.secondary,
        t
      ),
      ...a
    }
  );
}
function _({ className: e, title: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      title: t,
      "aria-label": t,
      className: E(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100",
        e
      ),
      ...a
    }
  );
}
function Re({ children: e, className: t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: E(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-gray-950",
        t
      ),
      children: e
    }
  );
}
function qe({ title: e, description: t, actions: a }) {
  return /* @__PURE__ */ u("div", { className: "flex flex-wrap items-start justify-between gap-3 p-5 pb-0", children: [
    /* @__PURE__ */ u("div", { children: [
      e && /* @__PURE__ */ r("h3", { className: "text-base font-semibold text-gray-900 dark:text-gray-50", children: e }),
      t && /* @__PURE__ */ r("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
    ] }),
    a && /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: a })
  ] });
}
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Se = (...e) => e.filter((t, a, l) => !!t && t.trim() !== "" && l.indexOf(t) === a).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var _e = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ue = ve(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: a = 2,
    absoluteStrokeWidth: l,
    className: n = "",
    children: s,
    iconNode: c,
    ...g
  }, h) => de(
    "svg",
    {
      ref: h,
      ..._e,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: l ? Number(a) * 24 / Number(t) : a,
      className: Se("lucide", n),
      ...g
    },
    [
      ...c.map(([N, d]) => de(N, d)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A = (e, t) => {
  const a = ve(
    ({ className: l, ...n }, s) => de(Ue, {
      ref: s,
      iconNode: t,
      className: Se(`lucide-${$e(e)}`, l),
      ...n
    })
  );
  return a.displayName = `${e}`, a;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Be = A("ArrowDownToLine", [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qe = A("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const We = A("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = A("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = A("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = A("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = A("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = A("Columns3", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = A("Inbox", [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = A("LayoutGrid", [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = A("List", [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = A("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = A("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const at = A("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = A("Table2", [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = A("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lt = A("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function Z({ title: e, hint: t, action: a }) {
  return /* @__PURE__ */ u("div", { className: "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", children: [
    /* @__PURE__ */ r("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-900", children: /* @__PURE__ */ r(Ze, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ r("p", { className: "font-medium text-gray-900 dark:text-gray-100", children: e }),
    t && /* @__PURE__ */ r("p", { className: "max-w-sm text-sm text-gray-500 dark:text-gray-400", children: t }),
    a && /* @__PURE__ */ r("div", { className: "mt-2", children: a })
  ] });
}
function he({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "input",
    {
      className: E(
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        e
      ),
      ...t
    }
  );
}
function st({ value: e, onChange: t, placeholder: a, className: l }) {
  return /* @__PURE__ */ u("div", { className: E("relative", l), children: [
    /* @__PURE__ */ r(at, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
    /* @__PURE__ */ r(he, { value: e, onChange: t, placeholder: a, className: "pl-9" })
  ] });
}
function it({ className: e, children: t, ...a }) {
  return /* @__PURE__ */ r(
    "select",
    {
      className: E(
        "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        e
      ),
      ...a,
      children: t
    }
  );
}
function dt({ label: e, children: t, hint: a }) {
  return /* @__PURE__ */ u("label", { className: "block", children: [
    /* @__PURE__ */ r("span", { className: "mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400", children: e }),
    t,
    a && /* @__PURE__ */ r("span", { className: "mt-1 block text-xs text-gray-400 dark:text-gray-500", children: a })
  ] });
}
function ct({ title: e, children: t, footer: a, onClose: l }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
      onMouseDown: (n) => {
        n.target === n.currentTarget && (l == null || l());
      },
      children: /* @__PURE__ */ u("div", { className: "w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950", children: [
        /* @__PURE__ */ u("div", { className: "flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800", children: [
          /* @__PURE__ */ r("h3", { className: "font-semibold text-gray-900 dark:text-gray-50", children: e }),
          /* @__PURE__ */ r(_, { title: "Fechar", onClick: l, children: /* @__PURE__ */ r(lt, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ r("div", { className: "max-h-[70vh] overflow-y-auto px-5 py-4", children: t }),
        a && /* @__PURE__ */ r("div", { className: "flex justify-end gap-2 border-t border-gray-100 px-5 py-4 dark:border-gray-800", children: a })
      ] })
    }
  );
}
function ot({ page: e, totalPages: t, total: a, pageSize: l, onPage: n, t: s }) {
  const c = a === 0 ? 0 : (e - 1) * l + 1, g = Math.min(a, e * l);
  return /* @__PURE__ */ u("div", { className: "flex flex-wrap items-center justify-between gap-3 px-5 py-3", children: [
    /* @__PURE__ */ u("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
      s("showing"),
      " ",
      c,
      "–",
      g,
      " ",
      s("of"),
      " ",
      a,
      " ",
      s("rows")
    ] }),
    /* @__PURE__ */ u("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ r(H, { variant: "ghost", disabled: e <= 1, onClick: () => n(e - 1), children: /* @__PURE__ */ r(Je, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ u("span", { className: "px-2 text-xs font-medium text-gray-600 dark:text-gray-300", children: [
        e,
        " / ",
        t
      ] }),
      /* @__PURE__ */ r(H, { variant: "ghost", disabled: e >= t, onClick: () => n(e + 1), children: /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function ut({ children: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: E("w-full overflow-x-auto", t), children: e });
}
function yt({ children: e }) {
  return /* @__PURE__ */ r("table", { className: "w-full text-sm", children: e });
}
function ht({ children: e, filterRow: t }) {
  return /* @__PURE__ */ u("thead", { children: [
    /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:text-gray-400", children: e }),
    t && /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/30", children: t })
  ] });
}
function B({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("th", { className: E("px-4 py-2.5 font-medium", t), ...a, children: e });
}
function mt({ children: e }) {
  return /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: e });
}
function X({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r(
    "tr",
    {
      className: E(
        "transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/60",
        t
      ),
      ...a,
      children: e
    }
  );
}
function $({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("td", { className: E("px-4 py-3 text-gray-700 dark:text-gray-200", t), ...a, children: e });
}
function ae(e, t = {}, a = "pt") {
  if (e == null || e === "") return "—";
  const l = a === "en" ? "en-US" : "pt-PT", n = t.type ?? "text";
  try {
    switch (n) {
      case "number":
        return new Intl.NumberFormat(l).format(Number(e));
      case "currency":
        return new Intl.NumberFormat(l, {
          style: "currency",
          currency: t.currency ?? "EUR"
        }).format(Number(e));
      case "percent": {
        const s = Number(e), c = Math.abs(s) <= 1 && s !== 0 ? s : s / 100;
        return new Intl.NumberFormat(l, { style: "percent", maximumFractionDigits: 1 }).format(
          c
        );
      }
      case "date":
        return new Intl.DateTimeFormat(l, { dateStyle: "medium" }).format(new Date(e));
      case "datetime":
        return new Intl.DateTimeFormat(l, { dateStyle: "medium", timeStyle: "short" }).format(
          new Date(e)
        );
      case "boolean":
        return e === !0 || e === "true" ? "✓" : "—";
      default:
        return String(e);
    }
  } catch {
    return String(e);
  }
}
function pt(e, t = {}) {
  if (e == null) return "";
  if ((t.type === "date" || t.type === "datetime") && e) {
    const a = new Date(e);
    if (Number.isNaN(a.getTime())) return String(e);
    if (t.type === "date") return a.toISOString().slice(0, 10);
  }
  return t.type === "boolean" ? !!e : e;
}
function gt(e, t = {}) {
  if (t.type === "number" || t.type === "currency" || t.type === "percent") {
    if (e === "" || e === null) return null;
    const a = Number(String(e).replace(",", "."));
    return Number.isNaN(a) ? e : a;
  }
  return t.type === "boolean" ? e === !0 || e === "true" || e === "on" : e;
}
function ne(e = {}, t) {
  var a;
  return e ? ((a = e.templates) == null ? void 0 : a[t]) ?? e.template ?? null : null;
}
function me(e, t, a) {
  if (typeof e != "function") return t;
  try {
    return e(t, a);
  } catch {
    return t;
  }
}
function fe({ row: e, column: t, locale: a }) {
  const l = ne(t, "cards");
  return l != null ? /* @__PURE__ */ r(Q, { children: me(l, e[t.key], "cards") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ee, { variant: te(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(Q, { children: ae(e[t.key], t, a) });
}
function bt({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(Z, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [c, ...g] = e.columns;
  return /* @__PURE__ */ r("div", { className: "grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-3", children: t.map((h, N) => {
    const d = F(h, e.idKey, N);
    return /* @__PURE__ */ u(
      "article",
      {
        className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        children: [
          /* @__PURE__ */ u("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ r("h4", { className: "truncate text-sm font-semibold text-gray-900 dark:text-gray-50", children: c ? /* @__PURE__ */ r(fe, { row: h, column: c, locale: a }) : d }),
            /* @__PURE__ */ u("div", { className: "flex shrink-0 gap-1", children: [
              e.editable && /* @__PURE__ */ r(_, { title: s("edit"), onClick: () => l(h), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
              e.deletable && /* @__PURE__ */ r(_, { title: s("delete"), onClick: () => n(h), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ r("dl", { className: "mt-3 space-y-1.5", children: g.slice(0, 5).map((m) => /* @__PURE__ */ u("div", { className: "flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ r("dt", { className: "shrink-0 text-xs text-gray-500 dark:text-gray-400", children: m.label }),
            /* @__PURE__ */ r("dd", { className: "truncate text-right text-gray-800 dark:text-gray-200", children: /* @__PURE__ */ r(fe, { row: h, column: m, locale: a }) })
          ] }, m.key)) })
        ]
      },
      d
    );
  }) });
}
function xt({ column: e, value: t, onChange: a }) {
  if (e.type === "boolean")
    return /* @__PURE__ */ r(
      "input",
      {
        type: "checkbox",
        checked: !!t,
        onChange: (n) => a(n.target.checked),
        className: "h-4 w-4 accent-blue-600"
      }
    );
  if (e.type === "select" || Array.isArray(e.options))
    return /* @__PURE__ */ u(it, { value: t, onChange: (n) => a(n.target.value), className: "w-full", children: [
      /* @__PURE__ */ r("option", { value: "", children: "—" }),
      (e.options ?? []).map((n) => /* @__PURE__ */ r("option", { value: String(n), children: String(n) }, String(n)))
    ] });
  const l = e.type === "number" || e.type === "currency" || e.type === "percent" ? "number" : e.type === "date" ? "date" : "text";
  return /* @__PURE__ */ r(he, { type: l, value: t, onChange: (n) => a(n.target.value), className: "w-full" });
}
function ft({ config: e, editingRow: t, onSave: a, onClose: l, t: n }) {
  const s = e.columns.filter((d) => d.editable !== !1), [c, g] = T(() => {
    const d = (t == null ? void 0 : t.row) ?? {};
    return Object.fromEntries(
      s.map((m) => [m.key, pt(d[m.key], m)])
    );
  });
  if (!t) return null;
  const h = t.mode === "create";
  function N(d) {
    d.preventDefault();
    const m = Object.fromEntries(
      s.map((x) => [x.key, gt(c[x.key], x)])
    );
    a(h ? m : { ...t.row, ...m });
  }
  return /* @__PURE__ */ r(
    ct,
    {
      title: n(h ? "createTitle" : "editTitle"),
      onClose: l,
      footer: /* @__PURE__ */ u(Q, { children: [
        /* @__PURE__ */ r(H, { variant: "secondary", onClick: l, children: n("cancel") }),
        /* @__PURE__ */ r(H, { variant: "primary", onClick: N, children: n("save") })
      ] }),
      children: /* @__PURE__ */ r("form", { onSubmit: N, className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: s.map((d) => /* @__PURE__ */ r(dt, { label: d.label, children: /* @__PURE__ */ r(
        xt,
        {
          column: d,
          value: c[d.key] ?? "",
          onChange: (m) => g((x) => ({ ...x, [d.key]: m }))
        }
      ) }, d.key)) })
    }
  );
}
function ke({ row: e, column: t, locale: a }) {
  const l = ne(t, "list");
  return l != null ? /* @__PURE__ */ r(Q, { children: me(l, e[t.key], "list") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ee, { variant: te(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(Q, { children: ae(e[t.key], t, a) });
}
function kt({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(Z, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [c, ...g] = e.columns;
  return /* @__PURE__ */ r("ul", { className: "divide-y divide-gray-100 px-5 dark:divide-gray-800", children: t.map((h, N) => {
    const d = F(h, e.idKey, N);
    return /* @__PURE__ */ u("li", { className: "flex items-center gap-4 py-3", children: [
      /* @__PURE__ */ r("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300", children: String(h[c == null ? void 0 : c.key] ?? "?").slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ u("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ r("p", { className: "truncate text-sm font-medium text-gray-900 dark:text-gray-50", children: c ? /* @__PURE__ */ r(ke, { row: h, column: c, locale: a }) : d }),
        /* @__PURE__ */ r("div", { className: "mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5", children: g.slice(0, 4).map(
          (m) => (m.type === "badge" || m.render === "badge") && ne(m, "list") == null ? /* @__PURE__ */ r(ee, { variant: te(h[m.key], m.badgeMap), children: String(h[m.key]) }, m.key) : /* @__PURE__ */ r("span", { className: "truncate text-xs text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r(ke, { row: h, column: m, locale: a }) }, m.key)
        ) })
      ] }),
      /* @__PURE__ */ u("div", { className: "flex shrink-0 gap-1", children: [
        e.editable && /* @__PURE__ */ r(_, { title: s("edit"), onClick: () => l(h), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
        e.deletable && /* @__PURE__ */ r(_, { title: s("delete"), onClick: () => n(h), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
      ] })
    ] }, d);
  }) });
}
function wt({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ r(Xe, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ r(Qe, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ r(We, { className: "h-3.5 w-3.5 opacity-40" });
}
function ue({ row: e, column: t, locale: a }) {
  const l = e[t.key], n = ne(t, "table");
  if (n != null)
    return /* @__PURE__ */ r("span", { children: me(n, l, "table") });
  if (t.render === "badge" || t.type === "badge")
    return /* @__PURE__ */ r(ee, { variant: te(l, t.badgeMap), children: String(l) });
  const s = t.align === "right" ? "text-right" : t.align === "center" ? "text-center" : "";
  return /* @__PURE__ */ r("span", { className: s, children: ae(l, t, a) });
}
function vt({ column: e, rows: t, locale: a, showTitle: l = !0 }) {
  if (!Array.isArray(t) || t.length === 0) return null;
  const n = e.subGrid === !0 ? {} : e.subGrid, s = Array.isArray(n == null ? void 0 : n.columns) && n.columns.length > 0 ? n.columns : Object.keys(t[0] ?? {}).map((c) => ({ key: c, label: c, type: "text" }));
  return /* @__PURE__ */ u("div", { className: "overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950", children: [
    l && ((n == null ? void 0 : n.title) ?? e.label) && /* @__PURE__ */ r("p", { className: "border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:border-gray-800 dark:text-gray-300", children: (n == null ? void 0 : n.title) ?? e.label }),
    /* @__PURE__ */ u("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ r("thead", { className: "bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400", children: /* @__PURE__ */ r("tr", { children: s.map((c) => /* @__PURE__ */ r("th", { className: "px-3 py-2 font-medium", children: c.label ?? c.key }, c.key)) }) }),
      /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: t.map((c, g) => /* @__PURE__ */ r("tr", { children: s.map((h) => /* @__PURE__ */ r("td", { className: "px-3 py-2 text-gray-700 dark:text-gray-200", children: /* @__PURE__ */ r(ue, { row: c, column: h, locale: a }) }, h.key)) }, c[(n == null ? void 0 : n.idKey) ?? "id"] ?? g)) })
    ] })
  ] });
}
function Nt({
  config: e,
  rows: t,
  locale: a,
  sortKey: l,
  sortDir: n,
  onToggleSort: s,
  fieldFilters: c,
  onFieldFiltersChange: g,
  hiddenColumnKeys: h = [],
  selectedIds: N,
  onToggleSelect: d,
  onToggleSelectAll: m,
  onEdit: x,
  onDelete: f,
  t: b
}) {
  const [I, K] = T([]), [G, p] = T([]);
  if (e.columns.length === 0) return /* @__PURE__ */ r(Z, { title: b("noColumns") });
  const S = e.editable || e.deletable, k = e.columns.find((i) => i.description === !0), O = e.columns.filter((i) => i.subGrid), L = e.columns.filter(
    (i) => i !== k && !O.includes(i) && !h.includes(i.key)
  ), P = e.columns.find((i) => i.key === e.groupBy), V = P ? Ke(t, P.key) : null, j = L.length + Number(e.selectable) + Number(S), D = t.map((i, w) => F(i, e.idKey, w)), R = D.length > 0 && D.every((i) => N.includes(i));
  function z(i) {
    K(
      (w) => w.includes(i) ? w.filter((M) => M !== i) : [...w, i]
    );
  }
  function q(i) {
    p(
      (w) => w.includes(i) ? w.filter((M) => M !== i) : [...w, i]
    );
  }
  function U(i, w) {
    const M = F(i, e.idKey, w), o = k && i[k.key] != null && i[k.key] !== "";
    return /* @__PURE__ */ u(Ae, { children: [
      /* @__PURE__ */ u(X, { children: [
        e.selectable && /* @__PURE__ */ r($, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            checked: N.includes(M),
            onChange: () => d(M),
            className: "h-4 w-4 accent-blue-600"
          }
        ) }),
        L.map((y) => /* @__PURE__ */ r($, { children: /* @__PURE__ */ r(ue, { row: i, column: y, locale: a }) }, y.key)),
        S && /* @__PURE__ */ r($, { className: "text-right", children: /* @__PURE__ */ u("div", { className: "flex justify-end gap-1", children: [
          e.editable && /* @__PURE__ */ r(_, { title: b("edit"), onClick: () => x(i), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
          e.deletable && /* @__PURE__ */ r(_, { title: b("delete"), onClick: () => f(i), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
        ] }) })
      ] }),
      o && /* @__PURE__ */ r(X, { className: "hover:bg-transparent", children: /* @__PURE__ */ r($, { colSpan: j, className: "pt-0 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r("span", { className: "block border-l-2 border-blue-200 pl-3 dark:border-blue-900", children: /* @__PURE__ */ r(ue, { row: i, column: k, locale: a }) }) }) }),
      O.map((y) => {
        const v = i[y.key];
        if (!Array.isArray(v) || v.length === 0) return null;
        const C = y.subGrid === !0 ? {} : y.subGrid, W = `${M}-${y.key}`, le = (C == null ? void 0 : C.collapsible) !== !1, pe = le && !G.includes(W), Ce = (C == null ? void 0 : C.title) ?? y.label;
        return /* @__PURE__ */ r(X, { className: "hover:bg-transparent", children: /* @__PURE__ */ r($, { colSpan: j, className: "pt-0", children: /* @__PURE__ */ u("div", { className: "mt-2", children: [
          le && /* @__PURE__ */ u(
            "button",
            {
              onClick: () => q(W),
              className: "mb-2 flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
              children: [
                pe ? /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
                Ce,
                /* @__PURE__ */ u("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                  v.length,
                  " ",
                  b("items")
                ] })
              ]
            }
          ),
          !pe && /* @__PURE__ */ r(vt, { column: y, rows: v, locale: a, showTitle: !le })
        ] }) }) }, W);
      })
    ] }, M);
  }
  return /* @__PURE__ */ r(ut, { children: /* @__PURE__ */ u(yt, { children: [
    /* @__PURE__ */ u(
      ht,
      {
        filterRow: e.fieldSearchKeys.length > 0 && /* @__PURE__ */ u(Q, { children: [
          e.selectable && /* @__PURE__ */ r(B, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2" }),
          L.map((i) => /* @__PURE__ */ r(B, { children: e.fieldSearchKeys.includes(i.key) && /* @__PURE__ */ r(
            he,
            {
              value: c[i.key] ?? "",
              onChange: (w) => g((M) => ({
                ...M,
                [i.key]: w.target.value
              })),
              placeholder: `${i.label}…`,
              className: "min-w-24 py-1.5 normal-case"
            }
          ) }, i.key)),
          S && /* @__PURE__ */ r(B, {})
        ] }),
        children: [
          e.selectable && /* @__PURE__ */ r(B, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
            "input",
            {
              type: "checkbox",
              checked: R,
              onChange: () => m(t),
              className: "h-4 w-4 accent-blue-600"
            }
          ) }),
          L.map((i) => /* @__PURE__ */ r(
            B,
            {
              className: E(i.align === "right" && "text-right", i.align === "center" && "text-center"),
              children: e.sortable && i.sortable !== !1 ? /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => s(i.key),
                  className: "inline-flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100",
                  children: [
                    i.label,
                    /* @__PURE__ */ r(wt, { active: l === i.key, dir: n })
                  ]
                }
              ) : i.label
            },
            i.key
          )),
          S && /* @__PURE__ */ r(B, { className: "text-right", children: b("edit") })
        ]
      }
    ),
    /* @__PURE__ */ r(mt, { children: t.length === 0 ? /* @__PURE__ */ r(X, { children: /* @__PURE__ */ r($, { colSpan: j, className: "p-0", children: /* @__PURE__ */ r(Z, { title: b("emptyTitle"), hint: b("emptyHint") }) }) }) : V ? V.flatMap((i) => {
      const w = I.includes(i.key), M = i.key === "__empty__" ? b("emptyGroup") : ae(i.value, P, a);
      return [
        /* @__PURE__ */ r(X, { className: "bg-gray-50 hover:bg-gray-50 dark:bg-gray-900/70 dark:hover:bg-gray-900/70", children: /* @__PURE__ */ r($, { colSpan: j, className: "p-0", children: /* @__PURE__ */ u(
          "button",
          {
            className: "flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300",
            onClick: () => z(i.key),
            children: [
              w ? /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
              b("group"),
              ": ",
              M,
              /* @__PURE__ */ u("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                i.rows.length,
                " ",
                b("items")
              ] })
            ]
          }
        ) }) }, `group-${i.key}`),
        ...w ? [] : i.rows.map((o) => U(o, t.indexOf(o)))
      ];
    }) : t.map(U) })
  ] }) });
}
function St(e, t) {
  const a = new Blob([t], { type: "text/csv;charset=utf-8" }), l = URL.createObjectURL(a), n = document.createElement("a");
  n.href = l, n.download = e, n.click(), URL.revokeObjectURL(l);
}
function Ct({
  config: e,
  query: t,
  onQueryChange: a,
  selectedCount: l,
  onAdd: n,
  onDeleteSelected: s,
  filteredRows: c,
  showExport: g = !0,
  actions: h = [],
  actionContext: N = {},
  showColumnVisibility: d = !1,
  visibilityColumns: m = [],
  hiddenColumnKeys: x = [],
  onHiddenColumnKeysChange: f,
  t: b
}) {
  const [I, K] = T(!1);
  function G(p) {
    f(
      (S) => S.includes(p) ? S.filter((k) => k !== p) : [...S, p]
    );
  }
  return /* @__PURE__ */ u("div", { className: "space-y-6 px-5 py-4", children: [
    /* @__PURE__ */ u("div", { className: "flex flex-wrap items-center gap-2", children: [
      e.searchable && /* @__PURE__ */ r(
        st,
        {
          value: t,
          onChange: (p) => a(p.target.value),
          placeholder: b("search"),
          className: "min-w-0 flex-1"
        }
      ),
      /* @__PURE__ */ u("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        Array.isArray(h) && h.map((p, S) => /* @__PURE__ */ u(
          H,
          {
            variant: p.variant ?? "secondary",
            title: p.label,
            onClick: () => {
              var k;
              return (k = p.onClick) == null ? void 0 : k.call(p, N);
            },
            children: [
              p.icon,
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: p.label })
            ]
          },
          p.key ?? p.id ?? p.label ?? S
        )),
        e.addable && /* @__PURE__ */ u(H, { variant: "primary", onClick: n, children: [
          /* @__PURE__ */ r(rt, { className: "h-4 w-4" }),
          b("add")
        ] })
      ] })
    ] }),
    (g || d || e.deletable && e.multiDelete && l > 0) && /* @__PURE__ */ u("div", { className: "flex min-h-8 items-center justify-between gap-2", children: [
      /* @__PURE__ */ r("div", { children: e.deletable && e.multiDelete && l > 0 && /* @__PURE__ */ u(H, { variant: "danger", onClick: s, children: [
        /* @__PURE__ */ r(re, { className: "h-4 w-4" }),
        b("deleteSelected"),
        " (",
        l,
        ")"
      ] }) }),
      /* @__PURE__ */ u("div", { className: "flex items-center gap-2", children: [
        g && /* @__PURE__ */ u(
          H,
          {
            variant: "secondary",
            title: b("export"),
            onClick: () => St(`${e.title ?? "data"}.csv`, Fe(c, e.columns)),
            children: [
              /* @__PURE__ */ r(Be, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: b("export") })
            ]
          }
        ),
        d && m.length > 0 && /* @__PURE__ */ u("div", { className: "relative", children: [
          /* @__PURE__ */ r(H, { variant: "secondary", title: b("columns"), onClick: () => K((p) => !p), children: /* @__PURE__ */ r(Ye, { className: "h-4 w-4" }) }),
          I && /* @__PURE__ */ u("div", { className: "absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950", children: [
            /* @__PURE__ */ r("p", { className: "px-2 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400", children: b("showColumns") }),
            m.map((p) => /* @__PURE__ */ u("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900", children: [
              /* @__PURE__ */ r("input", { type: "checkbox", checked: !x.includes(p.key), onChange: () => G(p.key), className: "h-4 w-4 accent-blue-600" }),
              /* @__PURE__ */ r("span", { className: "truncate", children: p.label })
            ] }, p.key))
          ] })
        ] })
      ] })
    ] })
  ] });
}
const At = {
  table: nt,
  list: tt,
  cards: et
}, we = { table: "viewTable", list: "viewList", cards: "viewCards" };
function Dt({ viewModes: e, view: t, onViewChange: a, t: l }) {
  return !Array.isArray(e) || e.length <= 1 ? null : /* @__PURE__ */ r("div", { className: "flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-800", children: e.map((n) => {
    const s = At[n], c = t === n;
    return /* @__PURE__ */ u(
      "button",
      {
        title: l(we[n]),
        onClick: () => a(n),
        className: E(
          "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          c ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        ),
        children: [
          /* @__PURE__ */ r(s, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ r("span", { className: "hidden sm:inline", children: l(we[n]) })
        ]
      },
      n
    );
  }) });
}
function Vt({
  config: e,
  locale: t,
  onChange: a,
  className: l,
  viewModes: n,
  showExport: s,
  hideHeader: c,
  fieldSearch: g,
  actions: h,
  onDeleteSelected: N
}) {
  const d = ie(() => {
    const o = Te(e);
    if (Array.isArray(n) && n.length > 0) {
      const y = n.filter((v) => ce.includes(v));
      y.length > 0 && (o.viewModes = y, y.includes(o.defaultView) || (o.defaultView = y[0]));
    }
    return typeof s == "boolean" && (o.exportable = s), typeof c == "boolean" && (o.hideHeader = c), g !== void 0 && (o.fieldSearch = g, o.fieldSearchKeys = Ne(g, o.columns)), Array.isArray(h) && (o.actions = h), o;
  }, [e, n, s, c, g, h]), m = t ?? e.locale ?? "pt", x = Pe(m), f = Ge(d, a), {
    visibleRows: b,
    allFilteredRows: I,
    view: K,
    setView: G,
    query: p,
    setQuery: S,
    fieldFilters: k,
    setFieldFilters: O,
    hiddenColumnKeys: L,
    setHiddenColumnKeys: P,
    selectedIds: V,
    editingRow: j,
    setEditingRow: D
  } = f, R = d.searchable || d.addable || d.exportable || d.columnVisibility || d.fieldSearchKeys.length > 0 || d.deletable && d.multiDelete || Array.isArray(d.actions) && d.actions.length > 0, z = d.viewModes.includes(K) ? K : d.viewModes[0], q = !d.hideHeader && (d.title || d.description), U = q || d.viewModes.length > 1;
  function i(o) {
    window.confirm(x("confirmDelete")) && f.deleteRow(o);
  }
  function w() {
    const o = f.rows.filter(
      (v, C) => V.includes(F(v, d.idKey, C))
    ), y = N ?? d.onDeleteSelected;
    (y == null ? void 0 : y({ rows: o, selectedIds: V })) !== !1 && f.deleteSelected();
  }
  const M = {
    rows: I,
    selectedIds: V,
    query: p
  };
  return /* @__PURE__ */ u(Re, { className: l, children: [
    U && /* @__PURE__ */ r(
      qe,
      {
        title: q ? d.title : void 0,
        description: q ? d.description ?? `${f.total} ${x("rows")}` : void 0,
        actions: /* @__PURE__ */ r(
          Dt,
          {
            viewModes: d.viewModes,
            view: z,
            onViewChange: G,
            t: x
          }
        )
      }
    ),
    R && /* @__PURE__ */ r(
      Ct,
      {
        config: d,
        query: p,
        onQueryChange: S,
        selectedCount: V.length,
        onAdd: () => D({ mode: "create", row: {} }),
        onDeleteSelected: w,
        filteredRows: I,
        showExport: d.exportable,
        actions: d.actions,
        actionContext: M,
        showColumnVisibility: z === "table" && d.columnVisibility,
        visibilityColumns: d.columns.filter((o) => !o.description && !o.subGrid),
        hiddenColumnKeys: L,
        onHiddenColumnKeysChange: P,
        t: x
      }
    ),
    V.length > 0 && /* @__PURE__ */ u("p", { className: "px-5 pb-1 text-xs text-gray-500 dark:text-gray-400", children: [
      V.length,
      " ",
      x("selected")
    ] }),
    z === "table" && /* @__PURE__ */ r(
      Nt,
      {
        config: d,
        rows: b,
        locale: m,
        sortKey: f.sortKey,
        sortDir: f.sortDir,
        onToggleSort: f.toggleSort,
        fieldFilters: k,
        onFieldFiltersChange: O,
        hiddenColumnKeys: L,
        selectedIds: V,
        onToggleSelect: f.toggleSelect,
        onToggleSelectAll: f.toggleSelectAll,
        onEdit: (o) => D({ mode: "edit", row: o }),
        onDelete: i,
        t: x
      }
    ),
    z === "list" && /* @__PURE__ */ r(
      kt,
      {
        config: d,
        rows: b,
        locale: m,
        onEdit: (o) => D({ mode: "edit", row: o }),
        onDelete: i,
        t: x
      }
    ),
    z === "cards" && /* @__PURE__ */ r(
      bt,
      {
        config: d,
        rows: b,
        locale: m,
        onEdit: (o) => D({ mode: "edit", row: o }),
        onDelete: i,
        t: x
      }
    ),
    d.paginated && /* @__PURE__ */ r("div", { className: "border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ r(
      ot,
      {
        page: f.page,
        totalPages: f.totalPages,
        total: f.total,
        pageSize: f.pageSize,
        onPage: f.setPage,
        t: x
      }
    ) }),
    j && /* @__PURE__ */ r(
      ft,
      {
        config: d,
        editingRow: j,
        onSave: f.saveRow,
        onClose: () => D(null),
        t: x
      }
    )
  ] });
}
export {
  Vt as DataView,
  ce as VIEW_MODES,
  Pe as createTranslator,
  ae as formatValue,
  F as getRowId,
  Te as normalizeConfig,
  Ne as resolveFieldSearchKeys
};
