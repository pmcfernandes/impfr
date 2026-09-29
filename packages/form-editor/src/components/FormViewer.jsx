import FormRunner from './FormRunner.jsx'
import { formAvailability } from '../core/index.js'
import { Callout } from '../ui/index.js'
import { LanguageProvider, useLanguage } from '../i18n/index.jsx'

function FormViewerInner({
  json: form,
  defaultValues,
  onSubmit,
  onSave,
  onCancel,
  submitLabel,
  readOnly = false,
  allSteps = false,
  skipConsent = false,
  successTitle,
  successActions,
  onUploadFiles,
  onDeleteFile,
  getFileUrl,
}) {
  const { t } = useLanguage()

  if (!form || !Array.isArray(form.fields)) {
    return <Callout>{t('form.invalidJson')}</Callout>
  }

  const availability = formAvailability(form)
  if (form.visible === false) {
    return <Callout color="amber">{t('form.notAvailable')}</Callout>
  }
  if (!availability.available) {
    return <Callout color="amber">{t('form.notAvailableNow')}</Callout>
  }

  const isEdit = Boolean(defaultValues) && typeof onSave === 'function'
  const handleSubmit = isEdit ? (payload, meta) => Promise.resolve(onSave(payload, meta)) : onSubmit

  return (
    <FormRunner
      form={form}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel || (isEdit ? t('form.editSave') : t('form.submit'))}
      successTitle={successTitle || (isEdit ? t('form.editSaved') : t('form.successTitle'))}
      allSteps={allSteps}
      skipConsent={skipConsent || readOnly}
      successActions={successActions}
      onUploadFiles={onUploadFiles}
      onDeleteFile={onDeleteFile}
      getFileUrl={getFileUrl}
    />
  )
}

export default function FormViewer({ lang = 'pt', ...props }) {
  return (
    <LanguageProvider lang={lang}>
      <FormViewerInner {...props} />
    </LanguageProvider>
  )
}
