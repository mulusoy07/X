import { PublicLayout } from '@/layouts/PublicLayout'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { Icon } from '@/components/shared/icon'
import { FilterSection, RankingsList } from './components'

export default function UsersRankings() {
  const { t } = useTranslation()
  const { data, error, message } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)
  const searchRef = useRef(null)

  if (error || !data) {
    return <ErrorState message={message || t('rankings.no_results')} />
  }

  const { rankings, filters, nations, jobs, sortOptions, hasMore, total } = data
  const page = filters.page

  const navigate = useCallback((query) => {
    setIsRefreshing(true)
    router.get(route('public.rankings.users'), query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }, [])

  const handleFilterChange = useCallback((key, value) => {
    navigate({ ...filters, [key]: value, page: 1 })
  }, [filters, navigate])

  const handleReset = useCallback(() => navigate({ page: 1 }), [navigate])

  const handleLoadMore = useCallback(() => navigate({ ...filters, page: page + 1 }), [filters, page, navigate])

  return (
    <>
      <Head title={t('rankings.users.title')} />

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title={t('rankings.users.title')}
            subtitle={t('rankings.users.subtitle')}
            icon={<Icon name="ti ti-trophy" className="w-8 h-8" />}
          />

          <div className="space-y-6">
            <FilterSection
              filters={filters}
              nations={nations}
              jobs={jobs}
              sortOptions={sortOptions}
              searchRef={searchRef}
              isRefreshing={isRefreshing}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />

            <RankingsList
              rankings={rankings}
              hasMore={hasMore}
              total={total}
              isRefreshing={isRefreshing}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </>
  )
}

UsersRankings.layout = (page) => <PublicLayout children={page} />
