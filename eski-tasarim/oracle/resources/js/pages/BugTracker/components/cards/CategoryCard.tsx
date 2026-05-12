import { Icon } from '@/components/shared/icon'

export function CategoryCard({ category }) {
  const { t } = useTranslation()
  return (
    <Link
      href={route('public.bug-tracker.category', { categorySlug: category.slug })}
      className="flex items-center gap-4 p-4 hover:bg-ko-widget-bg/30 transition-colors group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${category.color || '#3b82f6'}15`,
          border: `2px solid ${category.color || '#3b82f6'}30`,
          color: category.color || '#3b82f6'
        }}
      >
        <Icon name={category.icon || 'ti ti-alert-circle'} size={24} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-ko-text-primary group-hover:text-ko-brand-primary line-clamp-1 mb-0.5">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-ko-text-muted line-clamp-1">{category.description}</p>
        )}
      </div>

      <div className="hidden md:flex items-center gap-5 flex-shrink-0">
        <div className="text-center">
          <div className="text-lg font-black text-ko-text-primary">{category.bugCount || 0}</div>
          <div className="text-xs text-ko-text-muted">{t('bug_tracker.stats.total_short')}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-amber-500">{category.openCount || 0}</div>
          <div className="text-xs text-ko-text-muted">{t('bug_tracker.stats.open_short')}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-blue-500">{category.inProgressCount || 0}</div>
          <div className="text-xs text-ko-text-muted">{t('bug_tracker.stats.in_progress_short')}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-emerald-500">{category.resolvedCount || 0}</div>
          <div className="text-xs text-ko-text-muted">{t('bug_tracker.stats.resolved_short')}</div>
        </div>
      </div>

      <Icon name="ti ti-chevron-right" size={20} className="text-ko-text-muted group-hover:text-ko-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  )
}
