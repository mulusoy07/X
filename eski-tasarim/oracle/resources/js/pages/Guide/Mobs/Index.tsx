import { Icon } from '@/components/shared/icon'
import { FilterSection, MobList, MobDetails } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function MobsGuidePage() {
  const { t } = useTranslation()
  const { error, message, mobs, selectedMob, selectedMobId, zones, filters } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !mobs) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const navigate = (routeName, params = {}, query = {}) => {
    setIsRefreshing(true)
    router.get(route(routeName, params), query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  const handleMobSelect = (mobId) => {
    navigate('public.guide.mobs.show', { id: mobId })
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    const query = {}
    if (newFilters.zoneId != null) query.zoneId = newFilters.zoneId
    if (newFilters.boss !== null && newFilters.boss !== undefined) query.boss = newFilters.boss
    if (newFilters.strName?.trim()) query.strName = newFilters.strName.trim()
    navigate('public.guide.mobs.index', {}, query)
  }

  const handleReset = () => {
    navigate('public.guide.mobs.index', {}, { zoneId: 21 })
  }

  return (
    <>
      <Head>
        <title>Mobs Guide</title>
        <meta name="description" content="Browse all mobs and their drops" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Mobs Guide"
            subtitle="Browse all mobs and their drops"
            icon={<Icon name="ti ti-skull" className="w-8 h-8" />}
          />

          <FilterSection
            filters={filters}
            zones={zones}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            isRefreshing={isRefreshing}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside>
              <MobList
                mobs={mobs}
                selectedMobId={selectedMobId}
                onMobSelect={handleMobSelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedMob ? (
                <MobDetails
                  key={selectedMobId}
                  mobDetail={selectedMob}
                  zones={zones}
                  selectedZoneId={filters?.zoneId}
                />
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-circle-check" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.mobs.select')}
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

MobsGuidePage.layout = (page) => <PublicLayout children={page} />
