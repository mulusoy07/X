import { VoteCandidate, Voter } from '../types'

export function useVoterModal() {
  const [selectedCandidate, setSelectedCandidate] = useState<VoteCandidate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [voters, setVoters] = useState<Voter[]>([])

  const openVotersModal = useCallback((candidate: VoteCandidate) => {
    setSelectedCandidate(candidate)
    setVoters(candidate.voters || [])
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCandidate(null)
    setVoters([])
  }, [])

  return {
    selectedCandidate,
    isModalOpen,
    voters,
    openVotersModal,
    closeModal
  }
}
