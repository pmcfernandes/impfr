import { useState } from 'react'
import simples from './forms/simples.json'
import todosTipos from './forms/todos-tipos.json'
import condicoes from './forms/condicoes.json'
import wizard from './forms/wizard.json'
import layoutGrelha from './forms/layout-grelha.json'
import progresso from './forms/progresso.json'
import rgpd from './forms/rgpd.json'
import vazio from './forms/vazio.json'
import FormEditorSample from './ui/FormEditorSample.jsx'
import FormViewerSample from './ui/FormViewerSample.jsx'
import UiComponentsSample from './ui/UiComponentsSample.jsx'

const FORMS = [
  { id: 'simples', label: 'Simples', json: simples },
  { id: 'todos-tipos', label: 'Todos os Tipos', json: todosTipos },
  { id: 'condicoes', label: 'Condições', json: condicoes },
  { id: 'wizard', label: 'Wizard (Passos)', json: wizard },
  { id: 'progresso', label: 'Progresso (Barra)', json: progresso },
  { id: 'layout-grelha', label: 'Layout Grelha', json: layoutGrelha },
  { id: 'rgpd', label: 'RGPD & Disponibilidade', json: rgpd },
  { id: 'vazio', label: 'Vazio', json: vazio },
]

const VIEWS = [
  { id: 'viewer', label: 'Viewer' },
  { id: 'editor', label: 'Editor' },
  { id: 'ui', label: 'UI Kit' },
]

const LANGS = [
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
]

export default function App() {
  const [view, setView] = useState('viewer')
  const [formId, setFormId] = useState('simples')
  const [lang, setLang] = useState('pt')
  const [savedJson, setSavedJson] = useState(null)
  const [submittedData, setSubmittedData] = useState(null)

  const activeForm = FORMS.find((f) => f.id === formId) || FORMS[0]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <h1 className="text-base font-bold text-gray-900">
            Form Editor <span className="text-xs font-normal text-gray-500">Visual Samples</span>
          </h1>
          <nav className="flex gap-1">
            {VIEWS.map((v) => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${view === v.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >{v.label}</button>
            ))}
          </nav>
          {view !== 'ui' && (
            <select value={formId} onChange={(e) => setFormId(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
            >
              {FORMS.map((f) => (<option key={f.id} value={f.id}>{f.label}</option>))}
            </select>
          )}
          <div className="flex overflow-hidden rounded-lg border border-gray-300">
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => setLang(l.id)}
                className={`px-3 py-1.5 text-xs font-bold transition ${lang === l.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >{l.label}</button>
            ))}
          </div>
          {view === 'viewer' && <span className="ml-auto text-xs text-gray-500">{activeForm.json.fields.length} campos</span>}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 p-4">
        {view === 'viewer' && (
          <FormViewerSample key={formId + lang} lang={lang} form={activeForm.json}
            onSubmit={(data, meta) => { setSubmittedData({ data, meta, at: new Date().toISOString() }); return 'Submissão registada com sucesso!' }}
            onSave={(data) => { setSubmittedData({ data, edit: true, at: new Date().toISOString() }); return 'Alterações guardadas!' }}
          />
        )}
        {view === 'editor' && (
          <FormEditorSample key={formId + lang} lang={lang} json={activeForm.json}
            onSave={(json) => { setSavedJson(json) }} onCancel={() => {}}
          />
        )}
        {view === 'ui' && <UiComponentsSample />}
      </main>

      {(savedJson || submittedData) && view !== 'ui' && (
        <aside className="fixed bottom-0 right-0 z-50 m-4 max-h-[50vh] w-[420px] overflow-auto rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {savedJson && view === 'editor' ? 'onSave → JSON' : 'onSubmit → dados'}
            </h3>
            <button onClick={() => { setSavedJson(null); setSubmittedData(null) }} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <pre className="text-xs leading-relaxed text-gray-700">{JSON.stringify(savedJson || submittedData, null, 2)}</pre>
        </aside>
      )}
    </div>
  )
}
