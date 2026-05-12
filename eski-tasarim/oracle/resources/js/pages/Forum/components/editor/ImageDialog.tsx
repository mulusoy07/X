import { useState, useEffect } from 'react'
import { Icon } from '@/components/shared/icon'

interface ImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (url: string) => void
  initialUrl?: string
}

export function ImageDialog({
  open,
  onOpenChange,
  onConfirm,
  initialUrl = '',
}: ImageDialogProps) {
  const { t } = useTranslation()
  const [url, setUrl] = useState(initialUrl)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setUrl(initialUrl)
      setPreview(initialUrl || null)
      setError(null)
    }
  }, [open, initialUrl])

  // Validate image URL according to WHATWG URL Standard
  const isValidImageUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString)
      // Only allow http and https protocols
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false
      }
      // Check if URL ends with valid image extension
      const pathname = url.pathname.toLowerCase()
      return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(pathname)
    } catch {
      return false
    }
  }

  const handleConfirm = () => {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError(t('plugins.forum.components.image_dialog.url_empty'))
      return
    }

    if (!isValidImageUrl(trimmedUrl)) {
      setError(t('plugins.forum.components.image_dialog.url_invalid'))
      return
    }

    setError(null)
    onConfirm(trimmedUrl)
    onOpenChange(false)
  }

  const handleUrlChange = (value: string) => {
    setUrl(value)
    setError(null)

    // Show preview if valid image URL
    if (value && isValidImageUrl(value)) {
      setPreview(value)
    } else {
      setPreview(null)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[500px] w-full">
        {/* Header */}
        <div className="p-6 border-b border-ko-border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="ti ti-photo" size={20} className="text-ko-brand-primary" />
              <h2 className="text-lg font-bold text-white">
                {t('plugins.forum.components.image_dialog.title')}
              </h2>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-ko-widget-bg rounded-lg transition-colors"
            >
              <Icon name="ti ti-x" size={20} className="text-ko-text-muted" />
            </button>
          </div>
          <p className="text-sm text-ko-text-muted mt-1">
            {t('plugins.forum.components.image_dialog.description')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label htmlFor="image-url" className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
              {t('plugins.forum.components.image_dialog.url_label')}
            </label>
            <input
              id="image-url"
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={`w-full bg-ko-widget-bg border rounded-lg text-ko-text-primary h-12 px-4 placeholder:text-ko-text-muted focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 focus:outline-none transition-all duration-200 ${
                error ? 'border-red-500 focus:border-red-500' : 'border-ko-border-primary'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleConfirm()
                }
              }}
              autoFocus
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <p className="text-xs text-ko-text-muted">
              {t('plugins.forum.components.image_dialog.url_hint')}
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
                {t('plugins.forum.components.image_dialog.preview')}
              </label>
              <div className="border border-ko-border-primary rounded-lg p-2 bg-ko-widget-bg">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto max-h-64 mx-auto rounded"
                  onError={() => setPreview(null)}
                />
              </div>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-ko-widget-bg/50 border border-ko-border-primary rounded-lg p-3">
            <div className="flex items-start gap-3">
              <Icon name="ti ti-photo" size={20} className="text-ko-brand-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs text-ko-text-muted">
                <p className="font-medium text-ko-text-primary mb-1">
                  {t('plugins.forum.components.image_dialog.info_title')}
                </p>
                <p>{t('plugins.forum.components.image_dialog.info_text')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all"
          >
            {t('components.buttons.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!url.trim() || (!!url.trim() && !isValidImageUrl(url.trim()))}
            className="px-4 py-2 bg-ko-brand-primary hover:bg-ko-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialUrl ? t('plugins.forum.components.image_dialog.update') : t('plugins.forum.components.image_dialog.add')}
          </button>
        </div>
      </div>
    </div>
  )
}
