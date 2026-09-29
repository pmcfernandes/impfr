/**
 * Formatação de valores por tipo de coluna.
 * Tipos suportados: text | number | currency | percent | date | datetime | boolean | badge | select
 */

export function formatValue(value, column = {}, locale = "pt") {
  if (value === null || value === undefined || value === "") return "—";

  const bcp47 = locale === "en" ? "en-US" : "pt-PT";
  const type = column.type ?? "text";

  try {
    switch (type) {
      case "number":
        return new Intl.NumberFormat(bcp47).format(Number(value));
      case "currency":
        return new Intl.NumberFormat(bcp47, {
          style: "currency",
          currency: column.currency ?? "EUR",
        }).format(Number(value));
      case "percent": {
        const n = Number(value);
        const normalized = Math.abs(n) <= 1 && n !== 0 ? n : n / 100;
        return new Intl.NumberFormat(bcp47, { style: "percent", maximumFractionDigits: 1 }).format(
          normalized,
        );
      }
      case "date":
        return new Intl.DateTimeFormat(bcp47, { dateStyle: "medium" }).format(new Date(value));
      case "datetime":
        return new Intl.DateTimeFormat(bcp47, { dateStyle: "medium", timeStyle: "short" }).format(
          new Date(value),
        );
      case "boolean":
        return value === true || value === "true" ? "✓" : "—";
      default:
        return String(value);
    }
  } catch {
    return String(value);
  }
}

/** Devolve o valor bruto pronto a editar (ex.: dates em yyyy-mm-dd). */
export function toEditableValue(value, column = {}) {
  if (value === null || value === undefined) return "";
  if ((column.type === "date" || column.type === "datetime") && value) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    if (column.type === "date") return d.toISOString().slice(0, 10);
  }
  if (column.type === "boolean") return Boolean(value);
  return value;
}

/** Converte o valor do formulário de volta para o tipo da coluna. */
export function fromEditableValue(value, column = {}) {
  if (column.type === "number" || column.type === "currency" || column.type === "percent") {
    if (value === "" || value === null) return null;
    const n = Number(String(value).replace(",", "."));
    return Number.isNaN(n) ? value : n;
  }
  if (column.type === "boolean") return value === true || value === "true" || value === "on";
  return value;
}
