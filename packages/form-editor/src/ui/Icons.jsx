export function ChevronDownIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function CalendarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2.75" y="4.25" width="14.5" height="13" rx="2" />
      <path d="M2.75 8.25h14.5M6.5 2.75v3M13.5 2.75v3" strokeLinecap="round" />
    </svg>
  )
}

export function EmbedIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M7.2 5.8 3.4 10l3.8 4.2M12.8 5.8 16.6 10l-3.8 4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-white" aria-hidden="true">
      <path
        d="M1.8 5.2 4 7.4l4.2-4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IndeterminateIcon() {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-white" aria-hidden="true">
      <path d="M2 5h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
