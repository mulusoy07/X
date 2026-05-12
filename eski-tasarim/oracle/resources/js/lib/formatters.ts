const LOYALTY_ITEM_ID = 900002000

export function formatItemCount(itemId: number, count: number, pieceLabel: string): string {
  if (itemId === LOYALTY_ITEM_ID) {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M NP`
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K NP`
    return `${count} NP`
  }
  return pieceLabel
}
