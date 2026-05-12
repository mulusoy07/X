import { Icon } from '@/components/shared/icon'

export function CategoryList({ categories, mainPageCount, selectedId }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            {t('shop.products.categories')}
          </h3>
          <div className="ml-auto bg-ko-widget-bg text-ko-brand-primary text-xs font-bold px-2 py-1 rounded-full border border-ko-brand-primary">
            {categories.length}
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {categories.map((category) => {
            const isActive = selectedId === category.categoryId

            return (
              <Link
                key={category.categoryId}
                href={
                  category.categoryId === 0
                    ? route('public.shop.products.index')
                    : route('public.shop.products.category', { categoryId: category.categoryId, slug: category.slug })
                }
                className={`block group p-3 rounded-xl relative overflow-hidden transition-all duration-200 ${
                  isActive
                    ? 'bg-ko-card/80 border border-ko-brand-primary'
                    : 'bg-ko-card border border-transparent hover:border-ko-brand-primary/30'
                }`}
              >
                <div className="flex items-center gap-3 relative">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ko-text-primary truncate leading-tight">
                      {category.categoryName}
                    </p>
                    <p className="text-xs text-ko-text-muted mt-0.5">
                      {category.categoryId === 0 ? mainPageCount : category.productCount} {t('shop.products.product_lowercase')}
                    </p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-ko-widget-bg text-ko-text-muted group-hover:bg-ko-brand-primary/20 group-hover:text-white'
                    }`}
                  >
                    <Icon name="ti ti-chevron-right" className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
