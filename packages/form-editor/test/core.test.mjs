import test from 'node:test'
import assert from 'node:assert/strict'
import {
  canDropInto,
  clampColumns,
  childrenOf,
  createField,
  descendantsOf,
  evalCondition,
  flatInsertIndex,
  formAvailability,
  initialValues,
  isAncestorOf,
  isContainerType,
  isDataType,
  isFieldVisible,
  isRequired,
  slugify,
  toPayload,
  topLevelFields,
  uniqueName,
  validateValues,
  wizardSections,
} from '../src/core/index.js'

function sampleFields() {
  return [
    createField('text'),
    createField('select'),
    createField('checkbox'),
  ]
}

test('slugify remove acentos e espaços', () => {
  assert.equal(slugify('Número de Telemóvel'), 'numero_de_telemovel')
  assert.equal(slugify('123abc'), 'campo_123abc')
  assert.equal(slugify('***'), 'campo')
})

test('uniqueName evita duplicados', () => {
  assert.equal(uniqueName('nome', ['nome', 'nome_2']), 'nome_3')
  assert.equal(uniqueName('nome', []), 'nome')
})

test('createField gera nome único para cada campo', () => {
  const a = createField('text')
  const b = createField('text', [a.name])
  assert.notEqual(a.name, b.name)
  assert.equal(createField('heading').name, undefined)
})

test('clampColumns limita entre 1 e 12', () => {
  assert.equal(createField('text').columns, 12)
  assert.equal(clampColumns(6), 6)
  assert.equal(clampColumns(0), 1)
  assert.equal(clampColumns(30), 12)
  assert.equal(clampColumns(''), 12)
  assert.equal(clampColumns('abc'), 12)
  assert.equal(clampColumns(7.6), 8)
})

test('formAvailability avalia o intervalo de datas', () => {
  const day = (n) => `2026-10-${String(n).padStart(2, '0')}`
  const at = (n) => new Date(`2026-10-${String(n).padStart(2, '0')}T12:00:00`)

  assert.equal(formAvailability({}, at(15)).available, true)
  assert.equal(formAvailability({}, at(15)).hasRange, false)

  const form = { available_from: day(10), available_to: day(20) }
  assert.equal(formAvailability(form, at(9)).available, false)
  assert.equal(formAvailability(form, at(10)).available, true, 'limite inicial incluído')
  assert.equal(formAvailability(form, at(15)).available, true)
  assert.equal(formAvailability(form, at(20)).available, true, 'limite final incluído')
  assert.equal(formAvailability(form, at(21)).available, false)

  assert.equal(formAvailability({ available_from: day(10) }, at(5)).available, false)
  assert.equal(formAvailability({ available_from: day(10) }, at(25)).available, true)
  assert.equal(formAvailability({ available_to: day(5) }, at(15)).available, false)
  assert.equal(formAvailability({ available_to: day(25) }, at(15)).available, true)

  const dt = { available_from: `${day(10)} 09:00`, available_to: `${day(10)} 17:30` }
  assert.equal(formAvailability(dt, new Date('2026-10-10T08:59:00')).available, false, 'antes da hora inicial')
  assert.equal(formAvailability(dt, new Date('2026-10-10T09:00:00')).available, true, 'à hora inicial')
  assert.equal(formAvailability(dt, new Date('2026-10-10T17:30:00')).available, true, 'à hora final')
  assert.equal(formAvailability(dt, new Date('2026-10-10T17:31:00')).available, false, 'depois da hora final')
})

test('evalCondition: desactivada mostra sempre', () => {
  const fields = sampleFields()
  assert.equal(evalCondition({ enabled: false, rules: [{ field: fields[0].id, op: 'eq', value: 'x' }] }, {}, fields), true)
})

test('evalCondition: lógica any/all', () => {
  const fields = sampleFields()
  const values = { [fields[0].id]: 'abc', [fields[1].id]: 'opcao_2' }
  const condition = {
    enabled: true,
    logic: 'all',
    rules: [
      { field: fields[0].id, op: 'contains', value: 'b' },
      { field: fields[1].id, op: 'eq', value: 'opcao_2' },
    ],
  }
  assert.equal(evalCondition(condition, values, fields), true)
  assert.equal(evalCondition({ ...condition, logic: 'any', rules: [condition.rules[0], { field: fields[1].id, op: 'eq', value: 'outro' }] }, values, fields), true)
  assert.equal(evalCondition({ ...condition, logic: 'all' }, { ...values, [fields[1].id]: 'opcao_9' }, fields), false)
})

