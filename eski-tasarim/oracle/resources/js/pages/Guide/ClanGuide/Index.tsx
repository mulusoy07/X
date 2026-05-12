import { Icon } from '@/components/shared/icon'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'
import { InfoCards, RankTable, RankHeader } from './components'

export default function ClanGuidePage() {
  const { t } = useTranslation()
  const { error, message, creation, customization, limits, ranks } = usePage().props

  if (error || !ranks) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  return (
    <>
      <Head>
        <title>Clan Guide</title>
        <meta name="description" content="Learn about clan creation, customization, and ranks" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title="Clan Guide"
            subtitle="Learn about clan creation, customization, and ranks"
            icon={<Icon name="ti ti-users-group" className="w-8 h-8" />}
          />

          <div className="mt-6">
            <InfoCards creation={creation} customization={customization} limits={limits} />
          </div>

          <div className="mt-6">
            <RankHeader />
          </div>

          <div className="mt-6">
            <RankTable ranks={ranks} />
          </div>
        </div>
      </div>
    </>
  )
}

ClanGuidePage.layout = (page) => <PublicLayout children={page} />
