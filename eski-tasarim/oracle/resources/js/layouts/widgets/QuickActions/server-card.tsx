import { useTranslation, useLayout } from '@/hooks'
import { Icon } from '@/components/shared/icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ServerInfo } from './types'

interface ServerCardProps {
  server: ServerInfo
  isSelected: boolean
  onSelect: () => void
}

function getCapacityColor(percentage: number): string {
  if (percentage < 50) return 'bg-green-500'
  if (percentage < 80) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function ServerCard({ server, isSelected, onSelect }: ServerCardProps) {
  const { t } = useTranslation()
  const layout = useLayout()

  const showServerStatus = layout?.config?.show_server_status ?? true
  const enableServerSelection = layout?.config?.enable_server_selection ?? true

  const isMaintenance = server.maintenance_mode
  const isGameServerOnline = server.status?.game_server?.is_active ?? false
  const isLoginServerOnline = server.status?.login_server?.is_active ?? false

  return (
    <div
      className={cn(
        'relative group transition-all duration-300',
        'border-2 rounded-xl overflow-hidden',
        isSelected && 'border-ko-brand-primary bg-ko-brand-primary/5',
        !isSelected && enableServerSelection && 'border-ko-border-primary hover:border-ko-brand-primary/40',
        !enableServerSelection && 'border-ko-border-primary opacity-60 cursor-not-allowed'
      )}
      onClick={enableServerSelection ? onSelect : undefined}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-ko-card/50 to-ko-card/80 rounded-l">
        <div
          className={cn('transition-all duration-700 relative', getCapacityColor(server.capacity_percentage))}
          style={{ height: `${server.capacity_percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none" />
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-1.5 right-1.5 z-10">
          <div className="w-1.5 h-1.5 bg-ko-brand-primary rounded-full" />
        </div>
      )}

      <div className="pl-4 pr-4 py-3">
        <div className="flex items-center gap-3 mb-2.5">
          <div className={cn(
            'w-8 h-8 bg-ko-card border rounded-lg flex items-center justify-center flex-shrink-0',
            isSelected ? 'border-ko-brand-primary' : 'border-ko-border-primary'
          )}>
            <Icon
              name="ti ti-server"
              className={cn('w-4 h-4', isSelected ? 'text-ko-brand-primary' : 'text-ko-text-muted')}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className={cn('text-xs font-semibold truncate', isSelected ? 'text-ko-brand-primary' : 'text-ko-text-primary')}>
              {server.server_name}
            </p>
            <p className="text-[10px] text-ko-text-muted truncate">{server.server_description}</p>
          </div>

          <div className={cn(
            'px-2 py-1 rounded text-[10px] font-semibold flex-shrink-0 border',
            isSelected
              ? 'bg-ko-brand-primary/10 border-ko-brand-primary text-ko-brand-primary'
              : 'bg-ko-card border-ko-border-primary text-ko-text-muted'
          )}>
            {server.capacity_percentage}%
          </div>
        </div>

        {showServerStatus && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn(
              'gap-1 font-medium text-[10px] px-2 py-1',
              isMaintenance
                ? 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20'
                : isGameServerOnline
                  ? 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20'
                  : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
            )}>
              <Icon
                name={isMaintenance ? 'ti ti-tool' : isGameServerOnline ? 'ti ti-wifi' : 'ti ti-wifi-off'}
                className="size-2.5"
              />
              {t('widgets.server_selector.game')}
            </Badge>

            <Badge variant="outline" className={cn(
              'gap-1 font-medium text-[10px] px-2 py-1',
              isMaintenance
                ? 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20'
                : isLoginServerOnline
                  ? 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20'
                  : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
            )}>
              <Icon
                name={isMaintenance ? 'ti ti-tool' : isLoginServerOnline ? 'ti ti-wifi' : 'ti ti-wifi-off'}
                className="size-2.5"
              />
              {t('widgets.server_selector.login')}
            </Badge>
          </div>
        )}
      </div>

      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}
