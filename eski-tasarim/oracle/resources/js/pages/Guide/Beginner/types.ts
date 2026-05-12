export interface ClassInfo {
  classKey: string
  className: string
  classIcon: string
}

export interface CharacterStats {
  charLevel: number
  charExp: number
  charGold: number
  loyalty: number
}

export interface StatPoints {
  freePoints: number
  strength: number
  health: number
  dexterity: number
  intelligence: number
  magicPower: number
}

export interface SkillPoints {
  skillPointFree: number
  skillPointCat1: number
  skillPointCat2: number
  skillPointCat3: number
  skillPointMaster: number
}

export interface StartingItem {
  slotId: number
  itemId: number
  itemName: string
  itemCount: number
}

export interface WelcomeGift {
  itemId: number
  itemName: string
  itemCount: number
  giftSubject: string | null
  giftMessage: string | null
}

export interface ClassData extends ClassInfo {
  character: CharacterStats
  stats: StatPoints
  skills: SkillPoints
  startingItems: StartingItem[]
  welcomeGifts: WelcomeGift[]
}
