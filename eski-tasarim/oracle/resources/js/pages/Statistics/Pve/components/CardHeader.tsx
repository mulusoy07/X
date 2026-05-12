import { Icon } from '@/components/shared/icon'

export function CardHeader({ title, subtitle, icon, iconGradient = 'from-ko-brand-primary to-ko-brand-secondary', badge }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconGradient} flex items-center justify-center`}>
            <Icon name={icon} className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-ko-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-xs text-ko-text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {badge && <div>{badge}</div>}
    </div>
  )
}
