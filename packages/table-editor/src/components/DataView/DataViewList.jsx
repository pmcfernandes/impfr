import { Pencil, Trash2 } from "lucide-react";
import { getRowId } from "../../core/config.js";
import { formatValue } from "../../core/formatting.js";
import { getColumnTemplate, renderTemplateValue } from "../../core/templates.js";
import { Badge, EmptyState, IconButton, badgeVariantFor } from "../../ui/index.js";

/** Valor de uma coluna na vista lista (com suporte a template). */
function ListValue({ row, column, locale }) {
  const template = getColumnTemplate(column, "list");
  if (template != null) {
    return <>{renderTemplateValue(template, row[column.key], "list")}</>;
  }
  if (column.type === "badge" || column.render === "badge") {
    return (
      <Badge variant={badgeVariantFor(row[column.key], column.badgeMap)}>
        {String(row[column.key])}
      </Badge>
    );
  }
  return <>{formatValue(row[column.key], column, locale)}</>;
}

/**
 * Vista em lista: primeira coluna como título, restantes como meta.
 * Ideal para equipas, contactos, tarefas simples.
 */
export function DataViewList({ config, rows, locale, onEdit, onDelete, t }) {
  if (rows.length === 0) return <EmptyState title={t("emptyTitle")} hint={t("emptyHint")} />;

  const [primary, ...rest] = config.columns;

  return (
    <ul className="divide-y divide-gray-100 px-5 dark:divide-gray-800">
      {rows.map((row, i) => {
        const id = getRowId(row, config.idKey, i);
        return (
          <li key={id} className="flex items-center gap-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {String(row[primary?.key] ?? "?").slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                {primary ? (
                  <ListValue row={row} column={primary} locale={locale} />
                ) : (
                  id
                )}
              </p>
              <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                {rest.slice(0, 4).map((col) =>
                  (col.type === "badge" || col.render === "badge") &&
                  getColumnTemplate(col, "list") == null ? (
                    <Badge key={col.key} variant={badgeVariantFor(row[col.key], col.badgeMap)}>
                      {String(row[col.key])}
                    </Badge>
                  ) : (
                    <span key={col.key} className="truncate text-xs text-gray-500">
                      <ListValue row={row} column={col} locale={locale} />
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
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
          </li>
        );
      })}
    </ul>
  );
}
