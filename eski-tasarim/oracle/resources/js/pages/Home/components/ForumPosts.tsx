import { Icon } from '@/components/shared/icon'
import type { ForumPost } from './types'

interface ForumPostsProps {
  posts: ForumPost[]
}

export function ForumPosts({ posts }: ForumPostsProps) {
  const { t } = useTranslation()

  if (!posts || posts.length === 0) return null

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
              <Icon name="ti ti-message-circle" size={18} className="text-ko-brand-primary" />
            </div>
            {t('home.forum.title')}
          </h2>
          <Link
            href={route('api.ko-forum-v2.index')}
            className="text-xs text-ko-brand-primary hover:text-ko-brand-secondary transition-colors font-semibold flex items-center gap-1 group/link"
          >
            {t('home.forum.view_all')}
            <Icon name="ti ti-arrow-right" size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={route('api.ko-forum-v2.topic.show', { slug: post.slug })}
              className="flex items-start gap-3 p-3 rounded-lg bg-ko-widget-bg/50 backdrop-blur-sm border border-ko-border-primary hover:border-ko-brand-primary/50 hover:bg-ko-widget-bg/80 transition-all duration-200 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-ko-border-primary group-hover:border-ko-brand-primary/30 transition-colors"
                style={{
                  backgroundColor: post.nodeColor ? `${post.nodeColor}20` : '#3b82f620',
                  borderColor: post.nodeColor ? `${post.nodeColor}40` : '#3b82f640',
                  color: post.nodeColor || '#3b82f6'
                }}
              >
                <Icon name={post.nodeIcon || 'ti ti-folder'} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm text-ko-text-primary group-hover:text-ko-brand-primary line-clamp-2 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <div
                    className="px-2 py-0.5 rounded border flex-shrink-0 text-[11px] font-semibold"
                    style={{
                      backgroundColor: post.nodeColor ? `${post.nodeColor}40` : '#C48C4740',
                      color: post.nodeColor || '#C48C47',
                      borderColor: post.nodeColor ? `${post.nodeColor}60` : '#C48C4760'
                    }}
                  >
                    {post.nodeName}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-ko-text-muted">
                  <span className="text-ko-brand-primary font-semibold truncate">{post.displayName}</span>
                  <span>•</span>
                  <span className="flex-shrink-0">{post.postCount} {t('home.forum.replies')}</span>
                  {post.lastPostAt && (
                    <>
                      <span>•</span>
                      <span className="flex-shrink-0">{post.lastPostAt}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
