import { Icon } from '@/components/shared/icon'
import type { PremiumData } from './types'

interface PremiumBadgeProps {
  premium: PremiumData
}

export function PremiumBadge({ premium }: PremiumBadgeProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/5 to-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon name="ti ti-crown" className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <div className="text-xs text-yellow-400/70 mb-1">{t('account.premium_membership')}</div>
            <div className="text-lg font-bold text-yellow-400">{premium.type}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-ko-text-card-meta mb-1">{t('account.end_date')}</div>
          <div className="text-sm font-semibold text-ko-text-card-title">{premium.endDate}</div>
        </div>
      </div>
    </div>
  )
}
