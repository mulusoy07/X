import { Imagex } from '@/components/shared/Imagex'
import type { Character } from './types'

const SYMBOL_NONE = 'none' as const

interface CharacterCardProps {
  character: Character
}

function getBackgroundStyle(rank: number): string {
  if (rank === 0) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
  if (rank === 1) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
  if (rank === 2) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'

  return rank % 2 === 0
    ? 'bg-ko-card/30 border-ko-border-primary'
    : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { t } = useTranslation()
  const rank = character.Rank
  const isTopThree = rank < 3
  const expPercentage = character.RequiredExp > 0
    ? Math.min((character.Exp / character.RequiredExp) * 100, 100)
    : 0
  const hasRebirth = character.RebirthLevel > 0

  return (
    <div className={`relative overflow-hidden rounded-xl ${getBackgroundStyle(rank)} border transition-colors duration-200`}>
      <div className="relative flex items-stretch">
        <div className="flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
          <div className="flex items-center justify-center">
            {isTopThree ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                <Imagex
                  width={36}
                  height={36}
                  icon={`rank_${rank + 1}`}
                  alt={`Rank ${rank + 1}`}
                  className="w-7 h-7 sm:w-9 sm:h-9"
                />
              </div>
            ) : (
              <div className="bg-ko-widget-bg rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-ko-border-primary">
                <span className="text-xs sm:text-sm font-bold text-ko-text-muted">{rank + 1}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                <Imagex
                  width={36}
                  height={36}
                  icon={character.NationText}
                  alt=""
                  className="w-full h-full"
                />
              </div>

              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                <Imagex
                  width={36}
                  height={36}
                  icon={character.ClassIcon}
                  alt={character.ClassName}
                  className="w-full h-full"
                />
              </div>

              {character.Symbol && character.Symbol !== SYMBOL_NONE && (
                <div className="hidden sm:block w-10 h-10 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex width={36} height={36} icon={character.Symbol} alt="" className="w-full h-full" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <Link
                  href={route('api.ko-game-v2.profile.user', {
                    userId: character.UserID.toString(),
                    slug: character.UserSlug
                  })}
                  className="font-bold text-ko-text-primary text-xs sm:text-sm hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
                >
                  {character.UserName}
                </Link>

                {character.TitleName !== null && (
                  <div className="hidden sm:inline-flex items-center px-2 py-0.5 bg-ko-widget-bg border border-ko-brand-primary/20 rounded">
                    <span className="text-[11px] font-semibold text-ko-brand-primary uppercase tracking-wide">
                      {character.TitleName}
                    </span>
                  </div>
                )}
              </div>

              {character.ClanID > 0 && (
                <div className="hidden sm:flex items-center gap-1 mt-0.5">
                  <Link
                    href={route('api.ko-game-v2.profile.clan', {
                      clanId: character.ClanID.toString(),
                      slug: character.ClanSlug
                    })}
                    className="flex items-center gap-1 text-ko-text-primary hover:text-ko-brand-primary transition-colors"
                  >
                    {character.ClanIcon && (
                      <Imagex src64={character.ClanIcon} alt={character.ClanName} className="w-5 h-5" />
                    )}
                    <span className="text-[11px] font-semibold tracking-wide">
                      {character.ClanName}
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
                  <span className="text-xs text-ko-text-muted font-normal">{t('account.character.level')}</span>
                  <span className="font-bold ml-1">
                    {character.Level}
                    {hasRebirth && (
                      <span className="text-purple-400">/{character.RebirthLevel}</span>
                    )}
                  </span>
                </div>
                <div className="text-xs text-ko-text-muted">
                  <span className="font-normal">{t('account.character.exp')}</span>
                  <span className="font-bold text-ko-text-primary ml-1">
                    {expPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-ko-widget-bg rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    hasRebirth
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary'
                  }`}
                  style={{ width: `${expPercentage}%` }}
                />
              </div>
            </div>

            <div className="text-center min-w-[3.5rem] sm:min-w-[5rem]">
              <div className="text-[8px] sm:text-[11px] text-ko-text-muted uppercase tracking-wider font-medium">
                {t('account.character.national')}
              </div>
              <div className="text-sm sm:text-lg font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                {character.FormattedLoyalty}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
