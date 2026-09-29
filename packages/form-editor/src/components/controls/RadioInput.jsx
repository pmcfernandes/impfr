import { RadioGroup, RadioGroupItem, cx } from '../../ui/index.js'

export default function RadioInput({ field, value, onChange, error, disabled, inputId }) {
  const options = field.options || []
  return (
    <RadioGroup
      className={cx('option-list flex flex-col gap-1.5 rounded-lg', error && 'rounded-md ring-1 ring-red-400')}
      value={value || undefined}
      disabled={disabled}
      onValueChange={(v) => onChange(v)}
      aria-label={field.label}
    >
      {options.map((opt, i) => (
        <div className="option-item flex items-center gap-2 text-sm text-gray-700" key={`${opt.value}-${i}`}>
          <RadioGroupItem value={opt.value} id={`${inputId}-r${i}`} />
          <label htmlFor={`${inputId}-r${i}`} className="cursor-pointer">
            {opt.label}
          </label>
        </div>
      ))}
    </RadioGroup>
  )
}
