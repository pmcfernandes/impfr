import { RECORD_STATUS_META } from './types.js'

function dateOnly(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function statusLabel(status) {
  return (RECORD_STATUS_META[status] || RECORD_STATUS_META.pendente).label
}

export function statusColor(status) {
  return (RECORD_STATUS_META[status] || RECORD_STATUS_META.pendente).color
}

export function formAvailability(form, now = new Date()) {
  const from = (form && form.available_from) || ''
  const to = (form && form.available_to) || ''
  const hasRange = from !== '' || to !== ''
  if (!hasRange) return { available: true, hasRange, from, to }
  const pad = (n) => String(n).padStart(2, '0')
  const nowStr = `${dateOnly(now)} ${pad(now.getHours())}:${pad(now.getMinutes())}`
  const lower = from.length === 10 ? `${from} 00:00` : from
  const upper = to.length === 10 ? `${to} 23:59` : to
  const afterStart = lower === '' || nowStr >= lower
  const beforeEnd = upper === '' || nowStr <= upper
  return { available: afterStart && beforeEnd, hasRange, from, to }
}
