import { cx } from "./cx.js";

const styles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900",
};

export function Button({ variant = "secondary", className, ...props }) {
  return (
    <button
      className={cx(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant] ?? styles.secondary,
        className,
      )}
      {...props}
    />
  );
}

export function IconButton({ className, title, ...props }) {
  return (
    <button
      title={title}
      aria-label={title}
      className={cx(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:dark:hover:text-gray-100",
        className,
      )}
      {...props}
    />
  );
}
