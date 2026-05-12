import { Icon } from '@/components/shared/icon'
import { EventHeader } from './EventHeader'
import { EventRewardsSection } from './EventRewardsSection'
import { EVENT_FIELD_CONFIG, DEFAULT_FIELDS } from './EventFieldConfig'

// Color mapping for Tailwind (to avoid purging issues)
const colorStyles = {
  'ko-brand-primary': { bg: 'bg-ko-brand-primary/20', text: 'text-ko-brand-primary' },
  'blue-500': { bg: 'bg-blue-500/20', text: 'text-blue-500' },
  'green-500': { bg: 'bg-green-500/20', text: 'text-green-500' },
  'purple-500': { bg: 'bg-purple-500/20', text: 'text-purple-500' },
  'yellow-500': { bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'orange-500': { bg: 'bg-orange-500/20', text: 'text-orange-500' },
  'red-500': { bg: 'bg-red-500/20', text: 'text-red-500' },
  'cyan-500': { bg: 'bg-cyan-500/20', text: 'text-cyan-500' },
}

export function EventSection({ event }) {
  const { t } = useTranslation()
  const eventData = event.data
  const fieldConfig = EVENT_FIELD_CONFIG[event.eventKey] || DEFAULT_FIELDS

  // No schedule data
  if (!eventData || eventData.length === 0) {
    return (
      <div className="space-y-6">
        <EventHeader event={event} />
        <div className="p-4 md:p-6">
          <EventRewardsSection rewards={event.rewards} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <EventHeader event={event} />

      <div className="p-4 md:p-6">
        {/* Schedule Section */}
        <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
            <h3 className="text-lg font-bold text-ko-text-primary">
              {t('guide.events.calendar')}
            </h3>
            <span className="ml-auto text-xs text-ko-text-muted bg-ko-card px-3 py-1.5 rounded-full">
              {t('guide.events.time_slots', { count: eventData.length })}
            </span>
          </div>

          <div className="space-y-4">
            {eventData.map((schedule, index) => (
              <ScheduleCard
                key={index}
                schedule={schedule}
                fields={fieldConfig}
              />
            ))}
          </div>
        </div>

        <EventRewardsSection rewards={event.rewards} />
      </div>
    </div>
  )
}

function ScheduleCard({ schedule, fields }) {
  const { t } = useTranslation()
  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => {
          const value = field.format(schedule, t)
          if (value === null) return null

          const colors = colorStyles[field.color] || colorStyles['ko-brand-primary']

          return (
            <FieldItem
              key={field.key}
              icon={field.icon}
              bgColor={colors.bg}
              textColor={colors.text}
              label={t(field.label)}
              value={value}
            />
          )
        })}
      </div>
    </div>
  )
}

function FieldItem({ icon, bgColor, textColor, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
        <Icon name={icon} className={`w-5 h-5 ${textColor}`} />
      </div>
      <div>
        <div className="text-xs text-ko-text-muted">{label}</div>
        <div className="text-sm font-semibold text-ko-text-primary">{value}</div>
      </div>
    </div>
  )
}
