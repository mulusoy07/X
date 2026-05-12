import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'
import {
  Slider,
  Notices,
  Bio,
  UserClan,
  GmKing,
  BlogPosts,
  ServerStatus,
  GameEvents,
  ForumPosts,
} from './components'

export function Home() {
  const { t } = useTranslation()
  const { error, message, data } = usePage().props

  if (error || !data) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  return (
    <>
      <Head title="Home - OracleGamer" />

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-ko-main via-ko-card to-ko-main relative overflow-hidden">
        <main className="flex-1 relative">
          <Slider sliders={data.sliders} />
          <Notices notices={data.notices} />

          <section className="py-8">
            <div className="w-full max-w-[1440px] mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Bio bio={data.bio} />
                  <BlogPosts posts={data.blogPosts} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UserClan topUsers={data.topUsers} topClans={data.topClans} />
                    <GmKing staff={data.gameMasters} kings={data.topKings} />
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <ServerStatus />
                  <GameEvents events={data.gameEvents} />
                  <ForumPosts posts={data.forumPosts} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

Home.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>

export default Home
