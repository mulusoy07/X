import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface ScrollButtonsWidgetProps {
  className?: string
  bottomOffset?: string
  rightOffset?: string
  topThreshold?: number
  bottomThreshold?: number
  position?: 'left' | 'right'
}

function GradientBorders() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    </>
  )
}

export function ScrollButtonsWidget({
  className,
  bottomOffset = 'bottom-6',
  rightOffset = 'right-6',
  topThreshold = 100,
  position = 'right',
}: ScrollButtonsWidgetProps) {
  const { t } = useTranslation()
  const [scrollPercent, setScrollPercent] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      
      setScrollPercent(Math.min(100, Math.max(0, percent)))
      setShowButton(scrollTop > topThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [topThreshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  // SVG circle parameters
  const size = 48
  const strokeWidth = 2.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  const isAtTop = scrollPercent < 5
  const direction: 'up' | 'down' = isAtTop ? 'down' : 'up'
  const label = direction === 'up'
    ? t('widgets.quick_actions.scroll_up')
    : t('widgets.quick_actions.scroll_down')

  return (
    <div
      className={cn(
        'fixed z-40',
        bottomOffset,
        rightOffset,
        showButton ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        'transition-all duration-300',
        className
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group relative">
            <button
              type="button"
              onClick={direction === 'up' ? scrollToTop : scrollToBottom}
              aria-label={label}
              className={cn(
                'relative w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ease-out',
                'bg-ko-widget-bg/50 border border-ko-border-primary hover:border-ko-brand-primary/50',
                'flex items-center justify-center',
                'shadow-lg hover:shadow-xl'
              )}
            >
              {/* SVG Progress Circle */}
              <svg
                className="absolute inset-0 -rotate-90"
                width={size}
                height={size}
              >
                {/* Background circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-ko-border-primary/30"
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="url(#scrollGradient)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-150"
                />
                <defs>
                  <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-ko-brand-primary" stopColor="currentColor" />
                    <stop offset="100%" className="text-ko-brand-secondary" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 bg-gradient-to-br from-ko-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              <span className={cn(
                'relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300',
                direction === 'up' ? 'group-hover:animate-bounce-up' : 'group-hover:animate-bounce-down'
              )}>
                <Icon
                  name={direction === 'up' ? 'ti ti-arrow-narrow-up-dashed' : 'ti ti-arrow-narrow-down-dashed'}
                  size={22}
                />
              </span>
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side={position === 'right' ? 'left' : 'right'}
          className="bg-ko-card/95 backdrop-blur-md border border-ko-border-primary text-ko-text-primary"
          arrowClassName="bg-ko-card/95 fill-ko-card/95"
        >
          <p className="text-sm font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
