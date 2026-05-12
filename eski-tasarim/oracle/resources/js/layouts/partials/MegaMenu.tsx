import { Icon } from '@/components/shared/icon'
import { NavigationMenuItem } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useCdn } from '@/hooks'
import type { MenuColumn } from '@/types/inertia'

interface MegaMenuProps {
  title: string
  href?: string
  columns?: MenuColumn[]
  featuredImage?: string | null
  featuredTitle?: string | null
  featuredDescription?: string | null
  featuredButtonText?: string | null
  featuredButtonHref?: string | null
}

function getMenuWidth(columnCount: number, hasFeatured: boolean): string {
  if (hasFeatured) {
    const base: Record<number, number> = { 1: 280, 2: 500, 3: 750 }
    return `${(base[columnCount] || 960) + 320}px`
  }
  const widths: Record<number, string> = { 1: '290px', 2: '500px', 3: '750px' }
  return widths[columnCount] || '960px'
}

export function MegaMenu({
  title,
  href,
  columns = [],
  featuredImage,
  featuredTitle,
  featuredDescription,
  featuredButtonText,
  featuredButtonHref,
}: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const cdn = useCdn()
  const hasColumns = columns.length > 0

  if (!hasColumns) {
    return (
      <NavigationMenuItem>
        <Link
          href={href || '#'}
          className={cn(
            'inline-flex h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            'text-ko-text-secondary hover:text-ko-brand-primary hover:bg-ko-nav-hover'
          )}
        >
          {title}
        </Link>
      </NavigationMenuItem>
    )
  }

  const menuWidth = getMenuWidth(columns.length, !!featuredImage)

  return (
    <NavigationMenuItem
      className="static"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={cn(
          'h-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1',
          'border-0 shadow-none outline-none bg-transparent',
          'text-ko-text-secondary hover:text-ko-brand-primary hover:bg-ko-nav-hover',
          isOpen && 'text-ko-brand-primary bg-ko-nav-hover'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <Icon
          name="ti ti-chevron-down"
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="absolute top-full left-0 w-full h-2 z-10" aria-hidden="true" />

          <div
            className="absolute top-full pt-5 z-20 left-1/2"
            style={{
              width: menuWidth,
              maxWidth: menuWidth,
              minWidth: menuWidth,
              transform: 'translateX(-50%)',
            }}
            role="menu"
          >
            <div className="bg-ko-card-bg backdrop-blur-md border border-ko-border-primary rounded-2xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" aria-hidden="true" />

              <div className="flex relative">
                <div className="flex divide-x divide-ko-border-primary/20 w-full">
                  {columns.map((column) => (
                    <div key={column.title} className="flex-1 p-6 min-w-0">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" aria-hidden="true" />
                        <h3 className="text-xs font-bold text-ko-text-primary uppercase tracking-wider">
                          {column.title}
                        </h3>
                      </div>

                      <nav className="space-y-1">
                        {column.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-brand-primary/10 transition-all group/item relative overflow-hidden"
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary group-hover/item:w-1 transition-all duration-300"
                              aria-hidden="true"
                            />

                            {item.icon && (
                              <Icon
                                name={item.icon}
                                className="w-4 h-4 text-ko-brand-primary/70 group-hover/item:text-ko-brand-primary group-hover/item:scale-110 flex-shrink-0 transition-all duration-200"
                                size={16}
                                stroke={2}
                              />
                            )}

                            <span className="text-sm font-medium whitespace-nowrap">
                              {item.text}
                            </span>

                            {item.badge && (
                              <span className="text-[11px] font-bold px-2 py-0.5 bg-ko-brand-primary/20 text-ko-brand-primary rounded ml-auto whitespace-nowrap">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>

                {featuredImage && (
                  <div className="w-80 bg-ko-widget-bg/30 p-6 border-l border-ko-border-primary/20 flex-shrink-0">
                    <div className="flex flex-col h-full">
                      <div className="relative rounded-lg overflow-hidden mb-4 group">
                        <img
                          src={cdn.getStorage(featuredImage)}
                          alt={featuredTitle || 'Featured content'}
                          className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                      </div>

                      <div className="flex-1">
                        {featuredTitle && (
                          <h4 className="text-lg font-bold text-ko-text-primary mb-2">
                            {featuredTitle}
                          </h4>
                        )}
                        {featuredDescription && (
                          <p className="text-sm text-ko-text-muted leading-relaxed">
                            {featuredDescription}
                          </p>
                        )}
                      </div>

                      {featuredButtonText && featuredButtonHref && (
                        <Link
                          href={featuredButtonHref}
                          className="w-full mt-4 py-2.5 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 text-center block"
                        >
                          {featuredButtonText}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </NavigationMenuItem>
  )
}
