/** Junta classes de forma simples (helper estilo Tremor `cx`). */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
