import { DatePicker } from '../../ui/index.js'

export default function DateInput({ field, value, onChange, error, disabled, inputId }) {
  return (
    <DatePicker
      id={inputId}
      value={value ?? ''}
      placeholder={field.placeholder || 'dd/mm/aaaa'}
      disabled={disabled}
      error={Boolean(error)}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
