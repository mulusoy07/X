import { useTranslation, useLayout } from '@/hooks'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/shared/icon'
import type { MenuColumn } from '@/types/inertia'
import { QuickActionsWidget } from '@/layouts/widgets/QuickActions'
import { createPortal } from 'react-dom'

export function MobileMenu() {
  const { t } = useTranslation()
  const layout = useLayout()
  const menuItems = layout.menu || []
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'scrollbar-gutter-stable')
    } else {
      document.body.classList.remove('overflow-hidden', 'scrollbar-gutter-stable')
    }
    return () => {
      document.body.classList.remove('overflow-hidden', 'scrollbar-gutter-stable')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setOpenSubmenus(new Set())
      return !prev
    })
  }, [])

  const toggleSubmenu = useCallback((index: number) => {
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }, [])

  const handleLinkClick = useCallback(() => {
    setIsOpen(false)
    setOpenSubmenus(new Set())
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className={cn(
          'xl:hidden flex items-center justify-center w-10 h-10 rounded-lg relative',
          'text-ko-text-secondary hover:text-ko-brand-primary',
          'border border-ko-border-primary hover:border-ko-brand-primary',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ko-brand-primary focus:ring-offset-2 focus:ring-offset-ko-card'
        )}
        aria-label={isOpen ? t('components.navigation.close_menu') : t('components.navigation.open_menu')}
        aria-expanded={isOpen}
      >
        {isOpen ? <Icon name="ti ti-x" size={20} /> : <Icon name="ti ti-menu-2" size={20} />}
      </button>

      {typeof window !== 'undefined' && createPortal(
        <>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-[99998] xl:hidden animate-in fade-in duration-200"
              onClick={toggleMenu}
              role="presentation"
            />
          )}

          <div
            className={cn(
              'fixed top-0 right-0 h-full w-[320px] max-w-[85vw]',
              'bg-ko-card-bg border-l border-ko-border-primary shadow-2xl',
              'z-[99999] transition-all duration-300 ease-in-out xl:hidden',
              'overflow-hidden',
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
            )}
        role="dialog"
        aria-modal="true"
        aria-label={t('components.navigation.mobile_menu')}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 bg-ko-card-bg/95 border-b border-ko-border-primary h-16 sm:h-20 p-4 flex items-center justify-between backdrop-blur-md">
            <h2 className="text-lg font-bold text-ko-text-primary">
              {t('components.navigation.menu')}
            </h2>
            <button
              type="button"
              onClick={toggleMenu}
              className="w-10 h-10 rounded-lg bg-ko-widget-bg/50 hover:bg-ko-card-hover border border-ko-border-primary hover:border-ko-brand-primary/50 flex items-center justify-center transition-all group"
              aria-label={t('components.navigation.close_menu')}
            >
              <Icon name="ti ti-x" className="w-5 h-5 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto overscroll-contain" role="navigation">
            {menuItems.map((menu, menuIdx) => {
              const hasColumns = menu.columns && menu.columns.length > 0
              const isSubmenuOpen = openSubmenus.has(menuIdx)

              return (
                <div key={menu.title || menuIdx} className="relative">
                  {hasColumns ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(menuIdx)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-lg',
                          'text-ko-text-secondary hover:text-ko-brand-primary hover:bg-ko-widget-bg/50',
                          'transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-ko-brand-primary/50',
                          isSubmenuOpen && 'text-ko-brand-primary bg-ko-widget-bg/30'
                        )}
                        aria-expanded={isSubmenuOpen}
                      >
                        <span className="font-medium">{menu.title}</span>
                        <Icon
                          name="ti ti-chevron-down"
                          size={16}
                          className={cn(
                            'transition-transform duration-200',
                            isSubmenuOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          isSubmenuOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                        )}
                      >
                        <div className="space-y-3">
                          {menu.columns?.map((column: MenuColumn) => (
                            <div key={column.title} className="ml-4 border-l-2 border-ko-brand-primary/30 pl-3">
                              <div className="flex items-center gap-2 mb-2 px-2">
                                <div
                                  className="w-1 h-3 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full"
                                  aria-hidden="true"
                                />
                                <h3 className="text-[11px] font-bold text-ko-text-primary uppercase tracking-wider">
                                  {column.title}
                                </h3>
                              </div>

                              <div className="space-y-1">
                                {column.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-brand-primary/10 transition-all duration-200 group relative"
                                  >
                                    <div
                                      className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary group-hover:w-0.5 transition-all duration-200"
                                      aria-hidden="true"
                                    />

                                    {item.icon && (
                                      <Icon
                                        name={item.icon}
                                        className="w-4 h-4 text-ko-brand-primary/70 group-hover:text-ko-brand-primary flex-shrink-0 transition-colors"
                                        size={16}
                                      />
                                    )}

                                    <span className="text-sm font-medium">{item.text}</span>

                                    {item.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-ko-brand-primary/20 text-ko-brand-primary rounded ml-auto">
                                        {item.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href || '#'}
                      onClick={handleLinkClick}
                      className="flex items-center px-4 py-3 rounded-lg text-ko-text-secondary hover:text-ko-brand-primary hover:bg-ko-widget-bg/50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-ko-brand-primary/50"
                    >
                      {menu.title}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="border-t border-ko-border-primary bg-ko-card-bg/95 backdrop-blur-md">
            <div className="p-4">
              <QuickActionsWidget variant="menu" />
            </div>
          </div>

          <div className="sticky bottom-0 p-4 border-t border-ko-border-primary bg-ko-card-bg/95 backdrop-blur-md">
            <p className="text-xs text-ko-text-muted text-center">
              {layout.config.copyright || '© 2025 OracleGamer'}
            </p>
          </div>
        </div>
      </div>
        </>,
        document.body
      )}
    </>
  )
}
