import { useRef, useState } from 'react'
import { cx } from './cx.js'
import { fieldClasses } from './theme.js'
import { CalendarIcon } from './Icons.jsx'
import { CloseButton } from './CloseButton.jsx'
import { PickerPopover, DayPickerField, popoverPosition } from './PickerPopover.jsx'
import { parseISODate, toISODate, formatWhen } from './dateHelpers.js'

const triggerClass =
  'flex cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50'

export function DateTimePicker({
  value = '',
  onChange,
  id,
  placeholder = 'dd/mm/aaaa hh:mm',
  disabled,
  error = false,
  className = '',
  defaultTime = '00:00',
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const raw = String(value || '')
  const day = /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : ''
  const time = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(raw) ? raw.slice(11, 16) : ''
  const selected = parseISODate(day)

  const toggle = () => {
    if (disabled) return
    if (open) return setOpen(false)
    setPos(popoverPosition(triggerRef))
    setOpen(true)
  }

  const emit = (nextDay, nextTime) => {
    if (typeof onChange !== 'function') return
    onChange({ target: { value: `${nextDay} ${nextTime}` } })
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
          'datetime-picker',
          triggerClass,
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/30',
          !selected && 'text-gray-400',
          className
        )}
        onClick={toggle}
      >
        <span className="truncate">{selected ? formatWhen(raw) : placeholder}</span>
        <CalendarIcon className="h-4 w-4 flex-none text-gray-400" />
      </button>
      {open && (
        <PickerPopover triggerRef={triggerRef} pos={pos} onClose={() => setOpen(false)}>
          <DayPickerField
            selected={selected}
            onSelect={(d) => {
              if (d) emit(toISODate(d), time || defaultTime)
              else setOpen(false)
            }}
          />
          <div className="mt-2 flex items-center gap-2 border-t border-gray-100 pt-2">
            <label className="text-xs font-semibold text-gray-500" htmlFor={`${id}-time`}>
              Hora
            </label>
            <input
              id={`${id}-time`}
              type="time"
              className={cx(fieldClasses, 'w-auto py-1')}
              value={time || defaultTime}
              onChange={(e) => emit(day || toISODate(new Date()), e.target.value)}
            />
            <CloseButton size="sm" className="ml-auto" onClick={() => setOpen(false)} />
          </div>
        </PickerPopover>
      )}
    </>
  )
}
