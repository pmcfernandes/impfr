import { clampColumns } from '../../core/index.js'
import { useLanguage } from '../../i18n/index.jsx'
import { Input, cx } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function LayoutSection({ field, patch }) {
  const { t } = useLanguage()
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.layout')}</h3>
      <Row label={t('field.columns')} htmlFor="prop-columns" hint={t('field.columnsHint')}>
        <Input id="prop-columns" type="number" min={1} max={12} value={field.columns ?? 12}
          onChange={(e) => patch({ columns: e.target.value === '' ? '' : Number(e.target.value) })}
          onBlur={(e) => patch({ columns: clampColumns(e.target.value) })}
        />
      </Row>
      <div className="column-presets flex flex-wrap gap-1.5">
        {[3, 4, 6, 12].map((n) => (
          <button key={n} type="button"
            className={cx('cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition',
              clampColumns(field.columns) === n ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600'
            )}
            onClick={() => patch({ columns: n })}
          >{n}</button>
        ))}
      </div>
    </section>
  )
}
