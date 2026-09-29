import { cx } from "./cx.js";

const variants = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  error: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
};

/** Badge de estado/categoria. `variant` pode vir do JSON via `badgeMap`. */
export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant] ?? variants.default,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Mapeia um valor (ex.: "ativo") para uma variante de Badge. */
export function badgeVariantFor(value, badgeMap = {}) {
  if (value in badgeMap) return badgeMap[value];
  return "default";
}
