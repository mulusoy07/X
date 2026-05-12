export interface DailyReward {
  dayIndex: number
  classType: number
  itemId: number
  itemCount: number
  itemDuration: number
  premiumItemId: number
  premiumItemCount: number
  premiumItemDuration: number
  itemName: string | null
  premiumItemName: string | null
}

export interface DailySettings {
  status: number
  resetDay: number
  reqLevel: number
  reqRebirthLevel: number
  reqLoyalty: number
}

export interface KillAssistReward {
  id: number
  killAssistCountMin: number
  killAssistCountMax: number
  rewardType: number
  itemId: number
  itemCount: number
  itemName: string | null
}

export interface OnlineReward {
  id: number
  zoneId: number
  zoneName: string
  nation: number
  levelMin: number
  levelMax: number
  rebirthLevelMin: number
  rebirthLevelMax: number
  rewardMinute: number
  oneTimeReward: number
  itemId: number
  itemCount: number
  itemName: string | null
}

export interface RewardTypeListItem {
  rewardId: number
  rewardKey: string
  rewardName: string
  rewardDescription: string
  image: string | null
  imageSrcset: string | null
  slug: string
  count: number
}

export type RewardData = DailyReward | KillAssistReward | OnlineReward

export interface SelectedReward {
  rewardId: number
  rewardKey: string
  rewardName: string
  rewardDescription: string
  content: string | null
  image: string | null
  imageSrcset: string | null
  slug: string
  data: {
    settings?: DailySettings
    rewards: RewardData[]
  } | null
}

export interface RewardSectionProps {
  reward: SelectedReward
}
