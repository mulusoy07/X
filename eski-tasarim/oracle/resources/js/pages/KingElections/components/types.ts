export interface Voter {
  userId: number
  userName: string
  userSlug: string
  clanId: number
  clanName: string
  clanSlug: string
  clanIcon: string | null
  className: string
  classIcon: string
  date: string
}

export interface VoteCandidate {
  userId: number
  userName: string
  userSlug: string
  clanId: number
  clanName: string
  clanSlug: string
  clanIcon: string | null
  className: string
  classIcon: string
  nationText: string
  rank: number
  votes: number
  formattedVotes: string
  percentage: number
  nation: 'karus' | 'human'
  voters: Voter[]
}
