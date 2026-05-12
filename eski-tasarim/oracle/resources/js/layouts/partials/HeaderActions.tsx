import type { PageProps } from '@/types/inertia'
import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { languages, locales, type Locale } from '@/lib/i18n-config'
import { GuestModal } from '@/pages/Guest/components'

const LOCALE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60
const dropdownStyle = 'bg-ko-card border border-ko-border-primary rounded-xl shadow-2xl overflow-hidden'

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return { isOpen, setIsOpen, ref }
}

export function HeaderActions() {
  const { t } = useTranslation()
  const { auth, app } = usePage<PageProps>().props
  const currentLocale = (app?.locale || 'tr') as Locale
  const user = auth?.user

  const lang = useDropdown()
  const userMenu = useDropdown()
  const [showGuestModal, setShowGuestModal] = useState(false)

  const handleLanguageChange = (newLocale: Locale) => {
    lang.setIsOpen(false)
    if (newLocale === currentLocale) return
    document.cookie = `locale=${newLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`
    router.visit(window.location.href, { preserveState: false, preserveScroll: false })
  }

  const handleLogout = () => {
    userMenu.setIsOpen(false)
    router.post(route('public.auth.logout'))
  }

  return (
    <div className="flex items-center bg-ko-widget-bg/30 rounded-xl border border-ko-border-primary p-1 gap-1">

      {/* Language Selector */}
      <div className="relative" ref={lang.ref}>
        <button
          type="button"
          aria-label={t('common.header.language_selector')}
          aria-expanded={lang.isOpen}
          onClick={() => lang.setIsOpen(o => !o)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 outline-none',
            'text-ko-text-secondary hover:text-ko-text-primary hover:bg-ko-widget-bg',
            lang.isOpen && 'bg-ko-widget-bg text-ko-text-primary',
          )}
        >
          <span
            className="w-5 h-3.5 rounded-[3px] overflow-hidden [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: languages[currentLocale].flag }}
          />
          <span className="text-xs font-medium uppercase hidden sm:inline">{currentLocale}</span>
          <Icon name="ti ti-chevron-down" className={cn('w-3 h-3 transition-transform duration-200', lang.isOpen && 'rotate-180')} />
        </button>

        {lang.isOpen && (
          <div className="absolute top-full left-0 pt-2 z-20 min-w-[160px]">
            <div className={dropdownStyle}>
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLanguageChange(code)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 outline-none',
                    'text-ko-text-secondary hover:!text-ko-text-secondary hover:!bg-ko-brand-primary/5',
                    currentLocale === code && 'bg-gradient-to-r from-ko-brand-primary/40 to-ko-brand-primary/20 text-ko-brand-primary font-bold hover:!from-ko-brand-primary/40 hover:!to-ko-brand-primary/20 hover:!text-ko-brand-primary',
                  )}
                >
                  <span
                    className="w-6 h-4 rounded-[3px] overflow-hidden [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: languages[code].flag }}
                  />
                  <span className="text-sm font-medium">{languages[code].name}</span>
                  {currentLocale === code && <Icon name="ti ti-check" className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-ko-border-primary" />

      {/* Test Button */}
      <button
        type="button"
        onClick={() => setShowGuestModal(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
          'bg-purple-500/10 border border-purple-500/30 text-purple-400',
          'hover:bg-purple-500/20 hover:border-purple-500/50',
        )}
      >
        <Icon name="ti ti-flask" className="w-4 h-4" />
        <span className="hidden lg:inline text-sm font-medium">Test</span>
      </button>

      <div className="w-px h-6 bg-ko-border-primary" />

      {/* User Menu / Login */}
      {user ? (
        <div className="relative" ref={userMenu.ref}>
          <button
            type="button"
            aria-label={`${t('account.header.user_menu')}: ${user.accountName}`}
            aria-expanded={userMenu.isOpen}
            onClick={() => userMenu.setIsOpen(o => !o)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
              'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary',
              'text-ko-text-dark font-semibold text-sm hover:shadow-lg',
            )}
          >
            <Icon name="ti ti-user" className="w-4 h-4" />
            <span className="hidden lg:inline">{user.accountName}</span>
            <Icon name="ti ti-chevron-down" className={cn('w-3 h-3 transition-transform duration-200 hidden sm:block', userMenu.isOpen && 'rotate-180')} />
          </button>

          {userMenu.isOpen && (
            <div className="absolute top-full right-0 pt-2 z-20 min-w-[200px]">
              <div className={dropdownStyle}>
                <div className="px-4 py-3 border-b border-ko-border-primary">
                  <div className="text-xs text-ko-text-muted mb-1">{t('account.welcome')}</div>
                  <div className="text-sm font-bold text-ko-brand-primary truncate">{user.accountName}</div>
                </div>
                <div className="py-1">
                  <Link
                    href={route('public.account.index')}
                    onClick={() => userMenu.setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-widget-bg transition-all duration-200"
                  >
                    <Icon name="ti ti-user" className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('account.my_account')}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 "
                  >
                    <Icon name="ti ti-login" className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">{t('auth.login.logout')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={route('public.guest.login')}
          aria-label={t('account.auth.login')}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
            'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary',
            'text-ko-text-dark font-semibold text-sm hover:shadow-lg',
          )}
        >
          <Icon name="ti ti-login" className="w-4 h-4" />
          <span className="hidden lg:inline">{t('account.auth.login')}</span>
        </Link>
      )}

      {/* Guest Modal */}
      <GuestModal open={showGuestModal} onOpenChange={setShowGuestModal} />
    </div>
  )
}
