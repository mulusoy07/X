import { Icon } from '@/components/shared/icon'
import { ProductCard } from './ProductCard'

export function ProductsGrid({ selectedCategory }) {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      {selectedCategory.products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {selectedCategory.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-ko-border-primary">
            <Icon name="ti ti-shopping-cart" className="w-8 h-8 text-ko-text-muted" />
          </div>
          <p className="text-ko-text-muted text-sm">{t('shop.products.no_products_in_category')}</p>
        </div>
      )}
    </div>
  )
}
