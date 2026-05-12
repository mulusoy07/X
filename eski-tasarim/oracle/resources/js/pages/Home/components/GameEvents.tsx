import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Imagex } from '@/components/shared/Imagex'
import type { GameEvent } from './types'

interface GameEventState extends GameEvent {
  TotalSeconds: number
  CountdownMinutesNum: number
  EventIdNum: number
  StatusCodeNum: number
  DaysNum: number
  HoursNum: number
  MinutesNum: number
  SecondsNum: number
}

interface GameEventsProps {
  events: GameEvent[]
}

const DEFAULT_EVENT_IMAGE = 'assets/images/events/default-event.png'

function toEventState(event: GameEvent): GameEventState {
  const CountdownMinutesNum = Number(event.countdownMinutes) || 0
  const TotalSeconds = CountdownMinutesNum * 60
  return {
    ...event,
    TotalSeconds,
    CountdownMinutesNum,
    EventIdNum: Number(event.eventId) || 0,
    StatusCodeNum: Number(event.statusCode) || 0,
    DaysNum: Math.floor(TotalSeconds / 86400),
    HoursNum: Math.floor((TotalSeconds % 86400) / 3600),
    MinutesNum: Math.floor((TotalSeconds % 3600) / 60),
    SecondsNum: TotalSeconds % 60,
  }
}

