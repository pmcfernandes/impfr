import { FormViewer } from '../../src/index.js'

export default function FormViewerSample({ form, onSubmit, onSave, lang = 'pt' }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-bold text-gray-900">{form.name}</h2>
        {form.description && <p className="mt-1 text-sm text-gray-500">{form.description}</p>}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
          <span>lang: {lang}</span>
          <span>visible: {String(form.visible)}</span>
          {form.consent_required && <span>· consent_required</span>}
          {form.available_from && <span>· from: {form.available_from}</span>}
          {form.available_to && <span>· to: {form.available_to}</span>}
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-10">
        <FormViewer json={form} lang={lang} onSubmit={onSubmit} onSave={onSave} />
      </div>
    </div>
  )
}
