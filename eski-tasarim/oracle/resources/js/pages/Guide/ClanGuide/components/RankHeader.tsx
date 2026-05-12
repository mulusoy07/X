import { ClanGradeAnimation } from '@/components/shared/ClanGradeAnimation'

const orbData = [
  { rank: 5, nationRank: 1, accent: 'border-yellow-500/40 bg-yellow-500/5', label: 'text-yellow-500' },
  { rank: 4, nationRank: 2, accent: 'border-gray-400/40 bg-gray-400/5', label: 'text-gray-400' },
  { rank: 3, nationRank: 3, accent: 'border-orange-500/40 bg-orange-500/5', label: 'text-orange-500' },
  { rank: 2, nationRank: 4, accent: 'border-blue-500/40 bg-blue-500/5', label: 'text-blue-500' },
  { rank: 1, nationRank: 5, accent: 'border-ko-border-primary bg-ko-widget-bg/30', label: 'text-ko-text-muted' },
]

export function RankHeader() {
  const { t } = useTranslation('guide.clan.title')

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          <div>
            <h3 className="text-base font-bold text-ko-text-primary">{t('nation_rank_title')}</h3>
            <p className="text-xs text-ko-text-muted mt-0.5">{t('nation_rank_desc')}</p>
          </div>
        </div>
      </div>

      {/* Rank Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {orbData.map((orb) => (
            <div
              key={orb.rank}
              className={`flex flex-col items-center gap-3 rounded-lg border p-4 ${orb.accent}`}
            >
              {/* Orb - fixed size */}
              <ClanGradeAnimation
                rank={orb.rank}
                size={64}
                scale={1.5}
              />

              {/* Combined Label */}
              <span className={`text-[11px] font-bold ${orb.label}`}>
                {t('rank_grade')} #{orb.nationRank}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
