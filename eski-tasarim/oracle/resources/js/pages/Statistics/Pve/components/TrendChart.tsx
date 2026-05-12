import { Chart } from 'react-google-charts'
import { usePve } from './PveContext'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export function TrendChart() {
  const { t } = useTranslation()
  const { data: pveData, periods } = usePve()
  const dailyData = pveData.dailyData

  // Get current period label
  const currentPeriod = periods.find(p => p.value === pveData.filters.period)
  const periodLabel = currentPeriod?.label || t('plugins.game.statistics_page.pve.trend_chart.subtitle', { days: dailyData?.length || 0 })

  const badge = dailyData && dailyData.length > 0 ? (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {periodLabel}
    </span>
  ) : null

  if (!dailyData || dailyData.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.trend_chart.title')}
          icon="ti ti-chart-area-line"
          iconGradient="from-blue-500 to-cyan-500"
        />
        <EmptyState
          icon="ti ti-chart-line"
          height={300}
          description={t('plugins.game.statistics_page.pve.empty.trend_description')}
        />
      </div>
    )
  }

  // Format data for Google AreaChart - ensure all values are valid
  const chartData = [
    [
      'Date',
      t('plugins.game.statistics_page.pve.trend_chart.karus'),
      t('plugins.game.statistics_page.pve.trend_chart.human'),
    ],
    ...dailyData.map((item) => [
      String(item.label || item.date || ''),
      Number(item.karusKills) || 0,
      Number(item.humanKills) || 0,
    ]),
  ]

  const options = {
    backgroundColor: 'transparent',
    colors: ['#EF4444', '#3B82F6'], // Red for Karus, Blue for Human
    chartArea: {
      width: '85%',
      height: '65%',
      left: '10%',
      top: '10%',
    },
    legend: {
      position: 'top',
      textStyle: {
        color: '#9CA3AF',
        fontSize: 12,
      },
    },
    hAxis: {
      textStyle: {
        color: '#9CA3AF',
        fontSize: 10,
      },
      gridlines: {
        color: 'transparent',
      },
      slantedText: true,
      slantedTextAngle: 65,
    },
    vAxis: {
      textStyle: {
        color: '#9CA3AF',
        fontSize: 11,
      },
      gridlines: {
        color: '#374151',
        count: 5,
      },
      minorGridlines: {
        color: 'transparent',
      },
      format: 'short',
    },
    isStacked: true,
    lineWidth: 2,
    areaOpacity: 0.3,
    tooltip: {
      trigger: 'focus',
    },
  }

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6 h-full">
      {/* Header */}
      <CardHeader
        title={t('plugins.game.statistics_page.pve.trend_chart.title')}
        icon="ti ti-chart-area-line"
        iconGradient="from-blue-500 to-cyan-500"
        badge={badge}
      />

      {/* Chart */}
      <div className="w-full h-[300px]">
        <Chart
          chartType="AreaChart"
          data={chartData}
          options={options}
          width="100%"
          height="100%"
          loader={<div className="w-full h-full flex items-center justify-center text-ko-text-muted">{t('plugins.game.statistics_page.pve.loading')}</div>}
        />
      </div>
    </div>
  )
}
