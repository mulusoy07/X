import { usePage } from '@inertiajs/react'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

export default function TopCountries({ countries, title, countLabel }) {
  const { t } = useTranslation()
  const { props } = usePage()
  const maxVisitors = countries[0]?.visitors || 1

  // Handle empty data
  if (!countries || countries.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
        <CardHeader
          title={title}
          icon="ti ti-flag"
          iconGradient="from-amber-500 to-yellow-500"
        />
        <EmptyState
          icon="ti ti-flag"
          height={200}
          description={t('plugins.game.statistics_page.visitors.empty.country_description')}
        />
      </div>
    )
  }

  const badge = countLabel ? (
    <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
      {countLabel}
    </span>
  ) : undefined

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
      <CardHeader
        title={title}
        icon="ti ti-flag"
        iconGradient="from-amber-500 to-yellow-500"
        badge={badge}
      />
      <div className="space-y-3">
        {countries.map((country, index) => {
          const percentage = (country.visitors / maxVisitors) * 100

          return (
            <div key={country.code} className="flex items-center gap-3">
              <span className="text-sm text-ko-text-muted w-5">{index + 1}.</span>
              <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                {country.code}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ko-text-primary">{country.name}</span>
                  <span className="text-sm font-semibold text-ko-text-primary">
                    {(country.visitors ?? 0)}
                  </span>
                </div>
                <div className="h-1.5 bg-ko-widget-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all"
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
