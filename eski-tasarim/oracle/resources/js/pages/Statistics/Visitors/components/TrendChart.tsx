import { Chart } from 'react-google-charts'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export default function TrendChart({ data, title, periodLabel, labels }) {
  const { t } = useTranslation()
  const visitorsLabel = labels?.visitors || 'Visitors'
  const uniqueUsersLabel = labels?.uniqueUsers || 'Unique Users'

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
        {title && (
          <CardHeader
            title={title}
            icon="ti ti-chart-area-line"
            iconGradient="from-blue-500 to-cyan-500"
          />
        )}
        <EmptyState
          icon="ti ti-chart-line"
          height={300}
          description={t('plugins.game.statistics_page.visitors.empty.trend_description')}
        />
      </div>
    )
  }

  // Format data for Google LineChart
  const chartData = [
    ['Date', visitorsLabel, uniqueUsersLabel],
    ...data.map((item) => [item.label, item.visitors, item.uniqueUsers]),
  ]

  const options = {
    curveType: 'function',
    legend: { position: 'top', textStyle: { color: '#9ca3af' } },
    backgroundColor: 'transparent',
    chartArea: {
      left: 60,
      right: 20,
      top: 40,
      bottom: 80,
      width: '100%',
      height: '65%',
    },
    hAxis: {
      textStyle: { color: '#9ca3af', fontSize: 10 },
      gridlines: { color: '#374151' },
      slantedText: true,
      slantedTextAngle: 65,
    },
    vAxis: {
      textStyle: { color: '#9ca3af' },
      gridlines: { color: '#374151' },
      minValue: 0,
    },
    colors: ['#f59e0b', '#fbbf24'],
    lineWidth: 3,
    pointSize: 0,
    areaOpacity: 0.1,
    tooltip: {
      trigger: 'focus',
    },
  }

  const badge = periodLabel ? (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {periodLabel}
    </span>
  ) : undefined

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
      {title && (
        <CardHeader
          title={title}
          icon="ti ti-chart-area-line"
          iconGradient="from-blue-500 to-cyan-500"
          badge={badge}
        />
      )}
      <div className="w-full h-[300px]">
        <Chart
          chartType="AreaChart"
          data={chartData}
          options={options}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
