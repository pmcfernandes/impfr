import { Search } from "lucide-react";
import { cx } from "./cx.js";

export function Input({ className, ...props }) {
  return (
    <input
      className={cx(
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        className,
      )}
      {...props}
    />
  );
}

export function SearchInput({ value, onChange, placeholder, className }) {
  return (
    <div className={cx("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <Input value={value} onChange={onChange} placeholder={placeholder} className="pl-9" />
    </div>
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cx(
        "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
        "dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">{hint}</span>}
    </label>
  );
}
