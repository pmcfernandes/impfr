import { cx } from './cx.js'
import { calloutColors } from './theme.js'

export function Callout({ color = 'red', className = '', children, ...props }) {
  return (
    <div
      role="alert"
      className={cx('flex gap-2.5 rounded-lg px-3.5 py-3 text-sm font-medium ring-1 ring-inset', calloutColors[color], className)}
      {...props}
    >
      <span aria-hidden="true" className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-current text-[10px] font-bold">
        !
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
