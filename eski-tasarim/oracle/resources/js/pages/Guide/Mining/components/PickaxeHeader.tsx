import { ItemIcon } from '@/components/shared/ItemIcon'

export function PickaxeHeader({ pickaxe }) {
  const { t } = useTranslation()
  const totalMines = pickaxe.mines?.length || 0

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Pickaxe Icon */}
          <div className="relative flex-shrink-0">
            <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
              <ItemIcon
                id={pickaxe.pickaxeId}
                alt={pickaxe.pickaxeName}
                className="w-full h-full object-contain"
                width={45}
                height={45}
              />
            </div>
          </div>

          {/* Pickaxe Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2 truncate">
              {pickaxe.pickaxeName}
            </h3>

            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-ko-text-muted">
                  {t('guide.item_mix.different_items', { count: totalMines })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-purple-500 font-medium">{t('guide.mining.pickaxe')}</span>
              </div>
            </div>
          </div>

          {/* Total Items */}
          <div className="bg-ko-card border border-ko-border-primary rounded-xl px-4 py-2 flex-shrink-0">
            <div className="text-center">
              <div className="text-lg font-bold uppercase text-ko-brand-primary">
                {totalMines}
              </div>
              <div className="text-xs text-ko-text-muted tracking-wider whitespace-nowrap">
                {t('guide.chests.total_items')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-ko-border-primary" />
    </div>
  )
}
