/**
 * Forum Types - Backend API Response Structures
 * Backend: backend/app/Http/Resources/Forum/ForumResource.php
 * Convention: camelCase for all fields
 */

// ============================================================================
// NODE TYPES (Category/Subcategory)
// ============================================================================

export interface ForumNode {
  id: number
  parentId: number | null
  nodeType: 'category' | 'forum' | 'link'
  title: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  displayOrder: number
  isLocked: boolean
  isPrivate: boolean
  // Only for Forum type
  topicCount?: number
  postCount?: number
  lastTopic?: LastTopicInfo | null
  // Only for Link type
  externalUrl?: string
  // Children (Category and Forum can have children, Link cannot)
  children?: ForumNode[]
}

export interface LastTopicInfo {
  id: number
  title: string
  slug: string
  updatedAt: string | null
}

export interface BreadcrumbItem {
  title: string
  url?: string
  routeName: string | null
  routeParams: Record<string, string>
  icon?: string | null
  nodeType?: string | null
}

export interface PathItem {
  id: number
  title: string
  slug: string
  nodeType: string
  icon?: string | null
}

// ============================================================================
// TOPIC TYPES
// ============================================================================

export interface ForumTopic {
  id: number
  title: string
  slug: string
  content?: string
  contentPreview?: string
  viewCount: number
  postCount: number
  isPinned: boolean
  isLocked: boolean
  prefix: TopicPrefix | null
  author: TopicAuthor
  node: TopicNode
  lastPost: LastPostInfo | null
  lastPostUser?: LastPostUser | null
  createdAt: string
  createdAtHuman: string
}

export interface TopicDetail extends ForumTopic {
  status: string
  isApproved?: boolean
  updatedAt: string
}

export interface TopicAuthor {
  id: number
  displayName: string
  avatar: string | null
  topicCount?: number
  postCount?: number
  reputationScore?: number
}

export interface TopicNode {
  id: number
  title: string
  slug: string
  color: string
  icon?: string | null
  nodeType?: string
}

export interface TopicPrefix {
  id: number
  name: string
  slug: string
  color: string
  nodeId?: number
  displayOrder?: number
  isActive?: boolean
}

export interface LastPostInfo {
  userId: number
  createdAt: string
  createdAtHuman: string
}

export interface LastPostUser {
  id: number
  displayName: string
}

// ============================================================================
// POST TYPES
// ============================================================================

export interface ForumPost {
  id: number
  topicId: number
  content: string
  contentPreview?: string
  parentPostId: number | null
  status: string
  editCount: number
  editedAt: string | null
  editedAtHuman?: string | null
  editReason: string | null
  author: PostAuthor
  editedBy: PostEditor | null
  createdAt: string
  createdAtHuman: string
  // Reactions
  likeCount?: number
  dislikeCount?: number
  userReaction?: 'like' | 'dislike' | null
  // Delete info (for moderators)
  deletedAt?: string | null
  deletedBy?: PostEditor | null
  deleteReason?: string | null
}

export interface PostAuthor {
  id: number
  displayName: string
  avatar: string | null
  topicCount: number
  postCount: number
  reputationScore: number
  signature: string | null
}

export interface PostEditor {
  id: number
  displayName: string
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface ForumUser {
  id: number
  gameAccountId: number
  displayName: string
  avatar: string | null
  signature: string | null
  bio: string | null
  website: string | null
  location: string | null
  topicCount: number
  postCount: number
  reputationScore: number
  status: string
  lastActivityAt: string | null
  lastActivityAtHuman?: string | null
  createdAt: string
  roles?: ForumUserRole[]
}

export interface ForumUserRole {
  id: number
  name: string
  slug: string
  description?: string
  color: string
  textColor?: string
  icon?: string
  priority: number
  isDefault: boolean
}

// ============================================================================
// STATS TYPES
// ============================================================================

export interface ForumStats {
  totalTopics: string
  totalPosts: string
  totalUsers: string
  newestUser: NewestUserInfo | null
}

export interface NewestUserInfo {
  id: number
  displayName: string
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface Pagination {
  currentPage: number
  perPage: number
  hasMore: boolean
}

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginatedData<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ForumIndexResponse {
  hierarchy: ForumNode[]
  recentTopics: ForumTopic[]
  stats: ForumStats
  breadcrumbs: BreadcrumbItem[]
  userCan?: {
    createForumProfile: boolean
  }
}

export interface NodeDetailResponse {
  node: ForumNode
  path: PathItem[]
  childNodes: ForumNode[]
  topics: PaginatedData<ForumTopic> | null
  breadcrumbs: BreadcrumbItem[]
  userCan: {
    createTopic: boolean
  }
}

/**
 * Topic page user permissions (granular)
 */
export interface TopicUserCan {
  reply: boolean
  edit: boolean
  delete: boolean
  pin: boolean
  lock: boolean
  move: boolean
  react: boolean
  restore: boolean
  report: boolean
  editOwnPost: boolean
  editAnyPost: boolean
  deleteOwnPost: boolean
  deleteAnyPost: boolean
}

export interface TopicDetailResponse {
  topic: TopicDetail
  posts: PaginatedData<ForumPost>
  path: PathItem[]
  breadcrumbs: BreadcrumbItem[]
  userCan: TopicUserCan
  currentUserId: number | null
}

export interface UserProfileResponse {
  user: ForumUser
  roles: ForumUserRole[]
  breadcrumbs: BreadcrumbItem[]
}

export interface UserTopicsResponse {
  user: {
    id: number
    displayName: string
    avatar: string | null
  }
  topics: PaginatedData<ForumTopic>
}

export interface UserPostsResponse {
  user: {
    id: number
    displayName: string
    avatar: string | null
  }
  posts: PaginatedData<SearchPost>
}

export interface SearchResponse {
  query: string
  type: string
  topics: ForumTopic[]
  posts: SearchPost[]
  topicsCount: number
  postsCount: number
}

export interface SearchPost {
  id: number
  topicId: number
  content: string
  contentPreview: string
  topic?: {
    id: number
    title: string
    slug: string
  }
  author: {
    id: number
    displayName: string
    avatar: string | null
  }
  createdAt: string
  createdAtHuman: string
}

export interface SearchFilters {
  q: string
  type: 'all' | 'topics' | 'posts'
  nodeId: number | null
  userId: number | null
  page: number
}
