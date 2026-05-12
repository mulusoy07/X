import { DetailHeader } from '@/components/shared/DetailHeader'

export function RewardHeader({ reward }) {
  const { t } = useTranslation()
  return (
    <DetailHeader
      name={reward.rewardName}
      description={reward.rewardDescription}
      image={reward.image}
      imageSrcset={reward.imageSrcset}
      fallbackIcon="ti ti-gift"
      content={reward.content}
      contentClassName="tiptap-content"
      meta={
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-ko-text-muted">{t('guide.rewards.count', { count: reward.data?.rewards?.length || 0 })}</span>
        </div>
      }
    />
  )
}
