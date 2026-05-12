import { Icon } from '@/components/shared/icon'
import { DailyRewardCard } from './DailyRewardCard'

export function DailyRewardsSection({ reward }) {
  const { t } = useTranslation()
  const dailyRewards = (reward.data?.rewards) || []
  const dailySettings = reward.data?.settings

  if (!dailyRewards.length) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ti ti-gift" className="w-8 h-8 text-ko-text-muted" />
        </div>
        <p className="text-ko-text-muted text-sm">{t('guide.rewards.daily.not_found')}</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
        {dailySettings && (
          <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary mb-6">
            <h3 className="text-lg font-semibold text-ko-text-primary mb-4">
              {t('guide.rewards.daily.requirements')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-ko-brand-primary">
                  {dailySettings.reqLevel}
                </div>
                <div className="text-sm text-ko-text-muted">{t('guide.mobs.min_level')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ko-brand-primary">
                  {dailySettings.reqRebirthLevel}
                </div>
                <div className="text-sm text-ko-text-muted">{t('guide.rewards.daily.min_rebirth')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ko-brand-primary">
                  {dailySettings.reqLoyalty}
                </div>
                <div className="text-sm text-ko-text-muted">{t('guide.rewards.daily.min_loyalty')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ko-brand-primary">
                  {dailySettings.resetDay === 1 ? t('guide.rewards.daily.days.monday') : t('guide.unknown')}
                </div>
                <div className="text-sm text-ko-text-muted">{t('guide.rewards.daily.reset_day')}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
            <h3 className="text-lg font-bold text-ko-text-primary">{t('guide.rewards.daily.calendar')}</h3>
            <span className="ml-auto text-xs text-ko-text-muted bg-ko-card px-3 py-1.5 rounded-full">
              {t('guide.rewards.daily.count', { count: dailyRewards.length })}
            </span>
          </div>
          <p className="text-sm text-ko-text-muted mb-6">
            {t('guide.rewards.daily.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyRewards.map((dailyReward) => (
              <DailyRewardCard key={dailyReward.dayIndex} reward={dailyReward} />
            ))}
          </div>
      </div>
    </div>
  )
}
