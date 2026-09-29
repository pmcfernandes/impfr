import { LayoutGrid, List, Table2 } from "lucide-react";
import { cx } from "../../ui/index.js";

const VIEW_ICONS = {
  table: Table2,
  list: List,
  cards: LayoutGrid,
};

const VIEW_LABEL_KEYS = { table: "viewTable", list: "viewList", cards: "viewCards" };

/**
 * Alternador de vistas (tabela | lista | cartões).
 * Renderizado no topo do DataView, à direita do título.
 */
export function DataViewViewSwitcher({ viewModes, view, onViewChange, t }) {
  if (!Array.isArray(viewModes) || viewModes.length <= 1) return null;

  return (
    <div className="flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
      {viewModes.map((mode) => {
        const Icon = VIEW_ICONS[mode];
        const active = view === mode;
        return (
          <button
            key={mode}
            title={t(VIEW_LABEL_KEYS[mode])}
            onClick={() => onViewChange(mode)}
            className={cx(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t(VIEW_LABEL_KEYS[mode])}</span>
          </button>
        );
      })}
    </div>
  );
}
