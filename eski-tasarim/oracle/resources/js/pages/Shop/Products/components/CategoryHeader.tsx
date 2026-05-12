import { Icon } from '@/components/shared/icon'

export function CategoryHeader({ selectedCategory }) {
  const { t } = useTranslation()

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-ko-widget-bg flex items-center justify-center">
            <Icon name="ti ti-shopping-cart" className="w-8 h-8 text-ko-brand-primary" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2">
              {selectedCategory.categoryName}
            </h3>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-ko-text-muted">
                  <b>{selectedCategory.products.length}</b> {t('shop.products.product')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs font-semibold text-red-500">{t('shop.products.rb_label')}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-xs font-semibold text-blue-500">{t('shop.products.gc_label')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-ko-border-primary" />
    </div>
  )
}
