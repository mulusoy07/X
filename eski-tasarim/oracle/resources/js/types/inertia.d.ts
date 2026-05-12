/**
 * Inertia Shared Props Types
 * 
 * These props are available on every page via usePage().props
 */

export interface User {
  id: number
  name: string
  email: string
}

export interface GameUser {
  accountName: string
  balance: number
}

export interface CdnConfig {
  url: string
  assets: string
  storage: string
}

export interface AppConfig {
  name: string
  url: string
  locale: string
}

export interface ZiggyConfig {
  url: string
  port: number | null
  defaults: Record<string, any>
  routes: Record<string, any>
  location: string
}

export interface FlashMessages {
  success?: string
  error?: string
  info?: string
  warning?: string
}

// Layout Types
export interface SocialLink {
  name: string
  icon: string
  url: string
  image: string | null
  color: string
  'background-color': string
}

export interface LayoutConfig {
  copyright: string
  primary_color: string
  primary_color_hover: string
  breadcrumb: {
    enabled: boolean
    separator: string
  }
  timezone: string
  enable_server_list: boolean
  enable_server_selection: boolean
  show_server_status: boolean
  game_feed_enabled: boolean
  game_feed_default_open: boolean
  style: 'boxed' | 'full-width'
}

export interface SeoConfig {
  site_name: string
  site_logo: string
  site_logo_srcset: string | null
  site_footer_logo: string
  site_footer_logo_srcset: string | null
}

export interface CookieConsent {
  style: string
  message: string
  button_text: string
  learn_more_url: string
  learn_more_text: string
  background_color: string
  text_color: string
  max_width: number
  show_reject_button: boolean
  show_customize_button: boolean
}

export interface MenuItem {
  icon?: string
  text: string
  href: string
  badge?: string | null
}

export interface MenuColumn {
  title: string
  items: MenuItem[]
}

export interface Menu {
  title: string
  href?: string
  columns?: MenuColumn[]
  featuredImage?: string | null
  featuredTitle?: string | null
  featuredDescription?: string | null
  featuredButtonText?: string | null
  featuredButtonHref?: string | null
}

export interface ServerStatus {
  is_active: boolean
  response_time: number | null
}

export interface Server {
  server_no: string
  server_name: string
  server_description: string
  maintenance_mode: boolean
  capacity: number
  online_players: number
  capacity_percentage: number
  status: {
    game_server: ServerStatus
    login_server: ServerStatus
  }
  capacity_text: string
  online_text: string
  offline_text: string
  game_server_text: string
  login_server_text: string
  maintenance_text: string
  server_status_text: string
}

export interface LayoutData {
  social_links: SocialLink[]
  config: LayoutConfig
  seo: SeoConfig
  cookie_consent: CookieConsent | null
  maintenance: any | null
  menu: Menu[]
  auth: {
    user: GameUser | null
  }
  servers: Server[]
  plugins: {
    forum: boolean
    blog: boolean
    member: boolean
    slider: boolean
    game: boolean
    gallery: boolean
    bug_tracker: boolean
  }
}

/**
 * Base PageProps - Available on all pages
 * 
 * Note: Index signature is required by Inertia
 */
export interface PageProps {
  app: AppConfig
  cdn: CdnConfig
  layout: LayoutData
  ziggy: ZiggyConfig
  success?: string
  error?: string
  info?: string
  warning?: string
  verificationToken?: string
  
  // Index signature for dynamic props
  [key: string]: any
}

/**
 * Helper type for page-specific props
 * 
 * @example
 * interface BlogIndexProps extends InertiaPageProps {
 *   posts: Post[]
 * }
 */
export type InertiaPageProps<T = Record<string, unknown>> = PageProps & T
