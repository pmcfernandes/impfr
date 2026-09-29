import { cx } from "../../ui/cx.js";

const variants = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100",
};

export function AlertBox({ icon, title, description, variant = "info", className, children }) {
  return (
    <div className={cx("flex gap-3 rounded-lg border p-4", variants[variant] ?? variants.info, className)} role="alert">
      {icon && <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center">{icon}</span>}
      <div className="min-w-0">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && <p className="mt-1 text-sm opacity-80">{description}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}
