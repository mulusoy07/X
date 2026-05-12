export interface HomeData {
  sliders: SliderItem[];
  topUsers: TopUser[];
  topClans: TopClan[];
  topKings: KingEntry[];
  gameMasters: StaffMember[];
  forumPosts: ForumPost[];
  blogPosts: BlogPost[];
  notices: NoticeItem[];
  gameEvents: GameEvent[];
  bio: BioData;
}

// Slider tipleri
export interface SliderItem {
  id: string;
  title: string;
  description?: string;
  link?: string;
  image: string;
  imageSrcset?: string | null;
  poster?: string;
  posterSrcset?: string | null;
  buttonText?: string;
  buttonIcon?: string;
  buttonUrl?: string;
  badgeText?: string;
  badgeIcon?: string;
  order: number;
}

// Top User tipleri
export interface TopUser {
  userId: number;
  userName: string;
  userSlug: string;
  level: number;
  nationText: string;
  loyaltyFormatted: string;
  loyaltyMonthlyFormatted: string;
  symbol: string;
  classIcon: string;
  classText: string;
  clanId: number;
  clanName?: string;
  clanSlug?: string;
  clanIcon?: string;
}

// Top Clan tipleri
export interface TopClan {
  idNum: number;
  idName: string;
  clanSlug: string;
  nationText: string;
  clanIcon?: string;
  loyaltyMonthlyFormatted: string;
  gradeIcon: string;
  gradeText: string;
  leaderUserId: number;
  leaderUserName: string;
  leaderSlug: string;
  memberCount: number;
}

// Top King tipleri
export interface KingEntry {
  userId: number;
  userName: string;
  userSlug: string;
  level: number;
  nationText: string;
  loyaltyFormatted: string;
  loyaltyMonthlyFormatted: string;
  symbol: string;
  classIcon: string;
  classText: string;
  clanId: number;
  clanName?: string;
  clanSlug?: string;
  clanIcon?: string;
  isOnline: boolean;
}

// Game Master tipleri
export interface StaffMember {
  userId: number;
  userName: string;
  userSlug: string;
  nationText: string;
  classIcon: string;
  isOnline?: boolean;
  role: GameMasterRole;
}

export interface GameMasterRole {
  type: string;
  text: string;
  icon: string;
  color: string;
}

// Forum Post tipleri
export interface ForumPost {
  id: string;
  title: string;
  slug: string;
  displayName: string;
  nodeName: string;
  nodeIcon: string;
  nodeColor: string;
  postCount: number;
  viewCount: number;
  lastPostAt: string | null;
}

// Blog Post tipleri
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string | null;
  imageSrcset?: string | null;
  author: string | null;
  viewsCount: number;
  isFeatured: boolean;
  publishedAt: string;
  categoryName: string | null;
  categoryColor: string | null;
  categoryTextColor: string | null;
}

// Notice tipleri
export interface NoticeItem {
  id: number;
  text: string;
  order: number;
}

// Game Event tipleri
export interface GameEvent {
  eventId: string;
  eventName: string;
  slug: string;
  description: string;
  image: string | null;
  imageSrcset: string | null;
  eventDay: string;
  dayName: string;
  startTime: string;
  durationMinutes: string;
  status: string;
  statusCode: string;
  countdownMinutes: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// Bio tipleri
export interface BioData {
  title: string;
  subTitle: string;
  content: string;
  image: string;
  characterImage: string;
  separator: string;
  buttons: BioButton[];
}

export interface BioButton {
  text: string;
  url: string;
  icon: string;
  variant: string;
}
