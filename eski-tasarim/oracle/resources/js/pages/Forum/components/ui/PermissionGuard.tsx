import type { ReactNode } from 'react'
import type { ForumPermission } from '@/hooks'

interface PermissionGuardProps {
  /**
   * User permissions
   */
  permissions: string[]

  /**
   * Required permission(s)
   */
  require: ForumPermission | ForumPermission[]

  /**
   * Multiple permission check mode
   * - 'all': Must have all permissions (AND)
   * - 'any': Must have any of the permissions (OR)
   * @default 'any'
   */
  mode?: 'all' | 'any'

  /**
   * Content to show when permission is granted
   */
  children: ReactNode

  /**
   * Content to show when permission is denied (optional)
   */
  fallback?: ReactNode
}

/**
 * Conditional rendering component for permission checks
 *
 * @example
 * ```tsx
 * // Single permission check
 * <PermissionGuard permissions={userPermissions} require="forum.topics.create">
 *   <CreateTopicButton />
 * </PermissionGuard>
 *
 * // Multiple permissions (OR)
 * <PermissionGuard
 *   permissions={userPermissions}
 *   require={['forum.topics.edit_own', 'forum.topics.edit_any']}
 *   mode="any"
 * >
 *   <EditButton />
 * </PermissionGuard>
 *
 * // With fallback
 * <PermissionGuard
 *   permissions={userPermissions}
 *   require="forum.moderation"
 *   fallback={<span>Unauthorized</span>}
 * >
 *   <ModPanel />
 * </PermissionGuard>
 * ```
 */
export function PermissionGuard({
  permissions,
  require,
  mode = 'any',
  children,
  fallback = null,
}: PermissionGuardProps) {
  const requiredPerms = Array.isArray(require) ? require : [require]
  const permissionSet = new Set(permissions)

  /**
   * Check a single permission (with wildcard support)
   */
  const hasPermission = (permission: string): boolean => {
    // Direct match
    if (permissionSet.has(permission)) {
      return true
    }

    // Wildcard check
    for (const p of permissions) {
      if (p.endsWith('*')) {
        const prefix = p.slice(0, -1)
        if (permission.startsWith(prefix)) {
          return true
        }
      }
    }

    return false
  }

  // Check based on mode
  const hasAccess =
    mode === 'all'
      ? requiredPerms.every(hasPermission)
      : requiredPerms.some(hasPermission)

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Short usage aliases
 */
export function Can({
  permission,
  permissions,
  children,
  fallback,
}: {
  permission: ForumPermission | ForumPermission[]
  permissions: string[]
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGuard
      permissions={permissions}
      require={permission}
      mode="any"
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  )
}

/**
 * Moderator check
 */
export function IfModerator({
  permissions,
  children,
  fallback,
}: {
  permissions: string[]
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGuard
      permissions={permissions}
      require={[
        'forum.moderation',
        'forum.moderation.approve',
        'forum.topics.edit_any',
        'forum.posts.edit_any',
      ]}
      mode="any"
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  )
}

/**
 * Admin check
 */
export function IfAdmin({
  permissions,
  children,
  fallback,
}: {
  permissions: string[]
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGuard
      permissions={permissions}
      require="forum.admin"
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  )
}
