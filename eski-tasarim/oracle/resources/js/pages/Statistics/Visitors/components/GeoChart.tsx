import { Chart } from 'react-google-charts'
import { usePage } from '@inertiajs/react'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export default function GeoChart({ data, title, countLabel, count }) {
  const { t } = useTranslation()
  const { props } = usePage()

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
        {title && (
          <CardHeader
            title={title}
            icon="ti ti-world"
            iconGradient="from-emerald-500 to-teal-500"
          />
        )}
        <EmptyState
          icon="ti ti-world"
          height={400}
          description={t('plugins.game.statistics_page.visitors.empty.geo_description')}
        />
      </div>
    )
  }

  // Format data for Google GeoChart
  const chartData = [
    ['Country', t('plugins.game.statistics_page.visitors.chart_labels.visitors'), { role: 'tooltip', type: 'string', p: { html: true } }],
    ...data.map((item) => [
      item.country,
      item.visitors,
      `<div style="padding: 10px 14px; font-size: 13px; color: #fafaf9;">
        <div style="color: #fbbf24; margin-bottom: 6px;">${item.name}</div>
        <div><strong style="font-size: 15px;">${(item.visitors ?? 0)}</strong> <span style="color: #a8a29e;">${t('plugins.game.statistics_page.visitors.chart_labels.visitor')}</span></div>
      </div>`
    ]),
  ]

  const options = {
    colorAxis: {
      colors: ['#78350f', '#d97706', '#fbbf24'],
    },
    backgroundColor: 'transparent',
    datalessRegionColor: '#57534e',
    defaultColor: '#57534e',
    legend: 'none',
    tooltip: {
      trigger: 'focus',
      isHtml: true,
    },
    keepAspectRatio: true,
  }

  const badge = count !== undefined && countLabel ? (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {countLabel}: {count}
    </span>
  ) : undefined

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
      {title && (
        <CardHeader
          title={title}
          icon="ti ti-world"
          iconGradient="from-emerald-500 to-teal-500"
          badge={badge}
        />
      )}
      <div className="w-full h-[400px]">
        <Chart
          chartType="GeoChart"
          data={chartData}
          options={options}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
