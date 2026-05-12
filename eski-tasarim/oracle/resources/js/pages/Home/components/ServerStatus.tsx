import { useLayout } from '@/hooks'
import { useServer } from '@/contexts/server-context'
import { Icon } from '@/components/shared/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StatusBadgeProps {
  isOnline: boolean
  label: string
  responseTime?: string
  isMaintenance: boolean
  statusText: { maintenance: string; online: string; offline: string }
}

function StatusBadge({ isOnline, label, responseTime, isMaintenance, statusText }: StatusBadgeProps) {
  const iconName = isMaintenance ? 'ti ti-tool' : isOnline ? 'ti ti-wifi' : 'ti ti-wifi-off'
  const iconColor = isMaintenance ? 'text-orange-500' : isOnline ? 'text-green-500' : 'text-red-500'
  const sonarColor = isMaintenance ? 'bg-orange-500/30' : isOnline ? 'bg-green-500/30' : 'bg-red-500/30'
  const bgColor = isMaintenance ? 'bg-orange-500/10' : isOnline ? 'bg-green-500/10' : 'bg-red-500/10'
  const borderColor = isMaintenance ? 'border-orange-500/30' : isOnline ? 'border-green-500/30' : 'border-red-500/30'
  const shimmerColor = isMaintenance ? 'via-orange-500/20' : isOnline ? 'via-green-500/20' : 'via-red-500/20'

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 border relative overflow-hidden transition-all duration-500 ${bgColor} ${borderColor}`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-shimmer pointer-events-none ${shimmerColor}`} />
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        <Icon name={iconName} size={16} className={iconColor} />
      </div>
      <div className="flex flex-col gap-0.5 relative z-10 flex-1 min-w-0">
        <span className="text-[11px] text-ko-text-secondary font-medium">{label}</span>
        <div className="h-[18px] flex items-center justify-between gap-2">
          <span className={`text-xs font-bold transition-colors duration-500 ${iconColor}`}>
            {isMaintenance ? statusText.maintenance : isOnline ? statusText.online : statusText.offline}
          </span>
          {isOnline && !isMaintenance && responseTime && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-ko-card/50 border border-ko-border-primary/50">
              <Icon name="ti ti-activity" size={10} className="text-green-500 flex-shrink-0" />
              <span className="text-[9px] font-mono font-bold text-green-500">{responseTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ServerStatus() {
  const { t } = useTranslation()
  const layout = useLayout()
  const enableServerList = layout?.config?.enable_server_list ?? true
  const showServerStatus = layout?.config?.show_server_status ?? true
  const enableServerSelection = layout?.config?.enable_server_selection ?? true

  const { servers, selectedServerNo, selectServer } = useServer()

  const statusText = {
    maintenance: t('home.server_status.maintenance'),
    online: t('home.server_status.online'),
    offline: t('home.server_status.offline'),
  }

  const handleServerChange = (serverNo: string) => {
    if (serverNo === selectedServerNo) return
    selectServer(serverNo)
  }

  if (!servers?.length) return null
  if (layout && !enableServerList) return null

  const skeletonLabels = [t('home.server_status.game_server'), t('home.server_status.login_server')]

  if (!layout) {
    return (
      <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="p-4 space-y-3">
          <div className="bg-ko-widget-bg/50 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-ko-border-primary">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-ko-card flex items-center justify-center flex-shrink-0">
                <Icon name="ti ti-server" size={24} className="text-ko-brand-primary" />
              </div>
              <div className="flex-1 h-10 px-3 bg-ko-card border border-ko-border-primary text-ko-text-primary text-sm font-semibold rounded-lg overflow-hidden flex items-center gap-1">
                <div className="h-4 w-16 bg-ko-widget-bg/50 rounded animate-pulse" />
                <div className="h-3 w-24 bg-ko-widget-bg/30 rounded animate-pulse" />
              </div>
            </div>
            {showServerStatus && (
              <div className="flex gap-2 pt-2">
                {skeletonLabels.map((label, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 border relative overflow-hidden bg-ko-widget-bg/30 border-ko-border-primary">
                    <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 bg-ko-text-muted/30 rounded animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-[11px] text-ko-text-secondary font-medium">{label}</span>
                      <div className="h-[18px] flex items-center">
                        <div className="h-3 w-16 bg-ko-text-muted/30 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ko-text-muted font-semibold">{t('home.server_status.capacity')}</span>
                <div className="h-3.5 w-8 bg-ko-brand-primary/30 rounded animate-pulse" />
              </div>
              <div className="h-2 bg-ko-card rounded-full overflow-hidden border border-ko-border-primary">
                <div className="h-full w-1/2 bg-ko-text-muted/30 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <Link
            href={route('public.downloads.index')}
            className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg active:scale-[0.98] hover:shadow-lg hover:scale-105 rounded-lg"
          >
            <Icon name="ti ti-download" size={18} />
            {t('home.server_status.download')}
          </Link>
        </div>
      </div>
    )
  }

  const currentServer = servers.find(s => s.server_no === selectedServerNo) || servers[0]
  const isMaintenance = currentServer.maintenance_mode
  const gameServerOnline = currentServer.status?.game_server.is_active ?? false
  const loginServerOnline = currentServer.status?.login_server.is_active ?? false
  const gameServerResponseTime = currentServer.status?.game_server.response_time
    ? `${currentServer.status.game_server.response_time}ms`
    : undefined
  const loginServerResponseTime = currentServer.status?.login_server.response_time
    ? `${currentServer.status.login_server.response_time}ms`
    : undefined

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
      <div className="p-4 space-y-3">
        <div className="bg-ko-widget-bg/50 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-ko-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-ko-card flex items-center justify-center flex-shrink-0">
              <Icon name="ti ti-server" size={24} className="text-ko-brand-primary" />
            </div>
            <Select value={selectedServerNo || undefined} onValueChange={handleServerChange} disabled={!enableServerSelection}>
              <SelectTrigger
                disabled={!enableServerSelection}
                aria-label={t('home.server_status.select_server')}
                className="flex-1 h-10 px-3 bg-ko-card border border-ko-border-primary text-ko-text-primary text-sm font-semibold hover:!bg-ko-card-hover hover:!border-ko-brand-primary/50 focus-visible:!border-ko-brand-primary/50 focus-visible:!ring-0 active:!border-ko-brand-primary transition-all rounded-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="!bg-ko-card !border !border-ko-border-secondary !shadow-lg !backdrop-blur-md !p-1">
                {servers.map((server) => (
                  <SelectItem
                    key={server.server_no}
                    value={server.server_no}
                    className="!text-ko-text-secondary [&_*]:!text-ko-text-secondary !cursor-pointer !transition-[color,background] !duration-200 !py-2.5 !px-3 !rounded-md !shadow-xs hover:!bg-ko-brand-primary/5 hover:!text-ko-text-secondary hover:[&_*]:!text-ko-text-secondary focus:!bg-ko-brand-primary/5 focus:!text-ko-text-secondary focus:[&_*]:!text-ko-text-secondary data-[state=checked]:!bg-gradient-to-r data-[state=checked]:!from-ko-brand-primary/40 data-[state=checked]:!to-ko-brand-primary/20 data-[state=checked]:!text-ko-brand-primary data-[state=checked]:[&_*]:!text-ko-brand-primary data-[state=checked]:!font-bold data-[state=checked]:hover:!from-ko-brand-primary/40 data-[state=checked]:hover:!to-ko-brand-primary/20 data-[state=checked]:hover:!text-ko-brand-primary data-[state=checked]:hover:[&_*]:!text-ko-brand-primary"
                  >
                    <span className="font-semibold">{server.server_name}</span>
                    <span className="text-xs opacity-60"> - {server.server_description}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showServerStatus && (
            <div className="flex gap-2 pt-2">
              <StatusBadge isOnline={gameServerOnline} label={t('home.server_status.game_server')} responseTime={gameServerResponseTime} isMaintenance={isMaintenance} statusText={statusText} />
              <StatusBadge isOnline={loginServerOnline} label={t('home.server_status.login_server')} responseTime={loginServerResponseTime} isMaintenance={isMaintenance} statusText={statusText} />
            </div>
          )}

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ko-text-muted font-semibold">{t('home.server_status.capacity')}</span>
              <span className="font-bold text-ko-brand-primary">%{currentServer.capacity_percentage.toFixed(0)}</span>
            </div>
            <div className="h-2 bg-ko-card rounded-full overflow-hidden border border-ko-border-primary">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${currentServer.capacity_percentage}%`,
                  background: 'linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)',
                  backgroundSize: '200%',
                  backgroundPosition: `${currentServer.capacity_percentage / 2}%`
                }}
              />
            </div>
          </div>
        </div>

        <Link
          href={route('public.downloads.index')}
          className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg active:scale-[0.98] hover:shadow-lg hover:scale-105 rounded-lg"
        >
          <Icon name="ti ti-download" size={18} />
          {t('home.server_status.download')}
        </Link>
      </div>
    </div>
  )
}
