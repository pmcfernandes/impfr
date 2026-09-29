import { cx } from "../../ui/cx.js";

export function SubHeader({ title, description, actions, className }) {
  return (
    <div className={cx("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
