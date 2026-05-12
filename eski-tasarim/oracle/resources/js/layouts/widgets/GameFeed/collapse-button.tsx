import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

interface CollapseButtonProps {
  isCollapsed: boolean
  onToggle: () => void
  ariaLabel: string
}

export function CollapseButton({ isCollapsed, onToggle, ariaLabel }: CollapseButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'group relative w-12 h-12 rounded-2xl cursor-pointer transition-all duration-300 ease-out overflow-hidden',
        'bg-ko-widget-bg/50 border border-ko-border-primary hover:border-ko-brand-primary/50',
        'flex items-center justify-center shadow-lg hover:shadow-xl',
        'hover:scale-110 active:scale-95'
      )}
      aria-label={ariaLabel}
    >
      {/* Gradient Border Effect on Hover */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-ko-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <span className="relative z-10 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors duration-300">
        <Icon
          name={isCollapsed ? 'ti ti-rss' : 'ti ti-x'}
          size={22}
        />
      </span>
    </button>
  )
}
