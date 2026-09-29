import { FormEditor } from '../../src/index.js'

async function fetchSource({ url, headers }) {
  const init = {}
  if (headers) {
    try {
      init.headers = JSON.parse(headers)
    } catch {
      throw new Error('Cabeçalhos inválidos — use JSON (ex.: {"Authorization": "Bearer token"}).')
    }
  }
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status} ao contactar o endpoint.`)
  return res.json()
}

export default function FormEditorSample({ json, onSave, onCancel, lang = 'pt' }) {
  return (
    <div className="h-[80vh] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <FormEditor json={json} lang={lang} onSave={onSave} onCancel={onCancel} onFetchSource={fetchSource} />
    </div>
  )
}
