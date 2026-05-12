import { useState, useMemo } from 'react'
import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import { usePve } from './PveContext'

// Job icon mapping (lowercase)
const jobIcons = {
  warrior: 'warrior',
  rogue: 'rogue',
  mage: 'mage',
  priest: 'priest',
}

export function FilterSection() {
  const { t } = useTranslation()
  const { data, nations, jobs, periods } = usePve()
  const [filters, setFilters] = useState(data.filters)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Nation tabs from API (int-based like UserRanking)
  const nationTabs = useMemo(() => {
    return Object.entries(nations).map(([id, name]) => ({
      id: Number(id),
      name,
      icon: Number(id) === 1 ? 'Karus' : Number(id) === 2 ? 'Human' : null,
    }))
  }, [nations])

  // Job tabs from API
  const jobTabs = useMemo(() => {
    return Object.entries(jobs).map(([id, name]) => ({
      id: Number(id),
      name,
      icon: jobIcons[name.toLowerCase()] || null,
    }))
  }, [jobs])

  const handleFilterChange = (key, value) => {
    if (filters[key] === value) return

    setIsRefreshing(true)

    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    const queryParams = {}

    if (newFilters.nation > 0) {
      queryParams.nation = newFilters.nation.toString()
    }
    if (newFilters.job > 0) {
      queryParams.job = newFilters.job.toString()
    }
    if (newFilters.period) {
      queryParams.period = newFilters.period
    }

    router.get(route('public.statistics.pve'), queryParams, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  return (
    <div className="bg-ko-card-bg border border-ko-border-primary rounded-lg p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Nation Tabs */}
        <div className="flex gap-1 p-1 bg-ko-widget-bg/50 rounded-xl border border-ko-border-primary">
          {nationTabs.map((nation) => (
            <button
              key={nation.id}
              onClick={() => handleFilterChange('nation', nation.id)}
              disabled={isRefreshing}
              className={cn(
                "flex items-center gap-2 py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300",
                isRefreshing ? "opacity-50 cursor-not-allowed" : "",
                filters.nation === nation.id
                  ? nation.id === 1
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : nation.id === 2
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg"
                  : "text-ko-text-muted hover:text-ko-text-primary"
              )}
            >
              {nation.icon ? (
                <Imagex width={20} height={20} icon={nation.icon} alt={nation.name} className="w-5 h-5" />
              ) : (
                <Icon name="ti ti-users" className="w-5 h-5" />
              )}
              <span>{nation.name}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-ko-border-primary"></div>

        {/* Job Tabs */}
        <div className="flex gap-1 p-1 bg-ko-widget-bg/50 rounded-xl border border-ko-border-primary">
          {jobTabs.map((job) => (
            <button
              key={job.id}
              onClick={() => handleFilterChange('job', job.id)}
              disabled={isRefreshing}
              className={cn(
                "flex items-center gap-1.5 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300",
                isRefreshing ? "opacity-50 cursor-not-allowed" : "",
                filters.job === job.id
                  ? "bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg"
                  : "text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-widget-bg/50"
              )}
            >
              {job.icon ? (
                <Imagex width={18} height={18} icon={job.icon} alt={job.name} className="w-[18px] h-[18px]" />
              ) : (
                <Icon name="ti ti-list" className="w-[18px] h-[18px]" />
              )}
              <span className="hidden sm:inline">{job.name}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-ko-border-primary"></div>

        {/* Period Tabs */}
        <div className="flex gap-1 p-1 bg-ko-widget-bg/50 rounded-xl border border-ko-border-primary">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => handleFilterChange('period', period.value)}
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
