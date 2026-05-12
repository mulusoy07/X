import { Icon } from '@/components/shared/icon'
import { KingCard, VoteRanking, VoterModal } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'
import { useVoterModal } from './components/hooks/use-voter-modal'

export default function KingElectionsPage() {
  const { t } = useTranslation()
  const { error, message, karus_king, human_king, karus_votes, human_votes } = usePage().props
  const { selectedCandidate, isModalOpen, voters, openVotersModal, closeModal } = useVoterModal()

  if (error || !karus_votes || !human_votes || !karus_king || !human_king) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={t('king_elections.title')} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('king_elections.title')}
          subtitle={t('king_elections.description')}
          icon={<Icon name="ti ti-crown" className="w-6 h-6" />}
        />

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <KingCard king={karus_king} onOpenModal={openVotersModal} />
            <KingCard king={human_king} onOpenModal={openVotersModal} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VoteRanking
              title={t('king_elections.karus_candidates')}
              candidates={karus_votes}
              nation="karus"
              onOpenModal={openVotersModal}
            />
            <VoteRanking
              title={t('king_elections.human_candidates')}
              candidates={human_votes}
              nation="human"
              onOpenModal={openVotersModal}
            />
          </div>
        </div>
      </div>

      <VoterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
        nation={selectedCandidate?.nation}
        voters={voters}
      />
    </div>
  )
}

KingElectionsPage.layout = (page) => <PublicLayout children={page} />
