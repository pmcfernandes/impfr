import { cx } from "./cx.js";

/** Card — átomo base de todas as secções (padrão Tremor Raw). */
export function Card({ children, className }) {
  return (
    <div
      className={cx(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-gray-950",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, description, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 p-5 pb-0">
      <div>
        {title && (
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">{title}</h3>
        )}
        {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
