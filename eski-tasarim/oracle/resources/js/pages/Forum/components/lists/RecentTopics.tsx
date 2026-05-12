import { Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { UserAvatar } from '../ui/UserAvatar'
import type { ForumTopic } from '../../types'

interface RecentTopicsProps {
  topics: ForumTopic[]
}

export function RecentTopics({ topics }: RecentTopicsProps) {
  const { t } = useTranslation()

  if (!topics || topics.length === 0) {
    return (
      <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary p-8 text-center">
        <p className="text-ko-text-muted">{t('plugins.forum.page.no_topics_yet')}</p>
      </div>
    )
  }

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
            <Icon name="ti ti-message" size={16} className="text-ko-brand-primary" />
          </div>
          {t('plugins.forum.page.recent_topics')}
        </h2>
      </div>

      <div className="divide-y divide-ko-border-primary">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={route('api.ko-forum-v2.topic.show', { slug: topic.slug })}
            className="block p-4 hover:bg-ko-widget-bg/30 transition-colors group/topic"
          >
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <UserAvatar
                displayName={topic.author.displayName}
                avatar={topic.author.avatar}
                size="md"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {/* Status Icons - at the beginning */}
                  {topic.isPinned && <Icon name="ti ti-pin" size={14} className="text-amber-500 flex-shrink-0" />}
                  {topic.isLocked && <Icon name="ti ti-lock" size={14} className="text-ko-text-muted flex-shrink-0" />}

                  {topic.prefix && (
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex-shrink-0"
                      style={{
                        color: topic.prefix.color,
                        backgroundColor: `${topic.prefix.color}20`
                      }}
                    >
                      {topic.prefix.name}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-ko-text-primary group-hover/topic:text-ko-brand-primary line-clamp-1 flex-1 min-w-0">
                    {topic.title}
                  </h3>
                </div>

                {/* Category Breadcrumb */}
                {topic.node && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon
                      name={topic.node.icon || 'ti ti-folder'}
                      size={14}
                      className="text-ko-text-muted flex-shrink-0"
                    />
                    <span className="text-xs text-ko-text-muted">
                      {topic.node.title}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-ko-text-muted">
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
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:flex items-center gap-1 text-xs">
                  <Icon name="ti ti-message-circle" size={16} className="text-ko-text-muted" />
                  <span className="font-bold text-ko-text-primary">{topic.postCount}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 text-xs">
                  <Icon name="ti ti-eye" size={16} className="text-ko-text-muted" />
                  <span className="font-bold text-ko-text-primary">{topic.viewCount}</span>
                </div>
                <Icon name="ti ti-chevron-right" size={16} className="text-ko-text-muted group-hover/topic:text-ko-brand-primary group-hover/topic:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
