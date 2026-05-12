import { useState } from 'react'
import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'

export function FilterSection({ initialFilters, periods }) {
  const { t } = useTranslation()

  const [filters, setFilters] = useState(initialFilters)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handlePeriodChange = (period) => {
    if (period === filters.period) return

    setIsRefreshing(true)
    const newFilters = { ...filters, period }
    setFilters(newFilters)

    router.get(route('public.statistics.visitors'), { period }, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-4">
      <div className="flex flex-wrap items-center gap-3">
   
        {/* Period Tabs */}
        <div className="flex gap-1 p-1 bg-ko-widget-bg/50 rounded-xl border border-ko-border-primary">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => handlePeriodChange(period.value)}
              disabled={isRefreshing}
              className={cn(
                "flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300",
                isRefreshing ? "opacity-50 cursor-not-allowed" : "",
                filters.period === period.value
                  ? "bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg"
                  : "text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-widget-bg/50"
              )}
            >
              <Icon name="ti ti-calendar" className="w-4 h-4" />
              <span>{period.label}</span>
            </button>
          ))}
        </div>

        {/* Loading indicator */}
        {isRefreshing && (
          <div className="flex items-center gap-2 text-ko-text-muted">
            <Icon name="ti ti-loader-2" className="w-4 h-4 animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
