import { Link } from '@inertiajs/react'
import type { ForumStats } from '../../types'


interface NewestMemberProps {
  stats: ForumStats
}

export function NewestMember({ stats }: NewestMemberProps) {
  const { t } = useTranslation()

  if (!stats.newestUser) {
    return null
  }

  const member = stats.newestUser

  return (
    <div className="relative bg-gradient-to-br from-ko-brand-primary/10 via-ko-brand-secondary/5 to-transparent border border-ko-brand-primary/30 rounded-2xl p-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ko-brand-primary/20 to-transparent blur-3xl" />
      <div className="relative">
        <h3 className="text-sm font-bold text-ko-text-primary mb-3 flex items-center gap-2">
          <span className="text-xl">🎉</span>
          {t('plugins.forum.components.newest_member.title')}
        </h3>
        <Link
          href={route('api.ko-forum-v2.user.profile', { id: member.id, username: member.displayName })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-black text-white">
              {member.displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-ko-text-primary truncate">
              {member.displayName}
            </div>
            <div className="text-xs text-ko-text-muted">
              {t('plugins.forum.components.newest_member.welcome')} 👋
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
