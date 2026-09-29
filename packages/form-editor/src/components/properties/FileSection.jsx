import { useLanguage } from '../../i18n/index.jsx'
import { Checkbox, Input } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function FileSection({ field, patch }) {
  const { t } = useLanguage()
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.fileSection')}</h3>
      <Row label={t('field.maxSize')} htmlFor="prop-maxsize" hint={t('field.maxSizeHint')}>
        <Input id="prop-maxsize" type="number" min={0.1} step={0.1} value={field.maxSizeMb ?? 5}
          onChange={(e) => patch({ maxSizeMb: e.target.value === '' ? '' : Number(e.target.value) })}
          onBlur={(e) => { const n = Number(e.target.value); patch({ maxSizeMb: Number.isFinite(n) && n > 0 ? Math.round(Math.max(0.1, n) * 10) / 10 : 5 }) }}
        />
      </Row>
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
        <Checkbox className="mt-0.5" checked={field.multiple !== false} onChange={(e) => patch({ multiple: e.target.checked })} />
        <span>{t('field.multiple')}</span>
      </label>
      <Row label={t('field.accept')} htmlFor="prop-accept" hint={t('field.acceptHint')}>
        <Input id="prop-accept" value={field.accept || ''} placeholder=".pdf, .jpg, .png" onChange={(e) => patch({ accept: e.target.value })} />
      </Row>
    </section>
  )
}
