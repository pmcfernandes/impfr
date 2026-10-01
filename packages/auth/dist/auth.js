import { jsx as l, jsxs as h } from "react/jsx-runtime";
import { useId as V, useState as k, createElement as j, useContext as J, createContext as K } from "react";
const Q = {
  title: "Sign in",
  description: "Enter your credentials to continue.",
  forgotPasswordTitle: "Reset your password",
  forgotPasswordDescription: "Enter your email and we will send recovery instructions.",
  registerTitle: "Create an account",
  registerDescription: "Fill in your details to create an account.",
  changePasswordTitle: "Change password",
  changePasswordDescription: "Confirm your current password and choose a new one.",
  editProfileTitle: "Edit profile",
  editProfileDescription: "Update your account details.",
  profilePhoto: "Profile photo",
  gravatarDescription: "The photo comes from the Gravatar associated with this email.",
  name: "Name",
  email: "Email",
  password: "Password",
  rememberMe: "Remember me",
  currentPassword: "Current password",
  newPassword: "New password",
  confirmPassword: "Confirm password",
  passwordMismatch: "Passwords do not match.",
  submit: "Sign in",
  submitting: "Signing in...",
  register: "Create account",
  registering: "Creating account...",
  changePassword: "Change password",
  changingPassword: "Changing password...",
  saveProfile: "Save changes",
  savingProfile: "Saving...",
  groupsPermissionsTitle: "Groups and permissions",
  groupsPermissionsDescription: "Manage groups, their permissions, and assigned members.",
  newGroup: "New group",
  newGroupDescription: "Create an access profile",
  noGroups: "There are no groups yet.",
  createGroupTitle: "Create group",
  editGroupTitle: "Edit group",
  groupName: "Group name",
  groupNamePlaceholder: "E.g. Investigation team",
  groupDescription: "Description",
  groupDescriptionOptional: "Description (optional)",
  groupDescriptionPlaceholder: "This group's primary responsibility",
  usersLabel: "users",
  permissionsLabel: "permissions",
  noUsers: "There are no available users.",
  createGroup: "Create group",
  saveGroup: "Save group",
  savingGroup: "Saving...",
  orContinueWith: "or continue with",
  continueWith: "Continue with",
  sendReset: "Send instructions",
  sendingReset: "Sending...",
  backToLogin: "Back to sign in"
}, X = {
  title: "Iniciar sessão",
  description: "Introduza as suas credenciais para continuar.",
  forgotPasswordTitle: "Recuperar palavra-passe",
  forgotPasswordDescription: "Indique o seu email e enviaremos as instruções de recuperação.",
  registerTitle: "Criar conta",
  registerDescription: "Preencha os seus dados para criar uma conta.",
  changePasswordTitle: "Alterar palavra-passe",
  changePasswordDescription: "Confirme a palavra-passe atual e escolha uma nova.",
  editProfileTitle: "Editar perfil",
  editProfileDescription: "Atualize os dados da sua conta.",
  profilePhoto: "Foto de perfil",
  gravatarDescription: "A foto é obtida do Gravatar associado a este email.",
  name: "Nome",
  email: "Email",
  password: "Palavra-passe",
  rememberMe: "Lembrar-me",
  currentPassword: "Palavra-passe atual",
  newPassword: "Nova palavra-passe",
  confirmPassword: "Confirmar palavra-passe",
  passwordMismatch: "As palavras-passe não coincidem.",
  submit: "Entrar",
  submitting: "A entrar...",
  register: "Criar conta",
  registering: "A criar conta...",
  changePassword: "Alterar palavra-passe",
  changingPassword: "A alterar palavra-passe...",
  saveProfile: "Guardar alterações",
  savingProfile: "A guardar...",
  groupsPermissionsTitle: "Grupos e permissões",
  groupsPermissionsDescription: "Gira os grupos, as respetivas permissões e os membros associados.",
  newGroup: "Novo grupo",
  newGroupDescription: "Criar um perfil de acesso",
  noGroups: "Ainda não existem grupos.",
  createGroupTitle: "Criar grupo",
  editGroupTitle: "Editar grupo",
  groupName: "Nome do grupo",
  groupNamePlaceholder: "Ex.: Equipa de investigação",
  groupDescription: "Descrição",
  groupDescriptionOptional: "Descrição (opcional)",
  groupDescriptionPlaceholder: "Responsabilidade principal deste grupo",
  usersLabel: "utilizadores",
  permissionsLabel: "permissões",
  noUsers: "Não existem utilizadores disponíveis.",
  createGroup: "Criar grupo",
  saveGroup: "Guardar grupo",
  savingGroup: "A guardar...",
  orContinueWith: "ou continue com",
  continueWith: "Continuar com",
  sendReset: "Enviar instruções",
  sendingReset: "A enviar...",
  backToLogin: "Voltar ao login"
}, _ = { en: Q, pt: X };
function F(d = "pt") {
  const p = _[d] ?? _.pt;
  return (n) => p[n] ?? n;
}
function G({ className: d = "", children: p, ...n }) {
  return /* @__PURE__ */ l(
    "button",
    {
      className: `inline-flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400 dark:focus:ring-offset-gray-950 ${d}`,
      ...n,
      children: p
    }
  );
}
function E({ className: d = "", children: p }) {
  return /* @__PURE__ */ l("section", { className: `w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8 ${d}`, children: p });
}
function C({ label: d, name: p, ...n }) {
  return /* @__PURE__ */ h("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", htmlFor: p, children: [
    d,
    /* @__PURE__ */ l(
      "input",
      {
        className: "mt-1.5 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900 dark:disabled:bg-gray-900",
        id: p,
        name: p,
        ...n
      }
    )
  ] });
}
const H = {
  google: { label: "Google", icon: ee },
  microsoft: { label: "Microsoft", icon: re },
  apple: { label: "Apple", icon: te }
};
function Y({ providers: d, onSelect: p, disabled: n, t: i }) {
  const c = d.filter((u) => H[u]);
  return c.length === 0 ? null : /* @__PURE__ */ h("div", { className: "mt-6 space-y-4", children: [
    /* @__PURE__ */ h("div", { className: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ l("span", { className: "h-px flex-1 bg-gray-200 dark:bg-gray-800" }),
      i("orContinueWith"),
      /* @__PURE__ */ l("span", { className: "h-px flex-1 bg-gray-200 dark:bg-gray-800" })
    ] }),
    /* @__PURE__ */ l("div", { className: "grid gap-2", children: c.map((u) => {
      const { label: m, icon: e } = H[u];
      return /* @__PURE__ */ h(
        "button",
        {
          className: "flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-950",
          disabled: n,
          onClick: () => p == null ? void 0 : p(u),
          type: "button",
          children: [
            /* @__PURE__ */ l(e, {}),
            i("continueWith"),
            " ",
            m
          ]
        },
        u
      );
    }) })
  ] });
}
function ee() {
  return /* @__PURE__ */ h("svg", { "aria-hidden": "true", className: "h-5 w-5", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ l("path", { d: "M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.4 3.1-7.4Z", fill: "#4285F4" }),
    /* @__PURE__ */ l("path", { d: "M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z", fill: "#34A853" }),
    /* @__PURE__ */ l("path", { d: "M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3 1 4.3l3.2-2.6Z", fill: "#FBBC05" }),
    /* @__PURE__ */ l("path", { d: "M12 6c1.6 0 3 .5 4.1 1.6l3-3A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z", fill: "#EA4335" })
  ] });
}
function re() {
  return /* @__PURE__ */ h("svg", { "aria-hidden": "true", className: "h-4 w-4", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ l("path", { d: "M2 2h9.5v9.5H2z", fill: "#f35325" }),
    /* @__PURE__ */ l("path", { d: "M12.5 2H22v9.5h-9.5z", fill: "#81bc06" }),
    /* @__PURE__ */ l("path", { d: "M2 12.5h9.5V22H2z", fill: "#05a6f0" }),
    /* @__PURE__ */ l("path", { d: "M12.5 12.5H22V22h-9.5z", fill: "#ffba08" })
  ] });
}
function te() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ l("path", { d: "M17.1 12.7c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.7c-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8a4.3 4.3 0 0 0-3.7 2.2c-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.4a4 4 0 0 1-1.8-3.6Zm-2.2-6.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z" }) });
}
function fe({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onSocialLogin: c,
  socialProviders: u = [],
  submitting: m = !1,
  identifierLabel: e,
  identifierType: y = "email",
  showRememberMe: r = !0,
  rememberMe: a,
  defaultRememberMe: s = !1,
  onRememberMeChange: t,
  className: o = ""
}) {
  const g = F(d), w = V(), [b, x] = k(""), [P, v] = k(""), [f, N] = k(s), D = a ?? f;
  function B(T) {
    const S = T.target.checked;
    a === void 0 && N(S), t == null || t(S);
  }
  function A(T) {
    T.preventDefault(), i == null || i({ email: b, password: P, rememberMe: D });
  }
  return /* @__PURE__ */ h(E, { className: o, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? g("title") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? g("description") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: A, children: [
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: y === "email" ? "email" : "username",
          label: e ?? g("email"),
          name: "email",
          onChange: (T) => x(T.target.value),
          required: !0,
          type: y,
          value: b
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "current-password",
          label: g("password"),
          name: "password",
          onChange: (T) => v(T.target.value),
          required: !0,
          type: "password",
          value: P
        }
      ),
      r && /* @__PURE__ */ h("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300", htmlFor: w, children: [
        /* @__PURE__ */ l(
          "input",
          {
            checked: D,
            className: "h-4 w-4 rounded border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-700",
            id: w,
            name: "rememberMe",
            onChange: B,
            type: "checkbox"
          }
        ),
        g("rememberMe")
      ] }),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: m, type: "submit", children: g(m ? "submitting" : "submit") })
    ] }),
    /* @__PURE__ */ l(
      Y,
      {
        disabled: m,
        onSelect: c,
        providers: u,
        t: g
      }
    )
  ] });
}
function he({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onBack: c,
  submitting: u = !1,
  className: m = ""
}) {
  const e = F(d), [y, r] = k("");
  function a(s) {
    s.preventDefault(), i == null || i({ email: y });
  }
  return /* @__PURE__ */ h(E, { className: m, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? e("forgotPasswordTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? e("forgotPasswordDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: a, children: [
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "email",
          label: e("email"),
          name: "email",
          onChange: (s) => r(s.target.value),
          required: !0,
          type: "email",
          value: y
        }
      ),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: u, type: "submit", children: e(u ? "sendingReset" : "sendReset") })
    ] }),
    c && /* @__PURE__ */ l(
      "button",
      {
        className: "mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
        onClick: c,
        type: "button",
        children: e("backToLogin")
      }
    )
  ] });
}
function be({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onBack: c,
  submitting: u = !1,
  className: m = ""
}) {
  const e = F(d), [y, r] = k(""), [a, s] = k(""), [t, o] = k(""), [g, w] = k(""), [b, x] = k(null);
  function P(v) {
    if (v.preventDefault(), t !== g) {
      x(e("passwordMismatch"));
      return;
    }
    x(null), i == null || i({ name: y, email: a, password: t });
  }
  return /* @__PURE__ */ h(E, { className: m, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? e("registerTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? e("registerDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: P, children: [
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "name",
          label: e("name"),
          name: "name",
          onChange: (v) => r(v.target.value),
          required: !0,
          type: "text",
          value: y
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "email",
          label: e("email"),
          name: "email",
          onChange: (v) => s(v.target.value),
          required: !0,
          type: "email",
          value: a
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "new-password",
          label: e("password"),
          name: "password",
          onChange: (v) => o(v.target.value),
          required: !0,
          type: "password",
          value: t
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "new-password",
          label: e("confirmPassword"),
          name: "confirm-password",
          onChange: (v) => {
            w(v.target.value), x(null);
          },
          required: !0,
          type: "password",
          value: g
        }
      ),
      b && /* @__PURE__ */ l("p", { className: "rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400", role: "alert", children: b }),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: u, type: "submit", children: e(u ? "registering" : "register") })
    ] }),
    c && /* @__PURE__ */ l(
      "button",
      {
        className: "mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
        onClick: c,
        type: "button",
        children: e("backToLogin")
      }
    )
  ] });
}
function ye({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  submitting: c = !1,
  className: u = ""
}) {
  const m = F(d), [e, y] = k(""), [r, a] = k(""), [s, t] = k(""), [o, g] = k(null);
  function w(b) {
    if (b.preventDefault(), r !== s) {
      g(m("passwordMismatch"));
      return;
    }
    g(null), i == null || i({ currentPassword: e, password: r });
  }
  return /* @__PURE__ */ h(E, { className: u, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? m("changePasswordTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? m("changePasswordDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: w, children: [
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "current-password",
          label: m("currentPassword"),
          name: "current-password",
          onChange: (b) => y(b.target.value),
          required: !0,
          type: "password",
          value: e
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "new-password",
          label: m("newPassword"),
          name: "new-password",
          onChange: (b) => a(b.target.value),
          required: !0,
          type: "password",
          value: r
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "new-password",
          label: m("confirmPassword"),
          name: "confirm-password",
          onChange: (b) => {
            t(b.target.value), g(null);
          },
          required: !0,
          type: "password",
          value: s
        }
      ),
      o && /* @__PURE__ */ l("p", { className: "rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400", role: "alert", children: o }),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: c, type: "submit", children: m(c ? "changingPassword" : "changePassword") })
    ] })
  ] });
}
function ae(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var I = { exports: {} }, M = { exports: {} }, L;
function se() {
  return L || (L = 1, (function() {
    var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = {
      // Bit-wise rotation left
      rotl: function(n, i) {
        return n << i | n >>> 32 - i;
      },
      // Bit-wise rotation right
      rotr: function(n, i) {
        return n << 32 - i | n >>> i;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function(n) {
        if (n.constructor == Number)
          return p.rotl(n, 8) & 16711935 | p.rotl(n, 24) & 4278255360;
        for (var i = 0; i < n.length; i++)
          n[i] = p.endian(n[i]);
        return n;
      },
      // Generate an array of any length of random bytes
      randomBytes: function(n) {
        for (var i = []; n > 0; n--)
          i.push(Math.floor(Math.random() * 256));
        return i;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(n) {
        for (var i = [], c = 0, u = 0; c < n.length; c++, u += 8)
          i[u >>> 5] |= n[c] << 24 - u % 32;
        return i;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(n) {
        for (var i = [], c = 0; c < n.length * 32; c += 8)
          i.push(n[c >>> 5] >>> 24 - c % 32 & 255);
        return i;
      },
      // Convert a byte array to a hex string
      bytesToHex: function(n) {
        for (var i = [], c = 0; c < n.length; c++)
          i.push((n[c] >>> 4).toString(16)), i.push((n[c] & 15).toString(16));
        return i.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function(n) {
        for (var i = [], c = 0; c < n.length; c += 2)
          i.push(parseInt(n.substr(c, 2), 16));
        return i;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function(n) {
        for (var i = [], c = 0; c < n.length; c += 3)
          for (var u = n[c] << 16 | n[c + 1] << 8 | n[c + 2], m = 0; m < 4; m++)
            c * 8 + m * 6 <= n.length * 8 ? i.push(d.charAt(u >>> 6 * (3 - m) & 63)) : i.push("=");
        return i.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function(n) {
        n = n.replace(/[^A-Z0-9+\/]/ig, "");
        for (var i = [], c = 0, u = 0; c < n.length; u = ++c % 4)
          u != 0 && i.push((d.indexOf(n.charAt(c - 1)) & Math.pow(2, -2 * u + 8) - 1) << u * 2 | d.indexOf(n.charAt(c)) >>> 6 - u * 2);
        return i;
      }
    };
    M.exports = p;
  })()), M.exports;
}
var q, z;
function U() {
  if (z) return q;
  z = 1;
  var d = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(p) {
        return d.bin.stringToBytes(unescape(encodeURIComponent(p)));
      },
      // Convert a byte array to a string
      bytesToString: function(p) {
        return decodeURIComponent(escape(d.bin.bytesToString(p)));
      }
    },
    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(p) {
        for (var n = [], i = 0; i < p.length; i++)
          n.push(p.charCodeAt(i) & 255);
        return n;
      },
      // Convert a byte array to a string
      bytesToString: function(p) {
        for (var n = [], i = 0; i < p.length; i++)
          n.push(String.fromCharCode(p[i]));
        return n.join("");
      }
    }
  };
  return q = d, q;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var R, O;
function ne() {
  if (O) return R;
  O = 1, R = function(n) {
    return n != null && (d(n) || p(n) || !!n._isBuffer);
  };
  function d(n) {
    return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
  }
  function p(n) {
    return typeof n.readFloatLE == "function" && typeof n.slice == "function" && d(n.slice(0, 0));
  }
  return R;
}
var $;
function oe() {
  return $ || ($ = 1, (function() {
    var d = se(), p = U().utf8, n = ne(), i = U().bin, c = function(u, m) {
      u.constructor == String ? m && m.encoding === "binary" ? u = i.stringToBytes(u) : u = p.stringToBytes(u) : n(u) ? u = Array.prototype.slice.call(u, 0) : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
      for (var e = d.bytesToWords(u), y = u.length * 8, r = 1732584193, a = -271733879, s = -1732584194, t = 271733878, o = 0; o < e.length; o++)
        e[o] = (e[o] << 8 | e[o] >>> 24) & 16711935 | (e[o] << 24 | e[o] >>> 8) & 4278255360;
      e[y >>> 5] |= 128 << y % 32, e[(y + 64 >>> 9 << 4) + 14] = y;
      for (var g = c._ff, w = c._gg, b = c._hh, x = c._ii, o = 0; o < e.length; o += 16) {
        var P = r, v = a, f = s, N = t;
        r = g(r, a, s, t, e[o + 0], 7, -680876936), t = g(t, r, a, s, e[o + 1], 12, -389564586), s = g(s, t, r, a, e[o + 2], 17, 606105819), a = g(a, s, t, r, e[o + 3], 22, -1044525330), r = g(r, a, s, t, e[o + 4], 7, -176418897), t = g(t, r, a, s, e[o + 5], 12, 1200080426), s = g(s, t, r, a, e[o + 6], 17, -1473231341), a = g(a, s, t, r, e[o + 7], 22, -45705983), r = g(r, a, s, t, e[o + 8], 7, 1770035416), t = g(t, r, a, s, e[o + 9], 12, -1958414417), s = g(s, t, r, a, e[o + 10], 17, -42063), a = g(a, s, t, r, e[o + 11], 22, -1990404162), r = g(r, a, s, t, e[o + 12], 7, 1804603682), t = g(t, r, a, s, e[o + 13], 12, -40341101), s = g(s, t, r, a, e[o + 14], 17, -1502002290), a = g(a, s, t, r, e[o + 15], 22, 1236535329), r = w(r, a, s, t, e[o + 1], 5, -165796510), t = w(t, r, a, s, e[o + 6], 9, -1069501632), s = w(s, t, r, a, e[o + 11], 14, 643717713), a = w(a, s, t, r, e[o + 0], 20, -373897302), r = w(r, a, s, t, e[o + 5], 5, -701558691), t = w(t, r, a, s, e[o + 10], 9, 38016083), s = w(s, t, r, a, e[o + 15], 14, -660478335), a = w(a, s, t, r, e[o + 4], 20, -405537848), r = w(r, a, s, t, e[o + 9], 5, 568446438), t = w(t, r, a, s, e[o + 14], 9, -1019803690), s = w(s, t, r, a, e[o + 3], 14, -187363961), a = w(a, s, t, r, e[o + 8], 20, 1163531501), r = w(r, a, s, t, e[o + 13], 5, -1444681467), t = w(t, r, a, s, e[o + 2], 9, -51403784), s = w(s, t, r, a, e[o + 7], 14, 1735328473), a = w(a, s, t, r, e[o + 12], 20, -1926607734), r = b(r, a, s, t, e[o + 5], 4, -378558), t = b(t, r, a, s, e[o + 8], 11, -2022574463), s = b(s, t, r, a, e[o + 11], 16, 1839030562), a = b(a, s, t, r, e[o + 14], 23, -35309556), r = b(r, a, s, t, e[o + 1], 4, -1530992060), t = b(t, r, a, s, e[o + 4], 11, 1272893353), s = b(s, t, r, a, e[o + 7], 16, -155497632), a = b(a, s, t, r, e[o + 10], 23, -1094730640), r = b(r, a, s, t, e[o + 13], 4, 681279174), t = b(t, r, a, s, e[o + 0], 11, -358537222), s = b(s, t, r, a, e[o + 3], 16, -722521979), a = b(a, s, t, r, e[o + 6], 23, 76029189), r = b(r, a, s, t, e[o + 9], 4, -640364487), t = b(t, r, a, s, e[o + 12], 11, -421815835), s = b(s, t, r, a, e[o + 15], 16, 530742520), a = b(a, s, t, r, e[o + 2], 23, -995338651), r = x(r, a, s, t, e[o + 0], 6, -198630844), t = x(t, r, a, s, e[o + 7], 10, 1126891415), s = x(s, t, r, a, e[o + 14], 15, -1416354905), a = x(a, s, t, r, e[o + 5], 21, -57434055), r = x(r, a, s, t, e[o + 12], 6, 1700485571), t = x(t, r, a, s, e[o + 3], 10, -1894986606), s = x(s, t, r, a, e[o + 10], 15, -1051523), a = x(a, s, t, r, e[o + 1], 21, -2054922799), r = x(r, a, s, t, e[o + 8], 6, 1873313359), t = x(t, r, a, s, e[o + 15], 10, -30611744), s = x(s, t, r, a, e[o + 6], 15, -1560198380), a = x(a, s, t, r, e[o + 13], 21, 1309151649), r = x(r, a, s, t, e[o + 4], 6, -145523070), t = x(t, r, a, s, e[o + 11], 10, -1120210379), s = x(s, t, r, a, e[o + 2], 15, 718787259), a = x(a, s, t, r, e[o + 9], 21, -343485551), r = r + P >>> 0, a = a + v >>> 0, s = s + f >>> 0, t = t + N >>> 0;
      }
      return d.endian([r, a, s, t]);
    };
    c._ff = function(u, m, e, y, r, a, s) {
      var t = u + (m & e | ~m & y) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._gg = function(u, m, e, y, r, a, s) {
      var t = u + (m & y | e & ~y) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._hh = function(u, m, e, y, r, a, s) {
      var t = u + (m ^ e ^ y) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._ii = function(u, m, e, y, r, a, s) {
      var t = u + (e ^ (m | ~y)) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._blocksize = 16, c._digestsize = 16, I.exports = function(u, m) {
      if (u == null)
        throw new Error("Illegal argument " + u);
      var e = d.wordsToBytes(c(u, m));
      return m && m.asBytes ? e : m && m.asString ? i.bytesToString(e) : d.bytesToHex(e);
    };
  })()), I.exports;
}
var ie = oe();
const le = /* @__PURE__ */ ae(ie);
function xe({
  initialValues: d = {},
  customFields: p = [],
  locale: n = "pt",
  title: i,
  description: c,
  onSubmit: u,
  onBack: m,
  submitting: e = !1,
  className: y = ""
}) {
  const r = F(n), [a, s] = k(d.name ?? ""), [t, o] = k(d.email ?? ""), [g, w] = k(
    () => Object.fromEntries(p.map((v) => [v.key, d[v.key] ?? ""]))
  ), x = `https://www.gravatar.com/avatar/${le(t.trim().toLowerCase())}?d=mp&s=160`;
  function P(v) {
    v.preventDefault(), u == null || u({ name: a, email: t, ...g });
  }
  return /* @__PURE__ */ h(E, { className: y, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: i ?? r("editProfileTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: c ?? r("editProfileDescription") })
    ] }),
    /* @__PURE__ */ h("div", { className: "mb-6 flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900", children: [
      /* @__PURE__ */ l(
        "img",
        {
          alt: r("profilePhoto"),
          className: "h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800",
          height: "64",
          referrerPolicy: "no-referrer",
          src: x,
          width: "64"
        }
      ),
      /* @__PURE__ */ l("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: r("gravatarDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: P, children: [
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "name",
          label: r("name"),
          name: "name",
          onChange: (v) => s(v.target.value),
          required: !0,
          type: "text",
          value: a
        }
      ),
      /* @__PURE__ */ l(
        C,
        {
          autoComplete: "email",
          label: r("email"),
          name: "email",
          onChange: (v) => o(v.target.value),
          required: !0,
          type: "email",
          value: t
        }
      ),
      p.map(({ key: v, label: f, type: N = "text", ...D }) => /* @__PURE__ */ j(
        C,
        {
          ...D,
          key: v,
          label: f ?? v,
          name: v,
          onChange: (B) => w((A) => ({ ...A, [v]: B.target.value })),
          type: N,
          value: g[v]
        }
      )),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: e, type: "submit", children: r(e ? "savingProfile" : "saveProfile") })
    ] }),
    m && /* @__PURE__ */ l(
      "button",
      {
        className: "mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
        onClick: m,
        type: "button",
        children: r("backToLogin")
      }
    )
  ] });
}
function ve({
  groups: d = [],
  users: p = [],
  permissions: n = [],
  initialSelectedGroupId: i = null,
  selectedGroupId: c,
  onSelectedGroupChange: u,
  onCreate: m,
  onUpdate: e,
  isSaving: y = !1,
  errors: r = {},
  hideHeader: a = !1,
  locale: s = "pt",
  accentColor: t = "#155DFC",
  className: o = ""
}) {
  const g = F(s), [w, b] = k(i), x = c === void 0 ? w : c, P = d.find((f) => String(f.id) === String(x)) ?? null;
  function v(f) {
    c === void 0 && b(f), u == null || u(f);
  }
  return /* @__PURE__ */ h("section", { className: `w-full ${o}`, children: [
    !a && /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: g("groupsPermissionsTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: g("groupsPermissionsDescription") })
    ] }),
    /* @__PURE__ */ h("div", { className: "grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ h("aside", { className: "space-y-3 self-start", children: [
        /* @__PURE__ */ h(
          "button",
          {
            className: `w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${x == null ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`,
            onClick: () => v(null),
            style: x == null ? { borderColor: t } : void 0,
            type: "button",
            children: [
              /* @__PURE__ */ l("p", { className: "font-medium text-blue-600 dark:text-blue-400", children: g("newGroup") }),
              /* @__PURE__ */ l("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: g("newGroupDescription") })
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "space-y-3", children: d.length === 0 ? /* @__PURE__ */ l("p", { className: "rounded-md bg-gray-50 p-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400", children: g("noGroups") }) : d.map((f) => {
          var A, T;
          const N = String(f.id) === String(x), D = ((A = f.users) == null ? void 0 : A.length) ?? 0, B = ((T = f.permissions) == null ? void 0 : T.length) ?? 0;
          return /* @__PURE__ */ h(
            "button",
            {
              className: `w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${N ? "bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`,
              onClick: () => v(f.id),
              style: N ? { borderColor: t } : void 0,
              type: "button",
              children: [
                /* @__PURE__ */ l("p", { className: "font-semibold text-gray-900 dark:text-gray-50", children: f.name }),
                /* @__PURE__ */ h("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: [
                  D,
                  " ",
                  g("usersLabel"),
                  " · ",
                  B,
                  " ",
                  g("permissionsLabel")
                ] })
              ]
            },
            f.id
          );
        }) })
      ] }),
      /* @__PURE__ */ l(
        de,
        {
          accentColor: t,
          errors: r,
          group: P,
          isSaving: y,
          onCreate: m,
          onUpdate: e,
          permissions: n,
          t: g,
          users: p
        },
        (P == null ? void 0 : P.id) ?? "new"
      )
    ] })
  ] });
}
function de({ group: d, permissions: p, users: n, onCreate: i, onUpdate: c, isSaving: u, errors: m, t: e, accentColor: y }) {
  var v;
  const [r, a] = k((d == null ? void 0 : d.name) ?? ""), [s, t] = k((d == null ? void 0 : d.description) ?? ""), [o, g] = k((d == null ? void 0 : d.permissions) ?? []), [w, b] = k(((v = d == null ? void 0 : d.users) == null ? void 0 : v.map((f) => f.id)) ?? []);
  function x(f, N) {
    return f.includes(N) ? f.filter((D) => D !== N) : [...f, N];
  }
  async function P(f) {
    f.preventDefault();
    const N = { name: r, description: s, permissions: o, userIds: w };
    if (d) {
      await (c == null ? void 0 : c(d.id, N));
      return;
    }
    await (i == null ? void 0 : i(N)), a(""), t(""), g([]), b([]);
  }
  return /* @__PURE__ */ l(E, { className: "max-w-none", children: /* @__PURE__ */ h("form", { className: "space-y-6", onSubmit: P, children: [
    /* @__PURE__ */ l("h2", { className: "text-lg font-semibold text-gray-900 dark:text-gray-50", children: e(d ? "editGroupTitle" : "createGroupTitle") }),
    /* @__PURE__ */ h("div", { className: "space-y-4", children: [
      /* @__PURE__ */ h("div", { children: [
        /* @__PURE__ */ l(
          C,
          {
            label: e("groupName"),
            name: "group-name",
            onChange: (f) => a(f.target.value),
            placeholder: e("groupNamePlaceholder"),
            required: !0,
            type: "text",
            value: r
          }
        ),
        m.name && /* @__PURE__ */ l("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: m.name })
      ] }),
      /* @__PURE__ */ h("div", { children: [
        /* @__PURE__ */ l(
          C,
          {
            label: e("groupDescriptionOptional"),
            name: "group-description",
            onChange: (f) => t(f.target.value),
            placeholder: e("groupDescriptionPlaceholder"),
            type: "text",
            value: s
          }
        ),
        m.description && /* @__PURE__ */ l("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: m.description })
      ] })
    ] }),
    /* @__PURE__ */ h("fieldset", { children: [
      /* @__PURE__ */ l("legend", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: e("permissionsLabel") }),
      /* @__PURE__ */ l("div", { className: "mt-3 grid gap-3 sm:grid-cols-2", children: p.map((f) => /* @__PURE__ */ l(
        ce,
        {
          checked: o.includes(f.key),
          label: f.label,
          onChange: () => g((N) => x(N, f.key)),
          value: f.key,
          accentColor: y
        },
        f.key
      )) }),
      m.permissions && /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: m.permissions })
    ] }),
    /* @__PURE__ */ h("fieldset", { children: [
      /* @__PURE__ */ l("legend", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: e("usersLabel") }),
      /* @__PURE__ */ l("div", { className: "mt-3 max-h-48 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3 dark:border-gray-800", children: n.length === 0 ? /* @__PURE__ */ l("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: e("noUsers") }) : n.map((f) => /* @__PURE__ */ l(
        ue,
        {
          checked: w.includes(f.id),
          user: f,
          onChange: () => b((N) => x(N, f.id)),
          value: f.id,
          accentColor: y
        },
        f.id
      )) }),
      m.userIds && /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: m.userIds })
    ] }),
    /* @__PURE__ */ l(G, { className: "w-full sm:w-auto", disabled: u, type: "submit", children: e(u ? "savingGroup" : d ? "saveGroup" : "createGroup") })
  ] }) });
}
function ce({ checked: d, label: p, onChange: n, value: i, accentColor: c }) {
  return /* @__PURE__ */ h("label", { className: "flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900", children: [
    /* @__PURE__ */ l(
      "input",
      {
        checked: d,
        className: "mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-700",
        onChange: n,
        style: { accentColor: c },
        type: "checkbox",
        value: i
      }
    ),
    /* @__PURE__ */ l("span", { children: p })
  ] });
}
function ue({ checked: d, user: p, onChange: n, value: i, accentColor: c }) {
  return /* @__PURE__ */ h("label", { className: "flex cursor-pointer items-start gap-3 rounded-md p-1 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900", children: [
    /* @__PURE__ */ l(
      "input",
      {
        checked: d,
        className: "mt-0.5 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-700",
        onChange: n,
        style: { accentColor: c },
        type: "checkbox",
        value: i
      }
    ),
    /* @__PURE__ */ h("span", { children: [
      /* @__PURE__ */ l("span", { className: "block font-medium", children: p.name }),
      /* @__PURE__ */ l("span", { className: "mt-0.5 block text-xs text-gray-500 dark:text-gray-400", children: p.email })
    ] })
  ] });
}
const W = K(null);
function we({ children: d, initialUser: p = null, onLogin: n, onLogout: i }) {
  const [c, u] = k(p);
  async function m(y) {
    const r = n ? await n(y) : y;
    return u(r), r;
  }
  async function e() {
    await (i == null ? void 0 : i(c)), u(null);
  }
  return /* @__PURE__ */ l(W.Provider, { value: { isAuthenticated: !!c, login: m, logout: e, setUser: u, user: c }, children: d });
}
function Z() {
  const d = J(W);
  if (!d) throw new Error("useAuth must be used within an AuthProvider");
  return d;
}
function ke() {
  return Z().isAuthenticated;
}
function me(d, p) {
  var i;
  const { user: n } = Z();
  return ((i = n == null ? void 0 : n.permissions) == null ? void 0 : i.includes(`${p}.${d}`)) ?? !1;
}
function Ne({ action: d, children: p, resource: n }) {
  return me(d, n) ? p : null;
}
export {
  we as AuthProvider,
  Ne as CanAccess,
  ye as ChangePassword,
  xe as EditProfile,
  he as ForgotPassword,
  ve as GroupsPermissions,
  fe as Login,
  be as Register,
  F as createTranslator,
  Z as useAuth,
  ke as useAuthenticated,
  me as useCanAccess
};
