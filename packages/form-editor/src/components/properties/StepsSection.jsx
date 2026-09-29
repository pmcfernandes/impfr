import { useLanguage } from '../../i18n/index.jsx'
import { Input, Select } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function StepsSection({ field, fields, patch }) {
  const { t } = useLanguage()
  const stepsList = Array.isArray(field.steps) ? field.steps : []

  const updateStep = (i, value) => patch({ steps: stepsList.map((s, idx) => (idx === i ? value : s)) })
  const addStep = () => {
    if (stepsList.length >= 15) return
    const next = [...stepsList, `${t('fields.steps')} ${stepsList.length + 1}`]
    patch({ steps: next, activeStep: Math.min(Number(field.activeStep) || 1, next.length) })
  }
  const removeStep = (i) => {
    const remaining = stepsList.filter((_, idx) => idx !== i)
    const next = remaining.length > 0 ? remaining : [`${t('fields.steps')} 1`]
    patch({ steps: next, activeStep: Math.min(Math.max(Number(field.activeStep) || 1, 1), next.length) })
  }
  const clampActive = (value) => {
    const n = Number(value)
    const max = Math.max(stepsList.length, 1)
    if (!Number.isFinite(n)) return Math.min(Math.max(Number(field.activeStep) || 1, 1), max)
    return Math.min(Math.max(Math.round(n), 1), max)
  }
  const hasSectionsInside = (fields || []).some((f) => f.parentId === field.id && f.type === 'heading')

  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.stepsSection')}</h3>
      <Row label={t('field.stepsMode')} htmlFor="steps-mode" hint={t('field.stepsModeHint')}>
        <Select id="steps-mode" value={field.mode === 'progress' ? 'progress' : 'steps'} onChange={(e) => patch({ mode: e.target.value })}>
          <option value="steps">{t('field.stepsModeSteps')}</option>
          <option value="progress">{t('field.stepsModeProgress')}</option>
        </Select>
      </Row>
      {hasSectionsInside && <p className="text-xs text-gray-500">{t('field.stepsWizardHint')}</p>}
      <div className="flex flex-col gap-1.5">
        {stepsList.map((step, i) => (
          <div className="grid grid-cols-[1fr_auto] items-center gap-1.5" key={i}>
            <Input placeholder={`${t('fields.steps')} ${i + 1}`} value={step} onChange={(e) => updateStep(i, e.target.value)} />
            <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40" title={t('field.removeStep')} disabled={stepsList.length <= 1} onClick={() => removeStep(i)}>✕</button>
          </div>
        ))}
        <button type="button" className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50" disabled={stepsList.length >= 15} onClick={addStep}>
          {t('field.addStep')}
        </button>
      </div>
      <Row label={t('field.activeStep')} htmlFor="prop-activestep" hint={t('field.activeStepHint')}>
        <Input id="prop-activestep" type="number" min={1} max={Math.max(stepsList.length, 1)} value={field.activeStep ?? 1}
          onChange={(e) => patch({ activeStep: e.target.value === '' ? '' : Number(e.target.value) })}
          onBlur={(e) => patch({ activeStep: clampActive(e.target.value) })}
        />
      </Row>
    </section>
  )
}
