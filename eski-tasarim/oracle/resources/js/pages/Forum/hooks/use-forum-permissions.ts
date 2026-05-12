import { useMemo } from 'react'

export type ForumPermission =
  | 'forum.topics'
  | 'forum.topics.create'
  | 'forum.topics.edit_own'
  | 'forum.topics.delete_own'
  | 'forum.topics.edit_any'
  | 'forum.topics.delete_any'
  | 'forum.topics.move'
  | 'forum.topics.pin'
  | 'forum.topics.lock'
  | 'forum.posts'
  | 'forum.posts.create'
  | 'forum.posts.edit_own'
  | 'forum.posts.delete_own'
  | 'forum.posts.edit_any'
  | 'forum.posts.delete_any'
  | 'forum.posts.react'
  | 'forum.moderation'
  | 'forum.moderation.approve'
  | 'forum.moderation.view_deleted'
  | 'forum.moderation.restore'
  | 'forum.moderation.ban_user'
  | 'forum.moderation.view_reports'
  | 'forum.moderation.handle_reports'
  | 'forum.moderation.report'
  | 'forum.admin'
  | 'forum.admin.manage_nodes'
  | 'forum.admin.manage_roles'
  | 'forum.admin.manage_settings'
  | 'forum.admin.view_logs'
  | 'forum.admin.manage_prefixes'

export interface UseForumPermissionsOptions {
  permissions: string[]
}

export interface UseForumPermissionsReturn {
  permissions: string[]
  can: (permission: ForumPermission | string) => boolean
  canAny: (permissions: (ForumPermission | string)[]) => boolean
  canAll: (permissions: (ForumPermission | string)[]) => boolean
  isModerator: boolean
  isAdmin: boolean
  canCreateTopic: boolean
  canEditOwnTopic: boolean
  canEditAnyTopic: boolean
  canDeleteOwnTopic: boolean
  canDeleteAnyTopic: boolean
  canMoveTopic: boolean
  canPinTopic: boolean
  canLockTopic: boolean
  canCreatePost: boolean
  canEditOwnPost: boolean
  canEditAnyPost: boolean
  canDeleteOwnPost: boolean
  canDeleteAnyPost: boolean
  canReact: boolean
  canReport: boolean
  canViewReports: boolean
  canHandleReports: boolean
  canApproveContent: boolean
  canViewDeleted: boolean
  canRestore: boolean
  canBanUser: boolean
}

export function useForumPermissions({
  permissions,
}: UseForumPermissionsOptions): UseForumPermissionsReturn {
  const permissionSet = useMemo(() => new Set(permissions), [permissions])

  const can = (permission: ForumPermission | string): boolean => {
    if (permissionSet.has(permission)) return true
    for (const p of permissions) {
      if (p.endsWith('*') && permission.startsWith(p.slice(0, -1))) return true
    }
    return false
  }

  const canAny = (perms: (ForumPermission | string)[]): boolean => perms.some((p) => can(p))
  const canAll = (perms: (ForumPermission | string)[]): boolean => perms.every((p) => can(p))

  const isModerator = canAny([
    'forum.moderation',
    'forum.moderation.approve',
    'forum.topics.edit_any',
    'forum.posts.edit_any',
  ])
  const isAdmin = can('forum.admin')

  return {
    permissions,
    can,
    canAny,
    canAll,
    isModerator,
    isAdmin,
    canCreateTopic: can('forum.topics.create'),
    canEditOwnTopic: can('forum.topics.edit_own'),
    canEditAnyTopic: can('forum.topics.edit_any'),
    canDeleteOwnTopic: can('forum.topics.delete_own'),
    canDeleteAnyTopic: can('forum.topics.delete_any'),
    canMoveTopic: can('forum.topics.move'),
    canPinTopic: can('forum.topics.pin'),
    canLockTopic: can('forum.topics.lock'),
    canCreatePost: can('forum.posts.create'),
    canEditOwnPost: can('forum.posts.edit_own'),
    canEditAnyPost: can('forum.posts.edit_any'),
    canDeleteOwnPost: can('forum.posts.delete_own'),
    canDeleteAnyPost: can('forum.posts.delete_any'),
    canReact: can('forum.posts.react'),
    canReport: can('forum.moderation.report'),
    canViewReports: can('forum.moderation.view_reports'),
    canHandleReports: can('forum.moderation.handle_reports'),
    canApproveContent: can('forum.moderation.approve'),
    canViewDeleted: can('forum.moderation.view_deleted'),
    canRestore: can('forum.moderation.restore'),
    canBanUser: can('forum.moderation.ban_user'),
  }
}

export const emptyPermissions: UseForumPermissionsReturn = {
  permissions: [],
  can: () => false,
  canAny: () => false,
  canAll: () => false,
  isModerator: false,
  isAdmin: false,
  canCreateTopic: false,
  canEditOwnTopic: false,
  canEditAnyTopic: false,
  canDeleteOwnTopic: false,
  canDeleteAnyTopic: false,
  canMoveTopic: false,
  canPinTopic: false,
  canLockTopic: false,
  canCreatePost: false,
  canEditOwnPost: false,
  canEditAnyPost: false,
  canDeleteOwnPost: false,
  canDeleteAnyPost: false,
  canReact: false,
  canReport: false,
  canViewReports: false,
  canHandleReports: false,
  canApproveContent: false,
  canViewDeleted: false,
  canRestore: false,
  canBanUser: false,
}
