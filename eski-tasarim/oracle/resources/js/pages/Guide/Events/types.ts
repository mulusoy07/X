export interface EventReward {
  id: number
  eventType: number
  nation: number
  levelMin: number
  levelMax: number
  rebirthLevelMin: number
  rebirthLevelMax: number
  rewardNote: string | null
  itemId: number
  itemCount: number
  itemExpiration: string | null
  itemName: string | null
}

export interface EventTypeListItem {
  eventId: number
  eventKey: string
  eventName: string
  eventDescription: string
  image: string | null
  imageSrcset: string | null
  slug: string
  count: number
}

export interface BaseEventData {
  eventDay: number
  eventHour: number
  eventMinute: number
}

export interface BifrostData extends BaseEventData {
  eventTime: number
}

export interface BorderDefenseWarData extends BaseEventData {
  registerTime: number
  eventTime: number
  minLevel: number
  maxLevel: number
  finishScore: number
  killScore: number
  monumentScore: number
  monumentType: number
  reqCoins: number
  reqLoyalty: number
}

export interface CastleSiegeWarData extends BaseEventData {
  eventTime: number
  minimumClanFlag: number
  maxTeleportClanMember: number
  rankingType: number
  getLoyaltySameNation: number
  monumentHealing: number
  allianceAttack: number
}

export interface ChaosData extends BaseEventData {
  registerTime: number
  eventTime: number
  minLevel: number
  maxLevel: number
  reqCoins: number
  reqLoyalty: number
  reqItemId: number
  reqItemCount: number
}

export interface DeathmatchData extends BaseEventData {
  registerTime: number
  eventTime: number
  sendToEventZone: number
}

export interface DynamicZoneData extends BaseEventData {
  eventTime: number
}

export interface ForgottenTempleData extends BaseEventData {
  minLevel: number
  maxLevel: number
  categoryId: number
}

export interface JuraidMountainData extends BaseEventData {
  registerTime: number
  eventTime: number
  minLevel: number
  maxLevel: number
  finishScore: number
  killScore: number
  reqCoins: number
  reqLoyalty: number
}

export interface KrowazData extends BaseEventData {
  eventTime: number
}

export interface MadClassData extends BaseEventData {
  eventTime: number
}

export interface SemiWarData extends BaseEventData {
  battleZone: number
  battleZoneName: string
  battleTime: number
}

export interface StrongholdSiegeWarData extends BaseEventData {
  registerTime: number
  eventTime: number
  maxClanCount: number
  minimumClanFlag: number
  minOnlineClanMember: number
  maxTeleportClanMember: number
  zoneId: number
  zoneName: string
  reqRegisterCoins: number
}

export interface UnderTheCastleData extends BaseEventData {
  eventTime: number
}

export interface WarData extends BaseEventData {
  minLevel: number
  maxLevel: number
  battleZone: number
  battleZoneName: string
  battleTime: number
  battleInvade: number
  battleSelectCaptain: number
}

export type EventData =
  | WarData
  | ForgottenTempleData
  | BifrostData
  | CastleSiegeWarData
  | BorderDefenseWarData
  | ChaosData
  | JuraidMountainData
  | UnderTheCastleData
  | DeathmatchData
  | KrowazData
  | SemiWarData
  | StrongholdSiegeWarData
  | DynamicZoneData
  | MadClassData

export interface SelectedEvent {
  eventId: number
  eventKey: string
  eventName: string
  eventDescription: string
  content: string | null
  image: string | null
  imageSrcset: string | null
  slug: string
  data: EventData[]
  rewards: EventReward[]
}
