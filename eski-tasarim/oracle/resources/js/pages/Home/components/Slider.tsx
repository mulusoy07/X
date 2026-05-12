import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import type { SliderItem } from './types'
import type { Swiper as SwiperType } from 'swiper'

interface SliderProps {
  sliders: SliderItem[]
}

const isVideoFile = (url: string) => /\.(mp4|webm|ogg)$/i.test(url)

export function Slider({ sliders }: SliderProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedVideos, setLoadedVideos] = useState(new Set<string | number>())

  const handleVideoCanPlay = useCallback((sliderId: string | number) => {
    setLoadedVideos(prev => new Set(prev).add(sliderId))
  }, [])

  if (!sliders || sliders.length === 0) return null

  return (
    <header className="w-full overflow-hidden relative">
      <div className="relative w-full h-screen max-h-[800px] overflow-hidden bg-ko-text-dark md:max-h-[500px] md:h-[60vh] md:min-h-[400px] sm:max-h-[400px] sm:h-[50vh] sm:min-h-[300px]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={sliders.length > 1}
          speed={1500}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={(swiper) => { setActiveIndex(swiper.realIndex) }}
          allowTouchMove={true}
          className="w-full h-full"
        >
          {sliders.map((slider, slideIndex) => (
            <SwiperSlide key={slider.id}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full z-10">
                  {!slider.image ? (
                    <div className="w-full h-full bg-gradient-to-br from-ko-main via-ko-card to-ko-main" />
                  ) : isVideoFile(slider.image) ? (
                    <div className="relative w-full h-full">
                      {slider.poster && (
                        <Imagex
                          src={slider.poster}
                          srcset={slider.posterSrcset}
                          alt={slider.title}
                          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${loadedVideos.has(slider.id) ? 'opacity-0' : 'opacity-100'}`}
                          loading={slideIndex === 0 ? 'eager' : 'lazy'}
                          fetchPriority={slideIndex === 0 ? 'high' : 'low'}
                          sizes="100vw"
                        />
                      )}
                      <video
                        className="absolute inset-0 w-full h-full object-cover object-center block"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        ref={(el) => { if (el) el.play().catch(() => {}) }}
                        onCanPlay={() => handleVideoCanPlay(slider.id)}
                      >
                        <source src={slider.image} type={`video/${slider.image.split('.').pop()}`} />
                      </video>
                    </div>
                  ) : (
                    <Imagex
                      src={slider.image}
                      srcset={slider.imageSrcset}
                      alt={slider.title}
                      className="w-full h-full object-cover object-center block"
                      loading={slideIndex === 0 ? 'eager' : 'lazy'}
                      fetchPriority={slideIndex === 0 ? 'high' : 'low'}
                      sizes="100vw"
                    />
                  )}
                </div>

                <div className="absolute inset-0 w-full h-full z-20">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-ko-text-dark via-ko-text-dark/50 to-transparent" />
                  <div className="absolute inset-0 w-full h-full opacity-10" />
                </div>

                <div className="absolute inset-0 w-full h-full flex items-center justify-center z-30">
                  <div className="w-full max-w-[1440px] mx-auto px-4">
                    <div className="relative text-center text-white space-y-6">
                      {slider.badgeText && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-ko-brand-primary/90 backdrop-blur-sm rounded-full font-bold text-sm text-ko-text-dark">
                          {slider.badgeIcon && <Icon name={slider.badgeIcon} className="w-4 h-4" />}
                          <span>{slider.badgeText}</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                          <span className="bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary bg-clip-text text-transparent">
                            {slider.title}
                          </span>
                        </h1>
                        <div className="flex justify-center">
                          <div className="h-1 w-24 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary rounded-full" />
                        </div>
                      </div>

                      {slider.description && (
                        <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed hidden lg:block text-ko-text-accent/90">
                          {slider.description}
                        </p>
                      )}

                      {slider.buttonText && slider.buttonUrl && (
                        <div className="flex justify-center">
                          <Link
                            href={slider.buttonUrl}
                            className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark hover:from-ko-brand-secondary hover:to-ko-brand-primary shadow-lg hover:scale-105"
                          >
                            {slider.buttonIcon && <Icon name={slider.buttonIcon} className="w-5 h-5" />}
                            <span>{slider.buttonText}</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {sliders.length > 1 && (
          <div className="absolute bottom-8 right-8 z-40 flex items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-ko-brand-primary text-ko-text-dark hover:bg-ko-brand-secondary transition-all flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer"
              aria-label="Previous slide"
            >
              <Icon name="ti ti-chevron-left" size={24} />
            </button>

            <div className="flex gap-2">
              {sliders.map((slider, index) => (
                <button
                  key={slider.id}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="relative min-w-[48px] min-h-[48px] flex items-center justify-center transition-all cursor-pointer"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-ko-brand-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`} />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-ko-brand-primary text-ko-text-dark hover:bg-ko-brand-secondary transition-all flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer"
              aria-label="Next slide"
            >
              <Icon name="ti ti-chevron-right" size={24} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
