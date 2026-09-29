import { useLanguage } from '../../i18n/index.jsx'

export function Row({ label, hint, error, htmlFor, children }) {
  return (
    <div className="props-row flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {!error && hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

export const sectionClass = 'props-section flex flex-col gap-2.5 border-t border-gray-100 pt-4'
export const sectionTitle = 'text-xs font-semibold uppercase tracking-wide text-gray-500'

export function SectionHeader({ title, badge, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className={sectionTitle}>{title}</h3>
      {badge}
      {children}
    </div>
  )
}
