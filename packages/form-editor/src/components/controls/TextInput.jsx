import { Input } from '../../ui/index.js'

export default function TextInput({ field, value, onChange, error, disabled, readOnly, inputId }) {
  const inputType = field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'password' ? 'password' : 'text'
  return (
    <Input
      id={inputId}
      type={inputType}
      autoComplete={field.autocomplete ?? (field.type === 'password' ? 'new-password' : undefined)}
      value={value ?? ''}
      placeholder={field.placeholder || ''}
      disabled={disabled}
      readOnly={readOnly}
      className={readOnly ? 'bg-gray-50! dark:bg-gray-900! cursor-default' : ''}
      error={Boolean(error)}
      min={field.type === 'number' && field.min !== '' && field.min !== undefined ? field.min : undefined}
      max={field.type === 'number' && field.max !== '' && field.max !== undefined ? field.max : undefined}
      step={field.type === 'number' && field.step !== '' && field.step !== undefined ? field.step : undefined}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
