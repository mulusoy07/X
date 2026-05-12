import { Icon } from '@/components/shared/icon'

export function InfoCards({ creation, customization, limits }) {
  const { t } = useTranslation('guide.clan.title')
  const { props } = usePage()

  const creationRows = [
    { key: 'level', label: t('req_level'), icon: 'ti ti-trending-up', value: creation.reqLevel },
    { key: 'coins', label: t('req_coins'), icon: 'ti ti-coin', value: creation.reqCoins, type: 'number' },
    { key: 'bank_flag', label: t('req_bank_flag'), icon: 'ti ti-building-bank', value: creation.reqBankFlag, type: 'boolean' },
    { key: 'bank_premium', label: t('req_bank_premium'), icon: 'ti ti-diamond', value: creation.reqBankPremium, type: 'boolean' },
  ]

  const customizationRows = [
    { key: 'symbol_gold', label: t('symbol_gold'), icon: 'ti ti-coin', value: customization.symbolGold, type: 'number' },
    { key: 'symbol_np', label: t('symbol_loyalty'), icon: 'ti ti-flag', value: customization.symbolLoyalty, type: 'number' },
    { key: 'cape_gold', label: t('cape_color_gold'), icon: 'ti ti-coin', value: customization.capeColorGold, type: 'number' },
    { key: 'cape_np', label: t('cape_color_loyalty'), icon: 'ti ti-flag', value: customization.capeColorLoyalty, type: 'number' },
  ]

  const limitsRows = [
    { key: 'max_users', label: t('max_members'), icon: 'ti ti-users', value: limits.maxClanUsers },
    { key: 'max_assistants', label: t('max_assistants'), icon: 'ti ti-user-star', value: limits.maxAssistants },
    { key: 'min_donate', label: t('min_donate'), icon: 'ti ti-gift', value: limits.minDonatePoints, type: 'number' },
  ]

  const cards = [
    { title: t('creation_title'), desc: t('creation_desc'), icon: 'ti ti-flag-3', color: 'ko-brand-primary', rows: creationRows },
    { title: t('customization_title'), desc: t('customization_desc'), icon: 'ti ti-palette', color: 'amber-500', rows: customizationRows },
    { title: t('limits_title'), desc: t('limits_desc'), icon: 'ti ti-users-group', color: 'blue-500', rows: limitsRows },
  ]

  const colorMap = {
    'ko-brand-primary': {
      accent: 'from-ko-brand-primary to-ko-brand-secondary',
      icon: 'text-ko-brand-primary bg-ko-brand-primary/15',
    },
    'amber-500': {
      accent: 'from-amber-500 to-amber-600',
      icon: 'text-amber-500 bg-amber-500/15',
    },
    'blue-500': {
      accent: 'from-blue-500 to-blue-600',
      icon: 'text-blue-500 bg-blue-500/15',
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const colors = colorMap[card.color] || colorMap['ko-brand-primary']
        return (
          <div key={card.title} className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="px-5 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-7 bg-gradient-to-b ${colors.accent} rounded-full`} />
                <div>
                  <h3 className="text-base font-bold text-ko-text-primary">{card.title}</h3>
                  <p className="text-xs text-ko-text-muted mt-0.5">{card.desc}</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-2">
              {card.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center gap-3 bg-ko-widget-bg/40 rounded-lg px-3 py-2.5 border border-ko-border-primary/50"
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                    <Icon name={row.icon} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-ko-text-muted block leading-tight">{row.label}</span>
                    {row.type === 'boolean' ? (
                      <span className="text-sm font-bold flex items-center gap-1">
                        <Icon
                          name={row.value ? 'ti ti-circle-check-filled' : 'ti ti-circle-x-filled'}
                          className={`w-4 h-4 ${row.value ? 'text-green-500' : 'text-red-500/60'}`}
                        />
                        <span className="text-ko-text-primary">{row.value ? t('yes') : t('no')}</span>
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-ko-text-primary">
                        {typeof row.value === 'number' ? row.value : row.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
