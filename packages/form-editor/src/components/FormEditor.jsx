import { useCallback, useEffect, useState } from 'react'
import { mapFormErrors } from '../core/index.js'
import { useFieldTree } from '../hooks/useFieldTree.js'
import { usePanelResize } from '../hooks/usePanelResize.js'
import { LanguageProvider, useLanguage } from '../i18n/index.jsx'
import Palette from './Palette.jsx'
import Canvas from './Canvas.jsx'
import PropertiesPanel from './properties/PropertiesPanel.jsx'
import PreviewModal from './PreviewModal.jsx'
import { Button, Callout } from '../ui/index.js'

const NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/

function buildPayload(form) {
  return {
    name: form.name,
    description: form.description,
    available_from: form.available_from || '',
    available_to: form.available_to || '',
    visible: form.visible !== false,
    consent_required: form.consent_required === true,
    consent_text: form.consent_text || '',
    privacy_url: form.privacy_url || '',
    remote_url: form.remote_url || '',
    notify_email: form.notify_email || '',
    notify_field: form.notify_field || '',
    fields: form.fields,
  }
}

function FormEditorInner({
  json: initialJson,
  onSave,
  onCancel,
  onUploadFiles,
  onDeleteFile,
  getFileUrl,
  onFetchSource,
  HtmlEditor,
  tinymceBaseUrl,
}) {
  const { t } = useLanguage()
  const [form, setForm] = useState(() => {
    if (initialJson) return JSON.parse(JSON.stringify(initialJson))
    return { name: t('editor.newForm'), description: '', available_from: '', available_to: '', visible: true, fields: [] }
  })
  const [selectedId, setSelectedId] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [serverErrors, setServerErrors] = useState({ byId: {}, general: {} })
  const [previewOpen, setPreviewOpen] = useState(false)
  const { width: propsWidth, startResize, resizeByKey } = usePanelResize()

  const markDirty = useCallback(() => {
    setDirty(true)
    setServerErrors({ byId: {}, general: {} })
  }, [])

  const mutateForm = useCallback((updater) => {
    setForm((prev) => (prev ? updater(prev) : prev))
    markDirty()
  }, [markDirty])

  const tree = useFieldTree(form, mutateForm, setSelectedId)

  const clearGeneralError = (key) => {
    setServerErrors((prev) => {
      if (!prev.general || !prev.general[key]) return prev
      const general = { ...prev.general }
      delete general[key]
      return { ...prev, general }
    })
  }

  const updateField = (field) => {
    setServerErrors((prev) => {
      if (!prev.byId || !prev.byId[field.id]) return prev
      const byId = { ...prev.byId }
      delete byId[field.id]
      return { ...prev, byId }
    })
    tree.updateField(field)
  }

  const clientErrors = () => {
    const byId = {}
    const counts = {}
    const dataTypes = ['text', 'textarea', 'number', 'email', 'date', 'select', 'radio', 'checkbox', 'checkboxgroup', 'file']
    form.fields.forEach((f) => {
      if (!f || !dataTypes.includes(f.type)) return
      counts[f.name] = (counts[f.name] || 0) + 1
    })
    form.fields.forEach((f) => {
      if (!f || !dataTypes.includes(f.type)) return
      if (!NAME_PATTERN.test(f.name || '')) {
        byId[f.id] = t('editor.nameError')
      } else if (counts[f.name] > 1) {
        byId[f.id] = t('editor.nameDuplicate')
      }
    })
    return byId
  }

  const save = async () => {
    if (saving) return false
    setSaving(true)
    setServerErrors({ byId: {}, general: {} })
    try {
      if (typeof onSave === 'function') await onSave(buildPayload(form))
      setDirty(false)
      setSaving(false)
      return true
    } catch (err) {
      if (err && err.data && err.data.errors) {
        setServerErrors(mapFormErrors(err.data.errors, form.fields))
      } else {
        setServerErrors({ byId: {}, general: { save: (err && err.message) || t('editor.saveError') } })
      }
      setSaving(false)
      return false
    }
  }

  const handleCancel = () => {
    if (dirty && typeof window !== 'undefined') {
      if (!window.confirm(t('editor.confirmLeave'))) return
    }
    if (typeof onCancel === 'function') onCancel()
  }

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        save()
      }
    }
    const onBeforeUnload = (e) => {
      if (dirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  })

  const selected = form.fields.find((f) => f.id === selectedId) || null
  const mergedErrors = {
    byId: { ...clientErrors(), ...serverErrors.byId },
    general: serverErrors.general,
  }
  const generalMessages = Object.entries(serverErrors.general)
    .filter(([key]) => key !== 'available_to' && !key.startsWith('fields.'))
    .map(([, value]) => value)

  return (
    <div
      className="editor flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-gray-50"
      style={{ '--props-w': `${propsWidth}px` }}
    >
      <header className="editor-top flex flex-wrap items-center gap-3 border-b border-gray-200 bg-white px-4 py-2.5">
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={handleCancel}>{t('common.back')}</Button>
        )}
        <div className="editor-title flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <input
            className="w-full max-w-sm rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-base font-semibold text-gray-900 transition hover:bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            value={form.name}
            placeholder={t('editor.formName')}
            aria-label={t('editor.formName')}
            onChange={(e) => {
              clearGeneralError('name')
              mutateForm((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
          {dirty && (
            <span className="inline-flex h-6 w-6 items-center justify-center text-amber-500" title={t('editor.unsaved')} aria-label={t('editor.unsaved')}>
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="8" cy="8" r="6.25" />
                <circle cx="8" cy="8" r="2.75" fill="currentColor" stroke="none" />
              </svg>
            </span>
          )}
          {mergedErrors.general.name && (
            <span className="text-xs font-medium text-red-600">{mergedErrors.general.name}</span>
          )}
        </div>
        <div className="editor-actions flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(true)}>{t('editor.preview')}</Button>
          <Button variant="primary" size="sm" onClick={() => save()} disabled={saving}>
            {saving ? t('editor.saving') : t('common.save')}
          </Button>
        </div>
      </header>

      {generalMessages.length > 0 && <Callout className="mx-4 mt-3">{generalMessages.join(' ')}</Callout>}

      <div className="editor-body grid min-h-0 flex-1 grid-cols-1 gap-3 p-4 lg:grid-cols-[220px_minmax(0,1fr)_var(--props-w)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
        <Palette onAdd={tree.addField} />
        <Canvas
          fields={form.fields}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onInsert={tree.insertField}
          onMove={tree.moveField}
          onDuplicate={tree.duplicateField}
          onDelete={tree.deleteField}
        />
        <PropertiesPanel
          form={form}
          field={selected}
          fields={form.fields}
          errors={mergedErrors}
          onResizeStart={startResize}
          onResizeKey={resizeByKey}
          onChangeForm={(patch) => {
            if (patch && typeof patch === 'object') Object.keys(patch).forEach(clearGeneralError)
            mutateForm((prev) => ({ ...prev, ...patch }))
          }}
          onChangeField={updateField}
          onDuplicate={tree.duplicateField}
          onDelete={(id) => {
            tree.deleteField(id)
            if (id === selectedId) setSelectedId(null)
          }}
          onFetchSource={onFetchSource}
          HtmlEditor={HtmlEditor}
          tinymceBaseUrl={tinymceBaseUrl}
        />
      </div>

      {previewOpen && <PreviewModal form={form} onClose={() => setPreviewOpen(false)} />}
    </div>
  )
}

export default function FormEditor({ lang = 'pt', ...props }) {
  return (
    <LanguageProvider lang={lang}>
      <FormEditorInner {...props} />
    </LanguageProvider>
  )
}
