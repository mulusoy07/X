import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { Imagex } from '@/components/shared/Imagex'
import type { StaffMember, KingEntry } from './types'

interface GmKingProps {
  staff: StaffMember[]
  kings: KingEntry[]
}

export function GmKing({ staff, kings }: GmKingProps) {
  const { t } = useTranslation()
  const [staffTab, setStaffTab] = useState<'staff' | 'kings'>('staff')

  if ((!staff || staff.length === 0) && (!kings || kings.length === 0)) return null

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="relative p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
            <Icon name="ti ti-crown" size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('home.gm_king.title')}
            </h2>
            <p className="text-xs text-ko-text-muted">{t('home.gm_king.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative bg-ko-widget-bg/50 rounded-xl p-1 border border-ko-border-primary">
          <div className="flex relative">
            <div className={cn(
              'absolute top-1 bottom-1 rounded-lg bg-purple-600 transition-all duration-300',
              staffTab === 'staff' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
            )} />
            <button
              type="button"
              onClick={() => setStaffTab('staff')}
              className={cn(
                'relative z-10 flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2',
                staffTab === 'staff' ? 'text-white' : 'text-ko-text-muted'
              )}
            >
              <Icon name="ti ti-users" size={16} />
              {t('home.gm_king.staff')}
            </button>
            <button
              type="button"
              onClick={() => setStaffTab('kings')}
              className={cn(
                'relative z-10 flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2',
                staffTab === 'kings' ? 'text-white' : 'text-ko-text-muted'
              )}
            >
              <Icon name="ti ti-crown" size={16} />
              {t('home.gm_king.kings')}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {staffTab === 'staff' && staff && staff.length > 0 && staff.map((staffMember, idx) => {
            const rank = idx + 1
            const bgStyle = rank % 2 === 0 ? 'bg-ko-card-bg/30 border-ko-border-primary' : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
            return (
              <div key={staffMember.userId} className="group relative">
                <div className={`relative overflow-hidden rounded-xl ${bgStyle} border transition-all duration-500`}>
                  <div className={`absolute top-1/2 -translate-y-1/2 right-1 w-3 h-3 rounded-full z-20 ${staffMember.isOnline ? 'bg-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]'} animate-pulse`} />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '200%', height: '200%' }}>
                    {staffMember.isOnline ? (
                      <><div className="sonar-ring-green sonar-ring-1" /><div className="sonar-ring-green sonar-ring-2" /><div className="sonar-ring-green sonar-ring-3" /><div className="sonar-ring-green sonar-ring-4" /></>
                    ) : (
                      <><div className="sonar-ring-red sonar-ring-1" /><div className="sonar-ring-red sonar-ring-2" /><div className="sonar-ring-red sonar-ring-3" /><div className="sonar-ring-red sonar-ring-4" /></>
                    )}
                  </div>
                  <div className="relative flex items-stretch">
                    <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                      <div className="bg-ko-widget-bg rounded-lg w-8 h-8 flex items-center justify-center border border-ko-border-primary">
                        <span className="text-xs font-bold text-ko-text-card-meta">{rank}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center px-3 gap-3 pr-6">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex gap-1 flex-shrink-0">
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={staffMember.nationText} />
                          </div>
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={staffMember.classIcon} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/profile/user/${staffMember.userId}/${staffMember.userSlug}`} className="touch-target font-bold text-ko-text-card-title text-sm truncate block max-w-[135px]">
                            {staffMember.userName}
                          </Link>
                          <div className="flex items-center gap-1 mt-0.5">
                            {staffMember.role.icon && <Icon name={staffMember.role.icon} className="w-4 h-4 text-ko-brand-primary/70 flex-shrink-0" size={16} />}
                            <span className="text-[11px] text-ko-text-card-meta truncate" style={{ color: staffMember.role.color }}>
                              {staffMember.role.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {staffTab === 'kings' && kings && kings.length > 0 && kings.map((king, idx) => {
            const rank = idx + 1
            const isTopThree = rank <= 3
            const getBgStyle = () => {
              if (rank === 1) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30'
              if (rank === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30'
              if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30'
              return rank % 2 === 0 ? 'bg-ko-card-bg/30 border-ko-border-primary' : 'bg-ko-widget-bg/30 border-ko-border-primary/50'
            }
            return (
              <div key={king.userId} className="group relative">
                <div className={`relative overflow-hidden rounded-xl ${getBgStyle()} border transition-all duration-500`}>
                  <div className={`absolute top-1/2 -translate-y-1/2 right-1 w-3 h-3 rounded-full z-20 ${king.isOnline ? 'bg-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]'} animate-pulse`} />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '200%', height: '200%' }}>
                    {king.isOnline ? (
                      <><div className="sonar-ring-green sonar-ring-1" /><div className="sonar-ring-green sonar-ring-2" /><div className="sonar-ring-green sonar-ring-3" /><div className="sonar-ring-green sonar-ring-4" /></>
                    ) : (
                      <><div className="sonar-ring-red sonar-ring-1" /><div className="sonar-ring-red sonar-ring-2" /><div className="sonar-ring-red sonar-ring-3" /><div className="sonar-ring-red sonar-ring-4" /></>
                    )}
                  </div>
                  <div className="relative flex items-stretch">
                    <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                      {isTopThree ? (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Imagex width={28} height={28} icon={`rank_${rank}`} />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg w-8 h-8 flex items-center justify-center border border-yellow-500/30">
                          <Icon name="ti ti-crown" size={14} className="text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center px-3 gap-3 pr-6">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex gap-1 flex-shrink-0">
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={king.nationText} />
                          </div>
                          <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                            <Imagex width={28} height={28} icon={king.classIcon} />
                          </div>
                          {king.symbol !== 'none' && (
                            <div className="w-8 h-8 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                              <Imagex width={28} height={28} icon={king.symbol} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/profile/user/${king.userId}/${king.userSlug}`} className="touch-target font-bold text-ko-text-card-title text-sm truncate block max-w-[135px]">
                            {king.userName}
                          </Link>
                          <div className="flex items-center gap-1 mt-0.5">
                            {king.clanId > 0 && king.clanName ? (
                              <Link href={`/profile/clan/${king.clanId}/${king.clanSlug}`} className="touch-target flex items-center gap-1 hover:opacity-80 transition-opacity">
                                {king.clanIcon && <Imagex src64={king.clanIcon} alt={king.clanName} className="w-4 h-4" />}
                                <span className="text-[11px] text-ko-text-card-meta truncate">{king.clanName}</span>
                              </Link>
                            ) : (
                              <span className="text-[11px] text-ko-text-card-meta">~</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-center min-w-[3rem]">
                          <div className="text-[11px] text-ko-text-card-meta uppercase tracking-wider font-medium">{t('home.gm_king.level')}</div>
                          <div className="text-sm font-black text-purple-400">{king.level}</div>
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
