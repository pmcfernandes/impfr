import { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/index.js'

const DEFAULT_TINYMCE_VERSION = '6.8.6'
let loader = null
let loaderUrl = null

function loadTinyMCE(baseUrl) {
  if (typeof window === 'undefined') return Promise.reject(new Error('Browser only.'))
  if (window.tinymce) return Promise.resolve(window.tinymce)
  if (!loader || loaderUrl !== baseUrl) {
    loaderUrl = baseUrl
    loader = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = baseUrl
      script.referrerPolicy = 'origin'
      script.onload = () => {
        if (window.tinymce) resolve(window.tinymce)
        else reject(new Error('TinyMCE indisponível.'))
      }
      script.onerror = () => reject(new Error('Falha ao carregar o TinyMCE (sem ligação à Internet?).'))
      document.head.appendChild(script)
    })
    loader.catch(() => { loader = null })
  }
  return loader
}

export default function RichTextEditor({ id, value = '', onChange, height = 220, tinymceBaseUrl }) {
  const textareaRef = useRef(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const [fallback, setFallback] = useState(false)

  const cdnBase = tinymceBaseUrl || `https://cdnjs.cloudflare.com/ajax/libs/tinymce/${DEFAULT_TINYMCE_VERSION}`
  const cdnUrl = tinymceBaseUrl || `${cdnBase}/tinymce.min.js`

  useEffect(() => {
    let destroyed = false
    let instance = null

    loadTinyMCE(cdnUrl)
      .then((tinymce) => {
        if (destroyed || !textareaRef.current) return
        tinymce.init({
          target: textareaRef.current,
          base_url: cdnBase,
          menubar: false,
          branding: false,
          promotion: false,
          statusbar: false,
          entity_encoding: 'raw',
          height,
          plugins: 'lists autolink fullscreen',
          toolbar: 'fullscreen | bold italic underline | h2 h3 | bullist numlist | removeformat',
          content_style: 'body{font-family:inherit;font-size:14px;color:#1b2333;margin:8px} p{margin:0 0 8px} ul,ol{margin:0 0 8px;padding-left:20px}',
          setup: (editor) => {
            editor.on('init', () => {
              instance = editor
              if (!destroyed) editor.setContent(value || '')
            })
            const emit = () => {
              if (instance && typeof onChangeRef.current === 'function') onChangeRef.current(instance.getContent())
            }
            editor.on('change input undo redo', emit)
          },
        })
      })
      .catch(() => { if (!destroyed) setFallback(true) })

    return () => {
      destroyed = true
      const tinymce = window.tinymce
      if (!tinymce) return
      const target = instance || (id ? tinymce.get(id) : null)
      if (target) tinymce.remove(target)
    }
  }, [id, height, cdnUrl, cdnBase])

  if (fallback) {
    return <Textarea rows={10} value={value} placeholder="<p>HTML</p>" onChange={(e) => onChange(e.target.value)} />
  }

  return <textarea ref={textareaRef} id={id} defaultValue={value} />
}
