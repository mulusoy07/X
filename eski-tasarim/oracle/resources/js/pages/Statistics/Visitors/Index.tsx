import { VisitorsProvider } from './components/VisitorsContext'
import { FilterSection } from './components/FilterSection'
import { VisitorsContent } from './components/VisitorsContent'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { usePage } from '@inertiajs/react'

function VisitorsStatisticsPage() {
  const { t } = useTranslation()
  const { error, message, data, periods } = usePage().props

  if (error || !data) {
    return <ErrorState message={message || t('plugins.game.statistics_page.error_loading')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('plugins.game.statistics_page.visitors.title')}
          subtitle={t('plugins.game.statistics_page.visitors.description')}
          icon={<Icon name="ti ti-users" className="w-8 h-8" />}
        />

        <VisitorsProvider initialData={data} periods={periods}>
          <div className="space-y-6">
            <FilterSection
              initialFilters={{ period: data.period }}
              periods={periods}
            />
            <VisitorsContent />
          </div>
        </VisitorsProvider>
      </div>
    </div>
  )
}

VisitorsStatisticsPage.layout = (page) => <PublicLayout children={page} />

export default VisitorsStatisticsPage
