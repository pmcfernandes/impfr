import { useEffect, useState } from 'react'

const MIN_WIDTH = 260
const MAX_WIDTH = 560
const DEFAULT_WIDTH = 330
const STORAGE_KEY = 'formeditor.propsWidth'

function clampWidth(w) {
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, Math.round(w)))
}

function readStoredWidth() {
  try {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY))
    return Number.isFinite(saved) && saved >= MIN_WIDTH && saved <= MAX_WIDTH ? saved : DEFAULT_WIDTH
  } catch {
    return DEFAULT_WIDTH
  }
}

export function usePanelResize() {
  const [width, setWidth] = useState(readStoredWidth)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(width))
    } catch {
      /* ignore */
    }
  }, [width])

  const startResize = (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    const startX = e.clientX
    const startW = width
    const onMove = (ev) => setWidth(clampWidth(startW + (startX - ev.clientX)))
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const resizeByKey = (delta) => setWidth((w) => clampWidth(w + delta))

  return { width, startResize, resizeByKey }
}
