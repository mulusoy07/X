export interface Clan {
  clanId: number
  clanName: string
  clanSlug: string
  nation: number
  nationText: string
  flag: number
  clanSymbol: string
  clanLevelText: string
  points: number
  formattedPoints: string
  clanPointFund: number
  formattedClanPointFund: string
  members: number
  clanIcon: string | null
  rank: number
  animation: {
    grade: number
  }
}

export interface Filters {
  nation: number
  sortBy: string
  clanName: string
  page?: number
}
