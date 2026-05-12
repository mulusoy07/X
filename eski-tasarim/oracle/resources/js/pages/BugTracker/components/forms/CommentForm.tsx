import { Icon } from '@/components/shared/icon'

export function CommentForm({ bugSlug }) {
  const { t } = useTranslation()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      setError(t('bug_tracker.comment_form.comment_required'))
      return
    }

    if (trimmedContent.length < 5) {
      setError(t('bug_tracker.comment_form.comment_too_short'))
      return
    }

    setIsSubmitting(true)
    setError(null)

    router.post(
      route('api.ko-bugtracker-v2.comments.store', { bugSlug }),
      { comment: trimmedContent },
      {
        onSuccess: () => {
          setContent('')
          setError(null)
        },
        onError: (errors) => {
          setError(errors.message || t('bug_tracker.comment_form.error'))
        },
        onFinish: () => {
          setIsSubmitting(false)
        },
      }
    )
  }

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      <div className="p-6">
        <h3 className="text-lg font-bold text-ko-text-primary mb-4">
          {t('bug_tracker.comment_form.title')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('bug_tracker.comment_form.comment_placeholder')}
            disabled={isSubmitting}
            className="w-full min-h-[200px] px-4 py-3 bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg text-ko-text-primary placeholder:text-ko-text-muted focus:outline-none focus:ring-2 focus:ring-ko-brand-primary/50 focus:border-ko-brand-primary transition-all resize-y disabled:opacity-50 disabled:cursor-not-allowed"
            rows={8}
          />

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-3 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('bug_tracker.comment_form.submitting')}</span>
                </>
              ) : (
                <>
                  <Icon name="ti ti-send" size={20} />
                  <span>{t('bug_tracker.comment_form.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
