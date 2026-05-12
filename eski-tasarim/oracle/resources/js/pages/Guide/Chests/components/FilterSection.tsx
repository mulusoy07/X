import { cn } from '@/lib/utils'
import { Icon } from '@/components/shared/icon'

export function FilterSection({ groups, chestsData, activeGroup, onGroupChange }) {
  const { t } = useTranslation()

  const groupCounts = useMemo(() => {
    const counts = {}
    Object.entries(groups).forEach(([key, group]) => {
      const itemSet = new Set(group.items ?? [])
      counts[key] = chestsData.filter(c => itemSet.has(c.originItemId)).length
    })
    return counts
  }, [groups, chestsData])

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            {t('guide.chests.categories')}
          </h3>
        </div>
      </div>

      {/* Categories */}
      <div className="p-3 space-y-1">
        {/* All Chests */}
        <button
          type="button"
          onClick={() => onGroupChange('all')}
          className={cn(
            'w-full px-3 py-2.5 rounded-xl text-left flex items-center gap-3 relative overflow-hidden transition-all',
            activeGroup === 'all'
              ? 'bg-ko-card/80 text-ko-text-primary border border-ko-brand-primary'
              : 'bg-ko-card text-ko-text-primary hover:bg-ko-card/80 border border-transparent hover:border-ko-brand-primary'
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-ko-widget-bg flex items-center justify-center flex-shrink-0">
            <Icon name="ti ti-layout-grid" className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{t('guide.chests.all')}</div>
            <div className="text-xs opacity-70">{t('guide.chests.count', { count: chestsData.length })}</div>
          </div>

          <div className={cn(
            'text-xs font-bold px-2 py-1 rounded-full',
            activeGroup === 'all'
              ? 'bg-ko-brand-primary text-white'
              : 'bg-ko-widget-bg text-ko-brand-primary border border-ko-brand-primary'
          )}>
            {chestsData.length}
          </div>
        </button>

        {/* Group Categories */}
        {Object.entries(groups).map(([key, group]) => {
          const count = groupCounts[key] ?? 0

          return (
            <button
              type="button"
              key={key}
              onClick={() => onGroupChange(key)}
              className={cn(
                'w-full px-3 py-2.5 rounded-xl text-left flex items-center gap-3 relative overflow-hidden transition-all',
                activeGroup === key
                  ? 'bg-ko-card/80 text-ko-text-primary border border-ko-brand-primary'
                  : 'bg-ko-card text-ko-text-primary hover:bg-ko-card/80 border border-transparent hover:border-ko-brand-primary'
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-ko-widget-bg flex items-center justify-center flex-shrink-0">
                {key === 'moira' ? (
                  <Icon name="ti ti-user" className="w-4 h-4" />
                ) : (
                  <Icon name="ti ti-bulb" className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{group.name}</div>
                <div className="text-xs opacity-70">{t('guide.chests.count', { count })}</div>
              </div>

              <div className={cn(
                'text-xs font-bold px-2 py-1 rounded-full',
                activeGroup === key
                  ? 'bg-white/20 text-white'
                  : 'bg-ko-brand-primary/20 text-ko-brand-primary'
              )}>
                {count}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
