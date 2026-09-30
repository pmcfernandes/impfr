import { cx } from './cx.js'

export function TableRoot({ className = '', children }) {
  return <div className={cx('overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm', className)}>{children}</div>
}

export function Table({ className = '', children }) {
  return <table className={cx('w-full min-w-[640px] border-collapse text-left text-sm', className)}>{children}</table>
}

export function TableHead({ className = '', children }) {
  return <thead className={cx('bg-gray-50 dark:bg-gray-900', className)}>{children}</thead>
}

export function TableBody({ className = '', children }) {
  return <tbody className={cx('divide-y divide-gray-100 dark:divide-gray-800', className)}>{children}</tbody>
}

export function TableRow({ className = '', children, ...props }) {
  return (
    <tr className={cx('transition-colors hover:bg-gray-50/70 dark:hover:bg-gray-900/70', className)} {...props}>
      {children}
    </tr>
  )
}

export function TableHeaderCell({ className = '', children, ...props }) {
  return (
    <th className={cx('px-4 py-2.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className = '', children, ...props }) {
  return (
    <td className={cx('px-4 py-3 align-top text-gray-700 dark:text-gray-300', className)} {...props}>
      {children}
    </td>
  )
}
