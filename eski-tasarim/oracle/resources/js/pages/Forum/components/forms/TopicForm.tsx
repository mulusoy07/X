import { useState } from 'react'
import { router } from '@inertiajs/react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import type { TopicPrefix } from '../../types'
import { ForumEditor } from '../editor/ForumEditor'

interface TopicFormProps {
  mode: 'create' | 'edit'
  nodeSlug?: string
  topicSlug?: string
  initialData?: {
    title: string
    content: string
    prefix_id?: number
  }
  prefixes?: TopicPrefix[]
  onCancel?: () => void
}

export function TopicForm({ mode, nodeSlug, topicSlug, initialData, prefixes, onCancel }: TopicFormProps) {
  const { t } = useTranslation()
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [prefixId, setPrefixId] = useState<number | undefined>(initialData?.prefix_id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError(t('plugins.forum.components.topic_form.required_error'))
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      if (mode === 'create' && nodeSlug) {
        const response = await axios.post(
          route('api.ko-forum-v2.topic.store', { slug: nodeSlug }),
          {
            title: title.trim(),
            content: content.trim(),
            prefix_id: prefixId || null,
          },
          { timeout: 10000 }
        )

        if (response.data.error || !response.data.data?.slug) {
          setError(response.data.message || t('plugins.forum.components.topic_form.create_failed'))
          setIsSubmitting(false)
        } else {
          router.visit(`/forum/topic/${response.data.data.slug}`)
        }
      } else if (mode === 'edit' && topicSlug) {
        const response = await axios.put(
          route('api.ko-forum-v2.topic.update', { slug: topicSlug }),
          {
            title: title.trim(),
            content: content.trim(),
            prefix_id: prefixId || null,
          },
          { timeout: 10000 }
        )

        if (response.data.error) {
          setError(response.data.message || t('plugins.forum.components.topic_form.update_failed'))
          setIsSubmitting(false)
        } else {
          const newSlug = response.data.data?.slug || topicSlug
          router.visit(`/forum/topic/${newSlug}`)
        }
      }
    } catch (err: any) {
      setError(err.message || t('plugins.forum.components.topic_form.error_occurred'))
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prefix Selection */}
      {prefixes && prefixes.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
            {t('plugins.forum.components.topic_form.prefix_label')}
          </label>
          <select
            value={prefixId?.toString() || 'none'}
            onChange={(e) => setPrefixId(e.target.value === 'none' ? undefined : parseInt(e.target.value))}
            disabled={isSubmitting}
            className="w-full bg-ko-widget-bg border border-ko-border-primary rounded-lg h-12 px-4 text-ko-text-primary focus:outline-none focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 transition-all duration-200"
          >
            <option value="none">{t('plugins.forum.components.topic_form.prefix_placeholder')}</option>
            {prefixes.map((prefix) => (
              <option key={prefix.id} value={prefix.id.toString()}>
                {prefix.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
          {t('plugins.forum.components.topic_form.title_label')} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('plugins.forum.components.topic_form.title_placeholder')}
          className="w-full bg-ko-widget-bg border border-ko-border-primary rounded-lg h-12 px-4 text-ko-text-primary placeholder:text-ko-text-muted focus:outline-none focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 transition-all duration-200"
          disabled={isSubmitting}
          maxLength={500}
        />
        <p className="text-xs text-ko-text-muted">
          {title.length}/500 {t('plugins.forum.components.topic_form.characters')}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
          {t('plugins.forum.components.topic_form.content_label')} <span className="text-red-400">*</span>
        </label>
        <ForumEditor
          content={content}
          onChange={setContent}
          placeholder={t('plugins.forum.components.topic_form.content_placeholder')}
          minHeight="300px"
          disabled={isSubmitting}
        />
        <p className="text-xs text-ko-text-muted mt-2">
          {content.length}/50000 {t('plugins.forum.components.topic_form.characters')}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded p-3">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-12 px-6 rounded-lg border border-ko-border-primary bg-ko-card-bg hover:bg-ko-widget-bg text-ko-text-card-title font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="ti ti-x" size={20} />
            <span>{t('plugins.forum.components.topic_form.cancel')}</span>
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !content.trim()}
          className="h-12 px-6 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
              <span>{mode === 'create' ? t('plugins.forum.components.topic_form.creating') : t('plugins.forum.components.topic_form.updating')}</span>
            </>
          ) : (
            <>
              <Icon name="ti ti-device-floppy" className="w-5 h-5" />
              <span>{mode === 'create' ? t('plugins.forum.components.topic_form.create_topic') : t('plugins.forum.components.topic_form.save_changes')}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
