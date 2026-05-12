import { BugCard } from '../cards/BugCard'

export function BugList({ bugs, title }) {
  const { t } = useTranslation()

  if (!bugs || bugs.length === 0) {
    return (
      <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
        <div className="p-6 text-center">
          <p className="text-ko-text-muted">{t('bug_tracker.widget.no_bugs')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      {title && (
        <div className="px-4 py-3 border-b border-ko-border-primary bg-ko-widget-bg/20">
          <h3 className="text-lg font-bold text-ko-text-primary">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-ko-border-primary">
        {bugs.map((bug) => (
          <BugCard key={bug.id} bug={bug} />
        ))}
      </div>
    </div>
  )
}
