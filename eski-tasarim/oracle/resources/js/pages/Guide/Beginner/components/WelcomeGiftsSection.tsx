import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function WelcomeGiftsSection({ gifts }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          <h3 className="text-base font-bold text-ko-text-primary">
            {t('guide.beginner.welcome_gifts')}
          </h3>
          <span className="ml-auto text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full border border-ko-border-primary">
            {t('guide.beginner.gift_count', { count: gifts.length })}
          </span>
        </div>
      </div>

      {/* Gifts List */}
      {gifts.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <Icon name="ti ti-gift-off" className="w-8 h-8 text-ko-text-muted/40 mx-auto mb-2" />
          <p className="text-sm text-ko-text-muted">{t('guide.beginner.no_gifts')}</p>
        </div>
      ) : (
      <div className="divide-y divide-ko-border-primary">
        {gifts.map((gift) => (
          <div
            key={gift.itemId}
            className="px-6 py-4 flex items-center gap-4 hover:bg-ko-widget-bg/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-lg bg-ko-widget-bg border border-ko-border-primary flex items-center justify-center flex-shrink-0">
              <ItemIcon
                id={gift.itemId}
                alt={gift.itemName}
                width={40}
                height={40}
                showTooltip={true}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-ko-text-primary">
                  {gift.itemName}
                </span>
                {gift.itemCount > 1 && (
                  <span className="text-xs bg-ko-brand-primary/20 text-ko-brand-primary px-2 py-0.5 rounded-full font-semibold">
                    x{gift.itemCount}
                  </span>
                )}
              </div>
              {gift.giftMessage && (
                <p className="text-xs text-ko-text-muted leading-relaxed">{gift.giftMessage}</p>
              )}
            </div>
            <Icon name="ti ti-gift" className="w-5 h-5 text-ko-brand-primary/40 flex-shrink-0" />
          </div>
        ))}
      </div>
      )}
    </div>
  )
}
