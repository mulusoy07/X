import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

export function ResellerCard({ reseller }) {
  const { t } = useTranslation()

  return (
    <a
      href={reseller.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-2xl overflow-hidden transition-all duration-200 group block"
    >
      <div className="relative bg-ko-widget-bg p-8 border-b border-ko-border-primary">
        <div className="flex items-center justify-center">
          {reseller.logo ? (
            <div className="w-32 h-32 relative">
              <Imagex
                src={reseller.logo}
                alt={reseller.name}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-ko-brand-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="ti ti-building-store" className="w-16 h-16 text-ko-brand-primary" />
            </div>
          )}
        </div>

        <div className="absolute top-3 left-3">
          <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg px-2 py-1 flex items-center gap-1">
            <Icon name="ti ti-circle-check" className="w-3.5 h-3.5 text-ko-brand-primary" />
            <span className="text-xs font-bold text-ko-brand-primary">{t('shop.resellers.verified_reseller')}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-ko-brand-primary/20 p-2 rounded-full">
            <Icon name="ti ti-external-link" className="w-4 h-4 text-ko-brand-primary" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-ko-text-primary text-center mb-2 line-clamp-1">
          {reseller.name}
        </h3>

        {reseller.description && (
          <p className="text-xs text-ko-text-muted text-center line-clamp-2 leading-relaxed">
            {reseller.description}
          </p>
        )}
      </div>
    </a>
  )
}
