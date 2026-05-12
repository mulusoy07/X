import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  icon?: string
  title?: string
  message?: string
  className?: string
  iconClassName?: string
}

export function ErrorState({
  icon = 'ti ti-alert-circle',
  title,
  message,
  className,
  iconClassName
}: ErrorStateProps) {
  const { t } = useTranslation()
  
  const displayTitle = title ?? t('components.error_state.title')
  const displayMessage = message ?? t('components.error_state.message')

  return (
    <div className={cn(
      'bg-ko-main min-h-screen flex items-center justify-center',
      className
    )}>
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name={icon} className={cn('w-8 h-8 text-red-500', iconClassName)} />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">{displayTitle}</h2>
          <p className="text-ko-text-muted text-sm">{displayMessage}</p>
        </div>
      </div>
    </div>
  )
}
