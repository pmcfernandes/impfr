import { Fragment, useRef, useState } from 'react'
import {
  canDropInto, childrenOf, conditionSummary,
  isContainerType, isDataType, siblingsOf, topLevelFields, typeMeta,
} from '../core/index.js'
import { useLanguage } from '../i18n/index.jsx'
import { cx } from '../ui/index.js'

function spanOf(field) {
  const n = Number(field.columns)
  if (!Number.isFinite(n)) return 12
  return Math.min(12, Math.max(1, Math.round(n)))
}

export default function Canvas({ fields, selectedId, onSelect, onInsert, onMove, onDuplicate, onDelete }) {
  const { t } = useLanguage()
  const listRef = useRef(null)
  const [drop, setDrop] = useState(null)
  const [dragId, setDragId] = useState(null)

  const indexFrom = (el, clientY) => {
    if (!el) return 0
    const cards = Array.from(el.querySelectorAll(':scope > [data-field-card]'))
    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect()
      if (clientY < rect.top + rect.height / 2) return i
    }
    return cards.length
  }

  const zoneHandlers = (parentId, elementOf) => ({
    onDragOver: (e) => {
      e.preventDefault()
      e.stopPropagation()
      const allowed = String(e.dataTransfer.effectAllowed || 'copy')
      e.dataTransfer.dropEffect = allowed === 'move' ? 'move' : 'copy'
      setDrop({ parentId, index: indexFrom(elementOf(e), e.clientY) })
    },
    onDrop: (e) => {
      e.preventDefault()
      e.stopPropagation()
      const data = e.dataTransfer.getData('text/plain')
      const index = indexFrom(elementOf(e), e.clientY)
      setDrop(null)
      setDragId(null)
      if (data.startsWith('new:')) {
        const type = data.slice(4)
        if (canDropInto(fields, parentId, type)) onInsert(type, index, parentId)
      } else if (data.startsWith('move:')) {
        const sourceId = data.slice(5)
        const source = fields.find((f) => f.id === sourceId)
        if (!source || !canDropInto(fields, parentId, source.type)) return
        let target = index
        if ((source.parentId || null) === parentId) {
          const siblings = siblingsOf(fields, parentId)
          const position = siblings.findIndex((f) => f.id === sourceId)
          if (position > -1 && position < target) target -= 1
        }
        onMove(sourceId, parentId, target)
      }
    },
  })

  const isCardTarget = (parentId, index) => Boolean(drop && drop.parentId === parentId && drop.index === index)
  const isZoneEnd = (parentId, count) => Boolean(drop && drop.parentId === parentId && drop.index >= count)
  const handleDragEnd = () => { setDrop(null); setDragId(null) }

  const renderCard = (field, targeted = false) => {
    const meta = typeMeta(field.type)
    const selected = field.id === selectedId
    const summary = conditionSummary(field.condition, { summary: t('condition.summary') })
    const container = isContainerType(field.type)
    const childCount = childrenOf(fields, field.id).length

    return (
      <div
        data-field-card
        className={cx(
          'field-card group flex cursor-grab touch-none select-none items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-sm transition',
          selected ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-500' : 'border-gray-200 bg-white hover:border-gray-300',
          dragId === field.id && 'opacity-40',
          field.visible === false && 'opacity-60',
          targeted && 'ring-2 ring-blue-500 ring-offset-1'
        )}
        style={{ gridColumn: `span ${spanOf(field)}` }}
        draggable
        onClick={(e) => { e.stopPropagation(); onSelect(field.id) }}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', 'move:' + field.id)
          e.dataTransfer.effectAllowed = 'move'
          setDragId(field.id)
        }}
        onDragEnd={handleDragEnd}
      >
        <span className="drag-handle hidden flex-none select-none text-sm leading-none text-gray-300 sm:block" aria-hidden="true">:::</span>
        <span className="type-badge flex h-6 min-w-[30px] flex-none items-center justify-center rounded-md bg-blue-50 px-1.5 text-[11px] font-bold text-blue-700">
          {t(`fields.badge.${field.type}`)}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="field-card-label truncate text-sm font-semibold text-gray-900">
            {field.label || t('fields.noLabel')}
            {isDataType(field.type) && field.required && <span className="text-red-500">*</span>}
          </span>
          <span className="field-card-sub truncate text-xs text-gray-500">
            {t(`fields.${field.type}`)}
            {isDataType(field.type) && field.name ? ` · ${field.name}` : ''}
            {spanOf(field) < 12 ? ` · ${spanOf(field)}/12` : ''}
            {summary ? ` · ${summary}` : ''}
            {container && childCount > 0 ? ` · ${childCount} ${t('fields.internal')}` : ''}
            {field.visible === false ? ` · ${t('fields.hidden')}` : ''}
          </span>
        </span>
        <span className={cx('field-card-actions flex flex-none gap-0.5 transition-opacity', selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}>
          <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-900" title={t('common.duplicate')} onClick={(e) => { e.stopPropagation(); onDuplicate(field.id) }}>⧉</button>
          <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-600" title={t('common.delete')} onClick={(e) => { e.stopPropagation(); onDelete(field.id) }}>✕</button>
        </span>
      </div>
    )
  }

  const renderZone = (parentId, depth = 0) => {
    const items = siblingsOf(fields, parentId)
    return (
      <Fragment>
        {items.map((field, i) => (
          <Fragment key={field.id}>
            {renderCard(field, isCardTarget(parentId, i))}
            {isContainerType(field.type) && depth < 5 && (
              <div
                className={cx(
                  'nested-zone col-span-full grid min-h-12 h-max grid-cols-12 content-start gap-2 rounded-lg border-l-2 border-dashed py-2 pl-3',
                  childrenOf(fields, field.id).length > 0 ? 'border-gray-300 bg-gray-50/70' : 'border-blue-300 bg-blue-50/40',
                  isZoneEnd(field.id, childrenOf(fields, field.id).length) && 'ring-2 ring-blue-400 ring-inset'
                )}
                {...zoneHandlers(field.id, (e) => e.currentTarget)}
              >
                {childrenOf(fields, field.id).length === 0 && (
                  <p className="col-span-full pl-1 text-xs text-gray-400">
                    {field.type === 'steps'
                      ? t('canvas.dropSection', { label: field.label || t('fields.steps') })
                      : t('canvas.dropContainer', { label: field.label || t('fields.heading') })}
                  </p>
                )}
                {renderZone(field.id, depth + 1)}
              </div>
            )}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  return (
    <main
      className="canvas flex min-h-0 flex-col lg:overflow-hidden"
      onClick={() => onSelect(null)}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDrop(null) }}
      {...zoneHandlers(null, () => listRef.current)}
    >
      <div
        className={cx(
          'canvas-drop grid min-h-[240px] flex-1 grid-cols-12 content-start gap-2 overflow-y-auto rounded-lg border p-3.5 transition-colors',
          drop && drop.parentId === null ? 'is-over border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-white'
        )}
        ref={listRef}
        {...zoneHandlers(null, (e) => e.currentTarget)}
      >
        {fields.length === 0 && !drop && (
          <div className="canvas-empty col-span-full flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 px-6 py-14 text-center">
            <strong className="text-sm font-semibold text-gray-900">{t('canvas.empty')}</strong>
            <span className="text-sm text-gray-500">{t('canvas.emptyHint')}</span>
          </div>
        )}
        {renderZone(null)}
      </div>
    </main>
  )
}
