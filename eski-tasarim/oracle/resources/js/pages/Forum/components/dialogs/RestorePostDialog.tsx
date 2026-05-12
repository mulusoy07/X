import { useState } from 'react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'

interface RestorePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
  onSuccess?: () => void
}

export function RestorePostDialog({ open, onOpenChange, postId, onSuccess }: RestorePostDialogProps) {
  const { t } = useTranslation()
  const [isRestoring, setIsRestoring] = useState(false)

  const handleRestore = async () => {
    setIsRestoring(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.post.restore', { id: postId }),
        {},
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.page.restore_dialog.restore_failed'))
      } else {
        toast.success(response.data.message || t('plugins.forum.page.restore_dialog.restore_success'))
        onOpenChange(false)

        if (onSuccess) {
          onSuccess()
        } else {
          window.location.reload()
        }
      }
    } catch (error) {
      toast.error(t('components.errors.generic_retry'))
      console.error('Failed to restore post:', error)
    } finally {
      setIsRestoring(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[500px] w-full">
        {/* Top gradient accent - Emerald themed for restore */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60" />

        {/* Header */}
        <div className="relative p-6 border-b border-ko-border-primary bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <Icon name="ti ti-refresh" size={20} className="text-emerald-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ko-text-primary">
                {t('plugins.forum.page.restore_dialog.title')}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {t('plugins.forum.page.restore_dialog.confirm')}
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
          {/* Info box */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-sm text-ko-text-muted">
              <span className="font-bold text-emerald-500">{t('plugins.forum.page.restore_dialog.info')}:</span> {t('plugins.forum.page.restore_dialog.info_text')}
            </p>
          </div>

          <div className="p-3 bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg">
            <p className="text-xs text-ko-text-muted">
              <span className="font-bold text-ko-text-primary">{t('plugins.forum.delete_dialog.note').split(':')[0]}:</span> {t('plugins.forum.page.restore_dialog.note')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary bg-ko-widget-bg/30 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isRestoring}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {t('components.buttons.cancel')}
          </button>
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-all disabled:opacity-50"
          >
            {isRestoring ? t('plugins.forum.page.restore_dialog.restoring') : t('plugins.forum.page.restore_dialog.yes_restore')}
          </button>
        </div>
      </div>
    </div>
  )
}
