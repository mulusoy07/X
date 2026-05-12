import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { MaterialCard } from './MaterialCard'
import { ExchangeItemCard } from './ExchangeItemCard'
import { ItemIcon } from '@/components/shared/ItemIcon'

const BONUS_ITEM_ID = 700009000

const formatSuccessRate = (rate) => `${rate / 10}%`

const getSuccessRateColor = (rate) => {
  if (rate >= 1000) return 'bg-red-500'
  if (rate >= 200) return 'bg-green-500'
  if (rate >= 100) return 'bg-blue-500'
  return 'bg-gray-500'
}

export function ProductionCard({ mix }) {
  const { t } = useTranslation()
  const successRatePercentage = mix.successRate / 10
  const successColor = getSuccessRateColor(mix.successRate)
  const hasMultipleResults = mix.exchangeItems.length > 1

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 hover:border-ko-brand-primary transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {mix.exchangeItems[0]?.itemId && (
            <div className="w-12 h-12 bg-ko-widget-bg border border-ko-border-primary rounded-lg flex items-center justify-center overflow-hidden">
              <ItemIcon
                id={mix.exchangeItems[0].itemId}
                alt={mix.exchangeName}
                className="w-full h-full object-contain"
                width={48}
                height={48}
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-ko-text-primary mb-1">
              {mix.exchangeName}
            </h3>
            <div className="flex items-center gap-4 text-sm text-ko-text-muted flex-wrap">
              <span>{mix.npcName}</span>
              {hasMultipleResults && (
                <span className="text-amber-600 font-medium">
                  🎲 {t('guide.item_mix.different_results', { count: mix.exchangeItems.length })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Rate Section */}
      <div className="mb-6">
        <div className="border border-ko-border-primary/70 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <span className="text-sm font-semibold text-ko-text-primary">
              {t('guide.item_mix.production_success')}
            </span>
          </div>

          {/* Base Success Rate */}
          <div className="flex items-center justify-between text-sm text-ko-text-muted mb-2">
            <span>{t('guide.chests.base_chance')}</span>
            <span className="font-bold text-ko-brand-primary">
              {formatSuccessRate(mix.successRate)}
            </span>
          </div>
          <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
            <div
              className={cn('h-2 rounded-full transition-all duration-500', successColor)}
              style={{ width: `${Math.min(successRatePercentage, 100)}%` }}
            />
          </div>

          {/* Bonus Success Rate */}
          {mix.bonusRate > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-ko-text-muted mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5">
                    <ItemIcon
                      id={BONUS_ITEM_ID}
                      alt="Bonus Item"
                      className="w-full h-full object-contain"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-cyan-600 font-medium">{t('guide.chests.with_bonus_item')}</span>
                </div>
                <span className="text-cyan-600 font-semibold">
                  {formatSuccessRate(mix.bonusRate)}
                </span>
              </div>
              <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-cyan-700"
                  style={{ width: `${Math.min(mix.bonusRate / 10, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Multiple Results Warning */}
        {hasMultipleResults && (
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-amber-600">2</span>
              </div>
              <span className="text-xs font-medium text-amber-700">
                {t('guide.chests.success_drop_info')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Materials Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-ko-text-primary mb-3 flex items-center gap-2">
          <Icon name="ti ti-bolt" className="w-5 h-5 text-ko-brand-primary" />
          {t('guide.item_mix.required_materials')}
        </h4>
        {mix.materials.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mix.materials.map((material, index) => (
              <MaterialCard key={`${mix.index}-${material.itemId}-${index}`} material={material} />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-ko-text-muted">
            <p>{t('guide.item_mix.material_not_found')}</p>
          </div>
        )}
      </div>

      {/* Exchange Items (Results) Section */}
      {mix.exchangeItems.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-ko-text-primary mb-3 flex items-center gap-2">
            <Icon name="ti ti-circle-check" className="w-5 h-5 text-emerald-500" />
            {hasMultipleResults ? t('guide.item_mix.possible_results') : t('guide.result')}
            {hasMultipleResults && (
              <span className="text-xs bg-amber-500/20 text-amber-700 px-2 py-1 rounded-full font-medium">
                {t('guide.item_mix.different_items', { count: mix.exchangeItems.length })}
              </span>
            )}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mix.exchangeItems.map((item, index) => (
              <ExchangeItemCard
                key={`${mix.index}-result-${item.itemId}-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
