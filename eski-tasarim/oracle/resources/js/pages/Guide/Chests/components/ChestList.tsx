import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function ChestList({ chests, selectedId, onChestSelect, isRefreshing }) {
  const { t } = useTranslation()

  if (!chests.length) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
              {t('guide.chests.title')}
            </h3>
          </div>
        </div>
        <div className="p-8 text-center">
          <p className="text-ko-text-muted text-sm">{t('guide.chests.not_found')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            {t('guide.chests.title')}
          </h3>
          <div className="ml-auto bg-ko-widget-bg text-ko-brand-primary text-xs font-bold px-2 py-1 rounded-full border border-ko-brand-primary">
            {chests.length}
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {chests.map(chest => {
            const isActive = selectedId === chest.originItemId

            return (
              <button
                type="button"
                key={chest.originItemId}
                onClick={() => onChestSelect(chest.originItemId)}
                disabled={isRefreshing}
                className={`w-full text-left block group p-3 rounded-xl relative overflow-hidden transition-all duration-200 ${
                  isActive
                    ? 'bg-ko-card/80 border border-ko-brand-primary'
                    : 'bg-ko-card border border-transparent hover:border-ko-brand-primary/30'
                }`}
              >
                <div className="flex items-center gap-3 relative">
                  <div className="flex-shrink-0 relative h-10 w-10">
                    <ItemIcon
                      id={chest.originItemId}
                      alt={chest.originItemName}
                      className="w-full h-full object-contain"
                      width={40}
                      height={40}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ko-text-primary truncate leading-tight">
                      {chest.originItemName || t('guide.chests.unknown')}
                    </p>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-ko-widget-bg text-ko-text-muted group-hover:bg-ko-brand-primary/20 group-hover:text-white'
                  }`}>
                    <Icon name="ti ti-chevron-right" size={12} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
