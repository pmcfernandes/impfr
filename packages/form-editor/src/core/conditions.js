import { isEmptyValue } from './field.js'

function asStr(value) {
  if (Array.isArray(value)) return value.map((v) => String(v)).join(', ')
  if (value === true) return '1'
  if (value === false || value === null || value === undefined) return ''
  return String(value).trim()
}

function isChecked(value, type) {
  if (type === 'checkbox') return value === true || value === 1 || value === '1' || value === 'true'
  if (type === 'checkboxgroup') return Array.isArray(value) && value.length > 0
  return !isEmptyValue(value)
}

export function evalRule(op, value, expected, target) {
  const type = (target && target.type) || 'text'
  const exp = String(expected ?? '').trim()
  const empty = isEmptyValue(value)

  if (op === 'empty') return empty
  if (op === 'not_empty') return !empty
  if (op === 'checked') return isChecked(value, type)
  if (op === 'not_checked') return !isChecked(value, type)

  if (type === 'checkboxgroup' && Array.isArray(value)) {
    const found = value.some((item) => asStr(item).toLowerCase() === exp.toLowerCase())
    if (op === 'eq' || op === 'contains') return found
    if (op === 'ne' || op === 'not_contains') return !found
  }

  const actual = asStr(value)
  switch (op) {
    case 'eq':
      return actual.toLowerCase() === exp.toLowerCase()
    case 'ne':
      return actual.toLowerCase() !== exp.toLowerCase()
    case 'contains':
      if (empty) return false
      return actual.toLowerCase().includes(exp.toLowerCase())
    case 'not_contains':
      if (empty) return true
      return !actual.toLowerCase().includes(exp.toLowerCase())
    case 'gt':
    case 'lt': {
      const aNum = actual !== '' && !Number.isNaN(Number(actual))
      const bNum = exp !== '' && !Number.isNaN(Number(exp))
      if (aNum && bNum) {
        const a = Number(actual)
        const b = Number(exp)
        return op === 'gt' ? a > b : a < b
      }
      const cmp = actual < exp ? -1 : actual > exp ? 1 : 0
      return op === 'gt' ? cmp > 0 : cmp < 0
    }
    default:
      return false
  }
}

export function evalCondition(condition, values, fields) {
  if (!condition || !condition.enabled) return true
  const rules = Array.isArray(condition.rules) ? condition.rules : []
  const logic = condition.logic === 'all' ? 'all' : 'any'
  const results = []
  for (const rule of rules) {
    const target = fields.find((f) => f.id === rule.field)
    if (!target || target.type === 'heading') continue
    results.push(evalRule(rule.op, values[target.id], rule.value, target))
  }
  if (results.length === 0) return true
  return logic === 'all' ? results.every(Boolean) : results.some(Boolean)
}

export function isFieldVisible(field, fields, values) {
  if (field.visible === false) return false
  return evalCondition(field.condition, values, fields)
}

export function isRequired(field, fields, values) {
  if (field.requiredCondition && field.requiredCondition.enabled) {
    return evalCondition(field.requiredCondition, values, fields)
  }
  return Boolean(field.required)
}

export function conditionSummary(condition, messages) {
  if (!condition || !condition.enabled || !condition.rules || condition.rules.length === 0) return ''
  const n = condition.rules.length
  const s = n > 1 ? 's' : ''
  if (messages && messages.summary) {
    return messages.summary.replace('{n}', n).replace('{s}', s)
  }
  return `${n} regra${s} de visibilidade`
}
