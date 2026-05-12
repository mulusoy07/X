import { useVisitors } from './VisitorsContext'
import StatCards from './StatCards'
import GeoChart from './GeoChart'
import TrendChart from './TrendChart'
import TopCountries from './TopCountries'

export function VisitorsContent() {
  const { t } = useTranslation()
  const { data, periods } = useVisitors()

  // Get current period label
  const currentPeriod = periods.find(p => p.value === data.period)
  const periodLabel = currentPeriod?.label || ''

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <StatCards summary={data.summary} />

      {/* GeoChart + Top Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GeoChart
            data={data.geoData}
            title={t('plugins.game.statistics_page.visitors.geo_chart_title')}
            countLabel={t('plugins.game.statistics_page.visitors.stats.countries')}
            count={data.summary.countries}
          />
        </div>
        <div>
          <TopCountries
            countries={data.topCountries}
            title={t('plugins.game.statistics_page.visitors.top_countries_title')}
            countLabel={t('plugins.game.statistics_page.visitors.top_count', { count: data.topCountries.length })}
          />
        </div>
      </div>

      {/* Trend Chart */}
      <TrendChart
        data={data.dailyData}
        title={t('plugins.game.statistics_page.visitors.trend_chart_title')}
        periodLabel={periodLabel}
        labels={{
          visitors: t('plugins.game.statistics_page.visitors.chart_labels.visitors'),
          uniqueUsers: t('plugins.game.statistics_page.visitors.chart_labels.unique_users'),
        }}
      />
    </div>
  )
}
