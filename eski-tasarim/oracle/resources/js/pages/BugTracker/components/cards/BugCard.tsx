import { Icon } from '@/components/shared/icon'
import { UserAvatar } from '../../../Forum/components/ui/UserAvatar'
import { PriorityBadge, StatusBadge } from '../ui/Badges'

export function BugCard({ bug, showCategory = true }) {
  const { t } = useTranslation()
  return (
    <Link
      href={route('public.bug-tracker.bug', { categorySlug: bug.category.slug, bugSlug: bug.slug })}
      className="block p-4 hover:bg-ko-widget-bg/30 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <UserAvatar displayName={bug.author.name} size="md" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <PriorityBadge priority={bug.priority} showLabel={true} />
            <StatusBadge status={bug.status} showLabel={true} />

            {showCategory && bug.category && (
              <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider bg-ko-brand-primary/10 text-ko-brand-primary">
                {bug.category.name}
              </span>
            )}

            <h3 className="text-base font-bold text-ko-text-primary group-hover:text-ko-brand-primary line-clamp-1">
              {bug.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-ko-text-muted">
            <span className="font-medium text-ko-text-primary">{bug.author.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Icon name="ti ti-clock" size={12} />
              {bug.createdAtHuman}
            </span>
            {bug.lastComment && bug.lastComment.author && (
              <>
                <span>•</span>
                <span className="hidden sm:inline">{t('bug_tracker.widget.last_reply')}: {bug.lastComment.author.name}</span>
                <span className="hidden sm:inline">• {bug.lastComment.createdAtHuman}</span>
              </>
            )}
          </div>
        </div>

        <Icon name="ti ti-chevron-right" size={20} className="text-ko-text-muted group-hover:text-ko-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </Link>
  )
}
