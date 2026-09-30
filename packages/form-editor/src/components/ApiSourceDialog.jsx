import { useEffect, useState } from 'react'
import { itemKeys, mapOptions, pickDefaultKey, resolveItems, resolveUrl, unwrapPayload } from '../apiSource.js'
import {
  Button, Dialog, Input,
  Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TableRoot,
  Textarea,
} from '../ui/index.js'

function Row({ label, hint, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300" htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  )
}

export default function ApiSourceDialog({ open, field, onCancel, onImport, onFetchSource }) {
  const saved = (field && field.apiSource) || {}
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState('')
  const [path, setPath] = useState('')
  const [labelKey, setLabelKey] = useState('')
  const [valueKey, setValueKey] = useState('')
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [keys, setKeys] = useState([])

  useEffect(() => {
    if (!open) return
    setUrl(saved.url || '')
    setHeaders(saved.headers || '')
    setPath(saved.path || '')
    setLabelKey(saved.labelKey || '')
    setValueKey(saved.valueKey || '')
    setData(null)
    setStatus('idle')
    setMessage('')
    setKeys([])
  }, [open])

  const resolved = data === null ? null : resolveItems(data, path)
  const items = resolved ? resolved.items : []
  const options = items.length > 0 ? mapOptions(items, labelKey, valueKey) : []

  const load = async () => {
    if (url.trim() === '') { setStatus('error'); setMessage('Indique o URL do endpoint.'); return }
    if (typeof onFetchSource !== 'function') { setStatus('error'); setMessage('Nenhum handler de fetch configurado.'); return }
    setStatus('loading')
    setMessage('')
    try {
      const res = await onFetchSource({ url: resolveUrl(url), headers: headers.trim() })
      const payload = unwrapPayload(res)
      let result = resolveItems(payload, path)
      if (result.items.length === 0 && path.trim() !== '') {
        const auto = resolveItems(payload, '')
        if (auto.items.length > 0) { result = auto; setPath(auto.path) }
      }
      setData(payload)
      if (!path.trim() && result.path) setPath(result.path)
      const foundKeys = itemKeys(result.items)
      setKeys(foundKeys)
      setLabelKey((prev) => foundKeys.includes(prev) ? prev : pickDefaultKey(foundKeys, ['label', 'name', 'nome', 'titulo', 'title', 'descricao', 'description']))
      setValueKey((prev) => foundKeys.includes(prev) ? prev : pickDefaultKey(foundKeys, ['value', 'id', 'codigo', 'code', 'slug']))
      setStatus('ok')
      setMessage(`${result.items.length} item(ns) encontrados.`)
    } catch (err) {
      setData(null)
      setStatus('error')
      setMessage(err.message || 'Falha ao contactar o endpoint.')
    }
  }

  const onUrlChange = (value) => {
    setUrl(value)
    if (value !== (saved.url || '')) {
      setPath(''); setLabelKey(''); setValueKey(''); setKeys([]); setData(null); setStatus('idle'); setMessage('')
    }
  }

  const doImport = () => {
    const opts = mapOptions(items, labelKey, valueKey)
    if (opts.length === 0) return
    onImport(opts, {
      url: url.trim(),
      headers: headers.trim(),
      path: resolved ? resolved.path : path.trim(),
      labelKey,
      valueKey,
    })
  }

  const showEmptyPath = status === 'ok' && data !== null && items.length === 0

  return (
    <Dialog open={open} onClose={onCancel} title="Serviço de API" description="Carregue as opções de um endpoint REST e faça o mapeamento dos campos (rótulo e valor)." className="max-w-3xl">
      <div className="mt-4 flex flex-col gap-3">
        <Row label="URL do endpoint" htmlFor="api-url" hint="Ex.: https://servico.example.com/api/itens">
          <div className="flex gap-2">
            <Input id="api-url" placeholder="https://servico.example.com/api/itens" value={url} onChange={(e) => onUrlChange(e.target.value)} />
            <Button variant="primary" onClick={load} disabled={status === 'loading'}>{status === 'loading' ? 'A obter…' : 'Obter'}</Button>
          </div>
        </Row>
        <Row label="Cabeçalhos (JSON, opcional)" htmlFor="api-headers">
          <Textarea id="api-headers" rows={2} placeholder={'{"Authorization": "Bearer token"}'} value={headers} onChange={(e) => setHeaders(e.target.value)} />
        </Row>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Row label="Caminho para a lista" htmlFor="api-path" hint="Ex.: data.items — vazio = automático">
            <Input id="api-path" placeholder="automático" value={path} onChange={(e) => setPath(e.target.value)} />
          </Row>
          <Row label="Campo do rótulo" htmlFor="api-label">
            <Input id="api-label" list="api-label-keys" placeholder="name" value={labelKey} onChange={(e) => setLabelKey(e.target.value)} />
          </Row>
          <Row label="Campo do valor" htmlFor="api-value">
            <Input id="api-value" list="api-value-keys" placeholder="id" value={valueKey} onChange={(e) => setValueKey(e.target.value)} />
          </Row>
        </div>
        <datalist id="api-label-keys">{keys.map((k) => (<option key={k} value={k} />))}</datalist>
        <datalist id="api-value-keys">{keys.map((k) => (<option key={k} value={k} />))}</datalist>
        {status === 'error' && <p className="text-xs font-medium text-red-600 dark:text-red-400">{message}</p>}
        {status === 'ok' && <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{message}</p>}
        {showEmptyPath && <p className="text-xs font-medium text-amber-700 dark:text-amber-400">Nenhuma lista encontrada neste caminho — ajuste o caminho e clique em "Obter".</p>}
        {status === 'ok' && items.length > 0 && <p className="text-xs text-gray-500 dark:text-gray-400">Mapeando {items.length} item(ns) em {options.length} opções (máx. 500).</p>}
        {options.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">Pré-visualização do mapeamento</p>
            <TableRoot className="max-h-44">
              <Table>
                <TableHead><TableRow><TableHeaderCell>Rótulo</TableHeaderCell><TableHeaderCell>Valor</TableHeaderCell></TableRow></TableHead>
                <TableBody>
                  {options.slice(0, 5).map((opt, i) => (
                    <TableRow key={`${opt.value}-${i}`}>
                      <TableCell>{opt.label}</TableCell>
                      <TableCell className="font-mono text-xs">{opt.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableRoot>
          </div>
        )}
        <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          <Button variant="primary" onClick={doImport} disabled={options.length === 0 || status === 'loading'}>
            {options.length > 0 ? `Importar ${options.length} opções` : 'Importar opções'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
