import { useTranslation, useLayout } from '@/hooks'
import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

const COOKIE_NAME = 'cookie_consent'
const MAX_AGE_YEAR = 365 * 24 * 60 * 60
const MAX_AGE_DAY = 24 * 60 * 60

function getCookieValue(name: string): string | null {
  const match = document.cookie.match(`(?:^|;)\\s*${name}=([^;]*)`)
  return match ? decodeURIComponent(match[1]) : null
}

export function CookieConsent() {
  const { t } = useTranslation()
  const layout = useLayout()
  const cookieConsent = layout?.cookie_consent
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const value = getCookieValue(COOKIE_NAME)
    if (!value && cookieConsent) {
      setIsVisible(true)
    }
  }, [cookieConsent])

  const handleAccept = () => {
    document.cookie = `${COOKIE_NAME}=accepted; max-age=${MAX_AGE_YEAR}; path=/`
    setIsVisible(false)
  }

  const handleReject = () => {
    document.cookie = `${COOKIE_NAME}=rejected; max-age=${MAX_AGE_DAY}; path=/`
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!cookieConsent || !isVisible) return null

  const {
    style,
    message,
    button_text,
    learn_more_url,
    learn_more_text,
    background_color,
    text_color,
    max_width,
    show_reject_button,
  } = cookieConsent

  const isFullWidth = style === 'full-width'

  return (
    <div
      className={cn(
        'z-45',
        'fixed bottom-4 left-4 right-4 max-w-[calc(100vw-2rem)]',
        'sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-none'
      )}
      style={!isFullWidth && max_width ? { maxWidth: `${max_width}px`, width: 'fit-content' } : undefined}
    >
      <div
        className="relative overflow-hidden shadow-2xl animate-slide-up rounded-2xl border border-ko-border-primary backdrop-blur-md hover:border-ko-brand-primary/30 transition-all duration-500"
        style={{ backgroundColor: background_color || 'rgba(17, 24, 39, 0.95)' }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-ko-card border border-ko-border-primary flex items-center justify-center">
                <Icon name="ti ti-cookie" size={20} className="text-ko-brand-primary sm:hidden" />
                <Icon name="ti ti-cookie" size={16} className="text-ko-brand-primary hidden sm:block" />
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm leading-relaxed flex-1" style={{ color: text_color || '#ffffff' }}>
                {message}
                {learn_more_url && learn_more_text && (
                  <>
                    {' '}
                    <Link
                      href={learn_more_url}
                      className="text-ko-brand-primary hover:text-ko-brand-secondary underline transition-colors font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {learn_more_text}
                    </Link>
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 sm:px-2.5 sm:py-1.5 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-ko-brand-primary/20 active:scale-95 whitespace-nowrap text-sm"
                >
                  <Icon name="ti ti-check" size={14} />
                  <span>{button_text || t('widgets.cookie_consent.accept')}</span>
                </button>

                {show_reject_button && (
                  <button
                    type="button"
                    onClick={handleReject}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 sm:px-2.5 sm:py-1.5 bg-ko-card border border-ko-border-primary text-ko-text-muted rounded-lg font-semibold transition-all duration-300 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 active:scale-95 whitespace-nowrap text-sm"
                  >
                    <Icon name="ti ti-x" size={14} />
                    <span>{t('widgets.cookie_consent.reject')}</span>
                  </button>
                )}

              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3 right-3 sm:static sm:top-0 sm:right-0 w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-ko-card border border-ko-border-primary flex items-center justify-center text-ko-text-muted hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
              aria-label={t('widgets.cookie_consent.close')}
            >
              <Icon name="ti ti-x" size={14} className="sm:hidden" />
              <Icon name="ti ti-x" size={12} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
