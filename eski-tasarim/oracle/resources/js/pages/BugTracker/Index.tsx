import { Icon } from '@/components/shared/icon'
import { CategoryList, BugList, BugTrackerStatsCard } from './components'
import { ForumBreadcrumb } from '../Forum/components'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'

export default function BugTrackerPage() {
  const { t } = useTranslation()
  const { error, message, categories, recentBugs, stats, breadcrumbs, userStatus } = usePage().props

  if (error || !categories) {
    return <ErrorState message={message || t('bug_tracker.errors.load_failed')} />
  }

  const userCan = {
    createBug: userStatus?.canCreateBug || false,
    commentBug: userStatus?.canCommentBug || false,
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={t('bug_tracker.common.title')} />
      <div className="container mx-auto px-4 py-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <ForumBreadcrumb items={breadcrumbs} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <CategoryList categories={categories} userCanCreateBug={userCan.createBug} />

            {recentBugs && recentBugs.length > 0 && (
              <div className="mt-8">
                <BugList bugs={recentBugs} title={t('bug_tracker.widget.title')} />
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <BugTrackerStatsCard stats={stats} />
          </aside>
        </div>
      </div>
    </div>
  )
}

BugTrackerPage.layout = (page) => <PublicLayout children={page} />
