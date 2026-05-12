import { createContext, useContext } from 'react'

const PveContext = createContext(null)

export function PveProvider({ initialData, nations, jobs, periods, children }) {
  return (
    <PveContext.Provider value={{ data: initialData, nations, jobs, periods }}>
      {children}
    </PveContext.Provider>
  )
}

export function usePve() {
  const context = useContext(PveContext)
  if (!context) {
    throw new Error('usePve must be used within a PveProvider')
  }
  return context
}
