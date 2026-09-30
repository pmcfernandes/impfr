import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { cx } from './cx.js'
import { CheckIcon, IndeterminateIcon } from './Icons.jsx'

export function Checkbox({ checked = false, onChange, onCheckedChange, id, disabled, className = '', ...props }) {
  const state = checked === 'indeterminate' ? 'indeterminate' : Boolean(checked)
  const handle = (next) => {
    const value = next === 'indeterminate' ? next : Boolean(next)
    if (typeof onCheckedChange === 'function') onCheckedChange(value)
    if (typeof onChange === 'function') onChange({ target: { checked: value === true, value } })
  }
  return (
    <RadixCheckbox.Root
      id={id}
      checked={state}
      onCheckedChange={handle}
      disabled={disabled}
      className={cx(
        'flex h-4 w-4 flex-none cursor-pointer items-center justify-center rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600',
        className
      )}
      {...props}
    >
      <RadixCheckbox.Indicator>
        {state === 'indeterminate' ? <IndeterminateIcon /> : <CheckIcon />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
