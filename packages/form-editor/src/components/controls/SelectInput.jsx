import { useLanguage } from '../../i18n/index.jsx'
import { Select } from '../../ui/index.js'

export default function SelectInput({ field, value, onChange, error, disabled, inputId }) {
  const { t } = useLanguage()
  const options = field.options || []
  return (
    <Select
      id={inputId}
      value={value ?? ''}
      disabled={disabled}
      error={Boolean(error)}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{t('fields.selectPlaceholder')}</option>
      {options.map((opt, i) => (
        <option key={`${opt.value}-${i}`} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  )
}
