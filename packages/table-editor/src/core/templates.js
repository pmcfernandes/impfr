/**
 * Templates de célula por coluna e por vista — apenas funções.
 *
 * Na coluna podes definir:
 *   template: (value, view) => string | ReactNode   // todas as vistas
 *   templates: { table?, list?, cards? }            // por vista (sobrepõe `template`)
 *
 * - `value` é o valor bruto da célula (row[column.key]).
 * - `view` é "table" | "list" | "cards" — permite variar o resultado
 *   dentro de um `template` partilhado sem repetir por vista.
 */

/** Devolve o template aplicável à coluna nesta vista (ou null). */
export function getColumnTemplate(column = {}, view) {
  if (!column) return null;
  return column.templates?.[view] ?? column.template ?? null;
}

export function hasColumnTemplate(column, view) {
  return getColumnTemplate(column, view) != null;
}

/** Executa o template com (value, view); em erro, devolve o valor bruto. */
export function renderTemplateValue(template, value, view) {
  if (typeof template !== "function") return value;
  try {
    return template(value, view);
  } catch {
    return value;
  }
}