export function GameEvents({ events }: GameEventsProps) {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [eventsState, setEventsState] = useState<GameEventState[]>(() =>
    (events || []).map(toEventState)
  )

  useEffect(() => {
    if (!events || events.length === 0) {
      setEventsState([])
      setCurrentSlide(0)
      return
    }
    setEventsState(events.map(toEventState))
    setCurrentSlide(0)
  }, [events])

  useEffect(() => {
    if (!eventsState || eventsState.length === 0) return
    const timer = setInterval(() => {
      setEventsState(prevEvents =>
        prevEvents.map(event => {
          if (event.TotalSeconds <= 0) {
            return { ...event, TotalSeconds: 0, DaysNum: 0, HoursNum: 0, MinutesNum: 0, SecondsNum: 0 }
          }
          const newTotalSeconds = event.TotalSeconds - 1
          return {
            ...event,
            TotalSeconds: newTotalSeconds,
            DaysNum: Math.floor(newTotalSeconds / 86400),
            HoursNum: Math.floor((newTotalSeconds % 86400) / 3600),
            MinutesNum: Math.floor((newTotalSeconds % 3600) / 60),
            SecondsNum: newTotalSeconds % 60,
          }
        })
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [eventsState.length])

  if (!events || events.length === 0) return null

  const getStatusColor = (statusCode: number) => {
    const statusColors: Record<number, string> = { 1: '#22c55e', 2: '#f97316', 3: '#3b82f6' }
    return statusColors[statusCode] || '#6b7280'
  }

  const getEventImage = (event: GameEventState) => {
    if (event.image) return event.image
    return `assets/images/events/event-${event.EventIdNum}.webp`
  }

  const handleSliderScroll = useCallback((direction: 'prev' | 'next') => {
    const container = sliderRef.current
    if (!container) return
    setCurrentSlide(prev => {
      const newIndex = direction === 'prev'
        ? (prev - 1 + eventsState.length) % eventsState.length
        : (prev + 1) % eventsState.length
      container.scrollTo({ left: container.offsetWidth * newIndex, behavior: 'smooth' })
      return newIndex
    })
  }, [eventsState.length])

  const handleDotClick = useCallback((index: number, e: MouseEvent) => {
    e.preventDefault()
    const container = sliderRef.current
    if (!container) return
    container.scrollTo({ left: container.offsetWidth * index, behavior: 'smooth' })
    setCurrentSlide(index)
  }, [])

  const handleImageError = (e: { currentTarget: HTMLImageElement }) => {
    e.currentTarget.src = DEFAULT_EVENT_IMAGE
  }

  const hasMultipleEvents = eventsState.length > 1

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
              <Icon name="ti ti-calendar" size={18} className="text-ko-brand-primary" />
            </div>
            {t('home.events.title')}
          </h2>
          <Link
            href={route('public.guide.events.index')}
            className="text-xs text-ko-brand-primary hover:text-ko-brand-secondary transition-colors font-semibold flex items-center gap-1 group/link"
          >
            {t('home.events.view_all')}
            <Icon name="ti ti-arrow-right" size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="relative group">
          {hasMultipleEvents && (
            <button
              type="button"
              onClick={() => handleSliderScroll('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ko-card/90 backdrop-blur-md border border-ko-border-primary flex items-center justify-center hover:bg-ko-brand-primary hover:border-ko-brand-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              aria-label="Previous event"
            >
              <Icon name="ti ti-chevron-right" size={20} className="rotate-180 text-ko-brand-primary hover:text-white transition-colors" />
            </button>
          )}

          <div
            ref={sliderRef}
            className="overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide select-none touch-pan-x cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', willChange: 'scroll-position' }}
            role="region"
            aria-label={t('home.events.swiper_label')}
          >
            <div className="flex">
              {eventsState.map((event, index) => {
                const statusColor = getStatusColor(event.StatusCodeNum)
                const eventImage = getEventImage(event)

                return (
                  <div key={event.eventId || index} className="w-full flex-shrink-0 snap-start">
                    <Link
                      href={route('public.guide.events.show', { slug: event.slug })}
                      className="block relative rounded-xl overflow-hidden bg-ko-widget-bg/50 backdrop-blur-sm border border-ko-border-primary hover:border-ko-brand-primary/50 transition-all group/event"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Imagex
                          src={eventImage}
                          srcset={event.imageSrcset}
                          alt={event.eventName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 400px"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute top-4 left-4 z-10">
                          <div className="inline-flex items-center gap-2 bg-ko-card/90 backdrop-blur-md border border-ko-border-primary rounded-full px-3 py-1.5 shadow-lg">
                            <Icon name="ti ti-clock" size={14} className="text-ko-brand-primary shrink-0" />
                            <span className="text-ko-brand-primary font-black font-mono text-sm whitespace-nowrap">
                              {`${String(event.DaysNum * 24 + event.HoursNum).padStart(2, '0')}:${String(event.MinutesNum).padStart(2, '0')}:${String(event.SecondsNum).padStart(2, '0')}`}
                            </span>
                          </div>
                        </div>

                        <div className="absolute top-4 right-4 z-10">
                          <Badge
                            variant="default"
                            className="uppercase text-[11px]"
                            style={{ backgroundColor: statusColor, color: '#ffffff' }}
                            aria-label={`Event status: ${event.status}`}
                          >
                            {event.status}
                          </Badge>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                          <h3
                            className="text-base font-bold text-ko-text-primary mb-2 group-hover/event:text-ko-brand-primary transition-colors line-clamp-1"
                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                          >
                            {event.eventName}
                          </h3>
                          <p
                            className="text-sm text-ko-text-primary leading-relaxed line-clamp-2 mb-3"
                            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
                          >
                            {event.description}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-white/70 flex-wrap">
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Icon name="ti ti-calendar" size={12} className="flex-shrink-0" />
                              {event.dayName}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Icon name="ti ti-clock" size={12} className="flex-shrink-0" />
                              {event.startTime}
                            </span>
                            <span>•</span>
                            <span className="whitespace-nowrap">{event.durationMinutes} {t('home.events.minutes')}</span>
                          </div>

                          {hasMultipleEvents && (
                            <div className="flex items-center justify-center gap-1.5 mt-3">
                              {eventsState.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  type="button"
                                  onClick={(evt) => { evt.preventDefault(); handleDotClick(dotIndex, evt) }}
                                  className="p-2 -m-1"
                                  aria-label={`Go to event ${dotIndex + 1}`}
                                >
                                  <span className={cn(
                                    'block rounded-full transition-all duration-300',
                                    currentSlide === dotIndex ? 'w-6 h-2 bg-ko-brand-primary' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                                  )} />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {hasMultipleEvents && (
            <button
              type="button"
              onClick={() => handleSliderScroll('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ko-card/90 backdrop-blur-md border border-ko-border-primary flex items-center justify-center hover:bg-ko-brand-primary hover:border-ko-brand-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              aria-label="Next event"
            >
              <Icon name="ti ti-chevron-right" size={20} className="text-ko-brand-primary hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
