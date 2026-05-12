import { Icon } from '@/components/shared/icon'
import {
  ClanHeader,
  MembersList,
} from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'
import { usePage } from '@inertiajs/react'

function ClanProfilePage() {
  const { t } = useTranslation()
  const { error, message, data } = usePage().props

  // Error State
  if (error || !data) {
    return <ErrorState message={message || t('plugins.game.profile.clan.not_found')} />
  }

  const { clan, members } = data

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <PageHeader
          title={t('plugins.game.profile.clan.title')}
          subtitle={t('plugins.game.profile.clan.description')}
          icon={<Icon name="ti ti-shield" className="w-8 h-8" />}
        />

        {/* Clan Header */}
        <ClanHeader clan={clan} />

        {/* Members List */}
        <MembersList members={members} />
      </div>
    </div>
  )
}

ClanProfilePage.layout = (page) => <PublicLayout children={page} />

export default ClanProfilePage
