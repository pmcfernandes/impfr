import { jsx as l, jsxs as h } from "react/jsx-runtime";
import { useId as W, useState as k, createElement as Z, useContext as V, createContext as j } from "react";
const J = {
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
}, K = {
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
}, R = { en: J, pt: K };
function F(d = "pt") {
  const p = R[d] ?? R.pt;
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
function P({ label: d, name: p, ...n }) {
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
const S = {
  google: { label: "Google", icon: X },
  microsoft: { label: "Microsoft", icon: Y },
  apple: { label: "Apple", icon: ee }
};
function Q({ providers: d, onSelect: p, disabled: n, t: i }) {
  const c = d.filter((u) => S[u]);
  return c.length === 0 ? null : /* @__PURE__ */ h("div", { className: "mt-6 space-y-4", children: [
    /* @__PURE__ */ h("div", { className: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ l("span", { className: "h-px flex-1 bg-gray-200 dark:bg-gray-800" }),
      i("orContinueWith"),
      /* @__PURE__ */ l("span", { className: "h-px flex-1 bg-gray-200 dark:bg-gray-800" })
    ] }),
    /* @__PURE__ */ l("div", { className: "grid gap-2", children: c.map((u) => {
      const { label: m, icon: e } = S[u];
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
function X() {
  return /* @__PURE__ */ h("svg", { "aria-hidden": "true", className: "h-5 w-5", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ l("path", { d: "M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.4 3.1-7.4Z", fill: "#4285F4" }),
    /* @__PURE__ */ l("path", { d: "M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z", fill: "#34A853" }),
    /* @__PURE__ */ l("path", { d: "M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3 1 4.3l3.2-2.6Z", fill: "#FBBC05" }),
    /* @__PURE__ */ l("path", { d: "M12 6c1.6 0 3 .5 4.1 1.6l3-3A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z", fill: "#EA4335" })
  ] });
}
function Y() {
  return /* @__PURE__ */ h("svg", { "aria-hidden": "true", className: "h-4 w-4", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ l("path", { d: "M2 2h9.5v9.5H2z", fill: "#f35325" }),
    /* @__PURE__ */ l("path", { d: "M12.5 2H22v9.5h-9.5z", fill: "#81bc06" }),
    /* @__PURE__ */ l("path", { d: "M2 12.5h9.5V22H2z", fill: "#05a6f0" }),
    /* @__PURE__ */ l("path", { d: "M12.5 12.5H22V22h-9.5z", fill: "#ffba08" })
  ] });
}
function ee() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ l("path", { d: "M17.1 12.7c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.7c-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8a4.3 4.3 0 0 0-3.7 2.2c-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.4a4 4 0 0 1-1.8-3.6Zm-2.2-6.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z" }) });
}
function pe({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onSocialLogin: c,
  socialProviders: u = [],
  submitting: m = !1,
  showRememberMe: e = !0,
  rememberMe: b,
  defaultRememberMe: r = !1,
  onRememberMeChange: a,
  className: s = ""
}) {
  const t = F(d), o = W(), [y, w] = k(""), [f, v] = k(""), [C, g] = k(r), x = b ?? C;
  function N(T) {
    const A = T.target.checked;
    b === void 0 && g(A), a == null || a(A);
  }
  function D(T) {
    T.preventDefault(), i == null || i({ email: y, password: f, rememberMe: x });
  }
  return /* @__PURE__ */ h(E, { className: s, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? t("title") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? t("description") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: D, children: [
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "email",
          label: t("email"),
          name: "email",
          onChange: (T) => w(T.target.value),
          required: !0,
          type: "email",
          value: y
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "current-password",
          label: t("password"),
          name: "password",
          onChange: (T) => v(T.target.value),
          required: !0,
          type: "password",
          value: f
        }
      ),
      e && /* @__PURE__ */ h("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300", htmlFor: o, children: [
        /* @__PURE__ */ l(
          "input",
          {
            checked: x,
            className: "h-4 w-4 rounded border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-700",
            id: o,
            name: "rememberMe",
            onChange: N,
            type: "checkbox"
          }
        ),
        t("rememberMe")
      ] }),
      /* @__PURE__ */ l(G, { className: "w-full", disabled: m, type: "submit", children: t(m ? "submitting" : "submit") })
    ] }),
    /* @__PURE__ */ l(
      Q,
      {
        disabled: m,
        onSelect: c,
        providers: u,
        t
      }
    )
  ] });
}
function ge({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onBack: c,
  submitting: u = !1,
  className: m = ""
}) {
  const e = F(d), [b, r] = k("");
  function a(s) {
    s.preventDefault(), i == null || i({ email: b });
  }
  return /* @__PURE__ */ h(E, { className: m, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? e("forgotPasswordTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? e("forgotPasswordDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: a, children: [
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "email",
          label: e("email"),
          name: "email",
          onChange: (s) => r(s.target.value),
          required: !0,
          type: "email",
          value: b
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
function fe({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  onBack: c,
  submitting: u = !1,
  className: m = ""
}) {
  const e = F(d), [b, r] = k(""), [a, s] = k(""), [t, o] = k(""), [y, w] = k(""), [f, v] = k(null);
  function C(g) {
    if (g.preventDefault(), t !== y) {
      v(e("passwordMismatch"));
      return;
    }
    v(null), i == null || i({ name: b, email: a, password: t });
  }
  return /* @__PURE__ */ h(E, { className: m, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? e("registerTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? e("registerDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: C, children: [
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "name",
          label: e("name"),
          name: "name",
          onChange: (g) => r(g.target.value),
          required: !0,
          type: "text",
          value: b
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "email",
          label: e("email"),
          name: "email",
          onChange: (g) => s(g.target.value),
          required: !0,
          type: "email",
          value: a
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "new-password",
          label: e("password"),
          name: "password",
          onChange: (g) => o(g.target.value),
          required: !0,
          type: "password",
          value: t
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "new-password",
          label: e("confirmPassword"),
          name: "confirm-password",
          onChange: (g) => {
            w(g.target.value), v(null);
          },
          required: !0,
          type: "password",
          value: y
        }
      ),
      f && /* @__PURE__ */ l("p", { className: "rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400", role: "alert", children: f }),
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
function he({
  locale: d = "pt",
  title: p,
  description: n,
  onSubmit: i,
  submitting: c = !1,
  className: u = ""
}) {
  const m = F(d), [e, b] = k(""), [r, a] = k(""), [s, t] = k(""), [o, y] = k(null);
  function w(f) {
    if (f.preventDefault(), r !== s) {
      y(m("passwordMismatch"));
      return;
    }
    y(null), i == null || i({ currentPassword: e, password: r });
  }
  return /* @__PURE__ */ h(E, { className: u, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: p ?? m("changePasswordTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: n ?? m("changePasswordDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: w, children: [
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "current-password",
          label: m("currentPassword"),
          name: "current-password",
          onChange: (f) => b(f.target.value),
          required: !0,
          type: "password",
          value: e
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "new-password",
          label: m("newPassword"),
          name: "new-password",
          onChange: (f) => a(f.target.value),
          required: !0,
          type: "password",
          value: r
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "new-password",
          label: m("confirmPassword"),
          name: "confirm-password",
          onChange: (f) => {
            t(f.target.value), y(null);
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
function re(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var B = { exports: {} }, I = { exports: {} }, _;
function te() {
  return _ || (_ = 1, (function() {
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
    I.exports = p;
  })()), I.exports;
}
var M, H;
function L() {
  if (H) return M;
  H = 1;
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
  return M = d, M;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var q, z;
function ae() {
  if (z) return q;
  z = 1, q = function(n) {
    return n != null && (d(n) || p(n) || !!n._isBuffer);
  };
  function d(n) {
    return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
  }
  function p(n) {
    return typeof n.readFloatLE == "function" && typeof n.slice == "function" && d(n.slice(0, 0));
  }
  return q;
}
var U;
function se() {
  return U || (U = 1, (function() {
    var d = te(), p = L().utf8, n = ae(), i = L().bin, c = function(u, m) {
      u.constructor == String ? m && m.encoding === "binary" ? u = i.stringToBytes(u) : u = p.stringToBytes(u) : n(u) ? u = Array.prototype.slice.call(u, 0) : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
      for (var e = d.bytesToWords(u), b = u.length * 8, r = 1732584193, a = -271733879, s = -1732584194, t = 271733878, o = 0; o < e.length; o++)
        e[o] = (e[o] << 8 | e[o] >>> 24) & 16711935 | (e[o] << 24 | e[o] >>> 8) & 4278255360;
      e[b >>> 5] |= 128 << b % 32, e[(b + 64 >>> 9 << 4) + 14] = b;
      for (var y = c._ff, w = c._gg, f = c._hh, v = c._ii, o = 0; o < e.length; o += 16) {
        var C = r, g = a, x = s, N = t;
        r = y(r, a, s, t, e[o + 0], 7, -680876936), t = y(t, r, a, s, e[o + 1], 12, -389564586), s = y(s, t, r, a, e[o + 2], 17, 606105819), a = y(a, s, t, r, e[o + 3], 22, -1044525330), r = y(r, a, s, t, e[o + 4], 7, -176418897), t = y(t, r, a, s, e[o + 5], 12, 1200080426), s = y(s, t, r, a, e[o + 6], 17, -1473231341), a = y(a, s, t, r, e[o + 7], 22, -45705983), r = y(r, a, s, t, e[o + 8], 7, 1770035416), t = y(t, r, a, s, e[o + 9], 12, -1958414417), s = y(s, t, r, a, e[o + 10], 17, -42063), a = y(a, s, t, r, e[o + 11], 22, -1990404162), r = y(r, a, s, t, e[o + 12], 7, 1804603682), t = y(t, r, a, s, e[o + 13], 12, -40341101), s = y(s, t, r, a, e[o + 14], 17, -1502002290), a = y(a, s, t, r, e[o + 15], 22, 1236535329), r = w(r, a, s, t, e[o + 1], 5, -165796510), t = w(t, r, a, s, e[o + 6], 9, -1069501632), s = w(s, t, r, a, e[o + 11], 14, 643717713), a = w(a, s, t, r, e[o + 0], 20, -373897302), r = w(r, a, s, t, e[o + 5], 5, -701558691), t = w(t, r, a, s, e[o + 10], 9, 38016083), s = w(s, t, r, a, e[o + 15], 14, -660478335), a = w(a, s, t, r, e[o + 4], 20, -405537848), r = w(r, a, s, t, e[o + 9], 5, 568446438), t = w(t, r, a, s, e[o + 14], 9, -1019803690), s = w(s, t, r, a, e[o + 3], 14, -187363961), a = w(a, s, t, r, e[o + 8], 20, 1163531501), r = w(r, a, s, t, e[o + 13], 5, -1444681467), t = w(t, r, a, s, e[o + 2], 9, -51403784), s = w(s, t, r, a, e[o + 7], 14, 1735328473), a = w(a, s, t, r, e[o + 12], 20, -1926607734), r = f(r, a, s, t, e[o + 5], 4, -378558), t = f(t, r, a, s, e[o + 8], 11, -2022574463), s = f(s, t, r, a, e[o + 11], 16, 1839030562), a = f(a, s, t, r, e[o + 14], 23, -35309556), r = f(r, a, s, t, e[o + 1], 4, -1530992060), t = f(t, r, a, s, e[o + 4], 11, 1272893353), s = f(s, t, r, a, e[o + 7], 16, -155497632), a = f(a, s, t, r, e[o + 10], 23, -1094730640), r = f(r, a, s, t, e[o + 13], 4, 681279174), t = f(t, r, a, s, e[o + 0], 11, -358537222), s = f(s, t, r, a, e[o + 3], 16, -722521979), a = f(a, s, t, r, e[o + 6], 23, 76029189), r = f(r, a, s, t, e[o + 9], 4, -640364487), t = f(t, r, a, s, e[o + 12], 11, -421815835), s = f(s, t, r, a, e[o + 15], 16, 530742520), a = f(a, s, t, r, e[o + 2], 23, -995338651), r = v(r, a, s, t, e[o + 0], 6, -198630844), t = v(t, r, a, s, e[o + 7], 10, 1126891415), s = v(s, t, r, a, e[o + 14], 15, -1416354905), a = v(a, s, t, r, e[o + 5], 21, -57434055), r = v(r, a, s, t, e[o + 12], 6, 1700485571), t = v(t, r, a, s, e[o + 3], 10, -1894986606), s = v(s, t, r, a, e[o + 10], 15, -1051523), a = v(a, s, t, r, e[o + 1], 21, -2054922799), r = v(r, a, s, t, e[o + 8], 6, 1873313359), t = v(t, r, a, s, e[o + 15], 10, -30611744), s = v(s, t, r, a, e[o + 6], 15, -1560198380), a = v(a, s, t, r, e[o + 13], 21, 1309151649), r = v(r, a, s, t, e[o + 4], 6, -145523070), t = v(t, r, a, s, e[o + 11], 10, -1120210379), s = v(s, t, r, a, e[o + 2], 15, 718787259), a = v(a, s, t, r, e[o + 9], 21, -343485551), r = r + C >>> 0, a = a + g >>> 0, s = s + x >>> 0, t = t + N >>> 0;
      }
      return d.endian([r, a, s, t]);
    };
    c._ff = function(u, m, e, b, r, a, s) {
      var t = u + (m & e | ~m & b) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._gg = function(u, m, e, b, r, a, s) {
      var t = u + (m & b | e & ~b) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._hh = function(u, m, e, b, r, a, s) {
      var t = u + (m ^ e ^ b) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._ii = function(u, m, e, b, r, a, s) {
      var t = u + (e ^ (m | ~b)) + (r >>> 0) + s;
      return (t << a | t >>> 32 - a) + m;
    }, c._blocksize = 16, c._digestsize = 16, B.exports = function(u, m) {
      if (u == null)
        throw new Error("Illegal argument " + u);
      var e = d.wordsToBytes(c(u, m));
      return m && m.asBytes ? e : m && m.asString ? i.bytesToString(e) : d.bytesToHex(e);
    };
  })()), B.exports;
}
var ne = se();
const oe = /* @__PURE__ */ re(ne);
function be({
  initialValues: d = {},
  customFields: p = [],
  locale: n = "pt",
  title: i,
  description: c,
  onSubmit: u,
  onBack: m,
  submitting: e = !1,
  className: b = ""
}) {
  const r = F(n), [a, s] = k(d.name ?? ""), [t, o] = k(d.email ?? ""), [y, w] = k(
    () => Object.fromEntries(p.map((g) => [g.key, d[g.key] ?? ""]))
  ), v = `https://www.gravatar.com/avatar/${oe(t.trim().toLowerCase())}?d=mp&s=160`;
  function C(g) {
    g.preventDefault(), u == null || u({ name: a, email: t, ...y });
  }
  return /* @__PURE__ */ h(E, { className: b, children: [
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
          src: v,
          width: "64"
        }
      ),
      /* @__PURE__ */ l("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: r("gravatarDescription") })
    ] }),
    /* @__PURE__ */ h("form", { className: "space-y-4", onSubmit: C, children: [
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "name",
          label: r("name"),
          name: "name",
          onChange: (g) => s(g.target.value),
          required: !0,
          type: "text",
          value: a
        }
      ),
      /* @__PURE__ */ l(
        P,
        {
          autoComplete: "email",
          label: r("email"),
          name: "email",
          onChange: (g) => o(g.target.value),
          required: !0,
          type: "email",
          value: t
        }
      ),
      p.map(({ key: g, label: x, type: N = "text", ...D }) => /* @__PURE__ */ Z(
        P,
        {
          ...D,
          key: g,
          label: x ?? g,
          name: g,
          onChange: (T) => w((A) => ({ ...A, [g]: T.target.value })),
          type: N,
          value: y[g]
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
function ye({
  groups: d = [],
  users: p = [],
  permissions: n = [],
  initialSelectedGroupId: i = null,
  selectedGroupId: c,
  onSelectedGroupChange: u,
  onCreate: m,
  onUpdate: e,
  isSaving: b = !1,
  errors: r = {},
  locale: a = "pt",
  accentColor: s = "#155DFC",
  className: t = ""
}) {
  const o = F(a), [y, w] = k(i), f = c === void 0 ? y : c, v = d.find((g) => String(g.id) === String(f)) ?? null;
  function C(g) {
    c === void 0 && w(g), u == null || u(g);
  }
  return /* @__PURE__ */ h("section", { className: `w-full ${t}`, children: [
    /* @__PURE__ */ h("header", { className: "mb-6", children: [
      /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-gray-900 dark:text-gray-50", children: o("groupsPermissionsTitle") }),
      /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: o("groupsPermissionsDescription") })
    ] }),
    /* @__PURE__ */ h("div", { className: "grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ h("aside", { className: "space-y-3 self-start", children: [
        /* @__PURE__ */ h(
          "button",
          {
            className: `w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${f == null ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`,
            onClick: () => C(null),
            style: f == null ? { borderColor: s } : void 0,
            type: "button",
            children: [
              /* @__PURE__ */ l("p", { className: "font-medium text-blue-600 dark:text-blue-400", children: o("newGroup") }),
              /* @__PURE__ */ l("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: o("newGroupDescription") })
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "space-y-3", children: d.length === 0 ? /* @__PURE__ */ l("p", { className: "rounded-md bg-gray-50 p-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400", children: o("noGroups") }) : d.map((g) => {
          var T, A;
          const x = String(g.id) === String(f), N = ((T = g.users) == null ? void 0 : T.length) ?? 0, D = ((A = g.permissions) == null ? void 0 : A.length) ?? 0;
          return /* @__PURE__ */ h(
            "button",
            {
              className: `w-full rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${x ? "bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`,
              onClick: () => C(g.id),
              style: x ? { borderColor: s } : void 0,
              type: "button",
              children: [
                /* @__PURE__ */ l("p", { className: "font-semibold text-gray-900 dark:text-gray-50", children: g.name }),
                /* @__PURE__ */ h("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: [
                  N,
                  " ",
                  o("usersLabel"),
                  " · ",
                  D,
                  " ",
                  o("permissionsLabel")
                ] })
              ]
            },
            g.id
          );
        }) })
      ] }),
      /* @__PURE__ */ l(
        ie,
        {
          accentColor: s,
          errors: r,
          group: v,
          isSaving: b,
          onCreate: m,
          onUpdate: e,
          permissions: n,
          t: o,
          users: p
        },
        (v == null ? void 0 : v.id) ?? "new"
      )
    ] })
  ] });
}
function ie({ group: d, permissions: p, users: n, onCreate: i, onUpdate: c, isSaving: u, errors: m, t: e, accentColor: b }) {
  var g;
  const [r, a] = k((d == null ? void 0 : d.name) ?? ""), [s, t] = k((d == null ? void 0 : d.description) ?? ""), [o, y] = k((d == null ? void 0 : d.permissions) ?? []), [w, f] = k(((g = d == null ? void 0 : d.users) == null ? void 0 : g.map((x) => x.id)) ?? []);
  function v(x, N) {
    return x.includes(N) ? x.filter((D) => D !== N) : [...x, N];
  }
  async function C(x) {
    x.preventDefault();
    const N = { name: r, description: s, permissions: o, userIds: w };
    if (d) {
      await (c == null ? void 0 : c(d.id, N));
      return;
    }
    await (i == null ? void 0 : i(N)), a(""), t(""), y([]), f([]);
  }
  return /* @__PURE__ */ l(E, { className: "max-w-none", children: /* @__PURE__ */ h("form", { className: "space-y-6", onSubmit: C, children: [
    /* @__PURE__ */ l("h2", { className: "text-lg font-semibold text-gray-900 dark:text-gray-50", children: e(d ? "editGroupTitle" : "createGroupTitle") }),
    /* @__PURE__ */ h("div", { className: "space-y-4", children: [
      /* @__PURE__ */ h("div", { children: [
        /* @__PURE__ */ l(
          P,
          {
            label: e("groupName"),
            name: "group-name",
            onChange: (x) => a(x.target.value),
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
          P,
          {
            label: e("groupDescriptionOptional"),
            name: "group-description",
            onChange: (x) => t(x.target.value),
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
      /* @__PURE__ */ l("div", { className: "mt-3 grid gap-3 sm:grid-cols-2", children: p.map((x) => /* @__PURE__ */ l(
        le,
        {
          checked: o.includes(x.key),
          label: x.label,
          onChange: () => y((N) => v(N, x.key)),
          value: x.key,
          accentColor: b
        },
        x.key
      )) }),
      m.permissions && /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: m.permissions })
    ] }),
    /* @__PURE__ */ h("fieldset", { children: [
      /* @__PURE__ */ l("legend", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: e("usersLabel") }),
      /* @__PURE__ */ l("div", { className: "mt-3 max-h-48 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3 dark:border-gray-800", children: n.length === 0 ? /* @__PURE__ */ l("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: e("noUsers") }) : n.map((x) => /* @__PURE__ */ l(
        de,
        {
          checked: w.includes(x.id),
          user: x,
          onChange: () => f((N) => v(N, x.id)),
          value: x.id,
          accentColor: b
        },
        x.id
      )) }),
      m.userIds && /* @__PURE__ */ l("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: m.userIds })
    ] }),
    /* @__PURE__ */ l(G, { className: "w-full sm:w-auto", disabled: u, type: "submit", children: e(u ? "savingGroup" : d ? "saveGroup" : "createGroup") })
  ] }) });
}
function le({ checked: d, label: p, onChange: n, value: i, accentColor: c }) {
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
function de({ checked: d, user: p, onChange: n, value: i, accentColor: c }) {
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
const O = j(null);
function xe({ children: d, initialUser: p = null, onLogin: n, onLogout: i }) {
  const [c, u] = k(p);
  async function m(b) {
    const r = n ? await n(b) : b;
    return u(r), r;
  }
  async function e() {
    await (i == null ? void 0 : i(c)), u(null);
  }
  return /* @__PURE__ */ l(O.Provider, { value: { isAuthenticated: !!c, login: m, logout: e, setUser: u, user: c }, children: d });
}
function $() {
  const d = V(O);
  if (!d) throw new Error("useAuth must be used within an AuthProvider");
  return d;
}
function ve() {
  return $().isAuthenticated;
}
function ce(d, p) {
  var i;
  const { user: n } = $();
  return ((i = n == null ? void 0 : n.permissions) == null ? void 0 : i.includes(`${p}.${d}`)) ?? !1;
}
function we({ action: d, children: p, resource: n }) {
  return ce(d, n) ? p : null;
}
export {
  xe as AuthProvider,
  we as CanAccess,
  he as ChangePassword,
  be as EditProfile,
  ge as ForgotPassword,
  ye as GroupsPermissions,
  pe as Login,
  fe as Register,
  F as createTranslator,
  $ as useAuth,
  ve as useAuthenticated,
  ce as useCanAccess
};
