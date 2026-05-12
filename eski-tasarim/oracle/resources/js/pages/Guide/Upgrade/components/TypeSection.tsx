import { RateCard } from './RateCard'

export function TypeSection({ type }) {
  const { t } = useTranslation()

  if (!type.rates?.length) {
    return null
  }

  return (
    <div className="bg-ko-widget-bg/50 rounded-xl p-6 border border-ko-border-primary">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="w-1 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full flex-shrink-0" />
        <h4 className="text-lg font-bold text-ko-text-primary flex-1 min-w-0 truncate">
          {type.typeName}
        </h4>
        <span className="text-xs text-ko-text-muted bg-ko-card px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
          {t('guide.upgrade.level_upgrades', { count: type.rates.length })}
        </span>
      </div>

      {/* Rates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {type.rates.map((rate, idx) => (
          <RateCard key={`${rate.itemGrade}-${idx}`} rate={rate} />
        ))}
      </div>
    </div>
  )
}
