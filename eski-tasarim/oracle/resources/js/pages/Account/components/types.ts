export interface AuthorityInfo {
  text: string
  className: string
  iconName: string
}

export interface Character {
  UserID: number
  UserSlug: string
  UserName: string
  Level: number
  ClassName: string
  ClassIcon: string
  NationText: string
  Symbol: string | null
  Exp: number
  RequiredExp: number
  FormattedLoyalty: string
  RebirthLevel: number
  TitleName: string | null
  ClanID: number
  ClanName: string
  ClanSlug: string
  ClanIcon: string | null
  GameCash: string
  Rank: number
}

export interface AccountData {
  AccountName: string
  strAccountID?: string
  Authority: number
  AuthorityTime: string | null
  Balance: string
  Email: string
  GSMNumber: string | null
  LastLoginTime: string
}

export interface PremiumData {
  type: string
  endDate: string
}
