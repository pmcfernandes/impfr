import { useId, useState } from 'react'
import FieldRenderer from './FieldRenderer.jsx'
import { Button, Callout, Checkbox } from '../ui/index.js'
import { FileHandlersContext } from '../contexts.js'
import { LanguageProvider, useLanguage } from '../i18n/index.jsx'
import {
  childrenOf, descendantsOf, initialValues, isContainerType,
  isFieldVisible, mapRecordErrors, toPayload,
  topLevelFields, validateValues, wizardSections,
} from '../core/index.js'

function FormRunnerInner({
  form,
  submitLabel,
  onSubmit,
  onCancel,
  defaultValues,
  successActions,
  successTitle,
  successMode = 'replace',
  allSteps = false,
  hideFooter = false,
  skipConsent = false,
  domId,
  onUploadFiles,
  onDeleteFile,
  getFileUrl,
}) {
  const { t } = useLanguage()
  const fields = form.fields || []
  const consentId = `${useId()}consent`
  const [values, setValues] = useState(() => ({
    ...initialValues(fields),
    ...(defaultValues || {}),
  }))
  const [errors, setErrors] = useState({})
  const [general, setGeneral] = useState('')
  const [done, setDone] = useState(false)
  const [showNotice, setShowNotice] = useState(false)
  const [successText, setSuccessText] = useState('')
  const [busy, setBusy] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [consentChecked, setConsentChecked] = useState(false)
  const [consentError, setConsentError] = useState(false)

  const needsConsent = form.consent_required === true && !skipConsent
  const fileHandlers = { onUploadFiles, onDeleteFile, getFileUrl }
  const validationMessages = {
    required: t('validation.required'),
    invalidEmail: t('validation.invalidEmail'),
    invalidNumber: t('validation.invalidNumber'),
    pattern: t('validation.patternDefault'),
  }

  const scrollToConsent = () => {
    requestAnimationFrame(() => {
      const block = document.querySelector('[data-consent-block]')
      if (block) block.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setGeneral('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    const found = validateValues(fields, values, validationMessages)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setGeneral('')
      setDone(false)
      requestAnimationFrame(() => {
        const first = document.querySelector('.field.has-error')
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }
    if (needsConsent && !consentChecked) {
      setConsentError(true)
      setGeneral('')
      setDone(false)
      scrollToConsent()
      return
    }
    setConsentError(false)
    setBusy(true)
    setGeneral('')
    setShowNotice(false)
    try {
      const message = await onSubmit(toPayload(fields, values), { consent: consentChecked === true })
      setErrors({})
      setSuccessText(message || t('form.successMessage'))
      if (successMode === 'notice') setShowNotice(true)
      else setDone(true)
    } catch (err) {
      const mapped = mapRecordErrors(err.data && err.data.errors, fields)
      setErrors(mapped.byId)
      setGeneral(
        Object.keys(mapped.general).length > 0
          ? Object.values(mapped.general).join(' ')
          : err.message || t('form.submitError')
      )
      if (err.data && err.data.errors && err.data.errors.consent) {
        setConsentError(true)
        scrollToConsent()
      }
      setDone(false)
      setShowNotice(false)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="form-viewer runner flex flex-col gap-5">
        <div className="success-box flex flex-col items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 px-6 py-9 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white" aria-hidden="true">OK</span>
          <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-300">{successTitle || t('form.successTitle')}</h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-300">{successText}</p>
          <div className="success-actions mt-2 flex flex-wrap items-center justify-center gap-2">{successActions}</div>
        </div>
      </div>
    )
  }

  const topLevel = topLevelFields(fields)
  const visibleTop = topLevel.filter((f) => isFieldVisible(f, fields, values))

  const wizardDriver = (() => {
    for (const field of fields) {
      if (field.type !== 'steps') continue
      const sections = wizardSections(fields, field)
      if (sections.length > 0) return { field, sections }
    }
    return null
  })()

  const isWizard = Boolean(wizardDriver) && !allSteps
  const stepLabels = isWizard ? wizardDriver.sections.map((s, i) => s.label || t('fields.steps') + ` ${i + 1}`) : []
  const currentStep = isWizard ? Math.min(Math.max(stepIndex, 0), stepLabels.length - 1) : 0
  const isLastStep = !isWizard || currentStep >= stepLabels.length - 1

  const goToStep = (next) => {
    setStepIndex(next)
    setErrors({})
    setGeneral('')
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const handleNext = () => {
    if (!wizardDriver) return
    const section = wizardDriver.sections[currentStep]
    const stepFields = section ? descendantsOf(fields, section.id) : []
    const found = validateValues(stepFields, values, validationMessages)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setGeneral('')
      requestAnimationFrame(() => {
        const first = document.querySelector('.field.has-error')
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }
    goToStep(currentStep + 1)
  }

  const insideSteps = (field) => {
    if (field.type !== 'heading' || !field.parentId) return false
    const parent = fields.find((f) => f.id === field.parentId)
    return Boolean(parent && parent.type === 'steps')
  }

  const renderField = (field) => {
    if (!isFieldVisible(field, fields, values)) return null
    const isDriver = isWizard && field.id === wizardDriver.field.id
    let kids = childrenOf(fields, field.id)
    if (isDriver) {
      const current = wizardDriver.sections[currentStep]
      kids = current ? [current] : []
    }
    return (
      <FieldRenderer
        key={field.id}
        field={field}
        value={values[field.id]}
        error={errors[field.id]}
        onChange={(value) => handleChange(field.id, value)}
        hideTitle={insideSteps(field) && !allSteps}
        hideSteps={allSteps}
        stepsLabels={isDriver ? stepLabels : undefined}
        stepsActive={isDriver ? currentStep + 1 : undefined}
      >
        {isContainerType(field.type) && kids.length > 0 ? kids.map(renderField) : null}
      </FieldRenderer>
    )
  }

  return (
    <FileHandlersContext.Provider value={fileHandlers}>
      <form
        id={domId}
        className="form-viewer runner flex flex-col gap-5"
        onSubmit={handleSubmit}
        noValidate
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          const tag = e.target && e.target.tagName
          if (tag === 'INPUT' || tag === 'SELECT') e.preventDefault()
        }}
      >
        {general && <Callout>{general}</Callout>}
        {showNotice && (
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-2.5 text-sm font-medium text-emerald-800 dark:text-emerald-300">{successText}</div>
        )}
        <div className="runner-fields grid grid-cols-12 items-start gap-4">
          {visibleTop.length === 0 && (
            <p className="col-span-full text-sm text-gray-500 dark:text-gray-400">{t('form.emptyFields')}</p>
          )}
          {topLevel.map(renderField)}
        </div>
        {needsConsent && isLastStep && (
          <div data-consent-block className={`rounded-lg border p-3.5 ${consentError ? 'border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900'}`}>
            <label className={`flex cursor-pointer items-start gap-2 text-sm ${consentError ? 'text-red-800 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`} htmlFor={consentId}>
              <Checkbox
                id={consentId}
                className="mt-0.5"
                checked={consentChecked}
                onChange={(e) => {
                  setConsentChecked(e.target.checked)
                  if (e.target.checked) setConsentError(false)
                }}
              />
              <span className="whitespace-pre-line">{form.consent_text}</span>
            </label>
            {form.privacy_url && (
              <a href={form.privacy_url} target="_blank" rel="noopener noreferrer" className="ml-6 mt-1 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 underline">
                {t('form.privacyPolicy')}
              </a>
            )}
            {consentError && (
              <p className="ml-6 mt-1 text-xs font-medium text-red-600 dark:text-red-400">{t('form.consentError')}</p>
            )}
            {!consentChecked && (
              <p className="ml-6 mt-1 text-xs text-gray-500 dark:text-gray-400">{t('form.consentHint')}</p>
            )}
          </div>
        )}
        {!hideFooter && (
          <div className="runner-actions flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center gap-2">
              {isWizard && (
                <Button variant="secondary" disabled={currentStep === 0} onClick={(e) => { e.preventDefault(); goToStep(currentStep - 1) }}>
                  {t('form.previous')}
                </Button>
              )}
              {onCancel && <Button variant="ghost" onClick={onCancel}>{t('common.cancel')}</Button>}
              {!isWizard && !onCancel && <span aria-hidden="true" />}
            </div>
            {isWizard && !isLastStep ? (
              <Button variant="primary" size="lg" onClick={(e) => { e.preventDefault(); handleNext() }}>
                {t('form.next')}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={busy || (needsConsent && !consentChecked)}
              >
                {busy ? t('form.submitting') : (submitLabel || t('form.submit'))}
              </Button>
            )}
          </div>
        )}
      </form>
    </FileHandlersContext.Provider>
  )
}

export default function FormRunner({ lang = 'pt', ...props }) {
  return (
    <LanguageProvider lang={lang}>
      <FormRunnerInner {...props} />
    </LanguageProvider>
  )
}
