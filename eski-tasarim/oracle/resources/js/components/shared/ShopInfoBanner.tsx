import { Icon } from '@/components/shared/icon'

interface ShopInfoBannerProps {
  count: number
  countLabel: string
  title: string
  description: string
}

export function ShopInfoBanner({ count, countLabel, title, description }: ShopInfoBannerProps) {
  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-ko-brand-primary/20 rounded flex items-center justify-center flex-shrink-0">
            <Icon name="ti ti-sparkles" className="w-5 h-5 text-ko-brand-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-ko-text-primary mb-1">
              {title}
            </h3>
            <p className="text-sm text-ko-text-muted">
              {description}
            </p>
          </div>
        </div>

        <div className="bg-ko-card border border-ko-border-primary rounded-xl px-4 py-2">
          <div className="text-center">
            <div className="text-lg font-bold uppercase text-ko-brand-primary">
              {count}
            </div>
            <div className="text-xs text-ko-text-muted tracking-wider">{countLabel}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
