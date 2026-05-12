import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import { Button } from '@/components/ui/button'
import { usePve } from './PveContext'
import { CardHeader } from './CardHeader'
import { EmptyState } from './EmptyState'

const ITEMS_PER_PAGE = 5

export function TopHunters() {
  const { t } = useTranslation()
  const { props } = usePage()
  const { data, periods } = usePve()
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const rankings = data.rankings
  const filters = data.filters

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [filters.nation, filters.job, filters.period])

  // Get visible rankings based on display count
  const visibleRankings = rankings.slice(0, displayCount)
  const hasMore = rankings.length > displayCount
  const remainingCount = rankings.length - displayCount

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, rankings.length))
  }

  // Get filter label for badge
  const getFilterLabel = () => {
    const parts = []
    if (filters.nation > 0) {
      const nationNames = ['', 'Karus', 'El Morad']
      parts.push(nationNames[filters.nation])
    }
    if (filters.job > 0) {
      const jobNames = ['', 'Warrior', 'Rogue', 'Mage', 'Priest']
      parts.push(jobNames[filters.job])
    }
    return parts.length > 0 ? parts.join(' • ') : null
  }

  // Get period label
  const getPeriodLabel = () => {
    const period = periods.find(p => p.value === filters.period)
    return period?.label || ''
  }

  const filterLabel = getFilterLabel()
  const periodLabel = getPeriodLabel()

  // Build badge
  const badge = (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      {periodLabel && (
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          {periodLabel}
        </span>
      )}
      {filterLabel && (
        <span className="text-xs text-ko-brand-primary bg-ko-brand-primary/10 px-3 py-1.5 rounded-full border border-ko-brand-primary/20">
          {filterLabel}
        </span>
      )}
      <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-3 py-1.5 rounded-full">
        {Math.min(displayCount, rankings.length)} / {rankings.length}
      </span>
    </div>
  )

  if (rankings.length === 0) {
    return (
      <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
        <CardHeader
          title={t('plugins.game.statistics_page.pve.rankings_title')}
          subtitle={t('plugins.game.statistics_page.pve.rankings_subtitle')}
          icon="ti ti-trophy"
          iconGradient="from-amber-500 to-yellow-500"
        />
        <EmptyState icon="ti ti-trophy" height={150} />
      </div>
    )
  }

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-6">
      {/* Header */}
      <CardHeader
        title={t('plugins.game.statistics_page.pve.rankings_title')}
        subtitle={t('plugins.game.statistics_page.pve.rankings_subtitle')}
        icon="ti ti-trophy"
        iconGradient="from-amber-500 to-yellow-500"
        badge={badge}
      />

      {/* Rankings List */}
      <div className="space-y-2">
        {visibleRankings.map((player, index) => (
          <div
            key={player.userId}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              index < 3
                ? index === 0
                  ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20'
                  : index === 1
                    ? 'bg-gradient-to-r from-gray-400/10 to-transparent border border-gray-400/20'
                    : 'bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20'
                : 'bg-ko-widget-bg/30 hover:bg-ko-widget-bg/50'
            }`}
          >
            {/* Rank */}
            <div className="w-8 flex-shrink-0">
              {index < 3 ? (
                <Imagex
                  width={28}
                  height={28}
                  icon={`rank_${index + 1}`}
                  alt={`Rank ${index + 1}`}
                  className="w-7 h-7"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-ko-widget-bg flex items-center justify-center">
                  <span className="text-xs font-bold text-ko-text-muted">{player.rank}</span>
                </div>
              )}
            </div>

            {/* Player Info */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Nation & Class Icons */}
              <div className="flex gap-1 flex-shrink-0">
                <div className="w-7 h-7 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex
                    width={24}
                    height={24}
                    icon={player.nationText === 'Karus' ? 'Karus' : 'Human'}
                    alt={player.nationText}
                    className="w-full h-full"
                  />
                </div>
                <div className="w-7 h-7 rounded overflow-hidden bg-ko-widget-bg/50 p-0.5">
                  <Imagex
                    width={24}
                    height={24}
                    icon={player.classIcon}
                    alt={player.className}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Name */}
              <Link
                href={route('public.profile.user.show', { userId: player.userId, slug: player.userSlug })}
                className="font-semibold text-ko-text-primary text-sm hover:text-ko-brand-primary transition-colors truncate max-w-[130px] sm:max-w-none"
              >
                {player.userName}
              </Link>
            </div>

            {/* Kills */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-emerald-400">
                {player.kills}
              </div>
              <div className="text-[10px] text-ko-text-muted uppercase">
                {t('plugins.game.statistics_page.pve.headers.kills')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-4 pt-4 border-t border-ko-border-primary">
          <Button
            variant="ghost"
            className="w-full text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-widget-bg/50"
            onClick={handleLoadMore}
          >
            <Icon name="ti ti-chevron-down" className="w-4 h-4 mr-2" />
            {Math.min(ITEMS_PER_PAGE, remainingCount)} {t('plugins.game.statistics_page.pve.load_more_label')}
          </Button>
        </div>
      )}
    </div>
  )
}
