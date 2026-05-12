import { Badge } from '@/components/ui/badge'
import { ItemIcon } from '@/components/shared/ItemIcon'
import { Icon } from '@/components/shared/icon'

export function OnlineRewardsSection({ reward }) {
  const { t } = useTranslation()
  const onlineRewards = (reward.data?.rewards) || []

  if (!onlineRewards.length) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ti ti-clock" className="w-8 h-8 text-ko-text-muted" />
        </div>
        <h4 className="text-lg font-semibold text-ko-text-primary mb-2">
          {t('guide.rewards.online.not_active')}
        </h4>
        <p className="text-ko-text-muted">{t('guide.rewards.online.coming_soon')}</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {onlineRewards.map((onlineReward) => (
            <div key={onlineReward.id} className="bg-ko-widget-bg/50 border border-ko-border-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-ko-text-primary">
                  {t('guide.rewards.online.minutes', { count: onlineReward.rewardMinute })} - {onlineReward.zoneName}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {onlineReward.zoneName}
                  </Badge>
                  {onlineReward.oneTimeReward === 1 && (
                    <Badge variant="destructive" className="text-xs">
                      {t('guide.rewards.one_time')}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-ko-card rounded-lg border border-ko-border-primary flex items-center justify-center">
                  <ItemIcon
                    id={onlineReward.itemId}
                    alt={onlineReward.itemName || t('guide.chests.unknown_item')}
                    width={32}
                    height={32}
                    showTooltip={true}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ko-text-primary mb-1">
                    {onlineReward.itemName || t('guide.chests.unknown_item')}
                  </div>
                  <div className="text-xs text-ko-text-muted">
                    {t('guide.quantity')}: {onlineReward.itemCount}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-ko-text-muted">{t('guide.mobs.level_label')}:</span>
                  <span className="text-ko-text-primary ml-1">
                    {onlineReward.levelMin}-{onlineReward.levelMax}
                  </span>
                </div>
                <div>
                  <span className="text-ko-text-muted">{t('guide.rewards.daily.rebirth')}:</span>
                  <span className="text-ko-text-primary ml-1">
                    {onlineReward.rebirthLevelMin}-{onlineReward.rebirthLevelMax}
                  </span>
                </div>
                <div>
                  <span className="text-ko-text-muted">{t('guide.rewards.label')}:</span>
                  <span className="text-ko-text-primary ml-1">
                    {onlineReward.itemCount}x
                  </span>
                </div>
                <div>
                  <span className="text-ko-text-muted">{t('guide.mobs.nation_label')}:</span>
                  <span className="text-ko-text-primary ml-1">
                    {onlineReward.nation === 0 ? t('guide.mobs.nation_all') : onlineReward.nation}
                  </span>
                </div>
              </div>
            </div>
      ))}
    </div>
  )
}
