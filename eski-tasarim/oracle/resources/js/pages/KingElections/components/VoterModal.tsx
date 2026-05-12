import { useEffect } from 'react'
import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { PlayerCard } from './PlayerCard'

export function VoterModal({ isOpen, onClose, candidate, nation, voters }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !candidate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-ko-card border border-ko-border-primary rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon
                name="ti ti-users"
                className={cn('w-5 h-5', nation === 'karus' ? 'text-red-400' : 'text-blue-400')}
              />
              <h3 className={cn('text-lg font-bold', nation === 'karus' ? 'text-red-400' : 'text-blue-400')}>
                {candidate.userName}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ko-card/50 transition-colors"
            >
              <Icon name="ti ti-x" className="w-5 h-5 text-ko-text-muted" />
            </button>
          </div>
          <p className="text-sm text-ko-text-muted mt-1">
            {t('king_elections.voters_count_display', { count: candidate.votes })}
          </p>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {voters.length > 0 ? (
            <div className="divide-y divide-ko-border-primary">
              {voters.map((voter, index) => (
                <div
                  key={voter.userId}
                  className="group relative overflow-hidden border-0 transition-colors duration-200"
                >
                  <PlayerCard
                    player={voter}
                    showRank={true}
                    rank={index + 1}
                    showVoteDate={true}
                    voteDate={voter.date}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Icon name="ti ti-users" className="w-12 h-12 text-ko-text-muted mb-3" />
              <p className="text-sm text-ko-text-muted">{t('king_elections.no_votes_yet')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
