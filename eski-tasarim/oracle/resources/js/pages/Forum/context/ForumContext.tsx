import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { ForumNode, ForumTopic, ForumStats, BreadcrumbItem } from '../types'
import { useForumPermissions, type UseForumPermissionsReturn } from '../hooks/use-forum-permissions'

// === TYPES ===
export type { ForumNode, ForumTopic, ForumStats, BreadcrumbItem }

export interface MaintenanceData {
  isActive: boolean
  message: string
  startDate?: string
  endDate?: string
}

export interface UserStatus {
  isAuthenticated: boolean
  needsForumProfile: boolean
  forumUserId: number | null
  // Future: isBanned, banReason, banUntil, etc.
}

export interface UserCan {
  createForumProfile: boolean
  // Future: reply, createTopic, editPost, deletePost, etc.
}

export interface ForumContextData {
  hierarchy: ForumNode[]
  recentTopics: ForumTopic[]
  stats: ForumStats
  breadcrumbs: BreadcrumbItem[]
  maintenance: MaintenanceData
  userStatus: UserStatus
  userCan: UserCan
  permissions: string[] // Raw permissions from API
}

/**
 * Extended context that includes computed permission helpers
 */
export interface ForumContextValue extends Omit<ForumContextData, 'permissions'> {
  permissions: UseForumPermissionsReturn // Enhanced permission helpers
}

// === CONTEXT ===
const ForumContext = createContext<ForumContextValue | null>(null)

// === PROVIDER ===
export function ForumProvider({
  children,
  data,
}: {
  children: ReactNode
  data: ForumContextData
}) {
  // Create permission helpers from the permissions array (default to empty array if undefined)
  const permissionHelpers = useForumPermissions({
    permissions: data.permissions ?? [],
  })

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo<ForumContextValue>(
    () => ({
      ...data,
      permissions: permissionHelpers,
    }),
    [data, permissionHelpers]
  )

  return <ForumContext.Provider value={contextValue}>{children}</ForumContext.Provider>
}

// === HOOKS ===

/**
 * Get the full forum context including permissions
 */
export function useForumContext() {
  const context = useContext(ForumContext)
  if (!context) {
    throw new Error('useForumContext must be used within ForumProvider')
  }
  return context
}

/**
 * Shorthand hook to get only the permission helpers
 */
export function usePermissions(): UseForumPermissionsReturn {
  const context = useForumContext()
  return context.permissions
}
