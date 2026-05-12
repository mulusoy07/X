import { ReactNode } from 'react'
import { useLayout } from '@/hooks'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from './partials/Header'
import { Footer } from './partials/Footer'
import { CookieConsent } from '@/layouts/widgets/CookieConsent'
import { QuickActionsWidget } from '@/layouts/widgets/QuickActions'
import { ScrollButtonsWidget } from '@/layouts/widgets/ScrollButtons'
import { GameFeed } from '@/layouts/widgets/GameFeed'
import { ServerProvider } from '@/contexts/server-context'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const layout = useLayout()
  const style = layout.config.style || 'boxed'

  return (
    <ServerProvider>
      <TooltipProvider>
        <div className={`flex flex-col min-h-screen ${style === 'boxed' ? 'container' : ''} bg-ko-wrapper border-l border-r border-ko-border-primary`}>
          <Header />

          <main className="flex-grow bg-ko-wrapper pt-[67px] sm:pt-[84px]">
            {children}
          </main>

          <Footer />
        </div>

        <div className="hidden xl:block">
          <GameFeed position="left" defaultOpen />
        </div>
        <QuickActionsWidget variant="sidebar" className="fixed top-1/2 -translate-y-1/2 right-6 hidden xl:block z-40" />
        <QuickActionsWidget variant="bottom-nav" className="xl:hidden" />
        <div className="hidden xl:block">
          <ScrollButtonsWidget />
        </div>
        <CookieConsent />
      </TooltipProvider>
    </ServerProvider>
  )
}
