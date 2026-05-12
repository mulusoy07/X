import { Icon } from '@/components/shared/icon'

export function EmptyState({ icon = 'ti ti-shield-off' }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card-bg border border-ko-border-primary rounded-lg p-12 text-center">
      <Icon name={icon} className="w-16 h-16 mx-auto text-ko-text-muted/50 mb-4" />
      <h3 className="text-lg font-bold text-ko-text-primary mb-2">
        {t('rankings.no_results')}
      </h3>
      <p className="text-sm text-ko-text-muted">
        {t('rankings.try_different')}
      </p>
    </div>
  )
}
