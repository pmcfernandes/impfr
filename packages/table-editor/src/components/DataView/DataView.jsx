import { useMemo } from "react";
import { VIEW_MODES, getRowId, normalizeConfig, resolveFieldSearchKeys } from "../../core/config.js";
import { useDataView } from "../../hooks/useDataView.js";
import { createTranslator } from "../../i18n/index.js";
import { Card, CardHeader, Pagination } from "../../ui/index.js";
import { DataViewCards } from "./DataViewCards.jsx";
import { DataViewEditor } from "./DataViewEditor.jsx";
import { DataViewList } from "./DataViewList.jsx";
import { DataViewTable } from "./DataViewTable.jsx";
import { DataViewToolbar } from "./DataViewToolbar.jsx";
import { DataViewViewSwitcher } from "./DataViewViewSwitcher.jsx";

/**
 * DataView — componente reutilizável de visualização e edição.
 *
 * @param {object} props.config JSON de configuração (com `data`)
 * @param {string} [props.locale] "pt" | "en" (default: config.locale ?? "pt")
 * @param {(rows) => void} [props.onChange] chamado após criar/editar/eliminar
 * @param {string[]} [props.viewModes] restringe as vistas (ex.: ["table","cards"]).
 *   Sobrepõe-se a `config.viewModes`.
 * @param {boolean} [props.showExport] mostra/esconde o botão Exportar CSV.
 *   Sobrepõe-se a `config.exportable`.
 * @param {boolean} [props.hideHeader] esconde o título e a descrição do
 *   cabeçalho. O alternador de vistas continua a ser controlado por
 *   `viewModes`. Sobrepõe-se a `config.hideHeader`.
 * @param {boolean|string[]} [props.fieldSearch] mostra filtros por coluna.
 *   `true` mostra todos; uma lista limita as chaves. Sobrepõe `config.fieldSearch`.
 * @param {Array} [props.actions] botões extra na toolbar:
 *   [{ key?, label, icon?: ReactNode, variant?: "primary"|"secondary"|"danger"|"ghost",
 *      onClick?: (ctx) => void }] onde ctx = { rows, selectedIds, query }.
 *   Também pode vir em `config.actions` (sem onClick em JSON puro).
 * @param {(ctx: { rows: object[], selectedIds: string[] }) => boolean | void} [props.onDeleteSelected]
 *   Callback do botão "Eliminar seleção". Devolver `false` impede a eliminação local.
 * @param {(row: object) => void} [props.onEditRow]
 *   Callback do botão editar de cada linha. Quando fornecido (ou via
 *   `config.onEditRow`), é chamado em vez do editor interno, permitindo
 *   abrir um diálogo/formulário externo em modo de edição.
 * @param {() => void} [props.onAddRow]
 *   Callback do botão adicionar. Quando fornecido (ou via `config.onAddRow`),
 *   é chamado em vez do editor interno de criação.
 * @param {(row: object) => void} [props.onDeleteRow]
 *   Callback do botão eliminar de cada linha. Quando fornecido (ou via
 *   `config.onDeleteRow`), é chamado em vez da confirmação e eliminação
 *   internas, permitindo usar um diálogo próprio e/ou uma API externa.
 *
 * @example
 * const config = { title: "Produtos", data: [...], columns: [...] };
 * <DataView
 *   config={config}
 *   locale="pt"
 *   viewModes={["table", "cards"]}
 *   showExport={false}
 *   actions={[{ label: "Imprimir", onClick: () => window.print() }]}
 *   onChange={setRows}
 * />
 */
