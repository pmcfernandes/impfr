import { cx } from "./cx.js";

const variants = {
  primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900",
  danger: "border-transparent bg-rose-600 text-white hover:bg-rose-700",
};

export function Button({ className, type = "button", variant = "primary", ...props }) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        variants[variant] ?? variants.primary,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
