import { cx } from './cx.js'

export function Title({ className = '', children, ...props }) {
  return (
    <h3 className={cx('text-lg font-semibold text-gray-900 dark:text-gray-50', className)} {...props}>
      {children}
    </h3>
  )
}

export function Subtitle({ className = '', children, ...props }) {
  return (
    <p className={cx('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  )
}

export function Text({ className = '', children, ...props }) {
  return (
    <p className={cx('text-sm text-gray-700 dark:text-gray-300', className)} {...props}>
      {children}
    </p>
  )
}
