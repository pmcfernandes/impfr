import { cx } from "./cx.js";

/** Tabela estilo Tremor Raw: TableRoot > Table > Head/Body. */
export function TableRoot({ children, className }) {
  return <div className={cx("w-full overflow-x-auto", className)}>{children}</div>;
}

export function Table({ children }) {
  return <table className="w-full text-sm">{children}</table>;
}

/** `filterRow` permite uma linha de filtros imediatamente abaixo dos cabeçalhos. */
export function TableHead({ children, filterRow }) {
  return (
    <thead>
      <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:text-gray-400">
        {children}
      </tr>
      {filterRow && (
        <tr className="border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/30">
          {filterRow}
        </tr>
      )}
    </thead>
  );
}

export function TableHeaderCell({ children, className, ...props }) {
  return (
    <th className={cx("px-4 py-2.5 font-medium", className)} {...props}>
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{children}</tbody>;
}

export function TableRow({ children, className, ...props }) {
  return (
    <tr
      className={cx(
        "transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/60",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className, ...props }) {
  return (
    <td className={cx("px-4 py-3 text-gray-700 dark:text-gray-200", className)} {...props}>
      {children}
    </td>
  );
}
