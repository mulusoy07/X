import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

export function GalleryDetail({ gallery }) {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(0)
  const images = gallery.images
  const selectedImageData = images[selectedImage]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setSelectedImage(prev => Math.max(0, prev - 1))
      if (e.key === 'ArrowRight') setSelectedImage(prev => Math.min(images.length - 1, prev + 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  return (
    <>
      {gallery.description && (
        <div className="mb-6 bg-ko-card border border-ko-border-primary rounded-2xl p-6">
          <div
            className="text-ko-text-muted prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: gallery.description }}
          />
        </div>
      )}

      {images.length > 0 ? (
        <>
          <div className="mb-6">
            <div className="relative bg-ko-card rounded-2xl overflow-hidden border border-ko-border-primary shadow-xl">
              <div className="relative aspect-video bg-ko-widget-bg">
                {selectedImageData ? (
                  <>
                    <Imagex
                      src={selectedImageData.img}
                      alt={selectedImageData.description || `${t('gallery.detail.image')} ${selectedImage + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full h-full object-contain"
                    />
                    {selectedImageData.description && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 py-4">
                        <p className="text-white text-sm font-medium">{selectedImageData.description}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="ti ti-photo" className="w-20 h-20 text-ko-text-muted/50" />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-between px-6 py-4 bg-ko-card border-t border-ko-border-primary">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                    disabled={selectedImage === 0}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-ko-widget-bg hover:bg-ko-brand-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <Icon name="ti ti-arrow-left" className="w-5 h-5 text-ko-text-primary group-hover:text-ko-brand-primary transition-colors" />
                    <span className="text-sm font-medium text-ko-text-primary group-hover:text-ko-brand-primary transition-colors">{t('gallery.detail.previous')}</span>
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2 bg-ko-widget-bg rounded-lg">
                    <span className="text-lg font-bold text-ko-brand-primary">{selectedImage + 1}</span>
                    <span className="text-ko-text-muted">{t('gallery.detail.of')}</span>
                    <span className="text-sm text-ko-text-muted">{images.length}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedImage(prev => Math.min(images.length - 1, prev + 1))}
                    disabled={selectedImage === images.length - 1}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-ko-widget-bg hover:bg-ko-brand-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <span className="text-sm font-medium text-ko-text-primary group-hover:text-ko-brand-primary transition-colors">{t('gallery.detail.next')}</span>
                    <Icon name="ti ti-arrow-right" className="w-5 h-5 text-ko-text-primary group-hover:text-ko-brand-primary transition-colors" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {images.length > 1 && (
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
                <div className="flex items-center gap-2">
                  <Icon name="ti ti-photo" className="w-5 h-5 text-ko-brand-primary" />
                  <h3 className="text-base font-bold text-ko-text-primary">{t('gallery.detail.all_images')}</h3>
                  <span className="ml-auto text-xs text-ko-text-muted bg-ko-widget-bg px-2.5 py-1 rounded-full border border-ko-border-primary">
                    {images.length}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image.id ?? image.img}
                      onClick={() => setSelectedImage(index)}
                      className="group relative aspect-square rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <Imagex
                        src={image.img}
                        alt={image.description || `${t('gallery.detail.image')} ${index + 1}`}
                        width={200}
                        height={200}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          selectedImage === index ? 'scale-110' : 'scale-100 group-hover:scale-110'
                        }`}
                      />

                      <div
                        className={`absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          selectedImage === index
                            ? 'bg-ko-brand-primary text-white scale-110 shadow-lg'
                            : 'bg-black/60 text-white opacity-0 group-hover:opacity-100 scale-100'
                        }`}
                      >
                        {index + 1}
                      </div>

                      {selectedImage === index && (
                        <>
                          <div className="absolute inset-0 border-2 border-ko-brand-primary rounded-lg pointer-events-none" />
                          <div className="absolute inset-0 bg-ko-brand-primary/10 pointer-events-none" />
                          <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-ko-brand-primary flex items-center justify-center shadow-lg">
                            <Icon name="ti ti-check" className="w-3 h-3 text-white" />
                          </div>
                        </>
                      )}

                      {selectedImage !== index && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-ko-border-primary">
            <Icon name="ti ti-photo-off" className="w-8 h-8 text-ko-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
            {t('gallery.detail.no_images_yet')}
          </h3>
          <p className="text-ko-text-muted text-sm">
            {t('gallery.detail.images_coming_soon')}
          </p>
        </div>
      )}
    </>
  )
}
