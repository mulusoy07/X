import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { ItemIcon } from '@/components/shared/ItemIcon'

const getDropRateColor = (rate) => {
  if (rate >= 5000) return 'bg-emerald-500'
  if (rate >= 3000) return 'bg-blue-500'
  if (rate >= 1000) return 'bg-purple-500'
  return 'bg-gray-500'
}

export function ExchangeItemCard({ item }) {
  const { t } = useTranslation()
  const dropColor = getDropRateColor(item.dropRate)

  return (
    <div className="bg-ko-widget-bg border border-ko-border-primary rounded-xl p-3 hover:border-ko-brand-primary transition-colors">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {item.itemId > 0 ? (
            <div className="w-12 h-12 overflow-hidden rounded-lg border border-ko-border-primary bg-ko-card">
              <ItemIcon
                id={item.itemId}
                alt={item.itemName || 'Unknown Item'}
                className="w-full h-full object-contain"
                width={48}
                height={48}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg border border-ko-border-primary bg-gray-200 flex items-center justify-center">
              <Icon name="ti ti-package" className="w-6 h-6 text-gray-400 opacity-30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ko-text-primary text-sm mb-2 truncate">
            {item.itemName || `Item ${item.itemId}`}
          </div>

          <div className="space-y-2">
            {/* Drop Rate */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-ko-text-muted">{t('guide.drop_chance')}</span>
              <span className="font-bold text-ko-brand-primary">{item.dropRatePercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-ko-card rounded-full h-1.5 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', dropColor)}
                style={{ width: `${Math.min(item.dropRatePercent, 100)}%` }}
              />
            </div>

            {/* Item Count */}
            {item.itemCount > 1 && (
              <div className="text-xs text-ko-text-muted">
                {t('guide.quantity')}: <span className="font-semibold">{t('guide.piece_count', { count: item.itemCount })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
