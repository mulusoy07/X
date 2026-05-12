import { Icon } from '@/components/shared/icon'
import { CategoryList, CategoryHeader, BonusItemInfo, ProductionCard } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function ItemMixGuidePage() {
  const { t } = useTranslation()
  const { error, message, categories, selectedCategory, selectedSlug } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !categories) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const handleCategorySelect = (slug) => {
    if (slug === selectedSlug) return
    setIsRefreshing(true)
    router.get(route('public.guide.item-mix.show', { slug }), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <>
      <Head>
        <title>Item Mix Guide</title>
        <meta name="description" content="Item crafting and mixing recipes" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Item Mix Guide"
            subtitle="Item crafting and mixing recipes"
            icon={<Icon name="ti ti-package" className="w-8 h-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside>
              <CategoryList
                categories={categories}
                selectedSlug={selectedSlug}
                onCategorySelect={handleCategorySelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedCategory ? (
                <>
                  <CategoryHeader category={selectedCategory} />
                  <BonusItemInfo />
                  <div className="p-4 md:p-6 space-y-6">
                    {selectedCategory.mixes?.length > 0 ? (
                      selectedCategory.mixes.map((mix) => (
                        <ProductionCard key={mix.index} mix={mix} />
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="ti ti-package" className="w-8 h-8 text-ko-text-muted opacity-30" />
                        </div>
                        <p className="text-ko-text-muted text-sm">{t('guide.item_mix.no_recipe_found')}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-circle-check" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.chests.select_category')}
                  </h3>
                  <p className="text-ko-text-muted text-sm">
                    {t('guide.select_item_desc')}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

ItemMixGuidePage.layout = (page) => <PublicLayout children={page} />
