export interface ItemData {
  slotId: number
  itemId: number
}

export interface UserType {
  userId: number
  userName: string
  userSlug: string
  clanSlug: string
  level: number
  className: string
  classIcon: string
  nationText: string
  exp: number
  reqExp: number
  formattedExp: string
  rebirthLevel: number
  titleName: string | null
  loyalty: number
  loyaltyMonthly: number
  formattedLoyalty: string
  formattedLoyaltyMonthly: string
  strong: number
  sta: number
  dex: number
  intel: number
  cha: number
  points: number
  hp: number
  mp: number
  zone: number
  zoneName: string
  mapSize: number
  posX: number
  posZ: number
  posY: number
  mannerPoint: number
  symbol: string
  tag: string | null
  tagColorR: number
  tagColorG: number
  tagColorB: number
  tagColorA: number
  playTime: string
  monsterKillCount: number
  userKillCount: number
  userDeathCount: number
  equipmentItems: ItemData[]
  cospreItems: ItemData[]
  createTime: string
  updateTime: string | null
  clanId: number
  clanName: string
  clanIcon: string | null
  flag: number | null
  clanPointFund: number | null
  clanRacePoint: number | null
  fame: number | null
  knightsDonatedNP: number | null
  authority: number | null
  authorityText: string | null
}

export interface UserProfileProps {
  user: UserType
}

export interface ItemSlotProps {
  slotId: number
  items: ItemData[]
}

export interface InteractiveMapProps {
  zone: number
  posX: number
  posZ: number
  zoneName: string
  mapSize: number
}
