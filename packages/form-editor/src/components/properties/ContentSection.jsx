import { useLanguage } from '../../i18n/index.jsx'
import { Checkbox, DatePicker, Input, Select, Textarea } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

const PLACEHOLDER_TYPES = ['text', 'textarea', 'number', 'email', 'password']
const OPTIONS_TYPES = ['select', 'radio', 'checkboxgroup']

function DefaultControl({ field, patch }) {
  const { t } = useLanguage()
  if (field.type === 'textarea') {
    return <Textarea rows={2} value={field.defaultValue || ''} onChange={(e) => patch({ defaultValue: e.target.value })} />
  }
  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
        <Checkbox checked={field.defaultValue === '1' || field.defaultValue === true || field.defaultValue === 'true'} onChange={(e) => patch({ defaultValue: e.target.checked ? '1' : '' })} />
        <span>{t('field.startChecked')}</span>
      </label>
    )
  }
  if (OPTIONS_TYPES.includes(field.type)) {
    return (
      <Select value={field.defaultValue || ''} onChange={(e) => patch({ defaultValue: e.target.value })}>
        <option value="">{t('field.noValue')}</option>
        {(field.options || []).map((opt, i) => (
          <option key={`${opt.value}-${i}`} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    )
  }
  if (field.type === 'date') {
    return <DatePicker value={field.defaultValue ?? ''} onChange={(e) => patch({ defaultValue: e.target.value })} />
  }
  if (field.type === 'file') return null
  const inputType = field.type === 'number' ? 'number' : field.type === 'password' ? 'password' : 'text'
  return <Input type={inputType} value={field.defaultValue ?? ''} onChange={(e) => patch({ defaultValue: e.target.value })} />
}

export default function ContentSection({ field, patch }) {
  const { t } = useLanguage()
  const hasPlaceholder = PLACEHOLDER_TYPES.includes(field.type)
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.content')}</h3>
      {hasPlaceholder && (
        <Row label={t('field.placeholder')} htmlFor="prop-placeholder">
          <Input id="prop-placeholder" value={field.placeholder || ''} onChange={(e) => patch({ placeholder: e.target.value })} />
        </Row>
      )}
      <Row label={t('field.defaultValue')}>
        <DefaultControl field={field} patch={patch} />
      </Row>
    </section>
  )
}
