import { usePvp } from './PvpContext'
import { TopKillers } from './TopKillers'
import { NationComparisonCard } from './NationComparison'
import { TrendChart } from './TrendChart'

export function PvpContent() {
  const { data } = usePvp()

  return (
    <div className="space-y-6">
      {/* Top Killers */}
      <TopKillers />

      {/* Nation Comparison + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NationComparisonCard />
        <TrendChart />
      </div>
    </div>
  )
}
