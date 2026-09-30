import { jsx as r, jsxs as c, Fragment as B } from "react/jsx-runtime";
import { useState as M, useEffect as Y, useMemo as ie, forwardRef as ve, createElement as de, Fragment as Ae } from "react";
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
  const t = Array.isArray(e.data) ? e.data : [], a = Array.isArray(e.viewModes) && e.viewModes.length > 0 ? e.viewModes.filter((d) => ce.includes(d)) : [...J.viewModes], l = ce.includes(e.defaultView) ? e.defaultView : a[0] ?? J.defaultView, n = Me(e.columns, t), s = {
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
function K(e, t = "id", a = 0) {
  return e && e[t] !== void 0 && e[t] !== null ? String(e[t]) : `row-${a}`;
}
function Ve(e, t, a = []) {
  const l = String(t ?? "").trim().toLowerCase();
  return l ? e.filter((n) => (a.length > 0 ? a : Object.keys(n)).some((d) => String(n[d] ?? "").toLowerCase().includes(l))) : e;
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
    const d = n[t], f = s[t];
    return d === f ? 0 : d == null ? 1 : f == null ? -1 : typeof d == "number" && typeof f == "number" ? (d - f) * l : String(d).localeCompare(String(f)) * l;
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
  const l = e.length, n = Math.max(1, Math.ceil(l / a)), s = Math.min(Math.max(1, t), n), d = (s - 1) * a;
  return {
    page: s,
    totalPages: n,
    total: l,
    rows: e.slice(d, d + a)
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
  const [a, l] = M(e);
  return Y(() => {
    const n = setTimeout(() => l(e), t);
    return () => clearTimeout(n);
  }, [e, t]), a;
}
function Ge(e, t) {
  const [a, l] = M(e.data), [n, s] = M(e.defaultView), [d, f] = M(""), [h, o] = M({}), [g, u] = M(e.hiddenColumns ?? []), [p, G] = M(null), [k, z] = M("asc"), [L, F] = M(1), [b, N] = M([]), [v, H] = M(null), [I, T] = M(e.pageSize);
  Y(() => {
    l(e.data), F(1), N([]), H(null), o({}), u(e.hiddenColumns ?? []);
  }, [e.data]), Y(() => {
    s(e.defaultView), T(e.pageSize);
  }, [e.defaultView, e.pageSize]);
  const P = Ie(d), C = ie(() => {
    const x = Ve(a, P, e.searchKeys ?? []), m = je(x, h);
    return Ee(m, p, k);
  }, [a, P, h, e.searchKeys, p, k]), j = ie(() => e.paginated ? Le(C, L, I) : { page: 1, totalPages: 1, total: C.length, rows: C }, [C, e.paginated, L, I]);
  Y(() => {
    L !== j.page && F(j.page);
  }, [L, j.page]);
  function E(x) {
    l(x), t == null || t(x);
  }
  function Q(x) {
    p !== x ? (G(x), z("asc")) : z((m) => m === "asc" ? "desc" : "asc");
  }
  function R(x) {
    N(
      (m) => m.includes(x) ? m.filter((A) => A !== x) : [...m, x]
    );
  }
  function _(x) {
    const m = x.map((D, W) => K(D, e.idKey, W)), A = m.every((D) => b.includes(D));
    N(A ? [] : m);
  }
  function i(x) {
    if ((v == null ? void 0 : v.mode) === "create") {
      const m = x[e.idKey] === void 0 || x[e.idKey] === "" ? { ...x, [e.idKey]: ze(a, e.idKey) } : x;
      E([...a, m]);
    } else if ((v == null ? void 0 : v.mode) === "edit") {
      const m = K(v.row, e.idKey);
      E(
        a.map(
          (A, D) => K(A, e.idKey, D) === m ? { ...A, ...x } : A
        )
      );
    }
    H(null);
  }
  function y(x) {
    const m = K(x, e.idKey);
    E(a.filter((A, D) => K(A, e.idKey, D) !== m)), N((A) => A.filter((D) => D !== m));
  }
  function w() {
    E(
      a.filter(
        (x, m) => !b.includes(K(a[m], e.idKey, m))
      )
    ), N([]);
  }
  return {
    rows: a,
    visibleRows: j.rows,
    total: j.total,
    totalPages: j.totalPages,
    page: j.page,
    view: n,
    setView: s,
    query: d,
    setQuery: f,
    fieldFilters: h,
    setFieldFilters: o,
    hiddenColumnKeys: g,
    setHiddenColumnKeys: u,
    sortKey: p,
    sortDir: k,
    toggleSort: Q,
    setPage: F,
    pageSize: I,
    setPageSize: T,
    selectedIds: b,
    toggleSelect: R,
    toggleSelectAll: _,
    editingRow: v,
    setEditingRow: H,
    saveRow: i,
    deleteRow: y,
    deleteSelected: w,
    allFilteredRows: C
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
function V(...e) {
  return e.filter(Boolean).join(" ");
}
const pe = {
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
      className: V(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        pe[t] ?? pe.default,
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
function O({ variant: e = "secondary", className: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      className: V(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        be[e] ?? be.secondary,
        t
      ),
      ...a
    }
  );
}
function $({ className: e, title: t, ...a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      title: t,
      "aria-label": t,
      className: V(
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
      className: V(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-gray-950",
        t
      ),
      children: e
    }
  );
}
function qe({ title: e, description: t, actions: a }) {
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
    iconNode: d,
    ...f
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
      ...f
    },
    [
      ...d.map(([o, g]) => de(o, g)),
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
const S = (e, t) => {
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
const Be = S("ArrowDownToLine", [
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
const Qe = S("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const We = S("ArrowUpDown", [
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
const Xe = S("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = S("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = S("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = S("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = S("Columns3", [
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
const Ze = S("Inbox", [
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
const et = S("LayoutGrid", [
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
const tt = S("List", [
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
const ye = S("Pencil", [
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
const rt = S("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const at = S("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = S("Table2", [
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
const re = S("Trash2", [
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
const lt = S("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function Z({ title: e, hint: t, action: a }) {
  return /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", children: [
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
      className: V(
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
  return /* @__PURE__ */ c("div", { className: V("relative", l), children: [
    /* @__PURE__ */ r(at, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
    /* @__PURE__ */ r(he, { value: e, onChange: t, placeholder: a, className: "pl-9" })
  ] });
}
function it({ className: e, children: t, ...a }) {
  return /* @__PURE__ */ r(
    "select",
    {
      className: V(
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
  return /* @__PURE__ */ c("label", { className: "block", children: [
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
      children: /* @__PURE__ */ c("div", { className: "w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950", children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800", children: [
          /* @__PURE__ */ r("h3", { className: "font-semibold text-gray-900 dark:text-gray-50", children: e }),
          /* @__PURE__ */ r($, { title: "Fechar", onClick: l, children: /* @__PURE__ */ r(lt, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ r("div", { className: "max-h-[70vh] overflow-y-auto px-5 py-4", children: t }),
        a && /* @__PURE__ */ r("div", { className: "flex justify-end gap-2 border-t border-gray-100 px-5 py-4 dark:border-gray-800", children: a })
      ] })
    }
  );
}
function ot({ page: e, totalPages: t, total: a, pageSize: l, onPage: n, t: s }) {
  const d = a === 0 ? 0 : (e - 1) * l + 1, f = Math.min(a, e * l);
  return /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center justify-between gap-3 px-5 py-3", children: [
    /* @__PURE__ */ c("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
      s("showing"),
      " ",
      d,
      "–",
      f,
      " ",
      s("of"),
      " ",
      a,
      " ",
      s("rows")
    ] }),
    /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ r(O, { variant: "ghost", disabled: e <= 1, onClick: () => n(e - 1), children: /* @__PURE__ */ r(Je, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ c("span", { className: "px-2 text-xs font-medium text-gray-600 dark:text-gray-300", children: [
        e,
        " / ",
        t
      ] }),
      /* @__PURE__ */ r(O, { variant: "ghost", disabled: e >= t, onClick: () => n(e + 1), children: /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function ut({ children: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: V("w-full overflow-x-auto", t), children: e });
}
function yt({ children: e }) {
  return /* @__PURE__ */ r("table", { className: "w-full text-sm", children: e });
}
function ht({ children: e, filterRow: t }) {
  return /* @__PURE__ */ c("thead", { children: [
    /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:text-gray-400", children: e }),
    t && /* @__PURE__ */ r("tr", { className: "border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/30", children: t })
  ] });
}
function U({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("th", { className: V("px-4 py-2.5 font-medium", t), ...a, children: e });
}
function mt({ children: e }) {
  return /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: e });
}
function X({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r(
    "tr",
    {
      className: V(
        "transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/60",
        t
      ),
      ...a,
      children: e
    }
  );
}
function q({ children: e, className: t, ...a }) {
  return /* @__PURE__ */ r("td", { className: V("px-4 py-3 text-gray-700 dark:text-gray-200", t), ...a, children: e });
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
function pt(e, t = {}) {
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
  return l != null ? /* @__PURE__ */ r(B, { children: me(l, e[t.key], "cards") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ee, { variant: te(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(B, { children: ae(e[t.key], t, a) });
}
function bt({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(Z, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [d, ...f] = e.columns;
  return /* @__PURE__ */ r("div", { className: "grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-3", children: t.map((h, o) => {
    const g = K(h, e.idKey, o);
    return /* @__PURE__ */ c(
      "article",
      {
        className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        children: [
          /* @__PURE__ */ c("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ r("h4", { className: "truncate text-sm font-semibold text-gray-900 dark:text-gray-50", children: d ? /* @__PURE__ */ r(fe, { row: h, column: d, locale: a }) : g }),
            /* @__PURE__ */ c("div", { className: "flex shrink-0 gap-1", children: [
              e.editable && /* @__PURE__ */ r($, { title: s("edit"), onClick: () => l(h), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
              e.deletable && /* @__PURE__ */ r($, { title: s("delete"), onClick: () => n(h), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ r("dl", { className: "mt-3 space-y-1.5", children: f.slice(0, 5).map((u) => /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ r("dt", { className: "shrink-0 text-xs text-gray-500 dark:text-gray-400", children: u.label }),
            /* @__PURE__ */ r("dd", { className: "truncate text-right text-gray-800 dark:text-gray-200", children: /* @__PURE__ */ r(fe, { row: h, column: u, locale: a }) })
          ] }, u.key)) })
        ]
      },
      g
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
    return /* @__PURE__ */ c(it, { value: t, onChange: (n) => a(n.target.value), className: "w-full", children: [
      /* @__PURE__ */ r("option", { value: "", children: "—" }),
      (e.options ?? []).map((n) => /* @__PURE__ */ r("option", { value: String(n), children: String(n) }, String(n)))
    ] });
  const l = e.type === "number" || e.type === "currency" || e.type === "percent" ? "number" : e.type === "date" ? "date" : "text";
  return /* @__PURE__ */ r(he, { type: l, value: t, onChange: (n) => a(n.target.value), className: "w-full" });
}
function ft({ config: e, editingRow: t, onSave: a, onClose: l, t: n }) {
  const s = e.columns.filter((g) => g.editable !== !1), [d, f] = M(() => {
    const g = (t == null ? void 0 : t.row) ?? {};
    return Object.fromEntries(
      s.map((u) => [u.key, gt(g[u.key], u)])
    );
  });
  if (!t) return null;
  const h = t.mode === "create";
  function o(g) {
    g.preventDefault();
    const u = Object.fromEntries(
      s.map((p) => [p.key, pt(d[p.key], p)])
    );
    a(h ? u : { ...t.row, ...u });
  }
  return /* @__PURE__ */ r(
    ct,
    {
      title: n(h ? "createTitle" : "editTitle"),
      onClose: l,
      footer: /* @__PURE__ */ c(B, { children: [
        /* @__PURE__ */ r(O, { variant: "secondary", onClick: l, children: n("cancel") }),
        /* @__PURE__ */ r(O, { variant: "primary", onClick: o, children: n("save") })
      ] }),
      children: /* @__PURE__ */ r("form", { onSubmit: o, className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: s.map((g) => /* @__PURE__ */ r(dt, { label: g.label, children: /* @__PURE__ */ r(
        xt,
        {
          column: g,
          value: d[g.key] ?? "",
          onChange: (u) => f((p) => ({ ...p, [g.key]: u }))
        }
      ) }, g.key)) })
    }
  );
}
function ke({ row: e, column: t, locale: a }) {
  const l = ne(t, "list");
  return l != null ? /* @__PURE__ */ r(B, { children: me(l, e[t.key], "list") }) : t.type === "badge" || t.render === "badge" ? /* @__PURE__ */ r(ee, { variant: te(e[t.key], t.badgeMap), children: String(e[t.key]) }) : /* @__PURE__ */ r(B, { children: ae(e[t.key], t, a) });
}
function kt({ config: e, rows: t, locale: a, onEdit: l, onDelete: n, t: s }) {
  if (t.length === 0) return /* @__PURE__ */ r(Z, { title: s("emptyTitle"), hint: s("emptyHint") });
  const [d, ...f] = e.columns;
  return /* @__PURE__ */ r("ul", { className: "divide-y divide-gray-100 px-5 dark:divide-gray-800", children: t.map((h, o) => {
    const g = K(h, e.idKey, o);
    return /* @__PURE__ */ c("li", { className: "flex items-center gap-4 py-3", children: [
      /* @__PURE__ */ r("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300", children: String(h[d == null ? void 0 : d.key] ?? "?").slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ c("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ r("p", { className: "truncate text-sm font-medium text-gray-900 dark:text-gray-50", children: d ? /* @__PURE__ */ r(ke, { row: h, column: d, locale: a }) : g }),
        /* @__PURE__ */ r("div", { className: "mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5", children: f.slice(0, 4).map(
          (u) => (u.type === "badge" || u.render === "badge") && ne(u, "list") == null ? /* @__PURE__ */ r(ee, { variant: te(h[u.key], u.badgeMap), children: String(h[u.key]) }, u.key) : /* @__PURE__ */ r("span", { className: "truncate text-xs text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r(ke, { row: h, column: u, locale: a }) }, u.key)
        ) })
      ] }),
      /* @__PURE__ */ c("div", { className: "flex shrink-0 gap-1", children: [
        e.editable && /* @__PURE__ */ r($, { title: s("edit"), onClick: () => l(h), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
        e.deletable && /* @__PURE__ */ r($, { title: s("delete"), onClick: () => n(h), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
      ] })
    ] }, g);
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
  const n = e.subGrid === !0 ? {} : e.subGrid, s = Array.isArray(n == null ? void 0 : n.columns) && n.columns.length > 0 ? n.columns : Object.keys(t[0] ?? {}).map((d) => ({ key: d, label: d, type: "text" }));
  return /* @__PURE__ */ c("div", { className: "overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950", children: [
    l && ((n == null ? void 0 : n.title) ?? e.label) && /* @__PURE__ */ r("p", { className: "border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:border-gray-800 dark:text-gray-300", children: (n == null ? void 0 : n.title) ?? e.label }),
    /* @__PURE__ */ c("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ r("thead", { className: "bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400", children: /* @__PURE__ */ r("tr", { children: s.map((d) => /* @__PURE__ */ r("th", { className: "px-3 py-2 font-medium", children: d.label ?? d.key }, d.key)) }) }),
      /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: t.map((d, f) => /* @__PURE__ */ r("tr", { children: s.map((h) => /* @__PURE__ */ r("td", { className: "px-3 py-2 text-gray-700 dark:text-gray-200", children: /* @__PURE__ */ r(ue, { row: d, column: h, locale: a }) }, h.key)) }, d[(n == null ? void 0 : n.idKey) ?? "id"] ?? f)) })
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
  fieldFilters: d,
  onFieldFiltersChange: f,
  hiddenColumnKeys: h = [],
  selectedIds: o,
  onToggleSelect: g,
  onToggleSelectAll: u,
  onEdit: p,
  onDelete: G,
  t: k
}) {
  const [z, L] = M([]), [F, b] = M([]);
  if (e.columns.length === 0) return /* @__PURE__ */ r(Z, { title: k("noColumns") });
  const N = e.editable || e.deletable, v = e.columns.find((i) => i.description === !0), H = e.columns.filter((i) => i.subGrid), I = e.columns.filter(
    (i) => i !== v && !H.includes(i) && !h.includes(i.key)
  ), T = e.columns.find((i) => i.key === e.groupBy), P = T ? Ke(t, T.key) : null, C = I.length + Number(e.selectable) + Number(N), j = t.map((i, y) => K(i, e.idKey, y)), E = j.length > 0 && j.every((i) => o.includes(i));
  function Q(i) {
    L(
      (y) => y.includes(i) ? y.filter((w) => w !== i) : [...y, i]
    );
  }
  function R(i) {
    b(
      (y) => y.includes(i) ? y.filter((w) => w !== i) : [...y, i]
    );
  }
  function _(i, y) {
    const w = K(i, e.idKey, y), x = v && i[v.key] != null && i[v.key] !== "";
    return /* @__PURE__ */ c(Ae, { children: [
      /* @__PURE__ */ c(X, { children: [
        e.selectable && /* @__PURE__ */ r(q, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            checked: o.includes(w),
            onChange: () => g(w),
            className: "h-4 w-4 accent-blue-600"
          }
        ) }),
        I.map((m) => /* @__PURE__ */ r(q, { children: /* @__PURE__ */ r(ue, { row: i, column: m, locale: a }) }, m.key)),
        N && /* @__PURE__ */ r(q, { className: "text-right", children: /* @__PURE__ */ c("div", { className: "flex justify-end gap-1", children: [
          e.editable && /* @__PURE__ */ r($, { title: k("edit"), onClick: () => p(i), children: /* @__PURE__ */ r(ye, { className: "h-4 w-4" }) }),
          e.deletable && /* @__PURE__ */ r($, { title: k("delete"), onClick: () => G(i), children: /* @__PURE__ */ r(re, { className: "h-4 w-4" }) })
        ] }) })
      ] }),
      x && /* @__PURE__ */ r(X, { className: "hover:bg-transparent", children: /* @__PURE__ */ r(q, { colSpan: C, className: "pt-0 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ r("span", { className: "block border-l-2 border-blue-200 pl-3 dark:border-blue-900", children: /* @__PURE__ */ r(ue, { row: i, column: v, locale: a }) }) }) }),
      H.map((m) => {
        const A = i[m.key];
        if (!Array.isArray(A) || A.length === 0) return null;
        const D = m.subGrid === !0 ? {} : m.subGrid, W = `${w}-${m.key}`, le = (D == null ? void 0 : D.collapsible) !== !1, ge = le && !F.includes(W), Ce = (D == null ? void 0 : D.title) ?? m.label;
        return /* @__PURE__ */ r(X, { className: "hover:bg-transparent", children: /* @__PURE__ */ r(q, { colSpan: C, className: "pt-0", children: /* @__PURE__ */ c("div", { className: "mt-2", children: [
          le && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => R(W),
              className: "mb-2 flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
              children: [
                ge ? /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
                Ce,
                /* @__PURE__ */ c("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                  A.length,
                  " ",
                  k("items")
                ] })
              ]
            }
          ),
          !ge && /* @__PURE__ */ r(vt, { column: m, rows: A, locale: a, showTitle: !le })
        ] }) }) }, W);
      })
    ] }, w);
  }
  return /* @__PURE__ */ r(ut, { children: /* @__PURE__ */ c(yt, { children: [
    /* @__PURE__ */ c(
      ht,
      {
        filterRow: e.fieldSearchKeys.length > 0 && /* @__PURE__ */ c(B, { children: [
          e.selectable && /* @__PURE__ */ r(U, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2" }),
          I.map((i) => /* @__PURE__ */ r(U, { children: e.fieldSearchKeys.includes(i.key) && /* @__PURE__ */ r(
            he,
            {
              value: d[i.key] ?? "",
              onChange: (y) => f((w) => ({
                ...w,
                [i.key]: y.target.value
              })),
              placeholder: `${i.label}…`,
              className: "min-w-24 py-1.5 normal-case"
            }
          ) }, i.key)),
          N && /* @__PURE__ */ r(U, {})
        ] }),
        children: [
          e.selectable && /* @__PURE__ */ r(U, { className: "w-[30px] min-w-[30px] max-w-[30px] px-2", children: /* @__PURE__ */ r(
            "input",
            {
              type: "checkbox",
              checked: E,
              onChange: () => u(t),
              className: "h-4 w-4 accent-blue-600"
            }
          ) }),
          I.map((i) => /* @__PURE__ */ r(
            U,
            {
              className: V(i.align === "right" && "text-right", i.align === "center" && "text-center"),
              children: e.sortable && i.sortable !== !1 ? /* @__PURE__ */ c(
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
          N && /* @__PURE__ */ r(U, { className: "text-right", children: k("edit") })
        ]
      }
    ),
    /* @__PURE__ */ r(mt, { children: t.length === 0 ? /* @__PURE__ */ r(X, { children: /* @__PURE__ */ r(q, { colSpan: C, className: "p-0", children: /* @__PURE__ */ r(Z, { title: k("emptyTitle"), hint: k("emptyHint") }) }) }) : P ? P.flatMap((i) => {
      const y = z.includes(i.key), w = i.key === "__empty__" ? k("emptyGroup") : ae(i.value, T, a);
      return [
        /* @__PURE__ */ r(X, { className: "bg-gray-50 hover:bg-gray-50 dark:bg-gray-900/70 dark:hover:bg-gray-900/70", children: /* @__PURE__ */ r(q, { colSpan: C, className: "p-0", children: /* @__PURE__ */ c(
          "button",
          {
            className: "flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300",
            onClick: () => Q(i.key),
            children: [
              y ? /* @__PURE__ */ r(oe, { className: "h-4 w-4" }) : /* @__PURE__ */ r(xe, { className: "h-4 w-4" }),
              k("group"),
              ": ",
              w,
              /* @__PURE__ */ c("span", { className: "font-normal text-gray-400 dark:text-gray-500", children: [
                i.rows.length,
                " ",
                k("items")
              ] })
            ]
          }
        ) }) }, `group-${i.key}`),
        ...y ? [] : i.rows.map((x) => _(x, t.indexOf(x)))
      ];
    }) : t.map(_) })
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
  filteredRows: d,
  showExport: f = !0,
  actions: h = [],
  actionContext: o = {},
  showColumnVisibility: g = !1,
  visibilityColumns: u = [],
  hiddenColumnKeys: p = [],
  onHiddenColumnKeysChange: G,
  t: k
}) {
  const [z, L] = M(!1);
  function F(b) {
    G(
      (N) => N.includes(b) ? N.filter((v) => v !== b) : [...N, b]
    );
  }
  return /* @__PURE__ */ c("div", { className: "space-y-6 px-5 py-4", children: [
    /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center gap-2", children: [
      e.searchable && /* @__PURE__ */ r(
        st,
        {
          value: t,
          onChange: (b) => a(b.target.value),
          placeholder: k("search"),
          className: "min-w-52 flex-1"
        }
      ),
      /* @__PURE__ */ c("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        Array.isArray(h) && h.map((b, N) => /* @__PURE__ */ c(
          O,
          {
            variant: b.variant ?? "secondary",
            title: b.label,
            onClick: () => {
              var v;
              return (v = b.onClick) == null ? void 0 : v.call(b, o);
            },
            children: [
              b.icon,
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: b.label })
            ]
          },
          b.key ?? b.id ?? b.label ?? N
        )),
        e.addable && /* @__PURE__ */ c(O, { variant: "primary", onClick: n, children: [
          /* @__PURE__ */ r(rt, { className: "h-4 w-4" }),
          k("add")
        ] })
      ] })
    ] }),
    (f || g || e.deletable && e.multiDelete && l > 0) && /* @__PURE__ */ c("div", { className: "flex min-h-8 items-center justify-between gap-2", children: [
      /* @__PURE__ */ r("div", { children: e.deletable && e.multiDelete && l > 0 && /* @__PURE__ */ c(O, { variant: "danger", onClick: s, children: [
        /* @__PURE__ */ r(re, { className: "h-4 w-4" }),
        k("deleteSelected"),
        " (",
        l,
        ")"
      ] }) }),
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
        f && /* @__PURE__ */ c(
          O,
          {
            variant: "secondary",
            title: k("export"),
            onClick: () => St(`${e.title ?? "data"}.csv`, Fe(d, e.columns)),
            children: [
              /* @__PURE__ */ r(Be, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { className: "hidden md:inline", children: k("export") })
            ]
          }
        ),
        g && u.length > 0 && /* @__PURE__ */ c("div", { className: "relative", children: [
          /* @__PURE__ */ r(O, { variant: "secondary", title: k("columns"), onClick: () => L((b) => !b), children: /* @__PURE__ */ r(Ye, { className: "h-4 w-4" }) }),
          z && /* @__PURE__ */ c("div", { className: "absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950", children: [
            /* @__PURE__ */ r("p", { className: "px-2 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400", children: k("showColumns") }),
            u.map((b) => /* @__PURE__ */ c("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900", children: [
              /* @__PURE__ */ r("input", { type: "checkbox", checked: !p.includes(b.key), onChange: () => F(b.key), className: "h-4 w-4 accent-blue-600" }),
              /* @__PURE__ */ r("span", { className: "truncate", children: b.label })
            ] }, b.key))
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
    const s = At[n], d = t === n;
    return /* @__PURE__ */ c(
      "button",
      {
        title: l(we[n]),
        onClick: () => a(n),
        className: V(
          "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          d ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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
  fieldSearch: d,
  actions: f,
  onDeleteSelected: h
}) {
  const o = ie(() => {
    const y = Te(e);
    if (Array.isArray(n) && n.length > 0) {
      const w = n.filter((x) => ce.includes(x));
      w.length > 0 && (y.viewModes = w, w.includes(y.defaultView) || (y.defaultView = w[0]));
    }
    return typeof s == "boolean" && (y.exportable = s), d !== void 0 && (y.fieldSearch = d, y.fieldSearchKeys = Ne(d, y.columns)), Array.isArray(f) && (y.actions = f), y;
  }, [e, n, s, d, f]), g = t ?? e.locale ?? "pt", u = Pe(g), p = Ge(o, a), {
    visibleRows: G,
    allFilteredRows: k,
    view: z,
    setView: L,
    query: F,
    setQuery: b,
    fieldFilters: N,
    setFieldFilters: v,
    hiddenColumnKeys: H,
    setHiddenColumnKeys: I,
    selectedIds: T,
    editingRow: P,
    setEditingRow: C
  } = p, j = o.searchable || o.addable || o.exportable || o.columnVisibility || o.fieldSearchKeys.length > 0 || o.deletable && o.multiDelete || Array.isArray(o.actions) && o.actions.length > 0, E = o.viewModes.includes(z) ? z : o.viewModes[0], Q = o.title || o.description || o.viewModes.length > 1;
  function R(y) {
    window.confirm(u("confirmDelete")) && p.deleteRow(y);
  }
  function _() {
    const y = p.rows.filter(
      (x, m) => T.includes(K(x, o.idKey, m))
    ), w = h ?? o.onDeleteSelected;
    (w == null ? void 0 : w({ rows: y, selectedIds: T })) !== !1 && p.deleteSelected();
  }
  const i = {
    rows: k,
    selectedIds: T,
    query: F
  };
  return /* @__PURE__ */ c(Re, { className: l, children: [
    Q && /* @__PURE__ */ r(
      qe,
      {
        title: o.title,
        description: o.description ?? `${p.total} ${u("rows")}`,
        actions: /* @__PURE__ */ r(
          Dt,
          {
            viewModes: o.viewModes,
            view: E,
            onViewChange: L,
            t: u
          }
        )
      }
    ),
    j && /* @__PURE__ */ r(
      Ct,
      {
        config: o,
        query: F,
        onQueryChange: b,
        selectedCount: T.length,
        onAdd: () => C({ mode: "create", row: {} }),
        onDeleteSelected: _,
        filteredRows: k,
        showExport: o.exportable,
        actions: o.actions,
        actionContext: i,
        showColumnVisibility: E === "table" && o.columnVisibility,
        visibilityColumns: o.columns.filter((y) => !y.description && !y.subGrid),
        hiddenColumnKeys: H,
        onHiddenColumnKeysChange: I,
        t: u
      }
    ),
    T.length > 0 && /* @__PURE__ */ c("p", { className: "px-5 pb-1 text-xs text-gray-500 dark:text-gray-400", children: [
      T.length,
      " ",
      u("selected")
    ] }),
    E === "table" && /* @__PURE__ */ r(
      Nt,
      {
        config: o,
        rows: G,
        locale: g,
        sortKey: p.sortKey,
        sortDir: p.sortDir,
        onToggleSort: p.toggleSort,
        fieldFilters: N,
        onFieldFiltersChange: v,
        hiddenColumnKeys: H,
        selectedIds: T,
        onToggleSelect: p.toggleSelect,
        onToggleSelectAll: p.toggleSelectAll,
        onEdit: (y) => C({ mode: "edit", row: y }),
        onDelete: R,
        t: u
      }
    ),
    E === "list" && /* @__PURE__ */ r(
      kt,
      {
        config: o,
        rows: G,
        locale: g,
        onEdit: (y) => C({ mode: "edit", row: y }),
        onDelete: R,
        t: u
      }
    ),
    E === "cards" && /* @__PURE__ */ r(
      bt,
      {
        config: o,
        rows: G,
        locale: g,
        onEdit: (y) => C({ mode: "edit", row: y }),
        onDelete: R,
        t: u
      }
    ),
    o.paginated && /* @__PURE__ */ r("div", { className: "border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ r(
      ot,
      {
        page: p.page,
        totalPages: p.totalPages,
        total: p.total,
        pageSize: p.pageSize,
        onPage: p.setPage,
        t: u
      }
    ) }),
    P && /* @__PURE__ */ r(
      ft,
      {
        config: o,
        editingRow: P,
        onSave: p.saveRow,
        onClose: () => C(null),
        t: u
      }
    )
  ] });
}
export {
  Vt as DataView,
  ce as VIEW_MODES,
  Pe as createTranslator,
  ae as formatValue,
  K as getRowId,
  Te as normalizeConfig,
  Ne as resolveFieldSearchKeys
};
