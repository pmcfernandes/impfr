import { Pencil, Trash2 } from "lucide-react";
import { getRowId } from "../../core/config.js";
import { formatValue } from "../../core/formatting.js";
import { getColumnTemplate, renderTemplateValue } from "../../core/templates.js";
import { Badge, EmptyState, IconButton, badgeVariantFor } from "../../ui/index.js";

/** Valor de uma coluna na vista cartões (com suporte a template). */
function CardValue({ row, column, locale }) {
  const template = getColumnTemplate(column, "cards");
  if (template != null) {
    return <>{renderTemplateValue(template, row[column.key], "cards")}</>;
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
 * Vista em cartões: grelha responsiva, cada registo é um card.
 * Ideal para produtos, portfólio, tarefas kanban.
 */
export function DataViewCards({ config, rows, locale, onEdit, onDelete, t }) {
  if (rows.length === 0) return <EmptyState title={t("emptyTitle")} hint={t("emptyHint")} />;

  const [titleCol, ...otherCols] = config.columns;

  return (
    <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row, i) => {
        const id = getRowId(row, config.idKey, i);
        return (
          <article
            key={id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">
                {titleCol ? (
                  <CardValue row={row} column={titleCol} locale={locale} />
                ) : (
                  id
                )}
              </h4>
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
            </div>
            <dl className="mt-3 space-y-1.5">
              {otherCols.slice(0, 5).map((col) => (
                <div key={col.key} className="flex items-center justify-between gap-3 text-sm">
                  <dt className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{col.label}</dt>
                  <dd className="truncate text-right text-gray-800 dark:text-gray-200">
                    <CardValue row={row} column={col} locale={locale} />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
