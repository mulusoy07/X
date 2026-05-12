import { Link } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Icon } from '@/components/shared/icon'
import type { BreadcrumbItem } from '../../types'

interface ForumBreadcrumbProps {
  items: BreadcrumbItem[]
  currentPage?: string
  className?: string
}

export function ForumBreadcrumb({ items, currentPage, className }: ForumBreadcrumbProps) {
  return (
    <div className={`bg-ko-card/90 backdrop-blur-md rounded-xl border border-ko-border-primary p-3 ${className || ''}`}>
      <Breadcrumb>
        <BreadcrumbList className="text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1 && !currentPage
            const href = item.routeName ? route(item.routeName, item.routeParams) : '#'

            return (
              <div key={index} className="flex items-center gap-2">
                <ShadcnBreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-ko-brand-primary font-semibold flex items-center gap-1.5">
                      {item.icon && index > 0 ? (
                        <Icon name={item.icon} size={16} />
                      ) : index === 0 ? (
                        <Icon name="ti ti-home" size={16} />
                      ) : null}
                      {item.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className="text-ko-text-muted hover:text-ko-brand-primary transition-colors flex items-center gap-1.5"
                      >
                        {item.icon && index > 0 ? (
                          <Icon name={item.icon} size={16} />
                        ) : index === 0 ? (
                          <Icon name="ti ti-home" size={16} />
                        ) : null}
                        {item.title}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </ShadcnBreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="text-ko-text-muted" />}
              </div>
            )
          })}

          {currentPage && (
            <>
              <BreadcrumbSeparator className="text-ko-text-muted" />
              <ShadcnBreadcrumbItem>
                <BreadcrumbPage className="text-ko-brand-primary font-semibold line-clamp-1">
                  {currentPage}
                </BreadcrumbPage>
              </ShadcnBreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
