export interface Player {
  userId: number
  userName: string
  userSlug: string
  level: number
  rebirthLevel: number
  className: string
  classIcon: string
  nationText: string
  loyalty: number
  loyaltyMonthly: number
  formattedLoyalty: string
  formattedKnightsDonatedNP: string
  formattedLoyaltyMonthly: string
  personalRank: number
  knightsRank: number
  symbol: string
  titleName: string | null
  fameText: string
  fame: number
  rank: number
  exp: number
  reqExp: number
}

export interface Clan {
  clanId: number
  clanName: string
  nation: number
  nationText: string
  flag: number
  clanSymbol: string
  clanLevelText: string
  totalPoints: number
  formattedTotalPoints: string
  clanPointFund: number
  formattedClanPointFund: string
  members: number
  highestLevel: number
  averageLevel: number
  clanIcon: string | null
}

export interface ClanProfileProps {
  clan: Clan
  members: Player[]
}

export interface MemberRowProps {
  player: Player
}

export interface MembersListProps {
  members: Player[]
}