test('evalCondition: operadores empty/checked e campo inexistente', () => {
  const fields = sampleFields()
  assert.equal(
    evalCondition({ enabled: true, logic: 'any', rules: [{ field: fields[2].id, op: 'checked', value: '' }] }, { [fields[2].id]: false }, fields),
    false
  )
  assert.equal(
    evalCondition({ enabled: true, logic: 'any', rules: [{ field: fields[2].id, op: 'checked', value: '' }] }, { [fields[2].id]: true }, fields),
    true
  )
  assert.equal(
    evalCondition({ enabled: true, logic: 'any', rules: [{ field: 'desconhecido', op: 'eq', value: 'x' }] }, {}, fields),
    true
  )
})

test('validateValues: obrigatório só em campos visíveis', () => {
  const fields = sampleFields()
  fields[1].condition = { enabled: true, logic: 'any', rules: [{ field: fields[0].id, op: 'not_empty', value: '' }] }
  fields[1].required = true

  const values = initialValues(fields)
  let errors = validateValues(fields, values)
  assert.equal(errors[fields[1].id], undefined, 'campo oculto não deve dar erro')

  values[fields[0].id] = 'preenchido'
  errors = validateValues(fields, values)
  assert.ok(errors[fields[1].id], 'campo visível e obrigatório deve dar erro')

  values[fields[1].id] = 'opcao_1'
  errors = validateValues(fields, values)
  assert.equal(Object.keys(errors).length, 0)
})

test('validateValues: email inválido', () => {
  const fields = [createField('email')]
  const values = initialValues(fields)
  values[fields[0].id] = 'nao-e-email'
  assert.ok(validateValues(fields, values)[fields[0].id])
  values[fields[0].id] = 'a@b.pt'
  assert.equal(Object.keys(validateValues(fields, values)).length, 0)
})

test('toPayload exclui campos ocultos e usa o nome interno', () => {
  const fields = [createField('text'), createField('checkbox')]
  fields[1].condition = { enabled: true, logic: 'any', rules: [{ field: fields[0].id, op: 'not_empty', value: '' }] }
  const values = initialValues(fields)
  values[fields[0].id] = ''
  values[fields[1].id] = true

  let payload = toPayload(fields, values)
  assert.ok(!(fields[1].name in payload), 'campo oculto não deve ser enviado')

  values[fields[0].id] = 'olá'
  payload = toPayload(fields, values)
  assert.deepEqual(payload, { [fields[0].name]: 'olá', [fields[1].name]: true })
})

test('isRequired: interruptor e condição de obrigatoriedade', () => {
  const fields = [createField('text'), createField('select')]
  const [a, b] = fields
  const values = initialValues(fields)

  b.required = true
  assert.equal(isRequired(b, fields, values), true)

  b.required = false
  assert.equal(isRequired(b, fields, values), false)

  b.requiredCondition = { enabled: true, logic: 'any', rules: [{ field: a.id, op: 'not_empty', value: '' }] }
  assert.equal(isRequired(b, fields, values), false, 'condição não cumpre → não obrigatório')

  values[a.id] = 'algo'
  assert.equal(isRequired(b, fields, values), true, 'condição cumpre → obrigatório')
  assert.equal(validateValues(fields, values)[b.id], 'Campo obrigatório.', 'validação aplica a condição')

  values[b.id] = 'opcao_1'
  assert.equal(validateValues(fields, values)[b.id], undefined, 'preenchido → sem erro')
})

test('bloco HTML não guarda dados e obedece à visibilidade', () => {
  const html = createField('html')
  assert.equal(isDataType(html.type), false)
  assert.ok(html.html.includes('<p>'))

  const fields = [createField('text'), html]
  const values = initialValues(fields)
  html.condition = { enabled: true, logic: 'any', rules: [{ field: fields[0].id, op: 'not_empty', value: '' }] }
  assert.equal(isFieldVisible(html, fields, values), false, 'bloco oculto enquanto o texto está vazio')
  values[fields[0].id] = 'x'
  assert.equal(isFieldVisible(html, fields, values), true, 'bloco visível depois')
})
test('campo de anexos: múltiplos, limite e formatos', () => {
  const f = createField('file')
  assert.equal(isDataType(f.type), true)
  assert.equal(f.label, 'Ficheiro')
  assert.equal(f.multiple, true)
  assert.equal(f.maxSizeMb, 5)
  assert.ok(f.accept.includes('.pdf'))

  const fields = [f]
  const values = initialValues(fields)
  assert.deepEqual(values[f.id], [])

  f.required = true
  assert.ok(validateValues(fields, values)[f.id], 'obrigatório sem anexos')

  values[f.id] = [{ name: 'abc_doc.txt', original: 'doc.txt', size: 12 }]
  assert.equal(validateValues(fields, values)[f.id], undefined)
  assert.deepEqual(toPayload(fields, values)[f.name], [{ name: 'abc_doc.txt', original: 'doc.txt', size: 12 }])
})

