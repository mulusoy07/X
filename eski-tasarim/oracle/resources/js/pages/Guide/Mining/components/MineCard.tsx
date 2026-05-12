import { ItemIcon } from '@/components/shared/ItemIcon'
import { Badge } from '@/components/ui/badge'

export function MineCard({ mine }) {

  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl p-4 transition-all duration-200">
      {/* Item Icon */}
      <div className="flex items-center justify-center mb-3 relative">
        <div className="w-14 h-14 bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
          <ItemIcon
            id={mine.itemId}
            alt={mine.itemName || 'Unknown Item'}
            className="w-full h-full object-contain"
            width={56}
            height={56}
          />
        </div>

        <div
          className="absolute -top-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          style={{
            backgroundColor: mine.rarity.color,
            color: mine.rarity.textColor,
            borderColor: mine.rarity.color
          }}
        >
          {mine.rarity.text}
        </div>

        {mine.itemCount > 1 && (
          <Badge
            variant="secondary"
            className="absolute -bottom-1 -right-1 text-[9px] uppercase px-1.5 py-0.5"
          >
            x{mine.itemCount}
          </Badge>
        )}
      </div>

      {/* Item Name */}
      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-ko-text-primary truncate leading-tight">
          {mine.itemName || 'Bilinmeyen Item'}
        </p>
      </div>

      {/* Drop Rate */}
      <div className="mb-3">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-bold text-ko-brand-primary">
            {mine.dropRate}%
          </span>
        </div>

        {/* Progress Bar - CSS Animation */}
        <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${Math.min(parseFloat(mine.dropRate), 100)}%`,
              backgroundColor: mine.rarity.color
            }}
          />
        </div>
      </div>

      {/* Required Item */}
      {mine.reqItemId > 0 && mine.reqItemName && (
        <div className="text-center">
          <span className="text-[9px] text-ko-text-muted font-medium bg-ko-widget-bg px-2 py-1 rounded-full border border-ko-border-primary inline-block">
            {mine.reqItemName}
          </span>
        </div>
      )}
    </div>
  )
}
