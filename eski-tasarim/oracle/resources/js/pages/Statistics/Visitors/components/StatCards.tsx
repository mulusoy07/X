import { Icon } from '@/components/shared/icon'
import { usePage } from '@inertiajs/react'

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-4 hover:border-ko-border-hover transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-ko-text-muted text-sm">{title}</span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon name={icon} className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-ko-text-primary">
        {(value ?? 0)}
      </div>
    </div>
  )
}

export default function StatCards({ summary }) {
  const { t } = useTranslation()
  const { props } = usePage()

  const stats = [
    {
      title: t('plugins.game.statistics_page.visitors.stats.today'),
      value: summary.today,
      icon: 'ti ti-calendar-event',
      color: '#3b82f6',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.yesterday'),
      value: summary.yesterday,
      icon: 'ti ti-calendar-minus',
      color: '#8b5cf6',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.this_week'),
      value: summary.thisWeek,
      icon: 'ti ti-calendar-week',
      color: '#10b981',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.this_month'),
      value: summary.thisMonth,
      icon: 'ti ti-calendar-month',
      color: '#f59e0b',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.unique_users'),
      value: summary.uniqueUsers,
      icon: 'ti ti-users',
      color: '#ec4899',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.countries'),
      value: summary.countries,
      icon: 'ti ti-world',
      color: '#06b6d4',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.avg_daily'),
      value: summary.avgDaily,
      icon: 'ti ti-chart-line',
      color: '#84cc16',
    },
    {
      title: t('plugins.game.statistics_page.visitors.stats.total'),
      value: summary.totalVisitors,
      icon: 'ti ti-sum',
      color: '#f97316',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
