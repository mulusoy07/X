import { ItemIcon } from '@/components/shared/ItemIcon'
import { Icon } from '@/components/shared/icon'

export function GiftItems({ gifts }) {
  const { t } = useTranslation()

  if (!gifts || gifts.length === 0) return null

  return (
    <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg p-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="ti ti-gift" className="w-4 h-4 text-ko-brand-primary" />
        <h4 className="text-xs font-semibold text-ko-text-primary uppercase tracking-wider">
          {t('shop.premiums.gift_items')}
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-ko-card border border-ko-border-primary rounded-lg p-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 overflow-hidden flex items-center justify-center flex-shrink-0">
                <ItemIcon
                  id={gift.itemId}
                  alt={gift.itemName}
                  showTooltip={true}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ko-text-primary truncate">
                  {gift.itemName}
                </p>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-ko-brand-primary font-medium">
                    {gift.classNameText}
                  </span>
                  {gift.itemCount > 0 && (
                    <span className="text-xs text-ko-text-muted">
                      {t('shop.premiums.quantity')}: {gift.itemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
