import { cx } from "../../ui/cx.js";

export function TableRoot({ className, ...props }) {
  return <div className={cx("overflow-x-auto", className)} {...props} />;
}

export function Table({ className, ...props }) {
  return <table className={cx("w-full text-left text-sm", className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return <thead className={cx("border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cx("divide-y divide-gray-200 dark:divide-gray-800", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={className} {...props} />;
}

export function TableHeaderCell({ className, ...props }) {
  return <th className={cx("pb-3 font-medium", className)} {...props} />;
}

export function TableCell({ className, ...props }) {
  return <td className={cx("py-4 text-gray-700 dark:text-gray-300", className)} {...props} />;
}
