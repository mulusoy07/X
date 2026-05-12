export interface Material {
  itemId: number
  itemCount: number
  itemName: string | null
}

export interface ExchangeItem {
  itemId: number
  itemCount: number
  dropRate: number
  dropRatePercent: string
  itemName: string | null
}

export interface Mix {
  index: number
  npcId: number
  npcName: string
  type: number
  exchangeName: string
  successRate: number
  bonusRate: number
  exchangeGroupId: number
  materials: Material[]
  exchangeItems: ExchangeItem[]
  bonusItemId: number
}

export interface Category {
  bType: number
  name: string
  npcName: string
  slug: string
}

export interface CategoryDetail {
  bType: number
  name: string
  npcName: string
  slug: string
  mixes: Mix[]
}
