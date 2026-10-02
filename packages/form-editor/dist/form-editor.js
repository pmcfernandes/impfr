import * as e from "react";
import t, { Children as n, Fragment as r, createContext as i, isValidElement as a, useCallback as o, useContext as s, useEffect as c, useId as l, useLayoutEffect as u, useMemo as d, useRef as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
import * as _ from "react-dom";
import { createPortal as v } from "react-dom";
//#region \0rolldown/runtime.js
var y = Object.defineProperty, b = (e, t) => {
	let n = {};
	for (var r in e) y(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || y(n, Symbol.toStringTag, { value: "Module" }), n;
}, x = [
	"text",
	"textarea",
	"number",
	"email",
	"password",
	"date",
	"select",
	"radio",
	"checkbox",
	"checkboxgroup",
	"file"
], S = [
	{
		type: "html",
		label: "Texto HTML",
		hint: "Texto livre",
		data: !1
	},
	{
		type: "steps",
		label: "Passos",
		hint: "Indicador de passos",
		data: !1
	},
	{
		type: "heading",
		label: "Secção",
		hint: "Separador de secção",
		data: !1
	},
	{
		type: "text",
		label: "Texto",
		hint: "Texto curto",
		data: !0
	},
	{
		type: "textarea",
		label: "Texto longo",
		hint: "Várias linhas",
		data: !0
	},
	{
		type: "number",
		label: "Número",
		hint: "Valor numérico",
		data: !0
	},
	{
		type: "email",
		label: "Email",
		hint: "Endereço de email",
		data: !0
	},
	{
		type: "password",
		label: "Palavra-passe",
		hint: "Texto oculto",
		data: !0
	},
	{
		type: "date",
		label: "Data",
		hint: "Seletor de data",
		data: !0
	},
	{
		type: "select",
		label: "Lista",
		hint: "Seleção em dropdown",
		data: !0
	},
	{
		type: "radio",
		label: "Opções",
		hint: "Seleção única",
		data: !0
	},
	{
		type: "checkbox",
		label: "Caixa",
		hint: "Sim / Não",
		data: !0
	},
	{
		type: "checkboxgroup",
		label: "Múltipla",
		hint: "Várias escolhas",
		data: !0
	},
	{
		type: "file",
		label: "Ficheiro",
		hint: "Um ou mais ficheiros",
		data: !0
	}
], C = [
	{
		op: "eq",
		label: "é igual a",
		value: !0
	},
	{
		op: "ne",
		label: "é diferente de",
		value: !0
	},
	{
		op: "contains",
		label: "contém",
		value: !0
	},
	{
		op: "not_contains",
		label: "não contém",
		value: !0
	},
	{
		op: "gt",
		label: "é maior que",
		value: !0
	},
	{
		op: "lt",
		label: "é menor que",
		value: !0
	},
	{
		op: "empty",
		label: "está vazio",
		value: !1
	},
	{
		op: "not_empty",
		label: "não está vazio",
		value: !1
	},
	{
		op: "checked",
		label: "está marcado",
		value: !1
	},
	{
		op: "not_checked",
		label: "não está marcado",
		value: !1
	}
], w = [
	"pendente",
	"recusado",
	"aprovado",
	"remoto"
], T = {
	pendente: {
		label: "Pendente",
		color: "amber"
	},
	recusado: {
		label: "Recusado",
		color: "red"
	},
	aprovado: {
		label: "Aprovado",
		color: "emerald"
	},
	remoto: {
		label: "Remoto",
		color: "blue"
	}
}, E = {
	heading: { label: "Secção" },
	html: { label: "Texto HTML" },
	steps: { label: "Passos" },
	text: {
		label: "Texto",
		placeholder: "Introduza o texto"
	},
	textarea: {
		label: "Texto longo",
		placeholder: "Introduza o texto",
		rows: 4
	},
	number: {
		label: "Número",
		placeholder: "0"
	},
	email: {
		label: "Email",
		placeholder: "nome@exemplo.com"
	},
	password: {
		label: "Palavra-passe",
		placeholder: ""
	},
	date: {
		label: "Data",
		placeholder: ""
	},
	select: { label: "Selecção" },
	radio: { label: "Opções" },
	checkbox: {
		label: "Aceito os termos",
		placeholder: ""
	},
	checkboxgroup: { label: "Escolha uma ou mais opções" },
	file: { label: "Ficheiro" }
};
function D() {
	return [{
		label: "Opção 1",
		value: "opcao_1"
	}, {
		label: "Opção 2",
		value: "opcao_2"
	}];
}
function O() {
	return globalThis.crypto && typeof globalThis.crypto.randomUUID == "function" ? "f" + globalThis.crypto.randomUUID().replace(/-/g, "").slice(0, 12) : "f" + Math.random().toString(36).slice(2, 14);
}
function k(e) {
	if (e === "" || e == null) return 12;
	let t = Number(e);
	return Number.isFinite(t) ? Math.min(12, Math.max(1, Math.round(t))) : 12;
}
function A(e) {
	let t = String(e || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
	return (t === "" || /^[0-9]/.test(t)) && (t = "campo" + (t ? "_" + t : "")), t.slice(0, 60);
}
function j(e, t) {
	let n = t || [], r = e || "campo", i = 2;
	for (; n.includes(r);) r = `${e}_${i++}`;
	return r;
}
function ee(e, t = []) {
	let n = E[e] || E.text, r = x.includes(e), i = {
		id: O(),
		type: e,
		label: n.label,
		helpText: "",
		condition: {
			enabled: !1,
			logic: "any",
			rules: []
		}
	};
	return e === "html" ? (i.html = "<p>Escreva aqui o seu texto.</p>", i) : e === "steps" ? (i.steps = [
		"Passo 1",
		"Passo 2",
		"Passo 3"
	], i.activeStep = 1, i.mode = "steps", i) : (r && (i.name = j(A(n.label || e), t), i.placeholder = n.placeholder ?? "", i.required = !1, i.requiredCondition = {
		enabled: !1,
		logic: "any",
		rules: []
	}, i.defaultValue = "", i.columns = 12, i.pattern = "", i.patternMessage = "", (e === "select" || e === "radio" || e === "checkboxgroup") && (i.options = D()), e === "number" && (i.min = "", i.max = "", i.step = ""), e === "textarea" && (i.rows = n.rows || 4), e === "file" && (i.multiple = !0, i.maxSizeMb = 5, i.accept = ".pdf,.png,.jpg,.jpeg,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip")), i);
}
function M(e) {
	return S.find((t) => t.type === e) || S[1];
}
function N(e) {
	return x.includes(e);
}
function te(e) {
	return e == null || e === "" || e === !1 ? !0 : Array.isArray(e) ? e.length === 0 : !1;
}
//#endregion
//#region src/core/conditions.js
function P(e) {
	return Array.isArray(e) ? e.map((e) => String(e)).join(", ") : e === !0 ? "1" : e === !1 || e == null ? "" : String(e).trim();
}
function F(e, t) {
	return t === "checkbox" ? e === !0 || e === 1 || e === "1" || e === "true" : t === "checkboxgroup" ? Array.isArray(e) && e.length > 0 : !te(e);
}
function ne(e, t, n, r) {
	let i = r && r.type || "text", a = String(n ?? "").trim(), o = te(t);
	if (e === "empty") return o;
	if (e === "not_empty") return !o;
	if (e === "checked") return F(t, i);
	if (e === "not_checked") return !F(t, i);
	if (i === "checkboxgroup" && Array.isArray(t)) {
		let n = t.some((e) => P(e).toLowerCase() === a.toLowerCase());
		if (e === "eq" || e === "contains") return n;
		if (e === "ne" || e === "not_contains") return !n;
	}
	let s = P(t);
	switch (e) {
		case "eq": return s.toLowerCase() === a.toLowerCase();
		case "ne": return s.toLowerCase() !== a.toLowerCase();
		case "contains": return !o && s.toLowerCase().includes(a.toLowerCase());
		case "not_contains": return o ? !0 : !s.toLowerCase().includes(a.toLowerCase());
		case "gt":
		case "lt": {
			let t = s !== "" && !Number.isNaN(Number(s)), n = a !== "" && !Number.isNaN(Number(a));
			if (t && n) {
				let t = Number(s), n = Number(a);
				return e === "gt" ? t > n : t < n;
			}
			let r = s < a ? -1 : +(s > a);
			return e === "gt" ? r > 0 : r < 0;
		}
		default: return !1;
	}
}
function I(e, t, n) {
	if (!e || !e.enabled) return !0;
	let r = Array.isArray(e.rules) ? e.rules : [], i = e.logic === "all" ? "all" : "any", a = [];
	for (let e of r) {
		let r = n.find((t) => t.id === e.field);
		r && r.type !== "heading" && a.push(ne(e.op, t[r.id], e.value, r));
	}
	return a.length === 0 ? !0 : i === "all" ? a.every(Boolean) : a.some(Boolean);
}
function L(e, t, n) {
	return e.visible !== !1 && I(e.condition, n, t);
}
function R(e, t, n) {
	return e.requiredCondition && e.requiredCondition.enabled ? I(e.requiredCondition, n, t) : !!e.required;
}
function re(e, t) {
	if (!e || !e.enabled || !e.rules || e.rules.length === 0) return "";
	let n = e.rules.length, r = n > 1 ? "s" : "";
	return t && t.summary ? t.summary.replace("{n}", n).replace("{s}", r) : `${n} regra${r} de visibilidade`;
}
//#endregion
//#region src/core/validation.js
var ie = {
	required: "Campo obrigatório.",
	invalidEmail: "Email inválido.",
	invalidNumber: "Introduza um número válido.",
	pattern: "O valor não corresponde à expressão regular definida."
};
function ae(e) {
	let t = {};
	for (let n of e) N(n.type) && (n.type === "checkbox" ? t[n.id] = n.defaultValue === !0 || n.defaultValue === "1" || n.defaultValue === "true" : n.type === "checkboxgroup" ? t[n.id] = Array.isArray(n.defaultValue) ? n.defaultValue.slice() : [] : n.type === "file" ? t[n.id] = [] : t[n.id] = n.defaultValue ?? "");
	return t;
}
function oe(e, t, n) {
	let r = {
		...ie,
		...n || {}
	}, i = {};
	for (let n of e) {
		if (!N(n.type) || !L(n, e, t)) continue;
		let a = t[n.id], o = se(a);
		if (R(n, e, t) && o) {
			i[n.id] = r.required;
			continue;
		}
		if (!o && (n.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(a).trim()) ? i[n.id] = r.invalidEmail : n.type === "number" && !Number.isFinite(Number(a)) && (i[n.id] = r.invalidNumber), !i[n.id] && n.pattern && !Array.isArray(a) && typeof a != "boolean")) try {
			new RegExp(n.pattern).test(String(a)) || (i[n.id] = n.patternMessage || r.pattern);
		} catch {}
	}
	return i;
}
function se(e) {
	return e == null || e === "" || e === !1 ? !0 : Array.isArray(e) ? e.length === 0 : !1;
}
function ce(e, t) {
	if (e.type === "checkbox") return t === !0;
	if (e.type === "checkboxgroup") return Array.isArray(t) ? t.slice() : [];
	if (e.type === "file") return Array.isArray(t) ? t.map((e) => ({ ...e })) : [];
	if (e.type === "number") {
		if (t === "" || t == null) return "";
		let e = Number(t);
		return Number.isFinite(e) ? e : String(t);
	}
	return t == null ? "" : String(t);
}
function le(e, t) {
	let n = {};
	for (let r of e) N(r.type) && L(r, e, t) && (n[r.name] = ce(r, t[r.id]));
	return n;
}
function ue(e, t) {
	let n = {}, r = {};
	for (let [i, a] of Object.entries(e || {})) {
		let e = i.match(/^fields\.(\d+)(?:\.name)?$/);
		if (e) {
			let o = t[Number(e[1])];
			o ? n[o.id] = a : r[i] = a;
		} else r[i] = a;
	}
	return {
		byId: n,
		general: r
	};
}
function de(e, t) {
	let n = {}, r = {};
	for (let [i, a] of Object.entries(e || {})) {
		let e = t.find((e) => e.name === i);
		e ? n[e.id] = a : r[i] = a;
	}
	return {
		byId: n,
		general: r
	};
}
//#endregion
//#region src/core/tree.js
function fe(e) {
	return e === "heading" || e === "steps";
}
function pe(e) {
	let t = new Set(e.map((e) => e.id)), n = new Set(e.filter((e) => fe(e.type)).map((e) => e.id));
	return e.filter((e) => !e.parentId || !t.has(e.parentId) || !n.has(e.parentId));
}
function me(e, t) {
	return e.filter((e) => e.parentId === t);
}
function he(e, t) {
	return t ? me(e, t) : pe(e);
}
function ge(e, t) {
	let n = [], r = (t) => {
		for (let i of e.filter((e) => e.parentId === t)) n.push(i), r(i.id);
	};
	return r(t), n;
}
function _e(e, t, n) {
	let r = e.find((e) => e.id === n), i = 0;
	for (; r && r.parentId && i++ < 10;) {
		if (r.parentId === t) return !0;
		r = e.find((e) => e.id === r.parentId);
	}
	return !1;
}
function ve(e, t, n) {
	if (!t) return !0;
	if (n === "steps") return !1;
	let r = e.find((e) => e.id === t);
	return !r || !fe(r.type) ? !1 : r.type !== "steps" || n === "heading";
}
function ye(e, t) {
	return me(e, t.id).filter((e) => e.type === "heading");
}
function be(e, t) {
	let n = 1;
	for (let r of me(e, t)) n += be(e, r.id);
	return n;
}
function xe(e, t, n) {
	let r = Math.max(0, n);
	if (t) {
		let n = me(e, t);
		if (r >= n.length) {
			let n = e.findIndex((e) => e.id === t);
			return n < 0 ? e.length : n + be(e, t);
		}
		return e.indexOf(n[r]);
	}
	let i = pe(e);
	if (i.length === 0) return e.length;
	if (r >= i.length) {
		let t = i[i.length - 1];
		return e.indexOf(t) + be(e, t.id);
	}
	return e.indexOf(i[r]);
}
//#endregion
//#region src/core/form.js
function Se(e) {
	return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Ce(e) {
	return (T[e] || T.pendente).label;
}
function we(e) {
	return (T[e] || T.pendente).color;
}
function Te(e, t = /* @__PURE__ */ new Date()) {
	let n = e && e.available_from || "", r = e && e.available_to || "", i = n !== "" || r !== "";
	if (!i) return {
		available: !0,
		hasRange: i,
		from: n,
		to: r
	};
	let a = (e) => String(e).padStart(2, "0"), o = `${Se(t)} ${a(t.getHours())}:${a(t.getMinutes())}`, s = n.length === 10 ? `${n} 00:00` : n, c = r.length === 10 ? `${r} 23:59` : r;
	return {
		available: (s === "" || o >= s) && (c === "" || o <= c),
		hasRange: i,
		from: n,
		to: r
	};
}
//#endregion
//#region src/hooks/useFieldTree.js
function Ee(e) {
	return JSON.parse(JSON.stringify(e));
}
function De(e) {
	return e.filter((e) => N(e.type)).map((e) => e.name);
}
function Oe(e, t, n) {
	let r = f(e);
	return r.current = e, {
		addField: o((e) => {
			let i = ee(e, De(r.current.fields));
			t((e) => ({
				...e,
				fields: [...e.fields, i]
			})), n(i.id);
		}, [t, n]),
		insertField: o((e, i, a = null) => {
			let o = ee(e, De(r.current.fields)), s = e === "steps" ? null : a || null;
			if (s && (o.parentId = s), s && e === "heading") {
				let e = r.current.fields.find((e) => e.id === s);
				if (e && e.type === "steps") {
					let t = me(r.current.fields, s).length;
					o.label = (Array.isArray(e.steps) ? e.steps[t] : null) || `Passo ${t + 1}`;
				}
			}
			t((e) => {
				let t = e.fields.slice(), n = xe(t, s, i);
				return t.splice(n, 0, o), {
					...e,
					fields: t
				};
			}), n(o.id);
		}, [t, n]),
		moveField: o((e, n, i) => {
			let a = r.current.fields.find((t) => t.id === e);
			if (!a) return;
			let o = n || null;
			o && a.type === "steps" && (o = null), o && (o === e || _e(r.current.fields, e, o)) && (o = null), t((t) => {
				let n = t.fields.filter((t) => t.id !== e), r = { ...a };
				o ? r.parentId = o : delete r.parentId;
				let s = xe(n, o, i);
				return n.splice(s, 0, r), {
					...t,
					fields: n
				};
			});
		}, [t]),
		updateField: o((e) => {
			t((t) => ({
				...t,
				fields: t.fields.map((t) => t.id === e.id ? e : t)
			}));
		}, [t]),
		duplicateField: o((e) => {
			let i = r.current.fields, a = i.findIndex((t) => t.id === e);
			if (a < 0) return;
			let o = i[a], s = Ee(o);
			s.id = O(), s.label = `${o.label} (cópia)`, N(o.type) && (s.name = j(A(`${o.name}_copia`), De(i)));
			let c = [s];
			if (fe(o.type)) {
				let e = { [o.id]: s.id }, t = [o.id];
				for (; t.length > 0;) {
					let n = t.shift();
					for (let r of me(i, n)) {
						let a = Ee(r);
						a.id = O(), N(r.type) && (a.name = j(A(`${r.name}_copia`), De(i))), a.parentId = e[n], e[r.id] = a.id, c.push(a), fe(r.type) && t.push(r.id);
					}
				}
			}
			let l = i.slice();
			l.splice(a + 1, 0, ...c), t((e) => ({
				...e,
				fields: l
			})), n(s.id);
		}, [t, n]),
		deleteField: o((e) => {
			let n = r.current.fields, i = /* @__PURE__ */ new Set([e]), a = !0;
			for (; a;) {
				a = !1;
				for (let e of n) e.parentId && i.has(e.parentId) && !i.has(e.id) && (i.add(e.id), a = !0);
			}
			t((e) => ({
				...e,
				fields: e.fields.filter((e) => !i.has(e.id))
			}));
		}, [t])
	};
}
//#endregion
//#region src/hooks/usePanelResize.js
var ke = 260, Ae = 560, je = 330, Me = "formeditor.propsWidth";
function Ne(e) {
	return Math.max(ke, Math.min(Ae, Math.round(e)));
}
function Pe() {
	try {
		let e = Number(window.localStorage.getItem(Me));
		return Number.isFinite(e) && e >= ke && e <= Ae ? e : je;
	} catch {
		return je;
	}
}
function Fe() {
	let [e, t] = p(Pe);
	return c(() => {
		try {
			window.localStorage.setItem(Me, String(e));
		} catch {}
	}, [e]), {
		width: e,
		startResize: (n) => {
			if (n.button !== 0) return;
			n.preventDefault();
			let r = n.clientX, i = e, a = (e) => t(Ne(i + (r - e.clientX))), o = () => {
				window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o);
			};
			window.addEventListener("pointermove", a), window.addEventListener("pointerup", o);
		},
		resizeByKey: (e) => t((t) => Ne(t + e))
	};
}
//#endregion
//#region src/i18n/pt.js
var Ie = {
	"common.save": "Guardar",
	"common.cancel": "Cancelar",
	"common.close": "Fechar",
	"common.delete": "Eliminar",
	"common.duplicate": "Duplicar",
	"common.loading": "A carregar…",
	"common.error": "Erro",
	"common.required": "Obrigatório",
	"common.optional": "Opcional",
	"common.back": "← Voltar",
	"editor.newForm": "Novo formulário",
	"editor.formName": "Nome do formulário",
	"editor.unsaved": "Por guardar",
	"editor.preview": "Pré-visualizar",
	"editor.saving": "A guardar…",
	"editor.confirmLeave": "Há alterações por guardar. Sair mesmo assim?",
	"editor.saveError": "Erro ao guardar.",
	"editor.nameError": "Use apenas letras, números e \"_\" (sem começar por número).",
	"editor.nameDuplicate": "Nome já usado noutro campo.",
	"form.submit": "Submeter",
	"form.submitting": "A enviar…",
	"form.successTitle": "Tudo certo",
	"form.successMessage": "Submissão concluída.",
	"form.previous": "Anterior",
	"form.next": "Seguinte",
	"form.emptyFields": "Este formulário ainda não tem campos visíveis.",
	"form.consentError": "Deve aceitar o termo de consentimento para submeter.",
	"form.consentHint": "Marque a caixa para habilitar o botão de submissão.",
	"form.privacyPolicy": "Política de privacidade",
	"form.submitError": "Não foi possível guardar.",
	"form.notAvailable": "Este formulário não está disponível.",
	"form.notAvailableNow": "Este formulário não está disponível no momento.",
	"form.invalidJson": "JSON de configuração do formulário inválido.",
	"form.editSave": "Guardar",
	"form.editSaved": "Alterações guardadas",
	"fields.heading": "Secção",
	"fields.html": "Texto HTML",
	"fields.text": "Texto",
	"fields.textarea": "Texto longo",
	"fields.number": "Número",
	"fields.email": "Email",
	"fields.password": "Palavra-passe",
	"fields.date": "Data",
	"fields.select": "Lista",
	"fields.radio": "Opções",
	"fields.checkbox": "Caixa",
	"fields.checkboxgroup": "Múltipla",
	"fields.file": "Ficheiro",
	"fields.steps": "Passos",
	"fields.headingHint": "Separador de secção",
	"fields.htmlHint": "Texto livre",
	"fields.textHint": "Texto curto",
	"fields.textareaHint": "Várias linhas",
	"fields.numberHint": "Valor numérico",
	"fields.emailHint": "Endereço de email",
	"fields.passwordHint": "Texto oculto",
	"fields.dateHint": "Seletor de data",
	"fields.selectHint": "Seleção em dropdown",
	"fields.radioHint": "Seleção única",
	"fields.checkboxHint": "Sim / Não",
	"fields.checkboxgroupHint": "Várias escolhas",
	"fields.fileHint": "Um ou mais ficheiros",
	"fields.stepsHint": "Indicador de passos",
	"fields.noLabel": "Sem rótulo",
	"fields.internal": "interno",
	"fields.hidden": "oculto",
	"fields.selectPlaceholder": "— Selecione —",
	"fields.badge.html": "HTML",
	"fields.badge.heading": "H",
	"fields.badge.steps": "ST",
	"fields.badge.text": "T",
	"fields.badge.textarea": "TL",
	"fields.badge.number": "#",
	"fields.badge.email": "@",
	"fields.badge.password": "P",
	"fields.badge.date": "D",
	"fields.badge.select": "S",
	"fields.badge.radio": "R",
	"fields.badge.checkbox": "C",
	"fields.badge.checkboxgroup": "M",
	"fields.badge.file": "F",
	"file.add": "Adicionar ficheiros",
	"file.addMore": "Adicionar mais ficheiros",
	"file.uploading": "A carregar…",
	"file.maxSize": "Máx. {size} por ficheiro",
	"file.singleOnly": "apenas um ficheiro",
	"file.dropHere": "ou largue os ficheiros aqui",
	"file.open": "Abrir",
	"file.remove": "Remover ficheiro",
	"file.singleError": "Este campo permite apenas um ficheiro.",
	"file.formatError": "Formato não suportado: \"{name}\". Formatos aceites: {formats}.",
	"file.sizeError": "\"{name}\" excede o tamanho máximo de {size} por ficheiro.",
	"file.uploadError": "Não foi possível carregar o ficheiro.",
	"palette.title": "Componentes",
	"palette.hint": "Arraste para o canvas — ou duplo clique para adicionar.",
	"canvas.empty": "Canvas vazio",
	"canvas.emptyHint": "Arraste componentes da coluna à esquerda para construir o formulário.",
	"canvas.dropSection": "Solte Secções dentro de \"{label}\".",
	"canvas.dropContainer": "Solte componentes dentro de \"{label}\".",
	"props.form": "Formulário",
	"props.name": "Nome",
	"props.description": "Descrição",
	"props.descriptionHint": "Para que serve este formulário?",
	"props.slug": "Slug: {slug}",
	"props.visibility": "Visibilidade",
	"props.visible": "Visível",
	"props.hidden": "Oculto",
	"props.formVisible": "Formulário visível",
	"props.formVisibleHint": "Quando oculto, ninguém pode preencher nem submeter registos.",
	"props.availability": "Disponibilidade",
	"props.available": "Disponível",
	"props.unavailable": "Indisponível",
	"props.availableFrom": "Disponível de",
	"props.availableTo": "Disponível até",
	"props.availabilityHint": "Fora deste intervalo o formulário não aceita registos. Deixe vazio para manter sempre disponível.",
	"props.availabilityCurrent": " Atual: {range}.",
	"props.consent": "Consentimento RGPD",
	"props.consentRequiredBadge": "Obrigatório",
	"props.consentOff": "Desligado",
	"props.consentRequiredLabel": "Exigir consentimento antes de submeter",
	"props.consentText": "Texto do aviso",
	"props.consentTextHint": "É mostrado junto ao botão de submissão e fica guardado com cada registo como prova do consentimento.",
	"props.consentTextPlaceholder": "Declaro que li e aceito o tratamento dos meus dados pessoais descrito na política de privacidade.",
	"props.privacyUrl": "Política de privacidade (opcional)",
	"props.privacyUrlHint": "Ligação apresentada no aviso de consentimento.",
	"props.remote": "Submissão remota",
	"props.remoteActive": "Activa",
	"props.remoteOff": "Desligada",
	"props.remoteEndpoint": "Endpoint (POST)",
	"props.remoteEndpointHint": "Recebe um POST com JSON { data: … }.",
	"props.notifications": "Notificações",
	"props.notifyEmail": "Email de notificação",
	"props.notifyEmailHint": "Quem recebe um aviso (com as respostas) a cada submissão. Vazio = sem notificação.",
	"props.notifyField": "Campo email do utilizador",
	"props.notifyFieldHint": "Campo usado para enviar ao utilizador a confirmação da submissão.",
	"props.notifyNoEmail": "Adicione um campo Email ao formulário para poder notificar o utilizador.",
	"props.notifyNone": "— nenhum —",
	"field.identification": "Identificação",
	"field.label": "Rótulo",
	"field.labelHintStatic": "Apenas para identificar o bloco no editor.",
	"field.name": "Nome interno",
	"field.nameHint": "Usado nos registos. Sem espaços nem acentos.",
	"field.helpText": "Texto de ajuda",
	"field.helpTextHint": "Instruções visíveis por baixo do campo",
	"field.content": "Conteúdo",
	"field.placeholder": "Placeholder",
	"field.defaultValue": "Valor por omissão",
	"field.noValue": "— sem valor —",
	"field.startChecked": "Começar marcado",
	"field.fileSection": "Ficheiro",
	"field.maxSize": "Tamanho máx. por ficheiro (MB)",
	"field.maxSizeHint": "Limite aplicado a cada ficheiro carregado.",
	"field.multiple": "Permitir múltiplos ficheiros",
	"field.accept": "Formatos aceites",
	"field.acceptHint": "Separados por vírgula (ex.: .pdf, .jpg). Vazio = todos os formatos.",
	"field.options": "Opções",
	"field.dimension": "Dimensão",
	"field.rows": "Linhas",
	"field.limits": "Limites numéricos",
	"field.min": "Mín.",
	"field.max": "Máx.",
	"field.step": "Passo",
	"field.pattern": "Validação personalizada",
	"field.patternActive": "Activa",
	"field.patternOff": "Desligada",
	"field.patternInvalid": "Inválida",
	"field.patternLabel": "Expressão regular (regex)",
	"field.patternHint": "Testada quando o campo tem valor. Ex.: ^\\d{9}$ ou ^https?://. Deixe vazio para desligar.",
	"field.patternMessage": "Mensagem de erro (opcional)",
	"field.patternMessageHint": "Apresentada ao utilizador quando o valor não corresponde.",
	"field.patternMessagePlaceholder": "Introduza um valor no formato indicado.",
	"field.layout": "Layout",
	"field.columns": "Colunas (de 12)",
	"field.columnsHint": "Largura do campo na grelha de 12 colunas. P. ex.: 6 = metade.",
	"field.fieldVisible": "Campo visível",
	"field.visibilityHint": "Campos ocultos não aparecem no formulário nem são submetidos.",
	"field.readOnlySection": "Leitura",
	"field.readOnlyLabel": "Apenas de leitura",
	"field.readOnlyHint": "Mostra o valor (ex.: valor por omissão) mas não permite editar no formulário.",
	"field.requiredSection": "Obrigatoriedade",
	"field.requiredBadgeCond": "Condicional",
	"field.requiredBadgeReq": "Obrigatório",
	"field.requiredBadgeOpt": "Opcional",
	"field.requiredLabel": "Campo obrigatório",
	"field.requiredCondNote": "Gerido pela condição abaixo.",
	"field.requiredHint": "Tem de ser preenchido para o registo ser submetido.",
	"field.htmlSection": "Conteúdo HTML",
	"field.htmlSectionHint": "Bloco de texto livre com formatação HTML — não guarda dados nos registos.",
	"field.stepsSection": "Passos",
	"field.stepsMode": "Modo de apresentação",
	"field.stepsModeHint": "Escolha entre passos numerados ou uma barra de progresso.",
	"field.stepsModeSteps": "Passos (numerado)",
	"field.stepsModeProgress": "Barra de progresso",
	"field.stepsWizardHint": "Com Secções dentro, este Passos vira um assistente no formulário (Anterior/Seguinte) e os rótulos dos passos vêm das Secções.",
	"field.addStep": "+ Adicionar passo",
	"field.removeStep": "Remover passo",
	"field.activeStep": "Passo atual",
	"field.activeStepHint": "Número do passo em destaque.",
	"field.sectionOnly": "Os campos de Secção servem apenas para organizar o formulário e não guardam dados.",
	"condition.title": "Condição de visibilidade",
	"condition.toggle": "Mostrar o campo apenas quando a condição for cumprida",
	"condition.showIf": "Mostrar se",
	"condition.any": "alguma",
	"condition.all": "todas",
	"condition.tail": "das condições abaixo forem verdadeiras",
	"condition.emptyHint": "Adicione pelo menos um outro campo de dados para criar condições.",
	"condition.add": "+ Adicionar condição",
	"condition.remove": "Remover condição",
	"condition.value": "valor",
	"condition.requiredTitle": "Condição de obrigatoriedade",
	"condition.requiredToggle": "Tornar o campo obrigatório apenas quando a condição for cumprida",
	"options.label": "Rótulo",
	"options.value": "valor",
	"options.remove": "Remover opção",
	"options.add": "+ Adicionar opção",
	"api.title": "Serviço de API",
	"api.description": "Carregue as opções de um endpoint REST e faça o mapeamento dos campos (rótulo e valor).",
	"api.url": "URL do endpoint",
	"api.urlHint": "Ex.: https://servico.example.com/api/itens",
	"api.headers": "Cabeçalhos (JSON, opcional)",
	"api.path": "Caminho para a lista",
	"api.pathHint": "Ex.: data.items — vazio = automático",
	"api.labelKey": "Campo do rótulo",
	"api.valueKey": "Campo do valor",
	"api.fetch": "Obter",
	"api.fetching": "A obter…",
	"api.import": "Importar opções",
	"api.importN": "Importar {n} opções",
	"api.preview": "Pré-visualização do mapeamento",
	"api.mapping": "Mapeando {items} item(ns) em {options} opções (máx. 500).",
	"api.emptyPath": "Nenhuma lista encontrada neste caminho — ajuste o caminho e clique em \"Obter\".",
	"api.noHandler": "Nenhum handler de fetch configurado.",
	"api.urlRequired": "Indique o URL do endpoint.",
	"api.fetchError": "Falha ao contactar o endpoint.",
	"api.found": "{n} item(ns) encontrados.",
	"api.auto": "automático",
	"preview.title": "Pré-visualização",
	"preview.testSubmit": "Testar submissão",
	"preview.validSubmit": "Submissão válida",
	"preview.notSaved": "Nada foi guardado — é apenas uma pré-visualização.",
	"steps.of": "Passo {current} de {total}",
	"validation.required": "Campo obrigatório.",
	"validation.invalidEmail": "Email inválido.",
	"validation.invalidNumber": "Introduza um número válido.",
	"validation.patternDefault": "O valor não corresponde à expressão regular definida.",
	"condition.summary": "{n} regra{s} de visibilidade",
	"status.pendente": "Pendente",
	"status.recusado": "Recusado",
	"status.aprovado": "Aprovado",
	"status.remoto": "Remoto",
	"operators.eq": "é igual a",
	"operators.ne": "é diferente de",
	"operators.contains": "contém",
	"operators.not_contains": "não contém",
	"operators.gt": "é maior que",
	"operators.lt": "é menor que",
	"operators.empty": "está vazio",
	"operators.not_empty": "não está vazio",
	"operators.checked": "está marcado",
	"operators.not_checked": "não está marcado",
	"date.clear": "Limpar",
	"date.time": "Hora"
}, Le = {
	"common.save": "Save",
	"common.cancel": "Cancel",
	"common.close": "Close",
	"common.delete": "Delete",
	"common.duplicate": "Duplicate",
	"common.loading": "Loading…",
	"common.error": "Error",
	"common.required": "Required",
	"common.optional": "Optional",
	"common.back": "← Back",
	"editor.newForm": "New form",
	"editor.formName": "Form name",
	"editor.unsaved": "Unsaved",
	"editor.preview": "Preview",
	"editor.saving": "Saving…",
	"editor.confirmLeave": "There are unsaved changes. Leave anyway?",
	"editor.saveError": "Error saving.",
	"editor.nameError": "Use only letters, numbers and \"_\" (do not start with a number).",
	"editor.nameDuplicate": "Name already used in another field.",
	"form.submit": "Submit",
	"form.submitting": "Sending…",
	"form.successTitle": "All set",
	"form.successMessage": "Submission completed.",
	"form.previous": "Previous",
	"form.next": "Next",
	"form.emptyFields": "This form has no visible fields yet.",
	"form.consentError": "You must accept the consent term to submit.",
	"form.consentHint": "Check the box to enable the submit button.",
	"form.privacyPolicy": "Privacy policy",
	"form.submitError": "Could not save.",
	"form.notAvailable": "This form is not available.",
	"form.notAvailableNow": "This form is not available at the moment.",
	"form.invalidJson": "Invalid form configuration JSON.",
	"form.editSave": "Save",
	"form.editSaved": "Changes saved",
	"fields.heading": "Section",
	"fields.html": "HTML Text",
	"fields.text": "Text",
	"fields.textarea": "Long text",
	"fields.number": "Number",
	"fields.email": "Email",
	"fields.password": "Password",
	"fields.date": "Date",
	"fields.select": "Dropdown",
	"fields.radio": "Options",
	"fields.checkbox": "Checkbox",
	"fields.checkboxgroup": "Multiple",
	"fields.file": "File",
	"fields.steps": "Steps",
	"fields.headingHint": "Section separator",
	"fields.htmlHint": "Free text",
	"fields.textHint": "Short text",
	"fields.textareaHint": "Multiple lines",
	"fields.numberHint": "Numeric value",
	"fields.emailHint": "Email address",
	"fields.passwordHint": "Hidden text",
	"fields.dateHint": "Date picker",
	"fields.selectHint": "Dropdown selection",
	"fields.radioHint": "Single selection",
	"fields.checkboxHint": "Yes / No",
	"fields.checkboxgroupHint": "Multiple choices",
	"fields.fileHint": "One or more files",
	"fields.stepsHint": "Steps indicator",
	"fields.noLabel": "No label",
	"fields.internal": "inner",
	"fields.hidden": "hidden",
	"fields.selectPlaceholder": "— Select —",
	"fields.badge.html": "HTML",
	"fields.badge.heading": "H",
	"fields.badge.steps": "ST",
	"fields.badge.text": "T",
	"fields.badge.textarea": "TL",
	"fields.badge.number": "#",
	"fields.badge.email": "@",
	"fields.badge.password": "P",
	"fields.badge.date": "D",
	"fields.badge.select": "S",
	"fields.badge.radio": "R",
	"fields.badge.checkbox": "C",
	"fields.badge.checkboxgroup": "M",
	"fields.badge.file": "F",
	"file.add": "Add files",
	"file.addMore": "Add more files",
	"file.uploading": "Uploading…",
	"file.maxSize": "Max. {size} per file",
	"file.singleOnly": "single file only",
	"file.dropHere": "or drop files here",
	"file.open": "Open",
	"file.remove": "Remove file",
	"file.singleError": "This field allows only one file.",
	"file.formatError": "Unsupported format: \"{name}\". Accepted formats: {formats}.",
	"file.sizeError": "\"{name}\" exceeds the maximum size of {size} per file.",
	"file.uploadError": "Could not upload the file.",
	"palette.title": "Components",
	"palette.hint": "Drag to canvas — or double-click to add.",
	"canvas.empty": "Empty canvas",
	"canvas.emptyHint": "Drag components from the left column to build the form.",
	"canvas.dropSection": "Drop Sections inside \"{label}\".",
	"canvas.dropContainer": "Drop components inside \"{label}\".",
	"props.form": "Form",
	"props.name": "Name",
	"props.description": "Description",
	"props.descriptionHint": "What is this form for?",
	"props.slug": "Slug: {slug}",
	"props.visibility": "Visibility",
	"props.visible": "Visible",
	"props.hidden": "Hidden",
	"props.formVisible": "Form visible",
	"props.formVisibleHint": "When hidden, no one can fill in or submit records.",
	"props.availability": "Availability",
	"props.available": "Available",
	"props.unavailable": "Unavailable",
	"props.availableFrom": "Available from",
	"props.availableTo": "Available until",
	"props.availabilityHint": "Outside this range the form does not accept records. Leave empty to keep always available.",
	"props.availabilityCurrent": " Current: {range}.",
	"props.consent": "GDPR Consent",
	"props.consentRequiredBadge": "Required",
	"props.consentOff": "Off",
	"props.consentRequiredLabel": "Require consent before submitting",
	"props.consentText": "Notice text",
	"props.consentTextHint": "Shown next to the submit button and stored with each record as proof of consent.",
	"props.consentTextPlaceholder": "I declare that I have read and accept the processing of my personal data described in the privacy policy.",
	"props.privacyUrl": "Privacy policy (optional)",
	"props.privacyUrlHint": "Link shown in the consent notice.",
	"props.remote": "Remote submission",
	"props.remoteActive": "Active",
	"props.remoteOff": "Off",
	"props.remoteEndpoint": "Endpoint (POST)",
	"props.remoteEndpointHint": "Receives a POST with JSON { data: … }.",
	"props.notifications": "Notifications",
	"props.notifyEmail": "Notification email",
	"props.notifyEmailHint": "Who receives a notice (with answers) on each submission. Empty = no notification.",
	"props.notifyField": "User email field",
	"props.notifyFieldHint": "Field used to send the user a submission confirmation.",
	"props.notifyNoEmail": "Add an Email field to the form to notify the user.",
	"props.notifyNone": "— none —",
	"field.identification": "Identification",
	"field.label": "Label",
	"field.labelHintStatic": "Only to identify the block in the editor.",
	"field.name": "Internal name",
	"field.nameHint": "Used in records. No spaces or accents.",
	"field.helpText": "Help text",
	"field.helpTextHint": "Instructions shown below the field",
	"field.content": "Content",
	"field.placeholder": "Placeholder",
	"field.defaultValue": "Default value",
	"field.noValue": "— no value —",
	"field.startChecked": "Start checked",
	"field.fileSection": "File",
	"field.maxSize": "Max size per file (MB)",
	"field.maxSizeHint": "Limit applied to each uploaded file.",
	"field.multiple": "Allow multiple files",
	"field.accept": "Accepted formats",
	"field.acceptHint": "Comma-separated (e.g. .pdf, .jpg). Empty = all formats.",
	"field.options": "Options",
	"field.dimension": "Dimension",
	"field.rows": "Rows",
	"field.limits": "Numeric limits",
	"field.min": "Min",
	"field.max": "Max",
	"field.step": "Step",
	"field.pattern": "Custom validation",
	"field.patternActive": "Active",
	"field.patternOff": "Off",
	"field.patternInvalid": "Invalid",
	"field.patternLabel": "Regular expression (regex)",
	"field.patternHint": "Tested when the field has a value. E.g. ^\\d{9}$ or ^https?://. Leave empty to disable.",
	"field.patternMessage": "Error message (optional)",
	"field.patternMessageHint": "Shown to the user when the value does not match.",
	"field.patternMessagePlaceholder": "Enter a value in the indicated format.",
	"field.layout": "Layout",
	"field.columns": "Columns (of 12)",
	"field.columnsHint": "Field width in the 12-column grid. E.g. 6 = half.",
	"field.fieldVisible": "Field visible",
	"field.visibilityHint": "Hidden fields do not appear in the form nor are submitted.",
	"field.readOnlySection": "Read-only",
	"field.readOnlyLabel": "Read only",
	"field.readOnlyHint": "Shows the value (e.g. default value) but does not allow editing.",
	"field.requiredSection": "Required",
	"field.requiredBadgeCond": "Conditional",
	"field.requiredBadgeReq": "Required",
	"field.requiredBadgeOpt": "Optional",
	"field.requiredLabel": "Required field",
	"field.requiredCondNote": "Managed by the condition below.",
	"field.requiredHint": "Must be filled in for the record to be submitted.",
	"field.htmlSection": "HTML Content",
	"field.htmlSectionHint": "Free text block with HTML formatting — does not store data in records.",
	"field.stepsSection": "Steps",
	"field.stepsMode": "Display mode",
	"field.stepsModeHint": "Choose between numbered steps or a progress bar.",
	"field.stepsModeSteps": "Steps (numbered)",
	"field.stepsModeProgress": "Progress bar",
	"field.stepsWizardHint": "With Sections inside, this Steps becomes a form wizard (Previous/Next) and step labels come from the Sections.",
	"field.addStep": "+ Add step",
	"field.removeStep": "Remove step",
	"field.activeStep": "Current step",
	"field.activeStepHint": "Highlighted step number.",
	"field.sectionOnly": "Section fields only serve to organise the form and do not store data.",
	"condition.title": "Visibility condition",
	"condition.toggle": "Show the field only when the condition is met",
	"condition.showIf": "Show if",
	"condition.any": "any",
	"condition.all": "all",
	"condition.tail": "of the conditions below are true",
	"condition.emptyHint": "Add at least one other data field to create conditions.",
	"condition.add": "+ Add condition",
	"condition.remove": "Remove condition",
	"condition.value": "value",
	"condition.requiredTitle": "Required condition",
	"condition.requiredToggle": "Make the field required only when the condition is met",
	"options.label": "Label",
	"options.value": "value",
	"options.remove": "Remove option",
	"options.add": "+ Add option",
	"api.title": "API Service",
	"api.description": "Load options from a REST endpoint and map the fields (label and value).",
	"api.url": "Endpoint URL",
	"api.urlHint": "E.g. https://service.example.com/api/items",
	"api.headers": "Headers (JSON, optional)",
	"api.path": "Path to list",
	"api.pathHint": "E.g. data.items — empty = automatic",
	"api.labelKey": "Label field",
	"api.valueKey": "Value field",
	"api.fetch": "Fetch",
	"api.fetching": "Fetching…",
	"api.import": "Import options",
	"api.importN": "Import {n} options",
	"api.preview": "Mapping preview",
	"api.mapping": "Mapping {items} item(s) into {options} options (max. 500).",
	"api.emptyPath": "No list found at this path — adjust the path and click \"Fetch\".",
	"api.noHandler": "No fetch handler configured.",
	"api.urlRequired": "Enter the endpoint URL.",
	"api.fetchError": "Failed to contact the endpoint.",
	"api.found": "{n} item(s) found.",
	"api.auto": "automatic",
	"preview.title": "Preview",
	"preview.testSubmit": "Test submission",
	"preview.validSubmit": "Valid submission",
	"preview.notSaved": "Nothing was saved — this is just a preview.",
	"steps.of": "Step {current} of {total}",
	"validation.required": "Required field.",
	"validation.invalidEmail": "Invalid email.",
	"validation.invalidNumber": "Enter a valid number.",
	"validation.patternDefault": "The value does not match the defined regular expression.",
	"condition.summary": "{n} visibility rule{s}",
	"status.pendente": "Pending",
	"status.recusado": "Rejected",
	"status.aprovado": "Approved",
	"status.remoto": "Remote",
	"operators.eq": "equals",
	"operators.ne": "does not equal",
	"operators.contains": "contains",
	"operators.not_contains": "does not contain",
	"operators.gt": "is greater than",
	"operators.lt": "is less than",
	"operators.empty": "is empty",
	"operators.not_empty": "is not empty",
	"operators.checked": "is checked",
	"operators.not_checked": "is not checked",
	"date.clear": "Clear",
	"date.time": "Time"
}, Re = {
	pt: Ie,
	en: Le
}, ze = i({
	lang: "pt",
	t: (e) => e
});
function Be(e, t) {
	return t ? e.replace(/\{(\w+)\}/g, (e, n) => t[n] === void 0 ? `{${n}}` : String(t[n])) : e;
}
function Ve(e) {
	let t = Re[e] || Re.pt, n = Re.pt;
	return function(e, r) {
		return Be(t[e] ?? n[e] ?? e, r);
	};
}
function He({ lang: e = "pt", children: t }) {
	let n = d(() => ({
		lang: e,
		t: Ve(e)
	}), [e]);
	return /* @__PURE__ */ h(ze.Provider, {
		value: n,
		children: t
	});
}
function z() {
	return s(ze);
}
function Ue() {
	let { t: e } = z();
	return e;
}
function We(e) {
	return Ve(e);
}
function Ge(e) {
	return Re[e] || Re.pt;
}
//#endregion
//#region src/components/Palette.jsx
function Ke({ onAdd: e, allowedTypes: t }) {
	let { t: n } = z(), r = Array.isArray(t) && t.length > 0 ? S.filter((e) => t.includes(e.type)) : S;
	return /* @__PURE__ */ g("aside", {
		className: "palette flex min-h-0 flex-col rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3.5 lg:overflow-y-auto",
		children: [
			/* @__PURE__ */ h("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400",
				children: n("palette.title")
			}),
			/* @__PURE__ */ h("p", {
				className: "mt-1 text-xs text-gray-500 dark:text-gray-400",
				children: n("palette.hint")
			}),
			/* @__PURE__ */ h("div", {
				className: "mt-3 flex flex-col gap-2",
				children: r.map((t) => /* @__PURE__ */ g("div", {
					className: "palette-item flex cursor-grab touch-none items-center gap-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2.5 py-2 select-none transition hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 active:cursor-grabbing",
					role: "button",
					tabIndex: 0,
					draggable: !0,
					onDragStart: (e) => {
						e.dataTransfer.setData("text/plain", "new:" + t.type), e.dataTransfer.effectAllowed = "copy";
					},
					onDoubleClick: () => e(t.type),
					onKeyDown: (n) => {
						(n.key === "Enter" || n.key === " ") && (n.preventDefault(), e(t.type));
					},
					children: [/* @__PURE__ */ h("span", {
						className: "type-badge flex h-6 min-w-[30px] flex-none items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950 px-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300",
						children: n(`fields.badge.${t.type}`)
					}), /* @__PURE__ */ g("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ h("strong", {
							className: "truncate text-sm font-medium text-gray-900 dark:text-gray-50",
							children: n(`fields.${t.type}`)
						}), /* @__PURE__ */ h("small", {
							className: "truncate text-xs text-gray-500 dark:text-gray-400",
							children: n(`fields.${t.type}Hint`)
						})]
					})]
				}, t.type))
			})
		]
	});
}
//#endregion
//#region src/ui/cx.js
function B(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region src/ui/theme.js
var qe = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500 dark:disabled:bg-gray-900", Je = {
	primary: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
	secondary: "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900",
	ghost: "border-transparent bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-50",
	danger: "border-transparent bg-red-600 text-white hover:bg-red-700",
	dangerGhost: "border-transparent bg-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
}, Ye = {
	sm: "gap-1 px-2.5 py-1.5 text-xs",
	md: "gap-1.5 px-3.5 py-2 text-sm",
	lg: "gap-2 px-5 py-2.5 text-sm"
}, Xe = {
	gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-gray-200 dark:ring-gray-700",
	blue: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 ring-blue-200 dark:ring-blue-900",
	red: "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-900",
	emerald: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-emerald-200 dark:ring-emerald-900",
	amber: "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 ring-amber-200 dark:ring-amber-900"
}, Ze = {
	red: "bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 ring-red-200 dark:ring-red-900",
	blue: "bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 ring-blue-200 dark:ring-blue-900",
	amber: "bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 ring-amber-200 dark:ring-amber-900",
	emerald: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 ring-emerald-200 dark:ring-emerald-900"
};
//#endregion
//#region src/ui/Icons.jsx
function Qe({ className: e = "" }) {
	return /* @__PURE__ */ h("svg", {
		viewBox: "0 0 20 20",
		fill: "currentColor",
		className: e,
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("path", {
			fillRule: "evenodd",
			d: "M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z",
			clipRule: "evenodd"
		})
	});
}
function $e({ className: e = "" }) {
	return /* @__PURE__ */ g("svg", {
		viewBox: "0 0 20 20",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		className: e,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ h("rect", {
			x: "2.75",
			y: "4.25",
			width: "14.5",
			height: "13",
			rx: "2"
		}), /* @__PURE__ */ h("path", {
			d: "M2.75 8.25h14.5M6.5 2.75v3M13.5 2.75v3",
			strokeLinecap: "round"
		})]
	});
}
function et() {
	return /* @__PURE__ */ h("svg", {
		viewBox: "0 0 10 10",
		className: "h-2.5 w-2.5 text-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("path", {
			d: "M1.8 5.2 4 7.4l4.2-4.6",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function tt() {
	return /* @__PURE__ */ h("svg", {
		viewBox: "0 0 10 10",
		className: "h-2.5 w-2.5 text-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("path", {
			d: "M2 5h6",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})
	});
}
//#endregion
//#region src/ui/dateHelpers.js
function nt(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(e || ""));
	if (t) return new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
}
function rt(e) {
	let t = (e) => String(e).padStart(2, "0");
	return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`;
}
function it(e) {
	let t = (e) => String(e).padStart(2, "0");
	return `${t(e.getDate())}/${t(e.getMonth() + 1)}/${e.getFullYear()}`;
}
//#endregion
//#region src/ui/Button.jsx
function at({ variant: e = "secondary", size: t = "md", className: n = "", type: r = "button", ...i }) {
	return /* @__PURE__ */ h("button", {
		type: r,
		className: B("inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50", Je[e], Ye[t], n),
		...i
	});
}
//#endregion
//#region src/ui/Badge.jsx
function ot({ color: e = "blue", className: t = "", children: n, ...r }) {
	return /* @__PURE__ */ h("span", {
		className: B("inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset", Xe[e], t),
		...r,
		children: n
	});
}
//#endregion
//#region src/ui/Callout.jsx
function st({ color: e = "red", className: t = "", children: n, ...r }) {
	return /* @__PURE__ */ g("div", {
		role: "alert",
		className: B("flex gap-2.5 rounded-lg px-3.5 py-3 text-sm font-medium ring-1 ring-inset", Ze[e], t),
		...r,
		children: [/* @__PURE__ */ h("span", {
			"aria-hidden": "true",
			className: "mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-current text-[10px] font-bold",
			children: "!"
		}), /* @__PURE__ */ h("div", {
			className: "min-w-0",
			children: n
		})]
	});
}
//#endregion
//#region src/ui/Input.jsx
function V({ error: e = !1, className: t = "", ...n }) {
	return /* @__PURE__ */ h("input", {
		className: B(qe, e && "border-red-400 focus:border-red-500 focus:ring-red-500/30", t),
		...n
	});
}
function ct({ error: e = !1, className: t = "", ...n }) {
	return /* @__PURE__ */ h("textarea", {
		className: B(qe, "resize-y", e && "border-red-400 focus:border-red-500 focus:ring-red-500/30", t),
		...n
	});
}
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var lt = Object.defineProperty, ut = (e, t) => lt(e, "name", {
	value: t,
	configurable: !0
});
function dt(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
ut(dt, "clamp");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
var ft = Object.defineProperty, pt = (e, t) => ft(e, "name", {
	value: t,
	configurable: !0
}), mt = !!(typeof window < "u" && window.document && window.document.createElement);
function H(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ pt(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
pt(H, "composeEventHandlers");
function ht(e) {
	if (!mt) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
pt(ht, "getOwnerWindow");
function gt(e) {
	if (!mt) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
pt(gt, "getOwnerDocument");
function _t(e, t = !1) {
	let { activeElement: n } = gt(e);
	if (!n?.nodeName) return null;
	if (vt(n) && n.contentDocument) return _t(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = gt(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
pt(_t, "getActiveElement");
function vt(e) {
	return e.tagName === "IFRAME";
}
pt(vt, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
var yt = Object.defineProperty, bt = (e, t) => yt(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function xt(t, n) {
	let r = e.createContext(n);
	r.displayName = t + "Context";
	let i = /* @__PURE__ */ bt((t) => {
		let { children: n, ...i } = t, a = e.useMemo(() => i, Object.values(i));
		return /* @__PURE__ */ h(r.Provider, {
			value: a,
			children: n
		});
	}, "Provider");
	i.displayName = t + "Provider";
	function a(i, a = {}) {
		let { optional: o = !1 } = a, s = e.useContext(r);
		if (s) return s;
		if (n !== void 0) return n;
		if (!o) throw Error(`\`${i}\` must be used within \`${t}\``);
	}
	return bt(a, "useContext"), [i, a];
}
bt(xt, "createContext");
// @__NO_SIDE_EFFECTS__
function St(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i);
		a.displayName = n + "Context";
		let o = r.length;
		r = [...r, i];
		let s = /* @__PURE__ */ bt((n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ h(c.Provider, {
				value: l,
				children: i
			});
		}, "Provider");
		s.displayName = n + "Provider";
		function c(r, s, c = {}) {
			let { optional: l = !1 } = c, u = s?.[t]?.[o] || a, d = e.useContext(u);
			if (d) return d;
			if (i !== void 0) return i;
			if (!l) throw Error(`\`${r}\` must be used within \`${n}\``);
		}
		return bt(c, "useContext"), [s, c];
	}
	bt(i, "createContext");
	let a = /* @__PURE__ */ bt(() => {
		let n = r.map((t) => e.createContext(t));
		return /* @__PURE__ */ bt(function(r) {
			let i = r?.[t] || n;
			return e.useMemo(() => ({ [`__scope${t}`]: {
				...r,
				[t]: i
			} }), [r, i]);
		}, "useScope");
	}, "createScope");
	return a.scopeName = t, [i, Ct(a, ...n)];
}
bt(St, "createContextScope");
function Ct(...t) {
	let n = t[0];
	if (t.length === 1) return n;
	let r = /* @__PURE__ */ bt(() => {
		let r = t.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ bt(function(t) {
			let i = r.reduce((e, { useScope: n, scopeName: r }) => {
				let i = n(t)[`__scope${r}`];
				return {
					...e,
					...i
				};
			}, {});
			return e.useMemo(() => ({ [`__scope${n.scopeName}`]: i }), [i]);
		}, "useComposedScopes");
	}, "createScope");
	return r.scopeName = n.scopeName, r;
}
bt(Ct, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var wt = Object.defineProperty, Tt = (e, t) => wt(e, "name", {
	value: t,
	configurable: !0
});
function Et(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Tt(Et, "setRef");
function Dt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Et(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Et(e[t], null);
			}
		};
	};
}
Tt(Dt, "composeRefs");
function U(...t) {
	return e.useCallback(Dt(...t), t);
}
Tt(U, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var Ot = Object.defineProperty, kt = (e, t) => Ot(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function At(t) {
	let n = e.forwardRef((n, r) => {
		let { children: i, ...a } = n, o = null, s = !1, c = [];
		Rt(i) && typeof Ht == "function" && (i = Ht(i._payload)), e.Children.forEach(i, (e) => {
			if (It(e)) {
				s = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				Rt(n) && typeof Ht == "function" && (n = Ht(n._payload)), o = Nt(t, n), c.push(o?.props?.children);
			} else c.push(e);
		}), o ? o = e.cloneElement(o, void 0, c) : !s && e.Children.count(i) === 1 && e.isValidElement(i) && (o = i);
		let l = o ? Ft(o) : void 0, u = U(r, l);
		if (!o) {
			if (i || i === 0) throw Error(s ? Vt(t) : Bt(t));
			return i;
		}
		let d = Pt(a, o.props ?? {});
		return o.type !== e.Fragment && (d.ref = r ? u : l), e.cloneElement(o, d);
	});
	return n.displayName = `${t}.Slot`, n;
}
kt(At, "createSlot");
var jt = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Mt(e) {
	let t = /* @__PURE__ */ kt((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = jt, t;
}
kt(Mt, "createSlottable");
var Nt = /* @__PURE__ */ kt((t, n) => {
	if ("child" in t.props) {
		let n = t.props.child;
		return e.isValidElement(n) ? e.cloneElement(n, void 0, t.props.children(n.props.children)) : null;
	}
	return e.isValidElement(n) ? n : null;
}, "getSlottableElementFromSlottable");
function Pt(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
kt(Pt, "mergeProps");
function Ft(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
kt(Ft, "getElementRef");
function It(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === jt;
}
kt(It, "isSlottable");
var Lt = Symbol.for("react.lazy");
function Rt(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Lt && "_payload" in e && zt(e._payload);
}
kt(Rt, "isLazyComponent");
function zt(e) {
	return typeof e == "object" && !!e && "then" in e;
}
kt(zt, "isPromiseLike");
var Bt = /* @__PURE__ */ kt((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Vt = /* @__PURE__ */ kt((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Ht = e.use, Ut = Object.defineProperty, W = (e, t) => Ut(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function Wt(t) {
	let n = t + "CollectionProvider", [r, i] = /* @__PURE__ */ St(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), s = /* @__PURE__ */ W((t) => {
		let { scope: n, children: r } = t, i = e.useRef(null), o = e.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ h(a, {
			scope: n,
			itemMap: o,
			collectionRef: i,
			children: r
		});
	}, "CollectionProvider");
	s.displayName = n;
	let c = t + "CollectionSlot", l = /* @__PURE__ */ At(c), u = e.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = U(t, o(c, n).collectionRef);
		return /* @__PURE__ */ h(l, {
			ref: i,
			children: r
		});
	});
	u.displayName = c;
	let d = t + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ At(d), m = e.forwardRef((t, n) => {
		let { scope: r, children: i, ...a } = t, s = e.useRef(null), c = U(n, s), l = o(d, r);
		return e.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ h(p, {
			[f]: "",
			ref: c,
			children: i
		});
	});
	m.displayName = d;
	function g(n) {
		let r = o(t + "CollectionConsumer", n);
		return e.useCallback(() => {
			let e = r.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${f}]`));
			return Array.from(r.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [r.collectionRef, r.itemMap]);
	}
	return W(g, "useCollection"), [
		{
			Provider: s,
			Slot: u,
			ItemSlot: m
		},
		g,
		i
	];
}
W(Wt, "createCollection");
var Gt = /* @__PURE__ */ new WeakMap(), Kt = class e extends Map {
	static {
		W(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], Gt.set(this, !0);
	}
	set(e, t) {
		return Gt.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = Yt(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t !== void 0 && this.delete(t);
	}
	at(e) {
		let t = qt(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = qt(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return qt(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		let n = [...this.entries()].sort(t);
		return new e(n);
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function qt(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = Jt(e, t);
	return n === -1 ? void 0 : e[n];
}
W(qt, "at");
function Jt(e, t) {
	let n = e.length, r = Yt(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
W(Jt, "toSafeIndex");
function Yt(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
W(Yt, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function Xt(t) {
	let n = t + "CollectionProvider", [r, i] = /* @__PURE__ */ St(n), [a, o] = r(n, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new Kt(),
		setItemMap: /* @__PURE__ */ W(() => void 0, "setItemMap")
	}), s = /* @__PURE__ */ W(({ state: e, ...t }) => e ? /* @__PURE__ */ h(l, {
		...t,
		state: e
	}) : /* @__PURE__ */ h(c, { ...t }), "CollectionProvider");
	s.displayName = n;
	let c = /* @__PURE__ */ W((e) => {
		let t = _();
		return /* @__PURE__ */ h(l, {
			...e,
			state: t
		});
	}, "CollectionInit");
	c.displayName = n + "Init";
	let l = /* @__PURE__ */ W((t) => {
		let { scope: n, children: r, state: i } = t, o = e.useRef(null), [s, c] = e.useState(null), l = U(o, c), [u, d] = i;
		return e.useEffect(() => {
			if (!s) return;
			let e = en(() => {});
			return e.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [s]), /* @__PURE__ */ h(a, {
			scope: n,
			itemMap: u,
			setItemMap: d,
			collectionRef: l,
			collectionRefObject: o,
			collectionElement: s,
			children: r
		});
	}, "CollectionProviderImpl");
	l.displayName = n + "Impl";
	let u = t + "CollectionSlot", d = /* @__PURE__ */ At(u), f = e.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = U(t, o(u, n).collectionRef);
		return /* @__PURE__ */ h(d, {
			ref: i,
			children: r
		});
	});
	f.displayName = u;
	let p = t + "CollectionItemSlot", m = /* @__PURE__ */ At(p), g = e.forwardRef((t, n) => {
		let { scope: r, children: i, ...a } = t, s = e.useRef(null), [c, l] = e.useState(null), u = U(n, s, l), { setItemMap: d } = o(p, r), f = e.useRef(a);
		Zt(f.current, a) || (f.current = a);
		let g = f.current;
		return e.useEffect(() => {
			let e = g;
			return d((t) => c ? t.has(c) ? t.set(c, {
				...e,
				element: c
			}).toSorted($t) : (t.set(c, {
				...e,
				element: c
			}), t.toSorted($t)) : t), () => {
				d((e) => !c || !e.has(c) ? e : (e.delete(c), new Kt(e)));
			};
		}, [
			c,
			g,
			d
		]), /* @__PURE__ */ h(m, {
			"data-radix-collection-item": "",
			ref: u,
			children: i
		});
	});
	g.displayName = p;
	function _() {
		return e.useState(new Kt());
	}
	W(_, "useInitCollection");
	function v(e) {
		let { itemMap: n } = o(t + "CollectionConsumer", e);
		return n;
	}
	return W(v, "useCollection"), [{
		Provider: s,
		Slot: f,
		ItemSlot: g
	}, {
		createCollectionScope: i,
		useCollection: v,
		useInitCollection: _
	}];
}
W(Xt, "createCollection");
function Zt(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
W(Zt, "shallowEqual");
function Qt(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
W(Qt, "isElementPreceding");
function $t(e, t) {
	return !e[1].element || !t[1].element ? 0 : Qt(e[1].element, t[1].element) ? -1 : 1;
}
W($t, "sortByDocumentPosition");
function en(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
W(en, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var tn = Object.defineProperty, nn = (e, t) => tn(e, "name", {
	value: t,
	configurable: !0
}), rn = e.createContext(void 0);
function an(t) {
	let n = e.useContext(rn);
	return t || n || "ltr";
}
nn(an, "useDirection");
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var on = Object.defineProperty, sn = (e, t) => on(e, "name", {
	value: t,
	configurable: !0
}), G = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((t, n) => {
	let r = /* @__PURE__ */ At(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {});
function cn(e, t) {
	e && _.flushSync(() => e.dispatchEvent(t));
}
sn(cn, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var ln = Object.defineProperty, un = (e, t) => ln(e, "name", {
	value: t,
	configurable: !0
});
function dn(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => ((...e) => n.current?.(...e)), []);
}
un(dn, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var fn = Object.defineProperty, K = (e, t) => fn(e, "name", {
	value: t,
	configurable: !0
}), pn = "dismissableLayer.update", mn = "dismissableLayer.pointerDownOutside", hn = "dismissableLayer.focusOutside", gn, _n = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), vn = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ K(function(t, n) {
	let { disableOutsidePointerEvents: r = !1, deferPointerDownOutside: i = !1, onEscapeKeyDown: a, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...u } = t, d = e.useContext(_n), [f, p] = e.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, g] = e.useState({}), _ = U(n, p), v = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = y ? v.indexOf(y) : -1, x = f ? v.indexOf(f) : -1, S = d.layersWithOutsidePointerEventsDisabled.size > 0, C = x >= b, w = e.useRef(!1), T = xn((e) => {
		o?.(e), c?.(e), e.defaultPrevented || l?.();
	}, {
		ownerDocument: m,
		deferPointerDownOutside: i,
		isDeferredPointerDownOutsideRef: w,
		dismissableSurfaces: d.dismissableSurfaces,
		shouldHandlePointerDownOutside: e.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...d.branches].some((t) => t.contains(e));
			return C && !t;
		}, [d.branches, C])
	}), E = Sn((e) => {
		if (i && w.current) return;
		let t = e.target;
		[...d.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, m), D = f ? x === v.length - 1 : !1, O = dn((e) => {
		e.key === "Escape" && (a?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	});
	return e.useEffect(() => {
		if (D) return m.addEventListener("keydown", O, { capture: !0 }), () => m.removeEventListener("keydown", O, { capture: !0 });
	}, [
		m,
		D,
		O
	]), e.useEffect(() => {
		if (f) return r && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (gn = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), Cn(), () => {
			r && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (m.body.style.pointerEvents = gn));
		};
	}, [
		f,
		m,
		r,
		d
	]), e.useEffect(() => () => {
		f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), Cn());
	}, [f, d]), e.useEffect(() => {
		let e = /* @__PURE__ */ K(() => g({}), "handleUpdate");
		return document.addEventListener(pn, e), () => document.removeEventListener(pn, e);
	}, []), /* @__PURE__ */ h(G.div, {
		...u,
		ref: _,
		style: {
			pointerEvents: S ? C ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: H(t.onFocusCapture, E.onFocusCapture),
		onBlurCapture: H(t.onBlurCapture, E.onBlurCapture),
		onPointerDownCapture: H(t.onPointerDownCapture, T.onPointerDownCapture)
	});
}, "DismissableLayer"));
function yn() {
	let t = e.useContext(_n), [n, r] = e.useState(null);
	return e.useEffect(() => {
		if (n) return t.dismissableSurfaces.add(n), () => {
			t.dismissableSurfaces.delete(n);
		};
	}, [n, t.dismissableSurfaces]), r;
}
K(yn, "useDismissableLayerSurface");
var bn = /* @__PURE__ */ K(() => !0, "IS_TRUE");
function xn(t, n) {
	let { ownerDocument: r = globalThis?.document, deferPointerDownOutside: i = !1, isDeferredPointerDownOutsideRef: a, dismissableSurfaces: o, shouldHandlePointerDownOutside: s = bn } = n, c = dn(t), l = e.useRef(!1), u = e.useRef(!1), d = e.useRef(/* @__PURE__ */ new Map()), f = e.useRef(() => {});
	return e.useEffect(() => {
		function e() {
			u.current = !1, a.current = !1, d.current.clear();
		}
		K(e, "resetOutsideInteraction");
		function t() {
			return Array.from(d.current.values()).some(Boolean);
		}
		K(t, "isOutsideInteractionIntercepted");
		function n(e) {
			if (!u.current) return;
			let t = e.target;
			t instanceof Node && [...o].some((e) => e.contains(t)) || d.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				u.current && f.current();
			}, 0);
		}
		K(n, "handleInteractionCapture");
		function p(e) {
			u.current && d.current.set(e.type, !1);
		}
		K(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ K((n) => {
			if (n.target && !l.current) {
				let o = function() {
					r.removeEventListener("click", f.current);
					let n = t();
					e(), n || wn(mn, c, p, { discrete: !0 });
				};
				if (K(o, "handleAndDispatchPointerDownOutsideEvent"), !s(n.target)) {
					r.removeEventListener("click", f.current), e(), l.current = !1;
					return;
				}
				let p = { originalEvent: n };
				u.current = !0, a.current = i && n.button === 0, d.current.clear(), !i || n.button !== 0 ? o() : (r.removeEventListener("click", f.current), f.current = o, r.addEventListener("click", f.current, { once: !0 }));
			} else r.removeEventListener("click", f.current), e();
			l.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) r.addEventListener(e, n, !0), r.addEventListener(e, p);
		let g = window.setTimeout(() => {
			r.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), r.removeEventListener("pointerdown", m), r.removeEventListener("click", f.current);
			for (let e of h) r.removeEventListener(e, n, !0), r.removeEventListener(e, p);
		};
	}, [
		r,
		c,
		i,
		a,
		o,
		s
	]), { onPointerDownCapture: /* @__PURE__ */ K(() => l.current = !0, "onPointerDownCapture") };
}
K(xn, "usePointerDownOutside");
function Sn(t, n = globalThis?.document) {
	let r = dn(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = /* @__PURE__ */ K((e) => {
			e.target && !i.current && wn(hn, r, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: /* @__PURE__ */ K(() => i.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ K(() => i.current = !1, "onBlurCapture")
	};
}
K(Sn, "useFocusOutside");
function Cn() {
	let e = new CustomEvent(pn);
	document.dispatchEvent(e);
}
K(Cn, "dispatchUpdate");
function wn(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? cn(i, a) : i.dispatchEvent(a);
}
K(wn, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Tn = Object.defineProperty, En = (e, t) => Tn(e, "name", {
	value: t,
	configurable: !0
}), Dn = 0, On = null;
function kn(e) {
	return An(), e.children;
}
En(kn, "FocusGuards");
function An() {
	e.useEffect(() => {
		On ||= {
			start: jn(),
			end: jn()
		};
		let { start: e, end: t } = On;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Dn++, () => {
			Dn === 1 && (On?.start.remove(), On?.end.remove(), On = null), Dn = Math.max(0, Dn - 1);
		};
	}, []);
}
En(An, "useFocusGuards");
function jn() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
En(jn, "createFocusGuard");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Mn = Object.defineProperty, Nn = (e, t) => Mn(e, "name", {
	value: t,
	configurable: !0
}), Pn = "focusScope.autoFocusOnMount", Fn = "focusScope.autoFocusOnUnmount", In = {
	bubbles: !1,
	cancelable: !0
}, Ln = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Nn(function(t, n) {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = dn(a), d = dn(o), f = e.useRef(null), p = U(n, l), m = e.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	e.useEffect(() => {
		if (i) {
			let e = function(e) {
				if (m.paused || !c) return;
				let t = e.target;
				c.contains(t) ? f.current = t : Wn(f.current, { select: !0 });
			}, t = function(e) {
				if (m.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || Wn(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Wn(c);
			};
			Nn(e, "handleFocusIn"), Nn(t, "handleFocusOut"), Nn(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return c && r.observe(c, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		i,
		c,
		m.paused
	]), e.useEffect(() => {
		if (c) {
			Gn.add(m);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Pn, In);
				c.addEventListener(Pn, u), c.dispatchEvent(t), t.defaultPrevented || (Rn(Jn(Bn(c)), { select: !0 }), document.activeElement === e && Wn(c));
			}
			return () => {
				c.removeEventListener(Pn, u), setTimeout(() => {
					let t = new CustomEvent(Fn, In);
					c.addEventListener(Fn, d), c.dispatchEvent(t), t.defaultPrevented || Wn(e ?? document.body, { select: !0 }), c.removeEventListener(Fn, d), Gn.remove(m);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		m
	]);
	let g = e.useCallback((e) => {
		if (!r && !i || m.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = zn(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && Wn(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && Wn(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		m.paused
	]);
	return /* @__PURE__ */ h(G.div, {
		tabIndex: -1,
		...s,
		ref: p,
		onKeyDown: g
	});
}, "FocusScope"));
function Rn(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Wn(r, { select: t }), document.activeElement !== n) return;
}
Nn(Rn, "focusFirst");
function zn(e) {
	let t = Bn(e);
	return [Vn(t, e), Vn(t.reverse(), e)];
}
Nn(zn, "getTabbableEdges");
function Bn(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ Nn((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
Nn(Bn, "getTabbableCandidates");
function Vn(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Hn(r, { upTo: t }))) return r;
}
Nn(Vn, "findVisible");
function Hn(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
Nn(Hn, "isHidden");
function Un(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
Nn(Un, "isSelectableInput");
function Wn(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Un(e) && t && e.select();
	}
}
Nn(Wn, "focus");
var Gn = Kn();
function Kn() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = qn(e, t), e.unshift(t);
		},
		remove(t) {
			e = qn(e, t), e[0]?.resume();
		}
	};
}
Nn(Kn, "createFocusScopesStack");
function qn(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
Nn(qn, "arrayRemove");
function Jn(e) {
	return e.filter((e) => e.tagName !== "A");
}
Nn(Jn, "removeLinks");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Yn = globalThis?.document ? e.useLayoutEffect : () => {}, Xn = Object.defineProperty, Zn = (e, t) => Xn(e, "name", {
	value: t,
	configurable: !0
}), Qn = e.useId || (() => void 0), $n = 0;
function er(t) {
	let [n, r] = e.useState(Qn());
	return Yn(() => {
		t || r((e) => e ?? String($n++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
Zn(er, "useId");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var tr = [
	"top",
	"right",
	"bottom",
	"left"
], nr = Math.min, rr = Math.max, ir = Math.round, ar = Math.floor, or = (e) => ({
	x: e,
	y: e
}), sr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function cr(e, t, n) {
	return rr(e, nr(t, n));
}
function lr(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ur(e) {
	return e.split("-")[0];
}
function dr(e) {
	return e.split("-")[1];
}
function fr(e) {
	return e === "x" ? "y" : "x";
}
function pr(e) {
	return e === "y" ? "height" : "width";
}
function mr(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function hr(e) {
	return fr(mr(e));
}
function gr(e, t, n) {
	n === void 0 && (n = !1);
	let r = dr(e), i = hr(e), a = pr(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Tr(o)), [o, Tr(o)];
}
function _r(e) {
	let t = Tr(e);
	return [
		vr(e),
		t,
		vr(t)
	];
}
function vr(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var yr = ["left", "right"], br = ["right", "left"], xr = ["top", "bottom"], Sr = ["bottom", "top"];
function Cr(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? br : yr : t ? yr : br;
		case "left":
		case "right": return t ? xr : Sr;
		default: return [];
	}
}
function wr(e, t, n, r) {
	let i = dr(e), a = Cr(ur(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(vr)))), a;
}
function Tr(e) {
	let t = ur(e);
	return sr[t] + e.slice(t.length);
}
function Er(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Dr(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Er(e);
}
function Or(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function kr(e, t, n) {
	let { reference: r, floating: i } = e, a = mr(t), o = hr(t), s = pr(o), c = ur(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = dr(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ar(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = lr(t, e), p = Dr(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Or(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Or(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var jr = 50, Mr = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Ar
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = kr(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < jr && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = kr(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Nr = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = lr(e, t) || {};
		if (l == null) return {};
		let d = Dr(u), f = {
			x: n,
			y: r
		}, p = hr(i), m = pr(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = nr(d[_], T), D = nr(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = cr(E, k, O), j = !c.arrow && dr(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, ee = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + ee,
			data: {
				[p]: A,
				centerOffset: k - A - ee,
				...j && { alignmentOffset: ee }
			},
			reset: j
		};
	}
}), Pr = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = lr(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = ur(r), _ = mr(o), v = ur(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Tr(o)] : _r(o)), x = p !== "none";
			!d && x && b.push(...wr(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = gr(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === mr(t) || T.every((e) => mr(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = mr(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Fr(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ir(e) {
	return tr.some((t) => e[t] >= 0);
}
var Lr = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = lr(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Fr(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ir(e)
					} };
				}
				case "escaped": {
					let e = Fr(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ir(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Rr = /*#__PURE__*/ new Set(["left", "top"]);
async function zr(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = ur(n), s = dr(n), c = mr(n) === "y", l = Rr.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = lr(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Br = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await zr(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Vr = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = lr(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = mr(i), p = fr(f), m = u[p], h = u[f], g = (e, t) => cr(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Hr = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = lr(e, t), u = {
				x: n,
				y: r
			}, d = mr(i), f = fr(d), p = u[f], m = u[d], h = lr(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Rr.has(ur(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ur = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = lr(e, t), c = await i.detectOverflow(t, s), l = ur(n), u = dr(n), d = mr(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = nr(p - c[m], g), y = nr(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * rr(c.left, c.right) : S = p - 2 * rr(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Wr() {
	return typeof window < "u";
}
function Gr(e) {
	return Jr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Kr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function qr(e) {
	return ((Jr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Jr(e) {
	return Wr() ? e instanceof Node || e instanceof Kr(e).Node : !1;
}
function Yr(e) {
	return Wr() ? e instanceof Element || e instanceof Kr(e).Element : !1;
}
function Xr(e) {
	return Wr() ? e instanceof HTMLElement || e instanceof Kr(e).HTMLElement : !1;
}
function Zr(e) {
	return !Wr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Kr(e).ShadowRoot;
}
function Qr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = li(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function $r(e) {
	return /^(table|td|th)$/.test(Gr(e));
}
function ei(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var ti = /transform|translate|scale|rotate|perspective|filter/, ni = /paint|layout|strict|content/, ri = (e) => !!e && e !== "none", ii;
function ai(e) {
	let t = Yr(e) ? li(e) : e;
	return ri(t.transform) || ri(t.translate) || ri(t.scale) || ri(t.rotate) || ri(t.perspective) || !si() && (ri(t.backdropFilter) || ri(t.filter)) || ti.test(t.willChange || "") || ni.test(t.contain || "");
}
function oi(e) {
	let t = di(e);
	for (; Xr(t) && !ci(t);) {
		if (ai(t)) return t;
		if (ei(t)) return null;
		t = di(t);
	}
	return null;
}
function si() {
	return ii ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), ii;
}
function ci(e) {
	return /^(html|body|#document)$/.test(Gr(e));
}
function li(e) {
	return Kr(e).getComputedStyle(e);
}
function ui(e) {
	return Yr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function di(e) {
	if (Gr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Zr(e) && e.host || qr(e);
	return Zr(t) ? t.host : t;
}
function fi(e) {
	let t = di(e);
	return ci(t) ? (e.ownerDocument || e).body : Xr(t) && Qr(t) ? t : fi(t);
}
function pi(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = fi(e), i = r === e.ownerDocument?.body, a = Kr(r);
	if (i) {
		let e = mi(a);
		return t.concat(a, a.visualViewport || [], Qr(r) ? r : [], e && n ? pi(e) : []);
	}
	return t.concat(r, pi(r, [], n));
}
function mi(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function hi(e) {
	let t = li(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Xr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ir(n) !== a || ir(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function gi(e) {
	return Yr(e) ? e : e.contextElement;
}
function _i(e) {
	let t = gi(e);
	if (!Xr(t)) return or(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = hi(t), o = (a ? ir(n.width) : n.width) / r, s = (a ? ir(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var vi = /*#__PURE__*/ or(0);
function yi(e) {
	let t = Kr(e);
	return !si() || !t.visualViewport ? vi : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function bi(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Kr(e);
}
function xi(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = gi(e), o = or(1);
	t && (r ? Yr(r) && (o = _i(r)) : o = _i(e));
	let s = bi(a, n, r) ? yi(a) : or(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Kr(a), t = Yr(r) ? Kr(r) : r, n = e, i = mi(n);
		for (; i && t !== n;) {
			let e = _i(i), t = i.getBoundingClientRect(), r = li(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Kr(i), i = mi(n);
		}
	}
	return Or({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Si(e, t) {
	let n = ui(e).scrollLeft;
	return t ? t.left + n : xi(qr(e)).left + n;
}
function Ci(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Si(e, n),
		y: n.top + t.scrollTop
	};
}
function wi(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = qr(r), s = t ? ei(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = or(1), u = or(0), d = Xr(r);
	if ((d || !a) && ((Gr(r) !== "body" || Qr(o)) && (c = ui(r)), d)) {
		let e = xi(r);
		l = _i(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ci(o, c) : or(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Ti(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Ei(e) {
	let t = ui(e), n = e.ownerDocument.body, r = rr(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = rr(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Si(e), o = -t.scrollTop;
	return li(n).direction === "rtl" && (a += rr(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Di = 25;
function Oi(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Kr(e), a = qr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !si() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Si(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Di && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ki(e, t) {
	let n = xi(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = _i(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Ai(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Oi(e, n, t);
	else if (t === "document") r = Ei(qr(e));
	else if (Yr(t)) r = ki(t, n);
	else {
		let n = yi(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Or(r);
}
function ji(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = pi(e, [], !1).filter((e) => Yr(e) && Gr(e) !== "body"), i = null, a = li(e).position === "fixed", o = a ? di(e) : e;
	for (; Yr(o) && !ci(o);) {
		let e = li(o), t = ai(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = di(o);
	}
	return t.set(e, r), r;
}
function Mi(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? ei(t) ? [] : ji(t, this._c) : [].concat(n), r], o = Ai(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Ai(t, a[e], i);
		s = rr(n.top, s), c = nr(n.right, c), l = nr(n.bottom, l), u = rr(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Ni(e) {
	let { width: t, height: n } = hi(e);
	return {
		width: t,
		height: n
	};
}
function Pi(e, t, n) {
	let r = Xr(t), i = qr(t), a = n === "fixed", o = xi(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = or(0);
	if ((r || !a) && ((Gr(t) !== "body" || Qr(i)) && (s = ui(t)), r)) {
		let e = xi(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Si(i));
	let l = i && !r && !a ? Ci(i, s) : or(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Fi(e) {
	return li(e).position === "static";
}
function Ii(e, t) {
	if (!Xr(e) || li(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return qr(e) === n && (n = n.ownerDocument.body), n;
}
function Li(e, t) {
	let n = Kr(e);
	if (ei(e)) return n;
	if (!Xr(e)) {
		let t = di(e);
		for (; t && !ci(t);) {
			if (Yr(t) && !Fi(t)) return t;
			t = di(t);
		}
		return n;
	}
	let r = Ii(e, t);
	for (; r && $r(r) && Fi(r);) r = Ii(r, t);
	return r && ci(r) && Fi(r) && !ai(r) ? n : r || oi(e) || n;
}
var Ri = async function(e) {
	let t = this.getOffsetParent || Li, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Pi(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function zi(e) {
	return li(e).direction === "rtl";
}
var Bi = {
	convertOffsetParentRelativeRectToViewportRelativeRect: wi,
	getDocumentElement: qr,
	getClippingRect: Mi,
	getOffsetParent: Li,
	getElementRects: Ri,
	getClientRects: Ti,
	getDimensions: Ni,
	getScale: _i,
	isElement: Yr,
	isRTL: zi
};
function Vi(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Hi(e, t, n) {
	let r = null, i, a = qr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ar(d), h = ar(a.clientWidth - (u + f)), g = ar(a.clientHeight - (d + p)), _ = ar(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: rr(0, nr(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Vi(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Kr(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Ui(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = gi(e), u = i || a ? [...l ? pi(l) : [], ...t ? pi(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Hi(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? xi(e) : null;
	c && g();
	function g() {
		let t = xi(e);
		h && !Vi(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Wi = Br, Gi = Vr, Ki = Pr, qi = Ur, Ji = Lr, Yi = Nr, Xi = Hr, Zi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Bi,
		...i.platform,
		_c: r
	};
	return Mr(e, t, {
		...i,
		platform: a
	});
}, Qi = typeof document < "u" ? u : function() {};
function $i(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!$i(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !$i(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function ea(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ta(e, t) {
	let n = ea(e);
	return Math.round(t * n) / n;
}
function na(t) {
	let n = e.useRef(t);
	return Qi(() => {
		n.current = t;
	}), n;
}
function ra(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	$i(p, i) || m(i);
	let [h, g] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, g(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || h, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = na(l), k = na(a), A = na(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), Zi(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			ee.current && !$i(E.current, t) && (E.current = t, _.flushSync(() => {
				f(t);
			}));
		});
	}, [
		p,
		n,
		r,
		k,
		A
	]);
	Qi(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let ee = e.useRef(!1);
	Qi(() => (ee.current = !0, () => {
		ee.current = !1;
	}), []), Qi(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let M = e.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), N = e.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), te = e.useMemo(() => {
		let e = {
			position: r,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = ta(N.floating, d.x), n = ta(N.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...ea(N.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: r,
			left: t,
			top: n
		};
	}, [
		r,
		c,
		N.floating,
		d.x,
		d.y
	]);
	return e.useMemo(() => ({
		...d,
		update: j,
		refs: M,
		elements: N,
		floatingStyles: te
	}), [
		d,
		j,
		M,
		N,
		te
	]);
}
var ia = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : Yi({
				element: r.current,
				padding: i
			}).fn(n) : r ? Yi({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, aa = (e, t) => {
	let n = Wi(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, oa = (e, t) => {
	let n = Gi(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, sa = (e, t) => ({
	fn: Xi(e).fn,
	options: [e, t]
}), ca = (e, t) => {
	let n = Ki(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, la = (e, t) => {
	let n = qi(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ua = (e, t) => {
	let n = Ji(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, da = (e, t) => {
	let n = ia(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, fa = Object.defineProperty, pa = (e, t) => fa(e, "name", {
	value: t,
	configurable: !0
});
function ma(t) {
	let [n, r] = e.useState(void 0);
	return Yn(() => {
		if (t) {
			r({
				width: t.offsetWidth,
				height: t.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let n = e[0], i, a;
				if ("borderBoxSize" in n) {
					let e = n.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = t.offsetWidth, a = t.offsetHeight;
				r({
					width: i,
					height: a
				});
			});
			return e.observe(t, { box: "border-box" }), () => e.unobserve(t);
		}
		r(void 0);
	}, [t]), n;
}
pa(ma, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var ha = Object.defineProperty, ga = (e, t) => ha(e, "name", {
	value: t,
	configurable: !0
}), _a = "Popper", [va, ya] = /* @__PURE__ */ St(_a), [ba, xa] = va(_a), Sa = /* @__PURE__ */ ga((t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null), [o, s] = e.useState(void 0);
	return /* @__PURE__ */ h(ba, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		placementState: o,
		setPlacementState: s,
		children: r
	});
}, "Popper"), Ca = "PopperAnchor", wa = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ ga(function(t, n) {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = xa(Ca, r), s = e.useRef(null), c = o.onAnchorChange, l = U(n, e.useCallback((e) => {
		s.current = e, e && c(e);
	}, [c])), u = e.useRef(null);
	e.useEffect(() => {
		if (!i) return;
		let e = u.current;
		u.current = i.current, e !== u.current && c(u.current);
	});
	let d = o.placementState && ja(o.placementState), f = d?.[0], p = d?.[1];
	return i ? null : /* @__PURE__ */ h(G.div, {
		"data-radix-popper-side": f,
		"data-radix-popper-align": p,
		...a,
		ref: l
	});
}, "PopperAnchor")), Ta = "PopperContent", [Ea, Da] = va(Ta), Oa = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ ga(function(t, n) {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: p = !1, updatePositionStrategy: m = "optimized", onPlaced: g, ..._ } = t, v = xa(Ta, r), [y, b] = e.useState(null), x = U(n, b), [S, C] = e.useState(null), w = ma(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(ka),
		altBoundary: A
	}, { refs: ee, floatingStyles: M, placement: N, isPositioned: te, middlewareData: P } = ra({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: /* @__PURE__ */ ga((...e) => Ui(...e, { animationFrame: m === "always" }), "whileElementsMounted"),
		elements: { reference: v.anchor },
		middleware: [
			aa({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && oa({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? sa() : void 0,
				...j
			}),
			l && ca({ ...j }),
			la({
				...j,
				apply: /* @__PURE__ */ ga(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			S && da({
				element: S,
				padding: c
			}),
			Aa({
				arrowWidth: T,
				arrowHeight: E
			}),
			p && ua({
				strategy: "referenceHidden",
				...j,
				boundary: A ? j.boundary : void 0
			})
		]
	}), F = v.setPlacementState;
	Yn(() => (F(N), () => {
		F(void 0);
	}), [N, F]);
	let [ne, I] = ja(N), L = dn(g);
	Yn(() => {
		te && L?.();
	}, [te, L]);
	let R = P.arrow?.x, re = P.arrow?.y, ie = P.arrow?.centerOffset !== 0, [ae, oe] = e.useState();
	return Yn(() => {
		y && oe(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ h("div", {
		ref: ee.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...M,
			transform: te ? M.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ae,
			"--radix-popper-transform-origin": [P.transformOrigin?.x, P.transformOrigin?.y].join(" "),
			...P.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ h(Ea, {
			scope: r,
			placedSide: ne,
			placedAlign: I,
			onArrowChange: C,
			arrowX: R,
			arrowY: re,
			shouldHideArrow: ie,
			children: /* @__PURE__ */ h(G.div, {
				"data-side": ne,
				"data-align": I,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: te ? _.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent"));
function ka(e) {
	return e !== null;
}
ga(ka, "isNotNull");
var Aa = /* @__PURE__ */ ga((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = ja(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function ja(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
ga(ja, "getSideAndAlignFromPlacement");
var Ma = Sa, Na = wa, Pa = Oa, Fa = Object.defineProperty, Ia = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ ((e, t) => Fa(e, "name", {
	value: t,
	configurable: !0
}))(function(t, n) {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	Yn(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? _.createPortal(/* @__PURE__ */ h(G.div, {
		...i,
		ref: n
	}), s) : null;
}, "Portal")), La = Object.defineProperty, Ra = (e, t) => La(e, "name", {
	value: t,
	configurable: !0
});
function za(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
Ra(za, "useStateMachine");
var Ba = /* @__PURE__ */ Ra((t) => {
	let { present: n, children: r } = t, i = Va(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = Ua(i.ref, Ga(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
}, "Presence");
function Va(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), s = e.useRef(void 0), [c, l] = za(t ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return e.useEffect(() => {
		c === "mounted" ? (o.current = s.current ?? Wa(i.current), s.current = void 0) : o.current = "none";
	}, [c]), Yn(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = Wa(e);
			t ? (s.current = i, l("MOUNT")) : i === "none" || e?.display === "none" ? l("UNMOUNT") : l(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, l]), Yn(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = /* @__PURE__ */ Ra((r) => {
				let o = Wa(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (l("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Ra((e) => {
				e.target === n && (o.current = Wa(i.current));
			}, "handleAnimationStart");
			return n.addEventListener("animationstart", s), n.addEventListener("animationcancel", r), n.addEventListener("animationend", r), () => {
				t.clearTimeout(e), n.removeEventListener("animationstart", s), n.removeEventListener("animationcancel", r), n.removeEventListener("animationend", r);
			};
		}
		l("ANIMATION_END");
	}, [n, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: e.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				i.current = t, s.current = Wa(t);
			} else i.current = null;
			r(e);
		}, [])
	};
}
Ra(Va, "usePresence");
function Ha(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Ra(Ha, "setRef");
function Ua(...t) {
	let n = e.useRef(t);
	return n.current = t, e.useCallback((e) => {
		let t = n.current, r = !1, i = t.map((t) => {
			let n = Ha(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let n = i[e];
				typeof n == "function" ? n() : Ha(t[e], null);
			}
		};
	}, []);
}
Ra(Ua, "useStableComposedRefs");
function Wa(e) {
	return e?.animationName || "none";
}
Ra(Wa, "getAnimationName");
function Ga(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Ra(Ga, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var Ka = Object.defineProperty, qa = (e, t) => Ka(e, "name", {
	value: t,
	configurable: !0
}), Ja = e.useEffectEvent, Ya = e.useInsertionEffect;
function Xa(t) {
	if (typeof Ja == "function") return Ja(t);
	let n = e.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof Ya == "function" ? Ya(() => {
		n.current = t;
	}) : Yn(() => {
		n.current = t;
	}), e.useMemo(() => ((...e) => n.current?.(...e)), []);
}
qa(Xa, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Za = Object.defineProperty, Qa = (e, t) => Za(e, "name", {
	value: t,
	configurable: !0
}), $a = e.useInsertionEffect || Yn;
function eo({ prop: t, defaultProp: n, onChange: r = /* @__PURE__ */ Qa(() => {}, "onChange"), caller: i }) {
	let [a, o, s] = to({
		defaultProp: n,
		onChange: r
	}), c = t !== void 0;
	return [c ? t : a, e.useCallback((e) => {
		if (c) {
			let n = no(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
Qa(eo, "useControllableState");
function to({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return $a(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
Qa(to, "useUncontrolledState");
function no(e) {
	return typeof e == "function";
}
Qa(no, "isFunction");
var ro = Symbol("RADIX:SYNC_STATE");
function io(t, n, r, i) {
	let { prop: a, defaultProp: o, onChange: s, caller: c } = n, l = a !== void 0, u = Xa(s), d = [{
		...r,
		state: o
	}];
	i && d.push(i);
	let [f, p] = e.useReducer((e, n) => {
		if (n.type === ro) return {
			...e,
			state: n.state
		};
		let r = t(e, n);
		return l && !Object.is(r.state, e.state) && u(r.state), r;
	}, ...d), m = f.state, h = e.useRef(m);
	e.useEffect(() => {
		h.current !== m && (h.current = m, l || u(m));
	}, [
		m,
		h,
		l
	]);
	let g = e.useMemo(() => a === void 0 ? f : {
		...f,
		state: a
	}, [f, a]);
	return e.useEffect(() => {
		l && !Object.is(a, f.state) && p({
			type: ro,
			state: a
		});
	}, [
		a,
		f.state,
		l
	]), [g, p];
}
Qa(io, "useControllableStateReducer");
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
var ao = Object.defineProperty, oo = (e, t) => ao(e, "name", {
	value: t,
	configurable: !0
});
function so(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
oo(so, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var co = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), lo = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, uo = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), po = {}, mo = 0, ho = function(e) {
	return e && (e.host || ho(e.parentNode));
}, go = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ho(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, _o = function(e, t, n, r) {
	var i = go(t, Array.isArray(e) ? e : [e]);
	po[n] || (po[n] = /* @__PURE__ */ new WeakMap());
	var a = po[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		e && !s.has(e) && (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		e && !c.has(e) && Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (uo.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				uo.set(e, c), a.set(e, l), o.push(e), c === 1 && i && fo.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), mo++, function() {
		o.forEach(function(e) {
			var t = uo.get(e) - 1, i = a.get(e) - 1;
			uo.set(e, t), a.set(e, i), t || (fo.has(e) || e.removeAttribute(r), fo.delete(e)), i || e.removeAttribute(n);
		}), mo--, mo || (uo = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), po = {});
	};
}, vo = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || lo(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), _o(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, yo = function() {
	return yo = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, yo.apply(this, arguments);
};
function bo(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function xo(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var So = "right-scroll-bar-position", Co = "width-before-scroll-bar", wo = "with-scroll-bars-hidden", To = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Eo(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Do(e, t) {
	var n = p(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Oo = typeof window < "u" ? e.useLayoutEffect : e.useEffect, ko = /* @__PURE__ */ new WeakMap();
function Ao(e, t) {
	var n = Do(t || null, function(t) {
		return e.forEach(function(e) {
			return Eo(e, t);
		});
	});
	return Oo(function() {
		var t = ko.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Eo(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Eo(e, a);
			});
		}
		ko.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function jo(e) {
	return e;
}
function Mo(e, t) {
	t === void 0 && (t = jo);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function No(e) {
	e === void 0 && (e = {});
	var t = Mo(null);
	return t.options = yo({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Po = function(t) {
	var n = t.sideCar, r = bo(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, yo({}, r));
};
Po.isSideCarExport = !0;
function Fo(e, t) {
	return e.useMedium(t), Po;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Io = No(), Lo = function() {}, Ro = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: Lo,
		onWheelCapture: Lo,
		onTouchMoveCapture: Lo
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = bo(t, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = Ao([r, n]), w = yo(yo({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: Io,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), yo(yo({}, w), { ref: C })) : e.createElement(y, yo({}, w, {
		className: l,
		ref: C
	}), c));
});
Ro.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ro.classNames = {
	fullWidth: Co,
	zeroRight: So
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var zo = function() {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Bo() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = zo();
	return t && e.setAttribute("nonce", t), e;
}
function Vo(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ho(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Uo = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Bo()) && (Vo(t, n), Ho(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Wo = function() {
	var t = Uo();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, Go = function() {
	var e = Wo();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Ko = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, qo = function(e) {
	return parseInt(e || "", 10) || 0;
}, Jo = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		qo(n),
		qo(r),
		qo(i)
	];
}, Yo = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Ko;
	var t = Jo(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Xo = Go(), Zo = "data-scroll-locked", Qo = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${wo} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Zo}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${So} {
    right: ${s}px ${r};
  }
  
  .${Co} {
    margin-right: ${s}px ${r};
  }
  
  .${So} .${So} {
    right: 0 ${r};
  }
  
  .${Co} .${Co} {
    margin-right: 0 ${r};
  }
  
  body[${Zo}] {
    ${To}: ${s}px;
  }
`;
}, $o = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, es = function() {
	e.useEffect(function() {
		return document.body.setAttribute(Zo, ($o() + 1).toString()), function() {
			var e = $o() - 1;
			e <= 0 ? document.body.removeAttribute(Zo) : document.body.setAttribute(Zo, e.toString());
		};
	}, []);
}, ts = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	es();
	var o = e.useMemo(function() {
		return Yo(a);
	}, [a]);
	return e.createElement(Xo, { styles: Qo(o, !n, a, r ? "" : "!important") });
}, ns = !1;
if (typeof window < "u") try {
	var rs = Object.defineProperty({}, "passive", { get: function() {
		return ns = !0, !0;
	} });
	window.addEventListener("test", rs, rs), window.removeEventListener("test", rs, rs);
} catch {
	ns = !1;
}
var is = ns ? { passive: !1 } : !1, as = function(e) {
	return e.tagName === "TEXTAREA";
}, os = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !as(e) && n[t] === "visible");
}, ss = function(e) {
	return os(e, "overflowY");
}, cs = function(e) {
	return os(e, "overflowX");
}, ls = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), fs(e, r)) {
			var i = ps(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, us = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, ds = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, fs = function(e, t) {
	return e === "v" ? ss(t) : cs(t);
}, ps = function(e, t) {
	return e === "v" ? us(t) : ds(t);
}, ms = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, hs = function(e, t, n, r, i) {
	var a = ms(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = ps(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && fs(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, gs = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, _s = function(e) {
	return [e.deltaX, e.deltaY];
}, vs = function(e) {
	return e && "current" in e ? e.current : e;
}, ys = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, bs = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, xs = 0, Ss = [];
function Cs(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(xs++)[0], o = e.useState(Go)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = xo([t.lockRef.current], (t.shards || []).map(vs), !0).filter(Boolean);
			return e.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${a}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${a}`), e.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${a}`);
				});
			};
		}
	}, [
		t.inert,
		t.lockRef.current,
		t.shards
	]);
	var c = e.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !s.current.allowPinchZoom;
		var n = gs(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = ls(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = ls(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return hs(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (Ss.length && Ss[Ss.length - 1] === o) {
			var r = "deltaY" in t ? _s(t) : gs(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && ys(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(vs).filter(Boolean).filter(function(e) {
					return e.contains(t.target);
				});
				(a.length > 0 ? c(t, a[0]) : !s.current.noIsolation) && t.cancelable && t.preventDefault();
			}
		}
	}, []), u = e.useCallback(function(e, t, r, i) {
		var a = {
			name: e,
			delta: t,
			target: r,
			should: i,
			shadowParent: ws(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = gs(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, _s(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, gs(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return Ss.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, is), document.addEventListener("touchmove", l, is), document.addEventListener("touchstart", d, is), function() {
			Ss = Ss.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, is), document.removeEventListener("touchmove", l, is), document.removeEventListener("touchstart", d, is);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: bs(a) }) : null, m ? e.createElement(ts, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function ws(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Ts = Fo(Io, Cs), Es = e.forwardRef(function(t, n) {
	return e.createElement(Ro, yo({}, t, {
		ref: n,
		sideCar: Ts
	}));
});
Es.classNames = Ro.classNames;
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
var Ds = Object.defineProperty, q = (e, t) => Ds(e, "name", {
	value: t,
	configurable: !0
}), Os = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], ks = [" ", "Enter"], As = "Select", [js, Ms, Ns] = /* @__PURE__ */ Wt(As), [Ps, Fs] = /* @__PURE__ */ St(As, [Ns, ya]), Is = ya(), [Ls, Rs] = Ps(As), [zs, Bs] = Ps(As);
function Vs(t) {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: p, required: m, form: g, internal_do_not_use_render: _ } = t, v = Is(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = an(u), [E, D] = eo({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: As
	}), [O, k] = eo({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: As
	}), A = e.useRef(null), j = e.useRef(O);
	e.useEffect(() => {
		let e = g ? y?.ownerDocument.getElementById(g) : y?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ q(() => k(j.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		g,
		y,
		k
	]);
	let ee = !y || !!g || !!y.closest("form"), [M, N] = e.useState(/* @__PURE__ */ new Set()), te = er(), P = Array.from(M).map((e) => e.props.value).join(";"), F = e.useCallback((e) => {
		N((t) => new Set(t).add(e));
	}, []), ne = e.useCallback((e) => {
		N((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		});
	}, []), I = {
		required: m,
		trigger: y,
		onTriggerChange: b,
		valueNode: x,
		onValueNodeChange: S,
		valueNodeHasChildren: C,
		onValueNodeHasChildrenChange: w,
		contentId: te,
		value: O,
		onValueChange: k,
		open: E,
		onOpenChange: D,
		dir: T,
		triggerPointerDownPosRef: A,
		disabled: p,
		name: d,
		autoComplete: f,
		form: g,
		nativeOptions: M,
		nativeSelectKey: P,
		isFormControl: ee
	};
	return /* @__PURE__ */ h(Ma, {
		...v,
		children: /* @__PURE__ */ h(Ls, {
			scope: n,
			...I,
			children: /* @__PURE__ */ h(js.Provider, {
				scope: n,
				children: /* @__PURE__ */ h(zs, {
					scope: n,
					onNativeOptionAdd: F,
					onNativeOptionRemove: ne,
					children: Cc(_) ? _(I) : r
				})
			})
		})
	});
}
q(Vs, "SelectProvider");
var Hs = /* @__PURE__ */ q((e) => {
	let { __scopeSelect: t, children: n, ...r } = e;
	return /* @__PURE__ */ h(Vs, {
		__scopeSelect: t,
		...r,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ g(m, { children: [n, e ? /* @__PURE__ */ h(Sc, { __scopeSelect: t }) : null] })
	});
}, "Select"), Us = "SelectTrigger", Ws = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = Is(r), s = Rs(Us, r), c = s.disabled || i, l = U(n, s.onTriggerChange), u = Ms(r), d = e.useRef("touch"), [f, p, m] = Tc((e) => {
		let t = u().filter((e) => !e.disabled), n = Ec(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = /* @__PURE__ */ q((e) => {
		c || (s.onOpenChange(!0), m()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	}, "handleOpen");
	return /* @__PURE__ */ h(Na, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ h(G.button, {
			type: "button",
			role: "combobox",
			"aria-controls": s.open ? s.contentId : void 0,
			"aria-expanded": s.open,
			"aria-required": s.required,
			"aria-autocomplete": "none",
			dir: s.dir,
			"data-state": s.open ? "open" : "closed",
			disabled: c,
			"data-disabled": c ? "" : void 0,
			"data-placeholder": wc(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: H(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: H(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: H(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key), !(t && e.key === " ") && Os.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
}, "SelectTrigger")), Gs = "SelectValue", Ks = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, className: i, style: a, children: o, placeholder: s = "", ...c } = t, l = Rs(Gs, r), { onValueNodeHasChildrenChange: u } = l, d = o !== void 0, f = U(n, l.onValueNodeChange);
	Yn(() => {
		u(d);
	}, [u, d]);
	let p = wc(l.value);
	return /* @__PURE__ */ h(G.span, {
		...c,
		asChild: !p && c.asChild,
		ref: f,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ h(e.Fragment, { children: p ? s : o }, p ? "placeholder" : "value")
	});
}, "SelectValue")), qs = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ h(G.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
}, "SelectIcon")), [Js, Ys] = Ps("SelectPortal", { forceMount: void 0 }), Xs = /* @__PURE__ */ q((e) => {
	let { __scopeSelect: t, forceMount: n, ...r } = e;
	return /* @__PURE__ */ h(Js, {
		scope: e.__scopeSelect,
		forceMount: n,
		children: /* @__PURE__ */ h(Ia, {
			asChild: !0,
			...r
		})
	});
}, "SelectPortal"), Zs = "SelectContent", Qs = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let r = Ys(Zs, t.__scopeSelect), { forceMount: i = r.forceMount, ...a } = t, o = Rs(Zs, t.__scopeSelect), [s, c] = e.useState();
	return Yn(() => {
		c(new DocumentFragment());
	}, []), /* @__PURE__ */ h(Ba, {
		present: i || o.open,
		children: ({ present: e }) => e ? /* @__PURE__ */ h(ic, {
			...a,
			ref: n
		}) : /* @__PURE__ */ h($s, {
			...a,
			fragment: s
		})
	});
}, "SelectContent")), $s = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeSelect: n, children: r, fragment: i } = e;
	return i ? _.createPortal(/* @__PURE__ */ h(tc, {
		scope: n,
		children: /* @__PURE__ */ h(js.Slot, {
			scope: n,
			children: /* @__PURE__ */ h("div", {
				ref: t,
				children: r
			})
		})
	}), i) : null;
}, "SelectContentFragment")), ec = 10, [tc, nc] = Ps(Zs), rc = /* @__PURE__ */ At("SelectContent.RemoveScroll"), ic = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r } = t, { position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: p, collisionPadding: m, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = Rs(Zs, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = U(n, S), [E, D] = e.useState(null), [O, k] = e.useState(null), A = Ms(r), [j, ee] = e.useState(!1), M = e.useRef(!1);
	e.useEffect(() => {
		if (x) return vo(x);
	}, [x]), An();
	let N = e.useCallback((e) => {
		let [t, ...n] = A().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && C && (C.scrollTop = 0), n === r && C && (C.scrollTop = C.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [A, C]), te = e.useCallback(() => N([E, x]), [
		N,
		E,
		x
	]);
	e.useEffect(() => {
		j && te();
	}, [j, te]);
	let { onOpenChange: P, triggerPointerDownPosRef: F } = b;
	e.useEffect(() => {
		if (x) {
			let e = {
				x: 0,
				y: 0
			}, t = /* @__PURE__ */ q((t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (F.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (F.current?.y ?? 0))
				};
			}, "handlePointerMove"), n = /* @__PURE__ */ q((n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(x) || P(!1), document.removeEventListener("pointermove", t), F.current = null;
			}, "handlePointerUp");
			return F.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		x,
		P,
		F
	]), e.useEffect(() => {
		let e = /* @__PURE__ */ q(() => P(!1), "close");
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [P]);
	let [ne, I] = Tc((e) => {
		let t = A().filter((e) => !e.disabled), n = Ec(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current?.focus());
	}), L = e.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (M.current = !0));
	}, [b.value]), R = e.useCallback(() => x?.focus(), [x]), re = e.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), ie = i === "popper" ? oc : ac, ae = ie === oc ? {
		side: c,
		sideOffset: l,
		align: u,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: p,
		collisionPadding: m,
		sticky: g,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ h(tc, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: L,
		selectedItem: E,
		onItemLeave: R,
		itemTextRefCallback: re,
		focusSelectedItem: te,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: ne,
		children: /* @__PURE__ */ h(Es, {
			as: rc,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ h(Ln, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: H(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ h(vn, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ h(ie, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...ae,
						onPlaced: () => ee(!0),
						ref: T,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...y.style
						},
						onKeyDown: H(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && I(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = A().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => N(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
}, "SelectContentImpl")), ac = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = Rs(Zs, r), s = nc(Zs, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = U(n, d), p = Ms(r), m = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - ec, d = dt(a, [ec, Math.max(ec, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - ec, d = dt(a, [ec, Math.max(ec, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = p(), s = window.innerHeight - ec * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), h = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + h + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - ec, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + h + k, j = x - A;
			if (A <= E) {
				let e = a.length > 0 && v === a[a.length - 1].ref.current;
				c.style.bottom = "0px";
				let t = u.clientHeight - _.offsetTop - _.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + g);
				c.style.height = n + "px";
			} else {
				let e = a.length > 0 && v === a[0].ref.current;
				c.style.top = "0px";
				let t = Math.max(E, f + _.offsetTop + (e ? w : 0) + O) + j;
				c.style.height = t + "px", _.scrollTop = A - E + _.offsetTop;
			}
			c.style.margin = `${ec}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => m.current = !0);
		}
	}, [
		p,
		o.trigger,
		o.valueNode,
		c,
		u,
		_,
		v,
		y,
		o.dir,
		i
	]);
	Yn(() => x(), [x]);
	let [S, C] = e.useState();
	Yn(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]);
	let w = e.useCallback((e) => {
		e && g.current === !0 && (x(), b?.(), g.current = !1);
	}, [x, b]);
	return /* @__PURE__ */ h(sc, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: m,
		onScrollButtonChange: w,
		children: /* @__PURE__ */ h("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ h(G.div, {
				...a,
				ref: f,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...a.style
				}
			})
		})
	});
}, "SelectItemAlignedPosition")), oc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = ec, ...a } = e, o = Is(n);
	return /* @__PURE__ */ h(Pa, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "SelectPopperPosition")), [sc, cc] = Ps(Zs, {}), lc = "SelectViewport", uc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = nc(lc, r), s = cc(lc, r), c = U(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ h(js.Slot, {
		scope: r,
		children: /* @__PURE__ */ h(G.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...a,
			ref: c,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...a.style
			},
			onScroll: H(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - ec * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				l.current = t.scrollTop;
			})
		})
	})] });
}, "SelectViewport")), [dc, fc] = Ps("SelectGroup"), pc = "SelectItem", [mc, hc] = Ps(pc), gc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = Rs(pc, r), l = nc(pc, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [p, m] = e.useState(!1), g = U(n, dn((e) => l.itemRefCallback?.(e, i, a))), _ = er(), v = e.useRef("touch"), y = /* @__PURE__ */ q(() => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	}, "handleSelect");
	return /* @__PURE__ */ h(mc, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ h(js.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ h(G.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": p ? "" : void 0,
				"aria-selected": u && p,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: g,
				onFocus: H(s.onFocus, () => m(!0)),
				onBlur: H(s.onBlur, () => m(!1)),
				onClick: H(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: H(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: H(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: H(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: H(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: H(s.onKeyDown, (e) => {
					a || e.target !== e.currentTarget || (l.searchRef?.current === "" || e.key !== " ") && (ks.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
}, "SelectItem")), _c = "SelectItemText", vc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(t, n) {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = Rs(_c, r), c = nc(_c, r), l = hc(_c, r), u = Bs(_c, r), [d, f] = e.useState(null), p = dn((e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = U(n, f, l.onItemTextChange, p), y = d?.textContent, b = e.useMemo(() => /* @__PURE__ */ h("option", {
		value: l.value,
		disabled: l.disabled,
		children: y
	}, l.value), [
		l.disabled,
		l.value,
		y
	]), { onNativeOptionAdd: x, onNativeOptionRemove: S } = u;
	return Yn(() => (x(b), () => S(b)), [
		x,
		S,
		b
	]), /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(G.span, {
		id: l.textId,
		...o,
		ref: v
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren && !wc(s.value) ? _.createPortal(o.children, s.valueNode) : null] });
}, "SelectItemText")), yc = "SelectItemIndicator", bc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return hc(yc, n).isSelected ? /* @__PURE__ */ h(G.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
}, "SelectItemIndicator")), xc = "SelectBubbleInput", Sc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ q(function({ __scopeSelect: t, ...n }, r) {
	let i = Rs(xc, t), { value: a, onValueChange: o, required: s, disabled: c, name: l, autoComplete: u, form: d } = i, { nativeOptions: f, nativeSelectKey: p } = i, m = e.useRef(null), _ = U(r, m), v = a ?? "", y = so(v), b = Array.from(f).some((e) => (e.props.value ?? "") === "");
	return e.useEffect(() => {
		let e = m.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (y !== v && n) {
			let t = new Event("change", { bubbles: !0 });
			n.call(e, v), e.dispatchEvent(t);
		}
	}, [y, v]), /* @__PURE__ */ g(G.select, {
		"aria-hidden": !0,
		required: s,
		tabIndex: -1,
		name: l,
		autoComplete: u,
		disabled: c,
		form: d,
		onChange: (e) => o(e.target.value),
		...n,
		style: {
			...co,
			...n.style
		},
		ref: _,
		defaultValue: v,
		children: [wc(a) && !b ? /* @__PURE__ */ h("option", { value: "" }) : null, Array.from(f)]
	}, p);
}, "SelectBubbleInput"));
function Cc(e) {
	return typeof e == "function";
}
q(Cc, "isFunction");
function wc(e) {
	return e === "" || e === void 0;
}
q(wc, "shouldShowPlaceholder");
function Tc(t) {
	let n = dn(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
		let t = r.current + e;
		n(t), (/* @__PURE__ */ q((function e(t) {
			r.current = t, window.clearTimeout(i.current), t !== "" && (i.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(t);
	}, [n]), o = e.useCallback(() => {
		r.current = "", window.clearTimeout(i.current);
	}, []);
	return e.useEffect(() => () => window.clearTimeout(i.current), []), [
		r,
		a,
		o
	];
}
q(Tc, "useTypeaheadSearch");
function Ec(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Dc(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
q(Ec, "findNextItem");
function Dc(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
q(Dc, "wrapArray");
//#endregion
//#region src/ui/Select.jsx
var Oc = "__fe_clear__";
function kc(e) {
	return n.toArray(e).filter(a).map((e) => ({
		value: String(e.props.value ?? ""),
		label: e.props.children
	}));
}
function Ac({ value: e = "", onChange: t, placeholder: n = "— Selecione —", id: r, name: i, disabled: a, error: o = !1, className: s = "", children: c, ...l }) {
	let u = kc(c), d = u.find((e) => e.value === "")?.label ?? n, f = u.some((e) => e.value === ""), p = u.map((e) => e.value === "" ? {
		...e,
		value: Oc
	} : e);
	return /* @__PURE__ */ g(Hs, {
		value: e === "" || e == null ? f ? Oc : void 0 : String(e),
		onValueChange: (e) => {
			typeof t == "function" && t({ target: {
				value: e === Oc ? "" : String(e),
				name: i
			} });
		},
		disabled: a,
		children: [/* @__PURE__ */ g(Ws, {
			id: r,
			"data-select-trigger": "",
			className: B(qe, "flex cursor-pointer items-center justify-between gap-2 text-left", o && "border-red-400 focus:border-red-500 focus:ring-red-500/30", s),
			...l,
			children: [/* @__PURE__ */ h("span", {
				className: "truncate",
				children: /* @__PURE__ */ h(Ks, { placeholder: d })
			}), /* @__PURE__ */ h(qs, { children: /* @__PURE__ */ h(Qe, { className: "h-4 w-4 flex-none text-gray-400 dark:text-gray-500" }) })]
		}), /* @__PURE__ */ h(Xs, { children: /* @__PURE__ */ h(Qs, {
			position: "popper",
			sideOffset: 4,
			className: "z-50 max-h-72 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg",
			style: { minWidth: "var(--radix-select-trigger-width)" },
			children: /* @__PURE__ */ h(uc, {
				className: "p-1",
				children: p.map((e) => /* @__PURE__ */ g(gc, {
					value: e.value,
					className: "flex cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-300 outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-950 data-[highlighted]:text-blue-700 dark:data-[highlighted]:text-blue-300 data-[state=checked]:font-semibold",
					children: [/* @__PURE__ */ h(vc, { children: e.label }), /* @__PURE__ */ h(bc, {
						className: "ml-auto pl-2 text-blue-600 dark:text-blue-400",
						children: "✓"
					})]
				}, e.value))
			})
		}) })]
	});
}
//#endregion
//#region node_modules/@radix-ui/react-checkbox/dist/index.mjs
var jc = Object.defineProperty, Mc = (e, t) => jc(e, "name", {
	value: t,
	configurable: !0
}), Nc = "Checkbox", [Pc, Fc] = /* @__PURE__ */ St(Nc), [Ic, Lc] = Pc(Nc);
function Rc(t) {
	let { __scopeCheckbox: n, checked: r, children: i, defaultChecked: a, disabled: o, form: s, name: c, onCheckedChange: l, required: u, value: d = "on", internal_do_not_use_render: f } = t, [p, m] = eo({
		prop: r,
		defaultProp: a ?? !1,
		onChange: l,
		caller: Nc
	}), [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useRef(!1), [x, S] = e.useReducer((e) => e + 1, 0), C = !g || !!s || !!g.closest("form"), w = {
		checked: p,
		disabled: o,
		setChecked: m,
		control: g,
		setControl: _,
		name: c,
		form: s,
		value: d,
		hasConsumerStoppedPropagationRef: b,
		userInteractionCount: x,
		onUserInteraction: S,
		required: u,
		defaultChecked: !qc(a) && a,
		isFormControl: C,
		bubbleInput: v,
		setBubbleInput: y
	};
	return /* @__PURE__ */ h(Ic, {
		scope: n,
		...w,
		children: Kc(f) ? f(w) : i
	});
}
Mc(Rc, "CheckboxProvider");
var zc = "CheckboxTrigger", Bc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Mc(function({ __scopeCheckbox: t, onKeyDown: n, onClick: r, ...i }, a) {
	let { control: o, value: s, disabled: c, checked: l, required: u, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: p, onUserInteraction: m, isFormControl: g, bubbleInput: _ } = Lc(zc, t), v = U(a, d), y = e.useRef(l);
	return e.useEffect(() => {
		let e = o?.form;
		if (e) {
			let t = /* @__PURE__ */ Mc(() => f(y.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [o, f]), /* @__PURE__ */ h(G.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": qc(l) ? "mixed" : l,
		"aria-required": u,
		"data-state": Jc(l),
		"data-disabled": c ? "" : void 0,
		disabled: c,
		value: s,
		...i,
		ref: v,
		onKeyDown: H(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: H(r, (e) => {
			m(), f((e) => qc(e) ? !0 : !e), _ && g && (p.current = e.isPropagationStopped(), p.current || e.stopPropagation());
		})
	});
}, "CheckboxTrigger")), Vc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Mc(function(e, t) {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ h(Rc, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(Bc, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ h(Gc, { __scopeCheckbox: n })] })
	});
}, "Checkbox")), Hc = "CheckboxIndicator", Uc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Mc(function(e, t) {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = Lc(Hc, n);
	return /* @__PURE__ */ h(Ba, {
		present: r || qc(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ h(G.span, {
			"data-state": Jc(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
}, "CheckboxIndicator")), Wc = "CheckboxBubbleInput", Gc = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Mc(function({ __scopeCheckbox: t, onClick: n, ...r }, i) {
	let { control: a, hasConsumerStoppedPropagationRef: o, userInteractionCount: s, checked: c, defaultChecked: l, required: u, disabled: d, name: f, value: p, form: m, bubbleInput: g, setBubbleInput: _ } = Lc(Wc, t), v = U(i, _), y = ma(a), b = e.useRef(!1), x = e.useRef(c), S = e.useRef(s);
	e.useEffect(() => {
		let e = g;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = s !== S.current;
		S.current = s;
		let i = x.current !== c;
		x.current = c;
		let a = !(r && o.current);
		if (i && n) {
			b.current = !r;
			let t = new Event("click", { bubbles: a });
			e.indeterminate = qc(c), n.call(e, !qc(c) && c), e.dispatchEvent(t), b.current = !1;
		}
	}, [
		g,
		c,
		o,
		s
	]);
	let C = e.useRef(!qc(c) && c);
	return /* @__PURE__ */ h(G.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: l ?? C.current,
		required: u,
		disabled: d,
		name: f,
		value: p,
		form: m,
		...r,
		tabIndex: -1,
		ref: v,
		onClick: H(n, (e) => {
			b.current && e.stopPropagation();
		}),
		style: {
			...r.style,
			...y,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "CheckboxBubbleInput"));
function Kc(e) {
	return typeof e == "function";
}
Mc(Kc, "isFunction");
function qc(e) {
	return e === "indeterminate";
}
Mc(qc, "isIndeterminate");
function Jc(e) {
	return qc(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
Mc(Jc, "getState");
//#endregion
//#region src/ui/Checkbox.jsx
function Yc({ checked: e = !1, onChange: t, onCheckedChange: n, id: r, disabled: i, className: a = "", ...o }) {
	let s = e === "indeterminate" ? "indeterminate" : !!e;
	return /* @__PURE__ */ h(Vc, {
		id: r,
		checked: s,
		onCheckedChange: (e) => {
			let r = e === "indeterminate" ? e : !!e;
			typeof n == "function" && n(r), typeof t == "function" && t({ target: {
				checked: r === !0,
				value: r
			} });
		},
		disabled: i,
		className: B("flex h-4 w-4 flex-none cursor-pointer items-center justify-center rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600", a),
		...o,
		children: /* @__PURE__ */ h(Uc, { children: h(s === "indeterminate" ? tt : et, {}) })
	});
}
//#endregion
//#region node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var Xc = Object.defineProperty, Zc = (e, t) => Xc(e, "name", {
	value: t,
	configurable: !0
}), Qc = !1;
function $c() {
	let [t, n] = e.useState(Qc);
	return e.useEffect(() => {
		Qc || (Qc = !0, n(!0));
	}, []), t;
}
Zc($c, "useIsHydrated");
var el = e.useSyncExternalStore;
function tl() {
	return () => {};
}
Zc(tl, "subscribe");
function nl() {
	return el(tl, () => !0, () => !1);
}
Zc(nl, "useIsHydratedModern");
var rl = typeof el == "function" ? nl : $c, il = Object.defineProperty, al = (e, t) => il(e, "name", {
	value: t,
	configurable: !0
}), ol = "rovingFocusGroup.onEntryFocus", sl = {
	bubbles: !1,
	cancelable: !0
}, cl = "RovingFocusGroup", [ll, ul, dl] = /* @__PURE__ */ Wt(cl), [fl, pl] = /* @__PURE__ */ St(cl, [dl]), [ml, hl] = fl(cl), gl = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ al(function(e, t) {
	return /* @__PURE__ */ h(ll.Provider, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ h(ll.Slot, {
			scope: e.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ h(_l, {
				...e,
				ref: t
			})
		})
	});
}, "RovingFocusGroup")), _l = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ al(function(t, n) {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, p = e.useRef(null), m = U(n, p), g = an(o), [_, v] = eo({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: cl
	}), [y, b] = e.useState(!1), x = dn(u), S = ul(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = p.current;
		if (e) return e.addEventListener(ol, x), () => e.removeEventListener(ol, x);
	}, [x]), /* @__PURE__ */ h(ml, {
		scope: r,
		orientation: i,
		dir: g,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ h(G.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: m,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: H(t.onMouseDown, () => {
				C.current = !0;
			}),
			onFocus: H(t.onFocus, (e) => {
				let t = !C.current;
				if (e.target === e.currentTarget && t && !y) {
					let t = new CustomEvent(ol, sl);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						Cl([
							e.find((e) => e.active),
							e.find((e) => e.id === _),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				C.current = !1;
			}),
			onBlur: H(t.onBlur, () => b(!1))
		})
	});
}, "RovingFocusGroupImpl")), vl = "RovingFocusGroupItem", yl = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ al(function(t, n) {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = er(), u = o || l, d = hl(vl, r), f = d.currentTabStopId === u, p = ul(r), { onFocusableItemAdd: m, onFocusableItemRemove: g, currentTabStopId: _ } = d, v = rl();
	return Yn(() => {
		if (v && i) return m(), () => g();
	}, [
		v,
		i,
		m,
		g
	]), e.useEffect(() => {
		if (!v && i) return m(), () => g();
	}, [
		v,
		i,
		m,
		g
	]), /* @__PURE__ */ h(ll.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ h(G.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...c,
			ref: n,
			onMouseDown: H(t.onMouseDown, (e) => {
				i ? d.onItemFocus(u) : e.preventDefault();
			}),
			onFocus: H(t.onFocus, () => d.onItemFocus(u)),
			onKeyDown: H(t.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = Sl(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = p().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? wl(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => Cl(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
}, "RovingFocusGroupItem")), bl = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function xl(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
al(xl, "getDirectionAwareKey");
function Sl(e, t, n) {
	let r = xl(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return bl[r];
}
al(Sl, "getFocusIntent");
function Cl(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
al(Cl, "focusFirst");
function wl(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
al(wl, "wrapArray");
var Tl = gl, El = yl, Dl = Object.defineProperty, Ol = (e, t) => Dl(e, "name", {
	value: t,
	configurable: !0
}), kl = "Radio", [Al, jl] = /* @__PURE__ */ St(kl), [Ml, Nl] = Al(kl);
function Pl(t) {
	let { __scopeRadio: n, checked: r = !1, children: i, disabled: a, form: o, name: s, onCheck: c, required: l, value: u = "on", internal_do_not_use_render: d } = t, [f, p] = e.useState(null), [m, g] = e.useState(null), _ = e.useRef(!1), [v, y] = e.useReducer((e) => e + 1, 0), b = {
		checked: r,
		disabled: a,
		required: l,
		name: s,
		form: o,
		value: u,
		control: f,
		setControl: p,
		hasConsumerStoppedPropagationRef: _,
		userInteractionCount: v,
		onUserInteraction: y,
		isFormControl: !f || !!o || !!f.closest("form"),
		bubbleInput: m,
		setBubbleInput: g,
		onCheck: /* @__PURE__ */ Ol(() => c?.(), "onCheck")
	};
	return /* @__PURE__ */ h(Ml, {
		scope: n,
		...b,
		children: Vl(d) ? d(b) : i
	});
}
Ol(Pl, "RadioProvider");
var Fl = "RadioTrigger", Il = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function({ __scopeRadio: e, onClick: t, ...n }, r) {
	let { checked: i, disabled: a, value: o, setControl: s, onCheck: c, hasConsumerStoppedPropagationRef: l, onUserInteraction: u, isFormControl: d, bubbleInput: f } = Nl(Fl, e), p = U(r, s);
	return /* @__PURE__ */ h(G.button, {
		type: "button",
		role: "radio",
		"aria-checked": i,
		"data-state": Hl(i),
		"data-disabled": a ? "" : void 0,
		disabled: a,
		value: o,
		...n,
		ref: p,
		onClick: H(t, (e) => {
			i || (u(), c()), f && d && (l.current = e.isPropagationStopped(), l.current || e.stopPropagation());
		})
	});
}, "RadioTrigger")), Ll = "RadioIndicator", Rl = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(e, t) {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = Nl(Ll, n);
	return /* @__PURE__ */ h(Ba, {
		present: r || a.checked,
		children: /* @__PURE__ */ h(G.span, {
			"data-state": Hl(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
}, "RadioIndicator")), zl = "RadioBubbleInput", Bl = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function({ __scopeRadio: t, onClick: n, ...r }, i) {
	let { control: a, checked: o, required: s, disabled: c, name: l, value: u, form: d, bubbleInput: f, setBubbleInput: p, hasConsumerStoppedPropagationRef: m, userInteractionCount: g } = Nl(zl, t), _ = U(i, p), v = ma(a), y = e.useRef(!1), b = e.useRef(o), x = e.useRef(g);
	e.useEffect(() => {
		let e = f;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = g !== x.current;
		x.current = g;
		let i = b.current !== o;
		b.current = o;
		let a = !(r && m.current);
		if (i && n) {
			y.current = !r;
			let t = new Event("click", { bubbles: a });
			n.call(e, o), e.dispatchEvent(t), y.current = !1;
		}
	}, [
		f,
		o,
		m,
		g
	]);
	let S = e.useRef(o);
	return /* @__PURE__ */ h(G.input, {
		type: "radio",
		"aria-hidden": !0,
		defaultChecked: S.current,
		required: s,
		disabled: c,
		name: l,
		value: u,
		form: d,
		...r,
		tabIndex: -1,
		ref: _,
		onClick: H(n, (e) => {
			y.current && e.stopPropagation();
		}),
		style: {
			...r.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "RadioBubbleInput"));
function Vl(e) {
	return typeof e == "function";
}
Ol(Vl, "isFunction");
function Hl(e) {
	return e ? "checked" : "unchecked";
}
Ol(Hl, "getState");
var Ul = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Wl = "RadioGroup", [Gl, Kl] = /* @__PURE__ */ St(Wl, [pl, jl]), ql = pl(), Jl = jl(), [Yl, Xl] = Gl(Wl), Zl = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(t, n) {
	let { __scopeRadioGroup: r, name: i, form: a, defaultValue: o, value: s, required: c = !1, disabled: l = !1, orientation: u, dir: d, loop: f = !0, onValueChange: p, ...m } = t, g = ql(r), _ = an(d), [v, y] = eo({
		prop: s,
		defaultProp: o ?? null,
		onChange: p,
		caller: Wl
	}), [b, x] = e.useState(null), S = U(n, x), C = e.useRef(v);
	return e.useEffect(() => {
		let e = a ? b?.ownerDocument.getElementById(a) : b?.closest("form");
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ Ol(() => y(C.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		b,
		a,
		y
	]), /* @__PURE__ */ h(Yl, {
		scope: r,
		name: i,
		form: a,
		required: c,
		disabled: l,
		value: v,
		onValueChange: y,
		children: /* @__PURE__ */ h(Tl, {
			asChild: !0,
			...g,
			orientation: u,
			dir: _,
			loop: f,
			children: /* @__PURE__ */ h(G.div, {
				role: "radiogroup",
				"aria-required": c,
				"aria-orientation": u,
				"data-disabled": l ? "" : void 0,
				dir: _,
				...m,
				ref: S
			})
		})
	});
}, "RadioGroup")), Ql = "RadioGroupItemProvider", $l = "RadioGroupItemTrigger";
function eu(e) {
	let { __scopeRadioGroup: t, value: n, disabled: r, children: i, internal_do_not_use_render: a } = e, o = Xl(Ql, t), s = Jl(t), c = o.disabled || r;
	return /* @__PURE__ */ h(Pl, {
		...s,
		checked: o.value === n,
		disabled: c,
		required: o.required,
		name: o.name,
		form: o.form,
		value: n,
		onCheck: () => o.onValueChange(n),
		internal_do_not_use_render: a,
		children: i
	});
}
Ol(eu, "RadioGroupItemProvider");
var tu = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(t, n) {
	let { __scopeRadioGroup: r, ...i } = t, a = ql(r), o = Jl(r), { checked: s, disabled: c } = Nl($l, o.__scopeRadio), l = e.useRef(null), u = U(n, l), d = e.useRef(!1);
	return e.useEffect(() => {
		let e = /* @__PURE__ */ Ol((e) => {
			Ul.includes(e.key) && (d.current = !0);
		}, "handleKeyDown"), t = /* @__PURE__ */ Ol(() => d.current = !1, "handleKeyUp");
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ h(El, {
		asChild: !0,
		...a,
		focusable: !c,
		active: s,
		children: /* @__PURE__ */ h(Il, {
			...o,
			...i,
			ref: u,
			onKeyDown: H(i.onKeyDown, (e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: H(i.onFocus, () => {
				d.current && l.current?.click();
			})
		})
	});
}, "RadioGroupItemTrigger")), nu = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(e, t) {
	let { __scopeRadioGroup: n, value: r, disabled: i, ...a } = e;
	return /* @__PURE__ */ h(eu, {
		__scopeRadioGroup: n,
		value: r,
		disabled: i,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(tu, {
			...a,
			ref: t,
			__scopeRadioGroup: n
		}), e && /* @__PURE__ */ h(ru, { __scopeRadioGroup: n })] })
	});
}, "RadioGroupItem")), ru = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(e, t) {
	let { __scopeRadioGroup: n, ...r } = e, i = Jl(n);
	return /* @__PURE__ */ h(Bl, {
		...i,
		...r,
		ref: t
	});
}, "RadioGroupItemBubbleInput")), iu = /* @__PURE__ */ e.forwardRef(/* @__PURE__ */ Ol(function(e, t) {
	let { __scopeRadioGroup: n, ...r } = e, i = Jl(n);
	return /* @__PURE__ */ h(Rl, {
		...i,
		...r,
		ref: t
	});
}, "RadioGroupIndicator"));
//#endregion
//#region src/ui/RadioGroup.jsx
function au({ value: e, onChange: t, onValueChange: n, className: r = "", children: i, ...a }) {
	return /* @__PURE__ */ h(Zl, {
		value: e === "" || e == null ? void 0 : String(e),
		onValueChange: (e) => {
			typeof n == "function" && n(e), typeof t == "function" && t({ target: { value: e } });
		},
		className: r,
		...a,
		children: i
	});
}
function ou({ className: e = "", ...t }) {
	return /* @__PURE__ */ h(nu, {
		className: B("flex h-4 w-4 flex-none cursor-pointer items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600", e),
		...t,
		children: /* @__PURE__ */ h(iu, { className: "h-1.5 w-1.5 rounded-full bg-white" })
	});
}
//#endregion
//#region src/ui/CloseButton.jsx
function su({ onClick: e, label: t = "Fechar", size: n = "md", className: r = "" }) {
	return /* @__PURE__ */ h("button", {
		type: "button",
		"aria-label": t,
		title: t,
		onClick: e,
		className: B("flex cursor-pointer flex-none items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40", n === "sm" ? "h-7 w-7" : "h-8 w-8", r),
		children: /* @__PURE__ */ h("svg", {
			viewBox: "0 0 20 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.7",
			className: "h-4 w-4",
			"aria-hidden": "true",
			children: /* @__PURE__ */ h("path", {
				d: "M5.5 5.5l9 9M14.5 5.5l-9 9",
				strokeLinecap: "round"
			})
		})
	});
}
//#endregion
//#region src/ui/Dialog.jsx
function cu({ open: e, onClose: t, title: n, description: r, className: i = "", children: a }) {
	return e ? /* @__PURE__ */ h("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4",
		onMouseDown: (e) => {
			e.target === e.currentTarget && t();
		},
		children: /* @__PURE__ */ g("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": n,
			className: B("modal flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-950 shadow-2xl ring-1 ring-gray-950/10 dark:border dark:border-gray-600", i),
			children: [/* @__PURE__ */ g("div", {
				className: "flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-700 px-6 py-4",
				children: [/* @__PURE__ */ g("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ h("h2", {
						className: "truncate text-base font-semibold text-gray-900 dark:text-gray-50",
						children: n
					}), r && /* @__PURE__ */ h("p", {
						className: "mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400",
						children: r
					})]
				}), /* @__PURE__ */ h(su, { onClick: t })]
			}), /* @__PURE__ */ h("div", {
				className: "overflow-y-auto px-6 py-5",
				children: a
			})]
		})
	}) : null;
}
//#endregion
//#region src/ui/Table.jsx
function lu({ className: e = "", children: t }) {
	return /* @__PURE__ */ h("div", {
		className: B("overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm", e),
		children: t
	});
}
function uu({ className: e = "", children: t }) {
	return /* @__PURE__ */ h("table", {
		className: B("w-full min-w-[640px] border-collapse text-left text-sm", e),
		children: t
	});
}
function du({ className: e = "", children: t }) {
	return /* @__PURE__ */ h("thead", {
		className: B("bg-gray-50 dark:bg-gray-900", e),
		children: t
	});
}
function fu({ className: e = "", children: t }) {
	return /* @__PURE__ */ h("tbody", {
		className: B("divide-y divide-gray-100 dark:divide-gray-800", e),
		children: t
	});
}
function pu({ className: e = "", children: t, ...n }) {
	return /* @__PURE__ */ h("tr", {
		className: B("transition-colors hover:bg-gray-50/70 dark:hover:bg-gray-900/70", e),
		...n,
		children: t
	});
}
function mu({ className: e = "", children: t, ...n }) {
	return /* @__PURE__ */ h("th", {
		className: B("px-4 py-2.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-gray-500 dark:text-gray-400", e),
		...n,
		children: t
	});
}
function hu({ className: e = "", children: t, ...n }) {
	return /* @__PURE__ */ h("td", {
		className: B("px-4 py-3 align-top text-gray-700 dark:text-gray-300", e),
		...n,
		children: t
	});
}
//#endregion
//#region node_modules/@date-fns/tz/tzName/index.js
function gu(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/@date-fns/tz/tzOffset/index.js
var _u = {}, vu = {};
function yu(e, t) {
	try {
		let n = (_u[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in vu ? vu[n] : xu(n, n.split(":"));
	} catch {
		if (e in vu) return vu[e];
		let t = e?.match(bu);
		return t ? xu(e, t.slice(1)) : NaN;
	}
}
var bu = /([+-]\d\d):?(\d\d)?/;
function xu(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return vu[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/@date-fns/tz/date/mini.js
var Su = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(yu(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), Eu(this, e)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -yu(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), wu(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, Cu = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!Cu.test(e)) return;
	let t = e.replace(Cu, "$1UTC");
	Su.prototype[t] && (e.startsWith("get") ? Su.prototype[e] = function() {
		return this.internal[t]();
	} : (Su.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), Tu(this), +this;
	}, Su.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), wu(this), +this;
	}));
});
function wu(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-yu(e.timeZone, e) * 60));
}
function Tu(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Eu(e);
}
function Eu(e, t) {
	let n = Array.isArray(t) ? Du(t) : +e.internal, r = yu(e.timeZone, e), i = r > 0 ? Math.floor(r) : Math.ceil(r), a = /* @__PURE__ */ new Date(+e);
	a.setUTCHours(a.getUTCHours() - 1);
	let o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+a)).getTimezoneOffset(), c = o - s, l = o;
	if (c && o !== i && Date.prototype.getHours.apply(e) !== (Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours())) {
		let t = /* @__PURE__ */ new Date(+e), n = o - i;
		n && t.setUTCMinutes(t.getUTCMinutes() + n);
		let r = yu(e.timeZone, t);
		(r > 0 ? Math.floor(r) : Math.ceil(r)) === i && (l = s);
	}
	let u = l - i;
	u && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + u);
	let d = /* @__PURE__ */ new Date(+e);
	d.setUTCSeconds(0);
	let f = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, p = Math.round(-(yu(e.timeZone, e) * 60)) % 60;
	(p || f) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + f);
	let m = yu(e.timeZone, e), h = m > 0 ? Math.floor(m) : Math.ceil(m), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, _ = h !== i, v = g - u, y = h - i, b = n - h * 60 * 1e3, x = y > 0 && Ou(e) - n === y * 60 * 1e3 && Ou(e, b) !== n;
	if (_ && v && !x) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
		let t = yu(e.timeZone, e), n = h - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && v < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n);
	}
	wu(e);
	let S = (t ? n : n + p * 1e3) - +e.internal;
	S && Math.abs(S) < 18e5 && (Date.prototype.setTime.call(e, +e + S), wu(e));
}
function Du(e) {
	return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function Ou(e, t) {
	let n = new Date(t ?? +e);
	return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-yu(e.timeZone, n) * 60)), +n;
}
//#endregion
//#region node_modules/@date-fns/tz/date/index.js
var ku = class e extends Su {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), r = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + r;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, r] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, r] = this.tzComponents();
		return `${e} GMT${t}${n}${r} (${gu(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, Au = 365.2425, ju = 6048e5, Mu = 864e5, Nu = 86400;
Nu * 7, Nu * Au / 12 * 3;
var Pu = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function J(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && Pu in e ? e[Pu](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function Y(e, t) {
	return J(t || e, e);
}
//#endregion
//#region node_modules/date-fns/addDays.js
function Fu(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(t) ? J(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/date-fns/addMonths.js
function Iu(e, t, n) {
	let r = Y(e, n?.in);
	if (isNaN(t)) return J(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = J(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var Lu = {};
function Ru() {
	return Lu;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function zu(e, t) {
	let n = Ru(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function Bu(e, t) {
	return zu(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function Vu(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = J(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Bu(i), o = J(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Bu(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Hu(e) {
	let t = Y(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), +e - n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function Uu(e, ...t) {
	let n = J.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function Wu(e, t) {
	let n = Y(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function Gu(e, t, n) {
	let [r, i] = Uu(n?.in, e, t), a = Wu(r), o = Wu(i), s = +a - Hu(a), c = +o - Hu(o);
	return Math.round((s - c) / Mu);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function Ku(e, t) {
	let n = Vu(e, t), r = J(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Bu(r);
}
//#endregion
//#region node_modules/date-fns/addWeeks.js
function qu(e, t, n) {
	return Fu(e, t * 7, n);
}
//#endregion
//#region node_modules/date-fns/addYears.js
function Ju(e, t, n) {
	return Iu(e, t * 12, n);
}
//#endregion
//#region node_modules/date-fns/max.js
function Yu(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/min.js
function Xu(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = J.bind(null, e));
		let t = Y(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), J(r, n || NaN);
}
//#endregion
//#region node_modules/date-fns/isSameDay.js
function Zu(e, t, n) {
	let [r, i] = Uu(n?.in, e, t);
	return +Wu(r) == +Wu(i);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function Qu(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function $u(e) {
	return !(!Qu(e) && typeof e != "number" || isNaN(+Y(e)));
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarMonths.js
function ed(e, t, n) {
	let [r, i] = Uu(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/date-fns/endOfMonth.js
function td(e, t) {
	let n = Y(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeInterval.js
function nd(e, t) {
	let [n, r] = Uu(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/date-fns/eachMonthOfInterval.js
function rd(e, t) {
	let { start: n, end: r } = nd(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(J(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/startOfMonth.js
function id(e, t) {
	let n = Y(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/endOfYear.js
function ad(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function od(e, t) {
	let n = Y(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/eachYearOfInterval.js
function sd(e, t) {
	let { start: n, end: r } = nd(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(J(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/date-fns/endOfWeek.js
function cd(e, t) {
	let n = Ru(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Y(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/date-fns/endOfISOWeek.js
function ld(e, t) {
	return cd(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var ud = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, dd = (e, t, n) => {
	let r, i = ud[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function fd(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var pd = {
	date: fd({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: fd({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: fd({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, md = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, hd = (e, t, n, r) => md[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function gd(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var _d = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: gd({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: gd({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: gd({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: gd({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: gd({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchFn.js
function vd(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? bd(s, (e) => e.test(o)) : yd(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function yd(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function bd(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function xd(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/date-fns/locale/en-US.js
var Sd = {
	code: "en-US",
	formatDistance: dd,
	formatLong: pd,
	formatRelative: hd,
	localize: _d,
	match: {
		ordinalNumber: xd({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: vd({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: vd({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: vd({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: vd({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: vd({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/date-fns/getDayOfYear.js
function Cd(e, t) {
	let n = Y(e, t?.in);
	return Gu(n, od(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function wd(e, t) {
	let n = Y(e, t?.in), r = +Bu(n) - Ku(n);
	return Math.round(r / ju) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function Td(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = Ru(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = J(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = zu(o, t), c = J(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = zu(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function Ed(e, t) {
	let n = Ru(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Td(e, t), a = J(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), zu(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function Dd(e, t) {
	let n = Y(e, t?.in), r = +zu(n, t) - Ed(n, t);
	return Math.round(r / ju) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function X(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var Od = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return X(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : X(n + 1, 2);
	},
	d(e, t) {
		return X(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return X(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return X(e.getHours(), t.length);
	},
	m(e, t) {
		return X(e.getMinutes(), t.length);
	},
	s(e, t) {
		return X(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return X(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, kd = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, Ad = {
	G: function(e, t, n) {
		let r = +(e.getFullYear() > 0);
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return Od.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Td(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? X(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : X(a, t.length);
	},
	R: function(e, t) {
		return X(Vu(e), t.length);
	},
	u: function(e, t) {
		return X(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return X(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return X(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return Od.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return X(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = Dd(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : X(i, t.length);
	},
	I: function(e, t, n) {
		let r = wd(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : X(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Od.d(e, t);
	},
	D: function(e, t, n) {
		let r = Cd(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : X(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return X(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return X(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return X(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? kd.noon : r === 0 ? kd.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? kd.evening : r >= 12 ? kd.afternoon : r >= 4 ? kd.morning : kd.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return Od.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Od.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : X(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : X(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Od.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Od.s(e, t);
	},
	S: function(e, t) {
		return Od.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return Md(r);
			case "XXXX":
			case "XX": return Nd(r);
			default: return Nd(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return Md(r);
			case "xxxx":
			case "xx": return Nd(r);
			default: return Nd(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + jd(r, ":");
			default: return "GMT" + Nd(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + jd(r, ":");
			default: return "GMT" + Nd(r, ":");
		}
	},
	t: function(e, t, n) {
		return X(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return X(+e, t.length);
	}
};
function jd(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + X(a, 2);
}
function Md(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + X(Math.abs(e) / 60, 2) : Nd(e, t);
}
function Nd(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = X(Math.trunc(r / 60), 2), a = X(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var Pd = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, Fd = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Id = {
	p: Fd,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return Pd(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default: a = t.dateTime({ width: "full" });
		}
		return a.replace("{{date}}", Pd(r, t)).replace("{{time}}", Fd(i, t));
	}
}, Ld = /^D+$/, Rd = /^Y+$/, zd = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function Bd(e) {
	return Ld.test(e);
}
function Vd(e) {
	return Rd.test(e);
}
function Hd(e, t, n) {
	let r = Ud(e, t, n);
	if (console.warn(r), zd.includes(e)) throw RangeError(r);
}
function Ud(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var Wd = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gd = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Kd = /^'([^]*?)'?$/, qd = /''/g, Jd = /[a-zA-Z]/;
function Yd(e, t, n) {
	let r = Ru(), i = n?.locale ?? r.locale ?? Sd, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = Y(e, n?.in);
	if (!$u(s)) throw RangeError("Invalid time value");
	let c = t.match(Gd).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Id[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Wd).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Xd(e)
		};
		if (Ad[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Jd)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && Vd(a) || !n?.useAdditionalDayOfYearTokens && Bd(a)) && Hd(a, t, String(e));
		let o = Ad[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Xd(e) {
	let t = e.match(Kd);
	return t ? t[1].replace(qd, "'") : e;
}
//#endregion
//#region node_modules/date-fns/getDaysInMonth.js
function Zd(e, t) {
	let n = Y(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = J(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/date-fns/getMonth.js
function Qd(e, t) {
	return Y(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/date-fns/getYear.js
function $d(e, t) {
	return Y(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/date-fns/isAfter.js
function ef(e, t) {
	return +Y(e) > +Y(t);
}
//#endregion
//#region node_modules/date-fns/isBefore.js
function tf(e, t) {
	return +Y(e) < +Y(t);
}
//#endregion
//#region node_modules/date-fns/isSameMonth.js
function nf(e, t, n) {
	let [r, i] = Uu(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/date-fns/isSameYear.js
function rf(e, t, n) {
	let [r, i] = Uu(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/date-fns/setMonth.js
function af(e, t, n) {
	let r = Y(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = J(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Zd(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/date-fns/setYear.js
function of(e, t, n) {
	let r = Y(e, n?.in);
	return isNaN(+r) ? J(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var sf = 5, cf = 4;
function lf(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, 34);
	return t.getMonth(e) === t.getMonth(a) ? sf : cf;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function uf(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function df(e, t) {
	let n = uf(e, t), r = lf(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var ff = {
	lessThanXSeconds: {
		one: "menos de um segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "meio minuto",
	lessThanXMinutes: {
		one: "menos de um minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "cerca de 1 hora",
		other: "cerca de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 dia",
		other: "{{count}} dias"
	},
	aboutXWeeks: {
		one: "cerca de 1 semana",
		other: "cerca de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "cerca de 1 mês",
		other: "cerca de {{count}} meses"
	},
	xMonths: {
		one: "1 mês",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "cerca de 1 ano",
		other: "cerca de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "mais de 1 ano",
		other: "mais de {{count}} anos"
	},
	almostXYears: {
		one: "quase 1 ano",
		other: "quase {{count}} anos"
	}
}, pf = (e, t, n) => {
	let r, i = ff[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "em " + r : "há " + r : r;
}, mf = {
	date: fd({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: fd({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: fd({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, hf = {
	lastWeek: (e) => {
		let t = e.getDay();
		return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
}, gf = {
	code: "pt-BR",
	formatDistance: pf,
	formatLong: mf,
	formatRelative: (e, t, n, r) => {
		let i = hf[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return t?.unit === "week" ? n + "ª" : n + "º";
		},
		era: gd({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "depois de cristo"]
			},
			defaultWidth: "wide"
		}),
		quarter: gd({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"T1",
					"T2",
					"T3",
					"T4"
				],
				wide: [
					"1º trimestre",
					"2º trimestre",
					"3º trimestre",
					"4º trimestre"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: gd({
			values: {
				narrow: [
					"j",
					"f",
					"m",
					"a",
					"m",
					"j",
					"j",
					"a",
					"s",
					"o",
					"n",
					"d"
				],
				abbreviated: [
					"jan",
					"fev",
					"mar",
					"abr",
					"mai",
					"jun",
					"jul",
					"ago",
					"set",
					"out",
					"nov",
					"dez"
				],
				wide: [
					"janeiro",
					"fevereiro",
					"março",
					"abril",
					"maio",
					"junho",
					"julho",
					"agosto",
					"setembro",
					"outubro",
					"novembro",
					"dezembro"
				]
			},
			defaultWidth: "wide"
		}),
		day: gd({
			values: {
				narrow: [
					"D",
					"S",
					"T",
					"Q",
					"Q",
					"S",
					"S"
				],
				short: [
					"dom",
					"seg",
					"ter",
					"qua",
					"qui",
					"sex",
					"sab"
				],
				abbreviated: [
					"domingo",
					"segunda",
					"terça",
					"quarta",
					"quinta",
					"sexta",
					"sábado"
				],
				wide: [
					"domingo",
					"segunda-feira",
					"terça-feira",
					"quarta-feira",
					"quinta-feira",
					"sexta-feira",
					"sábado"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: gd({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "manhã",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "meia-noite",
					noon: "meio-dia",
					morning: "da manhã",
					afternoon: "da tarde",
					evening: "da tarde",
					night: "da noite"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: xd({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: vd({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
				wide: /^(antes de cristo|depois de cristo)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^antes de cristo/i, /^depois de cristo/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: vd({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: vd({
			matchPatterns: {
				narrow: /^[jfmajsond]/i,
				abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
				wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^fev/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dez/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: vd({
			matchPatterns: {
				narrow: /^(dom|[23456]ª?|s[aá]b)/i,
				short: /^(dom|[23456]ª?|s[aá]b)/i,
				abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
				wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				short: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				narrow: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				any: [
					/^d/i,
					/^seg/i,
					/^t/i,
					/^qua/i,
					/^qui/i,
					/^sex/i,
					/^s[aá]b/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: vd({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn|^meia[-\s]noite/i,
				noon: /^md|^meio[-\s]dia/i,
				morning: /manhã/i,
				afternoon: /tarde/i,
				evening: /tarde/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
}, _f = {
	...Sd,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Yd(e, t, {
				locale: Sd,
				...n
			});
			let a = i(e, "PPPP");
			return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Yd(e, n, {
				locale: Sd,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Yd(e, t, {
				locale: Sd,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Yd(e, n, {
				locale: Sd,
				...t
			}), r(e, "cccc");
		}
	}
}, vf = class e {
	constructor(e, t) {
		this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? ku.tz(this.options.timeZone) : new (this.options.Date ?? Date)(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new ku(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : Fu(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : Iu(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : qu(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : Ju(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Gu(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : ed(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : rd(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : sd(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : df(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : ld(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : td(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : cd(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : ad(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Yd(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : wd(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Qd(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : $d(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : Dd(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : ef(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : tf(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Qu(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Zu(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : nf(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : rf(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Yu(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Xu(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : af(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : of(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : uf(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Wu(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : Bu(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : id(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : zu(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : od(e), this.options = {
			locale: _f,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: r, numerals: i } = this.options, a = n?.code;
		if (a && e.yearFirstLocales.has(a)) try {
			return new Intl.DateTimeFormat(a, {
				month: "long",
				year: "numeric",
				timeZone: r,
				numberingSystem: i
			}).format(t);
		} catch {}
		let o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, o);
	}
};
vf.yearFirstLocales = /* @__PURE__ */ new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
var yf = new vf(), bf = class {
	constructor(e, t, n = yf) {
		this.date = e, this.displayMonth = t, this.outside = !(!t || n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, xf = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, Sf = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function Cf(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Chevron.js
function wf(e) {
	let { size: n = 24, orientation: r = "left", className: i, style: a } = e;
	return t.createElement("svg", {
		className: i,
		style: a,
		width: n,
		height: n,
		viewBox: "0 0 24 24"
	}, r === "up" && t.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), r === "down" && t.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), r === "left" && t.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), r === "right" && t.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Day.js
function Tf(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DayButton.js
function Ef(e) {
	let { day: n, modifiers: r, ...i } = e, a = t.useRef(null);
	return t.useEffect(() => {
		r.focused && a.current?.focus();
	}, [r.focused]), t.createElement("button", {
		ref: a,
		...i
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/UI.js
var Z;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(Z ||= {});
var Q;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Q ||= {});
var Df;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Df ||= {});
var Of;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Of ||= {});
//#endregion
//#region node_modules/react-day-picker/dist/esm/useDayPicker.js
var kf = i(void 0);
function Af() {
	let e = s(kf);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Dropdown.js
function jf(e) {
	let { options: n, className: r, ...i } = e, { classNames: a, components: o, styles: s } = Af(), c = [a[Z.Dropdown], r].join(" "), l = n?.find(({ value: e }) => e === i.value);
	return t.createElement("span", {
		"data-disabled": i.disabled,
		className: a[Z.DropdownRoot],
		style: s?.[Z.DropdownRoot]
	}, t.createElement(o.Select, {
		className: c,
		...i
	}, n?.map(({ value: e, label: n, disabled: r }) => t.createElement(o.Option, {
		key: e,
		value: e,
		disabled: r
	}, n))), t.createElement("span", {
		className: a[Z.CaptionLabel],
		style: s?.[Z.CaptionLabel],
		"aria-hidden": !0
	}, l?.label, t.createElement(o.Chevron, {
		orientation: "down",
		size: 18,
		className: a[Z.Chevron],
		style: s?.[Z.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function Mf(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Footer.js
function Nf(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Month.js
function Pf(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function Ff(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function If(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Months.js
function Lf(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function Rf(e) {
	let { components: n } = Af();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Nav.js
function zf(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: a, ...s } = e, { components: c, classNames: l, styles: u, labels: { labelPrevious: d, labelNext: f } } = Af(), p = o((e) => {
		a && r?.(e);
	}, [a, r]), m = o((e) => {
		i && n?.(e);
	}, [i, n]);
	return t.createElement("nav", { ...s }, t.createElement(c.PreviousMonthButton, {
		type: "button",
		className: l[Z.PreviousMonthButton],
		style: u?.[Z.PreviousMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": !i || void 0,
		"aria-label": d(i),
		onClick: m
	}, t.createElement(c.Chevron, {
		disabled: !i || void 0,
		className: l[Z.Chevron],
		style: u?.[Z.Chevron],
		orientation: "left"
	})), t.createElement(c.NextMonthButton, {
		type: "button",
		className: l[Z.NextMonthButton],
		style: u?.[Z.NextMonthButton],
		tabIndex: a ? void 0 : -1,
		"aria-disabled": !a || void 0,
		"aria-label": f(a),
		onClick: p
	}, t.createElement(c.Chevron, {
		disabled: !a || void 0,
		orientation: "right",
		className: l[Z.Chevron],
		style: u?.[Z.Chevron]
	})));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Bf(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Option.js
function Vf(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function Hf(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Root.js
function Uf(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Select.js
function Wf(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Week.js
function Gf(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekday.js
function Kf(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weekdays.js
function qf(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function Jf(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function Yf(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/Weeks.js
function Xf(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function Zf(e) {
	let { components: n } = Af();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/components/custom-components.js
var Qf = /* @__PURE__ */ b({
	CaptionLabel: () => Cf,
	Chevron: () => wf,
	Day: () => Tf,
	DayButton: () => Ef,
	Dropdown: () => jf,
	DropdownNav: () => Mf,
	Footer: () => Nf,
	Month: () => Pf,
	MonthCaption: () => Ff,
	MonthGrid: () => If,
	Months: () => Lf,
	MonthsDropdown: () => Rf,
	Nav: () => zf,
	NextMonthButton: () => Bf,
	Option: () => Vf,
	PreviousMonthButton: () => Hf,
	Root: () => Uf,
	Select: () => Wf,
	Week: () => Gf,
	WeekNumber: () => Jf,
	WeekNumberHeader: () => Yf,
	Weekday: () => Kf,
	Weekdays: () => qf,
	Weeks: () => Xf,
	YearsDropdown: () => Zf
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function $f(e, t, n = !1, r = yf) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= +!!n && o(a, t) >= +!!n) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/typeguards.js
function ep(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function tp(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function np(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function rp(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function ip(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ap(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function op(e, t, n = yf) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (ap(t, n)) return t.some((t) => i(e, t));
		if (tp(t)) return $f(t, e, !1, n);
		if (ip(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (ep(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return np(t) ? a(e, t.after) > 0 : rp(t) ? a(t.before, e) > 0 : typeof t == "function" && t(e);
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function sp(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Q.focused]: [],
		[Q.outside]: [],
		[Q.disabled]: [],
		[Q.hidden]: [],
		[Q.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !(!n || f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && op(e, a, i)), S = !!(o && op(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && op(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[Q.focused]: !1,
			[Q.disabled]: !1,
			[Q.hidden]: !1,
			[Q.outside]: !1,
			[Q.today]: !1
		}, n = {};
		for (let n in y) t[n] = y[n].some((t) => t === e);
		for (let t in b) n[t] = b[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function cp(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Q[r]] ? e.push(t[Q[r]]) : t[Df[r]] && e.push(t[Df[r]]), e), [t[Z.Day]]);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function lp(e) {
	return {
		...Qf,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function up(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function dp() {
	let e = {};
	for (let t in Z) e[Z[t]] = `rdp-${Z[t]}`;
	for (let t in Q) e[Q[t]] = `rdp-${Q[t]}`;
	for (let t in Df) e[Df[t]] = `rdp-${Df[t]}`;
	for (let t in Of) e[Of[t]] = `rdp-${Of[t]}`;
	return e;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function fp(e, t, n) {
	return (n ?? new vf(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function pp(e, t, n) {
	return (n ?? new vf(t)).format(e, "d");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function mp(e, t = yf) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function hp(e, t, n) {
	return (n ?? new vf(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function gp(e, t = yf) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function _p() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function vp(e, t = yf) {
	return t.format(e, "yyyy");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/formatters/index.js
var yp = /* @__PURE__ */ b({
	formatCaption: () => fp,
	formatDay: () => pp,
	formatMonthDropdown: () => mp,
	formatWeekNumber: () => gp,
	formatWeekNumberHeader: () => _p,
	formatWeekdayName: () => hp,
	formatYearDropdown: () => vp
});
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function bp(e) {
	return {
		...yp,
		...e
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function xp(e, t, n, r) {
	let i = (r ?? new vf(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function Sp(e, t, n) {
	return (n ?? new vf(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function Cp(e, t, n, r) {
	let i = (r ?? new vf(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function wp(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Tp() {
	return "";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Ep = "Go to the Next Month";
function Dp(e, t) {
	return Ep;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function Op(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function kp(e, t, n) {
	return (n ?? new vf(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Ap(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function jp(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function Mp(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/labels/index.js
var Np = /* @__PURE__ */ b({
	labelDayButton: () => xp,
	labelGrid: () => Sp,
	labelGridcell: () => Cp,
	labelMonthDropdown: () => wp,
	labelNav: () => Tp,
	labelNext: () => Dp,
	labelPrevious: () => Op,
	labelWeekNumber: () => Ap,
	labelWeekNumberHeader: () => jp,
	labelWeekday: () => kp,
	labelYearDropdown: () => Mp
}), Pp = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function Fp(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Np,
		...e ?? {},
		labelDayButton: Pp(xp, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: Pp(wp, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: Pp(Dp, e?.labelNext, n.labelNext),
		labelPrevious: Pp(Op, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: Pp(Ap, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: Pp(Mp, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: Pp(Sp, e?.labelGrid, n.labelGrid),
		labelGridcell: Pp(Cp, e?.labelGridcell, n.labelGridcell),
		labelNav: Pp(Tp, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: Pp(jp, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: Pp(kp, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Ip(e, t, n, r, i) {
	let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
	return c({
		start: o(e),
		end: s(e)
	}).map((e) => {
		let o = r.formatMonthDropdown(e, i);
		return {
			value: l(e),
			label: o,
			disabled: t && e < a(t) || n && e > a(n) || !1
		};
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function Lp(e, t = {}, n = {}) {
	let r = { ...t?.[Z.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function Rp(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function zp(e, t, n, r, i = !1) {
	if (!e || !t) return;
	let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r, l = s({
		start: a(e),
		end: o(t)
	});
	return i && l.reverse(), l.map((e) => {
		let t = n.formatYearDropdown(e, r);
		return {
			value: c(e),
			label: t,
			disabled: !1
		};
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/noonDateLib.js
function Bp(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new ku(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(ku.tz(e)),
		newDate: (t, n, r) => new ku(t, n, r, 12, 0, 0, e),
		startOfDay: (e) => a(e),
		startOfWeek: (e, t) => {
			let n = a(e), r = t?.weekStartsOn ?? i, o = (n.getDay() - r + 7) % 7;
			return n.setDate(n.getDate() - o), n;
		},
		startOfISOWeek: (e) => {
			let t = a(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = a(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = a(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = a(e), r = (((t?.weekStartsOn ?? i) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + r), n;
		},
		endOfISOWeek: (e) => {
			let t = a(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = a(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = a(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new ku(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new ku(o, e)), o.setMonth(o.getMonth() + 1, 1);
			return i;
		},
		addDays: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = a(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = a(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new ku(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new ku(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => Dd(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => wd(o(e)),
		differenceInCalendarDays: (e, t) => Gu(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => ed(o(e), o(t))
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useAnimation.js
var Vp = (e) => e instanceof HTMLElement ? e : null, Hp = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Up = (e) => Vp(e.querySelector("[data-animated-month]")), Wp = (e) => Vp(e.querySelector("[data-animated-caption]")), Gp = (e) => Vp(e.querySelector("[data-animated-weeks]")), Kp = (e) => Vp(e.querySelector("[data-animated-nav]")), qp = (e) => Vp(e.querySelector("[data-animated-weekdays]"));
function Jp(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = f(null), s = f(r), c = f(!1);
	u(() => {
		let l = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || l.length === 0 || r.length !== l.length) return;
		let u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[Of.caption_after_enter] : n[Of.caption_before_enter], p = d ? n[Of.weeks_after_enter] : n[Of.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Hp(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Up(e);
			t && e.contains(t) && e.removeChild(t);
			let n = Wp(e);
			n && n.classList.remove(f);
			let r = Gp(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, c.current || u || i) return;
		let g = m instanceof HTMLElement ? Hp(m) : [], _ = Hp(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g?.every((e) => e instanceof HTMLElement)) {
			c.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Kp(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = Wp(i);
				s && s.classList.add(f);
				let l = Gp(i);
				l && l.classList.add(p);
				let u = () => {
					c.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), l && l.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = qp(o);
				m && (m.style.opacity = "0");
				let h = Wp(o);
				h && (h.classList.add(d ? n[Of.caption_before_exit] : n[Of.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Gp(o);
				_ && _.classList.add(d ? n[Of.weeks_before_exit] : n[Of.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDates.js
function Yp(e, t, n, r) {
	let i = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: m, endOfWeek: h, isAfter: g, startOfBroadcastWeek: _, startOfISOWeek: v, startOfWeek: y } = r, b = c ? _(i, r) : o ? v(i) : y(i), x = c ? f(a) : o ? p(m(a)) : h(m(a)), S = t && (c ? f(t) : o ? p(t) : h(t)), C = u(S && g(x, S) ? S : x, b), w = d(a, i) + 1, T = [];
	for (let e = 0; e <= C; e++) {
		let t = l(b, e);
		T.push(t);
	}
	let E = (c ? 35 : 42) * w;
	if (s && T.length < E) {
		let e = E - T.length;
		for (let t = 0; t < e; t++) {
			let e = l(T[T.length - 1], 1);
			T.push(e);
		}
	}
	return T;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDays.js
function Xp(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function Zp(e, t, n, r) {
	let { numberOfMonths: i = 1 } = n, a = [];
	for (let n = 0; n < i; n++) {
		let i = r.addMonths(e, n);
		if (t && i > t) break;
		a.push(i);
	}
	return a;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function Qp(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function $p(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new xf(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new bf(t, m, r);
			return a ? a.days.push(o) : e.push(new Sf(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function em(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, today: u } = t, d = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : !n && d && (n = i(c(e.today ?? u(), -100))), r ? r = s(r) : !r && d && (r = l(e.today ?? u())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function tm(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function nm(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function rm(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function im(e, t) {
	let [n, r] = p(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useCalendar.js
function am(e, t) {
	let [n, r] = em(e, t), { startOfMonth: i, endOfMonth: a } = t, o = Qp(e, n, r, t), [s, l] = im(o, e.month ? o : void 0);
	c(() => {
		let i = Qp(e, n, r, t);
		l(i);
	}, [e.timeZone]);
	let { months: u, weeks: f, days: p, previousMonth: m, nextMonth: h } = d(() => {
		let i = Zp(s, r, { numberOfMonths: e.numberOfMonths }, t), o = $p(i, Yp(i, e.endMonth ? a(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: o,
			weeks: rm(o),
			days: Xp(o),
			previousMonth: nm(s, n, e, t),
			nextMonth: tm(s, r, e, t)
		};
	}, [
		t,
		s.getTime(),
		r?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: g, onMonthChange: _ } = e, v = (e) => f.some((t) => t.days.some((t) => t.isEqualTo(e))), y = (e) => {
		if (g) return;
		let t = i(e);
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), l(t), _?.(t);
	};
	return {
		months: u,
		weeks: f,
		days: p,
		navStart: n,
		navEnd: r,
		previousMonth: m,
		nextMonth: h,
		goToMonth: y,
		goToDay: (e) => {
			v(e) || y(e.date);
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var om;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(om ||= {});
function sm(e) {
	return !e[Q.disabled] && !e[Q.hidden] && !e[Q.outside];
}
function cm(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		sm(e) && (e[Q.focused] && a < om.FocusedModifier ? (i = o, a = om.FocusedModifier) : r?.isEqualTo(o) && a < om.LastFocused ? (i = o, a = om.LastFocused) : n(o.date) && a < om.Selected ? (i = o, a = om.Selected) : e[Q.today] && a < om.Today && (i = o, a = om.Today));
	}
	return i ||= e.find((e) => sm(t(e))), i;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function lm(e, t, n, r, i, a, o) {
	let { ISOWeek: s, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfWeek: h, max: g, min: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = o, x = {
		day: l,
		week: d,
		month: u,
		year: f,
		startOfWeek: (e) => c ? v(e, o) : s ? y(e) : b(e),
		endOfWeek: (e) => c ? p(e) : s ? m(e) : h(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && r ? x = g([r, x]) : t === "after" && i && (x = _([i, x])), x;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function um(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = lm(e, t, n.date, r, i, a, o), l = !!(a.disabled && op(c, a.disabled, o)), u = !!(a.hidden && op(c, a.hidden, o)), d = new bf(c, c, o);
	return !l && !u ? d : um(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useFocus.js
function dm(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = p(), c = cm(t.days, n, r || (() => !1), o), [l, u] = p(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = um(n, r, l, t.navStart, t.navEnd, e, i);
			a && (!e.disableNavigation || t.days.some((e) => e.isEqualTo(a))) && (t.goToDay(a), u(a));
		}
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useMulti.js
function fm(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = im(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = [...s ?? []];
			if (l(e)) {
				if (s?.length === u || r && s?.length === 1) return;
				a = s?.filter((t) => !c(t, e));
			} else a = s?.length === d ? [e] : [...a, e];
			return i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: l
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/addToRange.js
function pm(e, t, n = 0, r = 0, i = !1, a = yf) {
	let { from: o, to: s } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a, d;
	if (!o && !s) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (o && !s) d = c(o, e) ? n === 0 ? {
		from: o,
		to: e
	} : i ? {
		from: o,
		to: void 0
	} : void 0 : u(e, o) ? {
		from: e,
		to: o
	} : {
		from: o,
		to: e
	};
	else if (o && s) {
		if (c(o, e) && c(s, e)) d = i ? {
			from: o,
			to: s
		} : void 0;
		else if (c(o, e)) d = {
			from: o,
			to: n > 0 ? void 0 : e
		};
		else if (c(s, e)) d = {
			from: e,
			to: n > 0 ? void 0 : e
		};
		else if (u(e, o)) d = {
			from: e,
			to: s
		};
		else if (l(e, o)) d = {
			from: o,
			to: e
		};
		else if (l(e, s)) d = {
			from: o,
			to: e
		};
		else throw Error("Invalid range");
	}
	if (d?.from && d?.to) {
		let t = a.differenceInCalendarDays(d.to, d.from);
		(r > 0 && t > r || n > 1 && t < n) && (d = {
			from: e,
			to: void 0
		});
	}
	return d;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function mm(e, t, n = yf) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function hm(e, t, n = yf) {
	return $f(e, t.from, !1, n) || $f(e, t.to, !1, n) || $f(t, e.from, !1, n) || $f(t, e.to, !1, n);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function gm(e, t, n = yf) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? $f(e, t, !1, n) : ap(t, n) ? t.some((t) => $f(e, t, !1, n)) : tp(t) ? t.from && t.to ? hm(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : ip(t) ? mm(e, t.dayOfWeek, n) : ep(t) ? n.isAfter(t.before, t.after) ? hm(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : op(e.from, t, n) || op(e.to, t, n) : np(t) || rp(t) ? op(e.from, t, n) || op(e.to, t, n) : !1)) return !0;
	let i = r.filter((e) => typeof e == "function");
	if (i.length) {
		let t = e.from, r = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= r; e++) {
			if (i.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useRange.js
function _m(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = im(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : pm(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && gm({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && $f(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/selection/useSingle.js
function vm(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = im(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = e;
			return !r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: (e) => s ? c(s, e) : !1
	};
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/useSelection.js
function ym(e, t) {
	let n = vm(e, t), r = fm(e, t), i = _m(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function bm(e, t) {
	return e instanceof ku && e.timeZone === t ? e : new ku(e, t);
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function xm(e, t, n) {
	if (!n) return bm(e, t);
	let r = bm(e, t), i = new ku(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function Sm(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? xm(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? xm(e, t, n) : e) : tp(e) ? {
		...e,
		from: e.from ? bm(e.from, t) : e.from,
		to: e.to ? bm(e.to, t) : e.to
	} : ep(e) ? {
		before: xm(e.before, t, n),
		after: xm(e.after, t, n)
	} : np(e) ? { after: xm(e.after, t, n) } : rp(e) ? { before: xm(e.before, t, n) } : e;
}
function Cm(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => Sm(e, t, n)) : Sm(e, t, n));
}
//#endregion
//#region node_modules/react-day-picker/dist/esm/DayPicker.js
function wm(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today && (n.today = bm(n.today, r)), n.month && (n.month = bm(n.month, r)), n.defaultMonth && (n.defaultMonth = bm(n.defaultMonth, r)), n.startMonth && (n.startMonth = bm(n.startMonth, r)), n.endMonth && (n.endMonth = bm(n.endMonth, r)), n.mode === "single" && n.selected ? n.selected = bm(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => bm(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? bm(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? bm(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = Cm(n.disabled, r)), n.hidden !== void 0 && (n.hidden = Cm(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = Cm(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: a, labels: s, dateLib: c, locale: l, classNames: u } = d(() => {
		let e = {
			..._f,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Bp(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new vf({
			locale: e,
			weekStartsOn: t,
			firstWeekContainsDate: n.firstWeekContainsDate,
			useAdditionalWeekYearTokens: n.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: n.useAdditionalDayOfYearTokens,
			timeZone: n.timeZone,
			numerals: n.numerals
		}, i);
		return {
			dateLib: a,
			components: lp(n.components),
			formatters: bp(n.formatters),
			labels: Fp(n.labels, a.options),
			locale: e,
			classNames: {
				...dp(),
				...n.classNames
			}
		};
	}, [
		n.locale,
		n.broadcastCalendar,
		n.weekStartsOn,
		n.firstWeekContainsDate,
		n.useAdditionalWeekYearTokens,
		n.useAdditionalDayOfYearTokens,
		n.timeZone,
		n.numerals,
		n.dateLib,
		n.noonSafe,
		n.components,
		n.formatters,
		n.labels,
		n.classNames
	]);
	n.today || (n = {
		...n,
		today: c.today()
	});
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: ee, formatYearDropdown: M } = a, N = am(n, c), { days: te, months: P, navStart: F, navEnd: ne, previousMonth: I, nextMonth: L, goToMonth: R } = N, re = sp(te, n, F, ne, c), { isSelected: ie, select: ae, selected: oe } = ym(n, c) ?? {}, { blur: se, focused: ce, isFocusTarget: le, moveFocus: ue, setFocused: de } = dm(n, N, re, ie ?? (() => !1), c), { labelDayButton: fe, labelGridcell: pe, labelGrid: me, labelMonthDropdown: he, labelNav: ge, labelPrevious: _e, labelNext: ve, labelWeekday: ye, labelWeekNumber: be, labelWeekNumberHeader: xe, labelYearDropdown: Se } = s, Ce = d(() => Rp(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), we = m !== void 0 || v !== void 0, Te = o(() => {
		I && (R(I), w?.(I));
	}, [
		I,
		R,
		w
	]), Ee = o(() => {
		L && (R(L), C?.(L));
	}, [
		R,
		L,
		C
	]), De = o((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), de(e), !t.disabled && (ae?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ae,
		v,
		de
	]), Oe = o((e, t) => (n) => {
		de(e), y?.(e.date, t, n);
	}, [y, de]), ke = o((e, t) => (n) => {
		se(), _?.(e.date, t, n);
	}, [se, _]), Ae = o((e, t) => (r) => {
		let i = {
			ArrowLeft: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "after" : "before"],
			ArrowRight: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "before" : "after"],
			ArrowDown: [r.shiftKey ? "year" : "week", "after"],
			ArrowUp: [r.shiftKey ? "year" : "week", "before"],
			PageUp: [r.shiftKey ? "year" : "month", "before"],
			PageDown: [r.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (i[r.key]) {
			r.preventDefault(), r.stopPropagation();
			let [e, t] = i[r.key];
			ue(e, t);
		}
		b?.(e.date, t, r);
	}, [
		ue,
		b,
		n.dir
	]), je = o((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), Me = o((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), Ne = o((e, t) => (n) => {
		let r = Number(n.target.value), i = c.setMonth(c.startOfMonth(e), r);
		R(c.addMonths(i, -t));
	}, [c, R]), Pe = o((e, t) => (n) => {
		let r = Number(n.target.value), i = c.setYear(c.startOfMonth(e), r);
		R(c.addMonths(i, -t));
	}, [c, R]), { className: Fe, style: Ie } = d(() => ({
		className: [u[Z.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[Z.Root],
			...n.style
		}
	}), [
		u,
		n.className,
		n.style,
		E
	]), Le = up(n), Re = (e) => {
		let t = E?.[Z.Dropdown], n = E?.[e];
		if (t || n) return {
			...t,
			...n
		};
	}, ze = f(null);
	Jp(ze, !!n.animate, {
		classNames: u,
		months: P,
		focused: ce,
		dateLib: c
	});
	let Be = {
		dayPickerProps: n,
		selected: oe,
		select: ae,
		isSelected: ie,
		months: P,
		nextMonth: L,
		previousMonth: I,
		goToMonth: R,
		getModifiers: re,
		components: i,
		classNames: u,
		styles: E,
		labels: s,
		formatters: a
	};
	return t.createElement(kf.Provider, { value: Be }, t.createElement(i.Root, {
		rootRef: n.animate ? ze : void 0,
		className: Fe,
		style: Ie,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? l.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...Le
	}, t.createElement(i.Months, {
		className: u[Z.Months],
		style: E?.[Z.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: u[Z.Nav],
		style: E?.[Z.Nav],
		"aria-label": ge(),
		onPreviousClick: Te,
		onNextClick: Ee,
		previousMonth: I,
		nextMonth: L
	}), P.map((e, r) => {
		let o = n.reverseMonths ? P.length - 1 - r : r;
		return t.createElement(i.Month, {
			"data-animated-month": n.animate ? "true" : void 0,
			className: u[Z.Month],
			style: E?.[Z.Month],
			key: r,
			displayIndex: r,
			calendarMonth: e
		}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
			type: "button",
			className: u[Z.PreviousMonthButton],
			style: E?.[Z.PreviousMonthButton],
			tabIndex: I ? void 0 : -1,
			"aria-disabled": !I || void 0,
			"aria-label": _e(I),
			onClick: Te,
			"data-animated-button": n.animate ? "true" : void 0
		}, t.createElement(i.Chevron, {
			disabled: !I || void 0,
			className: u[Z.Chevron],
			style: E?.[Z.Chevron],
			orientation: n.dir === "rtl" ? "right" : "left"
		})), t.createElement(i.MonthCaption, {
			"data-animated-caption": n.animate ? "true" : void 0,
			className: u[Z.MonthCaption],
			style: E?.[Z.MonthCaption],
			calendarMonth: e,
			displayIndex: r
		}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
			className: u[Z.Dropdowns],
			style: E?.[Z.Dropdowns]
		}, (() => {
			let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
				key: "month",
				className: u[Z.MonthsDropdown],
				"aria-label": he(),
				disabled: !!n.disableNavigation,
				onChange: Ne(e.date, o),
				options: Ip(e.date, F, ne, a, c),
				style: Re(Z.MonthsDropdown),
				value: c.getMonth(e.date)
			}) : t.createElement("span", { key: "month" }, k(e.date, c)), s = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
				key: "year",
				className: u[Z.YearsDropdown],
				"aria-label": Se(c.options),
				disabled: !!n.disableNavigation,
				onChange: Pe(e.date, o),
				options: zp(F, ne, a, c, !!n.reverseYears),
				style: Re(Z.YearsDropdown),
				value: c.getYear(e.date)
			}) : t.createElement("span", { key: "year" }, M(e.date, c));
			return c.getMonthYearOrder() === "year-first" ? [s, r] : [r, s];
		})(), t.createElement("span", {
			role: "status",
			"aria-live": "polite",
			style: {
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal"
			}
		}, D(e.date, c.options, c))) : t.createElement(i.CaptionLabel, {
			className: u[Z.CaptionLabel],
			style: E?.[Z.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
			type: "button",
			className: u[Z.NextMonthButton],
			style: E?.[Z.NextMonthButton],
			tabIndex: L ? void 0 : -1,
			"aria-disabled": !L || void 0,
			"aria-label": ve(L),
			onClick: Ee,
			"data-animated-button": n.animate ? "true" : void 0
		}, t.createElement(i.Chevron, {
			disabled: !L || void 0,
			className: u[Z.Chevron],
			style: E?.[Z.Chevron],
			orientation: n.dir === "rtl" ? "left" : "right"
		})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
			"data-animated-nav": n.animate ? "true" : void 0,
			className: u[Z.Nav],
			style: E?.[Z.Nav],
			"aria-label": ge(),
			onPreviousClick: Te,
			onNextClick: Ee,
			previousMonth: I,
			nextMonth: L
		}), t.createElement(i.MonthGrid, {
			role: "grid",
			"aria-multiselectable": m === "multiple" || m === "range",
			"aria-label": me(e.date, c.options, c) || void 0,
			className: u[Z.MonthGrid],
			style: E?.[Z.MonthGrid]
		}, !n.hideWeekdays && t.createElement(i.Weekdays, {
			"data-animated-weekdays": n.animate ? "true" : void 0,
			className: u[Z.Weekdays],
			style: E?.[Z.Weekdays]
		}, T && t.createElement(i.WeekNumberHeader, {
			"aria-label": xe(c.options),
			className: u[Z.WeekNumberHeader],
			style: E?.[Z.WeekNumberHeader],
			scope: "col"
		}, j()), Ce.map((e) => t.createElement(i.Weekday, {
			"aria-label": ye(e, c.options, c),
			className: u[Z.Weekday],
			key: String(e),
			style: E?.[Z.Weekday],
			scope: "col"
		}, ee(e, c.options, c)))), t.createElement(i.Weeks, {
			"data-animated-weeks": n.animate ? "true" : void 0,
			className: u[Z.Weeks],
			style: E?.[Z.Weeks]
		}, e.weeks.map((e) => t.createElement(i.Week, {
			className: u[Z.Week],
			key: e.weekNumber,
			style: E?.[Z.Week],
			week: e
		}, T && t.createElement(i.WeekNumber, {
			week: e,
			style: E?.[Z.WeekNumber],
			"aria-label": be(e.weekNumber, { locale: l }),
			className: u[Z.WeekNumber],
			scope: "row",
			role: "rowheader"
		}, A(e.weekNumber, c)), e.days.map((e) => {
			let { date: r } = e, a = re(e);
			if (a[Q.focused] = !a.hidden && !!ce?.isEqualTo(e), a[Df.selected] = ie?.(r) || a.selected, tp(oe)) {
				let { from: e, to: t } = oe;
				a[Df.range_start] = !!(e && t && c.isSameDay(r, e)), a[Df.range_end] = !!(e && t && c.isSameDay(r, t)), a[Df.range_middle] = $f(oe, r, !0, c);
			}
			let o = Lp(a, E, n.modifiersStyles), s = cp(a, u, n.modifiersClassNames), l = !we && !a.hidden ? pe(r, a, c.options, c) : void 0;
			return t.createElement(i.Day, {
				key: `${e.isoDate}_${e.displayMonthId}`,
				day: e,
				modifiers: a,
				className: s.join(" "),
				style: o,
				role: "gridcell",
				"aria-selected": a.selected || void 0,
				"aria-label": l,
				"data-day": e.isoDate,
				"data-month": e.outside ? e.dateMonthId : void 0,
				"data-selected": a.selected || void 0,
				"data-disabled": a.disabled || void 0,
				"data-hidden": a.hidden || void 0,
				"data-outside": e.outside || void 0,
				"data-focused": a.focused || void 0,
				"data-today": a.today || void 0
			}, !a.hidden && we ? t.createElement(i.DayButton, {
				className: u[Z.DayButton],
				style: E?.[Z.DayButton],
				type: "button",
				day: e,
				modifiers: a,
				disabled: !a.focused && a.disabled || void 0,
				"aria-disabled": a.focused && a.disabled || void 0,
				tabIndex: le(e) ? 0 : -1,
				"aria-label": fe(r, a, c.options, c),
				onClick: De(e, a),
				onBlur: ke(e, a),
				onFocus: Oe(e, a),
				onKeyDown: Ae(e, a),
				onMouseEnter: je(e, a),
				onMouseLeave: Me(e, a)
			}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
		}))))));
	})), n.footer && t.createElement(i.Footer, {
		className: u[Z.Footer],
		style: E?.[Z.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
//#endregion
//#region node_modules/react-day-picker/src/style.css?inline
var Tm = ".rdp-root{--rdp-accent-color:blue;--rdp-accent-background-color:#f0f0ff;--rdp-day-height:44px;--rdp-day-width:44px;--rdp-day_button-border-radius:100%;--rdp-day_button-border:2px solid transparent;--rdp-day_button-height:42px;--rdp-day_button-width:42px;--rdp-selected-border:2px solid var(--rdp-accent-color);--rdp-disabled-opacity:.5;--rdp-outside-opacity:.75;--rdp-today-color:var(--rdp-accent-color);--rdp-dropdown-gap:.5rem;--rdp-months-gap:2rem;--rdp-nav_button-disabled-opacity:.5;--rdp-nav_button-height:2.25rem;--rdp-nav_button-width:2.25rem;--rdp-nav-height:2.75rem;--rdp-range_middle-background-color:var(--rdp-accent-background-color);--rdp-range_middle-color:inherit;--rdp-range_start-color:white;--rdp-range_start-background:linear-gradient(var(--rdp-gradient-direction), transparent 50%, var(--rdp-range_middle-background-color) 50%);--rdp-range_start-date-background-color:var(--rdp-accent-color);--rdp-range_end-background:linear-gradient(var(--rdp-gradient-direction), var(--rdp-range_middle-background-color) 50%, transparent 50%);--rdp-range_end-color:white;--rdp-range_end-date-background-color:var(--rdp-accent-color);--rdp-week_number-border-radius:100%;--rdp-week_number-border:2px solid transparent;--rdp-week_number-height:var(--rdp-day-height);--rdp-week_number-opacity:.75;--rdp-week_number-width:var(--rdp-day-width);--rdp-weeknumber-text-align:center;--rdp-weekday-opacity:.75;--rdp-weekday-padding:.5rem 0rem;--rdp-weekday-text-align:center;--rdp-gradient-direction:90deg;--rdp-animation_duration:.3s;--rdp-animation_timing:cubic-bezier(.4, 0, .2, 1)}.rdp-root[dir=rtl]{--rdp-gradient-direction:-90deg}.rdp-root[data-broadcast-calendar=true]{--rdp-outside-opacity:unset}.rdp-root{box-sizing:border-box;position:relative}.rdp-root *{box-sizing:border-box}.rdp-day{width:var(--rdp-day-width);height:var(--rdp-day-height);text-align:center}.rdp-day_button{cursor:pointer;font:inherit;color:inherit;width:var(--rdp-day_button-width);height:var(--rdp-day_button-height);border:var(--rdp-day_button-border);border-radius:var(--rdp-day_button-border-radius);background:0 0;justify-content:center;align-items:center;margin:0;padding:0;display:flex}.rdp-day_button:disabled{cursor:revert}.rdp-caption_label{z-index:1;white-space:nowrap;border:0;align-items:center;display:inline-flex;position:relative}.rdp-dropdown:focus-visible~.rdp-caption_label{outline:5px auto highlight;outline:5px auto -webkit-focus-ring-color}.rdp-button_next,.rdp-button_previous{cursor:pointer;font:inherit;color:inherit;appearance:none;width:var(--rdp-nav_button-width);height:var(--rdp-nav_button-height);background:0 0;border:none;justify-content:center;align-items:center;margin:0;padding:0;display:inline-flex;position:relative}.rdp-button_next:disabled,.rdp-button_next[aria-disabled=true],.rdp-button_previous:disabled,.rdp-button_previous[aria-disabled=true]{cursor:revert;opacity:var(--rdp-nav_button-disabled-opacity)}.rdp-chevron{fill:var(--rdp-accent-color);display:inline-block}.rdp-root[dir=rtl] .rdp-nav .rdp-chevron{transform-origin:50%;transform:rotate(180deg)}.rdp-dropdowns{align-items:center;gap:var(--rdp-dropdown-gap);display:inline-flex;position:relative}.rdp-dropdown{z-index:2;opacity:0;appearance:none;width:100%;cursor:inherit;line-height:inherit;border:none;margin:0;padding:0;position:absolute;inset-block:0;inset-inline-start:0}.rdp-dropdown_root{align-items:center;display:inline-flex;position:relative}.rdp-dropdown_root[data-disabled=true] .rdp-chevron{opacity:var(--rdp-disabled-opacity)}.rdp-month_caption{height:var(--rdp-nav-height);align-content:center;font-size:large;font-weight:700;display:flex}.rdp-root[data-nav-layout=around] .rdp-month,.rdp-root[data-nav-layout=after] .rdp-month{position:relative}.rdp-root[data-nav-layout=around] .rdp-month_caption{justify-content:center;margin-inline-start:var(--rdp-nav_button-width);margin-inline-end:var(--rdp-nav_button-width);position:relative}.rdp-root[data-nav-layout=around] .rdp-button_previous{inset-inline-start:0;height:var(--rdp-nav-height);display:inline-flex;position:absolute;top:0}.rdp-root[data-nav-layout=around] .rdp-button_next{inset-inline-end:0;height:var(--rdp-nav-height);justify-content:center;display:inline-flex;position:absolute;top:0}.rdp-months{gap:var(--rdp-months-gap);flex-wrap:wrap;max-width:fit-content;display:flex;position:relative}.rdp-month_grid{border-collapse:collapse}.rdp-nav{height:var(--rdp-nav-height);align-items:center;display:flex;position:absolute;inset-block-start:0;inset-inline-end:0}.rdp-weekday{opacity:var(--rdp-weekday-opacity);padding:var(--rdp-weekday-padding);text-align:var(--rdp-weekday-text-align);text-transform:var(--rdp-weekday-text-transform);font-size:smaller;font-weight:500}.rdp-week_number{opacity:var(--rdp-week_number-opacity);height:var(--rdp-week_number-height);width:var(--rdp-week_number-width);border:var(--rdp-week_number-border);border-radius:var(--rdp-week_number-border-radius);text-align:var(--rdp-weeknumber-text-align);font-size:small;font-weight:400}.rdp-today:not(.rdp-outside){color:var(--rdp-today-color)}.rdp-selected{font-size:large;font-weight:700}.rdp-selected .rdp-day_button{border:var(--rdp-selected-border)}.rdp-outside{opacity:var(--rdp-outside-opacity)}.rdp-disabled:not(.rdp-selected){opacity:var(--rdp-disabled-opacity)}.rdp-hidden{visibility:hidden;color:var(--rdp-range_start-color)}.rdp-range_start{background:var(--rdp-range_start-background)}.rdp-range_start .rdp-day_button{background-color:var(--rdp-range_start-date-background-color);color:var(--rdp-range_start-color)}.rdp-range_middle{background-color:var(--rdp-range_middle-background-color)}.rdp-range_middle .rdp-day_button{border:unset;border-radius:unset;color:var(--rdp-range_middle-color)}.rdp-range_end{background:var(--rdp-range_end-background);color:var(--rdp-range_end-color)}.rdp-range_end .rdp-day_button{color:var(--rdp-range_start-color);background-color:var(--rdp-range_end-date-background-color)}.rdp-range_start.rdp-range_end{background:revert}.rdp-focusable{cursor:pointer}@keyframes rdp-slide_in_left{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes rdp-slide_in_right{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes rdp-slide_out_left{0%{transform:translate(0)}to{transform:translate(-100%)}}@keyframes rdp-slide_out_right{0%{transform:translate(0)}to{transform:translate(100%)}}.rdp-weeks_before_enter{animation:rdp-slide_in_left var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-weeks_before_exit{animation:rdp-slide_out_left var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-weeks_after_enter{animation:rdp-slide_in_right var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-weeks_after_exit{animation:rdp-slide_out_right var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-root[dir=rtl] .rdp-weeks_after_enter{animation:rdp-slide_in_left var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-root[dir=rtl] .rdp-weeks_before_exit{animation:rdp-slide_out_right var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-root[dir=rtl] .rdp-weeks_before_enter{animation:rdp-slide_in_right var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-root[dir=rtl] .rdp-weeks_after_exit{animation:rdp-slide_out_left var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}@keyframes rdp-fade_in{0%{opacity:0}to{opacity:1}}@keyframes rdp-fade_out{0%{opacity:1}to{opacity:0}}.rdp-caption_after_enter{animation:rdp-fade_in var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-caption_after_exit{animation:rdp-fade_out var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-caption_before_enter{animation:rdp-fade_in var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}.rdp-caption_before_exit{animation:rdp-fade_out var(--rdp-animation_duration) var(--rdp-animation_timing) forwards}";
//#endregion
//#region src/ui/PickerPopover.jsx
if (typeof document < "u" && !document.getElementById("fe-day-picker-css")) {
	let e = document.createElement("style");
	e.id = "fe-day-picker-css", e.textContent = Tm, document.head.appendChild(e);
}
function Em(e) {
	let t = e.current.getBoundingClientRect();
	return {
		top: Math.max(8, Math.min(t.bottom + 6, window.innerHeight - 380)),
		left: Math.max(8, Math.min(t.left, window.innerWidth - 350))
	};
}
function Dm({ triggerRef: e, pos: t, onClose: n, children: r }) {
	let i = f(null);
	return c(() => {
		let t = (t) => {
			e.current && e.current.contains(t.target) || i.current && i.current.contains(t.target) || n();
		}, r = (e) => {
			e.key === "Escape" && n();
		};
		return document.addEventListener("mousedown", t), document.addEventListener("keydown", r), () => {
			document.removeEventListener("mousedown", t), document.removeEventListener("keydown", r);
		};
	}, [n, e]), v(/* @__PURE__ */ h("div", {
		ref: i,
		className: "fe-picker fixed z-50 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50 p-3 shadow-xl",
		style: {
			top: t.top,
			left: t.left
		},
		children: r
	}), document.body);
}
function Om({ selected: e, onSelect: t }) {
	return /* @__PURE__ */ h(wm, {
		mode: "single",
		locale: gf,
		weekStartsOn: 1,
		selected: e,
		onSelect: t
	});
}
//#endregion
//#region src/ui/DatePicker.jsx
var km = "flex cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50";
function Am({ value: e = "", onChange: t, id: n, placeholder: r = "dd/mm/aaaa", disabled: i, error: a = !1, className: o = "" }) {
	let [s, c] = p(!1), [l, u] = p({
		top: 0,
		left: 0
	}), d = f(null), _ = nt(e), v = () => {
		if (!i) {
			if (s) return c(!1);
			u(Em(d)), c(!0);
		}
	}, y = (e) => {
		typeof t == "function" && t({ target: { value: e } });
	};
	return /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ g("button", {
		type: "button",
		id: n,
		ref: d,
		disabled: i,
		className: B(qe, "date-picker", km, a && "border-red-400 focus:border-red-500 focus:ring-red-500/30", !_ && !e && "text-gray-400 dark:text-gray-500", o),
		onClick: v,
		children: [/* @__PURE__ */ h("span", {
			className: "truncate",
			children: _ ? it(_) : r
		}), /* @__PURE__ */ h($e, { className: "h-4 w-4 flex-none text-gray-400 dark:text-gray-500" })]
	}), s && /* @__PURE__ */ g(Dm, {
		triggerRef: d,
		pos: l,
		onClose: () => c(!1),
		children: [/* @__PURE__ */ h(Om, {
			selected: _,
			onSelect: (e) => {
				y(e ? rt(e) : ""), c(!1);
			}
		}), /* @__PURE__ */ g("div", {
			className: "mt-2 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-2",
			children: [/* @__PURE__ */ h("button", {
				type: "button",
				className: "cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50",
				onClick: () => {
					y(""), c(!1);
				},
				children: "Limpar"
			}), /* @__PURE__ */ h(su, {
				size: "sm",
				onClick: () => c(!1)
			})]
		})]
	})] });
}
//#endregion
//#region src/components/Canvas.jsx
function jm(e) {
	let t = Number(e.columns);
	return Number.isFinite(t) ? Math.min(12, Math.max(1, Math.round(t))) : 12;
}
function Mm({ fields: e, selectedId: t, onSelect: n, onInsert: i, onMove: a, onDuplicate: o, onDelete: s }) {
	let { t: c } = z(), l = f(null), [u, d] = p(null), [m, _] = p(null), v = (e, t) => {
		if (!e) return 0;
		let n = Array.from(e.querySelectorAll(":scope > [data-field-card]"));
		for (let e = 0; e < n.length; e++) {
			let r = n[e].getBoundingClientRect();
			if (t < r.top + r.height / 2) return e;
		}
		return n.length;
	}, y = (t, n) => ({
		onDragOver: (e) => {
			e.preventDefault(), e.stopPropagation();
			let r = String(e.dataTransfer.effectAllowed || "copy");
			e.dataTransfer.dropEffect = r === "move" ? "move" : "copy", d({
				parentId: t,
				index: v(n(e), e.clientY)
			});
		},
		onDrop: (r) => {
			r.preventDefault(), r.stopPropagation();
			let o = r.dataTransfer.getData("text/plain"), s = v(n(r), r.clientY);
			if (d(null), _(null), o.startsWith("new:")) {
				let n = o.slice(4);
				ve(e, t, n) && i(n, s, t);
			} else if (o.startsWith("move:")) {
				let n = o.slice(5), r = e.find((e) => e.id === n);
				if (!r || !ve(e, t, r.type)) return;
				let i = s;
				if ((r.parentId || null) === t) {
					let r = he(e, t).findIndex((e) => e.id === n);
					r > -1 && r < i && --i;
				}
				a(n, t, i);
			}
		}
	}), b = (e, t) => !!(u && u.parentId === e && u.index === t), x = (e, t) => !!(u && u.parentId === e && u.index >= t), S = () => {
		d(null), _(null);
	}, C = (r, i = !1) => {
		M(r.type);
		let a = r.id === t, l = re(r.condition, { summary: c("condition.summary") }), u = fe(r.type), d = me(e, r.id).length;
		return /* @__PURE__ */ g("div", {
			"data-field-card": !0,
			className: B("field-card group flex cursor-grab touch-none select-none items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-sm transition", a ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/70 ring-1 ring-blue-500" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700", m === r.id && "opacity-40", r.visible === !1 && "opacity-60", i && "ring-2 ring-blue-500 ring-offset-1"),
			style: { gridColumn: `span ${jm(r)}` },
			draggable: !0,
			onClick: (e) => {
				e.stopPropagation(), n(r.id);
			},
			onDragStart: (e) => {
				e.dataTransfer.setData("text/plain", "move:" + r.id), e.dataTransfer.effectAllowed = "move", _(r.id);
			},
			onDragEnd: S,
			children: [
				/* @__PURE__ */ h("span", {
					className: "drag-handle hidden flex-none select-none text-sm leading-none text-gray-300 dark:text-gray-600 sm:block",
					"aria-hidden": "true",
					children: ":::"
				}),
				/* @__PURE__ */ h("span", {
					className: "type-badge flex h-6 min-w-[30px] flex-none items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950 px-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300",
					children: c(`fields.badge.${r.type}`)
				}),
				/* @__PURE__ */ g("span", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ g("span", {
						className: "field-card-label truncate text-sm font-semibold text-gray-900 dark:text-gray-50",
						children: [r.label || c("fields.noLabel"), N(r.type) && r.required && /* @__PURE__ */ h("span", {
							className: "text-red-500 dark:text-red-400",
							children: "*"
						})]
					}), /* @__PURE__ */ g("span", {
						className: "field-card-sub truncate text-xs text-gray-500 dark:text-gray-400",
						children: [
							c(`fields.${r.type}`),
							N(r.type) && r.name ? ` · ${r.name}` : "",
							jm(r) < 12 ? ` · ${jm(r)}/12` : "",
							l ? ` · ${l}` : "",
							u && d > 0 ? ` · ${d} ${c("fields.internal")}` : "",
							r.visible === !1 ? ` · ${c("fields.hidden")}` : ""
						]
					})]
				}),
				/* @__PURE__ */ g("span", {
					className: B("field-card-actions flex flex-none gap-0.5 transition-opacity", a ? "opacity-100" : "opacity-0 group-hover:opacity-100"),
					children: [/* @__PURE__ */ h("button", {
						type: "button",
						className: "flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
						title: c("common.duplicate"),
						onClick: (e) => {
							e.stopPropagation(), o(r.id);
						},
						children: "⧉"
					}), /* @__PURE__ */ h("button", {
						type: "button",
						className: "flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400",
						title: c("common.delete"),
						onClick: (e) => {
							e.stopPropagation(), s(r.id);
						},
						children: "✕"
					})]
				})
			]
		});
	}, w = (t, n = 0) => {
		let i = he(e, t);
		return /* @__PURE__ */ h(r, { children: i.map((i, a) => /* @__PURE__ */ g(r, { children: [C(i, b(t, a)), fe(i.type) && n < 5 && /* @__PURE__ */ g("div", {
			className: B("nested-zone col-span-full grid min-h-12 h-max grid-cols-12 content-start gap-2 rounded-lg border-l-2 border-dashed py-2 pl-3", me(e, i.id).length > 0 ? "border-gray-300 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70" : "border-blue-300 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/40", x(i.id, me(e, i.id).length) && "ring-2 ring-blue-400 ring-inset"),
			...y(i.id, (e) => e.currentTarget),
			children: [me(e, i.id).length === 0 && /* @__PURE__ */ h("p", {
				className: "col-span-full pl-1 text-xs text-gray-400 dark:text-gray-500",
				children: i.type === "steps" ? c("canvas.dropSection", { label: i.label || c("fields.steps") }) : c("canvas.dropContainer", { label: i.label || c("fields.heading") })
			}), w(i.id, n + 1)]
		})] }, i.id)) });
	};
	return /* @__PURE__ */ h("main", {
		className: "canvas flex min-h-0 flex-col lg:overflow-hidden",
		onClick: () => n(null),
		onDragLeave: (e) => {
			e.currentTarget.contains(e.relatedTarget) || d(null);
		},
		...y(null, () => l.current),
		children: /* @__PURE__ */ g("div", {
			className: B("canvas-drop grid min-h-[240px] flex-1 grid-cols-12 content-start gap-2 overflow-y-auto rounded-lg border p-3.5 transition-colors", u && u.parentId === null ? "is-over border-blue-400 bg-blue-50/50 dark:bg-blue-950/50" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"),
			ref: l,
			...y(null, (e) => e.currentTarget),
			children: [e.length === 0 && !u && /* @__PURE__ */ g("div", {
				className: "canvas-empty col-span-full flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 px-6 py-14 text-center",
				children: [/* @__PURE__ */ h("strong", {
					className: "text-sm font-semibold text-gray-900 dark:text-gray-50",
					children: c("canvas.empty")
				}), /* @__PURE__ */ h("span", {
					className: "text-sm text-gray-500 dark:text-gray-400",
					children: c("canvas.emptyHint")
				})]
			}), w(null)]
		})
	});
}
//#endregion
//#region src/components/properties/Row.jsx
function $({ label: e, hint: t, error: n, htmlFor: r, children: i }) {
	return /* @__PURE__ */ g("div", {
		className: "props-row flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ h("label", {
				className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
				htmlFor: r,
				children: e
			}),
			i,
			n && /* @__PURE__ */ h("p", {
				className: "text-xs font-medium text-red-600 dark:text-red-400",
				children: n
			}),
			!n && t && /* @__PURE__ */ h("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: t
			})
		]
	});
}
var Nm = "props-section flex flex-col gap-2.5 border-t border-gray-100 dark:border-gray-800 pt-4", Pm = "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";
function Fm({ title: e, badge: t, children: n }) {
	return /* @__PURE__ */ g("div", {
		className: "flex items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: e
			}),
			t,
			n
		]
	});
}
//#endregion
//#region src/format.js
function Im(e, t = "pt-PT") {
	if (!e) return "";
	let n = /* @__PURE__ */ new Date(String(e).replace(" ", "T") + (String(e).includes("Z") ? "" : "Z"));
	return Number.isNaN(n.getTime()) ? String(e) : n.toLocaleString(t, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Lm(e, t = "pt-PT") {
	if (!e) return "";
	let n = /* @__PURE__ */ new Date(String(e).replace(" ", "T") + (String(e).includes("Z") ? "" : "Z"));
	return Number.isNaN(n.getTime()) ? String(e) : n.toLocaleDateString(t, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
}
function Rm(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/.exec(String(e || ""));
	if (!t) return String(e || "");
	let n = `${t[3]}/${t[2]}/${t[1]}`;
	return t[4] ? `${n} ${t[4]}:${t[5]}` : n;
}
function zm(e, t) {
	return e && t ? `${Rm(e)} – ${Rm(t)}` : e ? `a partir de ${Rm(e)}` : t ? `até ${Rm(t)}` : "";
}
//#endregion
//#region src/components/properties/FormProperties.jsx
function Bm({ onResizeStart: e, onResizeKey: t }) {
	return e ? /* @__PURE__ */ h("div", {
		role: "separator",
		"aria-orientation": "vertical",
		"aria-label": "Resize properties panel",
		tabIndex: 0,
		className: "absolute inset-y-0 left-0 hidden w-2 cursor-col-resize rounded-full transition hover:bg-blue-300/70 focus-visible:bg-blue-300/70 focus-visible:outline-none lg:block",
		onPointerDown: e,
		onKeyDown: (e) => {
			e.key === "ArrowLeft" ? (e.preventDefault(), t(20)) : e.key === "ArrowRight" && (e.preventDefault(), t(-20));
		}
	}) : null;
}
function Vm({ form: e, fields: t, errors: n, onChangeForm: r, onResizeStart: i, onResizeKey: a }) {
	let { t: o } = z(), s = Te(e);
	return /* @__PURE__ */ g("aside", {
		className: "props relative flex min-h-0 flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3.5 lg:overflow-y-auto",
		children: [
			/* @__PURE__ */ h(Bm, {
				onResizeStart: i,
				onResizeKey: a
			}),
			/* @__PURE__ */ h("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400",
				children: o("props.form")
			}),
			/* @__PURE__ */ g("section", {
				className: "props-section flex flex-col gap-2.5",
				children: [/* @__PURE__ */ h($, {
					label: o("props.name"),
					htmlFor: "form-name",
					error: n.general.name,
					hint: e.slug ? o("props.slug", { slug: e.slug }) : void 0,
					children: /* @__PURE__ */ h(V, {
						id: "form-name",
						value: e.name || "",
						error: !!n.general.name,
						onChange: (e) => r({ name: e.target.value })
					})
				}), /* @__PURE__ */ h($, {
					label: o("props.description"),
					htmlFor: "form-desc",
					children: /* @__PURE__ */ h(ct, {
						id: "form-desc",
						rows: 3,
						placeholder: o("props.descriptionHint"),
						value: e.description || "",
						onChange: (e) => r({ description: e.target.value })
					})
				})]
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [
					/* @__PURE__ */ h(Fm, {
						title: o("props.visibility"),
						badge: /* @__PURE__ */ h(ot, {
							color: e.visible === !1 ? "red" : "emerald",
							children: e.visible === !1 ? o("props.hidden") : o("props.visible")
						})
					}),
					/* @__PURE__ */ g("label", {
						className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
						children: [/* @__PURE__ */ h(Yc, {
							id: "form-visible",
							className: "mt-0.5",
							checked: e.visible !== !1,
							onChange: (e) => r({ visible: e.target.checked })
						}), /* @__PURE__ */ h("span", { children: o("props.formVisible") })]
					}),
					/* @__PURE__ */ h("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: o("props.formVisibleHint")
					})
				]
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [
					/* @__PURE__ */ h(Fm, {
						title: o("props.availability"),
						badge: s.hasRange ? /* @__PURE__ */ h(ot, {
							color: s.available ? "emerald" : "amber",
							children: s.available ? o("props.available") : o("props.unavailable")
						}) : null
					}),
					/* @__PURE__ */ g("div", {
						className: "flex flex-col gap-2.5",
						children: [/* @__PURE__ */ h($, {
							label: o("props.availableFrom"),
							htmlFor: "form-from",
							children: /* @__PURE__ */ h("input", {
								id: "form-from",
								type: "datetime-local",
								className: "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
								value: (e.available_from || "").replace(" ", "T").slice(0, 16),
								onChange: (e) => r({ available_from: e.target.value ? e.target.value.replace("T", " ") : "" })
							})
						}), /* @__PURE__ */ h($, {
							label: o("props.availableTo"),
							htmlFor: "form-to",
							children: /* @__PURE__ */ h("input", {
								id: "form-to",
								type: "datetime-local",
								className: "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
								value: (e.available_to || "").replace(" ", "T").slice(0, 16),
								onChange: (e) => r({ available_to: e.target.value ? e.target.value.replace("T", " ") : "" })
							})
						})]
					}),
					n.general.available_to && /* @__PURE__ */ h("p", {
						className: "text-xs font-medium text-red-600 dark:text-red-400",
						children: n.general.available_to
					}),
					/* @__PURE__ */ g("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: [o("props.availabilityHint"), s.hasRange ? o("props.availabilityCurrent", { range: zm(e.available_from, e.available_to) }) : ""]
					})
				]
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [
					/* @__PURE__ */ h(Fm, {
						title: o("props.consent"),
						badge: /* @__PURE__ */ h(ot, {
							color: e.consent_required ? "emerald" : "gray",
							children: e.consent_required ? o("props.consentRequiredBadge") : o("props.consentOff")
						})
					}),
					/* @__PURE__ */ g("label", {
						className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
						children: [/* @__PURE__ */ h(Yc, {
							id: "form-consent",
							className: "mt-0.5",
							checked: e.consent_required === !0,
							onChange: (e) => r({ consent_required: e.target.checked })
						}), /* @__PURE__ */ h("span", { children: o("props.consentRequiredLabel") })]
					}),
					/* @__PURE__ */ h($, {
						label: o("props.consentText"),
						htmlFor: "form-consent-text",
						error: n.general.consent_text,
						hint: o("props.consentTextHint"),
						children: /* @__PURE__ */ h(ct, {
							id: "form-consent-text",
							rows: 4,
							placeholder: o("props.consentTextPlaceholder"),
							value: e.consent_text || "",
							onChange: (e) => r({ consent_text: e.target.value })
						})
					}),
					/* @__PURE__ */ h($, {
						label: o("props.privacyUrl"),
						htmlFor: "form-privacy-url",
						error: n.general.privacy_url,
						hint: o("props.privacyUrlHint"),
						children: /* @__PURE__ */ h(V, {
							id: "form-privacy-url",
							placeholder: "https://…",
							value: e.privacy_url || "",
							onChange: (e) => r({ privacy_url: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [/* @__PURE__ */ h(Fm, {
					title: o("props.remote"),
					badge: /* @__PURE__ */ h(ot, {
						color: e.remote_url ? "blue" : "gray",
						children: e.remote_url ? o("props.remoteActive") : o("props.remoteOff")
					})
				}), /* @__PURE__ */ h($, {
					label: o("props.remoteEndpoint"),
					htmlFor: "form-remote-url",
					error: n.general.remote_url,
					hint: o("props.remoteEndpointHint"),
					children: /* @__PURE__ */ h(V, {
						id: "form-remote-url",
						placeholder: "https://…",
						value: e.remote_url || "",
						onChange: (e) => r({ remote_url: e.target.value })
					})
				})]
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [
					/* @__PURE__ */ h("h3", {
						className: Pm,
						children: o("props.notifications")
					}),
					/* @__PURE__ */ h($, {
						label: o("props.notifyEmail"),
						htmlFor: "form-notify-email",
						error: n.general.notify_email,
						hint: o("props.notifyEmailHint"),
						children: /* @__PURE__ */ h(V, {
							id: "form-notify-email",
							type: "email",
							value: e.notify_email || "",
							onChange: (e) => r({ notify_email: e.target.value })
						})
					}),
					/* @__PURE__ */ h($, {
						label: o("props.notifyField"),
						htmlFor: "form-notify-field",
						error: n.general.notify_field,
						hint: o("props.notifyFieldHint"),
						children: /* @__PURE__ */ g(Ac, {
							id: "form-notify-field",
							value: e.notify_field || "",
							onChange: (e) => r({ notify_field: e.target.value }),
							children: [/* @__PURE__ */ h("option", {
								value: "",
								children: o("props.notifyNone")
							}), t.filter((e) => e.type === "email").map((e) => /* @__PURE__ */ g("option", {
								value: e.name || "",
								children: [
									e.label,
									" (",
									e.name,
									")"
								]
							}, e.id))]
						})
					}),
					!t.some((e) => e.type === "email") && /* @__PURE__ */ h("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: o("props.notifyNoEmail")
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ConditionEditor.jsx
function Hm({ rule: e, target: t, onChange: n }) {
	let { t: r } = z(), i = C.find((t) => t.op === e.op);
	if (!i || !i.value || !t) return null;
	if (t.type === "select" || t.type === "radio" || t.type === "checkboxgroup") return /* @__PURE__ */ g(Ac, {
		value: e.value ?? "",
		onChange: (e) => n({ value: e.target.value }),
		className: "min-w-0",
		children: [/* @__PURE__ */ g("option", {
			value: "",
			children: [
				"— ",
				r("condition.value"),
				" —"
			]
		}), (t.options || []).map((e, t) => /* @__PURE__ */ h("option", {
			value: e.value,
			children: e.label
		}, `${e.value}-${t}`))]
	});
	let a = t.type === "number" ? "number" : t.type === "date" ? "date" : "text";
	return /* @__PURE__ */ h(V, {
		type: a,
		placeholder: r("condition.value"),
		value: e.value ?? "",
		onChange: (e) => n({ value: e.target.value }),
		className: "min-w-0"
	});
}
function Um({ condition: e, onChange: t, fields: n, fieldId: r, title: i, toggleLabel: a }) {
	let { t: o } = z(), s = i || o("condition.title"), c = a || o("condition.toggle"), l = e || {
		enabled: !1,
		logic: "any",
		rules: []
	}, u = n.filter((e) => e.id !== r && N(e.type)), d = l.rules || [], f = (e) => t({
		...l,
		...e
	}), p = (e, t) => f({ rules: d.map((n, r) => r === e ? {
		...n,
		...t
	} : n) }), _ = () => {
		u.length !== 0 && f({ rules: [...d, {
			field: u[0].id,
			op: "eq",
			value: ""
		}] });
	}, v = (e) => f({ rules: d.filter((t, n) => n !== e) });
	return /* @__PURE__ */ g("section", {
		className: "props-section flex flex-col gap-2.5 border-t border-gray-100 dark:border-gray-800 pt-4",
		children: [
			/* @__PURE__ */ h("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400",
				children: s
			}),
			/* @__PURE__ */ g("label", {
				className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
				children: [/* @__PURE__ */ h(Yc, {
					className: "mt-0.5",
					checked: l.enabled === !0,
					onChange: (e) => f({ enabled: e.target.checked })
				}), /* @__PURE__ */ h("span", { children: c })]
			}),
			l.enabled && /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ g("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ h("label", {
						className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
						htmlFor: "cond-logic",
						children: o("condition.showIf")
					}),
					/* @__PURE__ */ g(Ac, {
						id: "cond-logic",
						value: l.logic === "all" ? "all" : "any",
						onChange: (e) => f({ logic: e.target.value }),
						className: "w-auto",
						children: [/* @__PURE__ */ h("option", {
							value: "any",
							children: o("condition.any")
						}), /* @__PURE__ */ h("option", {
							value: "all",
							children: o("condition.all")
						})]
					}),
					/* @__PURE__ */ h("span", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: o("condition.tail")
					})
				]
			}), u.length === 0 ? /* @__PURE__ */ h("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: o("condition.emptyHint")
			}) : /* @__PURE__ */ g("div", {
				className: "flex flex-col gap-2",
				children: [d.map((e, t) => {
					let n = u.find((t) => t.id === e.field) || null, r = C.find((t) => t.op === e.op), i = !!(r && r.value && n);
					return /* @__PURE__ */ g("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/70 p-2",
						children: [
							/* @__PURE__ */ h(Ac, {
								value: e.field,
								onChange: (e) => p(t, { field: e.target.value }),
								className: "col-span-full min-w-0",
								children: u.map((e) => /* @__PURE__ */ h("option", {
									value: e.id,
									children: e.label
								}, e.id))
							}),
							/* @__PURE__ */ g("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: [/* @__PURE__ */ h(Ac, {
									value: e.op,
									onChange: (e) => p(t, { op: e.target.value }),
									className: B("min-w-0", !i && "col-span-2"),
									children: C.map((e) => /* @__PURE__ */ h("option", {
										value: e.op,
										children: o(`operators.${e.op}`)
									}, e.op))
								}), /* @__PURE__ */ h(Hm, {
									rule: e,
									target: n,
									onChange: (e) => p(t, e)
								})]
							}),
							/* @__PURE__ */ h("button", {
								type: "button",
								className: "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400",
								title: o("condition.remove"),
								onClick: () => v(t),
								children: "✕"
							})
						]
					}, t);
				}), /* @__PURE__ */ h("button", {
					type: "button",
					className: "w-fit cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-900",
					onClick: _,
					children: o("condition.add")
				})]
			})] })
		]
	});
}
//#endregion
//#region src/components/properties/ResizeHandle.jsx
function Wm({ onResizeStart: e, onResizeKey: t }) {
	return e ? /* @__PURE__ */ h("div", {
		role: "separator",
		"aria-orientation": "vertical",
		"aria-label": "Redimensionar painel de propriedades",
		tabIndex: 0,
		className: "absolute inset-y-0 left-0 hidden w-2 cursor-col-resize rounded-full transition hover:bg-blue-300/70 focus-visible:bg-blue-300/70 focus-visible:outline-none lg:block",
		onPointerDown: e,
		onKeyDown: (e) => {
			e.key === "ArrowLeft" ? (e.preventDefault(), t(20)) : e.key === "ArrowRight" && (e.preventDefault(), t(-20));
		}
	}) : null;
}
//#endregion
//#region src/components/properties/ContentSection.jsx
var Gm = [
	"text",
	"textarea",
	"number",
	"email",
	"password"
], Km = [
	"select",
	"radio",
	"checkboxgroup"
];
function qm({ field: e, patch: t }) {
	let { t: n } = z();
	if (e.type === "textarea") return /* @__PURE__ */ h(ct, {
		rows: 2,
		value: e.defaultValue || "",
		onChange: (e) => t({ defaultValue: e.target.value })
	});
	if (e.type === "checkbox") return /* @__PURE__ */ g("label", {
		className: "flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300",
		children: [/* @__PURE__ */ h(Yc, {
			checked: e.defaultValue === "1" || e.defaultValue === !0 || e.defaultValue === "true",
			onChange: (e) => t({ defaultValue: e.target.checked ? "1" : "" })
		}), /* @__PURE__ */ h("span", { children: n("field.startChecked") })]
	});
	if (Km.includes(e.type)) return /* @__PURE__ */ g(Ac, {
		value: e.defaultValue || "",
		onChange: (e) => t({ defaultValue: e.target.value }),
		children: [/* @__PURE__ */ h("option", {
			value: "",
			children: n("field.noValue")
		}), (e.options || []).map((e, t) => /* @__PURE__ */ h("option", {
			value: e.value,
			children: e.label
		}, `${e.value}-${t}`))]
	});
	if (e.type === "date") return /* @__PURE__ */ h(Am, {
		value: e.defaultValue ?? "",
		onChange: (e) => t({ defaultValue: e.target.value })
	});
	if (e.type === "file") return null;
	let r = e.type === "number" ? "number" : e.type === "password" ? "password" : "text";
	return /* @__PURE__ */ h(V, {
		type: r,
		value: e.defaultValue ?? "",
		onChange: (e) => t({ defaultValue: e.target.value })
	});
}
function Jm({ field: e, patch: t }) {
	let { t: n } = z(), r = Gm.includes(e.type);
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: n("field.content")
			}),
			r && /* @__PURE__ */ h($, {
				label: n("field.placeholder"),
				htmlFor: "prop-placeholder",
				children: /* @__PURE__ */ h(V, {
					id: "prop-placeholder",
					value: e.placeholder || "",
					onChange: (e) => t({ placeholder: e.target.value })
				})
			}),
			/* @__PURE__ */ h($, {
				label: n("field.defaultValue"),
				children: /* @__PURE__ */ h(qm, {
					field: e,
					patch: t
				})
			})
		]
	});
}
//#endregion
//#region src/components/properties/FileSection.jsx
function Ym({ field: e, patch: t }) {
	let { t: n } = z();
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: n("field.fileSection")
			}),
			/* @__PURE__ */ h($, {
				label: n("field.maxSize"),
				htmlFor: "prop-maxsize",
				hint: n("field.maxSizeHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-maxsize",
					type: "number",
					min: .1,
					step: .1,
					value: e.maxSizeMb ?? 5,
					onChange: (e) => t({ maxSizeMb: e.target.value === "" ? "" : Number(e.target.value) }),
					onBlur: (e) => {
						let n = Number(e.target.value);
						t({ maxSizeMb: Number.isFinite(n) && n > 0 ? Math.round(Math.max(.1, n) * 10) / 10 : 5 });
					}
				})
			}),
			/* @__PURE__ */ g("label", {
				className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
				children: [/* @__PURE__ */ h(Yc, {
					className: "mt-0.5",
					checked: e.multiple !== !1,
					onChange: (e) => t({ multiple: e.target.checked })
				}), /* @__PURE__ */ h("span", { children: n("field.multiple") })]
			}),
			/* @__PURE__ */ h($, {
				label: n("field.accept"),
				htmlFor: "prop-accept",
				hint: n("field.acceptHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-accept",
					value: e.accept || "",
					placeholder: ".pdf, .jpg, .png",
					onChange: (e) => t({ accept: e.target.value })
				})
			})
		]
	});
}
//#endregion
//#region src/apiSource.js
function Xm(e, t) {
	if (!t) return e;
	let n = String(t).split(".").filter(Boolean), r = e;
	for (let e of n) {
		if (r == null) return;
		r = r[e];
	}
	return r;
}
var Zm = [
	"rows",
	"items",
	"data",
	"results",
	"list",
	"records",
	"values",
	"options"
];
function Qm(e, t = "", n = 0) {
	if (Array.isArray(e)) return t;
	if (n >= 5 || typeof e != "object" || !e) return null;
	let r = Object.entries(e);
	for (let e of Zm) {
		let n = r.find(([t]) => t === e);
		if (n && Array.isArray(n[1])) return t ? `${t}.${n[0]}` : n[0];
	}
	for (let [e, n] of r) if (Array.isArray(n)) return t ? `${t}.${e}` : e;
	for (let [e, i] of r) if (i && typeof i == "object" && !Array.isArray(i)) {
		let r = Qm(i, t ? `${t}.${e}` : e, n + 1);
		if (r !== null) return r;
	}
	return null;
}
function $m(e, t) {
	let n = String(t || "").trim();
	if (n) {
		let t = Xm(e, n);
		return {
			path: n,
			items: Array.isArray(t) ? t : []
		};
	}
	if (Array.isArray(e)) return {
		path: "",
		items: e
	};
	let r = Qm(e);
	if (r === null) return {
		path: "",
		items: []
	};
	let i = r === "" ? e : Xm(e, r);
	return {
		path: r,
		items: Array.isArray(i) ? i : []
	};
}
function eh(e) {
	let t = e.find((e) => e && typeof e == "object" && !Array.isArray(e));
	return t ? [...new Set(Object.keys(t))] : [];
}
function th(e, t) {
	for (let n of t) if (e.includes(n)) return n;
	return e.length > 0 ? e[0] : "";
}
function nh(e) {
	return String(e || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "opcao";
}
function rh(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = [];
	return e.slice(0, 500).forEach((e, a) => {
		let o, s;
		if (typeof e == "object" && e && !Array.isArray(e)) {
			let r = t ? Xm(e, t) : void 0, i = n ? Xm(e, n) : void 0;
			o = r == null ? "" : String(r), s = i == null ? "" : String(i);
		} else o = String(e ?? ""), s = String(e ?? "");
		o === "" && (o = s === "" ? `Opção ${a + 1}` : s), s === "" && (s = nh(o));
		let c = s, l = 2;
		for (; r.has(c);) c = `${s}-${l++}`;
		r.add(c), i.push({
			label: o,
			value: c
		});
	}), i;
}
function ih(e) {
	let t = String(e || "").trim();
	if (t === "") return "";
	try {
		if (typeof window < "u" && window.location) return new URL(t, window.location.href).href;
	} catch {}
	return t;
}
function ah(e) {
	try {
		let t = new URL(String(e));
		return t.host + (t.pathname === "/" ? "" : t.pathname);
	} catch {
		return String(e || "");
	}
}
function oh(e) {
	if (e && typeof e == "object" && !Array.isArray(e) && "data" in e) {
		let t = e.data;
		if (typeof t == "object" && t) return t;
	}
	return e;
}
//#endregion
//#region src/components/OptionsEditor.jsx
function sh({ options: e, onChange: t }) {
	let { t: n } = z(), r = e || [], i = (e, n) => t(r.map((t, r) => r === e ? {
		...t,
		...n
	} : t)), a = (e) => {
		r.length <= 1 || t(r.filter((t, n) => n !== e));
	};
	return /* @__PURE__ */ g("div", {
		className: "options-editor flex flex-col gap-1.5",
		children: [r.map((e, t) => /* @__PURE__ */ g("div", {
			className: "option-row grid grid-cols-[minmax(0,1fr)_100px_auto] items-center gap-1.5",
			children: [
				/* @__PURE__ */ h(V, {
					placeholder: n("options.label"),
					value: e.label,
					onChange: (e) => i(t, { label: e.target.value }),
					className: "min-w-0"
				}),
				/* @__PURE__ */ h(V, {
					placeholder: n("options.value"),
					value: e.value,
					onChange: (e) => i(t, { value: e.target.value }),
					className: "min-w-0 font-mono text-xs"
				}),
				/* @__PURE__ */ h("button", {
					type: "button",
					className: "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40",
					title: n("options.remove"),
					disabled: r.length <= 1,
					onClick: () => a(t),
					children: "✕"
				})
			]
		}, t)), /* @__PURE__ */ h("button", {
			type: "button",
			className: "w-fit cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-900",
			onClick: () => {
				let e = r.map((e) => e.value), n = r.length + 1, i = `opcao_${n}`;
				for (; e.includes(i);) n += 1, i = `opcao_${n}`;
				t([...r, {
					label: `Opção ${n}`,
					value: i
				}]);
			},
			children: n("options.add")
		})]
	});
}
//#endregion
//#region src/components/ApiSourceDialog.jsx
function ch({ label: e, hint: t, htmlFor: n, children: r }) {
	return /* @__PURE__ */ g("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ h("label", {
				className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
				htmlFor: n,
				children: e
			}),
			r,
			t && /* @__PURE__ */ h("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: t
			})
		]
	});
}
function lh({ open: e, field: t, onCancel: n, onImport: r, onFetchSource: i }) {
	let a = t && t.apiSource || {}, [o, s] = p(""), [l, u] = p(""), [d, f] = p(""), [m, _] = p(""), [v, y] = p(""), [b, x] = p(null), [S, C] = p("idle"), [w, T] = p(""), [E, D] = p([]);
	c(() => {
		e && (s(a.url || ""), u(a.headers || ""), f(a.path || ""), _(a.labelKey || ""), y(a.valueKey || ""), x(null), C("idle"), T(""), D([]));
	}, [e]);
	let O = b === null ? null : $m(b, d), k = O ? O.items : [], A = k.length > 0 ? rh(k, m, v) : [], j = async () => {
		if (o.trim() === "") {
			C("error"), T("Indique o URL do endpoint.");
			return;
		}
		if (typeof i != "function") {
			C("error"), T("Nenhum handler de fetch configurado.");
			return;
		}
		C("loading"), T("");
		try {
			let e = oh(await i({
				url: ih(o),
				headers: l.trim()
			})), t = $m(e, d);
			if (t.items.length === 0 && d.trim() !== "") {
				let n = $m(e, "");
				n.items.length > 0 && (t = n, f(n.path));
			}
			x(e), !d.trim() && t.path && f(t.path);
			let n = eh(t.items);
			D(n), _((e) => n.includes(e) ? e : th(n, [
				"label",
				"name",
				"nome",
				"titulo",
				"title",
				"descricao",
				"description"
			])), y((e) => n.includes(e) ? e : th(n, [
				"value",
				"id",
				"codigo",
				"code",
				"slug"
			])), C("ok"), T(`${t.items.length} item(ns) encontrados.`);
		} catch (e) {
			x(null), C("error"), T(e.message || "Falha ao contactar o endpoint.");
		}
	}, ee = (e) => {
		s(e), e !== (a.url || "") && (f(""), _(""), y(""), D([]), x(null), C("idle"), T(""));
	}, M = () => {
		let e = rh(k, m, v);
		e.length !== 0 && r(e, {
			url: o.trim(),
			headers: l.trim(),
			path: O ? O.path : d.trim(),
			labelKey: m,
			valueKey: v
		});
	}, N = S === "ok" && b !== null && k.length === 0;
	return /* @__PURE__ */ h(cu, {
		open: e,
		onClose: n,
		title: "Serviço de API",
		description: "Carregue as opções de um endpoint REST e faça o mapeamento dos campos (rótulo e valor).",
		className: "max-w-3xl",
		children: /* @__PURE__ */ g("div", {
			className: "mt-4 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ h(ch, {
					label: "URL do endpoint",
					htmlFor: "api-url",
					hint: "Ex.: https://servico.example.com/api/itens",
					children: /* @__PURE__ */ g("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ h(V, {
							id: "api-url",
							placeholder: "https://servico.example.com/api/itens",
							value: o,
							onChange: (e) => ee(e.target.value)
						}), /* @__PURE__ */ h(at, {
							variant: "primary",
							onClick: j,
							disabled: S === "loading",
							children: S === "loading" ? "A obter…" : "Obter"
						})]
					})
				}),
				/* @__PURE__ */ h(ch, {
					label: "Cabeçalhos (JSON, opcional)",
					htmlFor: "api-headers",
					children: /* @__PURE__ */ h(ct, {
						id: "api-headers",
						rows: 2,
						placeholder: "{\"Authorization\": \"Bearer token\"}",
						value: l,
						onChange: (e) => u(e.target.value)
					})
				}),
				/* @__PURE__ */ g("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ h(ch, {
							label: "Caminho para a lista",
							htmlFor: "api-path",
							hint: "Ex.: data.items — vazio = automático",
							children: /* @__PURE__ */ h(V, {
								id: "api-path",
								placeholder: "automático",
								value: d,
								onChange: (e) => f(e.target.value)
							})
						}),
						/* @__PURE__ */ h(ch, {
							label: "Campo do rótulo",
							htmlFor: "api-label",
							children: /* @__PURE__ */ h(V, {
								id: "api-label",
								list: "api-label-keys",
								placeholder: "name",
								value: m,
								onChange: (e) => _(e.target.value)
							})
						}),
						/* @__PURE__ */ h(ch, {
							label: "Campo do valor",
							htmlFor: "api-value",
							children: /* @__PURE__ */ h(V, {
								id: "api-value",
								list: "api-value-keys",
								placeholder: "id",
								value: v,
								onChange: (e) => y(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ h("datalist", {
					id: "api-label-keys",
					children: E.map((e) => /* @__PURE__ */ h("option", { value: e }, e))
				}),
				/* @__PURE__ */ h("datalist", {
					id: "api-value-keys",
					children: E.map((e) => /* @__PURE__ */ h("option", { value: e }, e))
				}),
				S === "error" && /* @__PURE__ */ h("p", {
					className: "text-xs font-medium text-red-600 dark:text-red-400",
					children: w
				}),
				S === "ok" && /* @__PURE__ */ h("p", {
					className: "text-xs font-medium text-emerald-700 dark:text-emerald-400",
					children: w
				}),
				N && /* @__PURE__ */ h("p", {
					className: "text-xs font-medium text-amber-700 dark:text-amber-400",
					children: "Nenhuma lista encontrada neste caminho — ajuste o caminho e clique em \"Obter\"."
				}),
				S === "ok" && k.length > 0 && /* @__PURE__ */ g("p", {
					className: "text-xs text-gray-500 dark:text-gray-400",
					children: [
						"Mapeando ",
						k.length,
						" item(ns) em ",
						A.length,
						" opções (máx. 500)."
					]
				}),
				A.length > 0 && /* @__PURE__ */ g("div", { children: [/* @__PURE__ */ h("p", {
					className: "mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300",
					children: "Pré-visualização do mapeamento"
				}), /* @__PURE__ */ h(lu, {
					className: "max-h-44",
					children: /* @__PURE__ */ g(uu, { children: [/* @__PURE__ */ h(du, { children: /* @__PURE__ */ g(pu, { children: [/* @__PURE__ */ h(mu, { children: "Rótulo" }), /* @__PURE__ */ h(mu, { children: "Valor" })] }) }), /* @__PURE__ */ h(fu, { children: A.slice(0, 5).map((e, t) => /* @__PURE__ */ g(pu, { children: [/* @__PURE__ */ h(hu, { children: e.label }), /* @__PURE__ */ h(hu, {
						className: "font-mono text-xs",
						children: e.value
					})] }, `${e.value}-${t}`)) })] })
				})] }),
				/* @__PURE__ */ g("div", {
					className: "flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-4",
					children: [/* @__PURE__ */ h(at, {
						variant: "ghost",
						onClick: n,
						children: "Cancelar"
					}), /* @__PURE__ */ h(at, {
						variant: "primary",
						onClick: M,
						disabled: A.length === 0 || S === "loading",
						children: A.length > 0 ? `Importar ${A.length} opções` : "Importar opções"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/properties/OptionsSection.jsx
function uh({ field: e, patch: t, onFetchSource: n }) {
	let { t: r } = z(), [i, a] = p(!1);
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ g("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ h("h3", {
					className: Pm,
					children: r("field.options")
				}), n && /* @__PURE__ */ h(at, {
					size: "sm",
					variant: "ghost",
					onClick: () => a(!0),
					children: e.apiSource ? r("api.title") + "…" : "API…"
				})]
			}),
			e.apiSource && /* @__PURE__ */ g("div", {
				className: "flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400",
				children: [/* @__PURE__ */ g("span", {
					className: "truncate",
					children: ["Endpoint: ", ah(e.apiSource.url)]
				}), /* @__PURE__ */ h("button", {
					type: "button",
					className: "cursor-pointer font-semibold text-red-600 dark:text-red-400 hover:underline",
					onClick: () => t({ apiSource: null }),
					children: r("common.delete")
				})]
			}),
			/* @__PURE__ */ h(sh, {
				options: e.options || [],
				onChange: (e) => t({ options: e })
			}),
			/* @__PURE__ */ h(lh, {
				open: i,
				field: e,
				onCancel: () => a(!1),
				onImport: (e, n) => {
					t({
						options: e,
						apiSource: n
					}), a(!1);
				},
				onFetchSource: n
			}, e.id)
		]
	});
}
//#endregion
//#region src/components/properties/DimensionSection.jsx
function dh({ field: e, patch: t }) {
	let { t: n } = z();
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [/* @__PURE__ */ h("h3", {
			className: Pm,
			children: n("field.dimension")
		}), /* @__PURE__ */ h($, {
			label: n("field.rows"),
			htmlFor: "prop-rows",
			children: /* @__PURE__ */ h(V, {
				id: "prop-rows",
				type: "number",
				min: 2,
				max: 20,
				value: e.rows || 4,
				onChange: (e) => t({ rows: Number(e.target.value) })
			})
		})]
	});
}
//#endregion
//#region src/components/properties/NumberLimitsSection.jsx
function fh({ field: e, patch: t }) {
	let { t: n } = z();
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [/* @__PURE__ */ h("h3", {
			className: Pm,
			children: n("field.limits")
		}), /* @__PURE__ */ g("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ h($, {
					label: n("field.min"),
					htmlFor: "prop-min",
					children: /* @__PURE__ */ h(V, {
						id: "prop-min",
						value: e.min ?? "",
						onChange: (e) => t({ min: e.target.value })
					})
				}),
				/* @__PURE__ */ h($, {
					label: n("field.max"),
					htmlFor: "prop-max",
					children: /* @__PURE__ */ h(V, {
						id: "prop-max",
						value: e.max ?? "",
						onChange: (e) => t({ max: e.target.value })
					})
				}),
				/* @__PURE__ */ h($, {
					label: n("field.step"),
					htmlFor: "prop-step",
					children: /* @__PURE__ */ h(V, {
						id: "prop-step",
						value: e.step ?? "",
						onChange: (e) => t({ step: e.target.value })
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/components/properties/PatternSection.jsx
function ph({ field: e, patternError: t, patch: n }) {
	let { t: r } = z(), i = e.pattern || "", a = !1;
	if (i !== "") try {
		new RegExp(i);
	} catch {
		a = !0;
	}
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h(Fm, {
				title: r("field.pattern"),
				badge: /* @__PURE__ */ h(ot, {
					color: i ? a ? "red" : "emerald" : "gray",
					children: r(i ? a ? "field.patternInvalid" : "field.patternActive" : "field.patternOff")
				})
			}),
			/* @__PURE__ */ h($, {
				label: r("field.patternLabel"),
				htmlFor: "prop-pattern",
				error: t,
				hint: r("field.patternHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-pattern",
					className: "font-mono text-xs",
					placeholder: "^[A-Za-z]{3}-\\\\d{4}$",
					value: i,
					onChange: (e) => n({ pattern: e.target.value })
				})
			}),
			/* @__PURE__ */ h($, {
				label: r("field.patternMessage"),
				htmlFor: "prop-pattern-message",
				hint: r("field.patternMessageHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-pattern-message",
					placeholder: r("field.patternMessagePlaceholder"),
					value: e.patternMessage || "",
					onChange: (e) => n({ patternMessage: e.target.value })
				})
			})
		]
	});
}
//#endregion
//#region src/components/properties/LayoutSection.jsx
function mh({ field: e, patch: t }) {
	let { t: n } = z();
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: n("field.layout")
			}),
			/* @__PURE__ */ h($, {
				label: n("field.columns"),
				htmlFor: "prop-columns",
				hint: n("field.columnsHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-columns",
					type: "number",
					min: 1,
					max: 12,
					value: e.columns ?? 12,
					onChange: (e) => t({ columns: e.target.value === "" ? "" : Number(e.target.value) }),
					onBlur: (e) => t({ columns: k(e.target.value) })
				})
			}),
			/* @__PURE__ */ h("div", {
				className: "column-presets flex flex-wrap gap-1.5",
				children: [
					3,
					4,
					6,
					12
				].map((n) => /* @__PURE__ */ h("button", {
					type: "button",
					className: B("cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition", k(e.columns) === n ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400"),
					onClick: () => t({ columns: n }),
					children: n
				}, n))
			})
		]
	});
}
//#endregion
//#region src/components/RichTextEditor.jsx
var hh = "6.8.6", gh = null, _h = null;
function vh(e) {
	return typeof window > "u" ? Promise.reject(/* @__PURE__ */ Error("Browser only.")) : window.tinymce ? Promise.resolve(window.tinymce) : ((!gh || _h !== e) && (_h = e, gh = new Promise((t, n) => {
		let r = document.createElement("script");
		r.src = e, r.referrerPolicy = "origin", r.onload = () => {
			window.tinymce ? t(window.tinymce) : n(/* @__PURE__ */ Error("TinyMCE indisponível."));
		}, r.onerror = () => n(/* @__PURE__ */ Error("Falha ao carregar o TinyMCE (sem ligação à Internet?).")), document.head.appendChild(r);
	}), gh.catch(() => {
		gh = null;
	})), gh);
}
function yh({ id: e, value: t = "", onChange: n, height: r = 220, tinymceBaseUrl: i }) {
	let a = f(null), o = f(n);
	o.current = n;
	let [s, l] = p(!1), u = i || `https://cdnjs.cloudflare.com/ajax/libs/tinymce/${hh}`, d = i || `${u}/tinymce.min.js`;
	return c(() => {
		let n = !1, i = null;
		return vh(d).then((e) => {
			!n && a.current && e.init({
				target: a.current,
				base_url: u,
				menubar: !1,
				branding: !1,
				promotion: !1,
				statusbar: !1,
				entity_encoding: "raw",
				height: r,
				plugins: "lists autolink fullscreen",
				toolbar: "fullscreen | bold italic underline | h2 h3 | bullist numlist | removeformat",
				content_style: "body{font-family:inherit;font-size:14px;color:#1b2333;margin:8px} p{margin:0 0 8px} ul,ol{margin:0 0 8px;padding-left:20px}",
				setup: (e) => {
					e.on("init", () => {
						i = e, n || e.setContent(t || "");
					}), e.on("change input undo redo", () => {
						i && typeof o.current == "function" && o.current(i.getContent());
					});
				}
			});
		}).catch(() => {
			n || l(!0);
		}), () => {
			n = !0;
			let t = window.tinymce;
			if (!t) return;
			let r = i || (e ? t.get(e) : null);
			r && t.remove(r);
		};
	}, [
		e,
		r,
		d,
		u
	]), s ? /* @__PURE__ */ h(ct, {
		rows: 10,
		value: t,
		placeholder: "<p>HTML</p>",
		onChange: (e) => n(e.target.value)
	}) : /* @__PURE__ */ h("textarea", {
		ref: a,
		id: e,
		defaultValue: t
	});
}
//#endregion
//#region src/components/properties/HtmlSection.jsx
function bh({ field: e, HtmlEditor: t, tinymceBaseUrl: n, patch: r }) {
	let { t: i } = z();
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: i("field.htmlSection")
			}),
			t ? /* @__PURE__ */ h(t, {
				value: e.html || "",
				onChange: (e) => r({ html: e })
			}, e.id) : /* @__PURE__ */ h(yh, {
				id: `html-editor-${e.id}`,
				value: e.html || "",
				onChange: (e) => r({ html: e }),
				tinymceBaseUrl: n
			}, e.id),
			/* @__PURE__ */ h("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: i("field.htmlSectionHint")
			})
		]
	});
}
//#endregion
//#region src/components/properties/StepsSection.jsx
function xh({ field: e, fields: t, patch: n }) {
	let { t: r } = z(), i = Array.isArray(e.steps) ? e.steps : [], a = (e, t) => n({ steps: i.map((n, r) => r === e ? t : n) }), o = () => {
		if (i.length >= 15) return;
		let t = [...i, `${r("fields.steps")} ${i.length + 1}`];
		n({
			steps: t,
			activeStep: Math.min(Number(e.activeStep) || 1, t.length)
		});
	}, s = (t) => {
		let a = i.filter((e, n) => n !== t), o = a.length > 0 ? a : [`${r("fields.steps")} 1`];
		n({
			steps: o,
			activeStep: Math.min(Math.max(Number(e.activeStep) || 1, 1), o.length)
		});
	}, c = (t) => {
		let n = Number(t), r = Math.max(i.length, 1);
		return Math.min(Math.max(Number.isFinite(n) ? Math.round(n) : Number(e.activeStep) || 1, 1), r);
	}, l = (t || []).some((t) => t.parentId === e.id && t.type === "heading");
	return /* @__PURE__ */ g("section", {
		className: Nm,
		children: [
			/* @__PURE__ */ h("h3", {
				className: Pm,
				children: r("field.stepsSection")
			}),
			/* @__PURE__ */ h($, {
				label: r("field.stepsMode"),
				htmlFor: "steps-mode",
				hint: r("field.stepsModeHint"),
				children: /* @__PURE__ */ g(Ac, {
					id: "steps-mode",
					value: e.mode === "progress" ? "progress" : "steps",
					onChange: (e) => n({ mode: e.target.value }),
					children: [/* @__PURE__ */ h("option", {
						value: "steps",
						children: r("field.stepsModeSteps")
					}), /* @__PURE__ */ h("option", {
						value: "progress",
						children: r("field.stepsModeProgress")
					})]
				})
			}),
			l && /* @__PURE__ */ h("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: r("field.stepsWizardHint")
			}),
			/* @__PURE__ */ g("div", {
				className: "flex flex-col gap-1.5",
				children: [i.map((e, t) => /* @__PURE__ */ g("div", {
					className: "grid grid-cols-[1fr_auto] items-center gap-1.5",
					children: [/* @__PURE__ */ h(V, {
						placeholder: `${r("fields.steps")} ${t + 1}`,
						value: e,
						onChange: (e) => a(t, e.target.value)
					}), /* @__PURE__ */ h("button", {
						type: "button",
						className: "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40",
						title: r("field.removeStep"),
						disabled: i.length <= 1,
						onClick: () => s(t),
						children: "✕"
					})]
				}, t)), /* @__PURE__ */ h("button", {
					type: "button",
					className: "w-fit cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50",
					disabled: i.length >= 15,
					onClick: o,
					children: r("field.addStep")
				})]
			}),
			/* @__PURE__ */ h($, {
				label: r("field.activeStep"),
				htmlFor: "prop-activestep",
				hint: r("field.activeStepHint"),
				children: /* @__PURE__ */ h(V, {
					id: "prop-activestep",
					type: "number",
					min: 1,
					max: Math.max(i.length, 1),
					value: e.activeStep ?? 1,
					onChange: (e) => n({ activeStep: e.target.value === "" ? "" : Number(e.target.value) }),
					onBlur: (e) => n({ activeStep: c(e.target.value) })
				})
			})
		]
	});
}
//#endregion
//#region src/components/properties/FieldProperties.jsx
var Sh = [
	"text",
	"textarea",
	"email",
	"password",
	"number",
	"date",
	"select",
	"radio"
], Ch = [
	"select",
	"radio",
	"checkboxgroup"
];
function wh({ field: e, fields: t, errors: n, onChangeField: r, onDuplicate: i, onDelete: a, onResizeStart: o, onResizeKey: s, onFetchSource: c, HtmlEditor: l, tinymceBaseUrl: u }) {
	let { t: d } = z();
	M(e.type);
	let f = N(e.type), p = e.type === "html", _ = e.type === "steps", v = n.byId[e.id], y = t.indexOf(e), b = (t) => r({
		...e,
		...t
	}), x = n.general[`fields.${y}.pattern`], S = !!(e.requiredCondition && e.requiredCondition.enabled);
	return /* @__PURE__ */ g("aside", {
		className: "props relative flex min-h-0 flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3.5 lg:overflow-y-auto",
		children: [
			/* @__PURE__ */ h(Wm, {
				onResizeStart: o,
				onResizeKey: s
			}),
			/* @__PURE__ */ g("div", {
				className: "props-head flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ h("span", {
					className: "inline-flex h-6 items-center rounded-md bg-blue-50 dark:bg-blue-950 px-2 text-[11px] font-bold text-blue-700 dark:text-blue-300",
					children: d(`fields.${e.type}`)
				}), /* @__PURE__ */ g("div", {
					className: "props-head-actions flex gap-1",
					children: [/* @__PURE__ */ h(at, {
						size: "sm",
						variant: "ghost",
						onClick: () => i(e.id),
						children: d("common.duplicate")
					}), /* @__PURE__ */ h(at, {
						size: "sm",
						variant: "dangerGhost",
						onClick: () => a(e.id),
						children: d("common.delete")
					})]
				})]
			}),
			/* @__PURE__ */ g("section", {
				className: "props-section flex flex-col gap-2.5",
				children: [
					/* @__PURE__ */ h("h3", {
						className: Pm,
						children: d("field.identification")
					}),
					/* @__PURE__ */ h($, {
						label: d("field.label"),
						htmlFor: "prop-label",
						hint: p || _ ? d("field.labelHintStatic") : void 0,
						children: /* @__PURE__ */ h(V, {
							id: "prop-label",
							value: e.label || "",
							onChange: (e) => b({ label: e.target.value })
						})
					}),
					f && /* @__PURE__ */ h($, {
						label: d("field.name"),
						htmlFor: "prop-name",
						error: v,
						hint: d("field.nameHint"),
						children: /* @__PURE__ */ h(V, {
							id: "prop-name",
							value: e.name || "",
							error: !!v,
							className: "font-mono text-xs",
							onChange: (e) => b({ name: e.target.value })
						})
					}),
					!p && !_ && /* @__PURE__ */ h($, {
						label: d("field.helpText"),
						htmlFor: "prop-help",
						children: /* @__PURE__ */ h(ct, {
							id: "prop-help",
							rows: 2,
							placeholder: d("field.helpTextHint"),
							value: e.helpText || "",
							onChange: (e) => b({ helpText: e.target.value })
						})
					})
				]
			}),
			f && /* @__PURE__ */ h(Jm, {
				field: e,
				patch: b
			}),
			f && e.type === "file" && /* @__PURE__ */ h(Ym, {
				field: e,
				patch: b
			}),
			f && Ch.includes(e.type) && /* @__PURE__ */ h(uh, {
				field: e,
				patch: b,
				onFetchSource: c
			}),
			f && e.type === "textarea" && /* @__PURE__ */ h(dh, {
				field: e,
				patch: b
			}),
			f && e.type === "number" && /* @__PURE__ */ h(fh, {
				field: e,
				patch: b
			}),
			Sh.includes(e.type) && /* @__PURE__ */ h(ph, {
				field: e,
				patternError: x,
				patch: b
			}),
			f && /* @__PURE__ */ h(mh, {
				field: e,
				patch: b
			}),
			/* @__PURE__ */ g("section", {
				className: Nm,
				children: [
					/* @__PURE__ */ h(Fm, {
						title: d("props.visibility"),
						badge: /* @__PURE__ */ h(ot, {
							color: e.visible === !1 ? "red" : "emerald",
							children: e.visible === !1 ? d("props.hidden") : d("props.visible")
						})
					}),
					/* @__PURE__ */ g("label", {
						className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
						children: [/* @__PURE__ */ h(Yc, {
							className: "mt-0.5",
							checked: e.visible !== !1,
							onChange: (e) => b({ visible: e.target.checked })
						}), /* @__PURE__ */ h("span", { children: d("field.fieldVisible") })]
					}),
					/* @__PURE__ */ h("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: d("field.visibilityHint")
					})
				]
			}),
			/* @__PURE__ */ h(Um, {
				condition: e.condition,
				fields: t,
				fieldId: e.id,
				onChange: (e) => b({ condition: e })
			}),
			f && /* @__PURE__ */ g("section", {
				className: "props-section flex flex-col gap-2.5 border-t border-gray-100 dark:border-gray-800 pt-4",
				children: [
					/* @__PURE__ */ h("h3", {
						className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400",
						children: d("field.readOnlySection")
					}),
					/* @__PURE__ */ g("label", {
						className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300",
						children: [/* @__PURE__ */ h(Yc, {
							className: "mt-0.5",
							checked: e.readOnly === !0,
							onChange: (e) => b({ readOnly: e.target.checked })
						}), /* @__PURE__ */ h("span", { children: d("field.readOnlyLabel") })]
					}),
					/* @__PURE__ */ h("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: d("field.readOnlyHint")
					})
				]
			}),
			f && /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ g("section", {
				className: "props-section flex flex-col gap-2.5 border-t border-gray-100 dark:border-gray-800 pt-4",
				children: [
					/* @__PURE__ */ h(Fm, {
						title: d("field.requiredSection"),
						badge: /* @__PURE__ */ h(ot, {
							color: S || e.required ? "red" : "gray",
							children: S ? d("field.requiredBadgeCond") : e.required ? d("field.requiredBadgeReq") : d("field.requiredBadgeOpt")
						})
					}),
					/* @__PURE__ */ g("label", {
						className: B("flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300", S ? "opacity-60" : "cursor-pointer"),
						children: [/* @__PURE__ */ h(Yc, {
							className: "mt-0.5",
							checked: e.required === !0,
							disabled: S,
							onChange: (e) => b({ required: e.target.checked })
						}), /* @__PURE__ */ g("span", { children: [d("field.requiredLabel"), S && /* @__PURE__ */ h("span", {
							className: "block text-gray-500 dark:text-gray-400",
							children: d("field.requiredCondNote")
						})] })]
					}),
					/* @__PURE__ */ h("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: d("field.requiredHint")
					})
				]
			}), /* @__PURE__ */ h(Um, {
				title: d("condition.requiredTitle"),
				toggleLabel: d("condition.requiredToggle"),
				condition: e.requiredCondition,
				fields: t,
				fieldId: e.id,
				onChange: (e) => b({ requiredCondition: e })
			})] }),
			p && /* @__PURE__ */ h(bh, {
				field: e,
				HtmlEditor: l,
				tinymceBaseUrl: u,
				patch: b
			}),
			_ && /* @__PURE__ */ h(xh, {
				field: e,
				fields: t,
				patch: b
			}),
			!f && !p && !_ && /* @__PURE__ */ h("section", {
				className: "props-section flex flex-col gap-2.5 border-t border-gray-100 dark:border-gray-800 pt-4",
				children: /* @__PURE__ */ h("p", {
					className: "text-xs text-gray-500 dark:text-gray-400",
					children: d("field.sectionOnly")
				})
			})
		]
	});
}
//#endregion
//#region src/components/properties/PropertiesPanel.jsx
function Th({ form: e, field: t, fields: n, onChangeField: r, onDuplicate: i, onDelete: a, onChangeForm: o, onResizeStart: s, onResizeKey: c, errors: l = {
	byId: {},
	general: {}
}, onFetchSource: u, HtmlEditor: d, tinymceBaseUrl: f }) {
	return t ? /* @__PURE__ */ h(wh, {
		field: t,
		fields: n,
		errors: l,
		onChangeField: r,
		onDuplicate: i,
		onDelete: a,
		onResizeStart: s,
		onResizeKey: c,
		onFetchSource: u,
		HtmlEditor: d,
		tinymceBaseUrl: f
	}) : /* @__PURE__ */ h(Vm, {
		form: e,
		fields: n,
		errors: l,
		onChangeForm: o,
		onResizeStart: s,
		onResizeKey: c
	});
}
//#endregion
//#region src/contexts.js
var Eh = i(null);
function Dh() {
	return s(Eh);
}
//#endregion
//#region src/components/FileControl.jsx
function Oh(e) {
	let t = Number(e) || 0;
	return t < 1024 ? `${t} B` : t < 1048576 ? `${Math.round(t / 1024)} KB` : `${(t / 1048576).toFixed(1)} MB`;
}
function kh(e) {
	let t = String(e || "").lastIndexOf(".");
	return t > 0 ? String(e).slice(t).toLowerCase() : "";
}
var Ah = [
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".bmp",
	".svg"
];
function jh(e) {
	return e && e.contentType && String(e.contentType).toLowerCase().startsWith("image/") ? !0 : Ah.includes(kh(e && (e.original || e.name) || ""));
}
function Mh({ field: e, value: t, onChange: n, error: r, disabled: i }) {
	let { t: a } = z(), o = f(null), [s, c] = p(!1), [l, u] = p(""), [d, m] = p(!1), _ = Dh(), v = Array.isArray(t) ? t : [], y = (Number(e.maxSizeMb) > 0 ? Number(e.maxSizeMb) : 5) * 1024 * 1024, b = String(e.accept || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean), x = e.multiple !== !1, S = Oh(y), C = async (t) => {
		if (t.length !== 0) {
			if (u(""), !x && t.length + v.length > 1) {
				u(a("file.singleError"));
				return;
			}
			for (let e of t) {
				if (e.size > y) {
					u(a("file.sizeError", {
						name: e.name,
						size: S
					}));
					return;
				}
				let t = kh(e.name);
				if (b.length && !b.includes(t)) {
					u(a("file.formatError", {
						name: e.name,
						formats: b.join(", ")
					}));
					return;
				}
			}
			c(!0);
			try {
				if (_ && typeof _.onUploadFiles == "function") {
					let r = await _.onUploadFiles({
						field: e,
						files: t
					});
					n([...v, ...r && r.files || []]);
				} else {
					let e = t.map((e) => ({
						name: e.name,
						original: e.name,
						size: e.size,
						_file: e
					}));
					n([...v, ...e]);
				}
			} catch (e) {
				u(e.message || a("file.uploadError"));
			} finally {
				c(!1);
			}
		}
	}, w = (t) => {
		let r = v[t];
		n(v.filter((e, n) => n !== t)), r && r.name && _ && typeof _.onDeleteFile == "function" && _.onDeleteFile({
			field: e,
			name: r.name
		}).catch(() => {});
	}, T = (t) => _ && typeof _.getFileUrl == "function" ? _.getFileUrl({
		field: e,
		name: t.name
	}) : t._file ? URL.createObjectURL(t._file) : void 0;
	return /* @__PURE__ */ g("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ g("div", {
				className: B("file-drop rounded-lg border border-dashed p-3 text-center transition-colors", d ? "border-blue-400 bg-blue-50/70 dark:bg-blue-950/70" : "border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/60"),
				onDragOver: (e) => {
					i || s || (e.preventDefault(), e.dataTransfer.dropEffect = "copy", m(!0));
				},
				onDragLeave: () => m(!1),
				onDrop: (e) => {
					e.preventDefault(), m(!1), !(i || s) && C(Array.from(e.dataTransfer.files || []));
				},
				children: [
					/* @__PURE__ */ h("input", {
						ref: o,
						type: "file",
						className: "hidden",
						multiple: x,
						accept: e.accept || void 0,
						disabled: i || s,
						onChange: (e) => {
							let t = Array.from(e.target.files || []);
							e.target.value = "", C(t);
						}
					}),
					/* @__PURE__ */ h(at, {
						size: "sm",
						onClick: () => o.current && o.current.click(),
						disabled: i || s,
						children: s ? a("file.uploading") : v.length > 0 ? a("file.addMore") : a("file.add")
					}),
					/* @__PURE__ */ g("p", {
						className: "mt-1.5 text-xs text-gray-500 dark:text-gray-400",
						children: [
							a("file.maxSize", { size: S }),
							b.length ? ` · ${b.join(" ")}` : "",
							x ? "" : ` · ${a("file.singleOnly")}`,
							" · ",
							a("file.dropHere")
						]
					})
				]
			}),
			l && /* @__PURE__ */ h("p", {
				className: "text-xs font-medium text-red-600 dark:text-red-400",
				children: l
			}),
			v.map((e, t) => {
				let n = T(e);
				return /* @__PURE__ */ g("div", {
					className: "file-item flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2.5 py-1.5",
					children: [
						jh(e) && n && /* @__PURE__ */ h("img", {
							src: n,
							alt: "",
							"aria-hidden": "true",
							className: "h-10 w-10 flex-none rounded-md object-cover"
						}),
						/* @__PURE__ */ h("span", {
							className: "min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300",
							children: e.original
						}),
						/* @__PURE__ */ h("span", {
							className: "text-xs whitespace-nowrap text-gray-500 dark:text-gray-400",
							children: Oh(e.size)
						}),
						n && /* @__PURE__ */ h("a", {
							className: "text-xs font-semibold whitespace-nowrap text-blue-600 dark:text-blue-400 hover:underline",
							href: n,
							target: "_blank",
							rel: "noreferrer",
							children: a("file.open")
						}),
						/* @__PURE__ */ h("button", {
							type: "button",
							className: "flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400",
							title: a("file.remove"),
							disabled: i || s,
							onClick: () => w(t),
							children: "✕"
						})
					]
				}, `${e.name}-${t}`);
			}),
			r && /* @__PURE__ */ h("p", {
				className: "text-xs font-medium text-red-600 dark:text-red-400",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/controls/TextInput.jsx
function Nh({ field: e, value: t, onChange: n, error: r, disabled: i, readOnly: a, inputId: o }) {
	let s = e.type === "number" ? "number" : e.type === "email" ? "email" : e.type === "password" ? "password" : "text";
	return /* @__PURE__ */ h(V, {
		id: o,
		type: s,
		autoComplete: e.autocomplete ?? (e.type === "password" ? "new-password" : void 0),
		value: t ?? "",
		placeholder: e.placeholder || "",
		disabled: i,
		readOnly: a,
		className: a ? "bg-gray-50! dark:bg-gray-900! cursor-default" : "",
		error: !!r,
		min: e.type === "number" && e.min !== "" && e.min !== void 0 ? e.min : void 0,
		max: e.type === "number" && e.max !== "" && e.max !== void 0 ? e.max : void 0,
		step: e.type === "number" && e.step !== "" && e.step !== void 0 ? e.step : void 0,
		onChange: (e) => n(e.target.value)
	});
}
//#endregion
//#region src/components/controls/TextareaInput.jsx
function Ph({ field: e, value: t, onChange: n, error: r, disabled: i, readOnly: a, inputId: o }) {
	return /* @__PURE__ */ h(ct, {
		id: o,
		rows: e.rows || 4,
		value: t ?? "",
		placeholder: e.placeholder || "",
		disabled: i,
		readOnly: a,
		className: a ? "bg-gray-50! dark:bg-gray-900! cursor-default" : "",
		error: !!r,
		onChange: (e) => n(e.target.value)
	});
}
//#endregion
//#region src/components/controls/SelectInput.jsx
function Fh({ field: e, value: t, onChange: n, error: r, disabled: i, inputId: a }) {
	let { t: o } = z(), s = e.options || [];
	return /* @__PURE__ */ g(Ac, {
		id: a,
		value: t ?? "",
		disabled: i,
		error: !!r,
		onChange: (e) => n(e.target.value),
		children: [/* @__PURE__ */ h("option", {
			value: "",
			children: o("fields.selectPlaceholder")
		}), s.map((e, t) => /* @__PURE__ */ h("option", {
			value: e.value,
			children: e.label
		}, `${e.value}-${t}`))]
	});
}
//#endregion
//#region src/components/controls/DateInput.jsx
function Ih({ field: e, value: t, onChange: n, error: r, disabled: i, inputId: a }) {
	return /* @__PURE__ */ h(Am, {
		id: a,
		value: t ?? "",
		placeholder: e.placeholder || "dd/mm/aaaa",
		disabled: i,
		error: !!r,
		onChange: (e) => n(e.target.value)
	});
}
//#endregion
//#region src/components/controls/RadioInput.jsx
function Lh({ field: e, value: t, onChange: n, error: r, disabled: i, inputId: a }) {
	let o = e.options || [];
	return /* @__PURE__ */ h(au, {
		className: B("option-list flex flex-col gap-1.5 rounded-lg", r && "rounded-md ring-1 ring-red-400"),
		value: t || void 0,
		disabled: i,
		onValueChange: (e) => n(e),
		"aria-label": e.label,
		children: o.map((e, t) => /* @__PURE__ */ g("div", {
			className: "option-item flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300",
			children: [/* @__PURE__ */ h(ou, {
				value: e.value,
				id: `${a}-r${t}`
			}), /* @__PURE__ */ h("label", {
				htmlFor: `${a}-r${t}`,
				className: "cursor-pointer",
				children: e.label
			})]
		}, `${e.value}-${t}`))
	});
}
//#endregion
//#region src/components/controls/CheckboxInput.jsx
function Rh({ field: e, value: t, onChange: n, disabled: r, inputId: i }) {
	return /* @__PURE__ */ g("div", {
		className: "checkbox-line flex items-center gap-2",
		children: [/* @__PURE__ */ h(Yc, {
			id: i,
			checked: t === !0,
			disabled: r,
			onChange: (e) => n(e.target.checked)
		}), /* @__PURE__ */ h("label", {
			htmlFor: i,
			className: "cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-50",
			children: e.label
		})]
	});
}
//#endregion
//#region src/components/controls/CheckboxGroupInput.jsx
function zh({ field: e, value: t, onChange: n, error: r, disabled: i }) {
	let a = e.options || [], o = Array.isArray(t) ? t : [];
	return /* @__PURE__ */ h("div", {
		className: B("option-list flex flex-col gap-1.5 rounded-lg", r && "rounded-md ring-1 ring-red-400"),
		children: a.map((e, t) => /* @__PURE__ */ g("label", {
			className: "option-item flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300",
			children: [/* @__PURE__ */ h(Yc, {
				checked: o.includes(e.value),
				disabled: i,
				onChange: (t) => n(t.target.checked ? [...o, e.value] : o.filter((t) => t !== e.value))
			}), /* @__PURE__ */ h("span", { children: e.label })]
		}, `${e.value}-${t}`))
	});
}
//#endregion
//#region src/components/controls/StepsBlock.jsx
function Bh({ field: e, stepsLabels: t, stepsActive: n, children: r }) {
	let { t: i } = z(), a = (Array.isArray(t) ? t : Array.isArray(e.steps) ? e.steps : []).slice(0, 15), o = n === void 0 ? Number(e.activeStep) || 1 : n, s = Math.min(Math.max(Number(o) || 1, 1), Math.max(a.length, 1));
	if (e.mode === "progress") {
		let e = Math.max(a.length, 1), t = Math.round(Math.min(s, e) / e * 100);
		return /* @__PURE__ */ g("div", {
			className: "field field-steps",
			children: [
				/* @__PURE__ */ g("div", {
					className: "mb-1.5 flex items-center justify-between gap-3 text-xs",
					children: [/* @__PURE__ */ g("span", {
						className: "min-w-0 truncate font-semibold text-gray-900 dark:text-gray-50",
						children: [i("steps.of", {
							current: s,
							total: e
						}), a[s - 1] ? ` · ${a[s - 1]}` : ""]
					}), /* @__PURE__ */ g("span", {
						className: "flex-none font-semibold tabular-nums text-blue-600 dark:text-blue-400",
						children: [t, "%"]
					})]
				}),
				/* @__PURE__ */ h("div", {
					className: "progress-track h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
					children: /* @__PURE__ */ h("div", {
						className: "progress-fill h-full rounded-full bg-blue-600 transition-all duration-300",
						style: { width: `${t}%` }
					})
				}),
				r && /* @__PURE__ */ h("div", {
					className: "mt-4 grid grid-cols-12 items-start gap-4",
					children: r
				})
			]
		});
	}
	return /* @__PURE__ */ g("div", {
		className: "field field-steps",
		children: [/* @__PURE__ */ h("ol", {
			className: "flex flex-col gap-3 sm:flex-row sm:gap-0",
			children: a.map((e, t) => {
				let n = t + 1, r = n < s ? "done" : n === s ? "active" : "pending";
				return /* @__PURE__ */ g("li", {
					className: "flex min-w-0 flex-1 items-center gap-2.5",
					children: [
						/* @__PURE__ */ h("span", {
							className: B("flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold", r === "done" && "bg-emerald-600 text-white", r === "active" && "bg-blue-600 text-white ring-2 ring-blue-200", r === "pending" && "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400"),
							children: r === "done" ? "✓" : n
						}),
						/* @__PURE__ */ h("span", {
							className: B("min-w-0 truncate text-sm", r === "active" ? "font-semibold text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"),
							children: e
						}),
						t < a.length - 1 && /* @__PURE__ */ h("span", {
							className: "hidden h-px min-w-4 flex-1 bg-gray-200 dark:bg-gray-800 sm:block",
							"aria-hidden": "true"
						})
					]
				}, `${n}-${e}`);
			})
		}), r && /* @__PURE__ */ h("div", {
			className: "mt-4 grid grid-cols-12 items-start gap-4",
			children: r
		})]
	});
}
//#endregion
//#region src/components/controls/HtmlBlock.jsx
function Vh({ field: e }) {
	return /* @__PURE__ */ h("div", {
		className: "field field-html text-sm text-gray-700 dark:text-gray-300 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-900 dark:[&_h2]:text-gray-50 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-900 dark:[&_h3]:text-gray-50 [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5",
		dangerouslySetInnerHTML: { __html: e.html || "" }
	});
}
//#endregion
//#region src/components/controls/HeadingBlock.jsx
function Hh({ field: e, hideTitle: t, hideDivider: n, children: r }) {
	return /* @__PURE__ */ g("div", {
		className: B("field field-heading", !t && !n && "border-b border-gray-200 dark:border-gray-800 pb-2"),
		children: [
			!t && /* @__PURE__ */ h("h3", {
				className: "text-base font-semibold text-gray-900 dark:text-gray-50",
				children: e.label
			}),
			!t && e.helpText && /* @__PURE__ */ h("p", {
				className: "field-help mt-0.5 text-xs text-gray-500 dark:text-gray-400",
				children: e.helpText
			}),
			r && /* @__PURE__ */ h("div", {
				className: B("grid grid-cols-12 items-start gap-4", !t && "mt-3"),
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/FieldRenderer.jsx
var Uh = {
	text: Nh,
	number: Nh,
	email: Nh,
	password: Nh,
	textarea: Ph,
	select: Fh,
	date: Ih,
	radio: Lh,
	checkbox: Rh,
	checkboxgroup: zh
};
function Wh({ field: e, value: t, onChange: n, error: r, disabled: i, children: a, hideTitle: o = !1, hideDivider: s = !1, hideSteps: c = !1, stepsLabels: u, stepsActive: d }) {
	let f = l(), p = { gridColumn: `span ${k(e.columns)}` };
	if (e.type === "steps") return c ? /* @__PURE__ */ h("div", {
		className: "field",
		style: p,
		children: a && /* @__PURE__ */ h("div", {
			className: "grid grid-cols-12 items-start gap-4",
			children: a
		})
	}) : /* @__PURE__ */ h("div", {
		style: p,
		children: /* @__PURE__ */ h(Bh, {
			field: e,
			stepsLabels: u,
			stepsActive: d,
			children: a
		})
	});
	if (e.type === "html") return /* @__PURE__ */ h("div", {
		style: p,
		children: /* @__PURE__ */ h(Vh, { field: e })
	});
	if (e.type === "heading") return /* @__PURE__ */ h("div", {
		style: p,
		children: /* @__PURE__ */ h(Hh, {
			field: e,
			hideTitle: o,
			hideDivider: s,
			children: a
		})
	});
	let m = e.readOnly === !0, _ = i || m, v = Uh[e.type] || Nh;
	return /* @__PURE__ */ g("div", {
		className: B("field flex flex-col gap-1.5", r && "has-error"),
		style: p,
		children: [
			e.type !== "checkbox" && /* @__PURE__ */ g("label", {
				className: "field-label block text-sm font-semibold text-gray-900 dark:text-gray-50",
				htmlFor: f,
				children: [e.label, e.required && /* @__PURE__ */ h("span", {
					className: "ml-1 text-red-500 dark:text-red-400",
					title: "Obrigatório",
					children: "*"
				})]
			}),
			e.type === "file" ? /* @__PURE__ */ h(Mh, {
				field: e,
				value: t,
				onChange: n,
				error: r,
				disabled: _
			}) : /* @__PURE__ */ h(v, {
				field: e,
				value: t,
				onChange: n,
				error: r,
				disabled: _,
				readOnly: m,
				inputId: f
			}),
			e.helpText && /* @__PURE__ */ h("p", {
				className: "field-help text-xs text-gray-500 dark:text-gray-400",
				children: e.helpText
			}),
			r && /* @__PURE__ */ h("p", {
				className: "field-error text-xs font-medium text-red-600 dark:text-red-400",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/FormRunner.jsx
function Gh({ form: e, submitLabel: t, onSubmit: n, onCancel: r, defaultValues: i, successActions: a, successTitle: o, successMode: s = "replace", showSuccess: c = !0, onSuccess: u, allSteps: d = !1, hideFooter: f = !1, skipConsent: m = !1, domId: _, onUploadFiles: v, onDeleteFile: y, getFileUrl: b }) {
	let { t: x } = z(), S = e.fields || [], C = `${l()}consent`, [w, T] = p(() => ({
		...ae(S),
		...i || {}
	})), [E, D] = p({}), [O, k] = p(""), [A, j] = p(!1), [ee, M] = p(!1), [N, te] = p(""), [P, F] = p(!1), [ne, I] = p(0), [R, re] = p(!1), [ie, se] = p(!1), ce = e.consent_required === !0 && !m, ue = {
		onUploadFiles: v,
		onDeleteFile: y,
		getFileUrl: b
	}, he = {
		required: x("validation.required"),
		invalidEmail: x("validation.invalidEmail"),
		invalidNumber: x("validation.invalidNumber"),
		pattern: x("validation.patternDefault")
	}, _e = () => {
		requestAnimationFrame(() => {
			let e = document.querySelector("[data-consent-block]");
			e && e.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		});
	}, ve = (e, t) => {
		T((n) => ({
			...n,
			[e]: t
		})), D((t) => {
			if (!t[e]) return t;
			let n = { ...t };
			return delete n[e], n;
		}), k("");
	}, be = async (e) => {
		if (e.preventDefault(), P) return;
		let t = oe(S, w, he);
		if (D(t), Object.keys(t).length > 0) {
			k(""), j(!1), requestAnimationFrame(() => {
				let e = document.querySelector(".field.has-error");
				e && e.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			});
			return;
		}
		if (ce && !R) {
			se(!0), k(""), j(!1), _e();
			return;
		}
		se(!1), F(!0), k(""), M(!1);
		try {
			let e = le(S, w), t = await n(e, { consent: R === !0 });
			D({}), c === !1 ? typeof u == "function" && await u(t || x("form.successMessage"), { payload: e }) : (te(t || x("form.successMessage")), s === "notice" ? M(!0) : j(!0));
		} catch (e) {
			let t = de(e.data && e.data.errors, S);
			D(t.byId), k(Object.keys(t.general).length > 0 ? Object.values(t.general).join(" ") : e.message || x("form.submitError")), e.data && e.data.errors && e.data.errors.consent && (se(!0), _e()), j(!1), M(!1);
		} finally {
			F(!1);
		}
	};
	if (A) return /* @__PURE__ */ h("div", {
		className: "form-viewer runner flex flex-col gap-5",
		children: /* @__PURE__ */ g("div", {
			className: "success-box flex flex-col items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 px-6 py-9 text-center",
			children: [
				/* @__PURE__ */ h("span", {
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white",
					"aria-hidden": "true",
					children: "OK"
				}),
				/* @__PURE__ */ h("h3", {
					className: "text-base font-semibold text-emerald-900 dark:text-emerald-300",
					children: o || x("form.successTitle")
				}),
				/* @__PURE__ */ h("p", {
					className: "text-sm text-emerald-800 dark:text-emerald-300",
					children: N
				}),
				/* @__PURE__ */ h("div", {
					className: "success-actions mt-2 flex flex-wrap items-center justify-center gap-2",
					children: a
				})
			]
		})
	});
	let xe = pe(S), Se = xe.filter((e) => L(e, S, w)), Ce = (() => {
		for (let e of S) {
			if (e.type !== "steps") continue;
			let t = ye(S, e);
			if (t.length > 0) return {
				field: e,
				sections: t
			};
		}
		return null;
	})(), we = !!Ce && !d, Te = we ? Ce.sections.map((e, t) => e.label || x("fields.steps") + ` ${t + 1}`) : [], Ee = we ? Math.min(Math.max(ne, 0), Te.length - 1) : 0, De = !we || Ee >= Te.length - 1, Oe = (e) => {
		I(e), D({}), k(""), requestAnimationFrame(() => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}));
	}, ke = () => {
		if (!Ce) return;
		let e = Ce.sections[Ee], t = oe(e ? ge(S, e.id) : [], w, he);
		if (Object.keys(t).length > 0) {
			D(t), k(""), requestAnimationFrame(() => {
				let e = document.querySelector(".field.has-error");
				e && e.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			});
			return;
		}
		Oe(Ee + 1);
	}, Ae = (e) => {
		if (e.type !== "heading" || !e.parentId) return !1;
		let t = S.find((t) => t.id === e.parentId);
		return !!(t && t.type === "steps");
	}, je = (e, t = !1) => {
		if (!L(e, S, w)) return null;
		let n = we && e.id === Ce.field.id, r = me(S, e.id);
		if (n) {
			let e = Ce.sections[Ee];
			r = e ? [e] : [];
		}
		return /* @__PURE__ */ h(Wh, {
			field: e,
			value: w[e.id],
			error: E[e.id],
			onChange: (t) => ve(e.id, t),
			hideTitle: Ae(e) && !d,
			hideDivider: t,
			hideSteps: d,
			stepsLabels: n ? Te : void 0,
			stepsActive: n ? Ee + 1 : void 0,
			children: fe(e.type) && r.length > 0 ? Me(r) : null
		}, e.id);
	}, Me = (e) => {
		let t = e.filter((e) => L(e, S, w)), n = t.filter((e) => e.type === "heading"), r = n.length > 0 ? n[n.length - 1].id : null;
		return t.map((e) => je(e, e.id === r));
	};
	return /* @__PURE__ */ h(Eh.Provider, {
		value: ue,
		children: /* @__PURE__ */ g("form", {
			id: _,
			className: "form-viewer runner flex flex-col gap-5",
			onSubmit: be,
			noValidate: !0,
			onKeyDown: (e) => {
				if (e.key !== "Enter") return;
				let t = e.target && e.target.tagName;
				(t === "INPUT" || t === "SELECT") && e.preventDefault();
			},
			children: [
				O && /* @__PURE__ */ h(st, { children: O }),
				ee && /* @__PURE__ */ h("div", {
					className: "rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-2.5 text-sm font-medium text-emerald-800 dark:text-emerald-300",
					children: N
				}),
				/* @__PURE__ */ g("div", {
					className: "runner-fields grid grid-cols-12 items-start gap-4",
					children: [Se.length === 0 && /* @__PURE__ */ h("p", {
						className: "col-span-full text-sm text-gray-500 dark:text-gray-400",
						children: x("form.emptyFields")
					}), Me(xe)]
				}),
				ce && De && /* @__PURE__ */ g("div", {
					"data-consent-block": !0,
					className: `rounded-lg border p-3.5 ${ie ? "border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/50" : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"}`,
					children: [
						/* @__PURE__ */ g("label", {
							className: `flex cursor-pointer items-start gap-2 text-sm ${ie ? "text-red-800 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}`,
							htmlFor: C,
							children: [/* @__PURE__ */ h(Yc, {
								id: C,
								className: "mt-0.5",
								checked: R,
								onChange: (e) => {
									re(e.target.checked), e.target.checked && se(!1);
								}
							}), /* @__PURE__ */ h("span", {
								className: "whitespace-pre-line",
								children: e.consent_text
							})]
						}),
						e.privacy_url && /* @__PURE__ */ h("a", {
							href: e.privacy_url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "ml-6 mt-1 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 underline",
							children: x("form.privacyPolicy")
						}),
						ie && /* @__PURE__ */ h("p", {
							className: "ml-6 mt-1 text-xs font-medium text-red-600 dark:text-red-400",
							children: x("form.consentError")
						}),
						!R && /* @__PURE__ */ h("p", {
							className: "ml-6 mt-1 text-xs text-gray-500 dark:text-gray-400",
							children: x("form.consentHint")
						})
					]
				}),
				!f && /* @__PURE__ */ g("div", {
					className: "runner-actions flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-4",
					children: [/* @__PURE__ */ g("div", {
						className: "flex items-center gap-2",
						children: [
							we && /* @__PURE__ */ h(at, {
								variant: "secondary",
								disabled: Ee === 0,
								onClick: (e) => {
									e.preventDefault(), Oe(Ee - 1);
								},
								children: x("form.previous")
							}),
							r && /* @__PURE__ */ h(at, {
								variant: "ghost",
								onClick: r,
								children: x("common.cancel")
							}),
							!we && !r && /* @__PURE__ */ h("span", { "aria-hidden": "true" })
						]
					}), we && !De ? /* @__PURE__ */ h(at, {
						variant: "primary",
						size: "lg",
						onClick: (e) => {
							e.preventDefault(), ke();
						},
						children: x("form.next")
					}) : /* @__PURE__ */ h(at, {
						type: "submit",
						variant: "primary",
						size: "lg",
						disabled: P || ce && !R,
						children: P ? x("form.submitting") : t || x("form.submit")
					})]
				})
			]
		})
	});
}
function Kh({ lang: e = "pt", ...t }) {
	return /* @__PURE__ */ h(He, {
		lang: e,
		children: /* @__PURE__ */ h(Gh, { ...t })
	});
}
//#endregion
//#region src/components/PreviewModal.jsx
function qh({ form: e, onClose: t }) {
	let { t: n } = z();
	return c(() => {
		let e = (e) => {
			e.key === "Escape" && t();
		};
		document.addEventListener("keydown", e);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.body.style.overflow = n;
		};
	}, [t]), /* @__PURE__ */ h(cu, {
		open: !0,
		onClose: t,
		title: n("preview.title"),
		description: e.name,
		children: /* @__PURE__ */ h(Kh, {
			form: e,
			submitLabel: n("preview.testSubmit"),
			successTitle: n("preview.validSubmit"),
			onSubmit: () => Promise.resolve(n("preview.notSaved"))
		})
	});
}
//#endregion
//#region src/components/FormEditor.jsx
var Jh = /^[A-Za-z_][A-Za-z0-9_]*$/;
function Yh(e) {
	return {
		name: e.name,
		description: e.description,
		available_from: e.available_from || "",
		available_to: e.available_to || "",
		visible: e.visible !== !1,
		consent_required: e.consent_required === !0,
		consent_text: e.consent_text || "",
		privacy_url: e.privacy_url || "",
		remote_url: e.remote_url || "",
		notify_email: e.notify_email || "",
		notify_field: e.notify_field || "",
		fields: e.fields
	};
}
function Xh({ json: e, onSave: t, onCancel: n, allowedTypes: r, onUploadFiles: i, onDeleteFile: a, getFileUrl: s, onFetchSource: l, HtmlEditor: u, tinymceBaseUrl: d }) {
	let { t: f } = z(), [m, _] = p(() => e ? JSON.parse(JSON.stringify(e)) : {
		name: f("editor.newForm"),
		description: "",
		available_from: "",
		available_to: "",
		visible: !0,
		fields: []
	}), [v, y] = p(null), [b, x] = p(!1), [S, C] = p(!1), [w, T] = p({
		byId: {},
		general: {}
	}), [E, D] = p(!1), { width: O, startResize: k, resizeByKey: A } = Fe(), j = o(() => {
		x(!0), T({
			byId: {},
			general: {}
		});
	}, []), ee = o((e) => {
		_((t) => t && e(t)), j();
	}, [j]), M = Oe(m, ee, y), N = (e) => {
		T((t) => {
			if (!t.general || !t.general[e]) return t;
			let n = { ...t.general };
			return delete n[e], {
				...t,
				general: n
			};
		});
	}, te = (e) => {
		T((t) => {
			if (!t.byId || !t.byId[e.id]) return t;
			let n = { ...t.byId };
			return delete n[e.id], {
				...t,
				byId: n
			};
		}), M.updateField(e);
	}, P = () => {
		let e = {}, t = {}, n = [
			"text",
			"textarea",
			"number",
			"email",
			"date",
			"select",
			"radio",
			"checkbox",
			"checkboxgroup",
			"file"
		];
		return m.fields.forEach((e) => {
			e && n.includes(e.type) && (t[e.name] = (t[e.name] || 0) + 1);
		}), m.fields.forEach((r) => {
			r && n.includes(r.type) && (Jh.test(r.name || "") ? t[r.name] > 1 && (e[r.id] = f("editor.nameDuplicate")) : e[r.id] = f("editor.nameError"));
		}), e;
	}, F = async () => {
		if (S) return !1;
		C(!0), T({
			byId: {},
			general: {}
		});
		try {
			return typeof t == "function" && await t(Yh(m)), x(!1), C(!1), !0;
		} catch (e) {
			return e && e.data && e.data.errors ? T(ue(e.data.errors, m.fields)) : T({
				byId: {},
				general: { save: e && e.message || f("editor.saveError") }
			}), C(!1), !1;
		}
	}, ne = () => {
		(!b || typeof window > "u" || window.confirm(f("editor.confirmLeave"))) && typeof n == "function" && n();
	};
	c(() => {
		let e = (e) => {
			(e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && (e.preventDefault(), F());
		}, t = (e) => {
			b && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("keydown", e), window.addEventListener("beforeunload", t), () => {
			window.removeEventListener("keydown", e), window.removeEventListener("beforeunload", t);
		};
	});
	let I = m.fields.find((e) => e.id === v) || null, L = {
		byId: {
			...P(),
			...w.byId
		},
		general: w.general
	}, R = Object.entries(w.general).filter(([e]) => e !== "available_to" && !e.startsWith("fields.")).map(([, e]) => e);
	return /* @__PURE__ */ g("div", {
		className: "form-editor editor flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-gray-950",
		style: { "--props-w": `${O}px` },
		children: [
			/* @__PURE__ */ g("header", {
				className: "editor-top flex flex-wrap items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5",
				children: [
					n && /* @__PURE__ */ h(at, {
						variant: "ghost",
						size: "sm",
						onClick: ne,
						children: f("common.back")
					}),
					/* @__PURE__ */ g("div", {
						className: "editor-title flex min-w-0 flex-1 flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ h("input", {
								className: "w-full max-w-sm rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-base font-semibold text-gray-900 dark:text-gray-50 transition hover:bg-gray-50 dark:hover:bg-gray-900 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
								value: m.name,
								placeholder: f("editor.formName"),
								"aria-label": f("editor.formName"),
								onChange: (e) => {
									N("name"), ee((t) => ({
										...t,
										name: e.target.value
									}));
								}
							}),
							b && /* @__PURE__ */ h("span", {
								className: "inline-flex h-6 w-6 items-center justify-center text-amber-500",
								title: f("editor.unsaved"),
								"aria-label": f("editor.unsaved"),
								children: /* @__PURE__ */ g("svg", {
									viewBox: "0 0 16 16",
									className: "h-4 w-4",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ h("circle", {
										cx: "8",
										cy: "8",
										r: "6.25"
									}), /* @__PURE__ */ h("circle", {
										cx: "8",
										cy: "8",
										r: "2.75",
										fill: "currentColor",
										stroke: "none"
									})]
								})
							}),
							L.general.name && /* @__PURE__ */ h("span", {
								className: "text-xs font-medium text-red-600 dark:text-red-400",
								children: L.general.name
							})
						]
					}),
					/* @__PURE__ */ g("div", {
						className: "editor-actions flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ h(at, {
							variant: "ghost",
							size: "sm",
							onClick: () => D(!0),
							children: f("editor.preview")
						}), /* @__PURE__ */ h(at, {
							variant: "primary",
							size: "sm",
							onClick: () => F(),
							disabled: S,
							children: f(S ? "editor.saving" : "common.save")
						})]
					})
				]
			}),
			R.length > 0 && /* @__PURE__ */ h(st, {
				className: "mx-4 mt-3",
				children: R.join(" ")
			}),
			/* @__PURE__ */ g("div", {
				className: "editor-body grid min-h-0 flex-1 grid-cols-1 gap-3 p-4 lg:grid-cols-[220px_minmax(0,1fr)_var(--props-w)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden",
				children: [
					/* @__PURE__ */ h(Ke, {
						onAdd: M.addField,
						allowedTypes: r
					}),
					/* @__PURE__ */ h(Mm, {
						fields: m.fields,
						selectedId: v,
						onSelect: y,
						onInsert: M.insertField,
						onMove: M.moveField,
						onDuplicate: M.duplicateField,
						onDelete: M.deleteField
					}),
					/* @__PURE__ */ h(Th, {
						form: m,
						field: I,
						fields: m.fields,
						errors: L,
						onResizeStart: k,
						onResizeKey: A,
						onChangeForm: (e) => {
							e && typeof e == "object" && Object.keys(e).forEach(N), ee((t) => ({
								...t,
								...e
							}));
						},
						onChangeField: te,
						onDuplicate: M.duplicateField,
						onDelete: (e) => {
							M.deleteField(e), e === v && y(null);
						},
						onFetchSource: l,
						HtmlEditor: u,
						tinymceBaseUrl: d
					})
				]
			}),
			E && /* @__PURE__ */ h(qh, {
				form: m,
				onClose: () => D(!1)
			})
		]
	});
}
function Zh({ lang: e = "pt", ...t }) {
	return /* @__PURE__ */ h(He, {
		lang: e,
		children: /* @__PURE__ */ h(Xh, { ...t })
	});
}
//#endregion
//#region src/components/FormViewer.jsx
function Qh({ json: e, defaultValues: t, onSubmit: n, onSave: r, onCancel: i, submitLabel: a, readOnly: o = !1, allSteps: s = !1, skipConsent: c = !1, successTitle: l, successActions: u, successMode: d, showSuccess: f = !0, onSuccess: p, hideFooter: m = !1, domId: g, onUploadFiles: _, onDeleteFile: v, getFileUrl: y }) {
	let { t: b } = z();
	if (!e || !Array.isArray(e.fields)) return /* @__PURE__ */ h(st, { children: b("form.invalidJson") });
	let x = Te(e);
	if (e.visible === !1) return /* @__PURE__ */ h(st, {
		color: "amber",
		children: b("form.notAvailable")
	});
	if (!x.available) return /* @__PURE__ */ h(st, {
		color: "amber",
		children: b("form.notAvailableNow")
	});
	let S = !!t && typeof r == "function";
	return /* @__PURE__ */ h(Kh, {
		form: e,
		defaultValues: t,
		onSubmit: S ? (e, t) => Promise.resolve(r(e, t)) : n,
		onCancel: i,
		submitLabel: a || b(S ? "form.editSave" : "form.submit"),
		successTitle: l || b(S ? "form.editSaved" : "form.successTitle"),
		successMode: d,
		showSuccess: f,
		onSuccess: p,
		hideFooter: m,
		domId: g,
		allSteps: s,
		skipConsent: c || o,
		successActions: u,
		onUploadFiles: _,
		onDeleteFile: v,
		getFileUrl: y
	});
}
function $h({ lang: e = "pt", ...t }) {
	return /* @__PURE__ */ h(He, {
		lang: e,
		children: /* @__PURE__ */ h(Qh, { ...t })
	});
}
//#endregion
export { lh as ApiSourceDialog, Mm as Canvas, Um as ConditionEditor, x as DATA_TYPES, Re as DICTS, S as FIELD_TYPES, wh as FieldProperties, Wh as FieldRenderer, Mh as FileControl, Zh as FormEditor, Vm as FormProperties, Kh as FormRunner, $h as FormViewer, He as LanguageProvider, C as OPERATORS, sh as OptionsEditor, Ke as Palette, qh as PreviewModal, Th as PropertiesPanel, w as RECORD_STATUSES, T as RECORD_STATUS_META, yh as RichTextEditor, ve as canDropInto, me as childrenOf, k as clampColumns, re as conditionSummary, ee as createField, ge as descendantsOf, Le as en, I as evalCondition, ne as evalRule, Qm as findArrayPath, xe as flatInsertIndex, Oh as fmtBytes, Lm as fmtDate, Im as fmtDateTime, Rm as fmtWhen, Te as formAvailability, Ge as getDict, Xm as getPath, We as getTranslator, ae as initialValues, _e as isAncestorOf, fe as isContainerType, N as isDataType, te as isEmptyValue, L as isFieldVisible, R as isRequired, eh as itemKeys, ue as mapFormErrors, rh as mapOptions, de as mapRecordErrors, th as pickDefaultKey, Ie as pt, zm as rangeLabel, $m as resolveItems, ih as resolveUrl, ah as shortUrl, he as siblingsOf, A as slugify, we as statusColor, Ce as statusLabel, le as toPayload, pe as topLevelFields, M as typeMeta, O as uid, j as uniqueName, oh as unwrapPayload, z as useLanguage, Ue as useTranslation, oe as validateValues, ye as wizardSections };
