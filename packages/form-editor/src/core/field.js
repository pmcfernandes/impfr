import { DATA_TYPES, FIELD_TYPES } from './types.js'

const FIELD_DEFAULTS = {
  heading: { label: 'Secção' },
  html: { label: 'Texto HTML' },
  steps: { label: 'Passos' },
  text: { label: 'Texto', placeholder: 'Introduza o texto' },
  textarea: { label: 'Texto longo', placeholder: 'Introduza o texto', rows: 4 },
  number: { label: 'Número', placeholder: '0' },
  email: { label: 'Email', placeholder: 'nome@exemplo.com' },
  date: { label: 'Data', placeholder: '' },
  select: { label: 'Selecção' },
  radio: { label: 'Opções' },
  checkbox: { label: 'Aceito os termos', placeholder: '' },
  checkboxgroup: { label: 'Escolha uma ou mais opções' },
  file: { label: 'Ficheiro' },
}

function defaultOptions() {
  return [
    { label: 'Opção 1', value: 'opcao_1' },
    { label: 'Opção 2', value: 'opcao_2' },
  ]
}

export function uid() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return 'f' + globalThis.crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  }
  return 'f' + Math.random().toString(36).slice(2, 14)
}

export function clampColumns(value) {
  if (value === '' || value === null || value === undefined) return 12
  const n = Number(value)
  if (!Number.isFinite(n)) return 12
  return Math.min(12, Math.max(1, Math.round(n)))
}

export function slugify(str) {
  let s = String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  if (s === '' || /^[0-9]/.test(s)) {
    s = 'campo' + (s ? '_' + s : '')
  }
  return s.slice(0, 60)
}

export function uniqueName(base, taken) {
  const list = taken || []
  let name = base || 'campo'
  let n = 2
  while (list.includes(name)) {
    name = `${base}_${n++}`
  }
  return name
}

export function createField(type, taken = []) {
  const def = FIELD_DEFAULTS[type] || FIELD_DEFAULTS.text
  const isData = DATA_TYPES.includes(type)
  const field = {
    id: uid(),
    type,
    label: def.label,
    helpText: '',
    condition: { enabled: false, logic: 'any', rules: [] },
  }
  if (type === 'html') {
    field.html = '<p>Escreva aqui o seu texto.</p>'
    return field
  }
  if (type === 'steps') {
    field.steps = ['Passo 1', 'Passo 2', 'Passo 3']
    field.activeStep = 1
    field.mode = 'steps'
    return field
  }
  if (isData) {
    field.name = uniqueName(slugify(def.label || type), taken)
    field.placeholder = def.placeholder ?? ''
    field.required = false
    field.requiredCondition = { enabled: false, logic: 'any', rules: [] }
    field.defaultValue = ''
    field.columns = 12
    field.pattern = ''
    field.patternMessage = ''
    if (type === 'select' || type === 'radio' || type === 'checkboxgroup') {
      field.options = defaultOptions()
    }
    if (type === 'number') {
      field.min = ''
      field.max = ''
      field.step = ''
    }
    if (type === 'textarea') {
      field.rows = def.rows || 4
    }
    if (type === 'file') {
      field.multiple = true
      field.maxSizeMb = 5
      field.accept = '.pdf,.png,.jpg,.jpeg,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip'
    }
  }
  return field
}

export function typeMeta(type) {
  return FIELD_TYPES.find((t) => t.type === type) || FIELD_TYPES[1]
}

export function isDataType(type) {
  return DATA_TYPES.includes(type)
}

export function isEmptyValue(value) {
  if (value === null || value === undefined || value === '' || value === false) return true
  if (Array.isArray(value)) return value.length === 0
  return false
}
