import { ItemIcon } from '@/components/shared/ItemIcon'

const BONUS_ITEM_ID = 700009000

export function BonusItemInfo() {
  const { t } = useTranslation()
  return (
    <div className="p-4 bg-ko-widget-bg/50 border-b border-ko-border-primary">
      <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-3">
        <div className="w-10 h-10 flex-shrink-0">
          <ItemIcon
            id={BONUS_ITEM_ID}
            alt="Bonus Item"
            className="w-full h-full object-contain"
            width={40}
            height={40}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-ko-text-primary mb-1">
            {t('guide.chests.bonus_chance_item')}
          </div>
          <div className="text-xs text-ko-text-muted">
            {t('guide.chests.bonus_chance_info')}
          </div>
        </div>
      </div>
    </div>
  )
}
