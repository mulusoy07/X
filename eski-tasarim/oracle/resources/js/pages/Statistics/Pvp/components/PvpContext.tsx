import { createContext, useContext } from 'react'

const PvpContext = createContext(null)

export function PvpProvider({ initialData, nations, jobs, periods, children }) {
  return (
    <PvpContext.Provider value={{ data: initialData, nations, jobs, periods }}>
      {children}
    </PvpContext.Provider>
  )
}

export function usePvp() {
  const context = useContext(PvpContext)
  if (!context) {
    throw new Error('usePvp must be used within a PvpProvider')
  }
  return context
}
