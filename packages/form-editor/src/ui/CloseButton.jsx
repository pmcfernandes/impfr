import { cx } from './cx.js'

export function CloseButton({ onClick, label = 'Fechar', size = 'md', className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx(
        'flex cursor-pointer flex-none items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
        size === 'sm' ? 'h-7 w-7' : 'h-8 w-8',
        className
      )}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden="true">
        <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" strokeLinecap="round" />
      </svg>
    </button>
  )
}
