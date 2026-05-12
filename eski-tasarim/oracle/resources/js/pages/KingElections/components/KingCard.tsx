import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import { cn } from '@/lib/utils'
import { NationSectionHeader, getNationStyles } from './NationSectionHeader'

export function KingCard({ king, onOpenModal }) {
  const { t } = useTranslation()
  const { gradient, text, isKarus } = getNationStyles(king.nation)

  return (
    <div className={cn(
      'relative bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden transition-all duration-300',
      isKarus ? 'hover:border-red-500/40' : 'hover:border-blue-500/40'
    )}>
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400/50 z-10">
        <Icon name="ti ti-crown" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>

      <NationSectionHeader
        nation={king.nation}
        title={t('king_elections.winner', { nation: king.nationText })}
        subtitle={t('king_elections.winner_info_label', { nation: king.nationText, player: king.userName })}
      />

      <div className="p-4 sm:p-6">
        <div className="p-4 rounded-xl border bg-ko-widget-bg/40 border-ko-border-primary/50 mb-4">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-ko-widget-bg/50 p-1 border border-ko-border-primary/30">
                  <Imagex
                    width={40}
                    height={40}
                    icon={king.classIcon}
                    alt={king.className}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-bold text-ko-text-primary truncate">
                  {king.userName}
                </div>
                {king.clanId > 0 ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {king.clanIcon && (
                      <Imagex src64={king.clanIcon} alt={king.clanName} className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="text-xs sm:text-sm font-semibold text-ko-text-muted truncate">
                      {king.clanName}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-ko-text-muted">
                    {t('king_elections.no_clan')}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="bg-ko-widget-bg/50 px-3 py-2 rounded-lg border border-ko-border-primary/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name="ti ti-thumb-up" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span className="text-[9px] sm:text-[10px] text-ko-text-muted uppercase tracking-wider font-medium">
                    {t('king_elections.vote_label')}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400">
                  {king.formattedVotes}
                </div>
              </div>

              <div className="bg-ko-widget-bg/50 px-3 py-2 rounded-lg border border-ko-border-primary/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name="ti ti-chart-pie" className={cn('w-3 h-3 sm:w-3.5 sm:h-3.5', text)} />
                  <span className="text-[9px] sm:text-[10px] text-ko-text-muted uppercase tracking-wider font-medium">
                    {t('king_elections.percentage_label')}
                  </span>
                </div>
                <div className={cn('text-base sm:text-lg font-bold', text)}>
                  %{king.percentage}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 bg-ko-widget-bg rounded-full overflow-hidden">
              <div
                className={cn('h-full bg-gradient-to-r transition-all duration-500', gradient)}
                style={{ width: `${king.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenModal(king)}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-3',
            'rounded-lg text-sm font-semibold',
            'transition-all duration-200',
            'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary',
            'text-ko-text-dark hover:shadow-md hover:shadow-ko-brand-primary/20',
            'active:scale-[0.98]'
          )}
        >
          <Icon name="ti ti-users" className="w-4 h-4" />
          <span>{t('king_elections.voters')}</span>
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs">
            {king.formattedVotes}
          </span>
        </button>
      </div>
    </div>
  )
}
