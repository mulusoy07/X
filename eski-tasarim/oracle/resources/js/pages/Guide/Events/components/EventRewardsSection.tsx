import { Icon } from '@/components/shared/icon'
import { Badge } from '@/components/ui/badge'
import { ItemIcon } from '@/components/shared/ItemIcon'
import { formatItemCount } from '@/lib/formatters'

export function EventRewardsSection({ rewards }) {
  const { t } = useTranslation()
  return (
    <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-7 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full" />
        <h3 className="text-lg font-bold text-ko-text-primary">{t('guide.events.rewards')}</h3>
        <span className="ml-auto text-xs text-ko-text-muted bg-ko-card px-3 py-1.5 rounded-full">
          {t('guide.rewards.count', { count: rewards?.length || 0 })}
        </span>
      </div>

      {rewards && rewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rewards.map((reward) => {
            return (
              <div
                key={reward.id}
                className="bg-ko-card border border-ko-border-primary rounded-lg p-4 hover:border-ko-brand-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <ItemIcon
                        id={reward.itemId}
                        alt={reward.itemName || t('guide.chests.unknown_item')}
                        width={48}
                        height={48}
                        showTooltip={true}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-sm font-semibold text-ko-text-primary">
                          {reward.itemName || t('guide.chests.unknown_item')}
                        </h4>
                        <p className="text-xs text-ko-text-muted mt-0.5">
                          {formatItemCount(reward.itemId, reward.itemCount, `${t('guide.quantity')}: ${reward.itemCount}`)}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className="ml-auto bg-ko-widget-bg text-ko-brand-primary text-xs font-bold px-2 py-1 rounded-full border border-ko-brand-primary"
                      >
                        {t('guide.rewards.daily.duration')}:{' '}
                        {reward.itemExpiration ? reward.itemExpiration : t('guide.permanent')}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {(reward.levelMin > 0 || reward.levelMax > 0) && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name="ti ti-bolt" className="w-3.5 h-3.5 text-purple-500" />
                          </div>
                          <span className="text-ko-text-muted">
                            {t('guide.level')}:{' '}
                            <span className="text-ko-text-primary font-medium">
                              {reward.levelMin === reward.levelMax
                                ? reward.levelMin
                                : `${reward.levelMin}-${reward.levelMax}`}
                            </span>
                          </span>
                        </div>
                      )}

                      {(reward.rebirthLevelMin > 0 || reward.rebirthLevelMax > 0) && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-6 h-6 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name="ti ti-bolt" className="w-3.5 h-3.5 text-amber-500" />
                          </div>
                          <span className="text-ko-text-muted">
                            Rebirth:{' '}
                            <span className="text-ko-text-primary font-medium">
                              {reward.rebirthLevelMin === reward.rebirthLevelMax
                                ? reward.rebirthLevelMin
                                : `${reward.rebirthLevelMin}-${reward.rebirthLevelMax}`}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {reward.rewardNote && (
                      <div className="mt-3 pt-3 border-t border-ko-border-primary">
                        <p className="text-xs text-ko-text-muted italic">{reward.rewardNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ti ti-package" className="w-8 h-8 text-ko-text-muted" />
          </div>
          <p className="text-ko-text-muted text-sm">
            {t('guide.no_rewards_yet')}
          </p>
        </div>
      )}
    </div>
  )
}
