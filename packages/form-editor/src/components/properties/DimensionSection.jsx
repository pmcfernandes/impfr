import { useLanguage } from '../../i18n/index.jsx'
import { Input } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function DimensionSection({ field, patch }) {
  const { t } = useLanguage()
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.dimension')}</h3>
      <Row label={t('field.rows')} htmlFor="prop-rows">
        <Input id="prop-rows" type="number" min={2} max={20} value={field.rows || 4} onChange={(e) => patch({ rows: Number(e.target.value) })} />
      </Row>
    </section>
  )
}
