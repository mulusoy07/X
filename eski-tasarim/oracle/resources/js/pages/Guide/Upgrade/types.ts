export interface UpgradeRate {
  itemGrade: number
  successRate: string
  rarity: {
    text: string
    color: string
    textColor: string
  }
  itemReqCoins: string
  itemRate: number
}

export interface TypeGroup {
  typeName: string
  rates: UpgradeRate[]
}

export interface ScrollListItem {
  scrollId1: number
  scrollId2: number | null
  itemName1: string
  itemName2: string | null
  scrollName: string
  slug: string
  hasDouble: boolean
  rateCount: number
}

export interface ScrollDetail {
  scrollId1: number
  scrollId2: number | null
  itemName1: string
  itemName2: string | null
  scrollName: string
  slug: string
  hasDouble: boolean
  rateCount: number
  ratesByType: TypeGroup[]
}
