import { usePve } from './PveContext'
import { TopHunters } from './TopHunters'
import { StatCards } from './StatCards'
import { TopMonsters } from './TopMonsters'
import { ZoneStats } from './ZoneStats'
import { NationComparisonCard } from './NationComparison'
import { TrendChart } from './TrendChart'

export function PveContent() {
  const { data, periods } = usePve()

  return (
    <div className="space-y-6">
      {/* Top Hunters - Right after filters */}
      <TopHunters />

      {/* Summary Stats Cards */}
      <StatCards />

      {/* Top Row: Monsters + Zone Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopMonsters />
        <ZoneStats />
      </div>

      {/* Nation Comparison + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NationComparisonCard />
        <TrendChart />
      </div>
    </div>
  )
}
