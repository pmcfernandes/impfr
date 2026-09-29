import { useCallback, useRef } from 'react'
import {
  childrenOf, createField, flatInsertIndex,
  isAncestorOf, isContainerType, isDataType,
  slugify, uid, uniqueName,
} from '../core/index.js'

function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function takenNames(fields) {
  return fields.filter((f) => isDataType(f.type)).map((f) => f.name)
}

export function useFieldTree(form, mutateForm, setSelectedId) {
  const formRef = useRef(form)
  formRef.current = form

  const addField = useCallback((type) => {
    const field = createField(type, takenNames(formRef.current.fields))
    mutateForm((prev) => ({ ...prev, fields: [...prev.fields, field] }))
    setSelectedId(field.id)
  }, [mutateForm, setSelectedId])

  const insertField = useCallback((type, index, parentId = null) => {
    const field = createField(type, takenNames(formRef.current.fields))
    const targetParent = type === 'steps' ? null : parentId || null
    if (targetParent) field.parentId = targetParent
    if (targetParent && type === 'heading') {
      const parent = formRef.current.fields.find((f) => f.id === targetParent)
      if (parent && parent.type === 'steps') {
        const count = childrenOf(formRef.current.fields, targetParent).length
        const fromSteps = Array.isArray(parent.steps) ? parent.steps[count] : null
        field.label = fromSteps || `Passo ${count + 1}`
      }
    }
    mutateForm((prev) => {
      const fields = prev.fields.slice()
      const at = flatInsertIndex(fields, targetParent, index)
      fields.splice(at, 0, field)
      return { ...prev, fields }
    })
    setSelectedId(field.id)
  }, [mutateForm, setSelectedId])

  const moveField = useCallback((sourceId, parentId, index) => {
    const source = formRef.current.fields.find((f) => f.id === sourceId)
    if (!source) return
    let targetParent = parentId || null
    if (targetParent && source.type === 'steps') targetParent = null
    if (targetParent && (targetParent === sourceId || isAncestorOf(formRef.current.fields, sourceId, targetParent))) {
      targetParent = null
    }
    mutateForm((prev) => {
      const rest = prev.fields.filter((f) => f.id !== sourceId)
      const moved = { ...source }
      if (targetParent) moved.parentId = targetParent
      else delete moved.parentId
      const at = flatInsertIndex(rest, targetParent, index)
      rest.splice(at, 0, moved)
      return { ...prev, fields: rest }
    })
  }, [mutateForm])

  const updateField = useCallback((field) => {
    mutateForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === field.id ? field : f)),
    }))
  }, [mutateForm])

  const duplicateField = useCallback((id) => {
    const currentFields = formRef.current.fields
    const index = currentFields.findIndex((f) => f.id === id)
    if (index < 0) return
    const source = currentFields[index]
    const clone = cloneJson(source)
    clone.id = uid()
    clone.label = `${source.label} (cópia)`
    if (isDataType(source.type)) {
      clone.name = uniqueName(slugify(`${source.name}_copia`), takenNames(currentFields))
    }
    const additions = [clone]

    if (isContainerType(source.type)) {
      const idMap = { [source.id]: clone.id }
      const queue = [source.id]
      while (queue.length > 0) {
        const parentId = queue.shift()
        for (const child of childrenOf(currentFields, parentId)) {
          const childClone = cloneJson(child)
          childClone.id = uid()
          if (isDataType(child.type)) {
            childClone.name = uniqueName(slugify(`${child.name}_copia`), takenNames(currentFields))
          }
          childClone.parentId = idMap[parentId]
          idMap[child.id] = childClone.id
          additions.push(childClone)
          if (isContainerType(child.type)) queue.push(child.id)
        }
      }
    }

    const fields = currentFields.slice()
    fields.splice(index + 1, 0, ...additions)
    mutateForm((prev) => ({ ...prev, fields }))
    setSelectedId(clone.id)
  }, [mutateForm, setSelectedId])

  const deleteField = useCallback((id) => {
    const currentFields = formRef.current.fields
    const ids = new Set([id])
    let changed = true
    while (changed) {
      changed = false
      for (const f of currentFields) {
        if (f.parentId && ids.has(f.parentId) && !ids.has(f.id)) {
          ids.add(f.id)
          changed = true
        }
      }
    }
    mutateForm((prev) => ({ ...prev, fields: prev.fields.filter((f) => !ids.has(f.id)) }))
  }, [mutateForm])

  return { addField, insertField, moveField, updateField, duplicateField, deleteField }
}
