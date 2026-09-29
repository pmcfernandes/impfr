import { cx } from "./cx.js";

export function Card({ className, ...props }) {
  return (
    <section
      className={cx(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950",
        className,
      )}
      {...props}
    />
  );
}
