import { PremiumCard } from './PremiumCard'

export function PremiumGrid({ premiums }) {
  if (!premiums || premiums.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {premiums.map((premium) => (
        <PremiumCard key={premium.id} premium={premium} />
      ))}
    </div>
  )
}
