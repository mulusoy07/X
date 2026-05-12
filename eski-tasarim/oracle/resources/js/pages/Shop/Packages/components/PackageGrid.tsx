import { PackageCard } from './PackageCard'

export function PackageGrid({ packages }) {
  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {packages.map((packageItem) => (
        <PackageCard key={packageItem.id} package={packageItem} />
      ))}
    </div>
  )
}
