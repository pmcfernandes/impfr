import { useLanguage } from '../../i18n/index.jsx'
import { Badge, Input } from '../../ui/index.js'
import { Row, SectionHeader, sectionClass } from './Row.jsx'

export default function PatternSection({ field, patternError, patch }) {
  const { t } = useLanguage()
  const patternValue = field.pattern || ''
  let patternInvalid = false
  if (patternValue !== '') {
    try { new RegExp(patternValue) } catch { patternInvalid = true }
  }

  return (
    <section className={sectionClass}>
      <SectionHeader
        title={t('field.pattern')}
        badge={<Badge color={patternValue ? (patternInvalid ? 'red' : 'emerald') : 'gray'}>{patternValue ? (patternInvalid ? t('field.patternInvalid') : t('field.patternActive')) : t('field.patternOff')}</Badge>}
      />
      <Row label={t('field.patternLabel')} htmlFor="prop-pattern" error={patternError} hint={t('field.patternHint')}>
        <Input id="prop-pattern" className="font-mono text-xs" placeholder="^[A-Za-z]{3}-\\d{4}$" value={patternValue} onChange={(e) => patch({ pattern: e.target.value })} />
      </Row>
      <Row label={t('field.patternMessage')} htmlFor="prop-pattern-message" hint={t('field.patternMessageHint')}>
        <Input id="prop-pattern-message" placeholder={t('field.patternMessagePlaceholder')} value={field.patternMessage || ''} onChange={(e) => patch({ patternMessage: e.target.value })} />
      </Row>
    </section>
  )
}
