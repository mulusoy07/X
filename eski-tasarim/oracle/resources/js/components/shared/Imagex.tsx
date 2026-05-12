import { useState, forwardRef } from 'react'
import type { ImgHTMLAttributes, CSSProperties, ReactNode, Ref } from 'react'
import { Icon } from '@/components/shared/icon'

interface ImagexProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'sizes' | 'srcSet'> {
  icon?: string | null
  src?: string | null
  src64?: string | null
  alt?: string | null
  className?: string
  width?: number | string
  height?: number | string
  text?: string | number
  style?: CSSProperties
  fallback?: ReactNode
  showFallback?: boolean
  srcset?: string | null
  sizes?: string
}

const processBase64 = (base64: string): string => {
  if (base64.startsWith('data:image')) return base64
  const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64
  return `data:image/png;base64,${cleanBase64}`
}

export const Imagex = forwardRef<HTMLImageElement | HTMLDivElement, ImagexProps>(({
  icon,
  src,
  src64,
  alt = '',
  className = '',
  width,
  height,
  text,
  style = {},
  fallback = <Icon name="ti ti-photo" className="w-full h-full text-ko-text-card-meta" />,
  showFallback = true,
  srcset,
  sizes: sizesProp,
  onLoad,
  onError,
  ...restProps
}, ref) => {
  const [imageError, setImageError] = useState(false)
  const cdn = useCdn()

  const combinedStyle: CSSProperties = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  }

  const getAltText = (): string => {
    if (typeof alt === 'string' && alt.trim()) return alt
    return 'image'
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true)
    onError?.(e)
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(false)
    onLoad?.(e)
  }

  const fallbackDiv = (
    <div className={className} style={combinedStyle} ref={ref as Ref<HTMLDivElement>}>
      {fallback}
    </div>
  )

  if (src64 && typeof src64 === 'string' && src64.trim() !== '') {
    if (imageError && showFallback) return fallbackDiv
    return (
      <img
        {...restProps}
        ref={ref as Ref<HTMLImageElement>}
        src={processBase64(src64)}
        alt={getAltText()}
        className={className}
        style={combinedStyle}
        onError={handleError}
        onLoad={handleLoad}
      />
    )
  }

  if (src && typeof src === 'string' && src.trim() !== '') {
    if (imageError && showFallback) return fallbackDiv
    return (
      <img
        {...restProps}
        ref={ref as Ref<HTMLImageElement>}
        src={cdn.getAsset(src)}
        srcSet={srcset || undefined}
        sizes={srcset ? sizesProp : undefined}
        alt={getAltText()}
        className={className}
        style={combinedStyle}
        onError={handleError}
        onLoad={handleLoad}
      />
    )
  }

  if (icon && typeof icon === 'string' && icon.trim() !== '') {
    const normalizedIcon = icon.toLowerCase()
    const iconClassName = `${normalizedIcon} ${className}`.trim()

    if (text !== undefined && text !== null && String(text).trim() !== '') {
      return (
        <div
          className={`relative ${iconClassName}`}
          style={combinedStyle}
          title={getAltText() || normalizedIcon}
          ref={ref as Ref<HTMLDivElement>}
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{text}</span>
        </div>
      )
    }

    return (
      <div
        className={iconClassName}
        style={combinedStyle}
        title={getAltText() || normalizedIcon}
        ref={ref as Ref<HTMLDivElement>}
      />
    )
  }

  if (showFallback) return fallbackDiv

  return null
})

Imagex.displayName = 'Imagex'
