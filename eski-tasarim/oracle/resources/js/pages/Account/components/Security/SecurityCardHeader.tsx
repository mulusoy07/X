import { Icon } from '@/components/shared/icon'

interface SecurityCardHeaderProps {
  title: string
  icon?: string
  animated?: boolean
}

export function SecurityCardHeader({ title, icon, animated = true }: SecurityCardHeaderProps) {
  return (
    <div className="px-4 py-3 bg-ko-card-bg border-b border-ko-border-primary">
      <div className="flex items-center gap-2">
        {animated ? (
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
        ) : icon ? (
          <Icon name={icon} className="w-4 h-4 text-ko-brand-primary" />
        ) : null}
        <h3 className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
          {title}
        </h3>
      </div>
    </div>
  )
}
