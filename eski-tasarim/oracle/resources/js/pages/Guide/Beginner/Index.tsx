import { Icon } from '@/components/shared/icon'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ClassTabs, StatsSection, InventoryGrid, WelcomeGiftsSection } from './components'

export default function BeginnerGuidePage() {
  const { t } = useTranslation()
  const { error, message, classList, selectedClass, selectedSlug, app } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !classList) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const handleClassSelect = (slug) => {
    if (slug === selectedSlug) return
    setIsRefreshing(true)
    router.get(route('public.guide.beginner.show', { slug }), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <>
      <Head>
        <title>Beginner Guide</title>
        <meta name="description" content="Learn about character classes and starting equipment" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Beginner Guide"
            subtitle="Learn about character classes and starting equipment"
            icon={<Icon name="ti ti-school" className="w-8 h-8" />}
          />

          <div className="mt-6">
            <ClassTabs
              classes={classList}
              selectedSlug={selectedSlug}
              onClassSelect={handleClassSelect}
              isRefreshing={isRefreshing}
            />
          </div>

          {selectedClass && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <StatsSection
                className={selectedClass.className}
                character={selectedClass.character}
                stats={selectedClass.stats}
                skills={selectedClass.skills}
                
              />

              <div className="space-y-6">
                <InventoryGrid items={selectedClass.startingItems} />
                <WelcomeGiftsSection gifts={selectedClass.welcomeGifts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

BeginnerGuidePage.layout = (page) => <PublicLayout children={page} />
