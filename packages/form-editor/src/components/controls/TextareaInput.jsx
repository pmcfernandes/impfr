import { Textarea } from '../../ui/index.js'

export default function TextareaInput({ field, value, onChange, error, disabled, readOnly, inputId }) {
  return (
    <Textarea
      id={inputId}
      rows={field.rows || 4}
      value={value ?? ''}
      placeholder={field.placeholder || ''}
      disabled={disabled}
      readOnly={readOnly}
      className={readOnly ? 'bg-gray-50! cursor-default' : ''}
      error={Boolean(error)}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
