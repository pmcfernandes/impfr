import { FIELD_TYPES } from '../core/index.js'
import { useLanguage } from '../i18n/index.jsx'

export default function Palette({ onAdd }) {
  const { t } = useLanguage()
  return (
    <aside className="palette flex min-h-0 flex-col rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3.5 lg:overflow-y-auto">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('palette.title')}</h2>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('palette.hint')}</p>
      <div className="mt-3 flex flex-col gap-2">
        {FIELD_TYPES.map((type) => (
          <div
            key={type.type}
            className="palette-item flex cursor-grab touch-none items-center gap-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2.5 py-2 select-none transition hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 active:cursor-grabbing"
            role="button"
            tabIndex={0}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', 'new:' + type.type)
              e.dataTransfer.effectAllowed = 'copy'
            }}
            onDoubleClick={() => onAdd(type.type)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onAdd(type.type)
              }
            }}
          >
            <span className="type-badge flex h-6 min-w-[30px] flex-none items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950 px-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300">
              {t(`fields.badge.${type.type}`)}
            </span>
            <span className="flex min-w-0 flex-col">
              <strong className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">{t(`fields.${type.type}`)}</strong>
              <small className="truncate text-xs text-gray-500 dark:text-gray-400">{t(`fields.${type.type}Hint`)}</small>
            </span>
          </div>
        ))}
      </div>
    </aside>
  )
}
