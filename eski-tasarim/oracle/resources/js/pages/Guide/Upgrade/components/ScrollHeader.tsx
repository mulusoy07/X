import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function ScrollHeader({ scroll }) {
  const { t } = useTranslation()
  const totalLevels = scroll.ratesByType?.reduce((total, type) => total + type.rates.length, 0) || 0

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Scroll Icon(s) */}
          <div className="relative flex-shrink-0">
            {scroll.hasDouble ? (
              <div className="flex items-center gap-3">
                <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
                  <ItemIcon
                    id={scroll.scrollId1}
                    alt={scroll.scrollName}
                    className="w-full h-full object-contain"
                    height={45}
                    width={45}
                  />
                </div>
                <div className="w-6 h-6 rounded-full bg-ko-brand-primary text-white flex items-center justify-center">
                  <Icon name="ti ti-plus" className="w-3 h-3" />
                </div>
                <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
                  <ItemIcon
                    id={scroll.scrollId2}
                    alt={scroll.scrollName}
                    className="w-full h-full object-contain"
                    height={45}
                    width={45}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
                <ItemIcon
                  id={scroll.scrollId1}
                  alt={scroll.scrollName}
                  className="w-full h-full object-contain"
                  height={45}
                  width={45}
                />
              </div>
            )}
          </div>

          {/* Scroll Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2 truncate">
              {scroll.scrollName}
            </h3>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-ko-text-muted">
                  {t('guide.upgrade.different_item_types', { count: scroll.ratesByType?.length || 0 })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-purple-500 font-medium">Upgrade Scroll</span>
              </div>
            </div>
          </div>

          {/* Total Levels */}
          <div className="bg-ko-card border border-ko-border-primary rounded-xl px-4 py-2 flex-shrink-0">
            <div className="text-center">
              <div className="text-lg font-bold uppercase text-ko-brand-primary">
                {totalLevels}
              </div>
              <div className="text-xs text-ko-text-muted tracking-wider whitespace-nowrap">
                {t('guide.upgrade.total_level')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-ko-border-primary" />
    </div>
  )
}
