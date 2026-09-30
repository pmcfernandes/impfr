import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";
import { getRowId } from "../../core/config.js";
import { groupRows } from "../../core/filtering.js";
import { formatValue } from "../../core/formatting.js";
import { getColumnTemplate, renderTemplateValue } from "../../core/templates.js";
import {
  Badge,
  EmptyState,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
  badgeVariantFor,
  cx,
} from "../../ui/index.js";

function SortIcon({ active, dir }) {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
  return dir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />;
}

function CellContent({ row, column, locale }) {
  const value = row[column.key];
  const template = getColumnTemplate(column, "table");
  if (template != null) {
    return <span>{renderTemplateValue(template, value, "table")}</span>;
  }
  if (column.render === "badge" || column.type === "badge") {
    return <Badge variant={badgeVariantFor(value, column.badgeMap)}>{String(value)}</Badge>;
  }
  const align = column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "";
  return <span className={align}>{formatValue(value, column, locale)}</span>;
}

/** Sub-grid renderizada numa linha completa abaixo do registo pai. */
function NestedGrid({ column, rows, locale, showTitle = true }) {
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const grid = column.subGrid === true ? {} : column.subGrid;
  const columns =
    Array.isArray(grid?.columns) && grid.columns.length > 0
      ? grid.columns
      : Object.keys(rows[0] ?? {}).map((key) => ({ key, label: key, type: "text" }));

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      {showTitle && (grid?.title ?? column.label) && (
        <p className="border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:border-gray-800 dark:text-gray-300">
          {grid?.title ?? column.label}
        </p>
      )}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            {columns.map((childColumn) => (
              <th key={childColumn.key} className="px-3 py-2 font-medium">
                {childColumn.label ?? childColumn.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {rows.map((childRow, index) => (
            <tr key={childRow[grid?.idKey ?? "id"] ?? index}>
              {columns.map((childColumn) => (
                <td key={childColumn.key} className="px-3 py-2 text-gray-700 dark:text-gray-200">
                  <CellContent row={childRow} column={childColumn} locale={locale} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Vista em tabela: cabeçalho ordenável, seleção e ações por linha.
 */
export function DataViewTable({
  config,
  rows,
  locale,
  sortKey,
  sortDir,
  onToggleSort,
  fieldFilters,
  onFieldFiltersChange,
  hiddenColumnKeys = [],
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  t,
}) {
  const [collapsedGroups, setCollapsedGroups] = useState([]);
  // Sem chaves abertas inicialmente: sub-grids começam colapsados.
  const [expandedSubGrids, setExpandedSubGrids] = useState([]);
  if (config.columns.length === 0) return <EmptyState title={t("noColumns")} />;

  const showActions = config.editable || config.deletable;
  // A coluna de descrição não ocupa uma célula normal: é uma linha integral abaixo do registo.
  const descriptionColumn = config.columns.find((column) => column.description === true);
  const subGridColumns = config.columns.filter((column) => column.subGrid);
  const visibleColumns = config.columns.filter(
    (column) =>
      column !== descriptionColumn &&
      !subGridColumns.includes(column) &&
      !hiddenColumnKeys.includes(column.key),
  );
  const groupColumn = config.columns.find((column) => column.key === config.groupBy);
  const groups = groupColumn ? groupRows(rows, groupColumn.key) : null;
  const columnCount = visibleColumns.length + Number(config.selectable) + Number(showActions);
  const allVisibleIds = rows.map((r, i) => getRowId(r, config.idKey, i));
  const allChecked = allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedIds.includes(id));

  function toggleGroup(key) {
    setCollapsedGroups((current) =>
      current.includes(key) ? current.filter((group) => group !== key) : [...current, key],
    );
  }

  function toggleSubGrid(key) {
    setExpandedSubGrids((current) =>
      current.includes(key) ? current.filter((grid) => grid !== key) : [...current, key],
    );
  }

  function renderRow(row, index) {
    const id = getRowId(row, config.idKey, index);
    const hasDescription = descriptionColumn && row[descriptionColumn.key] != null && row[descriptionColumn.key] !== "";
    return (
      <Fragment key={id}>
      <TableRow>
        {config.selectable && (
          <TableCell className="w-[30px] min-w-[30px] max-w-[30px] px-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(id)}
              onChange={() => onToggleSelect(id)}
              className="h-4 w-4 accent-blue-600"
            />
          </TableCell>
        )}
        {visibleColumns.map((col) => (
          <TableCell key={col.key}>
            <CellContent row={row} column={col} locale={locale} />
          </TableCell>
        ))}
        {showActions && (
          <TableCell className="text-right">
            <div className="flex justify-end gap-1">
              {config.editable && (
                <IconButton title={t("edit")} onClick={() => onEdit(row)}>
                  <Pencil className="h-4 w-4" />
                </IconButton>
              )}
              {config.deletable && (
                <IconButton title={t("delete")} onClick={() => onDelete(row)}>
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              )}
            </div>
          </TableCell>
        )}
      </TableRow>
      {hasDescription && (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnCount} className="pt-0 text-sm text-gray-500 dark:text-gray-400">
            <span className="block border-l-2 border-blue-200 pl-3 dark:border-blue-900">
              <CellContent row={row} column={descriptionColumn} locale={locale} />
            </span>
          </TableCell>
        </TableRow>
      )}
      {subGridColumns.map((column) => {
        const nestedRows = row[column.key];
        if (!Array.isArray(nestedRows) || nestedRows.length === 0) return null;

        const grid = column.subGrid === true ? {} : column.subGrid;
        const gridKey = `${id}-${column.key}`;
        const collapsible = grid?.collapsible !== false;
        const collapsed = collapsible && !expandedSubGrids.includes(gridKey);
        const title = grid?.title ?? column.label;

        return (
          <TableRow key={gridKey} className="hover:bg-transparent">
            <TableCell colSpan={columnCount} className="pt-0">
              <div className="mt-2">
                {collapsible && (
                  <button
                    onClick={() => toggleSubGrid(gridKey)}
                    className="mb-2 flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {title}
                    <span className="font-normal text-gray-400 dark:text-gray-500">{nestedRows.length} {t("items")}</span>
                  </button>
                )}
                {!collapsed && <NestedGrid column={column} rows={nestedRows} locale={locale} showTitle={!collapsible} />}
              </div>
            </TableCell>
          </TableRow>
        );
      })}
      </Fragment>
    );
  }

  return (
    <TableRoot>
      <Table>
        <TableHead
          filterRow={
            config.fieldSearchKeys.length > 0 && (
              <>
                {config.selectable && <TableHeaderCell className="w-[30px] min-w-[30px] max-w-[30px] px-2" />}
                {visibleColumns.map((column) => (
                  <TableHeaderCell key={column.key}>
                    {config.fieldSearchKeys.includes(column.key) && (
                      <Input
                        value={fieldFilters[column.key] ?? ""}
                        onChange={(event) =>
                          onFieldFiltersChange((current) => ({
                            ...current,
                            [column.key]: event.target.value,
                          }))
                        }
                        placeholder={`${column.label}…`}
                        className="min-w-24 py-1.5 normal-case"
                      />
                    )}
                  </TableHeaderCell>
                ))}
                {showActions && <TableHeaderCell />}
              </>
            )
          }
        >
          {config.selectable && (
            <TableHeaderCell className="w-[30px] min-w-[30px] max-w-[30px] px-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() => onToggleSelectAll(rows)}
                className="h-4 w-4 accent-blue-600"
              />
            </TableHeaderCell>
          )}
          {visibleColumns.map((col) => (
            <TableHeaderCell
              key={col.key}
              className={cx(col.align === "right" && "text-right", col.align === "center" && "text-center")}
            >
              {config.sortable && col.sortable !== false ? (
                <button
                  onClick={() => onToggleSort(col.key)}
                  className="inline-flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {col.label}
                  <SortIcon active={sortKey === col.key} dir={sortDir} />
                </button>
              ) : (
                col.label
              )}
            </TableHeaderCell>
          ))}
          {showActions && <TableHeaderCell className="text-right">{t("edit")}</TableHeaderCell>}
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount} className="p-0">
                <EmptyState title={t("emptyTitle")} hint={t("emptyHint")} />
              </TableCell>
            </TableRow>
          ) : groups
            ? groups.flatMap((group) => {
                const collapsed = collapsedGroups.includes(group.key);
                const label =
                  group.key === "__empty__"
                    ? t("emptyGroup")
                    : formatValue(group.value, groupColumn, locale);
                return [
                  <TableRow key={`group-${group.key}`} className="bg-gray-50 hover:bg-gray-50 dark:bg-gray-900/70 dark:hover:bg-gray-900/70">
                    <TableCell colSpan={columnCount} className="p-0">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300"
                        onClick={() => toggleGroup(group.key)}
                      >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {t("group")}: {label}
                        <span className="font-normal text-gray-400 dark:text-gray-500">{group.rows.length} {t("items")}</span>
                      </button>
                    </TableCell>
                  </TableRow>,
                  ...(!collapsed ? group.rows.map((row) => renderRow(row, rows.indexOf(row))) : []),
                ];
              })
            : rows.map(renderRow)}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
