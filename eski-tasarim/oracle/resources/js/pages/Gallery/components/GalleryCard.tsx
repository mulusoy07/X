import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

export function GalleryCard({ gallery }) {
  const { t } = useTranslation()
  const imageCount = gallery.images.length
  const coverImage = gallery.image || gallery.images?.[0]?.img || null

  return (
    <Link
      href={route('public.gallery.show', { slug: gallery.slug })}
      className="group block bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden hover:border-ko-brand-primary/50 transition-all duration-300"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-ko-widget-bg">
        <Imagex
          src={coverImage}
          alt={gallery.name}
          width={600}
          height={340}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallback={<Icon name="ti ti-photo" className="w-12 h-12 text-ko-text-muted" />}
        />

        {imageCount > 0 && (
          <div className="absolute top-3 right-3 bg-ko-card/95 backdrop-blur-sm border border-ko-border-primary rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Icon name="ti ti-photo" className="w-4 h-4 text-ko-brand-primary" />
            <span className="text-sm font-semibold text-ko-text-primary">{imageCount}</span>
          </div>
        )}

        {gallery.isFeatured && (
          <div className="absolute top-3 left-3 bg-ko-brand-primary/95 backdrop-blur-sm border border-ko-brand-primary/30 rounded-lg px-3 py-1.5">
            <span className="text-xs font-semibold text-white">{t('gallery.card.featured')}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-ko-text-primary mb-2 line-clamp-2 group-hover:text-ko-brand-primary transition-colors">
          {gallery.name}
        </h3>

        {gallery.description && (
          <p className="text-sm text-ko-text-muted line-clamp-2 mb-3">
            {gallery.description.replace(/<[^>]*>/g, '')}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-ko-text-muted">
          <span>{gallery.createdAt}</span>
          <span className="flex items-center gap-1 group-hover:text-ko-brand-primary transition-colors">
            <span>{t('gallery.card.view')}</span>
            <Icon name="ti ti-arrow-right" className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
