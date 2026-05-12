import { Icon } from '@/components/shared/icon'

export function FeatureBadge({ feature }) {
  const iconName = feature.icon || 'ti ti-sparkles'

  return (
    <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg px-3 py-2 flex items-center gap-2">
      <Icon name={iconName} className="w-4 h-4 text-ko-brand-primary flex-shrink-0" />
      <p className="text-sm text-ko-text-primary truncate">{feature.label}</p>
    </div>
  )
}
