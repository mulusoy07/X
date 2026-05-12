import { Icon } from '@/components/shared/icon'

interface GameFeedHeaderProps {
  title: string
  subtitle: string
  liveText: string
  isLive?: boolean
}

export function GameFeedHeader({ title, subtitle, liveText, isLive = true }: GameFeedHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-ko-brand-primary/20 to-ko-brand-secondary/20 border-b border-ko-border-primary px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary flex items-center justify-center">
            <Icon name="ti ti-rss" className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ko-text-primary">{title}</h3>
            <p className="text-[10px] text-ko-text-muted">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={isLive
            ? 'w-2 h-2 bg-green-500 rounded-full'
            : 'w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500'
          } />
          <span className={isLive ? 'text-[10px] text-ko-text-muted font-medium' : 'text-[10px] text-red-400 font-medium'}>
            {liveText}
          </span>
        </div>
      </div>
    </div>
  )
}
