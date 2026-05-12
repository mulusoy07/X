import { Imagex } from '@/components/shared/Imagex'
import { Icon } from '@/components/shared/icon'

export function PlayerCard({
  player,
  showRank = false,
  rank,
  showVoteDate = false,
  voteDate,
  isTopThree = false
}) {
  return (
    <div className="relative flex items-stretch">
      {showRank && rank !== undefined && (
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
      )}

      <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
        <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
          <div className="sm:hidden w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
            <Imagex width={28} height={28} icon={player.classIcon} alt={player.className} className="w-full h-full" />
          </div>
          <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
            <Imagex width={36} height={36} icon={player.classIcon} alt={player.className} className="w-full h-full" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Link
              href={route('public.profile.user.show', { userId: player.userId, slug: player.userSlug })}
              className="font-bold text-ko-text-primary text-xs sm:text-sm hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
            >
              {player.userName}
            </Link>
          </div>

          {player.clanId > 0 && (
            <div className="hidden sm:flex items-center gap-0.5 mt-0.5">
              <Link
                href={route('public.profile.clan.show', { clanId: player.clanId, slug: player.clanSlug })}
                className="flex items-center gap-0.5 hover:text-ko-brand-primary transition-colors"
              >
                {player.clanIcon && (
                  <Imagex src64={player.clanIcon} alt={player.clanName} className="w-5 h-5" />
                )}
                <span className="text-[11px] font-semibold text-ko-text-primary tracking-wide truncate max-w-[80px]">
                  {player.clanName}
                </span>
              </Link>
            </div>
          )}
        </div>

        {showVoteDate && voteDate && (
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ko-widget-bg/30 border border-ko-border-primary/50">
              <Icon name="ti ti-calendar" className="w-3.5 h-3.5 text-ko-text-muted" />
              <span className="text-xs text-ko-text-muted">{voteDate}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
