import * as RadixRadio from '@radix-ui/react-radio-group'
import { cx } from './cx.js'

export function RadioGroup({ value, onChange, onValueChange, className = '', children, ...props }) {
  const handle = (next) => {
    if (typeof onValueChange === 'function') onValueChange(next)
    if (typeof onChange === 'function') onChange({ target: { value: next } })
  }
  return (
    <RadixRadio.Root
      value={value === '' || value === null || value === undefined ? undefined : String(value)}
      onValueChange={handle}
      className={className}
      {...props}
    >
      {children}
    </RadixRadio.Root>
  )
}

export function RadioGroupItem({ className = '', ...props }) {
  return (
    <RadixRadio.Item
      className={cx(
        'flex h-4 w-4 flex-none cursor-pointer items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600',
        className
      )}
      {...props}
    >
      <RadixRadio.Indicator className="h-1.5 w-1.5 rounded-full bg-white" />
    </RadixRadio.Item>
  )
}
