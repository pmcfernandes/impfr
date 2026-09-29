import { isDataType } from './field.js'
import { isFieldVisible, isRequired } from './conditions.js'

const DEFAULT_MESSAGES = {
  required: 'Campo obrigatório.',
  invalidEmail: 'Email inválido.',
  invalidNumber: 'Introduza um número válido.',
  pattern: 'O valor não corresponde à expressão regular definida.',
}

export function initialValues(fields) {
  const values = {}
  for (const f of fields) {
    if (!isDataType(f.type)) continue
    if (f.type === 'checkbox') {
      values[f.id] = f.defaultValue === true || f.defaultValue === '1' || f.defaultValue === 'true'
    } else if (f.type === 'checkboxgroup') {
      values[f.id] = Array.isArray(f.defaultValue) ? f.defaultValue.slice() : []
    } else if (f.type === 'file') {
      values[f.id] = []
    } else {
      values[f.id] = f.defaultValue ?? ''
    }
  }
  return values
}

export function validateValues(fields, values, messages) {
  const msg = { ...DEFAULT_MESSAGES, ...(messages || {}) }
  const errors = {}
  for (const f of fields) {
    if (!isDataType(f.type)) continue
    if (!isFieldVisible(f, fields, values)) continue
    const value = values[f.id]
    const empty = isEmpty(value)
    if (isRequired(f, fields, values) && empty) {
      errors[f.id] = msg.required
      continue
    }
    if (empty) continue
    if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) {
      errors[f.id] = msg.invalidEmail
    } else if (f.type === 'number' && !Number.isFinite(Number(value))) {
      errors[f.id] = msg.invalidNumber
    }
    if (!errors[f.id] && f.pattern && !Array.isArray(value) && typeof value !== 'boolean') {
      try {
        const re = new RegExp(f.pattern)
        if (!re.test(String(value))) {
          errors[f.id] = f.patternMessage || msg.pattern
        }
      } catch {
        /* padrão inválido é validado no editor */
      }
    }
  }
  return errors
}

function isEmpty(value) {
  if (value === null || value === undefined || value === '' || value === false) return true
  if (Array.isArray(value)) return value.length === 0
  return false
}

function serializeValue(field, value) {
  if (field.type === 'checkbox') return value === true
  if (field.type === 'checkboxgroup') return Array.isArray(value) ? value.slice() : []
  if (field.type === 'file') {
    return Array.isArray(value) ? value.map((f) => ({ ...f })) : []
  }
  if (field.type === 'number') {
    if (value === '' || value === null || value === undefined) return ''
    const n = Number(value)
    return Number.isFinite(n) ? n : String(value)
  }
  return value === null || value === undefined ? '' : String(value)
}

export function toPayload(fields, values) {
  const payload = {}
  for (const f of fields) {
    if (!isDataType(f.type)) continue
    if (!isFieldVisible(f, fields, values)) continue
    payload[f.name] = serializeValue(f, values[f.id])
  }
  return payload
}

export function mapFormErrors(errors, fields) {
  const byId = {}
  const general = {}
  for (const [key, message] of Object.entries(errors || {})) {
    const match = key.match(/^fields\.(\d+)(?:\.name)?$/)
    if (match) {
      const field = fields[Number(match[1])]
      if (field) byId[field.id] = message
      else general[key] = message
    } else if (key === 'name' || key === 'description') {
      general[key] = message
    } else {
      general[key] = message
    }
  }
  return { byId, general }
}

export function mapRecordErrors(errors, fields) {
  const byId = {}
  const general = {}
  for (const [key, message] of Object.entries(errors || {})) {
    const field = fields.find((f) => f.name === key)
    if (field) byId[field.id] = message
    else general[key] = message
  }
  return { byId, general }
}
