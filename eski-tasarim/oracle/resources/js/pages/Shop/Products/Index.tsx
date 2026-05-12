import { Icon } from '@/components/shared/icon'
import { CategoryList, CategoryHeader, ProductsGrid } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function ProductsPage() {
  const { t } = useTranslation()
  const { categories, mainPageCount, selectedCategory, selectedCategoryId, page, error, message } = usePage().props

  if (error || !categories) {
    return <ErrorState message={message || t('components.errors.generic')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={page?.title} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={page?.title}
          subtitle={page?.description}
          icon={page?.icon ? <Icon name={page.icon} className="w-8 h-8" /> : undefined}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside>
            <CategoryList
              categories={categories}
              mainPageCount={mainPageCount}
              selectedId={selectedCategoryId}
            />
          </aside>

          <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
            {selectedCategory ? (
              <>
                <CategoryHeader selectedCategory={selectedCategory} />
                <ProductsGrid selectedCategory={selectedCategory} />
              </>
            ) : (
              <EmptyState
                icon="ti ti-shopping-cart"
                title={t('shop.products.select_category')}
                description={t('shop.products.select_category_desc')}
                className="min-h-0 py-20"
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

ProductsPage.layout = (page) => <PublicLayout children={page} />
