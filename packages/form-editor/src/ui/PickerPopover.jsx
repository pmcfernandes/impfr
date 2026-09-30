import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import dayPickerCss from 'react-day-picker/style.css?inline'

if (typeof document !== 'undefined' && !document.getElementById('fe-day-picker-css')) {
  const style = document.createElement('style')
  style.id = 'fe-day-picker-css'
  style.textContent = dayPickerCss
  document.head.appendChild(style)
}

export function popoverPosition(triggerRef) {
  const rect = triggerRef.current.getBoundingClientRect()
  return {
    top: Math.max(8, Math.min(rect.bottom + 6, window.innerHeight - 380)),
    left: Math.max(8, Math.min(rect.left, window.innerWidth - 350)),
  }
}

export function PickerPopover({ triggerRef, pos, onClose, children }) {
  const popRef = useRef(null)
  useEffect(() => {
    const onDown = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return
      if (popRef.current && popRef.current.contains(e.target)) return
      onClose()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose, triggerRef])

  return createPortal(
    <div
      ref={popRef}
      className="fe-picker fixed z-50 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50 p-3 shadow-xl"
      style={{ top: pos.top, left: pos.left }}
    >
      {children}
    </div>,
    document.body
  )
}

export function DayPickerField({ selected, onSelect }) {
  return (
    <DayPicker
      mode="single"
      locale={ptBR}
      weekStartsOn={1}
      selected={selected}
      onSelect={onSelect}
    />
  )
}
