import { cx } from './cx.js'
import { badgeColors } from './theme.js'

export function Badge({ color = 'blue', className = '', children, ...props }) {
  return (
    <span
      className={cx(
        'inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset',
        badgeColors[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
