export function getPath(obj, path) {
  if (!path) return obj
  const parts = String(path)
    .split('.')
    .filter(Boolean)
  let current = obj
  for (const part of parts) {
    if (current === null || current === undefined) return undefined
    current = current[part]
  }
  return current
}

const LIST_KEYS = ['rows', 'items', 'data', 'results', 'list', 'records', 'values', 'options']

export function findArrayPath(data, prefix = '', depth = 0) {
  if (Array.isArray(data)) return prefix
  if (depth >= 5 || data === null || typeof data !== 'object') return null
  const entries = Object.entries(data)

  for (const key of LIST_KEYS) {
    const hit = entries.find(([k]) => k === key)
    if (hit && Array.isArray(hit[1])) return prefix ? `${prefix}.${hit[0]}` : hit[0]
  }
  for (const [key, value] of entries) {
    if (Array.isArray(value)) return prefix ? `${prefix}.${key}` : key
  }
  for (const [key, value] of entries) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nested = findArrayPath(value, prefix ? `${prefix}.${key}` : key, depth + 1)
      if (nested !== null) return nested
    }
  }
  return null
}

export function resolveItems(data, path) {
  const trimmed = String(path || '').trim()
  if (trimmed) {
    const value = getPath(data, trimmed)
    return { path: trimmed, items: Array.isArray(value) ? value : [] }
  }
  if (Array.isArray(data)) return { path: '', items: data }
  const found = findArrayPath(data)
  if (found === null) return { path: '', items: [] }
  const value = found === '' ? data : getPath(data, found)
  return { path: found, items: Array.isArray(value) ? value : [] }
}

export function itemKeys(items) {
  const first = items.find((item) => item && typeof item === 'object' && !Array.isArray(item))
  if (!first) return []
  return [...new Set(Object.keys(first))]
}

export function pickDefaultKey(keys, preferred) {
  for (const candidate of preferred) {
    if (keys.includes(candidate)) return candidate
  }
  return keys.length > 0 ? keys[0] : ''
}

function fallbackSlug(text) {
  const base =
    String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'opcao'
  return base
}

export function mapOptions(items, labelKey, valueKey) {
  const used = new Set()
  const options = []
  const limited = items.slice(0, 500)

  limited.forEach((item, index) => {
    let label
    let rawValue

    if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
      const labelValue = labelKey ? getPath(item, labelKey) : undefined
      const valueValue = valueKey ? getPath(item, valueKey) : undefined
      label = labelValue === undefined || labelValue === null ? '' : String(labelValue)
      rawValue = valueValue === undefined || valueValue === null ? '' : String(valueValue)
    } else {
      label = String(item ?? '')
      rawValue = String(item ?? '')
    }

    if (label === '') label = rawValue !== '' ? rawValue : `Opção ${index + 1}`
    if (rawValue === '') rawValue = fallbackSlug(label)

    let value = rawValue
    let n = 2
    while (used.has(value)) {
      value = `${rawValue}-${n++}`
    }
    used.add(value)
    options.push({ label, value })
  })

  return options
}

export function resolveUrl(input) {
  const value = String(input || '').trim()
  if (value === '') return ''
  try {
    if (typeof window !== 'undefined' && window.location) {
      return new URL(value, window.location.href).href
    }
  } catch {
    /* sem janela: devolve como está */
  }
  return value
}

export function shortUrl(url) {
  try {
    const parsed = new URL(String(url))
    return parsed.host + (parsed.pathname === '/' ? '' : parsed.pathname)
  } catch {
    return String(url || '')
  }
}

export function unwrapPayload(res) {
  if (res && typeof res === 'object' && !Array.isArray(res) && 'data' in res) {
    const inner = res.data
    if (inner !== null && typeof inner === 'object') return inner
  }
  return res
}
