import { Checkbox } from '../../ui/index.js'

export default function CheckboxInput({ field, value, onChange, disabled, inputId }) {
  return (
    <div className="checkbox-line flex items-center gap-2">
      <Checkbox
        id={inputId}
        checked={value === true}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={inputId} className="cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-50">
        {field.label}
      </label>
    </div>
  )
}
