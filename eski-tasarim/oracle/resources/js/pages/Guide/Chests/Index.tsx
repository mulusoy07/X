import { Icon } from '@/components/shared/icon'
import { FilterSection, ChestList, ChestHeader, ContentSection } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function ChestsGuidePage() {
  const { t } = useTranslation()
  const { error, message, allChests, selectedChest, selectedOriginItemId, groups } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  const searchParams = new URLSearchParams(window.location.search)
  const activeGroup = searchParams.get('group') || 'all'

  if (error || !allChests) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const filteredChests = useMemo(() => {
    if (activeGroup === 'all') return allChests
    const groupData = groups[activeGroup]
    if (!groupData?.items) return allChests
    return allChests.filter(chest => groupData.items.includes(chest.originItemId))
  }, [allChests, activeGroup, groups])

  const handleGroupChange = (group) => {
    const query = group === 'all' ? {} : { group }
    router.get(window.location.pathname, query, { preserveState: true, preserveScroll: true, replace: true })
  }

  const handleChestSelect = (id) => {
    if (id === selectedOriginItemId) return
    setIsRefreshing(true)
    const query = activeGroup !== 'all' ? { group: activeGroup } : {}
    router.get(route('public.guide.chests.show', { id }), query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <>
      <Head>
        <title>Chests Guide</title>
        <meta name="description" content="Chest rewards and drop rates" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Chests Guide"
            subtitle="Chest rewards and drop rates"
            icon={<Icon name="ti ti-package" className="w-8 h-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside className="space-y-3">
              <FilterSection
                groups={groups}
                chestsData={allChests}
                activeGroup={activeGroup}
                onGroupChange={handleGroupChange}
              />
              <ChestList
                chests={filteredChests}
                selectedId={selectedOriginItemId}
                onChestSelect={handleChestSelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedChest ? (
                <>
                  <ChestHeader chest={selectedChest} groups={groups} />
                  <ContentSection chest={selectedChest} />
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-package" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.chests.select')}
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

ChestsGuidePage.layout = (page) => <PublicLayout children={page} />
