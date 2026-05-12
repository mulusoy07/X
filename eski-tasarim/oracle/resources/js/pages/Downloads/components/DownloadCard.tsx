import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { Imagex } from '@/components/shared/Imagex'
import { toast } from 'sonner'

export function DownloadCard({ download }) {
  const { t } = useTranslation()

  const handleDownload = useCallback(() => {
    toast.info(t('downloads.downloading', { name: download.name }))
  }, [download.name, t])

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-xl border transition-colors',
        download.isRecommended
          ? 'bg-ko-brand-primary/5 border-ko-brand-primary/30'
          : 'bg-ko-widget-bg border-ko-border-primary hover:border-ko-brand-primary/30'
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 bg-ko-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {download.logo ? (
            <Imagex
              src={download.logo}
              alt={download.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="ti ti-download" className="w-6 h-6 text-ko-brand-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-ko-text-primary truncate">
              {download.name}
            </h3>
            {download.isRecommended && (
              <span className="bg-ko-brand-primary text-white px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                {t('downloads.recommended')}
              </span>
            )}
          </div>
          <p className="text-sm text-ko-text-muted truncate">{download.description}</p>
          <p className="text-xs text-ko-text-muted truncate">
            {download.version} • {download.size}
          </p>
        </div>
      </div>

      {download.url ? (
        <a
          href={download.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-ko-brand-primary hover:bg-ko-brand-secondary text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ml-4"
        >
          {t('downloads.download')}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-2 bg-ko-brand-primary hover:bg-ko-brand-secondary text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ml-4"
        >
          {t('downloads.download')}
        </button>
      )}
    </div>
  )
}
