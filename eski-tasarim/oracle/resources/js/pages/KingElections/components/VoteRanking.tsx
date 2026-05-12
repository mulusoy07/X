import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { NationSectionHeader, getNationStyles } from './NationSectionHeader'
import { PlayerCard } from './PlayerCard'

export function VoteRanking({ title, candidates, nation, onOpenModal }) {
  const { t } = useTranslation()
  const { gradient, text } = getNationStyles(nation)

  return (
    <div className="relative bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden transition-all duration-300 hover:border-ko-border-primary/80">
      <NationSectionHeader
        nation={nation}
        title={title}
        subtitle={`${candidates.length} ${t('king_elections.candidate')}`}
      />

      <div className="p-4 sm:p-6 space-y-2">
        {candidates.map((candidate) => {
          const isTopThree = candidate.rank <= 3

          return (
            <div
              key={candidate.userId}
              className={cn(
                'group relative overflow-hidden rounded-xl border transition-all duration-200',
                'hover:shadow-lg hover:shadow-ko-border-primary/10',
                isTopThree && candidate.rank === 1 && 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 hover:from-yellow-500/15 hover:to-yellow-600/10',
                isTopThree && candidate.rank === 2 && 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30 hover:from-gray-400/15 hover:to-gray-500/10',
                isTopThree && candidate.rank === 3 && 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30 hover:from-orange-500/15 hover:to-orange-600/10',
                !isTopThree && 'bg-ko-widget-bg/30 border-ko-border-primary/50 hover:bg-ko-widget-bg/50'
              )}
            >
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <PlayerCard
                    player={candidate}
                    showRank={true}
                    rank={candidate.rank}
                    isTopThree={isTopThree}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="hidden sm:block w-40 flex-shrink-0">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <Icon name="ti ti-thumb-up" className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-sm font-bold text-ko-text-primary">
                              {candidate.formattedVotes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="ti ti-chart-pie" className={cn('w-3.5 h-3.5', text)} />
                            <span className={cn('text-xs font-bold', text)}>
                              %{candidate.percentage}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-ko-widget-bg rounded-full overflow-hidden">
                          <div
                            className={cn('h-full transition-all duration-500 bg-gradient-to-r', gradient)}
                            style={{ width: `${candidate.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenModal(candidate)}
                    className={cn(
                      'flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2',
                      'rounded-lg text-xs font-semibold',
                      'transition-all duration-200 flex-shrink-0 ml-1 mr-3',
                      'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary',
                      'text-ko-text-dark hover:shadow-md hover:shadow-ko-brand-primary/20',
                      'active:scale-[0.98]'
                    )}
                  >
                    <Icon name="ti ti-users" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{t('king_elections.voters')}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] sm:text-xs">
                      {candidate.formattedVotes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
