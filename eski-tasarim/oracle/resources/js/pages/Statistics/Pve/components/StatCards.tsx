import { usePage } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { usePve } from './PveContext'

export function StatCards() {
  const { t } = useTranslation()
  const { props } = usePage()
  const { data } = usePve()
  const summary = data.summary

  // En aktif bölge için veri kontrolü
  const hasZoneData = summary.mostActiveZoneKills > 0 && summary.mostActiveZone !== 'Unknown'

  const stats = [
    {
      label: t('plugins.game.statistics_page.pve.stats.total_kills'),
      value: summary.totalKills,
      icon: 'ti ti-skull',
      color: 'from-red-500 to-orange-500',
      textColor: 'text-red-400',
    },
    {
      label: t('plugins.game.statistics_page.pve.stats.unique_monsters'),
      value: summary.uniqueMonsters,
      icon: 'ti ti-creature',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
    },
    {
      label: hasZoneData
        ? summary.mostActiveZone
        : t('plugins.game.statistics_page.pve.stats.active_zone'),
      value: hasZoneData
        ? t('plugins.game.statistics_page.pve.stats.kills_count', { count: summary.mostActiveZoneKills })
        : '0',
      icon: 'ti ti-map-pin',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
    },
    {
      label: t('plugins.game.statistics_page.pve.stats.avg_daily'),
      value: summary.avgDailyKills,
      icon: 'ti ti-chart-line',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-ko-card border border-ko-border-primary rounded-xl p-4 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />

          <div className="relative">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <Icon name={stat.icon} className="w-5 h-5 text-white" />
            </div>

            {/* Value */}
            <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-sm text-ko-text-muted">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
