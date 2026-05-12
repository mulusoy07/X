import { Icon } from '@/components/shared/icon'

export function ExpTable({ expLevels }) {
  const { t } = useTranslation()

  if (!expLevels || expLevels.length === 0) return null

  return (
    <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg p-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="ti ti-trending-up" className="w-4 h-4 text-ko-brand-primary" />
        <h4 className="text-xs font-semibold text-ko-text-primary uppercase tracking-wider">
          {t('shop.premiums.exp_bonuses')}
        </h4>
      </div>

      <div className="space-y-2">
        {expLevels.map((exp) => (
          <div
            key={exp.minLevel}
            className="bg-ko-card border border-ko-border-primary rounded px-3 py-2 flex items-center justify-between"
          >
            <span className="text-xs text-ko-text-muted">
              {t('shop.premiums.level')} {exp.minLevel} - {exp.maxLevel}
            </span>
            <span className="text-sm font-bold text-ko-brand-primary">
              +%{exp.expPercent}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
