import { Icon } from '@/components/shared/icon'
import { EventTypeList, EventSection } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function EventsGuidePage() {
  const { t } = useTranslation()
  const { error, message, allEventTypes, selectedEvent, selectedSlug } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !allEventTypes) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const handleEventSelect = (slug) => {
    if (slug === selectedSlug) return
    setIsRefreshing(true)
    router.get(route('public.guide.events.show', { slug }), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <>
      <Head>
        <title>Events Guide</title>
        <meta name="description" content="Game events schedule and rewards" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Events Guide"
            subtitle="Game events schedule and rewards"
            icon={<Icon name="ti ti-calendar" className="w-8 h-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside>
              <EventTypeList
                eventTypes={allEventTypes}
                selectedSlug={selectedSlug}
                onEventSelect={handleEventSelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedEvent ? (
                <EventSection event={selectedEvent} />
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-circle-check" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.events.select')}
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

EventsGuidePage.layout = (page) => <PublicLayout children={page} />
