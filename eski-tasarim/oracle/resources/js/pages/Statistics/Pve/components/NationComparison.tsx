import { usePage } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import { usePve } from './PveContext'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export function NationComparisonCard() {
  const { t } = useTranslation()
  const { props } = usePage()
  const { data } = usePve()
  const comparison = data.nationComparison

  const totalKills = comparison.karus.totalKills + comparison.human.totalKills

  // Handle empty state
  if (totalKills === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.nation_comparison.title')}
          subtitle={t('plugins.game.statistics_page.pve.nation_comparison.subtitle')}
          icon="ti ti-trophy"
          iconGradient="from-amber-500 to-yellow-500"
        />
        <EmptyState icon="ti ti-trophy" height={200} />
      </div>
    )
  }

  const karusPercentage = Math.round((comparison.karus.totalKills / totalKills) * 100)
  const humanPercentage = 100 - karusPercentage

  // Determine winner
  const karusLeading = comparison.karus.totalKills > comparison.human.totalKills

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full">
      {/* Header */}
      <CardHeader
        title={t('plugins.game.statistics_page.pve.nation_comparison.title')}
        subtitle={t('plugins.game.statistics_page.pve.nation_comparison.subtitle')}
        icon="ti ti-trophy"
        iconGradient="from-amber-500 to-yellow-500"
      />

      {/* Nation Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Karus */}
        <div className={`relative p-4 rounded-xl border-2 ${karusLeading ? 'border-red-500 bg-red-500/10' : 'border-ko-border-primary bg-ko-widget-bg/50'}`}>
          {karusLeading && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <Icon name="ti ti-crown" className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex items-center gap-2 mb-3">
            <Imagex width={32} height={32} icon="Karus" alt="Karus" className="w-8 h-8" />
            <span className="font-bold text-red-400">Karus</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.total_kills')}</div>
              <div className="text-xl font-bold text-red-400">{comparison.karus.totalKills}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.hunters')}</div>
                <div className="font-semibold text-ko-text-primary">{comparison.karus.uniqueHunters}</div>
              </div>
              <div>
                <div className="text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.avg_kills')}</div>
                <div className="font-semibold text-ko-text-primary">{comparison.karus.avgKillsPerHunter}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Human */}
        <div className={`relative p-4 rounded-xl border-2 ${!karusLeading ? 'border-blue-500 bg-blue-500/10' : 'border-ko-border-primary bg-ko-widget-bg/50'}`}>
          {!karusLeading && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Icon name="ti ti-crown" className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex items-center gap-2 mb-3">
            <Imagex width={32} height={32} icon="Human" alt="El Morad" className="w-8 h-8" />
            <span className="font-bold text-blue-400">El Morad</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.total_kills')}</div>
              <div className="text-xl font-bold text-blue-400">{comparison.human.totalKills}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.hunters')}</div>
                <div className="font-semibold text-ko-text-primary">{comparison.human.uniqueHunters}</div>
              </div>
              <div>
                <div className="text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.avg_kills')}</div>
                <div className="font-semibold text-ko-text-primary">{comparison.human.avgKillsPerHunter}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Comparison */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-red-400 font-semibold">{karusPercentage}%</span>
          <span className="text-ko-text-muted">{t('plugins.game.statistics_page.pve.nation_comparison.kill_share')}</span>
          <span className="text-blue-400 font-semibold">{humanPercentage}%</span>
        </div>
        <div className="h-4 bg-ko-widget-bg rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
            style={{ width: `${karusPercentage}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
            style={{ width: `${humanPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
