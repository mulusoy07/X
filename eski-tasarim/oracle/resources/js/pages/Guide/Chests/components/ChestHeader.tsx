import { ItemIcon } from '@/components/shared/ItemIcon'

export function ChestHeader({ chest, groups }) {
  const { t } = useTranslation()
  const exchangeItemCount = chest.exchangeItems?.length || 0
  const groupName = groups[chest.group]?.name || t('guide.chests.unknown_group')

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Chest Icon */}
          <div className="relative flex-shrink-0">
            <div className="bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
              <ItemIcon
                id={chest.originItemId}
                alt={chest.originItemName}
                className="w-full h-full object-cover object-center"
                width={45}
                height={45}
              />
            </div>
          </div>

          {/* Chest Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2 truncate">
              {chest.originItemName || t('guide.chests.unknown')}
            </h3>

            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-ko-text-muted">
                  {t('guide.item_mix.different_rewards', { count: exchangeItemCount })}
                </span>
              </div>

              {chest.group === 'moira' && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-amber-500 font-medium">
                    {t('guide.rewards.online.package')}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-purple-500 font-medium">
                  {groupName}
                </span>
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
