import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

const tierConfig = {
  training: {
    badge: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    border: 'border-l-blue-500/50',
  },
  accredited: {
    badge: 'bg-red-500/15 text-red-500 border-red-500/30',
    border: 'border-l-red-500/50',
  },
  royal: {
    badge: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
    border: 'border-l-yellow-500/50',
  },
}

export function RankTable({ ranks }) {
  const { t } = useTranslation('guide.clan.title')
  const { props } = usePage()

  const tiers = [
    { key: 'training', label: t('tier_training') },
    { key: 'accredited', label: t('tier_accredited') },
    { key: 'royal', label: t('tier_royal') },
  ]

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          <div>
            <h3 className="text-base font-bold text-ko-text-primary">{t('ranks_title')}</h3>
            <p className="text-xs text-ko-text-muted mt-0.5">{t('ranks_desc')}</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {tiers.map((tier) => {
          const tierRanks = ranks.filter((r) => r.tier === tier.key)
          const colors = tierConfig[tier.key]

          return (
            <div key={tier.key}>
              {/* Tier Badge */}
              <div className="mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${colors.badge}`}>
                  {tier.label}
                </span>
              </div>

              {/* Rank Rows */}
              <div className="space-y-1.5">
                {tierRanks.map((rank) => (
                  <div
                    key={rank.gradeIcon}
                    className={`flex items-center gap-3 bg-ko-widget-bg/40 rounded-lg px-3 py-2.5 border border-ko-border-primary/50 border-l-2 ${colors.border}`}
                  >
                    {/* Grade Icon */}
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Imagex width={32} height={32} icon={rank.gradeIcon} alt={rank.gradeName} className="w-8 h-8" />
                    </div>

                    {/* Grade Name */}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-ko-text-primary">{rank.gradeName}</span>
                    </div>

                    {/* Required NP */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Icon name="ti ti-flag" className="w-3.5 h-3.5 text-ko-text-muted" />
                      <span className="text-sm font-bold text-ko-text-primary">
                        {rank.requiredNP} NP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
