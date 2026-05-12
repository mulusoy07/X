// Player/Hunter types
export interface PvePlayer {
  rank: number
  userId: number
  userName: string
  userSlug: string
  nationText: string
  classIcon: string
  className: string
  kills: number
}

export interface PveFilters {
  nation: number
  job: number
  period: string
}

export interface PeriodOption {
  value: string
  label: string
  days: number
}

// Nations and Jobs from API (int-based like UserRanking)
export type NationsMap = Record<number, string>
export type JobsMap = Record<number, string>

// Summary statistics
export interface PveSummary {
  totalKills: number
  uniqueMonsters: number
  mostActiveZone: string
  mostActiveZoneKills: number
  avgDailyKills: number
  todayKills: number
  yesterdayKills: number
}

// Top monsters
export interface TopMonster {
  id: number
  name: string
  mobSlug: string
  zone: string
  zoneId: number
  kills: number
}

// Zone statistics
export interface ZoneStat {
  id: number
  name: string
  kills: number
  percentage: number
}

// Nation comparison
export interface NationStats {
  totalKills: number
  uniqueHunters: number
  avgKillsPerHunter: number
  topZone: string
}

export interface NationComparison {
  karus: NationStats
  human: NationStats
}

// Daily trend data
export interface DailyData {
  date: string
  label: string
  totalKills: number
  karusKills: number
  humanKills: number
}

// Full API response
export interface PveStatisticsData {
  rankings: PvePlayer[]
  filters: PveFilters
  nations: NationsMap
  jobs: JobsMap
  periods: PeriodOption[]
  hasMore: boolean
  summary: PveSummary
  topMonsters: TopMonster[]
  zoneStats: ZoneStat[]
  nationComparison: NationComparison
  dailyData: DailyData[]
}
