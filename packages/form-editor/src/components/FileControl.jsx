import { useRef, useState } from 'react'
import { useFileHandlers } from '../contexts.js'
import { useLanguage } from '../i18n/index.jsx'
import { Button, cx } from '../ui/index.js'

export function fmtBytes(bytes) {
  const n = Number(bytes) || 0
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function fileExt(name) {
  const i = String(name || '').lastIndexOf('.')
  return i > 0 ? String(name).slice(i).toLowerCase() : ''
}

export default function FileControl({ field, value, onChange, error, disabled }) {
  const { t } = useLanguage()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileHandlers = useFileHandlers()
  const files = Array.isArray(value) ? value : []
  const maxSizeMb = Number(field.maxSizeMb) > 0 ? Number(field.maxSizeMb) : 5
  const maxBytes = maxSizeMb * 1024 * 1024
  const allowed = String(field.accept || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  const multiple = field.multiple !== false
  const sizeLabel = fmtBytes(maxBytes)

  const processFiles = async (picked) => {
    if (picked.length === 0) return
    setMessage('')
    if (!multiple && picked.length + files.length > 1) {
      setMessage(t('file.singleError'))
      return
    }
    for (const file of picked) {
      if (file.size > maxBytes) {
        setMessage(t('file.sizeError', { name: file.name, size: sizeLabel }))
        return
      }
      const ext = fileExt(file.name)
      if (allowed.length && !allowed.includes(ext)) {
        setMessage(t('file.formatError', { name: file.name, formats: allowed.join(', ') }))
        return
      }
    }
    setBusy(true)
    try {
      if (fileHandlers && typeof fileHandlers.onUploadFiles === 'function') {
        const res = await fileHandlers.onUploadFiles({ field, files: picked })
        onChange([...files, ...((res && res.files) || [])])
      } else {
        const local = picked.map((f) => ({ name: f.name, original: f.name, size: f.size, _file: f }))
        onChange([...files, ...local])
      }
    } catch (err) {
      setMessage(err.message || t('file.uploadError'))
    } finally {
      setBusy(false)
    }
  }

  const remove = (index) => {
    const file = files[index]
    onChange(files.filter((_, i) => i !== index))
    if (file && file.name && fileHandlers && typeof fileHandlers.onDeleteFile === 'function') {
      fileHandlers.onDeleteFile({ field, name: file.name }).catch(() => {})
    }
  }

  const fileHref = (file) => {
    if (fileHandlers && typeof fileHandlers.getFileUrl === 'function') {
      return fileHandlers.getFileUrl({ field, name: file.name })
    }
    return file._file ? URL.createObjectURL(file._file) : undefined
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cx(
          'file-drop rounded-lg border border-dashed p-3 text-center transition-colors',
          dragOver ? 'border-blue-400 bg-blue-50/70 dark:bg-blue-950/70' : 'border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/60'
        )}
        onDragOver={(e) => {
          if (disabled || busy) return
          e.preventDefault()
          e.dataTransfer.dropEffect = 'copy'
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (disabled || busy) return
          processFiles(Array.from(e.dataTransfer.files || []))
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={field.accept || undefined}
          disabled={disabled || busy}
          onChange={(e) => {
            const picked = Array.from(e.target.files || [])
            e.target.value = ''
            processFiles(picked)
          }}
        />
        <Button size="sm" onClick={() => inputRef.current && inputRef.current.click()} disabled={disabled || busy}>
          {busy ? t('file.uploading') : files.length > 0 ? t('file.addMore') : t('file.add')}
        </Button>
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {t('file.maxSize', { size: sizeLabel })}
          {allowed.length ? ` · ${allowed.join(' ')}` : ''}
          {!multiple ? ` · ${t('file.singleOnly')}` : ''} · {t('file.dropHere')}
        </p>
      </div>
      {message && <p className="text-xs font-medium text-red-600 dark:text-red-400">{message}</p>}
      {files.map((file, i) => {
        const href = fileHref(file)
        return (
          <div key={`${file.name}-${i}`} className="file-item flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2.5 py-1.5">
            <span className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">{file.original}</span>
            <span className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">{fmtBytes(file.size)}</span>
            {href && (
              <a className="text-xs font-semibold whitespace-nowrap text-blue-600 dark:text-blue-400 hover:underline" href={href} target="_blank" rel="noreferrer">
                {t('file.open')}
              </a>
            )}
            <button
              type="button"
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 dark:text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400"
              title={t('file.remove')}
              disabled={disabled || busy}
              onClick={() => remove(i)}
            >
              ✕
            </button>
          </div>
        )
      })}
      {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
