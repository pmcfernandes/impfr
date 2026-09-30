/**
 * API pública do pacote @pmcfernandes/table-editor.
 * O CSS é incluído no bundle para que o consumidor apenas importe o componente.
 */
import "./index.css";

export { DataView } from "./components/DataView/index.js";
export { VIEW_MODES, getRowId, normalizeConfig, resolveFieldSearchKeys } from "./core/config.js";
export { formatValue } from "./core/formatting.js";
export { createTranslator } from "./i18n/index.js";
