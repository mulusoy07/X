export type MessageFilter = string

export interface GameFeedCategory {
  key: string
  label: string
  icon: string
  color: string
}

export interface GameFeedMeta {
  total: number
}

export interface GameMessage {
  id: number
  type: string
  message: string
  timestamp: string
  time_ago: string
}

export interface GameFeedData {
  categories: GameFeedCategory[]
  messages: GameMessage[]
  meta: GameFeedMeta
}

export interface GameFeedApiResponse {
  error: boolean
  data: GameFeedData | null
  message: string | null
}
