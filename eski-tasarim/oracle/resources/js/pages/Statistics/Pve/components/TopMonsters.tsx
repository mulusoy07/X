import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { usePve } from './PveContext'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export function TopMonsters() {
  const { t } = useTranslation()
  const { props } = usePage()
  const { data } = usePve()
  const monsters = data.topMonsters

  const badge = (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {t('plugins.game.statistics_page.pve.top_count', { count: Math.min(monsters?.length || 0, 10) })}
    </span>
  )

  if (!monsters || monsters.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full min-h-[600px]">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.top_monsters.title')}
          subtitle={t('plugins.game.statistics_page.pve.top_monsters.subtitle')}
          icon="ti ti-skull"
          iconGradient="from-red-500 to-orange-500"
        />
        <EmptyState
          icon="ti ti-skull"
          height={400}
          description={t('plugins.game.statistics_page.pve.empty.monster_description')}
        />
      </div>
    )
  }

  const maxKills = monsters[0]?.kills || 1

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.top_monsters.title')}
          subtitle={t('plugins.game.statistics_page.pve.top_monsters.subtitle')}
          icon="ti ti-skull"
          iconGradient="from-red-500 to-orange-500"
          badge={badge}
        />
      </div>

      {/* Monster List - Top 10 monsters */}
      <div className="flex-1 flex flex-col justify-between">
        {monsters.slice(0, 10).map((monster, index) => {
          const percentage = (monster.kills / maxKills) * 100

          return (
            <div key={monster.id} className="flex items-center gap-3">
              {/* Rank */}
              <span className="text-sm text-ko-text-muted w-6 text-right font-medium">
                {index + 1}.
              </span>

              {/* Monster Info & Bar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={route('public.guide.mobs.show', { id: monster.id, slug: monster.mobSlug })}
                      className="text-sm font-semibold text-ko-text-primary hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
                    >
                      {monster.name}
                    </Link>
                    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-2 py-0.5 rounded">
                      {monster.zone}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-red-400">
                    {monster.kills}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-ko-widget-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
