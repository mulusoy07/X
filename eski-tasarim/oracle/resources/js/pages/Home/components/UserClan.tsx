import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { Imagex } from '@/components/shared/Imagex'
import type { TopUser, TopClan } from './types'

interface UserClanProps {
  topUsers: TopUser[]
  topClans: TopClan[]
}

export function UserClan({ topUsers, topClans }: UserClanProps) {
  const { t } = useTranslation()
  const [rankingTab, setRankingTab] = useState<'users' | 'clans'>('users')

  if ((!topUsers || topUsers.length === 0) && (!topClans || topClans.length === 0)) return null

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
            <Icon name="ti ti-trophy" className="text-ko-brand-primary" size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ko-text-primary">{t('home.top_list.title')}</h2>
            <p className="text-xs text-ko-text-muted">{t('home.top_list.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative bg-ko-widget-bg/50 rounded-xl p-1 border border-ko-border-primary">
          <div className="flex relative">
            <div className={cn(
              'absolute top-1 bottom-1 rounded-lg bg-ko-brand-primary transition-all duration-300',
              rankingTab === 'users' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
            )} />
            <button
              type="button"
              onClick={() => setRankingTab('users')}
              className={cn('relative z-10 flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2', rankingTab === 'users' ? 'text-ko-text-dark' : 'text-ko-text-muted')}
            >
              <Icon name="ti ti-users" size={16} />
              {t('home.top_list.players')}
            </button>
            <button
              type="button"
              onClick={() => setRankingTab('clans')}
              className={cn('relative z-10 flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2', rankingTab === 'clans' ? 'text-ko-text-dark' : 'text-ko-text-muted')}
            >
              <Icon name="ti ti-shield" size={16} />
              {t('home.top_list.clans')}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {rankingTab === 'users' && topUsers && topUsers.length > 0 && topUsers.map((user, idx) => {
            const rank = idx + 1
            const isTopThree = rank <= 3
            const getBgStyle = () => {
              if (rank === 1) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
              if (rank === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
              if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'
              return rank % 2 === 0 ? 'bg-ko-card-bg/30 border-ko-border-primary' : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
            }
            return (
              <div key={user.userId} className="group relative">
                <div className={`relative overflow-hidden rounded-xl ${getBgStyle()} border transition-colors duration-200`}>
                  <div className="relative flex items-stretch">
                    <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                      {isTopThree ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          <Imagex width={28} height={28} icon={`rank_${rank}`} />
                        </div>
                      ) : (
                        <div className="bg-ko-widget-bg rounded-lg w-8 h-8 flex items-center justify-center border border-ko-border-primary">
                          <span className="text-xs font-bold text-ko-text-card-meta">{rank}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center px-3 gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex gap-1 flex-shrink-0">
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={user.nationText} />
                          </div>
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={user.classIcon} />
                          </div>
                          {user.symbol !== 'none' && (
                            <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                              <Imagex width={28} height={28} icon={user.symbol} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/profile/user/${user.userId}/${user.userSlug}`} className="touch-target font-bold text-ko-text-card-title text-sm truncate block max-w-[150px]">
                            {user.userName}
                          </Link>
                          <div className="flex items-center gap-1 mt-0.5">
                            {user.clanId > 0 && user.clanName ? (
                              <Link href={`/profile/clan/${user.clanId}/${user.clanSlug}`} className="touch-target flex items-center gap-1 hover:opacity-80 transition-opacity">
                                {user.clanIcon && <Imagex src64={user.clanIcon} alt={user.clanName} className="w-4 h-4" />}
                                <span className="text-[11px] text-ko-text-card-meta truncate">{user.clanName}</span>
                              </Link>
                            ) : (
                              <span className="text-[11px] text-ko-text-card-meta">~</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-center min-w-[4rem]">
                          <div className="text-[11px] text-ko-text-card-meta uppercase tracking-wider font-medium">{t('home.top_list.monthly_np')}</div>
                          <div className="text-sm font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                            {user.loyaltyMonthlyFormatted}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {rankingTab === 'clans' && topClans && topClans.length > 0 && topClans.map((clan, idx) => {
            const rank = idx + 1
            const isTopThree = rank <= 3
            const getBgStyle = () => {
              if (rank === 1) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
              if (rank === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
              if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'
              return rank % 2 === 0 ? 'bg-ko-card-bg/30 border-ko-border-primary' : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
            }
            return (
              <div key={clan.idNum} className="group relative">
                <div className={`relative overflow-hidden rounded-xl ${getBgStyle()} border transition-colors duration-200`}>
                  <div className="relative flex items-stretch">
                    <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                      {isTopThree ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          <Imagex width={28} height={28} icon={`rank_${rank}`} />
                        </div>
                      ) : (
                        <div className="bg-ko-widget-bg rounded-lg w-8 h-8 flex items-center justify-center border border-ko-border-primary">
                          <span className="text-xs font-bold text-ko-text-card-meta">{rank}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center px-3 gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex gap-1 flex-shrink-0">
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            {clan.clanIcon ? (
                              <Imagex width={28} height={28} src64={clan.clanIcon} alt={clan.idName} />
                            ) : (
                              <Imagex width={28} height={28} icon="default_clan" />
                            )}
                          </div>
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={clan.gradeIcon} />
                          </div>
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={clan.nationText} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/profile/clan/${clan.idNum}/${clan.clanSlug}`} className="touch-target font-bold text-ko-text-card-title text-sm truncate block max-w-[145px] hover:text-ko-text-card-title-hover">
                            {clan.idName}
                          </Link>
                          <div className="text-[11px] text-ko-text-card-meta truncate">
                            <Link href={`/profile/user/${clan.leaderUserId}/${clan.leaderSlug}`} className="touch-target text-ko-text-card-meta hover:text-ko-text-card-meta-hover">
                              {clan.leaderUserName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-center min-w-[4rem]">
                          <div className="text-[11px] text-ko-text-card-meta uppercase tracking-wider font-medium">{t('home.top_list.monthly_np')}</div>
                          <div className="text-sm font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                            {clan.loyaltyMonthlyFormatted}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
