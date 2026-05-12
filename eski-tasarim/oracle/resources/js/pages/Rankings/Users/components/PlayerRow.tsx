import { Imagex } from '@/components/shared/Imagex'

function getBackgroundStyle(rank) {
  if (rank === 1) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
  if (rank === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
  if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'
  return rank % 2 === 0
    ? 'bg-ko-card/30 border-ko-border-primary'
    : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
}

export function PlayerRow({ player }) {
  const { t } = useTranslation()
  const rank = player.rank
  const isTopThree = rank <= 3
  const hasRebirth = player.rebirthLevel > 0

  return (
    <div className="group relative">
      <div className={`relative overflow-hidden rounded-xl ${getBackgroundStyle(rank)} border transition-colors duration-200`}>
        <div className="relative flex items-stretch">
          {/* Left Panel - Rank */}
          <div className="flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
            <div className="flex items-center justify-center">
              {isTopThree ? (
                <>
                  <div className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center">
                    <Imagex width={28} height={28} icon={`rank_${rank}`} alt={`Rank ${rank}`} className="w-7 h-7" />
                  </div>
                  <div className="hidden sm:flex w-10 h-10 rounded-lg items-center justify-center">
                    <Imagex width={36} height={36} icon={`rank_${rank}`} alt={`Rank ${rank}`} className="w-9 h-9" />
                  </div>
                </>
              ) : (
                <div className="bg-ko-widget-bg rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-ko-border-primary">
                  <span className="text-xs sm:text-sm font-bold text-ko-text-muted">{rank}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Player Info */}
          <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                <div className="sm:hidden w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={28} height={28} icon={player.nationText} alt={player.nationText} className="w-full h-full" />
                </div>
                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={36} height={36} icon={player.nationText} alt={player.nationText} className="w-full h-full" />
                </div>

                <div className="sm:hidden w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={28} height={28} icon={player.classIcon} alt={player.className} className="w-full h-full" />
                </div>
                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={36} height={36} icon={player.classIcon} alt={player.className} className="w-full h-full" />
                </div>

                {player.symbol !== 'none' && (
                  <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                    <Imagex width={36} height={36} icon={player.symbol} alt="Symbol" className="w-full h-full" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Link
                    href={route('public.profile.user.show', { userId: player.userId, slug: player.userSlug })}
                    className="font-bold text-ko-text-primary text-xs sm:text-sm hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
                  >
                    {player.userName}
                  </Link>

                  {player.titleName && (
                    <div className="hidden sm:inline-flex items-center px-2 py-0.5 bg-ko-widget-bg border border-ko-brand-primary/20 rounded">
                      <span className="text-[11px] font-semibold text-ko-brand-primary uppercase tracking-wide">
                        {player.titleName}
                      </span>
                    </div>
                  )}
                </div>

                {player.clanId > 0 && player.clanName && (
                  <div className="hidden sm:flex items-center gap-1 mt-0.5">
                    <Link
                      href={route('public.profile.clan.show', { clanId: player.clanId, slug: player.clanSlug })}
                      className="flex items-center gap-1 hover:text-ko-brand-primary transition-colors"
                    >
                      {player.clanIcon && (
                        <Imagex src64={player.clanIcon} alt={player.clanName} className="w-5 h-5" />
                      )}
                      <span className="text-[11px] font-semibold text-ko-text-primary tracking-wide">
                        {player.clanName}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-8 flex-shrink-0">
              <div className="hidden md:block w-64">
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-sm ${hasRebirth ? 'text-purple-400' : 'text-ko-text-primary'}`}>
                    <span className="text-xs text-ko-text-muted font-normal">{t('rankings.users.level')}</span>
                    <span className="font-bold ml-1">
                      {player.level}
                      {hasRebirth && (
                        <span className="text-purple-400">/{player.rebirthLevel}</span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-ko-text-muted">
                    <span className="font-normal">{t('rankings.users.exp')}</span>
                    <span className="font-bold text-ko-text-primary ml-1">
                      {player.expPercentage}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-ko-widget-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${hasRebirth
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary'
                    }`}
                    style={{ width: `${player.expPercentage}%` }}
                  />
                </div>
              </div>

              <div className="text-center min-w-[3.5rem] sm:min-w-[5rem]">
                <div className="text-[8px] sm:text-[11px] text-ko-text-muted uppercase tracking-wider font-medium">
                  {t('rankings.users.national')}
                </div>
                <div className="text-sm sm:text-lg font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                  {player.formattedLoyalty}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
