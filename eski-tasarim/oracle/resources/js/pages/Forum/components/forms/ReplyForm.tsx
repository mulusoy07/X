import { useState } from 'react'
import { router } from '@inertiajs/react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { ForumEditor } from '../editor/ForumEditor'

interface ReplyFormProps {
  topicSlug: string
  quotedPost?: {
    id: number
    author: string
    content: string
  } | null
  onCancelQuote?: () => void
}

export function ReplyForm({ topicSlug, quotedPost, onCancelQuote }: ReplyFormProps) {
  const { t } = useTranslation()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError(t('plugins.forum.components.reply_form.content_empty'))
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.post.store', { topicSlug }),
        {
          content: content.trim(),
          parent_post_id: quotedPost?.id || null,
        },
        { timeout: 10000 }
      )

      if (response.data.error) {
        setError(response.data.message || t('plugins.forum.components.reply_form.submit_failed'))
      } else {
        setContent('')
        if (onCancelQuote) onCancelQuote()
        router.reload() // Refresh page data
      }
    } catch (err: any) {
      setError(err.message || t('plugins.forum.components.topic_form.error_occurred'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      <div className="p-6">
        <h3 className="text-lg font-bold text-ko-text-primary mb-4">{t('plugins.forum.components.reply_form.title')}</h3>

        {/* Quoted Post */}
        {quotedPost && (
          <div className="mb-4 p-4 bg-ko-widget-bg/50 rounded-lg border border-ko-border-primary">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-ko-text-primary">
                {t('plugins.forum.components.reply_form.quote')}: {quotedPost.author}
              </span>
              {onCancelQuote && (
                <button
                  onClick={onCancelQuote}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Icon name="ti ti-x" size={16} />
                </button>
              )}
            </div>
            <div
              className="tiptap-content text-sm text-ko-text-muted line-clamp-3"
              dangerouslySetInnerHTML={{ __html: quotedPost.content }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <ForumEditor
            content={content}
            onChange={setContent}
            placeholder={t('plugins.forum.components.reply_form.placeholder')}
            minHeight="200px"
            disabled={isSubmitting}
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
                  <span>{t('plugins.forum.components.reply_form.submitting')}</span>
                </>
              ) : (
                <>
                  <Icon name="ti ti-send" size={20} />
                  <span>{t('plugins.forum.components.reply_form.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
