import { Icon } from '@/components/shared/icon'
import { ItemIcon } from '@/components/shared/ItemIcon'

export function MaterialCard({ material }) {
  const { t } = useTranslation()
  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl p-3 transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {material.itemId > 0 ? (
            <div className="w-10 h-10">
              <ItemIcon
                id={material.itemId}
                alt={material.itemName || 'Unknown Item'}
                className="w-full h-full object-contain"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg border border-ko-border-primary bg-gray-200 flex items-center justify-center">
              <Icon name="ti ti-package" className="w-5 h-5 text-gray-400 opacity-30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ko-text-primary text-sm mb-1 truncate">
            {material.itemName || `Item ${material.itemId}`}
          </div>
          <div className="text-xs text-ko-text-muted">{t('guide.piece_count', { count: material.itemCount })}</div>
        </div>

        {/* Count Badge */}
        <div className="flex-shrink-0">
          <div className="bg-ko-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            x{material.itemCount}
          </div>
        </div>
      </div>
    </div>
  )
}
