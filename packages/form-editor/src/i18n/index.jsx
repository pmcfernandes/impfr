import { createContext, useContext, useMemo } from 'react'
import pt from './pt.js'
import en from './en.js'

const DICTS = { pt, en }

export const DEFAULT_LANG = 'pt'

const LanguageContext = createContext({ lang: DEFAULT_LANG, t: (key) => key })

function interpolate(template, params) {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    params[name] !== undefined ? String(params[name]) : `{${name}}`
  )
}

function createTranslator(lang) {
  const dict = DICTS[lang] || DICTS[DEFAULT_LANG]
  const fallback = DICTS[DEFAULT_LANG]
  return function t(key, params) {
    const template = dict[key] ?? fallback[key] ?? key
    return interpolate(template, params)
  }
}

export function LanguageProvider({ lang = DEFAULT_LANG, children }) {
  const value = useMemo(() => ({ lang, t: createTranslator(lang) }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useTranslation() {
  const { t } = useLanguage()
  return t
}

export function getTranslator(lang) {
  return createTranslator(lang)
}

export function getDict(lang) {
  return DICTS[lang] || DICTS[DEFAULT_LANG]
}

export { DICTS, pt, en }
