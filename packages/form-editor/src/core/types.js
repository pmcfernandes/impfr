export const DATA_TYPES = [
  'text', 'textarea', 'number', 'email', 'password', 'date',
  'select', 'radio', 'checkbox', 'checkboxgroup', 'file',
]

export const FIELD_TYPES = [
  { type: 'html', label: 'Texto HTML', hint: 'Texto livre', data: false },
  { type: 'steps', label: 'Passos', hint: 'Indicador de passos', data: false },
  { type: 'heading', label: 'Secção', hint: 'Separador de secção', data: false },
  { type: 'text', label: 'Texto', hint: 'Texto curto', data: true },
  { type: 'textarea', label: 'Texto longo', hint: 'Várias linhas', data: true },
  { type: 'number', label: 'Número', hint: 'Valor numérico', data: true },
  { type: 'email', label: 'Email', hint: 'Endereço de email', data: true },
  { type: 'password', label: 'Palavra-passe', hint: 'Texto oculto', data: true },
  { type: 'date', label: 'Data', hint: 'Seletor de data', data: true },
  { type: 'select', label: 'Lista', hint: 'Seleção em dropdown', data: true },
  { type: 'radio', label: 'Opções', hint: 'Seleção única', data: true },
  { type: 'checkbox', label: 'Caixa', hint: 'Sim / Não', data: true },
  { type: 'checkboxgroup', label: 'Múltipla', hint: 'Várias escolhas', data: true },
  { type: 'file', label: 'Ficheiro', hint: 'Um ou mais ficheiros', data: true },
]

export const OPERATORS = [
  { op: 'eq', label: 'é igual a', value: true },
  { op: 'ne', label: 'é diferente de', value: true },
  { op: 'contains', label: 'contém', value: true },
  { op: 'not_contains', label: 'não contém', value: true },
  { op: 'gt', label: 'é maior que', value: true },
  { op: 'lt', label: 'é menor que', value: true },
  { op: 'empty', label: 'está vazio', value: false },
  { op: 'not_empty', label: 'não está vazio', value: false },
  { op: 'checked', label: 'está marcado', value: false },
  { op: 'not_checked', label: 'não está marcado', value: false },
]

export const RECORD_STATUSES = ['pendente', 'recusado', 'aprovado', 'remoto']

export const RECORD_STATUS_META = {
  pendente: { label: 'Pendente', color: 'amber' },
  recusado: { label: 'Recusado', color: 'red' },
  aprovado: { label: 'Aprovado', color: 'emerald' },
  remoto: { label: 'Remoto', color: 'blue' },
}
