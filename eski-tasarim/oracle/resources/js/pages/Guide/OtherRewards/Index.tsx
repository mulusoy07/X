import { Icon } from '@/components/shared/icon'
import {
  RewardTypeList,
  RewardHeader,
  DailyRewardsSection,
  KillAssistRewardsSection,
  OnlineRewardsSection,
} from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

const componentMap = {
  DAILY_REWARD:  DailyRewardsSection,
  ASSIST_REWARD: KillAssistRewardsSection,
  ONLINE_REWARD: OnlineRewardsSection,
}

export default function OtherRewardsGuidePage() {
  const { t } = useTranslation()
  const { error, message, allRewardTypes, selectedReward, selectedSlug } = usePage().props
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error || !allRewardTypes) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const handleRewardSelect = (slug) => {
    if (slug === selectedSlug) return
    setIsRefreshing(true)
    router.get(route('public.guide.other-rewards.show', { slug }), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onFinish: () => setIsRefreshing(false),
    })
  }

  const RewardComponent = selectedReward ? componentMap[selectedReward.rewardKey] : null

  return (
    <>
      <Head>
        <title>Other Rewards Guide</title>
        <meta name="description" content="Daily, kill assist, online, level and rebirth rewards" />
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title={t('guide.rewards.title')}
            subtitle={t('guide.rewards.description')}
            icon={<Icon name="ti ti-gift" className="w-8 h-8" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-6">
            <aside>
              <RewardTypeList
                rewardTypes={allRewardTypes}
                selectedSlug={selectedSlug}
                onRewardSelect={handleRewardSelect}
                isRefreshing={isRefreshing}
              />
            </aside>

            <main className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              {selectedReward && RewardComponent ? (
                <>
                  <RewardHeader reward={selectedReward} />
                  <RewardComponent reward={selectedReward} />
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-ko-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="ti ti-circle-check" className="w-10 h-10 text-ko-brand-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
                    {t('guide.rewards.select_type')}
                  </h3>
                  <p className="text-ko-text-muted text-sm">
                    {t('guide.select_item_desc')}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

OtherRewardsGuidePage.layout = (page) => <PublicLayout children={page} />
