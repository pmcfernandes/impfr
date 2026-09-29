import { Card } from "../../ui/Card.jsx";
import { cx } from "../../ui/cx.js";

const changeStyles = {
  positive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  negative: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export function Kpi({ title, value, change, changeType = "neutral", description, className }) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {change && (
          <span className={cx("rounded-md px-2 py-1 text-xs font-semibold", changeStyles[changeType] ?? changeStyles.neutral)}>
            {change}
          </span>
        )}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{value}</p>
      {description && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </Card>
  );
}
