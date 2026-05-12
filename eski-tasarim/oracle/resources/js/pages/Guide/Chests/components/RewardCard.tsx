import { ItemIcon } from '@/components/shared/ItemIcon'

export function RewardCard({ item }) {
  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl p-4 transition-all duration-200">
      {/* Item Icon */}
      <div className="flex items-center justify-center mb-3 relative">
        <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
          <ItemIcon
            id={item.itemId}
            alt={item.itemName || 'Unknown Item'}
            className="w-full h-full object-contain"
            width={45}
            height={45}
          />
        </div>

        <div
          className="absolute -top-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          style={{
            backgroundColor: item.rarity.color,
            color: item.rarity.textColor,
            borderColor: item.rarity.color
          }}
        >
          {item.rarity.text}
        </div>
      </div>

      {/* Item Name */}
      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-ko-text-primary truncate leading-tight">
          {item.itemName || 'Unknown Item'}
        </p>
      </div>

      {/* Drop Rate */}
      <div className="mb-3">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-bold text-ko-brand-primary">
            {item.dropRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${Math.min(parseFloat(item.dropRate) * 2, 100)}%`,
              backgroundColor: item.rarity.color
            }}
          />
        </div>
      </div>
    </div>
  )
}
