import { Checkbox, cx } from '../../ui/index.js'

export default function CheckboxGroupInput({ field, value, onChange, error, disabled }) {
  const options = field.options || []
  const list = Array.isArray(value) ? value : []
  return (
    <div className={cx('option-list flex flex-col gap-1.5 rounded-lg', error && 'rounded-md ring-1 ring-red-400')}>
      {options.map((opt, i) => (
        <label className="option-item flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300" key={`${opt.value}-${i}`}>
          <Checkbox
            checked={list.includes(opt.value)}
            disabled={disabled}
            onChange={(e) =>
              onChange(e.target.checked ? [...list, opt.value] : list.filter((v) => v !== opt.value))
            }
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