test('Secções e Passos são contentores com filhos', () => {
  const sec = createField('heading')
  const steps = createField('steps')
  assert.equal(isContainerType('heading'), true)
  assert.equal(isContainerType('steps'), true)
  assert.equal(isContainerType('text'), false)

  const inside = createField('text')
  inside.parentId = sec.id
  const top = createField('text')
  const nested = createField('steps')
  nested.parentId = sec.id
  const deep = createField('text')
  deep.parentId = nested.id
  const fields = [sec, inside, top, nested, deep]

  assert.deepEqual(topLevelFields(fields).map((f) => f.id), [sec.id, top.id])
  assert.deepEqual(childrenOf(fields, sec.id).map((f) => f.id), [inside.id, nested.id])
  assert.deepEqual(childrenOf(fields, nested.id).map((f) => f.id), [deep.id])
  assert.deepEqual(descendantsOf(fields, sec.id).map((f) => f.id), [inside.id, nested.id, deep.id])

  const orphan = createField('text')
  orphan.parentId = 'inexistente'
  assert.deepEqual(topLevelFields([orphan]).map((f) => f.id), [orphan.id])
})

test('flatInsertIndex calcula a posição em cada zona', () => {
  const sec = createField('heading')
  const a = createField('text')
  a.parentId = sec.id
  const b = createField('text')
  const fields = [sec, a, b]

  assert.equal(flatInsertIndex(fields, null, 0), 0)
  assert.equal(flatInsertIndex(fields, null, 1), 2)
  assert.equal(flatInsertIndex(fields, null, 5), 3)
  assert.equal(flatInsertIndex(fields, sec.id, 0), 1)
  assert.equal(flatInsertIndex(fields, sec.id, 1), 2)
})

test('isAncestorOf detecta ciclos de contentores', () => {
  const outer = createField('heading')
  const inner = createField('steps')
  inner.parentId = outer.id
  const fields = [outer, inner]
  assert.equal(isAncestorOf(fields, outer.id, inner.id), true, 'outer é ascendente de inner')
  assert.equal(isAncestorOf(fields, outer.id, outer.id), false, 'o próprio não conta (tratado à parte)')
  assert.equal(isAncestorOf(fields, inner.id, outer.id), false)
})

test('canDropInto: Passos só aceitam Secções', () => {
  const steps = createField('steps')
  const sec = createField('heading')
  const txt = createField('text')
  const fields = [steps, sec, txt]

  assert.equal(canDropInto(fields, null, 'text'), true, 'nível raiz aceita tudo')
  assert.equal(canDropInto(fields, steps.id, 'heading'), true)
  assert.equal(canDropInto(fields, steps.id, 'text'), false, 'Passos só aceitam Secções')
  assert.equal(canDropInto(fields, sec.id, 'text'), true, 'Secções aceitam componentes')
  assert.equal(canDropInto(fields, sec.id, 'steps'), false, 'Passos são sempre de nível raiz')
  assert.equal(canDropInto(fields, txt.id, 'text'), false, 'só contentores têm zonas')
  assert.equal(canDropInto(fields, 'inexistente', 'text'), false)
})

test('wizardSections: Secções dentro dos Passos', () => {
  const steps = createField('steps')
  const s1 = createField('heading')
  s1.parentId = steps.id
  const stray = createField('text')
  stray.parentId = steps.id
  const fields = [steps, s1, stray]

  assert.deepEqual(wizardSections(fields, steps).map((f) => f.id), [s1.id])
  assert.equal(wizardSections(fields, createField('heading')).length, 0)
})

test('Passos: modo de apresentação (numerado ou progresso)', () => {
  const steps = createField('steps')
  assert.equal(steps.mode, 'steps', 'por omissão: passos numerados')
  assert.equal(createField('text').mode, undefined, 'só os Passos têm modo')
})

test('validateValues: validação personalizada (regex)', () => {
  const f = createField('text')
  f.pattern = '^\\d{9}$'
  const fields = [f]

  assert.deepEqual(validateValues(fields, { [f.id]: '123456789' }), {}, 'valor conforme o padrão passa')
  assert.equal(
    validateValues(fields, { [f.id]: 'abc' })[f.id],
    'O valor não corresponde à expressão regular definida.',
    'mensagem por omissão'
  )

  f.patternMessage = 'Introduza um NIF com 9 dígitos.'
  assert.equal(
    validateValues(fields, { [f.id]: 'abc' })[f.id],
    'Introduza um NIF com 9 dígitos.',
    'mensagem personalizada'
  )

  assert.deepEqual(validateValues(fields, { [f.id]: '' }), {}, 'campo vazio não testa o padrão')

  f.pattern = '['
  assert.deepEqual(validateValues(fields, { [f.id]: 'abc' }), {}, 'padrão inválido não rebenta no cliente')

  f.pattern = '^\\d+$'
  f.required = true
  assert.equal(validateValues(fields, { [f.id]: '' })[f.id], 'Campo obrigatório.', 'obrigatório continua primeiro')
})
