import { PvpProvider, FilterSection, PvpContent } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { usePage } from '@inertiajs/react'

function PvpStatisticsPage() {
  const { t } = useTranslation()
  const { error, message, data, nations, jobs, periods } = usePage().props

  if (error || !data) {
    return <ErrorState message={message || t('plugins.game.statistics_page.pvp.error_loading')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('plugins.game.statistics_page.pvp.title')}
          subtitle={t('plugins.game.statistics_page.pvp.description')}
          icon={<Icon name="ti ti-swords" className="w-8 h-8" />}
        />

        <PvpProvider initialData={data} nations={nations} jobs={jobs} periods={periods}>
          <div className="space-y-6">
            <FilterSection />
            <PvpContent />
          </div>
        </PvpProvider>
      </div>
    </div>
  )
}

PvpStatisticsPage.layout = (page) => <PublicLayout children={page} />

export default PvpStatisticsPage
