export interface Mob {
  ssid: number
  strName: string
  boss: number
  slug: string
}

export interface Zone {
  zoneId: number
  zoneName: string
  mapSize: number
}

export interface SpawnLocation {
  posX: number
  posZ: number
  numNpc: number
}

export interface SpawnsByZone {
  zoneId: number
  zoneName: string
  spawns: SpawnLocation[]
}

export interface DropItem {
  itemId: number
  itemName: string | null
  itemCount?: number
  dropRate: string
}

export interface DropGroup {
  groupId: number
  groupDropRate: string
  itemCount: number
  items: DropItem[]
}

export interface MobDetail {
  mob: {
    ssid: number
    strName: string
    pictureId: number
    level: number
    hpPoint: string
    defense: string
    money: string
    boss: number
  }
  spawnsByZone: SpawnsByZone[]
  drops: {
    normal: DropItem[]
    groups: DropGroup[]
  }
}

export interface Filters {
  zoneId: number
  strName?: string | null
  boss?: number | null
}
