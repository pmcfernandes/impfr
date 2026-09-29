import { createContext, useContext } from 'react'

export const FileHandlersContext = createContext(null)

export function useFileHandlers() {
  return useContext(FileHandlersContext)
}
