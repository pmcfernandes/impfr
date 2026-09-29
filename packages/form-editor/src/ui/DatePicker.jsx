import { useRef, useState } from 'react'
import { cx } from './cx.js'
import { fieldClasses } from './theme.js'
import { CalendarIcon } from './Icons.jsx'
import { CloseButton } from './CloseButton.jsx'
import { PickerPopover, DayPickerField, popoverPosition } from './PickerPopover.jsx'
import { parseISODate, toISODate, formatDayBR } from './dateHelpers.js'

const triggerClass =
  'flex cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50'

export function DatePicker({ value = '', onChange, id, placeholder = 'dd/mm/aaaa', disabled, error = false, className = '' }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const selected = parseISODate(value)

  const toggle = () => {
    if (disabled) return
    if (open) return setOpen(false)
    setPos(popoverPosition(triggerRef))
    setOpen(true)
  }

  const emit = (next) => {
    if (typeof onChange === 'function') onChange({ target: { value: next } })
  }

  return (
    <>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        disabled={disabled}
        className={cx(
          fieldClasses,
          'date-picker',
          triggerClass,
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/30',
          !selected && !value && 'text-gray-400',
          className
        )}
        onClick={toggle}
      >
        <span className="truncate">{selected ? formatDayBR(selected) : placeholder}</span>
        <CalendarIcon className="h-4 w-4 flex-none text-gray-400" />
      </button>
      {open && (
        <PickerPopover triggerRef={triggerRef} pos={pos} onClose={() => setOpen(false)}>
          <DayPickerField
            selected={selected}
            onSelect={(day) => {
              emit(day ? toISODate(day) : '')
              setOpen(false)
            }}
          />
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-100 pt-2">
            <button
              type="button"
              className="cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              onClick={() => {
                emit('')
                setOpen(false)
              }}
            >
              Limpar
            </button>
            <CloseButton size="sm" onClick={() => setOpen(false)} />
          </div>
        </PickerPopover>
      )}
    </>
  )
}
