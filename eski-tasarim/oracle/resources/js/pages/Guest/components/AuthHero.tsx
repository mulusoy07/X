import { Icon } from '@/components/shared/icon'
import { useLayout } from '@/hooks'

export function AuthHero() {
  const { t } = useTranslation()
  const layout = useLayout()

  const enableServerList = layout?.config?.enable_server_list ?? true
  const servers = layout?.servers ?? []
  const selectedServerNo = String(layout?.selected_server_no ?? 1)

  const currentServer = enableServerList
    ? (servers.find(s => s.server_no === selectedServerNo) || servers[0])
    : null

  return (
    <div className="flex flex-col justify-center space-y-8 relative">
      <div className="relative space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-ko-text-primary leading-tight">
            {t('auth.hero.title_line1')}
            <br />
            <span className="bg-gradient-to-r from-ko-brand-primary via-ko-brand-secondary to-ko-brand-primary bg-clip-text text-transparent animate-gradient">
              {t('auth.hero.title_line2')}
            </span>
          </h1>

          <p className="text-lg text-ko-text-muted max-w-lg leading-relaxed">
            {t('auth.hero.description')}
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: 'ti ti-sword', title: t('auth.hero.pvp_battles'), desc: t('auth.hero.pvp_battles_desc') },
            { icon: 'ti ti-trophy', title: t('auth.hero.weekly_tournaments'), desc: t('auth.hero.weekly_tournaments_desc') },
            { icon: 'ti ti-gift', title: t('auth.hero.premium_bonuses'), desc: t('auth.hero.premium_bonuses_desc') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 group cursor-default hover:translate-x-2 transition-transform duration-300"
            >
              <div className="group-hover:scale-110 transition-transform text-ko-brand-primary">
                <Icon name={item.icon} size={22} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-ko-text-primary group-hover:text-ko-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-ko-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {currentServer && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-full backdrop-blur-sm hover:bg-ko-brand-primary/20 transition-all duration-300 group">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <span className="text-sm font-bold text-ko-brand-primary uppercase tracking-wider">
              {currentServer.server_name}
            </span>
            <Icon name="ti ti-sparkles" className="w-3 h-3 text-ko-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {currentServer && (
          <div className="bg-ko-card/50 backdrop-blur-sm border border-ko-border-primary rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon name="ti ti-server" className="w-4 h-4 text-ko-brand-primary" />
                  <span className="text-ko-text-muted font-semibold">{t('auth.hero.server_load')}</span>
                </div>
                <span className="font-bold text-ko-brand-primary">
                  %{currentServer.capacity_percentage.toFixed(0)}
                </span>
              </div>
              <div className="h-2 bg-ko-card rounded-full overflow-hidden border border-ko-border-primary">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${currentServer.capacity_percentage}%`,
                    background: 'linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)',
                    backgroundSize: '200%',
                    backgroundPosition: `${currentServer.capacity_percentage / 2}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
