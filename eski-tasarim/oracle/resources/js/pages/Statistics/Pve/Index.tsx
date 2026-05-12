import { PveProvider, FilterSection, PveContent } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { usePage } from '@inertiajs/react'

function PveStatisticsPage() {
  const { t } = useTranslation()
  const { error, message, data, nations, jobs, periods } = usePage().props

  if (error || !data) {
    return <ErrorState message={message || t('plugins.game.statistics_page.pve.error_loading')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('plugins.game.statistics_page.pve.title')}
          subtitle={t('plugins.game.statistics_page.pve.description')}
          icon={<Icon name="ti ti-skull" className="w-8 h-8" />}
        />

        <PveProvider initialData={data} nations={nations} jobs={jobs} periods={periods}>
          <div className="space-y-6">
            <FilterSection />
            <PveContent />
          </div>
        </PveProvider>
      </div>
    </div>
  )
}

PveStatisticsPage.layout = (page) => <PublicLayout children={page} />

export default PveStatisticsPage
