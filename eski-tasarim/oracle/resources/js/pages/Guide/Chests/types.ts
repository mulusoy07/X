export interface ExchangeItem {
  itemId: number
  itemName: string | null
  itemType: number | null
  randomFlag: number
  rawRate: number
  dropRate: string
  rarity: {
    text: string
    color: string
    textColor: string
  }
}

export interface ChestListItem {
  originItemId: number
  originItemName: string
  slug: string
}

export interface ChestDetail {
  originItemId: number
  originItemName: string
  group: 'moira' | 'chaotic'
  slug: string
  exchangeItems: ExchangeItem[]
}

export interface GroupDefinition {
  name: string
  description: string
  items: number[]
}
