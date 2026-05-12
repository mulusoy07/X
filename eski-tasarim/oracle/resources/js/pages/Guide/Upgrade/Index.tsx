import { Icon } from '@/components/shared/icon'
import { ScrollList, ScrollHeader, TypeSection } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function UpgradeGuidePage() {
  const { t } = useTranslation()
  const { error, message, allScrolls, selectedScroll, selectedSlug } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !allScrolls) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const handleScrollSelect = (slug) => {
    if (slug === selectedSlug) return
    setIsRefreshing(true)
    router.get(route('public.guide.upgrade.show', { slug }), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <>
      <Head>
        <title>Upgrade Guide</title>
        <meta name="description" content="Item upgrade rates and scroll information" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Upgrade Guide"
            subtitle="Item upgrade rates and scroll information"
            icon={<Icon name="ti ti-arrow-up-circle" className="w-8 h-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside>
              <ScrollList
                scrolls={allScrolls}
                selectedSlug={selectedSlug}
                onScrollSelect={handleScrollSelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedScroll ? (
                <>
                  <ScrollHeader scroll={selectedScroll} />
                  {selectedScroll.ratesByType?.length > 0 ? (
                    <div className="p-4 md:p-6 space-y-6">
                      {selectedScroll.ratesByType.map((type) => (
                        <TypeSection key={type.typeName} type={type} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="ti ti-alert-circle" className="w-8 h-8 text-ko-text-muted" />
                      </div>
                      <p className="text-ko-text-muted text-sm">{t('guide.upgrade.no_scroll_data')}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-circle-check" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.upgrade.select_scroll')}
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

UpgradeGuidePage.layout = (page) => <PublicLayout children={page} />
