import { Icon } from '@/components/shared/icon'

export function SectionHeader({ icon, title, description, count }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-ko-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={icon} className="w-5 h-5 text-ko-brand-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-ko-text-primary">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-ko-text-muted mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      {count !== undefined && (
        <div className="bg-ko-card border border-ko-border-primary rounded-lg px-3 py-2">
          <div className="text-center">
            <div className="text-base font-bold text-ko-brand-primary">
              {count}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
