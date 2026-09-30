import { ArrowDownToLine, Columns3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { exportToCsv } from "../../core/filtering.js";
import { Button, SearchInput } from "../../ui/index.js";

function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Barra de ações: pesquisa + exportar + botões customizados + eliminar + novo.
 * (O alternador de vistas vive no topo, à direita do título.)
 */
export function DataViewToolbar({
  config,
  query,
  onQueryChange,
  selectedCount,
  onAdd,
  onDeleteSelected,
  filteredRows,
  showExport = true,
  actions = [],
  actionContext = {},
  showColumnVisibility = false,
  visibilityColumns = [],
  hiddenColumnKeys = [],
  onHiddenColumnKeysChange,
  t,
}) {
  const [columnsOpen, setColumnsOpen] = useState(false);

  function toggleColumn(key) {
    onHiddenColumnKeysChange((current) =>
      current.includes(key) ? current.filter((column) => column !== key) : [...current, key],
    );
  }

  return (
    <div className="space-y-6 px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
      {config.searchable && (
        <SearchInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("search")}
          className="min-w-52 flex-1"
        />
      )}

      <div className="ml-auto flex flex-wrap items-center gap-2">
        {Array.isArray(actions) &&
          actions.map((action, i) => (
            <Button
              key={action.key ?? action.id ?? action.label ?? i}
              variant={action.variant ?? "secondary"}
              title={action.label}
              onClick={() => action.onClick?.(actionContext)}
            >
              {action.icon}
              <span className="hidden md:inline">{action.label}</span>
            </Button>
          ))}

        {config.addable && (
          <Button variant="primary" onClick={onAdd}>
            <Plus className="h-4 w-4" />
            {t("add")}
          </Button>
        )}
      </div>
      </div>

      {(showExport || showColumnVisibility || (config.deletable && config.multiDelete && selectedCount > 0)) && (
        <div className="flex min-h-8 items-center justify-between gap-2">
          <div>
            {config.deletable && config.multiDelete && selectedCount > 0 && (
              <Button variant="danger" onClick={onDeleteSelected}>
                <Trash2 className="h-4 w-4" />
                {t("deleteSelected")} ({selectedCount})
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showExport && (
              <Button
                variant="secondary"
                title={t("export")}
                onClick={() => downloadCsv(`${config.title ?? "data"}.csv`, exportToCsv(filteredRows, config.columns))}
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span className="hidden md:inline">{t("export")}</span>
              </Button>
            )}

            {showColumnVisibility && visibilityColumns.length > 0 && (
              <div className="relative">
              <Button variant="secondary" title={t("columns")} onClick={() => setColumnsOpen((open) => !open)}>
                <Columns3 className="h-4 w-4" />
              </Button>
              {columnsOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  <p className="px-2 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">{t("showColumns")}</p>
                  {visibilityColumns.map((column) => (
                    <label key={column.key} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                      <input type="checkbox" checked={!hiddenColumnKeys.includes(column.key)} onChange={() => toggleColumn(column.key)} className="h-4 w-4 accent-blue-600" />
                      <span className="truncate">{column.label}</span>
                    </label>
                  ))}
                </div>
              )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
