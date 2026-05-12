import { ResellerCard } from './ResellerCard'

export function ResellerGrid({ resellers }) {
  if (!resellers || resellers.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {resellers.map((reseller) => (
        <ResellerCard key={reseller.id} reseller={reseller} />
      ))}
    </div>
  )
}
