export interface ClanCreation {
  reqLevel: number
  reqCoins: number
  reqBankFlag: number
  reqBankPremium: number
}

export interface ClanCustomization {
  symbolGold: number
  symbolLoyalty: number
  capeColorGold: number
  capeColorLoyalty: number
}

export interface ClanLimits {
  maxClanUsers: number
  maxAssistants: number
  minDonatePoints: number
}

export interface ClanRank {
  gradeName: string
  gradeIcon: string
  requiredNP: number
  tier: 'training' | 'accredited' | 'royal'
  level: number
}

export interface ClanGuideData {
  creation: ClanCreation
  customization: ClanCustomization
  limits: ClanLimits
  ranks: ClanRank[]
}
