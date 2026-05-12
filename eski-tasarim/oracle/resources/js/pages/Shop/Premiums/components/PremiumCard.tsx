import { Icon } from '@/components/shared/icon'
import { FeatureBadge } from './FeatureBadge'
import { ExpTable } from './ExpTable'
import { GiftItems } from './GiftItems'

export function PremiumCard({ premium }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary hover:border-ko-brand-primary rounded-2xl overflow-hidden flex flex-col transition-all duration-200">
      <div className="relative bg-gradient-to-br from-ko-widget-bg to-ko-widget-bg/50 p-6 border-b border-ko-border-primary">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-ko-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="ti ti-crown" className="w-6 h-6 text-ko-brand-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-ko-text-primary">
              {premium.premiumName}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        {premium.features && premium.features.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px bg-ko-border-primary flex-1" />
              <h4 className="text-xs font-semibold text-ko-text-muted uppercase tracking-wider">
                {t('shop.premiums.features')}
              </h4>
              <div className="h-px bg-ko-border-primary flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {premium.features.map((feature) => (
                <FeatureBadge key={feature.id ?? feature.label} feature={feature} />
              ))}
            </div>
          </div>
        )}

        {premium.expLevels && premium.expLevels.length > 0 && (
          <ExpTable expLevels={premium.expLevels} />
        )}

        {premium.gifts && premium.gifts.length > 0 && (
          <GiftItems gifts={premium.gifts} />
        )}
      </div>
    </div>
  )
}
