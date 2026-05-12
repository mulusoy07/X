import { Icon } from '@/components/shared/icon'
import { Pagination } from '@/components/ui/pagination'
import { GalleryCard } from './GalleryCard'

export function GalleryList({ galleries }) {
  const { t } = useTranslation()

  if (galleries.data.length === 0) {
    return (
      <div className="mt-6 bg-ko-card border border-ko-border-primary rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-ko-border-primary">
          <Icon name="ti ti-photo-off" className="w-8 h-8 text-ko-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
          {t('gallery.page.no_galleries_yet')}
        </h3>
        <p className="text-ko-text-muted text-sm">
          {t('gallery.page.galleries_coming_soon')}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleries.data.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>

      {galleries.pagination.lastPage > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={galleries.pagination.currentPage}
            lastPage={galleries.pagination.lastPage}
            total={galleries.pagination.total}
            from={galleries.pagination.from}
            to={galleries.pagination.to}
            itemName={t('gallery.page.item_name')}
          />
        </div>
      )}
    </>
  )
}
