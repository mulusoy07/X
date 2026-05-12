import { Icon } from '@/components/shared/icon'
import { useLayout } from '@/hooks'

export function FormHeader({
  icon,
  title,
  subtitle,
  onRandomize,
  disabled = false,
}) {
  const layout = useLayout()
  const seo = layout?.seo

  const displayTitle = title || seo?.site_name

  if (!displayTitle) return null

  return (
    <div className="relative p-6 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
      <div className="flex items-center gap-3 group">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/20 flex items-center justify-center border border-ko-brand-primary/30 group-hover:scale-110 transition-transform duration-300 text-ko-brand-primary">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-ko-text-primary">{displayTitle}</h2>
          {subtitle && <p className="text-xs text-ko-text-muted">{subtitle}</p>}
        </div>
        {onRandomize && (
          <button
            type="button"
            onClick={onRandomize}
            disabled={disabled}
            className="w-8 h-8 flex items-center justify-center bg-ko-widget-bg border border-ko-border-primary text-ko-text-muted hover:text-ko-brand-primary hover:border-ko-brand-primary hover:scale-105 transition-all duration-300 rounded-md"
          >
            <Icon name="ti ti-arrows-shuffle" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
