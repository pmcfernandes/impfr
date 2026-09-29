export function fmtDateTime(sql, locale = 'pt-PT') {
  if (!sql) return ''
  const d = new Date(String(sql).replace(' ', 'T') + (String(sql).includes('Z') ? '' : 'Z'))
  if (Number.isNaN(d.getTime())) return String(sql)
  return d.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function fmtDate(sql, locale = 'pt-PT') {
  if (!sql) return ''
  const d = new Date(String(sql).replace(' ', 'T') + (String(sql).includes('Z') ? '' : 'Z'))
  if (Number.isNaN(d.getTime())) return String(sql)
  return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function fmtWhen(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/.exec(String(iso || ''))
  if (!m) return String(iso || '')
  const date = `${m[3]}/${m[2]}/${m[1]}`
  return m[4] ? `${date} ${m[4]}:${m[5]}` : date
}

export function rangeLabel(from, to) {
  if (from && to) return `${fmtWhen(from)} – ${fmtWhen(to)}`
  if (from) return `a partir de ${fmtWhen(from)}`
  if (to) return `até ${fmtWhen(to)}`
  return ''
}
