import { createContext, useContext } from 'react'

const VisitorsContext = createContext(null)

export function VisitorsProvider({ initialData, periods, children }) {
  return (
    <VisitorsContext.Provider value={{ data: initialData, periods }}>
      {children}
    </VisitorsContext.Provider>
  )
}

export function useVisitors() {
  const context = useContext(VisitorsContext)
  if (!context) {
    throw new Error('useVisitors must be used within a VisitorsProvider')
  }
  return context
}
