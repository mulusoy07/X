import { Imagex } from '@/components/shared/Imagex'
import { Icon } from '@/components/shared/icon'

function getBackgroundStyle(rank) {
  if (rank === 1) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
  if (rank === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
  if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'
  return rank % 2 === 0
    ? 'bg-ko-card/30 border-ko-border-primary'
    : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
}

export function ClanRow({ clan }) {
  const { t } = useTranslation()
  const rank = clan.rank
  const isTopThree = rank <= 3

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

          {/* Right Panel - Clan Info */}
          <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                <div className="sm:hidden w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  {clan.clanIcon ? (
                    <Imagex width={28} height={28} src64={clan.clanIcon} alt={clan.clanName} className="w-full h-full" />
                  ) : (
                    <Imagex width={28} height={28} icon="default_clan" alt="Default Clan" className="w-full h-full" />
                  )}
                </div>
                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  {clan.clanIcon ? (
                    <Imagex width={36} height={36} src64={clan.clanIcon} alt={clan.clanName} className="w-full h-full" />
                  ) : (
                    <Imagex width={36} height={36} icon="default_clan" alt="Default Clan" className="w-full h-full" />
                  )}
                </div>

                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={36} height={36} icon={clan.clanSymbol} alt="Clan Symbol" className="w-full h-full" />
                </div>

                <div className="sm:hidden w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={28} height={28} icon={clan.nationText} alt={clan.nationText} className="w-full h-full" />
                </div>
                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={36} height={36} icon={clan.nationText} alt={clan.nationText} className="w-full h-full" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Link
                    href={route('public.profile.clan.show', { clanId: clan.clanId, slug: clan.clanSlug })}
                    className="font-bold text-ko-text-primary text-xs sm:text-base hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
                  >
                    {clan.clanName}
                  </Link>
                </div>

                <div className="hidden sm:flex items-center gap-1 mt-0.5">
                  <Icon name="ti ti-users" className="w-3 h-3 text-ko-text-muted" />
                  <span className="text-xs text-ko-text-muted">{clan.members} {t('rankings.members')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
              <div className="hidden md:block text-center min-w-[5rem]">
                <div className="text-[11px] text-ko-text-muted uppercase tracking-wider font-medium">
                  {t('rankings.clans.clan_points')}
                </div>
                <div className="text-lg font-black text-ko-brand-secondary">
                  {clan.formattedClanPointFund}
                </div>
              </div>

              <div className="text-center min-w-[3.5rem] sm:min-w-[5rem]">
                <div className="text-[8px] sm:text-[11px] text-ko-text-muted uppercase tracking-wider font-medium">
                  {t('rankings.clans.total_np')}
                </div>
                <div className="text-sm sm:text-lg font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                  {clan.formattedPoints}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
