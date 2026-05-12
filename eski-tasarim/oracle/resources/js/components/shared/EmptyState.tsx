import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: string
  title?: string
  description?: string
  className?: string
  iconClassName?: string
}

export function EmptyState({
  icon = 'ti ti-alert-circle',
  title,
  description,
  className,
  iconClassName
}: EmptyStateProps) {
  const { t } = useTranslation()
  
  const displayTitle = title ?? t('components.empty_state.title')
  const displayDescription = description ?? t('components.empty_state.description')
  
  return (
    <div className={cn(
      'bg-ko-main min-h-screen flex items-center justify-center',
      className
    )}>
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-ko-widget-bg rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name={icon} className={cn('w-8 h-8 text-ko-text-muted', iconClassName)} />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">{displayTitle}</h2>
          <p className="text-ko-text-muted text-sm">{displayDescription}</p>
        </div>
      </div>
    </div>
  )
}
