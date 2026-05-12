import { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
}

export function ReportDialog({ open, onOpenChange, postId }: ReportDialogProps) {
  const { t } = useTranslation()
  const [reason, setReason] = useState<string>('Spam')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasReported, setHasReported] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Report reasons with translations
  const reportReasons = [
    { value: 'Spam', label: t('plugins.forum.page.report_dialog.reason_spam'), description: t('plugins.forum.page.report_dialog.reason_spam_desc') },
    { value: 'Offensive', label: t('plugins.forum.page.report_dialog.reason_offensive'), description: t('plugins.forum.page.report_dialog.reason_offensive_desc') },
    { value: 'Inappropriate', label: t('plugins.forum.page.report_dialog.reason_inappropriate'), description: t('plugins.forum.page.report_dialog.reason_inappropriate_desc') },
    { value: 'Other', label: t('plugins.forum.page.report_dialog.reason_other'), description: t('plugins.forum.page.report_dialog.reason_other_desc') }
  ]

  // Check if user has already reported when dialog opens
  useEffect(() => {
    if (open) {
      checkExistingReport()
    }
  }, [open, postId])

  const checkExistingReport = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        route('api.ko-forum-v2.post.report.check', { id: postId }),
        { timeout: 5000 }
      )

      if (!response.data.error && response.data.data) {
        setHasReported(response.data.data.hasReported)
        if (response.data.data.report) {
          setReason(response.data.data.report.reason)
          setDescription(response.data.data.report.description || '')
        }
      }
    } catch (error) {
      console.error('Failed to check report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdraw = async () => {
    setIsSubmitting(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.post.report', { id: postId }),
        { withdraw: true },
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.page.report_dialog.operation_failed'))
      } else {
        toast.success(response.data.message || t('plugins.forum.page.report_dialog.withdrawn'))
        onOpenChange(false)
        setHasReported(false)
        setReason('Spam')
        setDescription('')
      }
    } catch (error) {
      toast.error(t('components.errors.generic_retry'))
      console.error('Failed to withdraw report:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (!reason) {
      toast.error(t('plugins.forum.page.report_dialog.select_reason_error'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.post.report', { id: postId }),
        { reason, description },
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.page.report_dialog.operation_failed'))
      } else {
        toast.success(response.data.message || t('plugins.forum.page.report_dialog.submitted'))
        onOpenChange(false)
        setHasReported(true)
        setReason('Spam')
        setDescription('')
      }
    } catch (error) {
      toast.error(t('components.errors.generic_retry'))
      console.error('Failed to report post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[500px] w-full max-h-[90vh] overflow-y-auto">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        {/* Header */}
        <div className="relative p-6 border-b border-ko-border-primary bg-gradient-to-r from-orange-500/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <Icon name="ti ti-flag" size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ko-text-primary">
                {hasReported ? t('plugins.forum.page.report_dialog.your_report') : t('plugins.forum.page.report_dialog.title')}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {hasReported
                  ? t('plugins.forum.page.report_dialog.already_reported')
                  : t('plugins.forum.page.report_dialog.select_reason')}
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
        <div className="p-6">
          {isLoading ? (
            <div className="py-8 text-center text-ko-text-muted">
              {t('plugins.forum.page.report_dialog.checking')}
            </div>
          ) : hasReported ? (
            <div className="p-4 bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg">
              <p className="text-sm font-bold text-ko-text-primary mb-2">{t('plugins.forum.page.report_dialog.report_reason')}:</p>
              <p className="text-sm text-ko-text-muted">
                {reportReasons.find(r => r.value === reason)?.label || reason}
              </p>
              {description && (
                <>
                  <p className="text-sm font-bold text-ko-text-primary mt-3 mb-2">{t('plugins.forum.page.report_dialog.description_label')}:</p>
                  <p className="text-sm text-ko-text-muted">{description}</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-ko-text-primary">{t('plugins.forum.page.report_dialog.report_reason')}</label>
                <div className="space-y-2">
                  {reportReasons.map((item) => (
                    <div
                      key={item.value}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        reason === item.value
                          ? 'bg-ko-brand-primary/10 border-ko-brand-primary/50'
                          : 'bg-ko-widget-bg/30 border-ko-border-primary hover:border-ko-brand-primary/30 hover:bg-ko-widget-bg/50'
                      }`}
                      onClick={() => setReason(item.value)}
                    >
                      <input
                        type="radio"
                        checked={reason === item.value}
                        onChange={() => setReason(item.value)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <label
                          className={`text-sm font-semibold cursor-pointer ${
                            reason === item.value ? 'text-ko-brand-primary' : 'text-ko-text-primary'
                          }`}
                        >
                          {item.label}
                        </label>
                        <p className="text-xs text-ko-text-muted mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-bold text-ko-text-primary">{t('plugins.forum.page.report_dialog.description_label')}</label>
                <textarea
                  id="description"
                  placeholder={t('plugins.forum.page.report_dialog.description_placeholder')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="w-full resize-none bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg p-3 text-ko-text-primary placeholder:text-ko-text-muted focus:border-ko-brand-primary focus:outline-none"
                />
                <p className="text-xs text-ko-text-muted text-right">
                  {description.length}/500
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary bg-ko-widget-bg/30 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {hasReported ? t('plugins.forum.page.report_dialog.close') : t('components.buttons.cancel')}
          </button>
          {hasReported ? (
            <button
              onClick={handleWithdraw}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? t('plugins.forum.page.report_dialog.withdrawing') : t('plugins.forum.page.report_dialog.withdraw')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? t('plugins.forum.page.report_dialog.submitting') : t('plugins.forum.page.report_dialog.submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
