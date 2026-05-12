import { DetailHeader } from '@/components/shared/DetailHeader'

export function EventHeader({ event }) {
  const { t } = useTranslation()
  return (
    <DetailHeader
      name={event.eventName}
      description={event.eventDescription}
      image={event.image}
      imageSrcset={event.imageSrcset}
      fallbackIcon="ti ti-calendar"
      content={event.content}
      meta={
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-ko-text-muted">{t('guide.rewards.count', { count: event.rewards?.length || 0 })}</span>
        </div>
      }
    />
  )
}
