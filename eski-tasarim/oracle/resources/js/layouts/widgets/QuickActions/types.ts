export interface ServerInfo {
  server_no: string
  server_name: string
  server_description: string
  maintenance_mode: boolean
  capacity: number
  online_players: number
  capacity_percentage: number
  status: {
    game_server: { is_active: boolean; response_time: number | null }
    login_server: { is_active: boolean; response_time: number | null }
  }
}

export interface SocialLink {
  name: string
  icon: string
  url: string
}
