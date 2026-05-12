import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

export function BalanceProductCard({ product }) {
  const { t } = useTranslation()

  return (
    <div className="group">
      <div
        className={cn(
          "relative bg-ko-card border rounded-xl p-3 transition-all duration-200",
          product.hasBonus
            ? "border-ko-brand-primary/20 hover:border-ko-brand-primary/60 hover:bg-ko-brand-primary/5"
            : "border-ko-border-primary hover:border-ko-brand-primary hover:bg-ko-widget-bg"
        )}
      >
        {product.hasBonus && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-ko-brand-primary to-orange-500 px-2 py-0.5 rounded-full shadow-lg">
              <div className="flex items-center gap-0.5">
                <Icon name="ti ti-sparkles" className="w-2.5 h-2.5 text-white" />
                <span className="text-[11px] font-bold text-white">
                  +{product.bonusPercentage}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-1.5 mt-1">
          <div className="flex items-baseline gap-1">
            <span className={cn(
              "text-lg font-bold transition-colors",
              product.hasBonus
                ? "text-ko-brand-primary group-hover:text-orange-500"
                : "text-ko-text-primary group-hover:text-ko-brand-primary"
            )}>
              {product.formattedBalance}
            </span>
            <span className="text-[11px] font-semibold text-ko-text-muted uppercase">
              {t('shop.resellers.rb')}
            </span>
          </div>

          <div className={cn(
            "w-full h-px",
            product.hasBonus
              ? "bg-ko-brand-primary/20"
              : "bg-ko-border-primary"
          )} />

          {product.hasBonus ? (
            <div className="text-xs font-medium text-ko-text-muted">
              {t('shop.resellers.total')}: <span className="font-bold text-ko-brand-primary">{product.formattedTotal}</span>
            </div>
          ) : (
            <div className="text-xs font-medium text-ko-text-muted">
              {t('shop.resellers.standard')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
