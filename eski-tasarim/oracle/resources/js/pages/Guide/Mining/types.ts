export interface MineItem {
  miningType: number
  zoneId: string
  reqItemId: number
  reqItemName: string | null
  itemId: number
  itemName: string | null
  itemCount: number
  dropRate: string
  rarity: {
    text: string
    color: string
    textColor: string
  }
}

export interface PickaxeListItem {
  pickaxeId: number
  pickaxeName: string
  slug: string
}

export interface PickaxeDetail {
  pickaxeId: number
  pickaxeName: string
  slug: string
  mines: MineItem[]
}
