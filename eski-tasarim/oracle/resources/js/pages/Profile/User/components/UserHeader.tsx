import { Link } from '@inertiajs/react'
import { Imagex } from '@/components/shared/Imagex'
import { Icon } from '@/components/shared/icon'

export function UserHeader({ user }) {
  const { t } = useTranslation()
  const isForbidden = [255, 11, 12, 250, 251].includes(user.authority || -1)
  const isAdmin = user.authority === 0
  const isNormal = user.authority === 1

  const getBannerStyle = () => {
    if (isForbidden) {
      return 'bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border-y-2 border-red-500/50 animate-pulse'
    }
    if (isAdmin) {
      return 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 border-y-2 border-yellow-500/50 animate-pulse'
    }
    return 'bg-gradient-to-r from-ko-card to-ko-widget-bg border border-ko-border-primary'
  }

  const getBannerContent = () => {
    if (isForbidden) {
      return (
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span className="text-sm font-black text-red-500 tracking-wider uppercase">
            {user.authorityText}
          </span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        </div>
      )
    }
    if (isAdmin) {
      return (
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
          <span className="text-sm font-black text-yellow-500 tracking-wider uppercase">
            {user.authorityText}
          </span>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="relative">
      <div className={`relative rounded-2xl overflow-hidden mb-6 ${getBannerStyle()}`}>
        {(isForbidden || isAdmin) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 py-3">
            {getBannerContent()}
          </div>
        )}

        <div className="relative z-20 p-4">
        <div className="flex items-center justify-between">
          
          {/* Left: Avatar & Info */}
          <div className="flex items-center gap-4">
            {/* Avatar with Badges */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/20 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-ko-card flex items-center justify-center border border-ko-border-primary/50 overflow-hidden">
                  <Imagex width={56} height={56} icon={user.classIcon} className="scale-105" alt={user.className} />
                </div>
              </div>

              {/* Nation Badge - Bottom Right */}
            <div className="absolute -bottom-2 -right-1 w-6 h-6 flex items-center justify-center overflow-hidden">
                <Imagex width={26} height={26} icon={user.nationText} alt={user.nationText} />
              </div>

              {/* Symbol Badge - Top Right */}
              {user.symbol !== 'none' && (
                <div className="absolute -top-2 -right-1 w-6 h-6  flex items-center justify-center overflow-hidden">
                  <Imagex width={26} height={26} icon={user.symbol} alt="Symbol" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="space-y-1">
              {user.tag && (
                <p
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{
                    color: `rgba(${user.tagColorR}, ${user.tagColorG}, ${user.tagColorB}, ${user.tagColorA / 255})`
                  }}
                >
                  <Icon name="ti ti-tag" className="w-3 h-3" />
                  {user.tag}
                </p>
              )}

              <h1 className="text-xl font-bold text-ko-text-primary">{user.userName}</h1>

              {user.titleName && (
                <p className="text-xs text-ko-brand-primary font-semibold flex items-center gap-1">
                  <Icon name="ti ti-hash" className="w-3 h-3" />
                  {user.titleName}
                </p>
              )}

              {user.clanId > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Link
                    href={`/profile/clan/${user.clanId}/${user.clanSlug}`}
                    className="flex items-center gap-1 hover:text-ko-brand-primary transition-colors"
                  >
                    {user.clanIcon && (
                      <Imagex src64={user.clanIcon} alt={user.clanName} className="w-5 h-5" />
                    )}
                    <span className="text-[11px] font-semibold text-ko-text-primary tracking-wide">
                      {user.clanName}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right: NP Stats */}
          <div className="bg-gradient-to-br from-ko-brand-primary/10 to-ko-brand-secondary/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-ko-brand-primary/30">
            <div className="text-center">
              <div className="text-xs text-ko-text-muted mb-1 uppercase tracking-wide">
                National Points
              </div>
              <div className="text-2xl font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                {user.formattedLoyalty}
              </div>
              <div className="text-xs text-ko-text-muted mt-1">
                {t('plugins.game.profile.user.monthly')}: <span className="text-ko-brand-primary font-semibold">{user.formattedLoyaltyMonthly}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
