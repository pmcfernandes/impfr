import { useLanguage } from '../../i18n/index.jsx'
import { Input } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function NumberLimitsSection({ field, patch }) {
  const { t } = useLanguage()
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.limits')}</h3>
      <div className="grid grid-cols-3 gap-2">
        <Row label={t('field.min')} htmlFor="prop-min">
          <Input id="prop-min" value={field.min ?? ''} onChange={(e) => patch({ min: e.target.value })} />
        </Row>
        <Row label={t('field.max')} htmlFor="prop-max">
          <Input id="prop-max" value={field.max ?? ''} onChange={(e) => patch({ max: e.target.value })} />
        </Row>
        <Row label={t('field.step')} htmlFor="prop-step">
          <Input id="prop-step" value={field.step ?? ''} onChange={(e) => patch({ step: e.target.value })} />
        </Row>
      </div>
    </section>
  )
}
