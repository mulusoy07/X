import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import type { PaginatedData } from '../../types'

interface ForumPaginationProps {
  pagination: PaginatedData<any>
  basePath?: string
}

export function ForumPagination({ pagination, basePath }: ForumPaginationProps) {
  const { t } = useTranslation()
  const { url } = usePage()

  // Guard: pagination veya links yoksa render etme
  if (!pagination || !pagination.links || pagination.links.length === 0) {
    return null
  }

  const handlePageChange = (page: number) => {
    // Build base URL
    const currentUrl = new URL(basePath || url, window.location.origin)

    // Set page parameter
    currentUrl.searchParams.set('page', page.toString())

    // Navigate using Inertia
    router.get(currentUrl.pathname + currentUrl.search, {}, {
      preserveState: true,
      preserveScroll: false,
    })
  }

  const getPageFromUrl = (url: string | null): number | null => {
    if (!url) return null
    try {
      const urlObj = new URL(url, window.location.origin)
      return Number(urlObj.searchParams.get('page')) || 1
    } catch {
      return null
    }
  }

  return (
    <div className="bg-ko-card/50 backdrop-blur-sm border border-ko-border rounded-lg p-4 mt-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Info Text */}
        <div className="text-sm text-gray-400">
          {t('plugins.forum.components.pagination.showing')}: <span className="font-semibold text-white">{pagination.from}</span> -{' '}
          <span className="font-semibold text-white">{pagination.to}</span> /{' '}
          <span className="font-semibold text-white">{pagination.total}</span> {t('plugins.forum.components.pagination.results')}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => {
              const page = getPageFromUrl(pagination.prev_page_url)
              if (page) handlePageChange(page)
            }}
            disabled={!pagination.prev_page_url}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                pagination.prev_page_url
                  ? 'bg-ko-card hover:bg-ko-main text-white border border-ko-border hover:border-ko-accent'
                  : 'bg-ko-card/30 text-gray-600 cursor-not-allowed border border-ko-border/30'
              }
            `}
          >
            <Icon name="ti ti-chevron-left" size={16} />
            {t('plugins.forum.components.pagination.previous')}
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pagination.links
              .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
              .map((link, index) => {
                const page = getPageFromUrl(link.url)
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (page) handlePageChange(page)
                    }}
                    disabled={!link.url}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all min-w-[40px]
                      ${
                        link.active
                          ? 'bg-ko-accent text-white border border-ko-accent'
                          : link.url
                            ? 'bg-ko-card hover:bg-ko-main text-white border border-ko-border hover:border-ko-accent'
                            : 'bg-ko-card/30 text-gray-600 cursor-not-allowed border border-ko-border/30'
                      }
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )
              })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              const page = getPageFromUrl(pagination.next_page_url)
              if (page) handlePageChange(page)
            }}
            disabled={!pagination.next_page_url}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                pagination.next_page_url
                  ? 'bg-ko-card hover:bg-ko-main text-white border border-ko-border hover:border-ko-accent'
                  : 'bg-ko-card/30 text-gray-600 cursor-not-allowed border border-ko-border/30'
              }
            `}
          >
            {t('plugins.forum.components.pagination.next')}
            <Icon name="ti ti-chevron-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
