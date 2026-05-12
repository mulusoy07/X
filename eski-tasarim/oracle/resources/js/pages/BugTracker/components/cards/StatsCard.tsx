import { Icon } from '@/components/shared/icon'

export function BugTrackerStatsCard({ stats }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-ko-text-primary mb-4">{t('bug_tracker.stats.title')}</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-ko-widget-bg/30">
          <div className="flex items-center gap-3">
            <Icon name="ti ti-bug" size={20} className="text-ko-brand-primary" />
            <span className="font-medium text-ko-text-primary">{t('bug_tracker.stats.total')}</span>
          </div>
          <span className="text-2xl font-black text-ko-brand-primary">{stats.totalBugs}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-ko-widget-bg/30">
          <div className="flex items-center gap-3">
            <Icon name="ti ti-circle" size={20} className="text-green-500" />
            <span className="font-medium text-ko-text-primary">{t('bug_tracker.stats.open')}</span>
          </div>
          <span className="text-2xl font-black text-green-500">{stats.openBugs}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-ko-widget-bg/30">
          <div className="flex items-center gap-3">
            <Icon name="ti ti-loader" size={20} className="text-blue-500" />
            <span className="font-medium text-ko-text-primary">{t('bug_tracker.stats.in_progress')}</span>
          </div>
          <span className="text-2xl font-black text-blue-500">{stats.inProgressBugs}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-ko-widget-bg/30">
          <div className="flex items-center gap-3">
            <Icon name="ti ti-check" size={20} className="text-purple-500" />
            <span className="font-medium text-ko-text-primary">{t('bug_tracker.stats.resolved')}</span>
          </div>
          <span className="text-2xl font-black text-purple-500">{stats.resolvedBugs}</span>
        </div>
      </div>
    </div>
  )
}
