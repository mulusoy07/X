import { useTranslation, useLayout } from '@/hooks'
import { useServer } from '@/contexts/server-context'
import { useGameFeed } from '@/layouts/widgets/GameFeed/use-game-feed'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/shared/icon'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import * as SheetPrimitive from 'vaul'
import { ServerCard } from './server-card'
import { getMessageStyles, getCategoryByType } from '@/layouts/widgets/GameFeed/utils'
import type { ServerInfo, SocialLink } from './types'
import type { MessageFilter } from '@/layouts/widgets/GameFeed/types'

interface QuickActionsWidgetProps {
  variant?: 'sidebar' | 'menu' | 'bottom-nav'
  className?: string
  position?: 'left' | 'right'
}

export function QuickActionsWidget({
  variant = 'sidebar',
  className,
  position = 'right',
}: QuickActionsWidgetProps) {
  const { t } = useTranslation()
  const layout = useLayout()
  const { servers, selectedServerNo, selectServer } = useServer()

  const socialLinks: SocialLink[] = layout?.social_links || []
  const enableServerList = layout?.config?.enable_server_list ?? true
  const showServers = servers && servers.length > 0 && enableServerList

  if (variant === 'menu') {
    return (
      <div className={cn('space-y-4', className)}>
        {showServers && (
          <>
            <MenuHeader title={t('widgets.server_selector.title')} />
            <div className="space-y-2">
              {servers.map((server) => (
                <ServerCard
                  key={server.server_no}
                  server={server}
                  isSelected={server.server_no === selectedServerNo}
                  onSelect={() => selectServer(server.server_no)}
                />
              ))}
            </div>
          </>
        )}

        {socialLinks.length > 0 && (
          <>
            <MenuHeader title={t('widgets.quick_actions.social_media_title')} />
            <div className="grid grid-cols-5 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-ko-widget-bg/50 backdrop-blur-sm border border-ko-border-primary hover:border-ko-brand-primary/50 rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} className="text-ko-text-muted" />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'bottom-nav') {
    const bottomNavRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const updateHeight = () => {
        if (bottomNavRef.current) {
          const height = bottomNavRef.current.offsetHeight
          document.documentElement.style.setProperty('--bottom-nav-height', `${height}px`)
        }
      }

      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
    }, [])

    return (
      <div ref={bottomNavRef} className={cn('xl:hidden fixed bottom-0 left-0 right-0 z-40', className)}>
        <div className="relative bg-ko-card/95 backdrop-blur-lg pb-safe">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
          <div className="flex items-center justify-around px-2 pt-3 pb-2">
            <BottomNavItem
              icon="ti ti-home"
              label={t('widgets.quick_actions.home')}
              route={route('public.home')}
            />

            {showServers && (
              <BottomNavServerItem
                servers={servers}
                selectedServerNo={selectedServerNo}
                onSelectServer={selectServer}
              />
            )}

            {layout?.config?.game_feed_enabled && (
              <BottomNavFeedItem />
            )}

            <BottomNavSocialItem socialLinks={socialLinks} />

            <BottomNavItem
              icon="ti ti-user"
              label={t('widgets.quick_actions.profile')}
              route={route('public.home')}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('hidden xl:block', className)}>
      <div className="relative bg-ko-card/90 backdrop-blur-md border border-ko-border-primary rounded-3xl p-3 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-ko-brand-primary/60 to-transparent" />

        <div className="flex flex-col gap-3">
          <ActionButton
            icon="ti ti-user"
            label={t('widgets.quick_actions.profile')}
            route={route('public.home')}
            position={position}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-ko-border-primary to-transparent my-1" />

          {socialLinks.map((social) => (
            <ActionButton
              key={social.name}
              icon={social.icon}
              label={social.name}
              href={social.url}
              position={position}
            />
          ))}

          {socialLinks.length > 0 && (
            <div className="h-px bg-gradient-to-r from-transparent via-ko-border-primary to-transparent my-1" />
          )}

          {showServers && (
            <HoverCard openDelay={0} closeDelay={150}>
              <HoverCardTrigger asChild>
                <div className="relative">
                  <button
                    type="button"
                    className="group relative w-12 h-12 rounded-2xl bg-ko-widget-bg/50 border border-ko-border-primary hover:border-ko-brand-primary/50 flex items-center justify-center cursor-pointer transition-all duration-300 ease-out overflow-hidden"
                    aria-label={t('widgets.server_selector.title')}
                  >
                    <GradientBorders />
                    <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
                      <Icon name="ti ti-server" size={22} />
                    </span>
                  </button>
                  {selectedServerNo && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full z-10" />
                  )}
                </div>
              </HoverCardTrigger>

              <HoverCardContent
                side={position === 'right' ? 'right' : 'left'}
                align="center"
                sideOffset={17}
                className="w-80 p-0 border-ko-border-primary bg-ko-card/95 backdrop-blur-md shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60 z-10" />
                  <div className="relative px-4 py-3 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-ko-brand-primary rounded-full" />
                      <h3 className="text-xs font-bold text-ko-text-primary uppercase tracking-wider">
                        {t('widgets.server_selector.title')}
                      </h3>
                    </div>
                  </div>
                  <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto ko-scrollbar">
                    {servers.map((server) => (
                      <ServerCard
                        key={server.server_no}
                        server={server}
                        isSelected={server.server_no === selectedServerNo}
                        onSelect={() => selectServer(server.server_no)}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60 z-10" />
                </div>
              </HoverCardContent>
            </HoverCard>
          )}

          {showServers && (
            <div className="h-px bg-gradient-to-r from-transparent via-ko-border-primary to-transparent my-1" />
          )}

          <ActionButton icon="ti ti-messages" label={t('widgets.quick_actions.forum')} route={route('api.ko-forum-v2.index')} position={position} />
          <ActionButton icon="ti ti-bug" label={t('widgets.quick_actions.bug_report')} route={route('public.bug-tracker.index')} position={position} />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-ko-brand-primary/60 to-transparent" />
      </div>
    </div>
  )
}

interface ActionButtonProps {
  icon: string
  label: string
  href?: string
  route?: string
  position?: 'left' | 'right'
  onClick?: () => void
}

function ActionButton({
  icon,
  label,
  href,
  route,
  position = 'right',
  onClick,
}: ActionButtonProps) {
  const buttonInnerContent = (
    <div className="relative w-12 h-12 rounded-2xl bg-ko-widget-bg/50 border border-ko-border-primary hover:border-ko-brand-primary/50 flex items-center justify-center cursor-pointer transition-all duration-300 ease-out overflow-hidden">
      <GradientBorders />
      <GradientBackground />
      <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
        <Icon name={icon} size={22} />
      </span>
    </div>
  )

  const buttonContent = (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="group relative">{buttonInnerContent}</div>
      </TooltipTrigger>
      <TooltipContent
        side={position === 'right' ? 'left' : 'right'}
        className="bg-ko-card/95 backdrop-blur-md border border-ko-border-primary text-ko-text-primary"
      >
        <p className="text-sm font-medium">{label}</p>
      </TooltipContent>
    </Tooltip>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{buttonContent}</a>
  }
  if (route) {
    return <a href={route} aria-label={label}>{buttonContent}</a>
  }
  return <button type="button" onClick={onClick} aria-label={label}>{buttonContent}</button>
}

function MenuHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="w-1 h-4 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
      <h3 className="text-xs font-bold text-ko-text-primary uppercase tracking-wider">{title}</h3>
    </div>
  )
}

function GradientBorders() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    </>
  )
}

function GradientBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-ko-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  )
}

interface BottomNavItemProps {
  icon: string
  label: string
  route?: string
  href?: string
  isActive?: boolean
  onClick?: () => void
}

function BottomNavItem({ icon, label, route, href, isActive = false, onClick }: BottomNavItemProps) {
  const content = (
    <div className="flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95" onClick={onClick}>
      <div className={cn(
        'group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out overflow-hidden',
        isActive ? 'bg-ko-brand-primary' : 'bg-ko-widget-bg/50 border border-ko-border-primary'
      )}>
        {!isActive && <GradientBorders />}
        {!isActive && <GradientBackground />}
        <span className={cn('relative z-10 transition-colors duration-300', isActive ? 'text-white' : 'text-ko-text-muted group-hover:text-ko-brand-primary')}>
          <Icon name={icon} size={24} />
        </span>
      </div>
      <span className={cn('font-semibold whitespace-nowrap text-[11px]', isActive ? 'text-ko-brand-primary' : 'text-ko-text-muted')}>
        {label}
      </span>
    </div>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{content}</a>
  }
  if (route) {
    return <a href={route}>{content}</a>
  }
  return content
}

function BottomNavSocialItem({ socialLinks }: { socialLinks: SocialLink[] }) {
  const { t } = useTranslation()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95">
          <div className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary">
            <GradientBorders />
            <GradientBackground />
            <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
              <Icon name="ti ti-brand-instagram" size={24} />
            </span>
          </div>
          <span className="font-semibold text-ko-text-muted text-[11px]">{t('widgets.quick_actions.social')}</span>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" showCloseButton={false} className="!p-0 !outline-none focus:!outline-none focus:!ring-0 !rounded-t-3xl !rounded-b-none bg-ko-card/95 backdrop-blur-lg !border-t-2 !border-x-0 !border-b-0 !border-ko-border-primary shadow-2xl pb-safe max-h-[85vh]">
        <div className="h-full overflow-y-auto">
          <div className="flex justify-center pt-2 pb-3">
            <SheetPrimitive.Handle className="!w-12 !h-1 !bg-ko-text-primary/30 !rounded-full" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-ko-border-primary">
            <SheetTitle className="text-sm font-bold text-ko-text-primary uppercase tracking-wider text-center">{t('widgets.quick_actions.social_media_title')}</SheetTitle>
          </SheetHeader>
          <div className="p-6 grid grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-ko-widget-bg/50 border border-ko-border-primary flex items-center justify-center transition-all duration-200 group-hover:border-ko-brand-primary/50 group-hover:bg-ko-brand-primary/10">
                  <Icon name={social.icon} size={24} className="text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-200" />
                </div>
                <span className="text-[10px] font-medium text-ko-text-muted text-center">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface BottomNavServerItemProps {
  servers: ServerInfo[]
  selectedServerNo: string | null
  onSelectServer: (serverNo: string) => void
}

function BottomNavServerItem({ servers, selectedServerNo, onSelectServer }: BottomNavServerItemProps) {
  const { t } = useTranslation()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95">
          <div className="relative">
            <div className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary">
              <GradientBorders />
              <GradientBackground />
              <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
                <Icon name="ti ti-server" size={24} />
              </span>
            </div>
            {selectedServerNo && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 z-10" />
            )}
          </div>
          <span className="font-semibold text-ko-text-muted text-[11px]">{t('widgets.quick_actions.server')}</span>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" showCloseButton={false} className="!p-0 !outline-none focus:!outline-none focus:!ring-0 !rounded-t-3xl !rounded-b-none bg-ko-card/95 backdrop-blur-lg !border-t-2 !border-x-0 !border-b-0 !border-ko-border-primary shadow-2xl pb-safe max-h-[85vh]">
        <div className="h-full overflow-y-auto">
          <div className="flex justify-center pt-2 pb-3">
            <SheetPrimitive.Handle className="!w-12 !h-1 !bg-ko-text-primary/30 !rounded-full" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-ko-border-primary">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-ko-brand-primary rounded-full" />
              <SheetTitle className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
                {t('widgets.server_selector.title')}
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="p-4 space-y-2">
            {servers.map((server) => (
              <ServerCard
                key={server.server_no}
                server={server}
                isSelected={server.server_no === selectedServerNo}
                onSelect={() => onSelectServer(server.server_no)}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function BottomNavFeedItem() {
  const { t } = useTranslation()
  const { categories, messages, isLoading } = useGameFeed()
  const [filter, setFilter] = useState<MessageFilter>('all')

  const filteredMessages = filter === 'all'
    ? messages
    : messages.filter(msg => msg.type === filter)

  if (!isLoading && categories.length === 0) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95">
          <div className="relative">
            <div className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary">
              <GradientBorders />
              <GradientBackground />
              <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
                <Icon name="ti ti-rss" size={24} />
              </span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 z-10" />
          </div>
          <span className="font-semibold text-ko-text-muted text-[11px]">{t('widgets.game_feed.title')}</span>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" showCloseButton={false} className="!p-0 !outline-none focus:!outline-none focus:!ring-0 !rounded-t-3xl !rounded-b-none bg-ko-card/95 backdrop-blur-lg !border-t-2 !border-x-0 !border-b-0 !border-ko-border-primary shadow-2xl pb-safe max-h-[85vh]">
        <div className="h-full overflow-y-auto">
          <div className="flex justify-center pt-2 pb-3">
            <SheetPrimitive.Handle className="!w-12 !h-1 !bg-ko-text-primary/30 !rounded-full" />
          </div>

          <SheetHeader className="px-4 pb-3 border-b border-ko-border-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary flex items-center justify-center">
                  <Icon name="ti ti-rss" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <SheetTitle className="text-sm font-bold text-ko-text-primary">{t('widgets.game_feed.title')}</SheetTitle>
                  <p className="text-[10px] text-ko-text-muted">{t('widgets.game_feed.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={messages.length > 0
                  ? 'w-2 h-2 bg-green-500 rounded-full'
                  : 'w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500'
                } />
                <span className={messages.length > 0 ? 'text-[10px] text-ko-text-muted font-medium' : 'text-[10px] text-red-400 font-medium'}>
                  {t('widgets.game_feed.live')}
                </span>
              </div>
            </div>
          </SheetHeader>

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
                      'flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-200 border',
                      isActive
                        ? 'bg-ko-brand-primary text-ko-text-dark border-ko-brand-primary shadow-lg'
                        : 'bg-ko-widget-bg text-ko-text-muted border-ko-border-primary hover:text-ko-text-primary hover:border-ko-border-primary/50'
                    )}
                  >
                    <Icon name={category.icon} className="w-3 h-3" />
                    <span>{category.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="ko-scrollbar px-3 py-2 space-y-1.5 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg border border-ko-border-primary/20 animate-pulse">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-ko-border-primary/30 bg-ko-text-muted/10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="h-4 w-16 bg-ko-text-muted/20 rounded" />
                      <div className="h-3 w-12 bg-ko-text-muted/10 rounded flex-shrink-0" />
                    </div>
                    <div className="h-[18px] w-full bg-ko-text-muted/10 rounded" />
                  </div>
                </div>
              ))
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="ti ti-rss" className="w-8 h-8 mx-auto text-ko-text-muted/50 mb-2" />
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
