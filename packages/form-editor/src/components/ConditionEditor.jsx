import { OPERATORS, isDataType } from '../core/index.js'
import { useLanguage } from '../i18n/index.jsx'
import { Checkbox, Input, Select, cx } from '../ui/index.js'

function ValueInput({ rule, target, onChange }) {
  const { t } = useLanguage()
  const opMeta = OPERATORS.find((o) => o.op === rule.op)
  if (!opMeta || !opMeta.value) return null
  if (!target) return null

  if (target.type === 'select' || target.type === 'radio' || target.type === 'checkboxgroup') {
    return (
      <Select value={rule.value ?? ''} onChange={(e) => onChange({ value: e.target.value })} className="min-w-0">
        <option value="">— {t('condition.value')} —</option>
        {(target.options || []).map((opt, i) => (
          <option key={`${opt.value}-${i}`} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    )
  }

  const inputType = target.type === 'number' ? 'number' : target.type === 'date' ? 'date' : 'text'
  return (
    <Input type={inputType} placeholder={t('condition.value')} value={rule.value ?? ''} onChange={(e) => onChange({ value: e.target.value })} className="min-w-0" />
  )
}

export default function ConditionEditor({
  condition, onChange, fields, fieldId,
  title, toggleLabel,
}) {
  const { t } = useLanguage()
  const resolvedTitle = title || t('condition.title')
  const resolvedToggle = toggleLabel || t('condition.toggle')
  const base = condition || { enabled: false, logic: 'any', rules: [] }
  const candidates = fields.filter((f) => f.id !== fieldId && isDataType(f.type))
  const rules = base.rules || []
  const patch = (part) => onChange({ ...base, ...part })
  const updateRule = (index, part) => patch({ rules: rules.map((rule, i) => (i === index ? { ...rule, ...part } : rule)) })
  const addRule = () => {
    if (candidates.length === 0) return
    patch({ rules: [...rules, { field: candidates[0].id, op: 'eq', value: '' }] })
  }
  const removeRule = (index) => patch({ rules: rules.filter((_, i) => i !== index) })

  return (
    <section className="props-section flex flex-col gap-2.5 border-t border-gray-100 pt-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{resolvedTitle}</h3>
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
        <Checkbox className="mt-0.5" checked={base.enabled === true} onChange={(e) => patch({ enabled: e.target.checked })} />
        <span>{resolvedToggle}</span>
      </label>
      {base.enabled && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-gray-700" htmlFor="cond-logic">{t('condition.showIf')}</label>
            <Select id="cond-logic" value={base.logic === 'all' ? 'all' : 'any'} onChange={(e) => patch({ logic: e.target.value })} className="w-auto">
              <option value="any">{t('condition.any')}</option>
              <option value="all">{t('condition.all')}</option>
            </Select>
            <span className="text-xs text-gray-500">{t('condition.tail')}</span>
          </div>
          {candidates.length === 0 ? (
            <p className="text-xs text-gray-500">{t('condition.emptyHint')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {rules.map((rule, i) => {
                const target = candidates.find((f) => f.id === rule.field) || null
                const opMeta = OPERATORS.find((o) => o.op === rule.op)
                const needsValue = Boolean(opMeta && opMeta.value && target)
                return (
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-1.5 rounded-lg border border-gray-200 bg-gray-50/70 p-2" key={i}>
                    <Select value={rule.field} onChange={(e) => updateRule(i, { field: e.target.value })} className="col-span-full min-w-0">
                      {candidates.map((f) => (<option key={f.id} value={f.id}>{f.label}</option>))}
                    </Select>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Select value={rule.op} onChange={(e) => updateRule(i, { op: e.target.value })} className={cx('min-w-0', !needsValue && 'col-span-2')}>
                        {OPERATORS.map((op) => (<option key={op.op} value={op.op}>{t(`operators.${op.op}`)}</option>))}
                      </Select>
                      <ValueInput rule={rule} target={target} onChange={(part) => updateRule(i, part)} />
                    </div>
                    <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-600" title={t('condition.remove')} onClick={() => removeRule(i)}>✕</button>
                  </div>
                )
              })}
              <button type="button" className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50" onClick={addRule}>
                {t('condition.add')}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
