import { Head, Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import {
  PostCard,
  ReplyForm,
  ForumPagination,
  ForumBreadcrumb,
  TopicActions,
} from './components'
import { ErrorState } from '@/components/shared/ErrorState'

export default function Topic({ topic, posts, breadcrumbs, userCan, currentUserId, error }) {
  const { t } = useTranslation()

  if (error || !topic) {
    return <ErrorState message={t('plugins.forum.page.topic_load_error')} />
  }

  return (
    <>
      <Head>
        <title>{topic.title}</title>
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-4">
              <ForumBreadcrumb items={breadcrumbs} />
            </div>
          )}

          {/* Topic Header */}
          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary mb-4">
            <div className="relative p-6 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent border-b border-ko-border-primary">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

              <div className="flex items-start gap-4 mb-4">
                {/* Status Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    topic.isPinned
                      ? 'bg-amber-500/10'
                      : topic.isLocked
                        ? 'bg-ko-text-muted/10'
                        : 'bg-ko-brand-primary/10'
                  }`}
                >
                  {topic.isPinned && <Icon name="ti ti-pin" size={24} className="text-amber-500" />}
                  {topic.isLocked && <Icon name="ti ti-lock" size={24} className="text-ko-text-muted" />}
                  {!topic.isPinned && !topic.isLocked && (
                    <Icon name="ti ti-message" size={24} className="text-ko-brand-primary" />
                  )}
                </div>

                {/* Title & Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {topic.prefix && (
                      <span
                        className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: topic.prefix.color,
                          backgroundColor: `${topic.prefix.color}20`,
                        }}
                      >
                        {topic.prefix.name}
                      </span>
                    )}
                    <h1 className="text-2xl font-black text-ko-text-primary">{topic.title}</h1>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-ko-text-muted flex-wrap">
                    <Link
                      href={`/forum/user/${topic.author.id}/${topic.author.displayName}`}
                      className="font-semibold text-ko-text-primary hover:text-ko-brand-primary"
                    >
                      {topic.author.displayName}
                    </Link>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="ti ti-clock" size={16} />
                      {topic.createdAtHuman}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="ti ti-eye" size={16} />
                      {topic.viewCount} {t('plugins.forum.page.views')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <TopicActions
                  topicSlug={topic.slug}
                  isPinned={topic.isPinned}
                  isLocked={topic.isLocked}
                  canPin={userCan.pin}
                  canLock={userCan.lock}
                  canMove={userCan.move}
                  canEdit={userCan.edit}
                  canDelete={userCan.delete}
                />
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-ko-border-primary">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/10 flex items-center justify-center">
                      <Icon name="ti ti-message" size={16} className="text-ko-brand-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-ko-text-primary">{topic.postCount}</div>
                      <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.reply')}</div>
                    </div>
                  </div>
                </div>

                {userCan.reply && !topic.isLocked && (
                  <a
                    href="#reply-form"
                    className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Icon name="ti ti-message-reply" size={16} />
                    {t('plugins.forum.page.reply_button')}
                  </a>
                )}
              </div>
            </div>

            {/* Topic Content */}
            <div className="p-6">
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{ __html: topic.content || '' }}
              />
            </div>
          </div>

          {/* Posts/Replies */}
          {posts && posts.data && posts.data.length > 0 && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 px-4">
                <div className="w-1 h-6 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
                <h2 className="text-xl font-bold text-ko-text-primary">{t('plugins.forum.page.replies')} ({posts.total})</h2>
              </div>

              {posts.data.map((post) => {
                // Granular permission check: is it own post?
                const isOwnPost = currentUserId !== null && post.author.id === currentUserId
                const canEditPost = isOwnPost ? userCan.editOwnPost : userCan.editAnyPost
                const canDeletePost = isOwnPost ? userCan.deleteOwnPost : userCan.deleteAnyPost

                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    topicSlug={topic.slug}
                    canReact={userCan.react}
                    canEdit={canEditPost}
                    canDelete={canDeletePost}
                    canRestore={userCan.restore}
                    canReport={userCan.report}
                  />
                )
              })}

              {posts.total > posts.per_page && <ForumPagination pagination={posts} />}
            </div>
          )}

          {/* Reply Form */}
          {userCan.reply && !topic.isLocked && (
            <div id="reply-form">
              <ReplyForm topicSlug={topic.slug} />
            </div>
          )}

          {topic.isLocked && (
            <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-red-500/30 p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="ti ti-lock" size={40} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-ko-text-primary mb-2">{t('plugins.forum.page.topic_locked')}</h3>
              <p className="text-ko-text-muted">{t('plugins.forum.page.topic_locked_message')}</p>
            </div>
          )}

          {!userCan.reply && !topic.isLocked && (
            <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary p-6 text-center">
              <p className="text-ko-text-muted">
                {t('plugins.forum.page.login_to_reply')}{' '}
                <Link href="/login" className="text-ko-brand-primary hover:underline font-semibold">
                  {t('plugins.forum.page.login_link')}
                </Link>{' '}
                {t('plugins.forum.page.required')}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Topic.layout = (page) => <PublicLayout children={page} />
