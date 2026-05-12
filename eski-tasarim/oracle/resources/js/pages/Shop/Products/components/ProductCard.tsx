import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function ProductCard({ product }) {
  const isRB = product.priceTypeShort === 'RB'
  const isGC = product.priceTypeShort === 'GC'

  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl p-3 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        {product.hasDiscount && (
          <div className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full">
            {product.discountPercentage}% OFF
          </div>
        )}

        {product.canGift && (
          <div className="bg-ko-brand-primary p-1.5 rounded-full ml-auto">
            <Icon name="ti ti-gift" className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-3 relative">
        <div className="w-12 h-12 bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
          <ItemIcon
            id={product.itemId}
            alt={product.itemName}
            showTooltip={true}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-ko-text-primary truncate leading-tight">
          {product.itemName}
        </p>
      </div>

      {product.itemExpirationText && (
        <div className="flex items-center justify-center gap-1 bg-ko-widget-bg px-2 py-1 rounded-lg border border-ko-border-primary mb-3">
          <Icon name="ti ti-clock" className="w-3 h-3 text-ko-brand-primary flex-shrink-0" />
          <span className="text-[11px] font-semibold text-ko-text-muted">
            {product.itemExpirationText}
          </span>
        </div>
      )}

      <div className="text-center">
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3 py-2 rounded-lg border',
            isRB && 'bg-ko-widget-bg border-red-500/20',
            isGC && 'bg-ko-widget-bg border-blue-500/20',
            !isRB && !isGC && 'bg-ko-brand-primary/10 border-ko-brand-primary/30'
          )}
        >
          <div
            className={cn(
              'text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider',
              isRB && 'bg-red-500/30 text-red-500',
              isGC && 'bg-blue-500/30 text-blue-500',
              !isRB && !isGC && 'bg-ko-brand-primary/20 text-ko-brand-primary'
            )}
          >
            {product.priceTypeShort}
          </div>

          <div className="flex items-center gap-1">
            {product.hasDiscount && (
              <span className="text-xs line-through text-ko-text-muted">
                {product.formattedOriginalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-ko-text-primary">
              {product.hasDiscount ? product.formattedDiscountPrice : product.formattedFinalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
