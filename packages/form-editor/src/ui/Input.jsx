import { cx } from './cx.js'
import { fieldClasses } from './theme.js'

export function Input({ error = false, className = '', ...props }) {
  return (
    <input
      className={cx(fieldClasses, error && 'border-red-400 focus:border-red-500 focus:ring-red-500/30', className)}
      {...props}
    />
  )
}

export function Textarea({ error = false, className = '', ...props }) {
  return (
    <textarea
      className={cx(fieldClasses, 'resize-y', error && 'border-red-400 focus:border-red-500 focus:ring-red-500/30', className)}
      {...props}
    />
  )
}
