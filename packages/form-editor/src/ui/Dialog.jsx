import { cx } from './cx.js'
import { CloseButton } from './CloseButton.jsx'

export function Dialog({ open, onClose, title, description, className = '', children }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          'modal flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-950 shadow-2xl ring-1 ring-gray-950/10 dark:border dark:border-gray-600',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-700 px-6 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
            {description && <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          <CloseButton onClick={onClose} />
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
