import { ReactNode } from 'react'
import type { PageProps } from '@/types/inertia'

interface PageHeaderProps {
  title?: string
  subtitle?: string
  icon?: ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, icon, className = '' }: PageHeaderProps) {
  const { app } = usePage<PageProps>().props
  const displayTitle = title || app.name

  if (!displayTitle) return null

  return (
    <div className={`mb-6 ${className}`}>
      <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
        <div className="relative p-6 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent">
          <div className="flex items-center gap-4">
            {icon ? (
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center border border-ko-brand-primary/20">
                <div className="text-ko-brand-primary">{icon}</div>
              </div>
            ) : (
              <div className="flex-shrink-0 w-1 h-12 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full shadow-lg shadow-ko-brand-primary/30" />
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-ko-text-primary mb-1">{displayTitle}</h1>
              {subtitle && (
                <p className="text-ko-text-muted leading-relaxed">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
