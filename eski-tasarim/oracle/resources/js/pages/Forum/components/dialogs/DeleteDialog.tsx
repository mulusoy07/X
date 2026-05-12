import { useState } from 'react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'

type DeleteType = 'post' | 'topic'

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: DeleteType
  // For post deletion
  postId?: number
  // For topic deletion
  topicSlug?: string
  onSuccess?: () => void
}

export function DeleteDialog({ open, onOpenChange, type, postId, topicSlug, onSuccess }: DeleteDialogProps) {
  const { t } = useTranslation()
  const [reason, setReason] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const maxReasonLength = 500

  const config = {
    post: {
      title: t('plugins.forum.delete_dialog.post_title'),
      warning: t('plugins.forum.delete_dialog.post_warning'),
      apiRoute: 'api.ko-forum-v2.post.destroy',
      successMessage: t('plugins.forum.delete_dialog.post_success'),
    },
    topic: {
      title: t('plugins.forum.delete_dialog.topic_title'),
      warning: t('plugins.forum.delete_dialog.topic_warning'),
      apiRoute: 'api.ko-forum-v2.topic.destroy',
      successMessage: t('plugins.forum.delete_dialog.topic_success'),
    },
  } as const

  const { title, warning, apiRoute, successMessage } = config[type]

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const routeParams = type === 'post' ? { id: postId } : { slug: topicSlug }
      const bodyData = reason.trim() ? { reason: reason.trim() } : {}

      const response = await axios.delete(
        route(apiRoute, routeParams),
        { data: bodyData, timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.delete_dialog.delete_failed'))
      } else {
        toast.success(response.data.message || successMessage)
        onOpenChange(false)
        setReason('')
        onSuccess?.()
      }
    } catch (err) {
      toast.error(t('plugins.forum.delete_dialog.error'))
      console.error(`Failed to delete ${type}:`, err)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[500px] w-full">
        {/* Top gradient accent - Red themed for delete */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />

        {/* Header */}
        <div className="relative p-6 border-b border-ko-border-primary bg-gradient-to-r from-red-500/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <Icon name="ti ti-alert-triangle" size={20} className="text-red-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ko-text-primary">
                {title}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {t('plugins.forum.delete_dialog.confirm_message')}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-ko-widget-bg rounded-lg transition-colors"
            >
              <Icon name="ti ti-x" size={20} className="text-ko-text-muted" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Warning box */}
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-ko-text-muted">
              <span className="font-bold text-red-500">{t('plugins.forum.delete_dialog.warning')}:</span> {warning}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="delete-reason" className="text-sm font-bold text-ko-text-primary">
              {t('plugins.forum.delete_dialog.reason_label')}
            </label>
            <textarea
              id="delete-reason"
              placeholder={t('plugins.forum.delete_dialog.reason_placeholder')}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={maxReasonLength}
              rows={4}
              className="w-full resize-none bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg p-3 text-ko-text-primary placeholder:text-ko-text-muted focus:border-ko-brand-primary focus:outline-none"
            />
            <p className="text-xs text-ko-text-muted text-right">
              {reason.length}/{maxReasonLength}
            </p>
          </div>

          {/* Info box */}
          <div className="p-3 bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg">
            <p className="text-xs text-ko-text-muted">
              {t('plugins.forum.delete_dialog.note')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary bg-ko-widget-bg/30 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {t('plugins.forum.page.cancel')}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Icon name="ti ti-loader-2" size={16} className="animate-spin" />
                <span>{t('plugins.forum.delete_dialog.deleting')}</span>
              </>
            ) : (
              <>
                <Icon name="ti ti-trash" size={16} />
                <span>{t('plugins.forum.delete_dialog.yes_delete')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Convenience wrappers for backwards compatibility
export function DeletePostDialog(props: Omit<DeleteDialogProps, 'type' | 'topicSlug'> & { postId: number }) {
  return <DeleteDialog {...props} type="post" />
}

export function DeleteTopicDialog(props: Omit<DeleteDialogProps, 'type' | 'postId'> & { topicSlug: string }) {
  return <DeleteDialog {...props} type="topic" />
}
