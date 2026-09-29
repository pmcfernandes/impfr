import { jsx as c, jsxs as x, Fragment as xe } from "react/jsx-runtime";
import { useState as N, useEffect as $, useRef as be, useContext as B, createContext as K, forwardRef as ve, createElement as H, useId as ke } from "react";
async function G(e, t = {}) {
  const r = await fetch(e, t);
  if (!r.ok)
    throw new Error(`Request failed with status ${r.status}`);
  return r.status === 204 ? null : r.json();
}
const pe = G;
function Q(e, t) {
  return `${e.replace(/\/$/, "")}/${encodeURIComponent(t)}`;
}
function Z(e, t, r = {}) {
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
  const [e, t] = N(null), [r, n] = N(null), [d, u] = N(!1);
  async function h(a, m) {
    u(!0), n(null);
    try {
      const s = await pe(a, m);
      return t(s), s;
    } catch (s) {
      throw n(s), s;
    } finally {
      u(!1);
    }
  }
  return { data: e, error: r, isLoading: d, execute: h };
}
function bt(e, t) {
  const r = D();
  return {
    ...r,
    create: (n) => r.execute(e, Z("POST", n, t))
  };
}
function vt(e, t) {
  const r = D();
  return {
    ...r,
    remove: (n) => r.execute(Q(e, n), { ...t, method: "DELETE" })
  };
}
function kt(e, t) {
  const r = D();
  return {
    ...r,
    removeMany: (n) => r.execute(e, Z("DELETE", { ids: n }, t))
  };
}
function X(e, { enabled: t = !0, fetchOptions: r } = {}) {
  const [n, d] = N(null), [u, h] = N(null), [a, m] = N(!!(t && e)), [s, o] = N(0);
  return $(() => {
    if (!e || !t) {
      m(!1);
      return;
    }
    const i = new AbortController();
    return m(!0), h(null), pe(e, { ...r, signal: i.signal }).then((l) => d(l)).catch((l) => {
      l.name !== "AbortError" && h(l);
    }).finally(() => {
      i.signal.aborted || m(!1);
    }), () => i.abort();
  }, [t, r, s, e]), {
    data: n,
    error: u,
    isLoading: a,
    refetch: () => o((i) => i + 1)
  };
}
function pt(e, t) {
  return X(e, t);
}
function Nt(e, t = [], { idsParam: r = "ids", ...n } = {}) {
  const d = Array.isArray(t) ? t.filter((a) => a != null) : [], u = e != null && e.includes("?") ? "&" : "?", h = d.length > 0 ? `${e}${u}${encodeURIComponent(r)}=${encodeURIComponent(d.join(","))}` : null;
  return X(h, n);
}
function wt(e, t, r) {
  return X(e && t !== void 0 && t !== null ? Q(e, t) : null, r);
}
function ae(e, t, r, n, d) {
  const u = e.includes("?") ? "&" : "?", h = `${encodeURIComponent(r)}=${encodeURIComponent(t)}`, a = n ? `&${encodeURIComponent(d)}=${encodeURIComponent(n)}` : "";
  return `${e}${u}${h}${a}`;
}
function De(e) {
  return Array.isArray(e) ? e : (e == null ? void 0 : e.data) ?? [];
}
function St(e, {
  enabled: t = !0,
  fetchOptions: r,
  initialPage: n = 1,
  pageParam: d = "page",
  pageSize: u,
  pageSizeParam: h = "pageSize",
  getItems: a = De
} = {}) {
  const [m, s] = N([]), [o, i] = N(null), [l, f] = N(!!(t && e)), [b, y] = N(!1), [v, g] = N(!0), [w, L] = N(n + 1), [A, T] = N(0);
  $(() => {
    if (!e || !t) {
      f(!1);
      return;
    }
    const p = new AbortController();
    return f(!0), i(null), s([]), g(!0), L(n + 1), G(ae(e, n, d, u, h), {
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
  }, [t, r, a, n, d, u, h, A, e]);
  async function _() {
    if (!e || !v || b) return null;
    y(!0), i(null);
    try {
      const p = await G(ae(e, w, d, u, h), r), z = a(p);
      return s((S) => [...S, z]), L((S) => S + 1), g(u ? z.length >= u : z.length > 0), z;
    } catch (p) {
      throw i(p), p;
    } finally {
      y(!1);
    }
  }
  return {
    data: m.flat(),
    error: o,
    fetchNextPage: _,
    hasNextPage: v,
    isLoading: l,
    isLoadingMore: b,
    pages: m,
    refetch: () => T((p) => p + 1)
  };
}
function V(e) {
  return typeof e == "function" ? e() : e;
}
function ne(e, t) {
  const r = V(t);
  if (typeof window > "u") return r;
  try {
    const n = window.localStorage.getItem(e);
    return n === null ? r : JSON.parse(n);
  } catch {
    return r;
  }
}
function Ee(e, t) {
  try {
    window.localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function At(e, t) {
  const [r, n] = N(() => ne(e, t)), d = be(r);
  $(() => {
    const a = ne(e, t);
    d.current = a, n(a);
  }, [t, e]), $(() => {
    function a(m) {
      if (m.key !== e || m.storageArea !== window.localStorage) return;
      const s = m.newValue === null ? V(t) : JSON.parse(m.newValue);
      d.current = s, n(s);
    }
    return window.addEventListener("storage", a), () => window.removeEventListener("storage", a);
  }, [t, e]);
  function u(a) {
    const m = typeof a == "function" ? a(d.current) : a;
    d.current = m, n(m), Ee(e, m);
  }
  function h() {
    d.current = V(t), n(d.current);
    try {
      window.localStorage.removeItem(e);
    } catch {
    }
  }
  return [r, u, h];
}
function zt(e, t) {
  const r = D();
  return {
    ...r,
    update: (n, d) => r.execute(Q(e, n), Z("PATCH", d, t))
  };
}
const Fe = {
  menu: "Menu",
  collapseSidebar: "Hide sidebar",
  expandSidebar: "Show sidebar",
  search: "Search",
  logout: "Sign out",
  previous: "Previous",
  next: "Next",
  finish: "Finish"
}, qe = {
  menu: "Menu",
  collapseSidebar: "Ocultar barra lateral",
  expandSidebar: "Mostrar barra lateral",
  search: "Pesquisar",
  logout: "Sair",
  previous: "Anterior",
  next: "Seguinte",
  finish: "Concluir"
}, q = { en: Fe, pt: qe };
function E(e = "pt") {
  const t = q[e] ?? q.pt;
  return (r) => t[r] ?? q.en[r] ?? r;
}
const Y = K(null);
function Lt({ children: e, initialLanguage: t = "pt" }) {
  const [r, n] = N(t), d = E(r);
  return /* @__PURE__ */ c(Y.Provider, { value: { language: r, setLanguage: n, t: d }, children: e });
}
function $t() {
  const e = B(Y);
  if (!e) throw new Error("useLanguage must be used within a LanguageProvider");
  return e;
}
const O = K(null);
function It({ children: e, initialTheme: t = "light" }) {
  const [r, n] = N(t);
  return $(() => {
    document.documentElement.classList.toggle("dark", r === "dark");
  }, [r]), /* @__PURE__ */ c(O.Provider, { value: { setTheme: n, theme: r }, children: e });
}
function Tt() {
  const e = B(O);
  if (!e) throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = (e) => e == null ? void 0 : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function Re(e, t, r = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ce(e),
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
const We = (e) => {
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
const Pe = (e) => {
  const t = We(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
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
function C(e) {
  return e != null;
}
function Ue(e, t = {}) {
  var l, f;
  const r = t.attributeNames ?? {}, n = (b) => r[b] ?? b, d = e.size ?? e.width ?? j.width, u = e.size ?? e.height ?? j.height, h = ((l = e.aliases) == null ? void 0 : l.filter((b) => typeof b == "string" && b.trim() !== "").map((b) => `lucide-${b}`)) ?? [], a = [...e.name ? [`lucide-${e.name}`] : [], ...h], m = ((f = t.className) == null ? void 0 : f.split(" ").filter(Boolean)) ?? [], s = t.includeDefaultClasses === !1 ? J(...m) : J("lucide", ...a, ...m), o = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? j["stroke-width"]) * Number(e.size ?? e.width ?? j.width) / Number(t.size ?? t.width ?? j.width) : t.strokeWidth ?? j["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(j).reduce((b, [y, v]) => (b[n(y)] = v, b), {}),
      ..."color" in t && t.color && {
        [n("stroke")]: t.color
      },
      ..."size" in t && C(t.size) && {
        [n("width")]: t.size,
        [n("height")]: t.size
      },
      ..."width" in t && C(t.width) && {
        [n("width")]: t.width
      },
      ..."height" in t && C(t.height) && {
        [n("height")]: t.height
      },
      [n("stroke-width")]: o,
      ...s && {
        [n("class")]: s
      },
      [n("viewBox")]: `0 0 ${d} ${u}`,
      ...t.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    e.node.map((b) => {
      const [y, v, g] = b, w = t.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...v } : v;
      return g ? [y, w, g] : [y, w];
    })
  ];
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function He(e, t = {}) {
  return Ue(e, {
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
const Ge = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Ve = K({}), Je = () => B(Ve), Ke = ve(
  ({
    color: e,
    size: t,
    width: r,
    height: n,
    strokeWidth: d,
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
      strokeWidth: b = 2,
      absoluteStrokeWidth: y = !1,
      nonScalingStroke: v = !1,
      color: g = "currentColor",
      className: w = ""
    } = Je() ?? {}, L = !!m || Ge(i), [A, T, _ = []] = He(o, {
      color: e ?? g,
      width: r ?? t ?? f,
      height: n ?? t ?? f,
      strokeWidth: d ?? b,
      absoluteStrokeWidth: u ?? y,
      nonScalingStroke: h ?? v,
      className: J(w, a),
      hasA11yProp: L,
      attributes: i
    });
    return H(
      A,
      {
        ref: l,
        ...T
      },
      [
        ..._.map(([p, z]) => H(p, z)),
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
function I(e, t = [], r = []) {
  const n = typeof e == "string" ? Re(e, t, r) : e, d = ve(
    ({ className: u, ...h }, a) => H(Ke, {
      ref: a,
      icon: n,
      className: u,
      ...h
    })
  );
  return n.name && (d.displayName = Pe(n.name)), d;
}
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Ne.node;
const Qe = I(Ne);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const we = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
we.node;
const Ze = I(we);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Se.node;
const Xe = I(Se);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = {
  name: "log-out",
  size: 24,
  node: [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
  ]
};
Ae.node;
const Ye = I(Ae);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ze = {
  name: "menu",
  size: 24,
  node: [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }]
  ]
};
ze.node;
const Oe = I(ze);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = {
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
Le.node;
const et = I(Le);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = {
  name: "panel-left-close",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
  ],
  aliases: ["sidebar-close"]
};
$e.node;
const tt = I($e);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = {
  name: "panel-left-open",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
  ],
  aliases: ["sidebar-open"]
};
Ie.node;
const rt = I(Ie);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Te.node;
const at = I(Te);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = {
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
_e.node;
const nt = I(_e);
/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
je.node;
const Be = I(je), ot = {
  title: "Application",
  navigation: [],
  activeNavigationId: void 0
};
function st(e = {}) {
  return {
    ...ot,
    ...e,
    navigation: Array.isArray(e.navigation) ? e.navigation : []
  };
}
function k(...e) {
  return e.filter(Boolean).join(" ");
}
function it({ items: e = [], className: t }) {
  return /* @__PURE__ */ c("nav", { "aria-label": "Breadcrumb", className: t, children: /* @__PURE__ */ c("ol", { className: "flex flex-wrap items-center gap-1.5 text-sm", children: e.map((r, n) => {
    const d = n === e.length - 1;
    return /* @__PURE__ */ x("li", { className: "flex items-center gap-1.5", children: [
      n > 0 && /* @__PURE__ */ c(Xe, { "aria-hidden": "true", className: "text-gray-400", size: 14 }),
      r.href && !d ? /* @__PURE__ */ c("a", { className: "text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50", href: r.href, children: r.label }) : /* @__PURE__ */ c("span", { "aria-current": d ? "page" : void 0, className: k(d ? "font-medium text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"), children: r.label })
    ] }, r.href ?? r.label);
  }) }) });
}
function lt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var R = { exports: {} }, W = { exports: {} }, oe;
function dt() {
  return oe || (oe = 1, (function() {
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
        for (var n = [], d = 0, u = 0; d < r.length; d++, u += 8)
          n[u >>> 5] |= r[d] << 24 - u % 32;
        return n;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(r) {
        for (var n = [], d = 0; d < r.length * 32; d += 8)
          n.push(r[d >>> 5] >>> 24 - d % 32 & 255);
        return n;
      },
      // Convert a byte array to a hex string
      bytesToHex: function(r) {
        for (var n = [], d = 0; d < r.length; d++)
          n.push((r[d] >>> 4).toString(16)), n.push((r[d] & 15).toString(16));
        return n.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function(r) {
        for (var n = [], d = 0; d < r.length; d += 2)
          n.push(parseInt(r.substr(d, 2), 16));
        return n;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function(r) {
        for (var n = [], d = 0; d < r.length; d += 3)
          for (var u = r[d] << 16 | r[d + 1] << 8 | r[d + 2], h = 0; h < 4; h++)
            d * 8 + h * 6 <= r.length * 8 ? n.push(e.charAt(u >>> 6 * (3 - h) & 63)) : n.push("=");
        return n.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function(r) {
        r = r.replace(/[^A-Z0-9+\/]/ig, "");
        for (var n = [], d = 0, u = 0; d < r.length; u = ++d % 4)
          u != 0 && n.push((e.indexOf(r.charAt(d - 1)) & Math.pow(2, -2 * u + 8) - 1) << u * 2 | e.indexOf(r.charAt(d)) >>> 6 - u * 2);
        return n;
      }
    };
    W.exports = t;
  })()), W.exports;
}
var P, se;
function ie() {
  if (se) return P;
  se = 1;
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
  return P = e, P;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var U, le;
function ct() {
  if (le) return U;
  le = 1, U = function(r) {
    return r != null && (e(r) || t(r) || !!r._isBuffer);
  };
  function e(r) {
    return !!r.constructor && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
  }
  function t(r) {
    return typeof r.readFloatLE == "function" && typeof r.slice == "function" && e(r.slice(0, 0));
  }
  return U;
}
var de;
function ut() {
  return de || (de = 1, (function() {
    var e = dt(), t = ie().utf8, r = ct(), n = ie().bin, d = function(u, h) {
      u.constructor == String ? h && h.encoding === "binary" ? u = n.stringToBytes(u) : u = t.stringToBytes(u) : r(u) ? u = Array.prototype.slice.call(u, 0) : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
      for (var a = e.bytesToWords(u), m = u.length * 8, s = 1732584193, o = -271733879, i = -1732584194, l = 271733878, f = 0; f < a.length; f++)
        a[f] = (a[f] << 8 | a[f] >>> 24) & 16711935 | (a[f] << 24 | a[f] >>> 8) & 4278255360;
      a[m >>> 5] |= 128 << m % 32, a[(m + 64 >>> 9 << 4) + 14] = m;
      for (var b = d._ff, y = d._gg, v = d._hh, g = d._ii, f = 0; f < a.length; f += 16) {
        var w = s, L = o, A = i, T = l;
        s = b(s, o, i, l, a[f + 0], 7, -680876936), l = b(l, s, o, i, a[f + 1], 12, -389564586), i = b(i, l, s, o, a[f + 2], 17, 606105819), o = b(o, i, l, s, a[f + 3], 22, -1044525330), s = b(s, o, i, l, a[f + 4], 7, -176418897), l = b(l, s, o, i, a[f + 5], 12, 1200080426), i = b(i, l, s, o, a[f + 6], 17, -1473231341), o = b(o, i, l, s, a[f + 7], 22, -45705983), s = b(s, o, i, l, a[f + 8], 7, 1770035416), l = b(l, s, o, i, a[f + 9], 12, -1958414417), i = b(i, l, s, o, a[f + 10], 17, -42063), o = b(o, i, l, s, a[f + 11], 22, -1990404162), s = b(s, o, i, l, a[f + 12], 7, 1804603682), l = b(l, s, o, i, a[f + 13], 12, -40341101), i = b(i, l, s, o, a[f + 14], 17, -1502002290), o = b(o, i, l, s, a[f + 15], 22, 1236535329), s = y(s, o, i, l, a[f + 1], 5, -165796510), l = y(l, s, o, i, a[f + 6], 9, -1069501632), i = y(i, l, s, o, a[f + 11], 14, 643717713), o = y(o, i, l, s, a[f + 0], 20, -373897302), s = y(s, o, i, l, a[f + 5], 5, -701558691), l = y(l, s, o, i, a[f + 10], 9, 38016083), i = y(i, l, s, o, a[f + 15], 14, -660478335), o = y(o, i, l, s, a[f + 4], 20, -405537848), s = y(s, o, i, l, a[f + 9], 5, 568446438), l = y(l, s, o, i, a[f + 14], 9, -1019803690), i = y(i, l, s, o, a[f + 3], 14, -187363961), o = y(o, i, l, s, a[f + 8], 20, 1163531501), s = y(s, o, i, l, a[f + 13], 5, -1444681467), l = y(l, s, o, i, a[f + 2], 9, -51403784), i = y(i, l, s, o, a[f + 7], 14, 1735328473), o = y(o, i, l, s, a[f + 12], 20, -1926607734), s = v(s, o, i, l, a[f + 5], 4, -378558), l = v(l, s, o, i, a[f + 8], 11, -2022574463), i = v(i, l, s, o, a[f + 11], 16, 1839030562), o = v(o, i, l, s, a[f + 14], 23, -35309556), s = v(s, o, i, l, a[f + 1], 4, -1530992060), l = v(l, s, o, i, a[f + 4], 11, 1272893353), i = v(i, l, s, o, a[f + 7], 16, -155497632), o = v(o, i, l, s, a[f + 10], 23, -1094730640), s = v(s, o, i, l, a[f + 13], 4, 681279174), l = v(l, s, o, i, a[f + 0], 11, -358537222), i = v(i, l, s, o, a[f + 3], 16, -722521979), o = v(o, i, l, s, a[f + 6], 23, 76029189), s = v(s, o, i, l, a[f + 9], 4, -640364487), l = v(l, s, o, i, a[f + 12], 11, -421815835), i = v(i, l, s, o, a[f + 15], 16, 530742520), o = v(o, i, l, s, a[f + 2], 23, -995338651), s = g(s, o, i, l, a[f + 0], 6, -198630844), l = g(l, s, o, i, a[f + 7], 10, 1126891415), i = g(i, l, s, o, a[f + 14], 15, -1416354905), o = g(o, i, l, s, a[f + 5], 21, -57434055), s = g(s, o, i, l, a[f + 12], 6, 1700485571), l = g(l, s, o, i, a[f + 3], 10, -1894986606), i = g(i, l, s, o, a[f + 10], 15, -1051523), o = g(o, i, l, s, a[f + 1], 21, -2054922799), s = g(s, o, i, l, a[f + 8], 6, 1873313359), l = g(l, s, o, i, a[f + 15], 10, -30611744), i = g(i, l, s, o, a[f + 6], 15, -1560198380), o = g(o, i, l, s, a[f + 13], 21, 1309151649), s = g(s, o, i, l, a[f + 4], 6, -145523070), l = g(l, s, o, i, a[f + 11], 10, -1120210379), i = g(i, l, s, o, a[f + 2], 15, 718787259), o = g(o, i, l, s, a[f + 9], 21, -343485551), s = s + w >>> 0, o = o + L >>> 0, i = i + A >>> 0, l = l + T >>> 0;
      }
      return e.endian([s, o, i, l]);
    };
    d._ff = function(u, h, a, m, s, o, i) {
      var l = u + (h & a | ~h & m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, d._gg = function(u, h, a, m, s, o, i) {
      var l = u + (h & m | a & ~m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, d._hh = function(u, h, a, m, s, o, i) {
      var l = u + (h ^ a ^ m) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, d._ii = function(u, h, a, m, s, o, i) {
      var l = u + (a ^ (h | ~m)) + (s >>> 0) + i;
      return (l << o | l >>> 32 - o) + h;
    }, d._blocksize = 16, d._digestsize = 16, R.exports = function(u, h) {
      if (u == null)
        throw new Error("Illegal argument " + u);
      var a = e.wordsToBytes(d(u, h));
      return h && h.asBytes ? a : h && h.asString ? n.bytesToString(a) : e.bytesToHex(a);
    };
  })()), R.exports;
}
var ft = ut();
const ht = /* @__PURE__ */ lt(ft);
function mt({
  title: e,
  titleIcon: t,
  description: r,
  sections: n,
  navigation: d = [],
  activeNavigationId: u,
  isOpen: h = !1,
  isCollapsed: a = !1,
  locale: m = "pt",
  onNavigate: s,
  onToggleCollapsed: o,
  className: i,
  userName: l,
  userEmail: f,
  onLogout: b
}) {
  const y = E(m), [v, g] = N(""), w = Array.isArray(n) && n.length > 0 ? n : d.some((p) => Array.isArray(p.items)) ? d : [{ id: "navigation", items: d }], L = v.trim().toLocaleLowerCase(m), A = w.map((p) => ({
    ...p,
    items: (p.items ?? []).filter((z) => {
      var S;
      return (S = z.label) == null ? void 0 : S.toLocaleLowerCase(m).includes(L);
    })
  })).filter((p) => p.items.length > 0), T = `https://www.gravatar.com/avatar/${ht((f ?? "").trim().toLowerCase())}?d=identicon&s=64`;
  function _(p) {
    s == null || s(p);
  }
  return /* @__PURE__ */ x(
    "aside",
    {
      className: k(
        "flex flex-col border-b border-gray-200 bg-white p-3 md:flex md:border-r md:border-b-0 dark:border-gray-800 dark:bg-gray-950",
        h ? "flex" : "hidden",
        i
      ),
      children: [
        /* @__PURE__ */ x("div", { className: k("mb-4 flex items-center", a ? "justify-center" : "justify-between"), children: [
          !a && e && /* @__PURE__ */ x("div", { className: "px-2", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2 text-gray-950 dark:text-gray-50", children: [
              t && /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "flex size-4 items-center justify-center", children: t }),
              /* @__PURE__ */ c("p", { className: "text-sm font-semibold uppercase tracking-wider", children: e })
            ] }),
            r && /* @__PURE__ */ c("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: r })
          ] }),
          /* @__PURE__ */ c(
            "button",
            {
              "aria-label": y(a ? "expandSidebar" : "collapseSidebar"),
              className: "rounded-md p-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
              onClick: o,
              title: y(a ? "expandSidebar" : "collapseSidebar"),
              type: "button",
              children: a ? /* @__PURE__ */ c(rt, { "aria-hidden": "true", size: 16 }) : /* @__PURE__ */ c(tt, { "aria-hidden": "true", size: 16 })
            }
          )
        ] }),
        !a && /* @__PURE__ */ x("label", { className: "relative mb-5 block", children: [
          /* @__PURE__ */ c(
            at,
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              size: 16
            }
          ),
          /* @__PURE__ */ c("span", { className: "sr-only", children: y("search") }),
          /* @__PURE__ */ c(
            "input",
            {
              className: "w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-950",
              onChange: (p) => g(p.target.value),
              placeholder: y("search"),
              type: "search",
              value: v
            }
          )
        ] }),
        /* @__PURE__ */ c("nav", { "aria-label": y("menu"), className: "flex-1 space-y-5", children: A.map((p, z) => /* @__PURE__ */ x("div", { children: [
          p.label && !a && /* @__PURE__ */ c("p", { className: "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500", children: p.label }),
          /* @__PURE__ */ c("div", { className: "space-y-1", children: (p.items ?? []).map((S) => {
            var re;
            const Me = S.id === u, ee = k(
              "flex w-full items-center rounded-md py-2 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
              a ? "justify-center px-2" : "gap-3 px-3",
              Me && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            ), te = /* @__PURE__ */ x(xe, { children: [
              /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "flex size-5 shrink-0 items-center justify-center", children: S.icon ?? ((re = S.label) == null ? void 0 : re.slice(0, 1)) }),
              !a && /* @__PURE__ */ c("span", { children: S.label })
            ] });
            return S.href ? /* @__PURE__ */ c(
              "a",
              {
                "aria-label": a ? S.label : void 0,
                className: ee,
                href: S.href,
                onClick: () => _(S),
                title: a ? S.label : void 0,
                children: te
              },
              S.id
            ) : /* @__PURE__ */ c(
              "button",
              {
                "aria-label": a ? S.label : void 0,
                className: ee,
                onClick: () => _(S),
                title: a ? S.label : void 0,
                type: "button",
                children: te
              },
              S.id
            );
          }) })
        ] }, p.id ?? p.label ?? z)) }),
        l && /* @__PURE__ */ x("div", { className: "mt-6 border-t border-gray-200 pt-3 dark:border-gray-800", children: [
          /* @__PURE__ */ x("div", { className: k("mb-2 flex items-center", a ? "justify-center" : "gap-2 px-3"), children: [
            /* @__PURE__ */ c("img", { alt: l, className: "size-7 rounded-full", height: "28", src: T, width: "28" }),
            !a && /* @__PURE__ */ c("p", { className: "truncate text-sm font-medium text-gray-700 dark:text-gray-300", children: l })
          ] }),
          /* @__PURE__ */ x(
            "button",
            {
              "aria-label": y("logout"),
              className: k(
                "flex w-full items-center rounded-md py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
                a ? "justify-center px-2" : "gap-3 px-3"
              ),
              onClick: b,
              title: a ? y("logout") : void 0,
              type: "button",
              children: [
                !a && /* @__PURE__ */ c("span", { children: y("logout") }),
                /* @__PURE__ */ c(Ye, { "aria-hidden": "true", className: a ? void 0 : "ml-auto", size: 18 })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function _t({
  config: e,
  title: t,
  titleIcon: r,
  description: n,
  userName: d,
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
  const [b, y] = N(!1), [v, g] = N(!1), w = B(Y), L = s ?? (w == null ? void 0 : w.language) ?? "pt", A = st({
    ...e,
    ...t !== void 0 && { title: t },
    ...r !== void 0 && { titleIcon: r },
    ...n !== void 0 && { description: n },
    ...d !== void 0 && { userName: d },
    ...u !== void 0 && { userEmail: u },
    ...h !== void 0 && { navigation: h },
    ...a !== void 0 && { activeNavigationId: a }
  }), T = E(L);
  function _(p) {
    y(!1), l == null || l(p);
  }
  return /* @__PURE__ */ x(
    "div",
    {
      className: k(
        "flex min-h-screen flex-col bg-gray-50 text-gray-950 md:grid md:grid-rows-[auto_1fr] dark:bg-gray-950 dark:text-gray-50",
        v ? "md:grid-cols-[4.5rem_minmax(0,1fr)]" : "md:grid-cols-[16rem_minmax(0,1fr)]"
      ),
      children: [
        /* @__PURE__ */ x("header", { className: "sticky top-0 order-1 z-20 flex min-h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 md:col-start-2 dark:border-gray-800 dark:bg-gray-950", children: [
          /* @__PURE__ */ x(
            "button",
            {
              "aria-expanded": b,
              "aria-label": T("menu"),
              className: "inline-flex items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm md:hidden dark:border-gray-700 dark:text-gray-300",
              onClick: () => y((p) => !p),
              type: "button",
              children: [
                /* @__PURE__ */ c(Oe, { "aria-hidden": "true", size: 16 }),
                /* @__PURE__ */ c("span", { className: "sr-only", children: T("menu") })
              ]
            }
          ),
          m && /* @__PURE__ */ c(it, { items: m }),
          /* @__PURE__ */ c("div", { className: "ml-auto", children: o })
        ] }),
        /* @__PURE__ */ c(
          mt,
          {
            activeNavigationId: A.activeNavigationId,
            className: "order-2 md:col-start-1 md:row-span-2 md:row-start-1 md:h-screen md:sticky md:top-0",
            isCollapsed: v,
            isOpen: b,
            locale: L,
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
        /* @__PURE__ */ c("main", { className: "order-3 flex min-h-[calc(100vh-4rem)] min-w-0 flex-col p-4 sm:p-6 md:col-start-2 md:min-h-0", children: /* @__PURE__ */ c("div", { className: "size-full flex-1", children: i }) })
      ]
    }
  );
}
function jt({ items: e = [], openItems: t, defaultOpenItems: r = [], onOpenChange: n, multiple: d = !1, className: u }) {
  const [h, a] = N(r), m = t ?? h;
  function s(o) {
    const l = m.includes(o) ? m.filter((f) => f !== o) : d ? [...m, o] : [o];
    t === void 0 && a(l), n == null || n(l);
  }
  return /* @__PURE__ */ c("div", { className: k("divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800", u), children: e.map((o) => {
    const i = m.includes(o.id);
    return /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ x(
        "button",
        {
          "aria-expanded": i,
          className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-gray-950 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-50 dark:hover:bg-gray-900",
          disabled: o.disabled,
          onClick: () => s(o.id),
          type: "button",
          children: [
            o.title,
            /* @__PURE__ */ c(Ze, { "aria-hidden": "true", className: k("shrink-0 text-gray-500 transition-transform", i && "rotate-180"), size: 18 })
          ]
        }
      ),
      i && /* @__PURE__ */ c("div", { className: "border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300", children: o.content })
    ] }, o.id);
  }) });
}
const ce = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100"
};
function Bt({ icon: e, title: t, description: r, variant: n = "info", className: d, children: u }) {
  return /* @__PURE__ */ x("div", { className: k("flex gap-3 rounded-lg border p-4", ce[n] ?? ce.info, d), role: "alert", children: [
    e && /* @__PURE__ */ c("span", { "aria-hidden": "true", className: "mt-0.5 flex size-5 shrink-0 items-center justify-center", children: e }),
    /* @__PURE__ */ x("div", { className: "min-w-0", children: [
      t && /* @__PURE__ */ c("p", { className: "text-sm font-semibold", children: t }),
      r && /* @__PURE__ */ c("p", { className: "mt-1 text-sm opacity-80", children: r }),
      u && /* @__PURE__ */ c("div", { className: "mt-3", children: u })
    ] })
  ] });
}
const ue = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-violet-500"];
function fe(e, t) {
  const r = e == null ? void 0 : e.startsWith("bg-");
  return {
    className: r ? e : ue[t % ue.length],
    style: e && !r ? { backgroundColor: e } : void 0
  };
}
function Mt({ data: e = [], orientation: t = "vertical", valueFormatter: r = (d) => d, className: n }) {
  const [d, u] = N(!1), h = Math.max(...e.map((a) => Number(a.value || 0)), 1);
  return $(() => {
    const a = requestAnimationFrame(() => u(!0));
    return () => cancelAnimationFrame(a);
  }, []), t === "horizontal" ? /* @__PURE__ */ c("div", { "aria-label": "Gráfico de barras horizontal", className: k("space-y-4", n), role: "img", children: e.map((a, m) => {
    const s = Number(a.value || 0) / h * 100, o = fe(a.color, m);
    return /* @__PURE__ */ x("div", { className: "grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3", children: [
      /* @__PURE__ */ c("span", { className: "truncate text-sm text-gray-600 dark:text-gray-300", children: a.name }),
      /* @__PURE__ */ c("div", { className: "h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ c("div", { className: k("h-full cursor-pointer rounded-full transition-[width,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", o.className), style: { ...o.style, width: `${d ? s : 0}%` }, title: `${a.name} - ${r(a.value)}` }) }),
      /* @__PURE__ */ c("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: r(a.value) })
    ] }, a.name ?? m);
  }) }) : /* @__PURE__ */ c("div", { "aria-label": "Gráfico de barras vertical", className: k("flex h-56 items-end gap-3", n), role: "img", children: e.map((a, m) => {
    const s = Number(a.value || 0) / h * 100, o = fe(a.color, m);
    return /* @__PURE__ */ x("div", { className: "flex h-full min-w-0 flex-1 flex-col justify-end gap-2", children: [
      /* @__PURE__ */ c("span", { className: "text-center text-xs font-medium text-gray-500 dark:text-gray-400", children: r(a.value) }),
      /* @__PURE__ */ c("div", { className: "flex flex-1 items-end rounded-t bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ c("div", { className: k("w-full cursor-pointer rounded-t transition-[height,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", o.className), style: { ...o.style, height: `${d ? s : 0}%` }, title: `${a.name} - ${r(a.value)}` }) }),
      /* @__PURE__ */ c("span", { className: "truncate text-center text-xs text-gray-500 dark:text-gray-400", children: a.name })
    ] }, a.name ?? m);
  }) });
}
const he = {
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
};
function Dt({ variant: e = "neutral", className: t, children: r }) {
  return /* @__PURE__ */ c("span", { className: k("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", he[e] ?? he.neutral, t), children: r });
}
function F({ className: e, ...t }) {
  return /* @__PURE__ */ c(
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
function Et({ title: e, description: t, actions: r, children: n, className: d }) {
  return /* @__PURE__ */ x(F, { className: k("p-0", d), children: [
    (e || r) && /* @__PURE__ */ x("div", { className: "flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800", children: [
      /* @__PURE__ */ x("div", { children: [
        e && /* @__PURE__ */ c("h2", { className: "text-sm font-semibold text-gray-950 dark:text-gray-50", children: e }),
        t && /* @__PURE__ */ c("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
      ] }),
      r && /* @__PURE__ */ c("div", { className: "flex shrink-0 items-center gap-2", children: r })
    ] }),
    /* @__PURE__ */ c("div", { className: "p-6", children: n })
  ] });
}
const me = {
  primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900",
  danger: "border-transparent bg-rose-600 text-white hover:bg-rose-700"
};
function M({ className: e, type: t = "button", variant: r = "primary", ...n }) {
  return /* @__PURE__ */ c(
    "button",
    {
      className: k(
        "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        me[r] ?? me.primary,
        e
      ),
      type: t,
      ...n
    }
  );
}
function gt({ open: e, onOpenChange: t, title: r, description: n, actions: d, children: u, className: h }) {
  const a = ke();
  return $(() => {
    if (!e) return;
    function m(s) {
      s.key === "Escape" && (t == null || t(!1));
    }
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [t, e]), e ? /* @__PURE__ */ c(
    "div",
    {
      "aria-labelledby": r ? a : void 0,
      "aria-modal": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4",
      onClick: () => t == null ? void 0 : t(!1),
      role: "dialog",
      children: /* @__PURE__ */ x(
        "div",
        {
          className: k("w-full max-w-lg rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950", h),
          onClick: (m) => m.stopPropagation(),
          children: [
            /* @__PURE__ */ x("div", { className: "flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700", children: [
              /* @__PURE__ */ x("div", { children: [
                r && /* @__PURE__ */ c("h2", { className: "text-base font-semibold text-gray-950 dark:text-gray-50", id: a, children: r }),
                n && /* @__PURE__ */ c("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: n })
              ] }),
              /* @__PURE__ */ c(
                "button",
                {
                  "aria-label": "Fechar",
                  className: "rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50",
                  onClick: () => t == null ? void 0 : t(!1),
                  type: "button",
                  children: /* @__PURE__ */ c(Be, { "aria-hidden": "true", size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "p-6", children: u }),
            d && /* @__PURE__ */ c("div", { className: "flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700", children: d })
          ]
        }
      )
    }
  ) : null;
}
function Ft({
  open: e,
  onOpenChange: t,
  onConfirm: r,
  title: n = "Confirmar ação",
  description: d,
  confirmLabel: u = "Confirmar",
  cancelLabel: h = "Cancelar",
  children: a
}) {
  return /* @__PURE__ */ c(
    gt,
    {
      actions: /* @__PURE__ */ x(xe, { children: [
        /* @__PURE__ */ c(M, { onClick: () => t == null ? void 0 : t(!1), variant: "secondary", children: h }),
        /* @__PURE__ */ c(M, { onClick: r, variant: "danger", children: u })
      ] }),
      description: d,
      onOpenChange: t,
      open: e,
      title: n,
      children: a
    }
  );
}
const ge = ["#2563eb", "#059669", "#d97706", "#e11d48", "#7c3aed"];
function qt({ data: e = [], label: t = "Total", valueFormatter: r = (d) => d, className: n }) {
  const [d, u] = N(!1), h = e.reduce((o, i) => o + Number(i.value || 0), 0), a = 54, m = 2 * Math.PI * a;
  let s = 0;
  return $(() => {
    const o = requestAnimationFrame(() => u(!0));
    return () => cancelAnimationFrame(o);
  }, []), /* @__PURE__ */ x("div", { className: k("relative inline-flex size-44 items-center justify-center", n), children: [
    /* @__PURE__ */ x("svg", { "aria-label": `${t}: ${r(h)}`, className: "size-full -rotate-90", role: "img", viewBox: "0 0 140 140", children: [
      /* @__PURE__ */ c("circle", { cx: "70", cy: "70", fill: "none", r: a, stroke: "currentColor", strokeWidth: "16", className: "text-gray-100 dark:text-gray-800" }),
      h > 0 && e.map((o, i) => {
        const f = Number(o.value || 0) / h * m, b = s;
        return s += f, /* @__PURE__ */ c(
          "circle",
          {
            cx: "70",
            cy: "70",
            fill: "none",
            r: a,
            stroke: o.color ?? ge[i % ge.length],
            strokeDasharray: d ? `${f} ${m - f}` : `0 ${m}`,
            strokeDashoffset: d ? -b : 0,
            strokeWidth: "16",
            className: "cursor-pointer transition-[stroke-dasharray,stroke-dashoffset,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none",
            children: /* @__PURE__ */ x("title", { children: [
              o.name,
              " - ",
              r(o.value)
            ] })
          },
          o.name ?? i
        );
      })
    ] }),
    /* @__PURE__ */ x("div", { className: "absolute text-center", children: [
      /* @__PURE__ */ c("p", { className: "text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: r(h) }),
      /* @__PURE__ */ c("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t })
    ] })
  ] });
}
function Ct({ open: e, onOpenChange: t, title: r, description: n, actions: d, children: u, side: h = "right", className: a }) {
  const m = ke();
  return $(() => {
    if (!e) return;
    function s(o) {
      o.key === "Escape" && (t == null || t(!1));
    }
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [t, e]), e ? /* @__PURE__ */ c(
    "div",
    {
      "aria-labelledby": r ? m : void 0,
      "aria-modal": "true",
      className: "fixed inset-0 z-50 bg-gray-950/40",
      onClick: () => t == null ? void 0 : t(!1),
      role: "dialog",
      children: /* @__PURE__ */ x(
        "div",
        {
          className: k(
            "absolute top-0 flex h-full w-full max-w-md flex-col border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950",
            h === "left" ? "left-0" : "right-0",
            a
          ),
          onClick: (s) => s.stopPropagation(),
          children: [
            /* @__PURE__ */ x("div", { className: "flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700", children: [
              /* @__PURE__ */ x("div", { children: [
                r && /* @__PURE__ */ c("h2", { className: "text-base font-semibold text-gray-950 dark:text-gray-50", id: m, children: r }),
                n && /* @__PURE__ */ c("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: n })
              ] }),
              /* @__PURE__ */ c(
                "button",
                {
                  "aria-label": "Fechar",
                  className: "rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50",
                  onClick: () => t == null ? void 0 : t(!1),
                  type: "button",
                  children: /* @__PURE__ */ c(Be, { "aria-hidden": "true", size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "flex-1 overflow-y-auto p-6", children: u }),
            d && /* @__PURE__ */ c("div", { className: "flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700", children: d })
          ]
        }
      )
    }
  ) : null;
}
const ye = {
  positive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  negative: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
};
function Rt({ title: e, value: t, change: r, changeType: n = "neutral", description: d, className: u }) {
  return /* @__PURE__ */ x(F, { className: u, children: [
    /* @__PURE__ */ x("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ c("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: e }),
      r && /* @__PURE__ */ c("span", { className: k("rounded-md px-2 py-1 text-xs font-semibold", ye[n] ?? ye.neutral), children: r })
    ] }),
    /* @__PURE__ */ c("p", { className: "mt-2 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: t }),
    d && /* @__PURE__ */ c("p", { className: "mt-3 text-sm text-gray-500 dark:text-gray-400", children: d })
  ] });
}
function Wt({ data: e = [], color: t = "#2563eb", valueFormatter: r = (d) => d, className: n }) {
  const u = be(null), [h, a] = N(360), [m, s] = N(!1), o = 22, i = e.map((g) => Number(g.value || 0)), l = Math.min(...i, 0), b = Math.max(...i, 1) - l || 1, y = e.length > 1 ? (h - o * 2) / (e.length - 1) : 0, v = e.map((g, w) => ({
    ...g,
    x: o + y * w,
    y: 180 - o - (Number(g.value || 0) - l) / b * (180 - o * 2)
  }));
  return $(() => {
    const g = u.current;
    if (!g) return;
    function w() {
      a(g.clientWidth / Math.max(g.clientHeight, 1) * 180);
    }
    w();
    const L = requestAnimationFrame(() => s(!0)), A = new ResizeObserver(w);
    return A.observe(g), () => {
      cancelAnimationFrame(L), A.disconnect();
    };
  }, []), /* @__PURE__ */ c("div", { className: k("h-56 w-full", n), ref: u, children: /* @__PURE__ */ x("svg", { "aria-label": "Gráfico de linhas", className: "size-full overflow-visible", role: "img", viewBox: `0 0 ${h} 180`, children: [
    /* @__PURE__ */ c("line", { stroke: "currentColor", strokeDasharray: "3 4", strokeWidth: "1", className: "text-gray-200 dark:text-gray-800", x1: o, x2: h - o, y1: 180 - o, y2: 180 - o }),
    v.length > 1 && /* @__PURE__ */ c("polyline", { className: "transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none", fill: "none", pathLength: "1", points: v.map((g) => `${g.x},${g.y}`).join(" "), stroke: t, strokeDasharray: "1", strokeDashoffset: m ? "0" : "1", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3" }),
    v.map((g, w) => /* @__PURE__ */ x("g", { children: [
      /* @__PURE__ */ c("circle", { className: "cursor-pointer transition-opacity duration-500 ease-out hover:opacity-75 motion-reduce:transition-none dark:fill-gray-950", cx: g.x, cy: g.y, fill: "white", opacity: m ? 1 : 0, r: "5", stroke: t, strokeWidth: "3" }),
      /* @__PURE__ */ x("title", { children: [
        g.name,
        " - ",
        r(g.value)
      ] }),
      /* @__PURE__ */ c("text", { fill: "currentColor", fontSize: "10", textAnchor: "middle", className: "text-gray-500 dark:text-gray-400", x: g.x, y: 175, children: g.name })
    ] }, g.name ?? w))
  ] }) });
}
function Pt({ title: e, description: t, actions: r, children: n, className: d }) {
  return /* @__PURE__ */ x(F, { className: k("p-0", d), children: [
    (e || t || r) && /* @__PURE__ */ x("div", { className: "flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800", children: [
      /* @__PURE__ */ x("div", { children: [
        e && /* @__PURE__ */ c("h2", { className: "text-sm font-semibold text-gray-950 dark:text-gray-50", children: e }),
        t && /* @__PURE__ */ c("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
      ] }),
      r && /* @__PURE__ */ c("div", { className: "flex shrink-0 items-center gap-2", children: r })
    ] }),
    /* @__PURE__ */ c("div", { className: "p-6", children: n })
  ] });
}
function Ut({ title: e, description: t, actions: r, className: n }) {
  return /* @__PURE__ */ x("div", { className: k("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", n), children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ c("h1", { className: "text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50", children: e }),
      t && /* @__PURE__ */ c("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t })
    ] }),
    r && /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: r })
  ] });
}
function Ht({ className: e, ...t }) {
  return /* @__PURE__ */ c("div", { className: k("overflow-x-auto", e), ...t });
}
function Gt({ className: e, ...t }) {
  return /* @__PURE__ */ c("table", { className: k("w-full text-left text-sm", e), ...t });
}
function Vt({ className: e, ...t }) {
  return /* @__PURE__ */ c("thead", { className: k("border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400", e), ...t });
}
function Jt({ className: e, ...t }) {
  return /* @__PURE__ */ c("tbody", { className: k("divide-y divide-gray-200 dark:divide-gray-800", e), ...t });
}
function Kt({ className: e, ...t }) {
  return /* @__PURE__ */ c("tr", { className: e, ...t });
}
function Qt({ className: e, ...t }) {
  return /* @__PURE__ */ c("th", { className: k("pb-3 font-medium", e), ...t });
}
function Zt({ className: e, ...t }) {
  return /* @__PURE__ */ c("td", { className: k("py-4 text-gray-700 dark:text-gray-300", e), ...t });
}
function Xt({ tabs: e = [], value: t, onValueChange: r, label: n = "Navegação por separadores", className: d }) {
  return /* @__PURE__ */ c("div", { "aria-label": n, className: k("border-b border-gray-200 dark:border-gray-800", d), role: "tablist", children: /* @__PURE__ */ c("div", { className: "flex gap-1 overflow-x-auto", children: e.map((u) => {
    const h = u.value === t;
    return /* @__PURE__ */ c(
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
function Yt({ theme: e, defaultTheme: t = "light", onThemeChange: r }) {
  const [n, d] = N(t), u = B(O), a = (e ?? (u == null ? void 0 : u.theme) ?? n) === "dark";
  $(() => {
    document.documentElement.classList.toggle("dark", a);
  }, [a]);
  function m() {
    const s = a ? "light" : "dark";
    e === void 0 && (u ? u.setTheme(s) : d(s)), r == null || r(s);
  }
  return /* @__PURE__ */ c(
    "button",
    {
      "aria-label": a ? "Ativar tema claro" : "Ativar tema escuro",
      className: "inline-flex size-9 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50",
      onClick: m,
      type: "button",
      children: a ? /* @__PURE__ */ c(nt, { "aria-hidden": "true", size: 17 }) : /* @__PURE__ */ c(et, { "aria-hidden": "true", size: 17 })
    }
  );
}
function Ot({
  steps: e = [],
  activeStep: t,
  defaultStep: r = 0,
  onStepChange: n,
  onComplete: d,
  locale: u = "pt",
  className: h
}) {
  const [a, m] = N(r), s = E(u);
  if (e.length === 0) return null;
  const i = Math.min(Math.max(t ?? a, 0), e.length - 1), l = i === e.length - 1;
  function f(y) {
    t === void 0 && m(y), n == null || n(y);
  }
  function b() {
    l ? d == null || d() : f(i + 1);
  }
  return /* @__PURE__ */ x(F, { className: k("p-0", h), children: [
    /* @__PURE__ */ c("ol", { className: "grid border-b border-gray-200 sm:grid-cols-[repeat(var(--step-count),minmax(0,1fr))] dark:border-gray-800", style: { "--step-count": e.length }, children: e.map((y, v) => {
      const g = v === i, w = v < i;
      return /* @__PURE__ */ x("li", { className: "relative flex items-center gap-3 px-5 py-4", children: [
        /* @__PURE__ */ c(
          "span",
          {
            className: k(
              "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
              g && "border-blue-500 bg-blue-500 text-white",
              w && "border-emerald-500 bg-emerald-500 text-white",
              !g && !w && "border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            ),
            children: w ? /* @__PURE__ */ c(Qe, { "aria-hidden": "true", size: 15 }) : v + 1
          }
        ),
        /* @__PURE__ */ x("div", { children: [
          /* @__PURE__ */ c("p", { className: k("text-sm font-medium", g ? "text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"), children: y.title }),
          y.description && /* @__PURE__ */ c("p", { className: "mt-0.5 text-xs text-gray-500 dark:text-gray-400", children: y.description })
        ] })
      ] }, y.id ?? y.title);
    }) }),
    /* @__PURE__ */ c("div", { className: "min-h-44 p-6", children: e[i].content }),
    /* @__PURE__ */ x("div", { className: "flex justify-between gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800", children: [
      /* @__PURE__ */ c(M, { disabled: i === 0, onClick: () => f(i - 1), variant: "secondary", children: s("previous") }),
      /* @__PURE__ */ c(M, { onClick: b, children: s(l ? "finish" : "next") })
    ] })
  ] });
}
export {
  jt as Accordion,
  Bt as AlertBox,
  _t as AppShell,
  Dt as Badge,
  Mt as BarChart,
  it as Breadcrumbs,
  M as Button,
  F as Card,
  Et as ChartContainer,
  Ft as ConfirmDialog,
  gt as Dialog,
  qt as DonutChart,
  Ct as Drawer,
  Rt as Kpi,
  Lt as LanguageProvider,
  Wt as LineChart,
  Pt as PanelContainer,
  mt as Sidebar,
  Ut as SubHeader,
  Gt as Table,
  Jt as TableBody,
  Zt as TableCell,
  Vt as TableHead,
  Qt as TableHeaderCell,
  Ht as TableRoot,
  Kt as TableRow,
  Xt as Tabs,
  It as ThemeProvider,
  Yt as ThemeSwitch,
  Ot as Wizard,
  E as createTranslator,
  G as fetchJson,
  st as normalizeAppShellConfig,
  bt as useCreate,
  vt as useDelete,
  kt as useDeleteMany,
  pt as useGetList,
  Nt as useGetMany,
  wt as useGetOne,
  St as useInfiniteGetList,
  $t as useLanguage,
  At as useStore,
  Tt as useTheme,
  zt as useUpdate
};
