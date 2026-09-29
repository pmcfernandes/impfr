export function isContainerType(type) {
  return type === 'heading' || type === 'steps'
}

export function topLevelFields(fields) {
  const ids = new Set(fields.map((f) => f.id))
  const containerIds = new Set(fields.filter((f) => isContainerType(f.type)).map((f) => f.id))
  return fields.filter(
    (f) => !f.parentId || !ids.has(f.parentId) || !containerIds.has(f.parentId)
  )
}

export function childrenOf(fields, parentId) {
  return fields.filter((f) => f.parentId === parentId)
}

export function siblingsOf(fields, parentId) {
  return parentId ? childrenOf(fields, parentId) : topLevelFields(fields)
}

export function descendantsOf(fields, rootId) {
  const out = []
  const walk = (parentId) => {
    for (const child of fields.filter((f) => f.parentId === parentId)) {
      out.push(child)
      walk(child.id)
    }
  }
  walk(rootId)
  return out
}

export function isAncestorOf(fields, ancestorId, fieldId) {
  let cursor = fields.find((f) => f.id === fieldId)
  let guard = 0
  while (cursor && cursor.parentId && guard++ < 10) {
    if (cursor.parentId === ancestorId) return true
    cursor = fields.find((f) => f.id === cursor.parentId)
  }
  return false
}

export function canDropInto(fields, parentId, type) {
  if (!parentId) return true
  if (type === 'steps') return false
  const parent = fields.find((f) => f.id === parentId)
  if (!parent) return false
  if (!isContainerType(parent.type)) return false
  if (parent.type === 'steps') return type === 'heading'
  return true
}

export function wizardSections(fields, stepsField) {
  return childrenOf(fields, stepsField.id).filter((f) => f.type === 'heading')
}

function subtreeSize(fields, id) {
  let size = 1
  for (const child of childrenOf(fields, id)) {
    size += subtreeSize(fields, child.id)
  }
  return size
}

export function flatInsertIndex(fields, parentId, childIndex) {
  const index = Math.max(0, childIndex)
  if (parentId) {
    const kids = childrenOf(fields, parentId)
    if (index >= kids.length) {
      const containerIndex = fields.findIndex((f) => f.id === parentId)
      if (containerIndex < 0) return fields.length
      return containerIndex + subtreeSize(fields, parentId)
    }
    return fields.indexOf(kids[index])
  }
  const tops = topLevelFields(fields)
  if (tops.length === 0) return fields.length
  if (index >= tops.length) {
    const last = tops[tops.length - 1]
    return fields.indexOf(last) + subtreeSize(fields, last.id)
  }
  return fields.indexOf(tops[index])
}
