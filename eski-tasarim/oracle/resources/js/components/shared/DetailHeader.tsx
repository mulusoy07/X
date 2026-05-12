import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

interface DetailHeaderProps {
  name: string
  description?: string | null
  image?: string | null
  imageSrcset?: string | null
  fallbackIcon: string
  meta?: React.ReactNode
  content?: string | null
  contentClassName?: string
}

export function DetailHeader({
  name,
  description,
  image,
  imageSrcset,
  fallbackIcon,
  meta,
  content,
  contentClassName = 'prose prose-sm prose-invert max-w-none text-ko-text-secondary prose-headings:text-ko-text-primary prose-headings:font-semibold prose-p:text-ko-text-secondary prose-p:leading-relaxed prose-a:text-ko-brand-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-ko-text-primary prose-strong:font-semibold prose-ul:text-ko-text-secondary prose-ol:text-ko-text-secondary prose-li:marker:text-ko-brand-primary',
}: DetailHeaderProps) {
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-ko-border-primary">
            {image ? (
              <Imagex
                src={image}
                srcset={imageSrcset}
                alt={name}
                className="w-full h-full object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full bg-ko-widget-bg flex items-center justify-center">
                <Icon name={fallbackIcon} className="w-8 h-8 text-ko-brand-primary" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-ko-text-primary mb-2 truncate">{name}</h3>
            {description && <p className="text-sm text-ko-text-muted mb-2">{description}</p>}
            {meta && <div className="flex items-center gap-4 text-sm">{meta}</div>}
          </div>
        </div>

        {content && (
          <div className="mt-4 pt-4 border-t border-ko-border-primary/50">
            <div className={contentClassName} dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>

      <div className="h-px bg-ko-border-primary" />
    </div>
  )
}
