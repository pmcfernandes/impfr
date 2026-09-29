import { cx } from "../../ui/cx.js";

const variants = {
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

export function Badge({ variant = "neutral", className, children }) {
  return (
    <span className={cx("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", variants[variant] ?? variants.neutral, className)}>
      {children}
    </span>
  );
}
