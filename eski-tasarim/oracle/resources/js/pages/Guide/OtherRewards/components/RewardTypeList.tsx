import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

export function RewardTypeList({ rewardTypes, selectedSlug, onRewardSelect, isRefreshing }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            {t('guide.rewards.types')}
          </h3>
          <div className="ml-auto bg-ko-widget-bg text-ko-brand-primary text-xs font-bold px-2 py-1 rounded-full border border-ko-brand-primary">
            {rewardTypes.length}
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {rewardTypes.length > 0 ? (
            rewardTypes.map((type) => {
              const isActive = selectedSlug === type.slug

              return (
                <button
                  type="button"
                  key={type.slug}
                  onClick={() => onRewardSelect(type.slug)}
                  disabled={isRefreshing}
                  className={`w-full text-left block group p-3 rounded-xl relative overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'bg-ko-card/80 border border-ko-brand-primary'
                      : 'bg-ko-card border border-transparent hover:border-ko-brand-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3 relative">
                    <div className="flex-shrink-0 relative h-10 w-10">
                      <div className="w-full h-full bg-ko-widget-bg rounded-lg border border-ko-border-primary overflow-hidden">
                        <Imagex
                          src={type.image}
                          srcset={type.imageSrcset}
                          alt={type.rewardName}
                          className="w-full h-full object-cover"
                          sizes="40px"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ko-text-primary truncate leading-tight">
                        {type.rewardName}
                      </p>
                      <p className="text-xs text-ko-text-muted">{t('guide.rewards.count', { count: type.count })}</p>
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
                <Icon name="ti ti-gift" className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-sm font-medium">{t('guide.rewards.type_not_found')}</p>
              <p className="text-xs opacity-75 mt-1">{t('guide.data_loading')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
