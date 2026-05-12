import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function InventoryGrid({ items }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          <h3 className="text-base font-bold text-ko-text-primary">
            {t('guide.beginner.starting_items')}
          </h3>
          <span className="ml-auto text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full border border-ko-border-primary">
            {t('guide.beginner.item_count', { count: items.length })}
          </span>
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <Icon name="ti ti-package-off" className="w-8 h-8 text-ko-text-muted/40 mx-auto mb-2" />
          <p className="text-sm text-ko-text-muted">{t('guide.beginner.no_items')}</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2">
            {items.map((item) => (
              <div
                key={item.slotId}
                className="aspect-square rounded-lg border flex items-center justify-center transition-all duration-200 bg-ko-widget-bg border-ko-border-primary hover:border-ko-brand-primary/50 hover:shadow-[0_0_12px_rgba(255,186,0,0.15)]"
              >
                <ItemIcon
                  id={item.itemId}
                  alt={item.itemName}
                  width={40}
                  height={40}
                  showTooltip={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
