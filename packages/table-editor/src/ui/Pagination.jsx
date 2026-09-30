import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button.jsx";

export function Pagination({ page, totalPages, total, pageSize, onPage, t }) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {t("showing")} {start}–{end} {t("of")} {total} {t("rows")}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-2 text-xs font-medium text-gray-600 dark:text-gray-300">
          {page} / {totalPages}
        </span>
        <Button variant="ghost" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
