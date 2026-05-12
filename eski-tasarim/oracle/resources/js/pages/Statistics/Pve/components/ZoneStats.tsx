import { usePage } from '@inertiajs/react'
import { usePve } from './PveContext'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

// Zone color mapping
const zoneColors = {
  71: 'from-red-500 to-red-600',      // Ronark Land
  73: 'from-purple-500 to-purple-600', // Ardream
  83: 'from-amber-500 to-amber-600',   // Forgotten Temple
  84: 'from-gray-500 to-gray-600',     // Chaos Dungeon
  81: 'from-blue-500 to-blue-600',     // Colony Zone
  72: 'from-orange-500 to-orange-600', // Ronark Land Base
  1: 'from-green-500 to-green-600',    // Moradon
}

const defaultColor = 'from-ko-brand-primary to-ko-brand-secondary'

export function ZoneStats() {
  const { t } = useTranslation()
  const { props } = usePage()
  const { data } = usePve()
  const zones = data.zoneStats

  const badge = (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {t('plugins.game.statistics_page.pve.zone_stats.top_10')}
    </span>
  )

  if (!zones || zones.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full min-h-[600px]">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.zone_stats.title')}
          subtitle={t('plugins.game.statistics_page.pve.zone_stats.subtitle')}
          icon="ti ti-map"
          iconGradient="from-emerald-500 to-teal-500"
        />
        <EmptyState
          icon="ti ti-map"
          height={400}
          description={t('plugins.game.statistics_page.pve.empty.zone_description')}
        />
      </div>
    )
  }

  // First 9 zones shown individually, rest combined as "Others"
  const displayZones = zones.slice(0, 9)
  const otherZones = zones.slice(9)

  // Calculate "Others" totals if there are more than 9 zones
  const othersData = otherZones.length > 0
    ? {
        kills: otherZones.reduce((sum, z) => sum + z.kills, 0),
        percentage: otherZones.reduce((sum, z) => sum + z.percentage, 0),
        count: otherZones.length,
      }
    : null

  const othersColor = 'from-slate-500 to-slate-600'

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.zone_stats.title')}
          subtitle={t('plugins.game.statistics_page.pve.zone_stats.subtitle')}
          icon="ti ti-map"
          iconGradient="from-emerald-500 to-teal-500"
          badge={badge}
        />
      </div>

      {/* Zone List - Top 9 + Others */}
      <div className="flex flex-col justify-between flex-1">
        {displayZones.map((zone, index) => {
          const colorClass = zoneColors[zone.id] || defaultColor

          return (
            <div key={zone.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ko-text-muted w-6 text-right font-medium">
                    {index + 1}.
                  </span>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClass}`} />
                  <span className="text-sm font-medium text-ko-text-primary">
                    {zone.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-emerald-400">
                    {zone.kills}
                  </span>
                  <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-2 py-0.5 rounded">
                    {zone.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-ko-widget-bg rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-500`}
                  style={{ width: `${zone.percentage}%` }}
                />
              </div>
            </div>
          )
        })}

        {/* Others row - shown if there are more than 9 zones */}
        {othersData && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ko-text-muted w-6 text-right font-medium">
                  10.
                </span>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${othersColor}`} />
                <span className="text-sm font-medium text-ko-text-primary">
                  {t('plugins.game.statistics_page.pve.zone_stats.others')}
                </span>
                <span className="text-xs text-ko-text-muted">
                  ({othersData.count} {t('plugins.game.statistics_page.pve.zone_stats.zones')})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-400">
                  {othersData.kills}
                </span>
                <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-2 py-0.5 rounded">
                  {othersData.percentage}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-ko-widget-bg rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${othersColor} rounded-full transition-all duration-500`}
                style={{ width: `${othersData.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
