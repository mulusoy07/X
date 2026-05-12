import { useState, memo } from 'react'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { UserAvatar } from '../ui/UserAvatar'
import { ReportDialog } from '../dialogs/ReportDialog'
import { EditPostDialog } from '../dialogs/EditPostDialog'
import { DeletePostDialog } from '../dialogs/DeleteDialog'
import { RestorePostDialog } from '../dialogs/RestorePostDialog'
import type { ForumPost } from '../../types'
import { toast } from 'sonner'

interface PostCardProps {
  post: ForumPost
  topicSlug: string
  canReact?: boolean
  canEdit?: boolean
  canDelete?: boolean
  canRestore?: boolean
  canReport?: boolean
  onQuote?: (post: ForumPost) => void
}

export const PostCard = memo(function PostCard({ 
  post, 
  topicSlug, 
  canReact, 
  canEdit, 
  canDelete, 
  canRestore, 
  canReport, 
  onQuote 
}: PostCardProps) {
  const { t } = useTranslation()

  // Reaction state
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount || 0)
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(post.userReaction || null)
  const [isReacting, setIsReacting] = useState(false)

  // Dialog states
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)

  // Check if post is deleted
  const isDeleted = post.status?.toLowerCase() === 'deleted'

  // Handle reaction (like/dislike)
  const handleReact = async (type: 'like' | 'dislike') => {
    if (isReacting) return

    setIsReacting(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.post.react', { id: post.id, type }),
        {},
        { timeout: 5000 }
      )

      if (response.data.error || !response.data.data) {
        toast.error(response.data.message || t('plugins.forum.components.post_card.operation_failed'))
      } else {
        setLikeCount(response.data.data.likeCount)
        setDislikeCount(response.data.data.dislikeCount)
        setUserReaction(response.data.data.userReaction)

        if (response.data.message) {
          toast.success(response.data.message)
        }
      }
    } catch (error) {
      toast.error(t('plugins.forum.components.post_card.error_try_again'))
      console.error('Failed to react:', error)
    } finally {
      setIsReacting(false)
    }
  }

  // Handle edit/delete/restore success
  const handleSuccess = () => {
    window.location.reload()
  }

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Author Sidebar - Desktop */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-6">
              <Link
                href={`/forum/user/${post.author.id}/${post.author.displayName}`}
                className="block mb-3"
              >
                <UserAvatar
                  displayName={post.author.displayName}
                  avatar={post.author.avatar}
                  size="xl"
                  className="mx-auto mb-3"
                />
                <h3 className="text-center text-base font-bold text-ko-text-primary hover:text-ko-brand-primary">
                  {post.author.displayName}
                </h3>
              </Link>

              <div className="space-y-2 text-center text-sm">
                <div className="p-2 bg-ko-widget-bg rounded-lg">
                  <div className="text-xs text-ko-text-muted">{t('plugins.forum.components.post_card.messages')}</div>
                  <div className="text-lg font-black text-ko-brand-primary">{post.author.postCount}</div>
                </div>
                {post.author.reputationScore > 0 && (
                  <div className="p-2 bg-ko-widget-bg rounded-lg">
                    <div className="text-xs text-ko-text-muted">{t('plugins.forum.components.post_card.score')}</div>
                    <div className="text-lg font-black text-emerald-500">{post.author.reputationScore}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Author */}
            <div className="md:hidden flex items-center gap-3 mb-4 pb-4 border-b border-ko-border-primary">
              <UserAvatar
                displayName={post.author.displayName}
                avatar={post.author.avatar}
                size="md"
              />
              <div>
                <Link
                  href={`/forum/user/${post.author.id}/${post.author.displayName}`}
                  className="font-bold text-ko-text-primary hover:text-ko-brand-primary"
                >
                  {post.author.displayName}
                </Link>
                <div className="text-xs text-ko-text-muted">
                  {post.author.postCount} {t('plugins.forum.components.post_card.message_count')}
                  {post.author.reputationScore > 0 && ` • ${post.author.reputationScore} ${t('plugins.forum.components.post_card.point_count')}`}
                </div>
              </div>
            </div>

            {/* Deleted Warning (Moderator View) */}
            {isDeleted && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="ti ti-alert-triangle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-red-500 mb-1">{t('plugins.forum.components.post_card.post_deleted')}</p>
                    <p className="text-xs text-ko-text-muted">
                      {post.deleteReason || t('plugins.forum.components.post_card.delete_reason_not_specified')}
                    </p>
                    {post.deletedBy && (
                      <p className="text-xs text-ko-text-muted mt-1">
                        <Link
                          href={`/forum/user/${post.deletedBy.id}/${post.deletedBy.displayName}`}
                          className="text-ko-brand-primary hover:underline"
                        >
                          {post.deletedBy.displayName}
                        </Link>{' '}
                        {t('plugins.forum.components.post_card.deleted_by')}
                      </p>
                    )}
                    {post.deletedAt && (
                      <p className="text-xs text-ko-text-muted mt-1">
                        {post.deletedAt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div
              className={`tiptap-content mb-6 ${isDeleted ? 'opacity-50' : ''}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Edit Info */}
            {post.editedAt && (
              <div className="mb-4 p-3 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary text-xs text-ko-text-muted">
                {post.editedBy && (
                  <span>
                    <Link
                      href={`/forum/user/${post.editedBy.id}/${post.editedBy.displayName}`}
                      className="text-ko-brand-primary hover:underline"
                    >
                      {post.editedBy.displayName}
                    </Link>{' '}
                    {t('plugins.forum.components.post_card.edited_by')}
                  </span>
                )}
                {post.editReason && <span className="ml-2">• {t('plugins.forum.components.post_card.reason')}: {post.editReason}</span>}
                <span className="ml-2">• {post.editedAtHuman}</span>
              </div>
            )}

            {/* Signature */}
            {post.author.signature && (
              <div
                className="mb-4 pt-4 border-t border-ko-border-primary text-xs text-ko-text-muted italic tiptap-content"
                dangerouslySetInnerHTML={{ __html: post.author.signature }}
              />
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-ko-border-primary">
              <div className="text-xs text-ko-text-muted hidden md:block">{post.createdAtHuman}</div>

              <div className="flex items-center gap-2">
                {/* Like/Dislike buttons */}
                {canReact && !isDeleted && (
                  <>
                    <button
                      onClick={() => handleReact('like')}
                      disabled={isReacting}
                      className={`px-3 py-1.5 border rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                        userReaction === 'like'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-ko-widget-bg border-ko-border-primary text-ko-text-primary hover:bg-ko-card'
                      } ${isReacting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Icon name="ti ti-thumb-up" size={16} />
                      <span>{likeCount > 0 ? likeCount : t('plugins.forum.components.post_card.like')}</span>
                    </button>

                    <button
                      onClick={() => handleReact('dislike')}
                      disabled={isReacting}
                      className={`px-3 py-1.5 border rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                        userReaction === 'dislike'
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-ko-widget-bg border-ko-border-primary text-ko-text-primary hover:bg-ko-card'
                      } ${isReacting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Icon name="ti ti-thumb-down" size={16} />
                      {dislikeCount > 0 && <span>{dislikeCount}</span>}
                    </button>
                  </>
                )}

                {onQuote && !isDeleted && (
                  <button
                    onClick={() => onQuote(post)}
                    className="px-3 py-1.5 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-colors flex items-center gap-1"
                  >
                    <Icon name="ti ti-message-reply" size={16} />
                    {t('plugins.forum.components.post_card.reply')}
                  </button>
                )}

                {canReport && !isDeleted && (
                  <button
                    onClick={() => setReportDialogOpen(true)}
                    className="p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-amber-500 hover:bg-ko-card transition-all"
                    title={t('plugins.forum.components.post_card.report')}
                  >
                    <Icon name="ti ti-flag" size={16} />
                  </button>
                )}

                {canEdit && !isDeleted && (
                  <button
                    onClick={() => setEditDialogOpen(true)}
                    className="p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-ko-brand-primary hover:bg-ko-card transition-all"
                    title={t('plugins.forum.components.post_card.edit')}
                  >
                    <Icon name="ti ti-edit" size={16} />
                  </button>
                )}

                {canDelete && !isDeleted && (
                  <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-red-500 hover:bg-ko-card transition-all"
                    title={t('plugins.forum.components.post_card.delete')}
                  >
                    <Icon name="ti ti-trash" size={16} />
                  </button>
                )}

                {canRestore && isDeleted && (
                  <button
                    onClick={() => setRestoreDialogOpen(true)}
                    className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-sm font-semibold text-emerald-500 hover:bg-emerald-500/30 transition-all flex items-center gap-2"
                    title={t('plugins.forum.components.post_card.restore')}
                  >
                    <Icon name="ti ti-refresh" size={16} />
                    {t('plugins.forum.components.post_card.restore')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Dialog */}
      <ReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        postId={post.id}
      />

      {/* Edit Dialog */}
      {canEdit && (
        <EditPostDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          postId={post.id}
          currentContent={post.content}
          onSuccess={handleSuccess}
        />
      )}

      {/* Delete Dialog */}
      {canDelete && (
        <DeletePostDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          postId={post.id}
          onSuccess={handleSuccess}
        />
      )}

      {/* Restore Dialog */}
      {canRestore && (
        <RestorePostDialog
          open={restoreDialogOpen}
          onOpenChange={setRestoreDialogOpen}
          postId={post.id}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  )
})
