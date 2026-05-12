import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { type MessageFilter } from './types'
import { GameFeedSkeleton } from './skeleton'
import { CollapseButton } from './collapse-button'
import { GameFeedHeader } from './header'
import { useGameFeed } from './use-game-feed'
import { getMessageStyles, getCategoryByType } from './utils'

interface GameFeedProps {
  position?: 'left' | 'right'
  defaultOpen?: boolean
}

export function GameFeed({ position = 'left', defaultOpen = true }: GameFeedProps) {
  const { t } = useTranslation()
  const { categories, messages, isLoading, error } = useGameFeed()
  const [filter, setFilter] = useState<MessageFilter>('all')
  const [isCollapsed, setIsCollapsed] = useState(!defaultOpen)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCollapsed && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, filter, isCollapsed])

  const activeCategory = categories.find(c => c.key === filter)
  const filteredMessages = filter === 'all'
    ? messages
    : messages.filter(msg => msg.type === filter)

  if (isCollapsed) {
    return (
      <div className={cn('fixed z-40 transition-all duration-300', position === 'left' ? 'left-4 bottom-4' : 'right-4 bottom-4')}>
        <CollapseButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(false)}
          ariaLabel={t('widgets.game_feed.open')}
        />
      </div>
    )
  }

  if (isLoading) {
    return <GameFeedSkeleton position={position} />
  }

  if (error) {
    return (
      <div className={cn('fixed z-40 w-96 transition-all duration-300', position === 'left' ? 'left-4 bottom-4' : 'right-4 bottom-4')}>
        <div className="bg-ko-widget-bg/95 backdrop-blur-md border border-ko-border-primary rounded-2xl shadow-2xl overflow-hidden">
          <GameFeedHeader
            title={t('widgets.game_feed.title')}
            subtitle={t('widgets.game_feed.subtitle')}
            liveText={t('widgets.game_feed.live')}
            isLive={false}
          />
          <div className="px-4 py-8 text-center">
            <Icon name="ti ti-wifi-off" className="w-8 h-8 mx-auto text-red-400/50 mb-2" />
            <p className="text-xs text-ko-text-muted">{t(error)}</p>
          </div>
          <div className="border-t border-ko-border-primary px-4 py-2 bg-ko-widget-bg/50 flex justify-end">
            <CollapseButton
              isCollapsed={false}
              onToggle={() => setIsCollapsed(true)}
              ariaLabel={t('widgets.game_feed.close')}
            />
          </div>
        </div>
      </div>
    )
  }

  if (!categories.length) {
    return null
  }

  return (
    <div className={cn('fixed z-40 w-96 transition-all duration-300', position === 'left' ? 'left-4 bottom-4' : 'right-4 bottom-4')}>
      <div className="bg-ko-widget-bg/95 backdrop-blur-md border border-ko-border-primary rounded-2xl shadow-2xl overflow-hidden">
        <GameFeedHeader
          title={t('widgets.game_feed.title')}
          subtitle={t('widgets.game_feed.subtitle')}
          liveText={t('widgets.game_feed.live')}
          isLive={messages.length > 0}
        />

        <div className="px-4 py-4 border-b border-ko-border-primary bg-gradient-to-r from-ko-brand-primary/20 to-ko-brand-secondary/20">
          <div className="flex items-center gap-1">
            {categories.map((category) => {
              const isActive = filter === category.key
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setFilter(category.key)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 border',
                    isActive
                      ? 'bg-ko-brand-primary text-ko-text-dark border-ko-brand-primary shadow-lg'
                      : 'bg-ko-widget-bg text-ko-text-muted border-ko-border-primary hover:text-ko-text-primary hover:border-ko-border-primary/50'
                  )}
                >
                  <Icon name={category.icon} className="w-3.5 h-3.5" />
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          ref={containerRef}
          className="ko-scrollbar px-3 py-2 space-y-1.5 max-h-[400px] overflow-y-auto"
        >
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8">
              <Icon name={activeCategory?.icon || 'ti ti-rss'} className="w-8 h-8 mx-auto text-ko-text-muted/50 mb-2" />
              <p className="text-xs text-ko-text-muted">{t('widgets.game_feed.no_messages')}</p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const category = getCategoryByType(categories, msg.type)
              const styles = getMessageStyles(category?.color || 'gray')
              return (
                <div
                  key={msg.id}
                  className={cn('group relative flex items-start gap-2 p-2 rounded-lg border transition-all duration-200 animate-fade-in', styles.border)}
                >
                  <div className={cn('flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center', styles.icon)}>
                    <Icon name={category?.icon || 'ti ti-rss'} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className={cn('text-[10px] font-semibold uppercase tracking-wide', styles.title)}>
                        {category?.label || msg.type}
                      </span>
                      <span className="text-[9px] text-ko-text-muted/70 flex-shrink-0">
                        {msg.time_ago}
                      </span>
                    </div>
                    <p className="text-xs text-ko-text-secondary leading-snug">
                      {msg.message}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="border-t border-ko-border-primary px-4 py-2 bg-ko-widget-bg/50 flex justify-end">
          <CollapseButton
            isCollapsed={false}
            onToggle={() => setIsCollapsed(true)}
            ariaLabel={t('widgets.game_feed.close')}
          />
        </div>
      </div>
    </div>
  )
}
