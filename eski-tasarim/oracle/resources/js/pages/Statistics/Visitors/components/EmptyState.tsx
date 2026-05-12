import { Icon } from '@/components/shared/icon'

export function EmptyState({
  icon = 'ti ti-skull',
  height = 200,
  title,
  description
}) {
  const { t } = useTranslation()

  return (
    <div
      className="w-full flex flex-col items-center justify-center text-ko-text-muted"
      style={{ height: `${height}px` }}
    >
      <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mb-4 border border-ko-border-primary">
        <Icon name={icon} className="w-8 h-8 opacity-50" />
      </div>
      {title && (
        <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
          {title}
        </h3>
      )}
      <p className="text-sm">
        {description || t('plugins.game.statistics_page.pve.empty.description')}
      </p>
    </div>
  )
}
