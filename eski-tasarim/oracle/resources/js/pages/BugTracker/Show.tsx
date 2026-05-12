import { Icon } from '@/components/shared/icon'
import { UserAvatar } from '../Forum/components/ui/UserAvatar'
import { PriorityBadge, StatusBadge } from './components/ui/Badges'
import { CommentForm } from './components'
import { ForumBreadcrumb } from '../Forum/components'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function BugDetailPage() {
  const { t } = useTranslation()
  const { error, message, bug, comments, attachments, breadcrumbs, userStatus } = usePage().props

  if (error || !bug) {
    return <ErrorState message={message || t('bug_tracker.errors.bug_not_found')} />
  }

  const userCan = {
    commentBug: userStatus?.canCommentBug ?? false,
  }

  return (
    <>
      <Head title={bug.title} />

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-4">
              <ForumBreadcrumb items={breadcrumbs} />
            </div>
          )}

          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary mb-4">
            <div className="relative p-6 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent border-b border-ko-border-primary">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ko-brand-primary/10 to-ko-brand-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="ti ti-bug" size={24} className="text-ko-brand-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <PriorityBadge priority={bug.priority} showLabel={true} />
                    <StatusBadge status={bug.status} showLabel={true} />
                    {bug.category && (
                      <span className="px-2 py-1 rounded text-xs font-bold tracking-wider bg-ko-brand-primary/10 text-ko-brand-primary">
                        {bug.category.name}
                      </span>
                    )}
                    <h1 className="text-2xl font-black text-ko-text-primary">{bug.title}</h1>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-ko-text-muted flex-wrap">
                    <span className="font-semibold text-ko-text-primary">{bug.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="ti ti-clock" size={16} />
                      {bug.createdAtHuman}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="ti ti-eye" size={16} />
                      {bug.viewCount} {t('bug_tracker.detail.view_count')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-ko-border-primary">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/10 flex items-center justify-center">
                      <Icon name="ti ti-message" size={16} className="text-ko-brand-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-ko-text-primary">{bug.commentCount}</div>
                      <div className="text-xs text-ko-text-muted">{t('bug_tracker.detail.comment_count')}</div>
                    </div>
                  </div>
                </div>

                {userCan.commentBug && (
                  <a
                    href="#comment-form"
                    className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Icon name="ti ti-message-circle" size={16} />
                    {t('bug_tracker.detail.add_comment')}
                  </a>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="tiptap-content text-ko-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: bug.content }} />
            </div>

            {attachments && attachments.length > 0 && (
              <div className="p-6 border-t border-ko-border-primary">
                <h3 className="text-lg font-bold text-ko-text-primary mb-3">{t('bug_tracker.detail.section_attachments')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-ko-widget-bg/30 hover:bg-ko-widget-bg/50 transition-colors cursor-pointer border border-ko-border-primary hover:border-ko-brand-primary"
                    >
                      <Icon
                        name={attachment.mimeType.startsWith('image') ? 'ti ti-photo' : 'ti ti-file-text'}
                        size={32}
                        className="text-ko-brand-primary flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ko-text-primary truncate">{attachment.fileName}</div>
                        <div className="text-xs text-ko-text-muted">{(attachment.fileSize / 1024).toFixed(1)} KB</div>
                      </div>
                      <Icon name="ti ti-download" size={16} className="text-ko-text-muted" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {comments && comments.length > 0 && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 px-4">
                <div className="w-1 h-6 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
                <h2 className="text-xl font-bold text-ko-text-primary">{t('bug_tracker.detail.section_comments')} ({comments.length})</h2>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary p-4"
                  >
                    <div className="flex items-start gap-3">
                      <UserAvatar displayName={comment.user.name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-ko-text-primary">
                            {comment.is_author ? t('bug_tracker.common.author') : comment.user.name}
                          </span>
                          <span className="text-xs text-ko-text-muted">{comment.created_at_human}</span>
                        </div>
                        <div className="tiptap-content text-ko-text-secondary" dangerouslySetInnerHTML={{ __html: comment.comment }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userCan.commentBug && (
            <div id="comment-form">
              <CommentForm bugSlug={bug.slug} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

BugDetailPage.layout = (page) => <PublicLayout children={page} />
