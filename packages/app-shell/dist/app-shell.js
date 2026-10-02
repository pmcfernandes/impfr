import { jsx as d, jsxs as b, Fragment as we } from "react/jsx-runtime";
import { useState as w, useRef as E, useEffect as T, useContext as M, createContext as B, forwardRef as Ne, createElement as J, useId as Se, useCallback as oe, useMemo as He } from "react";
async function K(e, t = {}) {
  const r = await fetch(e, t);
  if (!r.ok) {
    let n = `Request failed with status ${r.status}`;
    try {
      const c = await r.json();
      c != null && c.error ? n = c.error : c != null && c.title && (n = c.title);
    } catch {
    }
    throw new Error(n);
  }
  return r.status === 204 ? null : r.json();
}
const Ae = K;
function Z(e, t) {
  return `${e.replace(/\/$/, "")}/${encodeURIComponent(t)}`;
}
function X(e, t, r = {}) {
  return {
    ...r,
    method: e,
    headers: {
      "Content-Type": "application/json",
      ...r.headers
    },
    ...t !== void 0 && { body: JSON.stringify(t) }
  };
}
function D() {
  const [e, t] = w(null), [r, n] = w(null), [c, u] = w(!1);
  async function h(a, m) {
    u(!0), n(null);
    try {
      const s = await Ae(a, m);
      return t(s), s;
    } catch (s) {
      throw n(s), s;
    } finally {
      u(!1);
    }
  }
  return { data: e, error: r, isLoading: c, execute: h };
}
function Bt(e, t) {
  const r = D();
  return {
    ...r,
    create: (n) => r.execute(e, X("POST", n, t))
  };
}
function Dt(e, t) {
  const r = D();
  return {
    ...r,
    remove: (n) => r.execute(Z(e, n), { ...t, method: "DELETE" })
  };
}
function Ft(e, t) {
  const r = D();
  return {
    ...r,
    removeMany: (n) => r.execute(e, X("DELETE", { ids: n }, t))
  };
}
function se(e) {
  try {
    return JSON.stringify([...new Headers(e ?? {}).entries()].sort());
  } catch {
    return JSON.stringify(e ?? null);
  }
}
function Ge(e, t) {
  const r = e ?? {}, n = t ?? {}, c = Object.keys(r), u = Object.keys(n);
  return c.length !== u.length ? !1 : c.every((h) => h in n ? h === "headers" ? se(r.headers) === se(n.headers) : r[h] === n[h] : !1);
}
function Y(e, { enabled: t = !0, fetchOptions: r } = {}) {
  const [n, c] = w(null), [u, h] = w(null), [a, m] = w(!!(t && e)), [s, o] = w(0), i = E(r);
  Ge(i.current, r) || (i.current = r);
  const l = i.current;
  return T(() => {
    if (!e || !t) {
      m(!1);
      return;
    }
    const f = new AbortController();
    return m(!0), h(null), Ae(e, { ...l, signal: f.signal }).then((y) => c(y)).catch((y) => {
      y.name !== "AbortError" && h(y);
    }).finally(() => {
      f.signal.aborted || m(!1);
    }), () => f.abort();
  }, [t, s, l, e]), {
    data: n,
    error: u,
    isLoading: a,
    refetch: () => o((f) => f + 1)
  };
}
function qt(e, t) {
  return Y(e, t);
}
function Rt(e, t = [], { idsParam: r = "ids", ...n } = {}) {
  const c = Array.isArray(t) ? t.filter((a) => a != null) : [], u = e != null && e.includes("?") ? "&" : "?", h = c.length > 0 ? `${e}${u}${encodeURIComponent(r)}=${encodeURIComponent(c.join(","))}` : null;
  return Y(h, n);
}
function Wt(e, t, r) {
  return Y(e && t !== void 0 && t !== null ? Z(e, t) : null, r);
}
function ie(e, t, r, n, c) {
  const u = e.includes("?") ? "&" : "?", h = `${encodeURIComponent(r)}=${encodeURIComponent(t)}`, a = n ? `&${encodeURIComponent(c)}=${encodeURIComponent(n)}` : "";
  return `${e}${u}${h}${a}`;
}
function Je(e) {
  return Array.isArray(e) ? e : (e == null ? void 0 : e.data) ?? [];
}
function Pt(e, {
  enabled: t = !0,
  fetchOptions: r,
  initialPage: n = 1,
  pageParam: c = "page",
  pageSize: u,
  pageSizeParam: h = "pageSize",
  getItems: a = Je
} = {}) {
  const [m, s] = w([]), [o, i] = w(null), [l, f] = w(!!(t && e)), [y, x] = w(!1), [v, g] = w(!0), [N, $] = w(n + 1), [A, I] = w(0);
  T(() => {
    if (!e || !t) {
      f(!1);
      return;
    }
    const p = new AbortController();
    return f(!0), i(null), s([]), g(!0), $(n + 1), K(ie(e, n, c, u, h), {
      ...r,
      signal: p.signal
    }).then((z) => {
      const S = a(z);
      s([S]), g(u ? S.length >= u : S.length > 0);
    }).catch((z) => {
      z.name !== "AbortError" && i(z);
    }).finally(() => {
      p.signal.aborted || f(!1);
    }), () => p.abort();
  }, [t, r, a, n, c, u, h, A, e]);
  async function _() {
    if (!e || !v || y) return null;
    x(!0), i(null);
    try {
      const p = await K(ie(e, N, c, u, h), r), z = a(p);
      return s((S) => [...S, z]), $((S) => S + 1), g(u ? z.length >= u : z.length > 0), z;
    } catch (p) {
      throw i(p), p;
    } finally {
      x(!1);
    }
  }
  return {
    data: m.flat(),
    error: o,
    fetchNextPage: _,
    hasNextPage: v,
    isLoading: l,
    isLoadingMore: y,
    pages: m,
    refetch: () => I((p) => p + 1)
  };
}
function V(e) {
  return typeof e == "function" ? e() : e;
}
function ce(e, t) {
  const r = V(t);
  if (typeof window > "u") return r;
  try {
    const n = window.localStorage.getItem(e);
    return n === null ? r : JSON.parse(n);
  } catch {
    return r;
  }
}
function Ke(e, t) {
  try {
    window.localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function Ut(e, t) {
  const [r, n] = w(() => ce(e, t)), c = E(r);
  T(() => {
    const a = ce(e, t);
    c.current = a, n(a);
  }, [t, e]), T(() => {
    function a(m) {
      if (m.key !== e || m.storageArea !== window.localStorage) return;
      const s = m.newValue === null ? V(t) : JSON.parse(m.newValue);
      c.current = s, n(s);
    }
    return window.addEventListener("storage", a), () => window.removeEventListener("storage", a);
  }, [t, e]);
  function u(a) {
    const m = typeof a == "function" ? a(c.current) : a;
    c.current = m, n(m), Ke(e, m);
  }
  function h() {
    c.current = V(t), n(c.current);
    try {
      window.localStorage.removeItem(e);
    } catch {
    }
  }
  return [r, u, h];
}
function Ht(e, t) {
  const r = D(), { method: n = "PUT", ...c } = t ?? {};
  return {
    ...r,
    update: (u, h) => r.execute(Z(e, u), X(n, h, c))
  };
}
const Ve = {
  menu: "Menu",
  collapseSidebar: "Hide sidebar",
  expandSidebar: "Show sidebar",
  search: "Search",
  logout: "Sign out",
  previous: "Previous",
  next: "Next",
  finish: "Finish"
}, Qe = {
  menu: "Menu",
  collapseSidebar: "Ocultar barra lateral",
  expandSidebar: "Mostrar barra lateral",
  search: "Pesquisar",
  logout: "Sair",
  previous: "Anterior",
  next: "Seguinte",
  finish: "Concluir"
}, R = { en: Ve, pt: Qe };
function F(e = "pt") {
  const t = R[e] ?? R.pt;
  return (r) => t[r] ?? R.en[r] ?? r;
}
const O = B(null);
function Gt({ children: e, initialLanguage: t = "pt" }) {
  const [r, n] = w(t), c = F(r);
  return /* @__PURE__ */ d(O.Provider, { value: { language: r, setLanguage: n, t: c }, children: e });
}
function Jt() {
  const e = M(O);
  if (!e) throw new Error("useLanguage must be used within a LanguageProvider");
  return e;
}
const ee = B(null), ze = "app-shell:theme";
function Ze(e) {
  try {
    const t = window.sessionStorage.getItem(ze);
    if (t === "dark" || t === "light") return t;
  } catch {
  }
  return e;
}
function Kt({ children: e, initialTheme: t = "light" }) {
  const [r, n] = w(() => Ze(t));
  return T(() => {
    document.documentElement.classList.toggle("dark", r === "dark");
    try {
      window.sessionStorage.setItem(ze, r);
    } catch {
    }
  }, [r]), /* @__PURE__ */ d(ee.Provider, { value: { setTheme: n, theme: r }, children: e });
}
function Vt() {
  const e = M(ee);
  if (!e) throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = (e) => e == null ? void 0 : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function Ye(e, t, r = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Xe(e),
    size: 24,
    node: t,
    ...r.length > 0 ? { aliases: r } : {}
  };
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = (e) => {
  let t = "", r = !1;
  for (const n of e) {
    if (n === "-" || n === "_" || n <= " ") {
      r = t.length > 0;
      continue;
    }
    t.length === 0 ? t += n.toLowerCase() : t += r ? n.toUpperCase() : n, r = !1;
  }
  return t;
};
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = (e) => {
  const t = Oe(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function W(e) {
  return e != null;
}
function tt(e, t = {}) {
  var l, f;
  const r = t.attributeNames ?? {}, n = (y) => r[y] ?? y, c = e.size ?? e.width ?? j.width, u = e.size ?? e.height ?? j.height, h = ((l = e.aliases) == null ? void 0 : l.filter((y) => typeof y == "string" && y.trim() !== "").map((y) => `lucide-${y}`)) ?? [], a = [...e.name ? [`lucide-${e.name}`] : [], ...h], m = ((f = t.className) == null ? void 0 : f.split(" ").filter(Boolean)) ?? [], s = t.includeDefaultClasses === !1 ? Q(...m) : Q("lucide", ...a, ...m), o = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? j["stroke-width"]) * Number(e.size ?? e.width ?? j.width) / Number(t.size ?? t.width ?? j.width) : t.strokeWidth ?? j["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(j).reduce((y, [x, v]) => (y[n(x)] = v, y), {}),
      ..."color" in t && t.color && {
        [n("stroke")]: t.color
      },
      ..."size" in t && W(t.size) && {
        [n("width")]: t.size,
        [n("height")]: t.size
      },
      ..."width" in t && W(t.width) && {
        [n("width")]: t.width
      },
      ..."height" in t && W(t.height) && {
        [n("height")]: t.height
      },
      [n("stroke-width")]: o,
      ...s && {
        [n("class")]: s
      },
      [n("viewBox")]: `0 0 ${c} ${u}`,
      ...t.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    e.node.map((y) => {
      const [x, v, g] = y, N = t.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...v } : v;
      return g ? [x, N, g] : [x, N];
    })
  ];
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function rt(e, t = {}) {
  return tt(e, {
    ...t,
    attributeNames: {
      ...t.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const at = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, nt = B({}), ot = () => M(nt), st = Ne(
  ({
    color: e,
    size: t,
    width: r,
    height: n,
    strokeWidth: c,
    absoluteStrokeWidth: u,
    nonScalingStroke: h,
    className: a = "",
    children: m,
    iconNode: s = [],
    icon: o = {
      node: s,
      aliases: [],
      size: 24
    },
    ...i
  }, l) => {
    const {
      size: f = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: x = !1,
      nonScalingStroke: v = !1,
      color: g = "currentColor",
      className: N = ""
    } = ot() ?? {}, $ = !!m || at(i), [A, I, _ = []] = rt(o, {
      color: e ?? g,
      width: r ?? t ?? f,
      height: n ?? t ?? f,
      strokeWidth: c ?? y,
      absoluteStrokeWidth: u ?? x,
      nonScalingStroke: h ?? v,
      className: Q(N, a),
      hasA11yProp: $,
      attributes: i
    });
    return J(
      A,
      {
        ref: l,
        ...I
      },
      [
        ..._.map(([p, z]) => J(p, z)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function L(e, t = [], r = []) {
  const n = typeof e == "string" ? Ye(e, t, r) : e, c = Ne(
    ({ className: u, ...h }, a) => J(st, {
      ref: a,
      icon: n,
      className: u,
      ...h
    })
  );
  return n.name && (c.displayName = et(n.name)), c;
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Le.node;
const it = L(Le);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
$e.node;
const ct = L($e);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Te.node;
const lt = L(Te);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = {
  name: "circle-alert",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ],
  aliases: ["alert-circle"]
};
Ie.node;
const dt = L(Ie);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = {
  name: "circle-check",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
  ],
  aliases: ["check-circle-2"]
};
_e.node;
const ut = L(_e);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
je.node;
const ft = L(je);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = {
  name: "log-out",
  size: 24,
  node: [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
  ]
};
Me.node;
const ht = L(Me);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = {
  name: "menu",
  size: 24,
  node: [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }]
  ]
};
Ce.node;
const mt = L(Ce);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = {
  name: "moon",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm"
      }
    ]
  ]
};
Ee.node;
const gt = L(Ee);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Be = {
  name: "panel-left-close",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
  ],
  aliases: ["sidebar-close"]
};
Be.node;
const yt = L(Be);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const De = {
  name: "panel-left-open",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
  ],
  aliases: ["sidebar-open"]
};
De.node;
const xt = L(De);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Fe.node;
const bt = L(Fe);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = {
  name: "sun",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
  ]
};
qe.node;
const vt = L(qe);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Re = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Re.node;
const te = L(Re), kt = {
  title: "Application",
  navigation: [],
  activeNavigationId: void 0
};
function pt(e = {}) {
  return {
    ...kt,
    ...e,
    navigation: Array.isArray(e.navigation) ? e.navigation : []
  };
}
function k(...e) {
  return e.filter(Boolean).join(" ");
}
function wt({ items: e = [], className: t }) {
  return /* @__PURE__ */ d("nav", { "aria-label": "Breadcrumb", className: t, children: /* @__PURE__ */ d("ol", { className: "flex flex-wrap items-center gap-1.5 text-sm", children: e.map((r, n) => {
    const c = n === e.length - 1;
    return /* @__PURE__ */ b("li", { className: "flex items-center gap-1.5", children: [
      n > 0 && /* @__PURE__ */ d(lt, { "aria-hidden": "true", className: "text-gray-400", size: 14 }),
      r.href && !c ? /* @__PURE__ */ d("a", { className: "text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50", href: r.href, children: r.label }) : /* @__PURE__ */ d("span", { "aria-current": c ? "page" : void 0, className: k(c ? "font-medium text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"), children: r.label })
    ] }, r.href ?? r.label);
  }) }) });
}
function Nt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var P = { exports: {} }, U = { exports: {} }, le;
function St() {
  return le || (le = 1, (function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = {
      // Bit-wise rotation left
      rotl: function(r, n) {
        return r << n | r >>> 32 - n;
      },
      // Bit-wise rotation right
      rotr: function(r, n) {
        return r << 32 - n | r >>> n;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function(r) {
        if (r.constructor == Number)
          return t.rotl(r, 8) & 16711935 | t.rotl(r, 24) & 4278255360;
        for (var n = 0; n < r.length; n++)
          r[n] = t.endian(r[n]);
        return r;
      },
      // Generate an array of any length of random bytes
      randomBytes: function(r) {
        for (var n = []; r > 0; r--)
          n.push(Math.floor(Math.random() * 256));
        return n;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(r) {
        for (var n = [], c = 0, u = 0; c < r.length; c++, u += 8)
          n[u >>> 5] |= r[c] << 24 - u % 32;
        return n;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(r) {
        for (var n = [], c = 0; c < r.length * 32; c += 8)
          n.push(r[c >>> 5] >>> 24 - c % 32 & 255);
        return n;
      },
      // Convert a byte array to a hex string
      bytesToHex: function(r) {
        for (var n = [], c = 0; c < r.length; c++)
          n.push((r[c] >>> 4).toString(16)), n.push((r[c] & 15).toString(16));
        return n.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function(r) {
        for (var n = [], c = 0; c < r.length; c += 2)
          n.push(parseInt(r.substr(c, 2), 16));
        return n;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function(r) {
        for (var n = [], c = 0; c < r.length; c += 3)
          for (var u = r[c] << 16 | r[c + 1] << 8 | r[c + 2], h = 0; h < 4; h++)
            c * 8 + h * 6 <= r.length * 8 ? n.push(e.charAt(u >>> 6 * (3 - h) & 63)) : n.push("=");
        return n.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function(r) {
        r = r.replace(/[^A-Z0-9+\/]/ig, "");
        for (var n = [], c = 0, u = 0; c < r.length; u = ++c % 4)
          u != 0 && n.push((e.indexOf(r.charAt(c - 1)) & Math.pow(2, -2 * u + 8) - 1) << u * 2 | e.indexOf(r.charAt(c)) >>> 6 - u * 2);
        return n;
      }
    };
    U.exports = t;
  })()), U.exports;
}
var H, de;
function ue() {
  if (de) return H;
  de = 1;
  var e = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(t) {
        return e.bin.stringToBytes(unescape(encodeURIComponent(t)));
      },
      // Convert a byte array to a string
      bytesToString: function(t) {
        return decodeURIComponent(escape(e.bin.bytesToString(t)));
      }
    },
    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(t) {
        for (var r = [], n = 0; n < t.length; n++)
          r.push(t.charCodeAt(n) & 255);
        return r;
      },
      // Convert a byte array to a string
      bytesToString: function(t) {
        for (var r = [], n = 0; n < t.length; n++)
          r.push(String.fromCharCode(t[n]));
        return r.join("");
      }
    }
  };
  return H = e, H;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var G, fe;
function At() {
  if (fe) return G;
  fe = 1, G = function(r) {
    return r != null && (e(r) || t(r) || !!r._isBuffer);
  };
  function e(r) {
    return !!r.constructor && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
  }
  function t(r) {
    return typeof r.readFloatLE == "function" && typeof r.slice == "function" && e(r.slice(0, 0));
  }
  return G;
}
var he;
function zt() {
  return he || (he = 1, (function() {
    var e = St(), t = ue().utf8, r = At(), n = ue().bin, c = function(u, h) {
      u.constructor == String ? h && h.encoding === "binary" ? u = n.stringToBytes(u) : u = t.stringToBytes(u) : r(u) ? u = Array.prototype.slice.call(u, 0) : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
      for (var a = e.bytesToWords(u), m = u.length * 8, s = 1732584193, o = -271733879, i = -1732584194, l = 271733878, f = 0; f < a.length; f++)
        a[f] = (a[f] << 8 | a[f] >>> 24) & 16711935 | (a[f] << 24 | a[f] >>> 8) & 4278255360;
      a[m >>> 5] |= 128 << m % 32, a[(m + 64 >>> 9 << 4) + 14] = m;
      for (var y = c._ff, x = c._gg, v = c._hh, g = c._ii, f = 0; f < a.length; f += 16) {
        var N = s, $ = o, A = i, I = l;
        s = y(s, o, i, l, a[f + 0], 7, -680876936), l = y(l, s, o, i, a[f + 1], 12, -389564586), i = y(i, l, s, o, a[f + 2], 17, 606105819), o = y(o, i, l, s, a[f + 3], 22, -1044525330), s = y(s, o, i, l, a[f + 4], 7, -176418897), l = y(l, s, o, i, a[f + 5], 12, 1200080426), i = y(i, l, s, o, a[f + 6], 17, -1473231341), o = y(o, i, l, s, a[f + 7], 22, -45705983), s = y(s, o, i, l, a[f + 8], 7, 1770035416), l = y(l, s, o, i, a[f + 9], 12, -1958414417), i = y(i, l, s, o, a[f + 10], 17, -42063), o = y(o, i, l, s, a[f + 11], 22, -1990404162), s = y(s, o, i, l, a[f + 12], 7, 1804603682), l = y(l, s, o, i, a[f + 13], 12, -40341101), i = y(i, l, s, o, a[f + 14], 17, -1502002290), o = y(o, i, l, s, a[f + 15], 22, 1236535329), s = x(s, o, i, l, a[f + 1], 5, -165796510), l = x(l, s, o, i, a[f + 6], 9, -1069501632), i = x(i, l, s, o, a[f + 11], 14, 643717713), o = x(o, i, l, s, a[f + 0], 20, -373897302), s = x(s, o, i, l, a[f + 5], 5, -701558691), l = x(l, s, o, i, a[f + 10], 9, 38016083), i = x(i, l, s, o, a[f + 15], 14, -660478335), o = x(o, i, l, s, a[f + 4], 20, -405537848), s = x(s, o, i, l, a[f + 9], 5, 568446438), l = x(l, s, o, i, a[f + 14], 9, -1019803690), i = x(i, l, s, o, a[f + 3], 14, -187363961), o = x(o, i, l, s, a[f + 8], 20, 1163531501), s = x(s, o, i, l, a[f + 13], 5, -1444681467), l = x(l, s, o, i, a[f + 2], 9, -51403784), i = x(i, l, s, o, a[f + 7], 14, 1735328473), o = x(o, i, l, s, a[f + 12], 20, -1926607734), s = v(s, o, i, l, a[f + 5], 4, -378558), l = v(l, s, o, i, a[f + 8], 11, -2022574463), i = v(i, l, s, o, a[f + 11], 16, 1839030562), o = v(o, i, l, s, a[f + 14], 23, -35309556), s = v(s, o, i, l, a[f + 1], 4, -1530992060), l = v(l, s, o, i, a[f + 4], 11, 1272893353), i = v(i, l, s, o, a[f + 7], 16, -155497632), o = v(o, i, l, s, a[f + 10], 23, -1094730640), s = v(s, o, i, l, a[f + 13], 4, 681279174), l = v(l, s, o, i, a[f + 0], 11, -358537222), i = v(i, l, s, o, a[f + 3], 16, -722521979), o = v(o, i, l, s, a[f + 6], 23, 76029189), s = v(s, o, i, l, a[f + 9], 4, -640364487), l = v(l, s, o, i, a[f + 12], 11, -421815835), i = v(i, l, s, o, a[f + 15], 16, 530742520), o = v(o, i, l, s, a[f + 2], 23, -995338651), s = g(s, o, i, l, a[f + 0], 6, -198630844), l = g(l, s, o, i, a[f + 7], 10, 1126891415), i = g(i, l, s, o, a[f + 14], 15, -1416354905), o = g(o, i, l, s, a[f + 5], 21, -57434055), s = g(s, o, i, l, a[f + 12], 6, 1700485571), l = g(l, s, o, i, a[f + 3], 10, -1894986606), i = g(i, l, s, o, a[f + 10], 15, -1051523), o = g(o, i, l, s, a[f + 1], 21, -2054922799), s = g(s, o, i, l, a[f + 8], 6, 1873313359), l = g(l, s, o, i, a[f + 15], 10, -30611744), i = g(i, l, s, o, a[f + 6], 15, -1560198380), o = g(o, i, l, s, a[f + 13], 21, 1309151649), s = g(s, o, i, l, a[f + 4], 6, -145523070), l = g(l, s, o, i, a[f + 11], 10, -1120210379), i = g(i, l, s, o, a[f + 2], 15, 718787259), o = g(o, i, l, s, a[f + 9], 21, -343485551), s = s + N >>> 0, o = o + $ >>> 0, i = i + A >>> 0, l = l + I >>> 0;
      }
      return e.endian([s, o, i, l]);
    };
    c._ff = function(u, h, a, m, s, o, i) {
      var l = u + (h & a | ~h & m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, c._gg = function(u, h, a, m, s, o, i) {
      var l = u + (h & m | a & ~m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, c._hh = function(u, h, a, m, s, o, i) {
      var l = u + (h ^ a ^ m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, c._ii = function(u, h, a, m, s, o, i) {
      var l = u + (a ^ (h | ~m)) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, c._blocksize = 16, c._digestsize = 16, P.exports = function(u, h) {
      if (u == null)
        throw new Error("Illegal argument " + u);
      var a = e.wordsToBytes(c(u, h));
      return h && h.asBytes ? a : h && h.asString ? n.bytesToString(a) : e.bytesToHex(a);
    };
  })()), P.exports;
}
var Lt = zt();
const $t = /* @__PURE__ */ Nt(Lt);
function Tt({
  title: e,
  titleIcon: t,
  description: r,
  sections: n,
  navigation: c = [],
  activeNavigationId: u,
  isOpen: h = !1,
  isCollapsed: a = !1,
  locale: m = "pt",
  onNavigate: s,
  onToggleCollapsed: o,
  className: i,
  userName: l,
  userEmail: f,
  onLogout: y
}) {
  const x = F(m), [v, g] = w(""), N = Array.isArray(n) && n.length > 0 ? n : c.some((p) => Array.isArray(p.items)) ? c : [{ id: "navigation", items: c }], $ = v.trim().toLocaleLowerCase(m), A = N.map((p) => ({
    ...p,
    items: (p.items ?? []).filter((z) => {
      var S;
      return (S = z.label) == null ? void 0 : S.toLocaleLowerCase(m).includes($);
    })
  })).filter((p) => p.items.length > 0), I = `https://www.gravatar.com/avatar/${$t((f ?? "").trim().toLowerCase())}?d=identicon&s=64`;
  function _(p, z) {
    s && (z == null || z.preventDefault(), s(p));
  }
  return /* @__PURE__ */ b(
    "aside",
    {
      className: k(
        "flex flex-col border-b border-gray-200 bg-white p-3 md:flex md:border-r md:border-b-0 dark:border-gray-800 dark:bg-gray-950",
        h ? "flex" : "hidden",
        i
      ),
      children: [
        /* @__PURE__ */ b("div", { className: k("mb-4 flex items-center", a ? "justify-center" : "justify-between"), children: [
          !a && e && /* @__PURE__ */ b("div", { className: "px-2", children: [
            /* @__PURE__ */ b("div", { className: "flex items-center gap-2 text-gray-950 dark:text-gray-50", children: [
              t && /* @__PURE__ */ d("span", { "aria-hidden": "true", className: "flex size-4 items-center justify-center", children: t }),
              /* @__PURE__ */ d("p", { className: "text-sm font-semibold uppercase tracking-wider", children: e })
            ] }),
            r && /* @__PURE__ */ d("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: r })
          ] }),
          /* @__PURE__ */ d(
            "button",
            {
              "aria-label": x(a ? "expandSidebar" : "collapseSidebar"),
              className: "rounded-md p-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
              onClick: o,
              title: x(a ? "expandSidebar" : "collapseSidebar"),
              type: "button",
              children: a ? /* @__PURE__ */ d(xt, { "aria-hidden": "true", size: 16 }) : /* @__PURE__ */ d(yt, { "aria-hidden": "true", size: 16 })
            }
          )
        ] }),
        !a && /* @__PURE__ */ b("label", { className: "relative mb-5 block", children: [
          /* @__PURE__ */ d(
            bt,
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              size: 16
            }
          ),
          /* @__PURE__ */ d("span", { className: "sr-only", children: x("search") }),
          /* @__PURE__ */ d(
            "input",
            {
              className: "w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-950",
              onChange: (p) => g(p.target.value),
              placeholder: x("search"),
              type: "search",
              value: v
            }
          )
        ] }),
        /* @__PURE__ */ d("nav", { "aria-label": x("menu"), className: "flex-1 space-y-5", children: A.map((p, z) => /* @__PURE__ */ b("div", { children: [
          p.label && !a && /* @__PURE__ */ d("p", { className: "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500", children: p.label }),
          /* @__PURE__ */ d("div", { className: "space-y-1", children: (p.items ?? []).map((S) => {
            var ne;
            const Pe = S.id === u, re = k(
              "flex w-full items-center rounded-md py-2 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
              a ? "justify-center px-2" : "gap-3 px-3",
              Pe && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            ), ae = /* @__PURE__ */ b(we, { children: [
              /* @__PURE__ */ d("span", { "aria-hidden": "true", className: "flex size-5 shrink-0 items-center justify-center", children: S.icon ?? ((ne = S.label) == null ? void 0 : ne.slice(0, 1)) }),
              !a && /* @__PURE__ */ d("span", { children: S.label })
            ] });
            return S.href ? /* @__PURE__ */ d(
              "a",
              {
                "aria-label": a ? S.label : void 0,
                className: re,
                href: S.href,
                onClick: (Ue) => _(S, Ue),
                title: a ? S.label : void 0,
                children: ae
              },
              S.id
            ) : /* @__PURE__ */ d(
              "button",
              {
                "aria-label": a ? S.label : void 0,
                className: re,
                onClick: () => _(S),
                title: a ? S.label : void 0,
                type: "button",
                children: ae
              },
              S.id
            );
          }) })
        ] }, p.id ?? p.label ?? z)) }),
        l && /* @__PURE__ */ b("div", { className: "mt-6 border-t border-gray-200 pt-3 dark:border-gray-800", children: [
          /* @__PURE__ */ b("div", { className: k("mb-2 flex items-center", a ? "justify-center" : "gap-2 px-3"), children: [
            /* @__PURE__ */ d("img", { alt: l, className: "size-7 rounded-full", height: "28", src: I, width: "28" }),
            !a && /* @__PURE__ */ d("p", { className: "truncate text-sm font-medium text-gray-700 dark:text-gray-300", children: l })
          ] }),
          /* @__PURE__ */ b(
            "button",
            {
              "aria-label": x("logout"),
              className: k(
                "flex w-full items-center rounded-md py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
                a ? "justify-center px-2" : "gap-3 px-3"
              ),
              onClick: y,
              title: a ? x("logout") : void 0,
              type: "button",
              children: [
                !a && /* @__PURE__ */ d("span", { children: x("logout") }),
                /* @__PURE__ */ d(ht, { "aria-hidden": "true", className: a ? void 0 : "ml-auto", size: 18 })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Qt({
  config: e,
  title: t,
  titleIcon: r,
  description: n,
  userName: c,
  userEmail: u,
  navigation: h,
  activeNavigationId: a,
  breadcrumbs: m,
  locale: s,
  headerActions: o,
  children: i,
  onNavigate: l,
  onLogout: f
}) {
  const [y, x] = w(!1), [v, g] = w(!1), N = M(O), $ = s ?? (N == null ? void 0 : N.language) ?? "pt", A = pt({
    ...e,
    ...t !== void 0 && { title: t },
    ...r !== void 0 && { titleIcon: r },
    ...n !== void 0 && { description: n },
    ...c !== void 0 && { userName: c },
    ...u !== void 0 && { userEmail: u },
    ...h !== void 0 && { navigation: h },
    ...a !== void 0 && { activeNavigationId: a }
  }), I = F($);
  function _(p) {
    x(!1), l == null || l(p);
  }
  return /* @__PURE__ */ b(
    "div",
    {
      className: k(
        "flex min-h-screen flex-col bg-gray-50 text-gray-950 md:grid md:grid-rows-[auto_1fr] dark:bg-gray-950 dark:text-gray-50",
        v ? "md:grid-cols-[4.5rem_minmax(0,1fr)]" : "md:grid-cols-[16rem_minmax(0,1fr)]"
      ),
      children: [
        /* @__PURE__ */ b("header", { className: "sticky top-0 order-1 z-20 flex min-h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 md:col-start-2 dark:border-gray-800 dark:bg-gray-950", children: [
          /* @__PURE__ */ b(
            "button",
            {
              "aria-expanded": y,
              "aria-label": I("menu"),
              className: "inline-flex items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm md:hidden dark:border-gray-700 dark:text-gray-300",
              onClick: () => x((p) => !p),
              type: "button",
              children: [
                /* @__PURE__ */ d(mt, { "aria-hidden": "true", size: 16 }),
                /* @__PURE__ */ d("span", { className: "sr-only", children: I("menu") })
              ]
            }
          ),
          m && /* @__PURE__ */ d(wt, { items: m }),
          /* @__PURE__ */ d("div", { className: "ml-auto", children: o })
        ] }),
        /* @__PURE__ */ d(
          Tt,
          {
            activeNavigationId: A.activeNavigationId,
            className: "order-2 md:col-start-1 md:row-span-2 md:row-start-1 md:h-screen md:sticky md:top-0",
            isCollapsed: v,
            isOpen: y,
            locale: $,
            navigation: A.navigation,
            onNavigate: _,
            onToggleCollapsed: () => g((p) => !p),
            description: A.description,
            title: A.title,
            titleIcon: A.titleIcon,
            userName: A.userName,
            userEmail: A.userEmail,
            onLogout: f ?? A.onLogout
          }
        ),
        /* @__PURE__ */ d("main", { className: "order-3 flex min-h-[calc(100vh-4rem)] min-w-0 flex-col p-4 sm:p-6 md:col-start-2 md:min-h-0", children: /* @__PURE__ */ d("div", { className: "size-full flex-1", children: i }) })
      ]
    }
  );
}
function Zt({ items: e = [], openItems: t, defaultOpenItems: r = [], onOpenChange: n, multiple: c = !1, className: u }) {
  const [h, a] = w(r), m = t ?? h;
  function s(o) {
    const l = m.includes(o) ? m.filter((f) => f !== o) : c ? [...m, o] : [o];
    t === void 0 && a(l), n == null || n(l);
  }
  return /* @__PURE__ */ d("div", { className: k("divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800", u), children: e.map((o) => {
    const i = m.includes(o.id);
    return /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ b(
        "button",
        {
          "aria-expanded": i,
          className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-gray-950 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-50 dark:hover:bg-gray-900",
          disabled: o.disabled,
          onClick: () => s(o.id),
          type: "button",
          children: [
            o.title,
            /* @__PURE__ */ d(ct, { "aria-hidden": "true", className: k("shrink-0 text-gray-500 transition-transform", i && "rotate-180"), size: 18 })
          ]
        }
      ),
      i && /* @__PURE__ */ d("div", { className: "border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300", children: o.content })
    ] }, o.id);
  }) });
}
const me = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100"
};
function Xt({ icon: e, title: t, description: r, variant: n = "info", className: c, children: u }) {
  return /* @__PURE__ */ b("div", { className: k("flex gap-3 rounded-lg border p-4", me[n] ?? me.info, c), role: "alert", children: [
    e && /* @__PURE__ */ d("span", { "aria-hidden": "true", className: "mt-0.5 flex size-5 shrink-0 items-center justify-center", children: e }),
    /* @__PURE__ */ b("div", { className: "min-w-0", children: [
      t && /* @__PURE__ */ d("p", { className: "text-sm font-semibold", children: t }),
      r && /* @__PURE__ */ d("p", { className: "mt-1 text-sm opacity-80", children: r }),
      u && /* @__PURE__ */ d("div", { className: "mt-3", children: u })
    ] })
  ] });
}
const ge = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-violet-500"];
function ye(e, t) {
  const r = e == null ? void 0 : e.startsWith("bg-");
  return {
    className: r ? e : ge[t % ge.length],
    style: e && !r ? { backgroundColor: e } : void 0
  };
}
function Yt({ data: e = [], orientation: t = "vertical", valueFormatter: r = (c) => c, className: n }) {
  const [c, u] = w(!1), h = Math.max(...e.map((a) => Number(a.value || 0)), 1);
  return T(() => {
    const a = requestAnimationFrame(() => u(!0));
    return () => cancelAnimationFrame(a);
  }, []), t === "horizontal" ? /* @__PURE__ */ d("div", { "aria-label": "Gráfico de barras horizontal", className: k("space-y-4", n), role: "img", children: e.map((a, m) => {
    const s = Number(a.value || 0) / h * 100, o = ye(a.color, m);
    return /* @__PURE__ */ b("div", { className: "grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3", children: [
      /* @__PURE__ */ d("span", { className: "truncate text-sm text-gray-600 dark:text-gray-300", children: a.name }),
      /* @__PURE__ */ d("div", { className: "h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ d("div", { className: k("h-full cursor-pointer rounded-full transition-[width,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", o.className), style: { ...o.style, width: `${c ? s : 0}%` }, title: `${a.name} - ${r(a.value)}` }) }),
      /* @__PURE__ */ d("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: r(a.value) })
    ] }, a.name ?? m);
  }) }) : /* @__PURE__ */ d("div", { "aria-label": "Gráfico de barras vertical", className: k("flex h-56 items-end gap-3", n), role: "img", children: e.map((a, m) => {
    const s = Number(a.value || 0) / h * 100, o = ye(a.color, m);
    return /* @__PURE__ */ b("div", { className: "flex h-full min-w-0 flex-1 flex-col justify-end gap-2", children: [
      /* @__PURE__ */ d("span", { className: "text-center text-xs font-medium text-gray-500 dark:text-gray-400", children: r(a.value) }),
      /* @__PURE__ */ d("div", { className: "flex flex-1 items-end rounded-t bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ d("div", { className: k("w-full cursor-pointer rounded-t transition-[height,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", o.className), style: { ...o.style, height: `${c ? s : 0}%` }, title: `${a.name} - ${r(a.value)}` }) }),
      /* @__PURE__ */ d("span", { className: "truncate text-center text-xs text-gray-500 dark:text-gray-400", children: a.name })
    ] }, a.name ?? m);
  }) });
}
const xe = {
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
};
function Ot({ variant: e = "neutral", className: t, children: r }) {
  return /* @__PURE__ */ d("span", { className: k("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", xe[e] ?? xe.neutral, t), children: r });
}
function q({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "section",
    {
      className: k(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950",
        e
      ),
      ...t
    }
  );
}
function er({ title: e, description: t, actions: r, children: n, className: c }) {
  return /* @__PURE__ */ b(q, { className: k("p-0", c), children: [
    (e || r) && /* @__PURE__ */ b("div", { className: "flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800", children: [
      /* @__PURE__ */ b("div", { children: [
        e && /* @__PURE__ */ d("h2", { className: "text-sm font-semibold text-gray-950 dark:text-gray-50", children: e }),
        t && /* @__PURE__ */ d("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
      ] }),
      r && /* @__PURE__ */ d("div", { className: "flex shrink-0 items-center gap-2", children: r })
    ] }),
    /* @__PURE__ */ d("div", { className: "p-6", children: n })
  ] });
}
const be = {
  primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900",
  danger: "border-transparent bg-rose-600 text-white hover:bg-rose-700"
};
function C({ className: e, type: t = "button", variant: r = "primary", ...n }) {
  return /* @__PURE__ */ d(
    "button",
    {
      className: k(
        "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        be[r] ?? be.primary,
        e
      ),
      type: t,
      ...n
    }
  );
}
function It({ open: e, onOpenChange: t, title: r, description: n, actions: c, children: u, className: h }) {
  const a = Se(), m = typeof h == "string" && h.includes("max-w-"), s = k(
    "w-full rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950",
    m ? null : "max-w-lg",
    h
  );
  return T(() => {
    if (!e) return;
    function o(i) {
      i.key === "Escape" && (t == null || t(!1));
    }
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [t, e]), e ? /* @__PURE__ */ d(
    "div",
    {
      "aria-labelledby": r ? a : void 0,
      "aria-modal": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4",
      onClick: () => t == null ? void 0 : t(!1),
      role: "dialog",
      children: /* @__PURE__ */ b(
        "div",
        {
          className: s,
          onClick: (o) => o.stopPropagation(),
          children: [
            /* @__PURE__ */ b("div", { className: "flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700", children: [
              /* @__PURE__ */ b("div", { children: [
                r && /* @__PURE__ */ d("h2", { className: "text-base font-semibold text-gray-950 dark:text-gray-50", id: a, children: r }),
                n && /* @__PURE__ */ d("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: n })
              ] }),
              /* @__PURE__ */ d(
                "button",
                {
                  "aria-label": "Fechar",
                  className: "rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50",
                  onClick: () => t == null ? void 0 : t(!1),
                  type: "button",
                  children: /* @__PURE__ */ d(te, { "aria-hidden": "true", size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ d("div", { className: "p-6", children: u }),
            c && /* @__PURE__ */ d("div", { className: "flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700", children: c })
          ]
        }
      )
    }
  ) : null;
}
function tr({
  open: e,
  onOpenChange: t,
  onConfirm: r,
  title: n = "Confirmar ação",
  description: c,
  confirmLabel: u = "Confirmar",
  cancelLabel: h = "Cancelar",
  children: a
}) {
  return /* @__PURE__ */ d(
    It,
    {
      actions: /* @__PURE__ */ b(we, { children: [
        /* @__PURE__ */ d(C, { onClick: () => t == null ? void 0 : t(!1), variant: "secondary", children: h }),
        /* @__PURE__ */ d(C, { onClick: r, variant: "danger", children: u })
      ] }),
      description: c,
      onOpenChange: t,
      open: e,
      title: n,
      children: a
    }
  );
}
const ve = ["#2563eb", "#059669", "#d97706", "#e11d48", "#7c3aed"];
function rr({ data: e = [], label: t = "Total", valueFormatter: r = (c) => c, className: n }) {
  const [c, u] = w(!1), h = e.reduce((o, i) => o + Number(i.value || 0), 0), a = 54, m = 2 * Math.PI * a;
  let s = 0;
  return T(() => {
    const o = requestAnimationFrame(() => u(!0));
    return () => cancelAnimationFrame(o);
  }, []), /* @__PURE__ */ b("div", { className: k("relative inline-flex size-44 items-center justify-center", n), children: [
    /* @__PURE__ */ b("svg", { "aria-label": `${t}: ${r(h)}`, className: "size-full -rotate-90", role: "img", viewBox: "0 0 140 140", children: [
      /* @__PURE__ */ d("circle", { cx: "70", cy: "70", fill: "none", r: a, stroke: "currentColor", strokeWidth: "16", className: "text-gray-100 dark:text-gray-800" }),
      h > 0 && e.map((o, i) => {
        const f = Number(o.value || 0) / h * m, y = s;
        return s += f, /* @__PURE__ */ d(
          "circle",
          {
            cx: "70",
            cy: "70",
            fill: "none",
            r: a,
            stroke: o.color ?? ve[i % ve.length],
            strokeDasharray: c ? `${f} ${m - f}` : `0 ${m}`,
            strokeDashoffset: c ? -y : 0,
            strokeWidth: "16",
            className: "cursor-pointer transition-[stroke-dasharray,stroke-dashoffset,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none",
            children: /* @__PURE__ */ b("title", { children: [
              o.name,
              " - ",
              r(o.value)
            ] })
          },
          o.name ?? i
        );
      })
    ] }),
    /* @__PURE__ */ b("div", { className: "absolute text-center", children: [
      /* @__PURE__ */ d("p", { className: "text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: r(h) }),
      /* @__PURE__ */ d("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t })
    ] })
  ] });
}
function ar({ open: e, onOpenChange: t, title: r, description: n, actions: c, children: u, side: h = "right", className: a }) {
  const m = Se();
  return T(() => {
    if (!e) return;
    function s(o) {
      o.key === "Escape" && (t == null || t(!1));
    }
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [t, e]), e ? /* @__PURE__ */ d(
    "div",
    {
      "aria-labelledby": r ? m : void 0,
      "aria-modal": "true",
      className: "fixed inset-0 z-50 bg-gray-950/40",
      onClick: () => t == null ? void 0 : t(!1),
      role: "dialog",
      children: /* @__PURE__ */ b(
        "div",
        {
          className: k(
            "absolute top-0 flex h-full w-full max-w-md flex-col border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950",
            h === "left" ? "left-0" : "right-0",
            a
          ),
          onClick: (s) => s.stopPropagation(),
          children: [
            /* @__PURE__ */ b("div", { className: "flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700", children: [
              /* @__PURE__ */ b("div", { children: [
                r && /* @__PURE__ */ d("h2", { className: "text-base font-semibold text-gray-950 dark:text-gray-50", id: m, children: r }),
                n && /* @__PURE__ */ d("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: n })
              ] }),
              /* @__PURE__ */ d(
                "button",
                {
                  "aria-label": "Fechar",
                  className: "rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50",
                  onClick: () => t == null ? void 0 : t(!1),
                  type: "button",
                  children: /* @__PURE__ */ d(te, { "aria-hidden": "true", size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ d("div", { className: "flex-1 overflow-y-auto p-6", children: u }),
            c && /* @__PURE__ */ d("div", { className: "flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700", children: c })
          ]
        }
      )
    }
  ) : null;
}
const ke = {
  positive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  negative: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
};
function nr({ title: e, value: t, change: r, changeType: n = "neutral", description: c, className: u }) {
  return /* @__PURE__ */ b(q, { className: u, children: [
    /* @__PURE__ */ b("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ d("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: e }),
      r && /* @__PURE__ */ d("span", { className: k("rounded-md px-2 py-1 text-xs font-semibold", ke[n] ?? ke.neutral), children: r })
    ] }),
    /* @__PURE__ */ d("p", { className: "mt-2 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: t }),
    c && /* @__PURE__ */ d("p", { className: "mt-3 text-sm text-gray-500 dark:text-gray-400", children: c })
  ] });
}
function or({ data: e = [], color: t = "#2563eb", valueFormatter: r = (c) => c, className: n }) {
  const u = E(null), [h, a] = w(360), [m, s] = w(!1), o = 22, i = e.map((g) => Number(g.value || 0)), l = Math.min(...i, 0), y = Math.max(...i, 1) - l || 1, x = e.length > 1 ? (h - o * 2) / (e.length - 1) : 0, v = e.map((g, N) => ({
    ...g,
    x: o + x * N,
    y: 180 - o - (Number(g.value || 0) - l) / y * (180 - o * 2)
  }));
  return T(() => {
    const g = u.current;
    if (!g) return;
    function N() {
      a(g.clientWidth / Math.max(g.clientHeight, 1) * 180);
    }
    N();
    const $ = requestAnimationFrame(() => s(!0)), A = new ResizeObserver(N);
    return A.observe(g), () => {
      cancelAnimationFrame($), A.disconnect();
    };
  }, []), /* @__PURE__ */ d("div", { className: k("h-56 w-full", n), ref: u, children: /* @__PURE__ */ b("svg", { "aria-label": "Gráfico de linhas", className: "size-full overflow-visible", role: "img", viewBox: `0 0 ${h} 180`, children: [
    /* @__PURE__ */ d("line", { stroke: "currentColor", strokeDasharray: "3 4", strokeWidth: "1", className: "text-gray-200 dark:text-gray-800", x1: o, x2: h - o, y1: 180 - o, y2: 180 - o }),
    v.length > 1 && /* @__PURE__ */ d("polyline", { className: "transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none", fill: "none", pathLength: "1", points: v.map((g) => `${g.x},${g.y}`).join(" "), stroke: t, strokeDasharray: "1", strokeDashoffset: m ? "0" : "1", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3" }),
    v.map((g, N) => /* @__PURE__ */ b("g", { children: [
      /* @__PURE__ */ d("circle", { className: "cursor-pointer transition-opacity duration-500 ease-out hover:opacity-75 motion-reduce:transition-none dark:fill-gray-950", cx: g.x, cy: g.y, fill: "white", opacity: m ? 1 : 0, r: "5", stroke: t, strokeWidth: "3" }),
      /* @__PURE__ */ b("title", { children: [
        g.name,
        " - ",
        r(g.value)
      ] }),
      /* @__PURE__ */ d("text", { fill: "currentColor", fontSize: "10", textAnchor: "middle", className: "text-gray-500 dark:text-gray-400", x: g.x, y: 175, children: g.name })
    ] }, g.name ?? N))
  ] }) });
}
const We = B(null);
let _t = 1;
const pe = {
  success: {
    icon: ut,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    barClass: "bg-emerald-500"
  },
  error: {
    icon: dt,
    iconClass: "text-red-600 dark:text-red-400",
    barClass: "bg-red-500"
  },
  info: {
    icon: ft,
    iconClass: "text-blue-600 dark:text-blue-400",
    barClass: "bg-blue-500"
  }
};
function sr({ children: e, duration: t = 6e3, max: r = 4 }) {
  const [n, c] = w([]), u = E(/* @__PURE__ */ new Map()), h = oe((s) => {
    c((i) => i.filter((l) => l.id !== s));
    const o = u.current.get(s);
    o && (clearTimeout(o), u.current.delete(s));
  }, []), a = oe(
    (s, o = {}) => {
      const i = _t++, { title: l, variant: f = "info", duration: y } = o;
      return c((x) => [...x.slice(-(r - 1)), { id: i, message: s, title: l, variant: f }]), u.current.set(i, setTimeout(() => h(i), y ?? t)), i;
    },
    [h, t, r]
  );
  T(
    () => () => {
      u.current.forEach((s) => clearTimeout(s)), u.current.clear();
    },
    []
  );
  const m = He(
    () => ({
      notify: a,
      dismiss: h,
      success: (s, o) => a(s, { ...o, variant: "success" }),
      error: (s, o) => a(s, { ...o, variant: "error" }),
      info: (s, o) => a(s, { ...o, variant: "info" })
    }),
    [a, h]
  );
  return /* @__PURE__ */ b(We.Provider, { value: m, children: [
    e,
    /* @__PURE__ */ d(Mt, { toasts: n, onDismiss: h })
  ] });
}
function ir() {
  const e = M(We);
  if (!e) throw new Error("useNotifications must be used within a NotificationProvider");
  return e;
}
function jt({ toast: e, onDismiss: t }) {
  const r = pe[e.variant] ?? pe.info, n = r.icon;
  return /* @__PURE__ */ b(
    "div",
    {
      className: "pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900",
      role: e.variant === "error" ? "alert" : "status",
      children: [
        /* @__PURE__ */ d("span", { "aria-hidden": "true", className: k("w-1 shrink-0 self-stretch", r.barClass) }),
        /* @__PURE__ */ d(n, { "aria-hidden": "true", className: k("mt-3 h-5 w-5 shrink-0", r.iconClass) }),
        /* @__PURE__ */ b("div", { className: "min-w-0 flex-1 py-3 pr-1", children: [
          e.title && /* @__PURE__ */ d("p", { className: "text-sm font-semibold text-gray-900 dark:text-gray-50", children: e.title }),
          /* @__PURE__ */ d("p", { className: "break-words text-sm text-gray-600 dark:text-gray-300", children: e.message })
        ] }),
        /* @__PURE__ */ d(
          "button",
          {
            "aria-label": "Fechar notificação",
            className: "m-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200",
            onClick: () => t(e.id),
            type: "button",
            children: /* @__PURE__ */ d(te, { "aria-hidden": "true", size: 16 })
          }
        )
      ]
    }
  );
}
function Mt({ toasts: e = [], onDismiss: t = () => {
} }) {
  return e.length === 0 ? null : /* @__PURE__ */ d(
    "div",
    {
      "aria-live": "polite",
      className: "pointer-events-none fixed bottom-4 right-4 z-[60] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2",
      children: e.map((r) => /* @__PURE__ */ d(jt, { toast: r, onDismiss: t }, r.id))
    }
  );
}
function cr({ title: e, description: t, actions: r, children: n, className: c }) {
  return /* @__PURE__ */ b(q, { className: k("p-0", c), children: [
    (e || t || r) && /* @__PURE__ */ b("div", { className: "flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800", children: [
      /* @__PURE__ */ b("div", { children: [
        e && /* @__PURE__ */ d("h2", { className: "text-sm font-semibold text-gray-950 dark:text-gray-50", children: e }),
        t && /* @__PURE__ */ d("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
      ] }),
      r && /* @__PURE__ */ d("div", { className: "flex shrink-0 items-center gap-2", children: r })
    ] }),
    /* @__PURE__ */ d("div", { className: "p-6", children: n })
  ] });
}
function lr({ title: e, description: t, actions: r, className: n }) {
  return /* @__PURE__ */ b("div", { className: k("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", n), children: [
    /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ d("h1", { className: "text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: e }),
      t && /* @__PURE__ */ d("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
    ] }),
    r && /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: r })
  ] });
}
function dr({ className: e, ...t }) {
  return /* @__PURE__ */ d("div", { className: k("overflow-x-auto", e), ...t });
}
function ur({ className: e, ...t }) {
  return /* @__PURE__ */ d("table", { className: k("w-full text-left text-sm", e), ...t });
}
function fr({ className: e, ...t }) {
  return /* @__PURE__ */ d("thead", { className: k("border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400", e), ...t });
}
function hr({ className: e, ...t }) {
  return /* @__PURE__ */ d("tbody", { className: k("divide-y divide-gray-200 dark:divide-gray-800", e), ...t });
}
function mr({ className: e, ...t }) {
  return /* @__PURE__ */ d("tr", { className: e, ...t });
}
function gr({ className: e, ...t }) {
  return /* @__PURE__ */ d("th", { className: k("pb-3 font-medium", e), ...t });
}
function yr({ className: e, ...t }) {
  return /* @__PURE__ */ d("td", { className: k("py-4 text-gray-700 dark:text-gray-300", e), ...t });
}
function xr({ tabs: e = [], value: t, onValueChange: r, label: n = "Navegação por separadores", className: c }) {
  return /* @__PURE__ */ d("div", { "aria-label": n, className: k("border-b border-gray-200 dark:border-gray-800", c), role: "tablist", children: /* @__PURE__ */ d("div", { className: "flex gap-1 overflow-x-auto", children: e.map((u) => {
    const h = u.value === t;
    return /* @__PURE__ */ d(
      "button",
      {
        "aria-selected": h,
        className: k(
          "shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition",
          h ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
        ),
        onClick: () => r == null ? void 0 : r(u.value),
        role: "tab",
        type: "button",
        children: u.label
      },
      u.value
    );
  }) }) });
}
function br({ theme: e, defaultTheme: t = "light", onThemeChange: r }) {
  const [n, c] = w(t), u = M(ee), a = (e ?? (u == null ? void 0 : u.theme) ?? n) === "dark";
  T(() => {
    document.documentElement.classList.toggle("dark", a);
  }, [a]);
  function m() {
    const s = a ? "light" : "dark";
    e === void 0 && (u ? u.setTheme(s) : c(s)), r == null || r(s);
  }
  return /* @__PURE__ */ d(
    "button",
    {
      "aria-label": a ? "Ativar tema claro" : "Ativar tema escuro",
      className: "inline-flex size-9 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50",
      onClick: m,
      type: "button",
      children: a ? /* @__PURE__ */ d(vt, { "aria-hidden": "true", size: 17 }) : /* @__PURE__ */ d(gt, { "aria-hidden": "true", size: 17 })
    }
  );
}
function vr({
  steps: e = [],
  activeStep: t,
  defaultStep: r = 0,
  onStepChange: n,
  onComplete: c,
  locale: u = "pt",
  className: h
}) {
  const [a, m] = w(r), s = F(u);
  if (e.length === 0) return null;
  const i = Math.min(Math.max(t ?? a, 0), e.length - 1), l = i === e.length - 1;
  function f(x) {
    t === void 0 && m(x), n == null || n(x);
  }
  function y() {
    l ? c == null || c() : f(i + 1);
  }
  return /* @__PURE__ */ b(q, { className: k("p-0", h), children: [
    /* @__PURE__ */ d("ol", { className: "grid border-b border-gray-200 sm:grid-cols-[repeat(var(--step-count),minmax(0,1fr))] dark:border-gray-800", style: { "--step-count": e.length }, children: e.map((x, v) => {
      const g = v === i, N = v < i;
      return /* @__PURE__ */ b("li", { className: "relative flex items-center gap-3 px-5 py-4", children: [
        /* @__PURE__ */ d(
          "span",
          {
            className: k(
              "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
              g && "border-blue-500 bg-blue-500 text-white",
              N && "border-emerald-500 bg-emerald-500 text-white",
              !g && !N && "border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            ),
            children: N ? /* @__PURE__ */ d(it, { "aria-hidden": "true", size: 15 }) : v + 1
          }
        ),
        /* @__PURE__ */ b("div", { children: [
          /* @__PURE__ */ d("p", { className: k("text-sm font-medium", g ? "text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"), children: x.title }),
          x.description && /* @__PURE__ */ d("p", { className: "mt-0.5 text-xs text-gray-500 dark:text-gray-400", children: x.description })
        ] })
      ] }, x.id ?? x.title);
    }) }),
    /* @__PURE__ */ d("div", { className: "min-h-44 p-6", children: e[i].content }),
    /* @__PURE__ */ b("div", { className: "flex justify-between gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800", children: [
      /* @__PURE__ */ d(C, { disabled: i === 0, onClick: () => f(i - 1), variant: "secondary", children: s("previous") }),
      /* @__PURE__ */ d(C, { onClick: y, children: s(l ? "finish" : "next") })
    ] })
  ] });
}
export {
  Zt as Accordion,
  Xt as AlertBox,
  Qt as AppShell,
  Ot as Badge,
  Yt as BarChart,
  wt as Breadcrumbs,
  C as Button,
  q as Card,
  er as ChartContainer,
  tr as ConfirmDialog,
  It as Dialog,
  rr as DonutChart,
  ar as Drawer,
  nr as Kpi,
  Gt as LanguageProvider,
  or as LineChart,
  sr as NotificationProvider,
  cr as PanelContainer,
  Tt as Sidebar,
  lr as SubHeader,
  ur as Table,
  hr as TableBody,
  yr as TableCell,
  fr as TableHead,
  gr as TableHeaderCell,
  dr as TableRoot,
  mr as TableRow,
  xr as Tabs,
  Kt as ThemeProvider,
  br as ThemeSwitch,
  Mt as Toaster,
  vr as Wizard,
  F as createTranslator,
  K as fetchJson,
  pt as normalizeAppShellConfig,
  Bt as useCreate,
  Dt as useDelete,
  Ft as useDeleteMany,
  qt as useGetList,
  Rt as useGetMany,
  Wt as useGetOne,
  Pt as useInfiniteGetList,
  Jt as useLanguage,
  ir as useNotifications,
  Ut as useStore,
  Vt as useTheme,
  Ht as useUpdate
};
