import { createContext, useContext } from 'react'
import { usePage, router } from '@inertiajs/react'
import type { ServerInfo } from '@/layouts/widgets/QuickActions/types'

interface ServerContextValue {
  servers: ServerInfo[]
  selectedServerNo: string
  selectServer: (serverNo: string) => void
}

const ServerContext = createContext<ServerContextValue | undefined>(undefined)

const COOKIE_NAME = 'selected_server'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

function writeServerCookie(serverNo: string): void {
  document.cookie = `${COOKIE_NAME}=${serverNo}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function ServerProvider({ children }: { children: React.ReactNode }) {
  const { layout } = usePage<{ layout: { servers: ServerInfo[]; selected_server_no: number } }>().props

  const servers = layout?.servers ?? []
  const selectedServerNo = String(layout?.selected_server_no ?? 1)

  function selectServer(serverNo: string): void {
    if (serverNo === selectedServerNo) return
    writeServerCookie(serverNo)
    router.visit(window.location.href, { preserveState: false, preserveScroll: false })
  }

  return (
    <ServerContext.Provider value={{ servers, selectedServerNo, selectServer }}>
      {children}
    </ServerContext.Provider>
  )
}

export function useServer(): ServerContextValue {
  const context = useContext(ServerContext)

  if (!context) {
    throw new Error('useServer must be used within ServerProvider')
  }

  return context
}
