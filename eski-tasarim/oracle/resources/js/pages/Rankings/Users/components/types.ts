export interface Player {
  userId: number
  userName: string
  userSlug: string
  clanSlug: string
  level: number
  rebirthLevel: number
  className: string
  classIcon: string
  nationText: string
  expPercentage: number
  formattedLoyalty: string
  symbol: string
  clanId: number
  clanName: string | null
  clanIcon: string | null
  titleName: string | null
  rank: number
}

export interface Filters {
  nation: number
  job: number
  sortBy: string
  userName: string
  page?: number
}
