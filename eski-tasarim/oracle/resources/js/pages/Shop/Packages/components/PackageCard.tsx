import { ItemIcon } from '@/components/shared/ItemIcon'
import { Icon } from '@/components/shared/icon'

export function PackageCard({ package: pkg }) {
  const { t } = useTranslation()
  const totalItems = pkg.items.length
  const itemLabel = totalItems === 1 ? t('shop.packages.item') : t('shop.packages.items')

  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-2xl overflow-hidden flex flex-col transition-all duration-200 relative">
      <div className="absolute top-2 right-2 z-20">
        <div className="bg-ko-brand-primary/90 px-2.5 py-1.5 rounded-full">
          <div className="flex items-center gap-1.5">
            <Icon name="ti ti-package" className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-semibold text-white">{totalItems} {itemLabel}</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-ko-widget-bg to-ko-widget-bg/50 p-6 flex items-center justify-center border-b border-ko-border-primary">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
            <ItemIcon
              id={pkg.itemId}
              alt={pkg.itemName}
              showTooltip={true}
              width={56}
              height={56}
              className="w-full h-full object-contain p-1"
            />
          </div>

          <h3 className="text-sm font-bold text-ko-text-primary text-center line-clamp-2 min-h-[1rem] leading-tight">
            {pkg.itemName}
          </h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="h-px bg-ko-border-primary flex-1" />
          <h4 className="text-xs font-semibold text-ko-text-muted uppercase tracking-wider">
            {t('shop.packages.package_contents')}
          </h4>
          <div className="h-px bg-ko-border-primary flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-2">
          {pkg.items.map((item) => (
            <div
              key={item.id}
              className="bg-ko-widget-bg border border-ko-border-primary rounded-lg p-2 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <ItemIcon
                    id={item.itemId}
                    alt={item.itemName}
                    showTooltip={true}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-xs font-medium text-ko-text-primary truncate">
                    {item.itemName}
                  </p>

                  {item.itemCount > 0 && (
                    <p className="text-xs text-ko-text-muted truncate">
                      {t('shop.packages.quantity')}: {item.itemCount}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
