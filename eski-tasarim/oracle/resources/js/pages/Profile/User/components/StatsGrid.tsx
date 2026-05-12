
export function StatsGrid({ user }) {
  const { t } = useTranslation()
  const kdRatio = user.userDeathCount > 0
    ? (user.userKillCount / user.userDeathCount).toFixed(2)
    : user.userKillCount.toString()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* PvP Stats */}
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
              {t('plugins.game.profile.user.pvp_stats')}
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-ko-widget-bg/50 rounded-lg p-4 border border-ko-border-primary">
              <div className="text-xs text-ko-text-muted mb-2">{t('plugins.game.profile.user.kills')}</div>
              <p className="text-2xl font-bold text-ko-brand-primary">
                {user.userKillCount}
              </p>
            </div>
            <div className="bg-ko-widget-bg/50 rounded-lg p-4 border border-ko-border-primary">
              <div className="text-xs text-ko-text-muted mb-2">{t('plugins.game.profile.user.deaths')}</div>
              <p className="text-2xl font-bold text-ko-brand-primary">
                {user.userDeathCount}
              </p>
            </div>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-4 border border-ko-border-primary">
            <div className="text-center">
              <p className="text-xs text-ko-text-muted mb-2">{t('plugins.game.profile.user.kd_ratio')}</p>
              <p className="text-3xl font-bold text-ko-brand-primary">{kdRatio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PvE Stats */}
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
              {t('plugins.game.profile.user.pve_stats')}
            </h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-ko-widget-bg/50 rounded-lg p-4 border border-ko-border-primary">
            <div className="text-xs text-ko-text-muted mb-2">{t('plugins.game.profile.user.monster_kills')}</div>
            <p className="text-2xl font-bold text-ko-brand-primary">
              {user.monsterKillCount}
            </p>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-4 border border-ko-border-primary">
            <div className="text-xs text-ko-text-muted mb-2">{t('plugins.game.profile.user.play_time')}</div>
            <p className="text-xl font-bold text-ko-brand-primary">{user.playTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
