import { Icon } from '@/components/shared/icon'
import { GalleryList } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function GalleryPage() {
  const { t } = useTranslation()
  const { galleries, error, message } = usePage().props

  if (error || !galleries) {
    return <ErrorState message={message || t('gallery.page.load_error')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={t('gallery.page.title')} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('gallery.page.title')}
          subtitle={t('gallery.page.description')}
          icon={<Icon name="ti ti-photo" className="w-8 h-8" />}
        />
        <GalleryList galleries={galleries} />
      </div>
    </div>
  )
}

GalleryPage.layout = (page) => <PublicLayout children={page} />
