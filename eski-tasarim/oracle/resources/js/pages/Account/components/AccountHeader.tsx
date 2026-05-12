import { Icon } from '@/components/shared/icon'

interface AccountHeaderProps {
  userName: string
}

export function AccountHeader({ userName }: AccountHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary rounded-xl flex items-center justify-center">
          <Icon name="ti ti-user" className="w-6 h-6 text-ko-text-dark" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-ko-text-card-title">
            {t('account.welcome')} <span className="text-ko-brand-primary">{userName}</span>
          </h2>
          <p className="text-sm text-ko-text-card-meta">
            {t('account.welcome_message')}
          </p>
        </div>
      </div>
    </div>
  )
}
