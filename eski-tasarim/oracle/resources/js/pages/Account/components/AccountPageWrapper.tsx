import { ReactNode } from 'react'
import { AccountSidebar } from './AccountSidebar'

interface AccountPageWrapperProps {
  children: ReactNode
}

export function AccountPageWrapper({ children }: AccountPageWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <AccountSidebar />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}
