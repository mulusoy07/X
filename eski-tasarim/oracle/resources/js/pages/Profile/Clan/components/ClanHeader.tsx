import { Imagex } from '@/components/shared/Imagex'

export function ClanHeader({ clan }) {
  const { t } = useTranslation()
  return (
    <div className="bg-gradient-to-r from-ko-card to-ko-widget-bg border border-ko-border-primary rounded-2xl overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Left: Clan Icon & Info */}
          <div className="flex items-center gap-4">
            {/* Clan Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/20 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-ko-card flex items-center justify-center border border-ko-border-primary/50 overflow-hidden">

                  {clan.clanIcon ? (
                    <Imagex width={56} height={56} src64={clan.clanIcon} alt={clan.clanName} />
                  ) : (
                    <Imagex width={56} height={56} icon="default_clan" alt="Default Clan" />
                  )}
                </div>
              </div>

              <div className="absolute -bottom-2 -right-1 w-6 h-6 flex items-center justify-center overflow-hidden">
                <Imagex width={26} height={26} icon={clan.nationText} alt={clan.nationText} />
              </div>


              {/* Nation Badge */}
              <div className="absolute -top-2 -right-1 w-6 h-6  flex items-center justify-center overflow-hidden">
                <Imagex width={26} height={26} icon={clan.clanSymbol} alt={clan.clanSymbol} />
              </div>
            </div>

            {/* Clan Info */}
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-ko-text-primary">{clan.clanName}</h1>
              <div className="flex items-center gap-2 text-xs">
               
                <span className="text-ko-text-muted">{clan.clanLevelText}</span>
              </div>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-ko-brand-primary/10 to-ko-brand-secondary/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-ko-brand-primary/30">
              <div className="text-center">
                <div className="text-xs text-ko-text-muted mb-1 uppercase tracking-wide">
                  {t('plugins.game.profile.clan.total_np')}
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                  {clan.formattedTotalPoints}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-ko-brand-primary/10 to-ko-brand-secondary/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-ko-brand-primary/30">
              <div className="text-center">
                <div className="text-xs text-ko-text-muted mb-1 uppercase tracking-wide">
                  {t('plugins.game.profile.clan.total_donation')}
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                  {clan.formattedClanPointFund}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-ko-brand-primary/10 to-ko-brand-secondary/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-ko-brand-primary/30">
              <div className="text-center">
                <div className="text-xs text-ko-text-muted mb-1 uppercase tracking-wide">
                  {t('plugins.game.profile.clan.members')}
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                  {clan.members}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
