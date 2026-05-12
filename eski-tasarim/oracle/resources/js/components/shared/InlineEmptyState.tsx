import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

interface InlineEmptyStateProps {
  icon?: string
  title?: string
  description?: string
  className?: string
}

export function InlineEmptyState({
  icon = 'ti ti-inbox',
  title,
  description,
  className,
}: InlineEmptyStateProps) {
  const { t } = useTranslation()

  const displayTitle = title ?? t('components.empty_state.title')
  const displayDescription = description ?? t('components.empty_state.description')

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      <div className="w-12 h-12 bg-ko-widget-bg rounded-xl flex items-center justify-center mb-3">
        <Icon name={icon} className="w-6 h-6 text-ko-text-muted" />
      </div>
      <h3 className="text-sm font-semibold text-ko-text-primary mb-1">{displayTitle}</h3>
      <p className="text-xs text-ko-text-muted">{displayDescription}</p>
    </div>
  )
}
