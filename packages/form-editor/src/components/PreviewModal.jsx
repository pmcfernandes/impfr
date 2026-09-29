import { useEffect } from 'react'
import FormRunner from './FormRunner.jsx'
import { Dialog } from '../ui/index.js'
import { useLanguage } from '../i18n/index.jsx'

export default function PreviewModal({ form, onClose }) {
  const { t } = useLanguage()
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <Dialog open onClose={onClose} title={t('preview.title')} description={form.name}>
      <FormRunner
        form={form}
        submitLabel={t('preview.testSubmit')}
        successTitle={t('preview.validSubmit')}
        onSubmit={() => Promise.resolve(t('preview.notSaved'))}
      />
    </Dialog>
  )
}
