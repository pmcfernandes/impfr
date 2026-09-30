import { Children, isValidElement } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { cx } from './cx.js'
import { fieldClasses } from './theme.js'
import { ChevronDownIcon } from './Icons.jsx'

const CLEAR_VALUE = '__fe_clear__'

function optionsFromChildren(children) {
  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => ({ value: String(child.props.value ?? ''), label: child.props.children }))
}

export function Select({
  value = '',
  onChange,
  placeholder = '— Selecione —',
  id,
  name,
  disabled,
  error = false,
  className = '',
  children,
  ...props
}) {
  const options = optionsFromChildren(children)
  const clearLabel = options.find((o) => o.value === '')?.label ?? placeholder
  const hasClear = options.some((o) => o.value === '')
  const items = options.map((o) => (o.value === '' ? { ...o, value: CLEAR_VALUE } : o))
  const radixValue =
    value === '' || value === undefined || value === null ? (hasClear ? CLEAR_VALUE : undefined) : String(value)

  const handle = (next) => {
    if (typeof onChange !== 'function') return
    onChange({ target: { value: next === CLEAR_VALUE ? '' : String(next), name } })
  }

  return (
    <RadixSelect.Root value={radixValue} onValueChange={handle} disabled={disabled}>
      <RadixSelect.Trigger
        id={id}
        data-select-trigger=""
        className={cx(
          fieldClasses,
          'flex cursor-pointer items-center justify-between gap-2 text-left',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      >
        <span className="truncate">
          <RadixSelect.Value placeholder={clearLabel} />
        </span>
        <RadixSelect.Icon>
          <ChevronDownIcon className="h-4 w-4 flex-none text-gray-400 dark:text-gray-500" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-72 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg"
          style={{ minWidth: 'var(--radix-select-trigger-width)' }}
        >
          <RadixSelect.Viewport className="p-1">
            {items.map((item) => (
              <RadixSelect.Item
                key={item.value}
                value={item.value}
                className="flex cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-300 outline-none data-[highlighted]:bg-blue-50 dark:data-[highlighted]:bg-blue-950 data-[highlighted]:text-blue-700 dark:data-[highlighted]:text-blue-300 data-[state=checked]:font-semibold"
              >
                <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="ml-auto pl-2 text-blue-600 dark:text-blue-400">✓</RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
