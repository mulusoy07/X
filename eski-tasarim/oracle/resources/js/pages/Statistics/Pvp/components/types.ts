export interface KdRarity {
  key: string
  color: string
  textColor: string
}

export interface PvpPlayer {
  rank: number
  userId: number
  userName: string
  userSlug: string
  nationText: string
  classIcon: string
  className: string
  kills: number
  deaths: number
  kd: number
}

export interface PvpFilters {
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

// Nation comparison (PvP specific - K/D based)
export interface PvpNationStats {
  totalKills: number
  uniqueWarriors: number
  avgKd: number
  topKiller: string | null
}

export interface PvpNationComparison {
  karus: PvpNationStats
  human: PvpNationStats
}

// Daily trend data (same as PvE)
export interface DailyData {
  date: string
  label: string
  totalKills: number
  karusKills: number
  humanKills: number
}

// K/D ratio rarity helper - returns translation key
export function getKdRarity(kd: number): KdRarity {
  if (kd >= 3.0) {
    return {
      key: 'very_high',
      color: '#10B981',
      textColor: '#FFFFFF'
    }
  }
  if (kd >= 2.0) {
    return {
      key: 'high',
      color: '#F59E0B',
      textColor: '#FFFFFF'
    }
  }
  if (kd >= 1.0) {
    return {
      key: 'medium',
      color: '#F97316',
      textColor: '#FFFFFF'
    }
  }
  if (kd >= 0.5) {
    return {
      key: 'low',
      color: '#EF4444',
      textColor: '#FFFFFF'
    }
  }
  return {
    key: 'very_low',
    color: '#991B1B',
    textColor: '#FFFFFF'
  }
}
