import { cn } from '@/lib/utils'
import { GameFeedHeader } from './header'

interface GameFeedSkeletonProps {
  position?: 'left' | 'right'
}

export function GameFeedSkeleton({ position = 'left' }: GameFeedSkeletonProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'fixed z-40 w-96 transition-all duration-300',
        position === 'left' ? 'left-4 bottom-4' : 'right-4 bottom-4'
      )}
    >
      <div className="bg-ko-widget-bg/95 backdrop-blur-md border border-ko-border-primary rounded-2xl shadow-2xl overflow-hidden">
        <GameFeedHeader
          title={t('widgets.game_feed.title')}
          subtitle={t('widgets.game_feed.subtitle')}
          liveText={t('widgets.game_feed.live')}
        />

        <div className="px-4 py-4 border-b border-ko-border-primary bg-gradient-to-r from-ko-brand-primary/20 to-ko-brand-secondary/20">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-1 h-8 bg-ko-widget-bg border border-ko-border-primary rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="px-3 py-2 space-y-1.5 max-h-[400px] overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2 rounded-lg border border-ko-border-primary/20 animate-pulse"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-ko-border-primary/30 bg-ko-text-muted/10" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="h-4 w-16 bg-ko-text-muted/20 rounded" />
                  <div className="h-3 w-12 bg-ko-text-muted/10 rounded flex-shrink-0" />
                </div>
                <div className="h-[18px] w-full bg-ko-text-muted/10 rounded" />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-ko-border-primary px-4 py-2 bg-ko-widget-bg/50 flex justify-end">
          <div className="w-12 h-12 rounded-2xl bg-ko-widget-bg/50 border border-ko-border-primary animate-pulse" />
        </div>
      </div>
    </div>
  )
}
