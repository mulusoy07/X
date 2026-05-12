import { Icon } from '@/components/shared/icon'

export function MobList({ mobs, selectedMobId, onMobSelect, isRefreshing }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            {t('guide.mobs.title')}
          </h3>
          <div className="ml-auto bg-ko-widget-bg text-ko-brand-primary text-xs font-bold px-2 py-1 rounded-full border border-ko-brand-primary">
            {mobs.length}
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {mobs.length > 0 ? (
            mobs.map((mob) => {
              const isActive = selectedMobId === mob.ssid
              const isBoss = mob.boss === 1

              return (
                <button
                  type="button"
                  key={mob.ssid}
                  onClick={() => onMobSelect(mob.ssid)}
                  disabled={isRefreshing}
                  className={`w-full text-left block group p-3 rounded-xl relative overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'bg-ko-card/80 border border-ko-brand-primary'
                      : 'bg-ko-card border border-transparent hover:border-ko-brand-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3 relative">
                    <div className="flex-shrink-0 relative h-10 w-10">
                      <div className="w-full h-full bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
                        <Icon name="ti ti-skull" className="w-5 h-5 text-ko-brand-primary" />
                      </div>
                      {isBoss && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                          <Icon name="ti ti-crown" className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ko-text-primary truncate leading-tight">
                        {mob.strName}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-ko-widget-bg text-ko-text-muted group-hover:bg-ko-brand-primary/20 group-hover:text-white'
                      }`}
                    >
                      <Icon name="ti ti-chevron-right" size={12} />
                    </div>
                  </div>
                </button>
              )
            })
          ) : (
            <div className="text-center text-ko-text-muted py-8">
              <div className="w-12 h-12 mx-auto mb-3 bg-ko-widget-bg rounded-full flex items-center justify-center">
                <Icon name="ti ti-bolt" className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-sm font-medium">{t('guide.mobs.not_found')}</p>
              <p className="text-xs opacity-75 mt-1">{t('guide.try_different_filter')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
