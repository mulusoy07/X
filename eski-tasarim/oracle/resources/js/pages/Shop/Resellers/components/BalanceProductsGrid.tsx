import { BalanceProductCard } from './BalanceProductCard'

export function BalanceProductsGrid({ products }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {products.map((product) => (
        <BalanceProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