export function DataView({
  config: rawConfig,
  locale,
  onChange,
  className,
  viewModes,
  showExport,
  hideHeader,
  fieldSearch,
  actions,
  onDeleteSelected,
  onEditRow,
  onAddRow,
  onDeleteRow,
}) {
  const config = useMemo(() => {
    const normalized = normalizeConfig(rawConfig);

    // Prop `viewModes` sobrepõe-se ao JSON.
    if (Array.isArray(viewModes) && viewModes.length > 0) {
      const allowed = viewModes.filter((v) => VIEW_MODES.includes(v));
      if (allowed.length > 0) {
        normalized.viewModes = allowed;
        if (!allowed.includes(normalized.defaultView)) normalized.defaultView = allowed[0];
      }
    }

    // Prop `showExport` sobrepõe-se a `config.exportable`.
    if (typeof showExport === "boolean") normalized.exportable = showExport;
    // Prop `hideHeader` sobrepõe-se a `config.hideHeader`.
    if (typeof hideHeader === "boolean") normalized.hideHeader = hideHeader;
    if (fieldSearch !== undefined) {
      normalized.fieldSearch = fieldSearch;
      normalized.fieldSearchKeys = resolveFieldSearchKeys(fieldSearch, normalized.columns);
    }

    if (Array.isArray(actions)) normalized.actions = actions;

    return normalized;
  }, [rawConfig, viewModes, showExport, hideHeader, fieldSearch, actions]);
  const activeLocale = locale ?? rawConfig.locale ?? "pt";
  const t = createTranslator(activeLocale);

  const state = useDataView(config, onChange);
  const {
    visibleRows,
    allFilteredRows,
    view,
    setView,
    query,
    setQuery,
    fieldFilters,
    setFieldFilters,
    hiddenColumnKeys,
    setHiddenColumnKeys,
    selectedIds,
    editingRow,
    setEditingRow,
  } = state;

  const showToolbar =
    config.searchable ||
    config.addable ||
    config.exportable ||
    config.columnVisibility ||
    config.fieldSearchKeys.length > 0 ||
    (config.deletable && config.multiDelete) ||
    (Array.isArray(config.actions) && config.actions.length > 0);

  // Se a vista ativa deixar de estar disponível (ex.: viewModes mudou), usa a 1ª.
  const activeView = config.viewModes.includes(view) ? view : config.viewModes[0];

  // Cabeçalho: título/descrição à esquerda (ocultável via hideHeader),
  // alternador de vistas à direita (controlado por viewModes).
  const showTitle = !config.hideHeader && (config.title || config.description);
  const showHeader = showTitle || config.viewModes.length > 1;

  function handleDelete(row) {
    const handler = onDeleteRow ?? config.onDeleteRow;
    if (typeof handler === "function") {
      handler(row);
      return;
    }
    if (window.confirm(t("confirmDelete"))) state.deleteRow(row);
  }

  function handleEdit(row) {
    const handler = onEditRow ?? config.onEditRow;
    if (typeof handler === "function") {
      handler(row);
      return;
    }
    setEditingRow({ mode: "edit", row });
  }

  function handleAdd() {
    const handler = onAddRow ?? config.onAddRow;
    if (typeof handler === "function") {
      handler();
      return;
    }
    setEditingRow({ mode: "create", row: {} });
  }

  function handleDeleteSelected() {
    const rows = state.rows.filter((row, index) =>
      selectedIds.includes(getRowId(row, config.idKey, index)),
    );
    const handler = onDeleteSelected ?? config.onDeleteSelected;
    // O callback pode validar ou tratar uma API. `false` cancela a alteração local.
    if (handler?.({ rows, selectedIds }) === false) return;
    state.deleteSelected();
  }

  const actionContext = {
    rows: allFilteredRows,
    selectedIds,
    query,
  };

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader
          title={showTitle ? config.title : undefined}
          description={
            showTitle
              ? (config.description ?? `${state.total} ${t("rows")}`)
              : undefined
          }
          actions={
            <DataViewViewSwitcher
              viewModes={config.viewModes}
              view={activeView}
              onViewChange={setView}
              t={t}
            />
          }
        />
      )}

      {showToolbar && (
        <DataViewToolbar
          config={config}
          query={query}
          onQueryChange={setQuery}
          selectedCount={selectedIds.length}
          onAdd={handleAdd}
          onDeleteSelected={handleDeleteSelected}
          filteredRows={allFilteredRows}
          showExport={config.exportable}
          actions={config.actions}
          actionContext={actionContext}
          showColumnVisibility={activeView === "table" && config.columnVisibility}
          visibilityColumns={config.columns.filter((column) => !column.description && !column.subGrid)}
          hiddenColumnKeys={hiddenColumnKeys}
          onHiddenColumnKeysChange={setHiddenColumnKeys}
          t={t}
        />
      )}

      {selectedIds.length > 0 && (
        <p className="px-5 pb-1 text-xs text-gray-500 dark:text-gray-400">
          {selectedIds.length} {t("selected")}
        </p>
      )}

      {activeView === "table" && (
        <DataViewTable
          config={config}
          rows={visibleRows}
          locale={activeLocale}
          sortKey={state.sortKey}
          sortDir={state.sortDir}
          onToggleSort={state.toggleSort}
          fieldFilters={fieldFilters}
          onFieldFiltersChange={setFieldFilters}
          hiddenColumnKeys={hiddenColumnKeys}
          selectedIds={selectedIds}
          onToggleSelect={state.toggleSelect}
          onToggleSelectAll={state.toggleSelectAll}
          onEdit={handleEdit}
          onDelete={handleDelete}
          t={t}
        />
      )}
      {activeView === "list" && (
        <DataViewList
          config={config}
          rows={visibleRows}
          locale={activeLocale}
          onEdit={handleEdit}
          onDelete={handleDelete}
          t={t}
        />
      )}
      {activeView === "cards" && (
        <DataViewCards
          config={config}
          rows={visibleRows}
          locale={activeLocale}
          onEdit={handleEdit}
          onDelete={handleDelete}
          t={t}
        />
      )}

      {config.paginated && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          <Pagination
            page={state.page}
            totalPages={state.totalPages}
            total={state.total}
            pageSize={state.pageSize}
            onPage={state.setPage}
            t={t}
          />
        </div>
      )}

      {editingRow && (
        <DataViewEditor
          config={config}
          editingRow={editingRow}
          onSave={state.saveRow}
          onClose={() => setEditingRow(null)}
          t={t}
        />
      )}
    </Card>
  );
}
