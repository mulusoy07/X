import { Icon } from '@/components/shared/icon'

export function ImportantNotes() {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-ko-text-primary mb-4">{t('downloads.important_notes')}</h3>
      <div className="space-y-3 text-sm text-ko-text-muted">
        <div className="flex items-start gap-2">
          <Icon name="ti ti-alert-circle" className="w-4 h-4 text-ko-brand-primary mt-0.5 flex-shrink-0" />
          <span>{t('downloads.antivirus_warning')}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="ti ti-clock" className="w-4 h-4 text-ko-brand-primary mt-0.5 flex-shrink-0" />
          <span>{t('downloads.download_time_depends')}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="ti ti-shield" className="w-4 h-4 text-ko-brand-primary mt-0.5 flex-shrink-0" />
          <span>{t('downloads.files_safe')}</span>
        </div>
      </div>
    </div>
  )
}
