import { Icon } from '@/components/shared/icon'

export function CategoryHeader({ category }) {
  const { t } = useTranslation()
  const mixCount = category.mixes?.length || 0

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-ko-widget-bg flex items-center justify-center">
              <Icon name="ti ti-package" className="w-8 h-8 text-ko-brand-primary" />
            </div>
          </div>

          {/* Category Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2 truncate">
              {category.name}
            </h3>

            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-ko-text-muted">
                  {t('guide.item_mix.different_recipes', { count: mixCount })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-purple-500 font-medium">
                  {category.npcName}
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
