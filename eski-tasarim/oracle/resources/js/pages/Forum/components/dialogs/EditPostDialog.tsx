import { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'
import { ForumEditor } from '../editor/ForumEditor'

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
  currentContent: string
  onSuccess?: () => void
}

export function EditPostDialog({ open, onOpenChange, postId, currentContent, onSuccess }: EditPostDialogProps) {
  const { t } = useTranslation()
  const [content, setContent] = useState(currentContent)
  const [editReason, setEditReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxReasonLength = 500

  // Reset content when dialog opens
  useEffect(() => {
    if (open) {
      setContent(currentContent)
      setEditReason('')
    }
  }, [open, currentContent])

  const handleSubmit = async () => {
    // Validation
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    if (!plainText) {
      toast.error(t('plugins.forum.page.edit_dialog.content_empty'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.put(
        route('api.ko-forum-v2.post.update', { id: postId }),
        {
          content,
          edit_reason: editReason.trim() || undefined
        },
        { timeout: 10000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.page.edit_dialog.update_failed'))
      } else {
        toast.success(response.data.message || t('plugins.forum.page.edit_dialog.update_success'))
        onOpenChange(false)

        if (onSuccess) {
          onSuccess()
        } else {
          window.location.reload()
        }
      }
    } catch (error) {
      toast.error(t('components.errors.generic_retry'))
      console.error('Failed to update post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contentChanged = content !== currentContent

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

        {/* Header */}
        <div className="relative p-6 border-b border-ko-border-primary bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-ko-text-primary">
                {t('plugins.forum.page.edit_dialog.title')}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {t('plugins.forum.page.edit_dialog.description')}
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
          <div className="space-y-2">
            <label className="text-sm font-bold text-ko-text-primary">
              {t('plugins.forum.page.edit_dialog.content_label')} <span className="text-red-500">*</span>
            </label>
            <ForumEditor
              content={content}
              onChange={setContent}
              placeholder={t('plugins.forum.page.edit_dialog.content_placeholder')}
              minHeight="300px"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editReason" className="text-sm font-bold text-ko-text-primary">
              {t('plugins.forum.page.edit_dialog.reason_label')}
            </label>
            <textarea
              id="editReason"
              placeholder={t('plugins.forum.page.edit_dialog.reason_placeholder')}
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              maxLength={maxReasonLength}
              rows={3}
              className="w-full resize-none bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg p-3 text-ko-text-primary placeholder:text-ko-text-muted focus:border-ko-brand-primary focus:outline-none"
            />
            <p className="text-xs text-ko-text-muted text-right">
              {editReason.length}/{maxReasonLength}
            </p>
          </div>

          {/* Info box */}
          <div className="p-3 bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg">
            <p className="text-xs text-ko-text-muted">
              <span className="font-bold text-ko-brand-primary">{t('plugins.forum.delete_dialog.note').split(':')[0]}:</span> {t('plugins.forum.page.edit_dialog.note')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary bg-ko-widget-bg/30 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {t('components.buttons.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !contentChanged}
            className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? t('plugins.forum.page.edit_dialog.saving') : t('plugins.forum.page.edit_dialog.save')}
          </button>
        </div>
      </div>
    </div>
  )
}
