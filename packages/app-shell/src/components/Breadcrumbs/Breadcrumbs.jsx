import { ChevronRight } from "lucide-react";
import { cx } from "../../ui/cx.js";

export function Breadcrumbs({ items = [], className }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className="flex items-center gap-1.5" key={item.href ?? item.label}>
              {index > 0 && <ChevronRight aria-hidden="true" className="text-gray-400" size={14} />}
              {item.href && !isCurrent ? (
                <a className="text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined} className={cx(isCurrent ? "font-medium text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-400")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
