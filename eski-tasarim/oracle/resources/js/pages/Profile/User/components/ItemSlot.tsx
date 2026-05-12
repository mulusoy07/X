import { ItemIcon } from '@/components/shared/ItemIcon'

export function ItemSlot({ slotId, items }) {
  const item = items.find(i => i.slotId === slotId)

  return (
    <div className="w-[45px] h-[45px] border border-ko-border-primary bg-ko-card rounded overflow-hidden hover:border-ko-brand-primary transition-colors">
      {item && item.itemId > 0 ? (
        <ItemIcon
          id={item.itemId}
          showTooltip={true}
          width={45}
          height={45}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-4 h-4 bg-ko-widget-bg rounded opacity-50" />
        </div>
      )}
    </div>
  )
}
