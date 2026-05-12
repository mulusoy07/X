import { Icon } from '@/components/shared/icon'

export function StatsSection({ className: charClassName, character, stats, skills }) {
  const { t } = useTranslation()

  const characterRows = [
    { key: 'level', label: 'Level', icon: 'ti ti-trending-up', value: character.charLevel },
    { key: 'exp', label: 'Experience', icon: 'ti ti-sparkles', value: character.charExp },
    { key: 'gold', label: 'Gold', icon: 'ti ti-coin', value: character.charGold },
    { key: 'loyalty', label: 'National Points', icon: 'ti ti-flag', value: character.loyalty },
  ]

  const statRows = [
    { key: 'free', label: 'Free Points', icon: 'ti ti-plus', value: stats.freePoints },
    { key: 'str', label: 'STR', icon: 'ti ti-sword', value: stats.strength },
    { key: 'hp', label: 'HP', icon: 'ti ti-heart', value: stats.health },
    { key: 'dex', label: 'DEX', icon: 'ti ti-run', value: stats.dexterity },
    { key: 'int', label: 'INT', icon: 'ti ti-brain', value: stats.intelligence },
    { key: 'mp', label: 'MP', icon: 'ti ti-wand', value: stats.magicPower },
  ]

  const skillRows = [
    { key: 'free', label: 'Free Points', icon: 'ti ti-plus', value: skills.skillPointFree },
    { key: 'cat1', label: 'Category 1', icon: 'ti ti-star', value: skills.skillPointCat1 },
    { key: 'cat2', label: 'Category 2', icon: 'ti ti-star', value: skills.skillPointCat2 },
    { key: 'cat3', label: 'Category 3', icon: 'ti ti-star', value: skills.skillPointCat3 },
    { key: 'master', label: 'Master', icon: 'ti ti-crown', value: skills.skillPointMaster },
  ]

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          <div>
            <h3 className="text-base font-bold text-ko-text-primary">
              {charClassName} {t('guide.beginner.starting_stats')}
            </h3>
            <p className="text-xs text-ko-text-muted mt-0.5">
              {t('guide.beginner.starting_stats_desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Character Section */}
        <StatGroup title="Character" color="ko-brand-primary" rows={characterRows} />

        {/* Stat Points Section */}
        <StatGroup title="Stat Points" color="green-500" rows={statRows} />

        {/* Skill Points Section */}
        <StatGroup title="Skill Points" color="purple-500" rows={skillRows} />
      </div>
    </div>
  )
}

function StatGroup({ title, color, rows }) {
  const colorMap = {
    'ko-brand-primary': {
      badge: 'bg-ko-brand-primary/15 text-ko-brand-primary border-ko-brand-primary/30',
      icon: 'text-ko-brand-primary bg-ko-brand-primary/15',
    },
    'green-500': {
      badge: 'bg-green-500/15 text-green-500 border-green-500/30',
      icon: 'text-green-500 bg-green-500/15',
    },
    'purple-500': {
      badge: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
      icon: 'text-purple-500 bg-purple-500/15',
    },
  }

  const colors = colorMap[color] || colorMap['ko-brand-primary']

  return (
    <div>
      <div className="mb-3">
        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${colors.badge}`}>
          {title}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center gap-3 bg-ko-widget-bg/40 rounded-lg px-3 py-2.5 border border-ko-border-primary/50"
          >
            <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
              <Icon name={row.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-ko-text-muted block leading-tight">{row.label}</span>
              <span className="text-sm font-bold text-ko-text-primary">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
