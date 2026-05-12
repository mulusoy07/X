import { memo } from 'react'
import { Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { UserAvatar } from '../ui/UserAvatar'
import type { ForumTopic } from '../../types'

interface TopicCardProps {
  topic: ForumTopic
  showNode?: boolean
}

export const TopicCard = memo(function TopicCard({ topic, showNode = true }: TopicCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      href={route('api.ko-forum-v2.topic.show', { slug: topic.slug })}
      className="block p-4 hover:bg-ko-widget-bg/30 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <UserAvatar
          displayName={topic.author.displayName}
          avatar={topic.author.avatar}
          size="md"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {topic.isPinned && <Icon name="ti ti-pin" size={16} className="text-amber-500 flex-shrink-0" />}
            {topic.isLocked && <Icon name="ti ti-lock" size={16} className="text-red-500 flex-shrink-0" />}
            {topic.prefix && (
              <span
                className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                style={{
                  color: topic.prefix.color,
                  backgroundColor: `${topic.prefix.color}20`,
                }}
              >
                {topic.prefix.name}
              </span>
            )}
            <h3 className="text-base font-bold text-ko-text-primary group-hover:text-ko-brand-primary line-clamp-1">
              {topic.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-ko-text-muted">
            <span className="font-medium text-ko-text-primary">{topic.author.displayName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Icon name="ti ti-clock" size={12} />
              {topic.createdAtHuman}
            </span>
            {topic.lastPost && topic.lastPostUser && (
              <>
                <span>•</span>
                <span className="hidden sm:inline">{t('plugins.forum.page.last')}: {topic.lastPostUser.displayName}</span>
                <span className="hidden sm:inline">• {topic.lastPost.createdAtHuman}</span>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <div className="text-lg font-black text-ko-text-primary">{topic.postCount}</div>
            <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.reply')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-ko-brand-primary">{topic.viewCount}</div>
            <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.views')}</div>
          </div>
        </div>

        <Icon name="ti ti-chevron-right" size={20} className="text-ko-text-muted group-hover:text-ko-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </Link>
  )
})
