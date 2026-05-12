import { SectionList } from './components/lists/SectionList'
import { RecentTopics } from './components/lists/RecentTopics'
import { ForumStatsCard } from './components/widgets/ForumStatsCard'
import { NewestMember } from './components/widgets/NewestMember'
import { ForumBreadcrumb } from './components/navigation/ForumBreadcrumb'
import { ForumProvider } from './context/ForumContext'
import { usePage } from '@inertiajs/react'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function ForumIndex() {
  // Get all data from Inertia props
  const props = usePage().props

  return (
    <ForumProvider data={props}>
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          {props.breadcrumbs && props.breadcrumbs.length > 0 && (
            <div className="mb-4">
              <ForumBreadcrumb items={props.breadcrumbs} />
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Left Column - Forum Sections */}
            <div>
              <SectionList sections={props.hierarchy} />

              {/* Recent Topics */}
              {props.recentTopics && props.recentTopics.length > 0 && (
                <div className="mt-8">
                  <RecentTopics topics={props.recentTopics} />
                </div>
              )}
            </div>

            {/* Right Column - Stats & Info */}
            <aside className="space-y-6">
              <ForumStatsCard stats={props.stats} />
              <NewestMember stats={props.stats} />
            </aside>
          </div>
        </div>
      </div>
    </ForumProvider>
  )
}

ForumIndex.layout = (page) => <PublicLayout children={page} />
