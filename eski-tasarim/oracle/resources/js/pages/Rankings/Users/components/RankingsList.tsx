import { Icon } from '@/components/shared/icon'
import { PlayerRow } from './PlayerRow'
import { EmptyState } from './EmptyState'

export function RankingsList({ rankings, hasMore, total, isRefreshing, onLoadMore }) {
  const { t } = useTranslation()

  if (!rankings || rankings.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      {rankings.map((player) => (
        <PlayerRow key={player.userId} player={player} />
      ))}

      {hasMore && (
        <div className="mt-6 py-4 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ko-widget-bg border border-ko-border-primary text-ko-text-muted hover:border-ko-brand-primary hover:text-ko-brand-primary transition-all text-sm font-medium disabled:opacity-50"
          >
            {isRefreshing
              ? <Icon name="ti ti-loader-2" className="w-4 h-4 animate-spin" />
              : <Icon name="ti ti-chevrons-down" className="w-4 h-4" />
            }
            {t('rankings.users.loading_more')}
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="mt-6 py-4 text-center">
          <p className="text-sm text-ko-text-muted">
            {t('rankings.users.all_listed', { count: total })}
          </p>
        </div>
      )}
    </div>
  )
}
