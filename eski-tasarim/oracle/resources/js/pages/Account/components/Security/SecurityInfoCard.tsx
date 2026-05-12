import { Icon } from '@/components/shared/icon'
import { useTranslation } from '@/hooks/useTranslation'
import { SecurityCardHeader } from './SecurityCardHeader'

interface InfoTip {
  readonly icon: string
  readonly titleKey: string
  readonly descKey: string
}

interface SecurityInfoCardProps {
  tips: readonly InfoTip[]
  headerTitle?: string
}

export function SecurityInfoCard({ tips, headerTitle }: SecurityInfoCardProps) {
  const { t } = useTranslation()
  const title = headerTitle || t('account.security.important_info')

  return (
    <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
      <SecurityCardHeader title={title} icon="ti ti-info-circle" animated={false} />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((tip) => (
            <div key={tip.titleKey} className="flex items-start gap-3 p-4 bg-ko-widget-bg rounded-xl">
              <div className="w-8 h-8 rounded-full bg-ko-brand-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} className="w-4 h-4 text-ko-brand-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-ko-text-card-title text-sm">
                  {t(`account.security.${tip.titleKey}`)}
                </h5>
                <p className="text-xs text-ko-text-card-meta mt-1">
                  {t(`account.security.${tip.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
