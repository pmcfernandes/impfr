import { useLanguage } from '../i18n/index.jsx'
import { Input } from '../ui/index.js'

export default function OptionsEditor({ options, onChange }) {
  const { t } = useLanguage()
  const list = options || []
  const update = (index, patch) => onChange(list.map((opt, i) => (i === index ? { ...opt, ...patch } : opt)))
  const remove = (index) => {
    if (list.length <= 1) return
    onChange(list.filter((_, i) => i !== index))
  }
  const add = () => {
    const used = list.map((o) => o.value)
    let n = list.length + 1
    let value = `opcao_${n}`
    while (used.includes(value)) { n += 1; value = `opcao_${n}` }
    onChange([...list, { label: `Opção ${n}`, value }])
  }

  return (
    <div className="options-editor flex flex-col gap-1.5">
      {list.map((opt, i) => (
        <div className="option-row grid grid-cols-[minmax(0,1fr)_100px_auto] items-center gap-1.5" key={i}>
          <Input placeholder={t('options.label')} value={opt.label} onChange={(e) => update(i, { label: e.target.value })} className="min-w-0" />
          <Input placeholder={t('options.value')} value={opt.value} onChange={(e) => update(i, { value: e.target.value })} className="min-w-0 font-mono text-xs" />
          <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40" title={t('options.remove')} disabled={list.length <= 1} onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button type="button" className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50" onClick={add}>
        {t('options.add')}
      </button>
    </div>
  )
}
