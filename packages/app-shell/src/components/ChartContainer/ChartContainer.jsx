import { Card } from "../../ui/Card.jsx";
import { cx } from "../../ui/cx.js";

export function ChartContainer({ title,  description, actions, children, className }) {
  return (
    <Card className={cx("p-0", className)}>
      {(title || actions) && (
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800">
          <div>
            {title && <h2 className="text-sm font-semibold text-gray-950 dark:text-gray-50">{title}</h2>}
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </Card>
  );
}
