import { jsx as r, jsxs as c, Fragment as J } from "react/jsx-runtime";
import { useState as E, useEffect as te, useMemo as ce, forwardRef as Ne, createElement as oe, Fragment as De } from "react";
const ue = ["table", "list", "cards"], ee = {
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
function Me(e) {
  const t = e.find((a) => a && typeof a == "object") ?? {};
  return Object.keys(t).map((a) => ({
    key: a,
    label: a,
    type: "text",
    sortable: !0,
    editable: !0
  }));
}
function Te(e, t) {
  return (Array.isArray(e) && e.length > 0 ? e : Me(t)).map((l, n) => ({
    label: l.key,
    type: "text",
    sortable: !0,
    editable: !0,
    align: "left",
    ...l,
    key: l.key ?? `col-${n}`
  }));
}
function Ve(e = {}) {
  const t = Array.isArray(e.data) ? e.data : [], a = Array.isArray(e.viewModes) && e.viewModes.length > 0 ? e.viewModes.filter((d) => ue.includes(d)) : [...ee.viewModes], l = ue.includes(e.defaultView) ? e.defaultView : a[0] ?? ee.defaultView, n = Te(e.columns, t), s = {
    ...ee,
    ...e,
    data: t,
    columns: n,
    viewModes: a.length > 0 ? a : [...ee.viewModes],
    defaultView: l
  };
  return s.multiDelete && (s.selectable = !0), s.fieldSearchKeys = Se(s.fieldSearch, n), s;
}
function Se(e, t = []) {
  return e === !0 ? t.map((a) => a.key) : Array.isArray(e) ? e.filter((a) => t.some((l) => l.key === a)) : [];
}
function z(e, t = "id", a = 0) {
  return e && e[t] !== void 0 && e[t] !== null ? String(e[t]) : `row-${a}`;
}
function je(e, t, a = []) {
  const l = String(t ?? "").trim().toLowerCase();
  return l ? e.filter((n) => (a.length > 0 ? a : Object.keys(n)).some((d) => String(n[d] ?? "").toLowerCase().includes(l))) : e;
}
function Ee(e, t = {}) {
  const a = Object.entries(t).filter(([, l]) => String(l ?? "").trim());
  return a.length === 0 ? e : e.filter(
    (l) => a.every(
      ([n, s]) => String(l[n] ?? "").toLowerCase().includes(String(s).trim().toLowerCase())
    )
  );
}
function Ke(e, t, a = "asc") {
  if (!t) return e;
  const l = a === "desc" ? -1 : 1;
  return [...e].sort((n, s) => {
    const d = n[t], g = s[t];
    return d === g ? 0 : d == null ? 1 : g == null ? -1 : typeof d == "number" && typeof g == "number" ? (d - g) * l : String(d).localeCompare(String(g)) * l;
  });
}
function Le(e, t) {
  if (!t) return [];
  const a = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    const n = l[t], s = n == null || n === "" ? "__empty__" : String(n);
    a.has(s) || a.set(s, { key: s, value: n, rows: [] }), a.get(s).rows.push(l);
  }), [...a.values()];
}
function Fe(e, t = 1, a = 8) {
  const l = e.length, n = Math.max(1, Math.ceil(l / a)), s = Math.min(Math.max(1, t), n), d = (s - 1) * a;
  return {
    page: s,
    totalPages: n,
    total: l,
    rows: e.slice(d, d + a)
  };
}
function Ie(e, t) {
  const a = t.map((n) => n.label ?? n.key).join(";"), l = e.map(
    (n) => t.map((s) => JSON.stringify(n[s.key] ?? "")).join(";")
  );
  return [a, ...l].join(`
`);
}
function Ge(e, t = 250) {
  const [a, l] = E(e);
  return te(() => {
    const n = setTimeout(() => l(e), t);
    return () => clearTimeout(n);
  }, [e, t]), a;
}
function ze(e, t) {
  const [a, l] = E(e.data), [n, s] = E(e.defaultView), [d, g] = E(""), [u, S] = E({}), [b, h] = E(e.hiddenColumns ?? []), [V, o] = E(null), [x, D] = E("asc"), [k, G] = E(1), [m, N] = E([]), [v, H] = E(null), [R, P] = E(e.pageSize);
  te(() => {
    l(e.data), G(1), N([]), H(null), S({}), h(e.hiddenColumns ?? []);
  }, [e.data]), te(() => {
    s(e.defaultView), P(e.pageSize);
  }, [e.defaultView, e.pageSize]);
  const q = Ge(d), L = ce(() => {
    const p = je(a, q, e.searchKeys ?? []), y = Ee(p, u);
    return Ke(y, V, x);
  }, [a, q, u, e.searchKeys, V, x]), I = ce(() => e.paginated ? Fe(L, k, R) : { page: 1, totalPages: 1, total: L.length, rows: L }, [L, e.paginated, k, R]);
  te(() => {
    k !== I.page && G(I.page);
  }, [k, I.page]);
  function K(p) {
    l(p), t == null || t(p);
  }
  function Q(p) {
    V !== p ? (o(p), D("asc")) : D((y) => y === "asc" ? "desc" : "asc");
  }
  function $(p) {
    N(
      (y) => y.includes(p) ? y.filter((C) => C !== p) : [...y, p]
    );
  }
  function W(p) {
    const y = p.map((A, _) => z(A, e.idKey, _)), C = y.every((A) => m.includes(A));
    N(C ? [] : y);
  }
  function i(p) {
    if ((v == null ? void 0 : v.mode) === "create") {
      const y = p[e.idKey] === void 0 || p[e.idKey] === "" ? { ...p, [e.idKey]: Re(a, e.idKey) } : p;
      K([...a, y]);
    } else if ((v == null ? void 0 : v.mode) === "edit") {
      const y = z(v.row, e.idKey);
      K(
        a.map(
          (C, A) => z(C, e.idKey, A) === y ? { ...C, ...p } : C
        )
      );
    }
    H(null);
  }
  function w(p) {
    const y = z(p, e.idKey);
    K(a.filter((C, A) => z(C, e.idKey, A) !== y)), N((C) => C.filter((A) => A !== y));
  }
  function j() {
    K(
      a.filter(
        (p, y) => !m.includes(z(a[y], e.idKey, y))
      )
    ), N([]);
  }
  return {
    rows: a,
    visibleRows: I.rows,
    total: I.total,
    totalPages: I.totalPages,
    page: I.page,
    view: n,
    setView: s,
    query: d,
    setQuery: g,
    fieldFilters: u,
    setFieldFilters: S,
    hiddenColumnKeys: b,
    setHiddenColumnKeys: h,
    sortKey: V,
    sortDir: x,
    toggleSort: Q,
    setPage: G,
    pageSize: R,
    setPageSize: P,
    selectedIds: m,
    toggleSelect: $,
    toggleSelectAll: W,
    editingRow: v,
    setEditingRow: H,
    saveRow: i,
    deleteRow: w,
    deleteSelected: j,
    allFilteredRows: L
  };
}
function Re(e, t) {
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
}, de = { pt: Oe, en: He };
function Pe(e = "pt") {
  const t = de[e] ?? de.pt;
  return (a) => t[a] ?? de.en[a] ?? a;
}
function F(...e) {
  return e.filter(Boolean).join(" ");
}
const be = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  error: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
};
function ae({ children: e, variant: t = "default", className: a }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: F(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        be[t] ?? be.default,
        a
      ),
      children: e
    }
  );
}
function ne(e, t = {}) {
  return e in t ? t[e] : "default";
}
const fe = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
};
function O({ variant: e = "secondary", className: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      className: F(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        fe[e] ?? fe.secondary,
        t
      ),
      ...a
    }
  );
}
function B({ className: e, title: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      title: t,
      "aria-label": t,
      className: F(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100",
        e
      ),
      ...a
    }
  );
}
function qe({ children: e, className: t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: F(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-gray-950",
        t
      ),
      children: e
    }
  );
}
function $e({ title: e, description: t, actions: a }) {
  return /* @__PURE__ */ c("div", { className: "flex flex-wrap items-start justify-between gap-3 p-5 pb-0", children: [
    /* @__PURE__ */ c("div", { children: [
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
const _e = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ce = (...e) => e.filter((t, a, l) => !!t && t.trim() !== "" && l.indexOf(t) === a).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ue = {
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
const Be = Ne(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: a = 2,
    absoluteStrokeWidth: l,
    className: n = "",
    children: s,
    iconNode: d,
    ...g
  }, u) => oe(
    "svg",
    {
      ref: u,
      ...Ue,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: l ? Number(a) * 24 / Number(t) : a,
      className: Ce("lucide", n),
      ...g
    },
    [
      ...d.map(([S, b]) => oe(S, b)),
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
const T = (e, t) => {
  const a = Ne(
    ({ className: l, ...n }, s) => oe(Be, {
      ref: s,
      iconNode: t,
      className: Ce(`lucide-${_e(e)}`, l),
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
const Qe = T("ArrowDownToLine", [
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
const We = T("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = T("ArrowUpDown", [
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
const Je = T("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = T("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = T("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = T("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = T("Columns3", [
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
const et = T("Inbox", [
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
const tt = T("LayoutGrid", [
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
const rt = T("List", [
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
const me = T("Pencil", [
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
const at = T("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = T("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lt = T("Table2", [
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
const le = T("Trash2", [
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
const st = T("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function re({ title: e, hint: t, action: a }) {
  return /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", children: [
    /* @__PURE__ */ r("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-900", children: /* @__PURE__ */ r(et, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ r("p", { className: "font-medium text-gray-900 dark:text-gray-100", children: e }),
    t && /* @__PURE__ */ r("p", { className: "max-w-sm text-sm text-gray-500 dark:text-gray-400", children: t }),
    a && /* @__PURE__ */ r("div", { className: "mt-2", children: a })
  ] });
}
function pe({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "input",
    {
      className: F(
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        e
      ),
      ...t
    }
  );
}
function it({ value: e, onChange: t, placeholder: a, className: l }) {
  return /* @__PURE__ */ c("div", { className: F("relative", l), children: [
    /* @__PURE__ */ r(nt, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
    /* @__PURE__ */ r(pe, { value: e, onChange: t, placeholder: a, className: "pl-9" })
  ] });
}
function dt({ className: e, children: t, ...a }) {
  return /* @__PURE__ */ r(
    "select",
    {
      className: F(
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
function ct({ label: e, children: t, hint: a }) {
  return /* @__PURE__ */ c("label", { className: "block", children: [
    /* @__PURE__ */ r("span", { className: "mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400", children: e }),
    t,
    a && /* @__PURE__ */ r("span", { className: "mt-1 block text-xs text-gray-400 dark:text-gray-500", children: a })
  ] });
}
function ot({ title: e, children: t, footer: a, onClose: l }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
      onMouseDown: (n) => {
        n.target === n.currentTarget && (l == null || l());
      },
      children: /* @__PURE__ */ c("div", { className: "w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950", children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800", children: [
          /* @__PURE__ */ r("h3", { className: "font-semibold text-gray-900 dark:text-gray-50", children: e }),
          /* @__PURE__ */ r(B, { title: "Fechar", onClick: l, children: /* @__PURE__ */ r(st, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ r("div", { className: "max-h-[70vh] overflow-y-auto px-5 py-4", children: t }),
        a && /* @__PURE__ */ r("div", { className: "flex justify-end gap-2 border-t border-gray-100 px-5 py-4 dark:border-gray-800", children: a })
      ] })
    }
  );
}
function ut({ page: e, totalPages: t, total: a, pageSize: l, onPage: n, t: s }) {
  const d = a === 0 ? 0 : (e - 1) * l + 1, g = Math.min(a, e * l);
  return /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center justify-between gap-3 px-5 py-3", children: [
    /* @__PURE__ */ c("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
      s("showing"),
      " ",
      d,
      "–",
      g,
      " ",
      s("of"),
      " ",
      a,
      " ",
      s("rows")
    ] }),
    /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ r(O, { variant: "ghost", disabled: e <= 1, onClick: () => n(e - 1), children: /* @__PURE__ */ r(Ye, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ c("span", { className: "px-2 text-xs font-medium text-gray-600 dark:text-gray-300", children: [
        e,
        " / ",
        t
      ] }),
      /* @__PURE__ */ r(O, { variant: "ghost", disabled: e >= t, onClick: () => n(e + 1), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function yt({ children: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: F("w-full overflow-x-auto", t), children: e });
}
function ht({ children: e }) {
  return /* @__PURE__ */ r("table", { className: "w-full text-sm", children: e });
}
function mt({ children: e, filterRow: t }) {
  return /* @__PURE__ */ c("thead", { children: [
    /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:text-gray-400", children: e }),
    t && /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/30", children: t })
  ] });
}
function X({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("th", { className: F("px-4 py-2.5 font-medium", t), ...a, children: e });
}
function pt({ children: e }) {
  return /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: e });
}
function Z({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r(
    "tr",
    {
      className: F(
        "transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/60",
        t
      ),
      ...a,
      children: e
    }
  );
}
function U({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("td", { className: F("px-4 py-3 text-gray-700 dark:text-gray-200", t), ...a, children: e });
}
function se(e, t = {}, a = "pt") {
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
        const s = Number(e), d = Math.abs(s) <= 1 && s !== 0 ? s : s / 100;
        return new Intl.NumberFormat(l, { style: "percent", maximumFractionDigits: 1 }).format(
          d
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
function gt(e, t = {}) {
  if (e == null) return "";
  if ((t.type === "date" || t.type === "datetime") && e) {
    const a = new Date(e);
    if (Number.isNaN(a.getTime())) return String(e);
    if (t.type === "date") return a.toISOString().slice(0, 10);
  }
  return t.type === "boolean" ? !!e : e;
}
function bt(e, t = {}) {
  if (t.type === "number" || t.type === "currency" || t.type === "percent") {
    if (e === "" || e === null) return null;
    const a = Number(String(e).replace(",", "."));
    return Number.isNaN(a) ? e : a;
  }
  return t.type === "boolean" ? e === !0 || e === "true" || e === "on" : e;
}
function ie(e = {}, t) {
  var a;
  return e ? ((a = e.templates) == null ? void 0 : a[t]) ?? e.template ?? null : null;
}
function ge(e, t, a) {
  if (typeof e != "function") return t;
  try {
    return e(t, a);
  } catch {
    return t;
  }
}
function ke({ row: e, column: t, locale: a }) {
  const l = ie(t, "cards");
  return l != null ? /* @__PURE__ */ r(J, { children: ge(l, e[t.key], "cards") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ae, { variant: ne(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(J, { children: se(e[t.key], t, a) });
}
function ft({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(re, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [d, ...g] = e.columns;
  return /* @__PURE__ */ r("div", { className: "grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-3", children: t.map((u, S) => {
    const b = z(u, e.idKey, S);
    return /* @__PURE__ */ c(
      "article",
      {
        className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        children: [
          /* @__PURE__ */ c("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ r("h4", { className: "truncate text-sm font-semibold text-gray-900 dark:text-gray-50", children: d ? /* @__PURE__ */ r(ke, { row: u, column: d, locale: a }) : b }),
            /* @__PURE__ */ c("div", { className: "flex shrink-0 gap-1", children: [
              e.editable && /* @__PURE__ */ r(B, { title: s("edit"), onClick: () => l(u), children: /* @__PURE__ */ r(me, { className: "h-4 w-4" }) }),
              e.deletable && /* @__PURE__ */ r(B, { title: s("delete"), onClick: () => n(u), children: /* @__PURE__ */ r(le, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ r("dl", { className: "mt-3 space-y-1.5", children: g.slice(0, 5).map((h) => /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ r("dt", { className: "shrink-0 text-xs text-gray-500 dark:text-gray-400", children: h.label }),
            /* @__PURE__ */ r("dd", { className: "truncate text-right text-gray-800 dark:text-gray-200", children: /* @__PURE__ */ r(ke, { row: u, column: h, locale: a }) })
          ] }, h.key)) })
        ]
      },
      b
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
    return /* @__PURE__ */ c(dt, { value: t, onChange: (n) => a(n.target.value), className: "w-full", children: [
      /* @__PURE__ */ r("option", { value: "", children: "—" }),
      (e.options ?? []).map((n) => /* @__PURE__ */ r("option", { value: String(n), children: String(n) }, String(n)))
    ] });
  const l = e.type === "number" || e.type === "currency" || e.type === "percent" ? "number" : e.type === "date" ? "date" : "text";
  return /* @__PURE__ */ r(pe, { type: l, value: t, onChange: (n) => a(n.target.value), className: "w-full" });
}
function kt({ config: e, editingRow: t, onSave: a, onClose: l, t: n }) {
  const s = e.columns.filter((b) => b.editable !== !1), [d, g] = E(() => {
    const b = (t == null ? void 0 : t.row) ?? {};
    return Object.fromEntries(
      s.map((h) => [h.key, gt(b[h.key], h)])
    );
  });
  if (!t) return null;
  const u = t.mode === "create";
  function S(b) {
    b.preventDefault();
    const h = Object.fromEntries(
      s.map((V) => [V.key, bt(d[V.key], V)])
    );
    a(u ? h : { ...t.row, ...h });
  }
  return /* @__PURE__ */ r(
    ot,
    {
      title: n(u ? "createTitle" : "editTitle"),
      onClose: l,
      footer: /* @__PURE__ */ c(J, { children: [
        /* @__PURE__ */ r(O, { variant: "secondary", onClick: l, children: n("cancel") }),
        /* @__PURE__ */ r(O, { variant: "primary", onClick: S, children: n("save") })
      ] }),
      children: /* @__PURE__ */ r("form", { onSubmit: S, className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: s.map((b) => /* @__PURE__ */ r(ct, { label: b.label, children: /* @__PURE__ */ r(
        xt,
        {
          column: b,
          value: d[b.key] ?? "",
          onChange: (h) => g((V) => ({ ...V, [b.key]: h }))
        }
      ) }, b.key)) })
    }
  );
}
function we({ row: e, column: t, locale: a }) {
  const l = ie(t, "list");
  return l != null ? /* @__PURE__ */ r(J, { children: ge(l, e[t.key], "list") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ae, { variant: ne(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(J, { children: se(e[t.key], t, a) });
}
function wt({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(re, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [d, ...g] = e.columns;
  return /* @__PURE__ */ r("ul", { className: "divide-y divide-gray-100 px-5 dark:divide-gray-800", children: t.map((u, S) => {
    const b = z(u, e.idKey, S);
    return /* @__PURE__ */ c("li", { className: "flex items-center gap-4 py-3", children: [
      /* @__PURE__ */ r("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300", children: String(u[d == null ? void 0 : d.key] ?? "?").slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ c("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ r("p", { className: "truncate text-sm font-medium text-gray-900 dark:text-gray-50", children: d ? /* @__PURE__ */ r(we, { row: u, column: d, locale: a }) : b }),
        /* @__PURE__ */ r("div", { className: "mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5", children: g.slice(0, 4).map(
          (h) => (h.type === "badge" || h.render === "badge") && ie(h, "list") == null ? /* @__PURE__ */ r(ae, { variant: ne(u[h.key], h.badgeMap), children: String(u[h.key]) }, h.key) : /* @__PURE__ */ r("span", { className: "truncate text-xs text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r(we, { row: u, column: h, locale: a }) }, h.key)
        ) })
      ] }),
      /* @__PURE__ */ c("div", { className: "flex shrink-0 gap-1", children: [
        e.editable && /* @__PURE__ */ r(B, { title: s("edit"), onClick: () => l(u), children: /* @__PURE__ */ r(me, { className: "h-4 w-4" }) }),
        e.deletable && /* @__PURE__ */ r(B, { title: s("delete"), onClick: () => n(u), children: /* @__PURE__ */ r(le, { className: "h-4 w-4" }) })
      ] })
    ] }, b);
  }) });
}
function vt({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ r(Je, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ r(We, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ r(Xe, { className: "h-3.5 w-3.5 opacity-40" });
}
function he({ row: e, column: t, locale: a }) {
  const l = e[t.key], n = ie(t, "table");
  if (n != null)
    return /* @__PURE__ */ r("span", { children: ge(n, l, "table") });
  if (t.render === "badge" || t.type === "badge")
    return /* @__PURE__ */ r(ae, { variant: ne(l, t.badgeMap), children: String(l) });
  const s = t.align === "right" ? "text-right" : t.align === "center" ? "text-center" : "";
  return /* @__PURE__ */ r("span", { className: s, children: se(l, t, a) });
}
function Nt({ column: e, rows: t, locale: a, showTitle: l = !0 }) {
  if (!Array.isArray(t) || t.length === 0) return null;
  const n = e.subGrid === !0 ? {} : e.subGrid, s = Array.isArray(n == null ? void 0 : n.columns) && n.columns.length > 0 ? n.columns : Object.keys(t[0] ?? {}).map((d) => ({ key: d, label: d, type: "text" }));
  return /* @__PURE__ */ c("div", { className: "overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950", children: [
    l && ((n == null ? void 0 : n.title) ?? e.label) && /* @__PURE__ */ r("p", { className: "border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:border-gray-800 dark:text-gray-300", children: (n == null ? void 0 : n.title) ?? e.label }),
    /* @__PURE__ */ c("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ r("thead", { className: "bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400", children: /* @__PURE__ */ r("tr", { children: s.map((d) => /* @__PURE__ */ r("th", { className: "px-3 py-2 font-medium", children: d.label ?? d.key }, d.key)) }) }),
      /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: t.map((d, g) => /* @__PURE__ */ r("tr", { children: s.map((u) => /* @__PURE__ */ r("td", { className: "px-3 py-2 text-gray-700 dark:text-gray-200", children: /* @__PURE__ */ r(he, { row: d, column: u, locale: a }) }, u.key)) }, d[(n == null ? void 0 : n.idKey) ?? "id"] ?? g)) })
    ] })
  ] });
}
function St({
  config: e,
  rows: t,
  locale: a,
  sortKey: l,
  sortDir: n,
  onToggleSort: s,
  fieldFilters: d,
  onFieldFiltersChange: g,
  hiddenColumnKeys: u = [],
  selectedIds: S,
  onToggleSelect: b,
  onToggleSelectAll: h,
  onEdit: V,
  onDelete: o,
  t: x
}) {
  const [D, k] = E([]), [G, m] = E([]);
  if (e.columns.length === 0) return /* @__PURE__ */ r(re, { title: x("noColumns") });
  const N = e.editable || e.deletable, v = e.columns.find((i) => i.description === !0), H = e.columns.filter((i) => i.subGrid), R = e.columns.filter(
    (i) => i !== v && !H.includes(i) && !u.includes(i.key)
  ), P = e.columns.find((i) => i.key === e.groupBy), q = P ? Le(t, P.key) : null, L = R.length + Number(e.selectable) + Number(N), I = t.map((i, w) => z(i, e.idKey, w)), K = I.length > 0 && I.every((i) => S.includes(i));
  function Q(i) {
    k(
      (w) => w.includes(i) ? w.filter((j) => j !== i) : [...w, i]
    );
  }
  function $(i) {
    m(
      (w) => w.includes(i) ? w.filter((j) => j !== i) : [...w, i]
    );
  }
  function W(i, w) {
    const j = z(i, e.idKey, w), p = v && i[v.key] != null && i[v.key] !== "";
    return /* @__PURE__ */ c(De, { children: [
      /* @__PURE__ */ c(Z, { children: [
        e.selectable && /* @__PURE__ */ r(U, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            checked: S.includes(j),
            onChange: () => b(j),
            className: "h-4 w-4 accent-blue-600"
          }
        ) }),
        R.map((y) => /* @__PURE__ */ r(U, { children: /* @__PURE__ */ r(he, { row: i, column: y, locale: a }) }, y.key)),
        N && /* @__PURE__ */ r(U, { className: "text-right", children: /* @__PURE__ */ c("div", { className: "flex justify-end gap-1", children: [
          e.editable && /* @__PURE__ */ r(B, { title: x("edit"), onClick: () => V(i), children: /* @__PURE__ */ r(me, { className: "h-4 w-4" }) }),
          e.deletable && /* @__PURE__ */ r(B, { title: x("delete"), onClick: () => o(i), children: /* @__PURE__ */ r(le, { className: "h-4 w-4" }) })
        ] }) })
      ] }),
      p && /* @__PURE__ */ r(Z, { className: "hover:bg-transparent", children: /* @__PURE__ */ r(U, { colSpan: L, className: "pt-0 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r("span", { className: "block border-l-2 border-blue-200 pl-3 dark:border-blue-900", children: /* @__PURE__ */ r(he, { row: i, column: v, locale: a }) }) }) }),
      H.map((y) => {
        const C = i[y.key];
        if (!Array.isArray(C) || C.length === 0) return null;
        const A = y.subGrid === !0 ? {} : y.subGrid, _ = `${j}-${y.key}`, f = (A == null ? void 0 : A.collapsible) !== !1, M = f && !G.includes(_), Y = (A == null ? void 0 : A.title) ?? y.label;
        return /* @__PURE__ */ r(Z, { className: "hover:bg-transparent", children: /* @__PURE__ */ r(U, { colSpan: L, className: "pt-0", children: /* @__PURE__ */ c("div", { className: "mt-2", children: [
          f && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => $(_),
              className: "mb-2 flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
              children: [
                M ? /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
                Y,
                /* @__PURE__ */ c("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                  C.length,
                  " ",
                  x("items")
                ] })
              ]
            }
          ),
          !M && /* @__PURE__ */ r(Nt, { column: y, rows: C, locale: a, showTitle: !f })
        ] }) }) }, _);
      })
    ] }, j);
  }
  return /* @__PURE__ */ r(yt, { children: /* @__PURE__ */ c(ht, { children: [
    /* @__PURE__ */ c(
      mt,
      {
        filterRow: e.fieldSearchKeys.length > 0 && /* @__PURE__ */ c(J, { children: [
          e.selectable && /* @__PURE__ */ r(X, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2" }),
          R.map((i) => /* @__PURE__ */ r(X, { children: e.fieldSearchKeys.includes(i.key) && /* @__PURE__ */ r(
            pe,
            {
              value: d[i.key] ?? "",
              onChange: (w) => g((j) => ({
                ...j,
                [i.key]: w.target.value
              })),
              placeholder: `${i.label}…`,
              className: "min-w-24 py-1.5 normal-case"
            }
          ) }, i.key)),
          N && /* @__PURE__ */ r(X, {})
        ] }),
        children: [
          e.selectable && /* @__PURE__ */ r(X, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
            "input",
            {
              type: "checkbox",
              checked: K,
              onChange: () => h(t),
              className: "h-4 w-4 accent-blue-600"
            }
          ) }),
          R.map((i) => /* @__PURE__ */ r(
            X,
            {
              className: F(i.align === "right" && "text-right", i.align === "center" && "text-center"),
              children: e.sortable && i.sortable !== !1 ? /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => s(i.key),
                  className: "inline-flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100",
                  children: [
                    i.label,
                    /* @__PURE__ */ r(vt, { active: l === i.key, dir: n })
                  ]
                }
              ) : i.label
            },
            i.key
          )),
          N && /* @__PURE__ */ r(X, { className: "text-right", children: x("edit") })
        ]
      }
    ),
    /* @__PURE__ */ r(pt, { children: t.length === 0 ? /* @__PURE__ */ r(Z, { children: /* @__PURE__ */ r(U, { colSpan: L, className: "p-0", children: /* @__PURE__ */ r(re, { title: x("emptyTitle"), hint: x("emptyHint") }) }) }) : q ? q.flatMap((i) => {
      const w = D.includes(i.key), j = i.key === "__empty__" ? x("emptyGroup") : se(i.value, P, a);
      return [
        /* @__PURE__ */ r(Z, { className: "bg-gray-50 hover:bg-gray-50 dark:bg-gray-900/70 dark:hover:bg-gray-900/70", children: /* @__PURE__ */ r(U, { colSpan: L, className: "p-0", children: /* @__PURE__ */ c(
          "button",
          {
            className: "flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300",
            onClick: () => Q(i.key),
            children: [
              w ? /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
              x("group"),
              ": ",
              j,
              /* @__PURE__ */ c("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                i.rows.length,
                " ",
                x("items")
              ] })
            ]
          }
        ) }) }, `group-${i.key}`),
        ...w ? [] : i.rows.map((p) => W(p, t.indexOf(p)))
      ];
    }) : t.map(W) })
  ] }) });
}
function Ct(e, t) {
  const a = new Blob([t], { type: "text/csv;charset=utf-8" }), l = URL.createObjectURL(a), n = document.createElement("a");
  n.href = l, n.download = e, n.click(), URL.revokeObjectURL(l);
}
function At({
  config: e,
  query: t,
  onQueryChange: a,
  selectedCount: l,
  onAdd: n,
  onDeleteSelected: s,
  filteredRows: d,
  showExport: g = !0,
  actions: u = [],
  actionContext: S = {},
  showColumnVisibility: b = !1,
  visibilityColumns: h = [],
  hiddenColumnKeys: V = [],
  onHiddenColumnKeysChange: o,
  t: x
}) {
  const [D, k] = E(!1);
  function G(m) {
    o(
      (N) => N.includes(m) ? N.filter((v) => v !== m) : [...N, m]
    );
  }
  return /* @__PURE__ */ c("div", { className: "space-y-6 px-5 py-4", children: [
    /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center gap-2", children: [
      e.searchable && /* @__PURE__ */ r(
        it,
        {
          value: t,
          onChange: (m) => a(m.target.value),
          placeholder: x("search"),
          className: "min-w-0 flex-1"
        }
      ),
      /* @__PURE__ */ c("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        Array.isArray(u) && u.map((m, N) => /* @__PURE__ */ c(
          O,
          {
            variant: m.variant ?? "secondary",
            title: m.label,
            onClick: () => {
              var v;
              return (v = m.onClick) == null ? void 0 : v.call(m, S);
            },
            children: [
              m.icon,
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: m.label })
            ]
          },
          m.key ?? m.id ?? m.label ?? N
        )),
        e.addable && /* @__PURE__ */ c(O, { variant: "primary", onClick: n, children: [
          /* @__PURE__ */ r(at, { className: "h-4 w-4" }),
          x("add")
        ] })
      ] })
    ] }),
    (g || b || e.deletable && e.multiDelete && l > 0) && /* @__PURE__ */ c("div", { className: "flex min-h-8 items-center justify-between gap-2", children: [
      /* @__PURE__ */ r("div", { children: e.deletable && e.multiDelete && l > 0 && /* @__PURE__ */ c(O, { variant: "danger", onClick: s, children: [
        /* @__PURE__ */ r(le, { className: "h-4 w-4" }),
        x("deleteSelected"),
        " (",
        l,
        ")"
      ] }) }),
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
        g && /* @__PURE__ */ c(
          O,
          {
            variant: "secondary",
            title: x("export"),
            onClick: () => Ct(`${e.title ?? "data"}.csv`, Ie(d, e.columns)),
            children: [
              /* @__PURE__ */ r(Qe, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: x("export") })
            ]
          }
        ),
        b && h.length > 0 && /* @__PURE__ */ c("div", { className: "relative", children: [
          /* @__PURE__ */ r(O, { variant: "secondary", title: x("columns"), onClick: () => k((m) => !m), children: /* @__PURE__ */ r(Ze, { className: "h-4 w-4" }) }),
          D && /* @__PURE__ */ c("div", { className: "absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950", children: [
            /* @__PURE__ */ r("p", { className: "px-2 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400", children: x("showColumns") }),
            h.map((m) => /* @__PURE__ */ c("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900", children: [
              /* @__PURE__ */ r("input", { type: "checkbox", checked: !V.includes(m.key), onChange: () => G(m.key), className: "h-4 w-4 accent-blue-600" }),
              /* @__PURE__ */ r("span", { className: "truncate", children: m.label })
            ] }, m.key))
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Dt = {
  table: lt,
  list: rt,
  cards: tt
}, ve = { table: "viewTable", list: "viewList", cards: "viewCards" };
function Mt({ viewModes: e, view: t, onViewChange: a, t: l }) {
  return !Array.isArray(e) || e.length <= 1 ? null : /* @__PURE__ */ r("div", { className: "flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-800", children: e.map((n) => {
    const s = Dt[n], d = t === n;
    return /* @__PURE__ */ c(
      "button",
      {
        title: l(ve[n]),
        onClick: () => a(n),
        className: F(
          "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          d ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        ),
        children: [
          /* @__PURE__ */ r(s, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ r("span", { className: "hidden sm:inline", children: l(ve[n]) })
        ]
      },
      n
    );
  }) });
}
function jt({
  config: e,
  locale: t,
  onChange: a,
  className: l,
  viewModes: n,
  showExport: s,
  hideHeader: d,
  fieldSearch: g,
  actions: u,
  onDeleteSelected: S,
  onEditRow: b,
  onAddRow: h,
  onDeleteRow: V
}) {
  const o = ce(() => {
    const f = Ve(e);
    if (Array.isArray(n) && n.length > 0) {
      const M = n.filter((Y) => ue.includes(Y));
      M.length > 0 && (f.viewModes = M, M.includes(f.defaultView) || (f.defaultView = M[0]));
    }
    return typeof s == "boolean" && (f.exportable = s), typeof d == "boolean" && (f.hideHeader = d), g !== void 0 && (f.fieldSearch = g, f.fieldSearchKeys = Se(g, f.columns)), Array.isArray(u) && (f.actions = u), f;
  }, [e, n, s, d, g, u]), x = t ?? e.locale ?? "pt", D = Pe(x), k = ze(o, a), {
    visibleRows: G,
    allFilteredRows: m,
    view: N,
    setView: v,
    query: H,
    setQuery: R,
    fieldFilters: P,
    setFieldFilters: q,
    hiddenColumnKeys: L,
    setHiddenColumnKeys: I,
    selectedIds: K,
    editingRow: Q,
    setEditingRow: $
  } = k, W = o.searchable || o.addable || o.exportable || o.columnVisibility || o.fieldSearchKeys.length > 0 || o.deletable && o.multiDelete || Array.isArray(o.actions) && o.actions.length > 0, i = o.viewModes.includes(N) ? N : o.viewModes[0], w = !o.hideHeader && (o.title || o.description), j = w || o.viewModes.length > 1;
  function p(f) {
    const M = V ?? o.onDeleteRow;
    if (typeof M == "function") {
      M(f);
      return;
    }
    window.confirm(D("confirmDelete")) && k.deleteRow(f);
  }
  function y(f) {
    const M = b ?? o.onEditRow;
    if (typeof M == "function") {
      M(f);
      return;
    }
    $({ mode: "edit", row: f });
  }
  function C() {
    const f = h ?? o.onAddRow;
    if (typeof f == "function") {
      f();
      return;
    }
    $({ mode: "create", row: {} });
  }
  function A() {
    const f = k.rows.filter(
      (Y, Ae) => K.includes(z(Y, o.idKey, Ae))
    ), M = S ?? o.onDeleteSelected;
    (M == null ? void 0 : M({ rows: f, selectedIds: K })) !== !1 && k.deleteSelected();
  }
  const _ = {
    rows: m,
    selectedIds: K,
    query: H
  };
  return /* @__PURE__ */ c(qe, { className: l, children: [
    j && /* @__PURE__ */ r(
      $e,
      {
        title: w ? o.title : void 0,
        description: w ? o.description ?? `${k.total} ${D("rows")}` : void 0,
        actions: /* @__PURE__ */ r(
          Mt,
          {
            viewModes: o.viewModes,
            view: i,
            onViewChange: v,
            t: D
          }
        )
      }
    ),
    W && /* @__PURE__ */ r(
      At,
      {
        config: o,
        query: H,
        onQueryChange: R,
        selectedCount: K.length,
        onAdd: C,
        onDeleteSelected: A,
        filteredRows: m,
        showExport: o.exportable,
        actions: o.actions,
        actionContext: _,
        showColumnVisibility: i === "table" && o.columnVisibility,
        visibilityColumns: o.columns.filter((f) => !f.description && !f.subGrid),
        hiddenColumnKeys: L,
        onHiddenColumnKeysChange: I,
        t: D
      }
    ),
    K.length > 0 && /* @__PURE__ */ c("p", { className: "px-5 pb-1 text-xs text-gray-500 dark:text-gray-400", children: [
      K.length,
      " ",
      D("selected")
    ] }),
    i === "table" && /* @__PURE__ */ r(
      St,
      {
        config: o,
        rows: G,
        locale: x,
        sortKey: k.sortKey,
        sortDir: k.sortDir,
        onToggleSort: k.toggleSort,
        fieldFilters: P,
        onFieldFiltersChange: q,
        hiddenColumnKeys: L,
        selectedIds: K,
        onToggleSelect: k.toggleSelect,
        onToggleSelectAll: k.toggleSelectAll,
        onEdit: y,
        onDelete: p,
        t: D
      }
    ),
    i === "list" && /* @__PURE__ */ r(
      wt,
      {
        config: o,
        rows: G,
        locale: x,
        onEdit: y,
        onDelete: p,
        t: D
      }
    ),
    i === "cards" && /* @__PURE__ */ r(
      ft,
      {
        config: o,
        rows: G,
        locale: x,
        onEdit: y,
        onDelete: p,
        t: D
      }
    ),
    o.paginated && /* @__PURE__ */ r("div", { className: "border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ r(
      ut,
      {
        page: k.page,
        totalPages: k.totalPages,
        total: k.total,
        pageSize: k.pageSize,
        onPage: k.setPage,
        t: D
      }
    ) }),
    Q && /* @__PURE__ */ r(
      kt,
      {
        config: o,
        editingRow: Q,
        onSave: k.saveRow,
        onClose: () => $(null),
        t: D
      }
    )
  ] });
}
export {
  jt as DataView,
  ue as VIEW_MODES,
  Pe as createTranslator,
  se as formatValue,
  z as getRowId,
  Ve as normalizeConfig,
  Se as resolveFieldSearchKeys
};
