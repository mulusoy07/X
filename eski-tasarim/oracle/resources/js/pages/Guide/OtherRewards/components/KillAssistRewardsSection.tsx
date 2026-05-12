import { Icon } from '@/components/shared/icon'
import { Badge } from '@/components/ui/badge'
import { ItemIcon } from '@/components/shared/ItemIcon'
import { formatItemCount } from '@/lib/formatters'

const KILL_RANGE_LABELS = {
  '1-1': '1 Kill Assist',
  '3-3': '3 Kill Assist',
  '5-5': '5 Kill Assist',
  '10-10': '10 Kill Assist',
  '50-99': '50-99 Kill Assist',
  '100-999': '100+ Kill Assist',
}

export function KillAssistRewardsSection({ reward }) {
  const { t } = useTranslation()
  const killAssistRewards = (reward.data?.rewards) || []

  if (!killAssistRewards.length) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ti ti-bolt" className="w-8 h-8 text-ko-text-muted" />
        </div>
        <h4 className="text-lg font-semibold text-ko-text-primary mb-2">
          {t('guide.rewards.kill_assist.not_active')}
        </h4>
        <p className="text-ko-text-muted">{t('guide.rewards.kill_assist.coming_soon')}</p>
      </div>
    )
  }

  const groupedRewards = killAssistRewards.reduce(
    (acc, rewardItem) => {
      const key = `${rewardItem.killAssistCountMin}-${rewardItem.killAssistCountMax}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(rewardItem)
      return acc
    },
    {}
  )

  return (
    <div className="p-4 md:p-6 space-y-6">
        <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
            <h3 className="text-lg font-bold text-ko-text-primary">{t('guide.rewards.kill_assist.title')}</h3>
            <span className="ml-auto text-xs text-ko-text-muted bg-ko-card px-3 py-1.5 rounded-full">
              {t('guide.rewards.kill_assist.levels', { count: killAssistRewards.length })}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-ko-card rounded-lg p-4 border border-ko-border-primary">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="ti ti-list" className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-ko-text-primary">{t('guide.how_it_works')}</h4>
              </div>
              <ul className="text-xs text-ko-text-muted space-y-1">
                <li>• {t('guide.rewards.kill_assist.help_1')}</li>
                <li>• {t('guide.rewards.kill_assist.help_2')}</li>
                <li>• {t('guide.rewards.kill_assist.help_3')}</li>
                <li>• {t('guide.rewards.kill_assist.help_4')}</li>
              </ul>
            </div>

            <div className="bg-ko-card rounded-lg p-4 border border-ko-border-primary">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Icon name="ti ti-circle-check" className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-ko-text-primary">{t('guide.rewards.system')}</h4>
              </div>
              <ul className="text-xs text-ko-text-muted space-y-1">
                <li>• {t('guide.rewards.system_type1')}</li>
                <li>• {t('guide.rewards.system_type2')}</li>
                <li>• {t('guide.rewards.class_specific')}</li>
                <li>• {t('guide.rewards.np_on_assist')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
            <h3 className="text-lg font-bold text-ko-text-primary">{t('guide.rewards.tiers')}</h3>
          </div>

          {Object.entries(groupedRewards).map(([killRange, rewards]) => (
            <div
              key={killRange}
              className="bg-ko-widget-bg/50 border border-ko-border-primary rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-ko-text-primary">
                  {KILL_RANGE_LABELS[killRange] ?? `${killRange} Kill Assist`}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {t('guide.rewards.type_count', { count: rewards.length })}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((killReward) => (
                  <div
                    key={killReward.id}
                    className="bg-ko-card border border-ko-border-primary rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-ko-card rounded-lg border border-ko-border-primary flex items-center justify-center">
                        <ItemIcon
                          id={killReward.itemId}
                          alt={killReward.itemName || t('guide.rewards.np_label')}
                          width={32}
                          height={32}
                          showTooltip={true}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ko-text-primary mb-1">
                          {formatItemCount(killReward.itemId, killReward.itemCount, t('guide.piece_count', { count: killReward.itemCount }))}
                        </div>
                        <div className="text-xs text-ko-text-muted">
                          {killReward.itemName || t('guide.rewards.np_label')}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-ko-text-muted">{t('guide.rewards.label')}:</span>
                        <span className="text-ko-text-primary ml-1">
                          {formatItemCount(killReward.itemId, killReward.itemCount, t('guide.piece_count', { count: killReward.itemCount }))}
                        </span>
                      </div>
                      <div>
                        <span className="text-ko-text-muted">{t('guide.rewards.class_label')}:</span>
                        <span className="text-ko-text-primary ml-1">
                          {killReward.rewardType === 1 ? 'Warrior,Rogue,Kurian' : 'Priest,Mage'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
