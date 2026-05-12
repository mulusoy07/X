import { Icon } from '@/components/shared/icon'
import { DownloadCard, SystemRequirements, ImportantNotes } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function DownloadsPage() {
  const { t } = useTranslation()
  const { downloads, error, message } = usePage().props

  if (error || !downloads) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={t('downloads.title')} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('downloads.title')}
          subtitle={t('downloads.description')}
          icon={<Icon name="ti ti-download" className="w-8 h-8" />}
        />

        <div className="space-y-6">
          {downloads.length > 0 ? (
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-ko-text-primary mb-6">
                {t('downloads.files')}
              </h2>
              <div className="space-y-4">
                {downloads.map((download) => (
                  <DownloadCard key={download.id} download={download} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon="ti ti-download"
              title={t('downloads.no_files')}
              description={t('downloads.coming_soon')}
              className="min-h-0 py-12 bg-ko-card border border-ko-border-primary rounded-xl"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SystemRequirements />
            <ImportantNotes />
          </div>
        </div>
      </div>
    </div>
  )
}

DownloadsPage.layout = (page) => <PublicLayout children={page} />
