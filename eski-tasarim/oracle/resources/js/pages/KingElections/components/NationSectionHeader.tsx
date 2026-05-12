import { Imagex } from '@/components/shared/Imagex'
import { cn } from '@/lib/utils'

export function getNationStyles(nation) {
  const isKarus = nation === 'karus'
  return {
    gradient: isKarus ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600',
    text: isKarus ? 'text-red-400' : 'text-blue-400',
    isKarus,
  }
}

export function NationSectionHeader({ nation, title, subtitle }) {
  const { gradient, isKarus } = getNationStyles(nation)

  return (
    <div className="relative px-4 sm:px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/80">
      <div className={cn('absolute inset-0 bg-gradient-to-r opacity-15', gradient)} />
      <div className="relative flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-ko-widget-bg/50 p-1 border border-ko-border-primary/30">
            <Imagex
              width={44}
              height={44}
              icon={isKarus ? 'Karus' : 'Human'}
              alt={isKarus ? 'Karus' : 'Human'}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-bold text-ko-text-primary">{title}</h2>
          {subtitle && (
            <p className="text-xs text-ko-text-muted">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
