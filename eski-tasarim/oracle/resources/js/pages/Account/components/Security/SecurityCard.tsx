import { Icon } from '@/components/shared/icon'

interface SecurityCardProps {
  title: string
  description?: string
  iconName?: string
  children: React.ReactNode
}

export function SecurityCard({ title, description, iconName, children }: SecurityCardProps) {
  return (
    <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card-bg border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider flex items-center gap-2">
            {iconName && <Icon name={iconName} className="w-4 h-4" />}
            {title}
          </h3>
        </div>
        {description && (
          <p className="text-xs text-ko-text-card-meta mt-1 ml-4">{description}</p>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
