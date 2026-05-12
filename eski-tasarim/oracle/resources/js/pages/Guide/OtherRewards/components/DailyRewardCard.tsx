import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function DailyRewardCard({ reward }) {
  const { t } = useTranslation()
  const hasPremiumReward = reward.premiumItemId && reward.premiumItemId !== reward.itemId

  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl overflow-hidden transition-all duration-200">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ko-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">{reward.dayIndex}</span>
            </div>
            <span className="text-sm font-semibold text-ko-text-primary">{t('guide.day')}</span>
          </div>
          {hasPremiumReward && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-full border border-yellow-500/30">
              <Icon name="ti ti-star" className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-semibold text-yellow-500">Premium</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 space-y-2">
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-emerald-500 rounded-r" />
          <div className="flex items-center gap-3 p-3 bg-ko-widget-bg rounded-lg border border-ko-border-primary">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-ko-card rounded-lg border border-ko-border-primary">
              <ItemIcon
                id={reward.itemId}
                alt={reward.itemName || t('guide.chests.unknown_item')}
                width={48}
                height={48}
                showTooltip={true}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider">
                  {t('guide.rewards.normal')}
                </span>
              </div>
              <div className="text-sm font-semibold text-ko-brand-primary mb-0.5">
                {t('guide.quantity')}: {reward.itemCount}
              </div>
              <div className="text-xs text-ko-text-muted truncate">
                {reward.itemName || t('guide.chests.unknown_item')}
              </div>
            </div>
          </div>
        </div>

        {hasPremiumReward && (
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-r" />
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/40">
                <ItemIcon
                  id={reward.premiumItemId}
                  alt={reward.premiumItemName || t('guide.chests.unknown_item')}
                  width={48}
                  height={48}
                  showTooltip={true}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-yellow-500 uppercase tracking-wider">
                    {t('guide.rewards.premium')}
                  </span>
                  <Icon name="ti ti-star" className="w-3 h-3 text-yellow-500" />
                </div>
                <div className="text-sm font-semibold text-yellow-500 mb-0.5">
                  {t('guide.quantity')}: {reward.premiumItemCount}
                </div>
                <div className="text-xs text-ko-text-muted truncate">
                  {reward.premiumItemName || t('guide.chests.unknown_item')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
