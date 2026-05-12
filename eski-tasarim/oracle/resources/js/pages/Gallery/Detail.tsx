import { Icon } from '@/components/shared/icon'
import { GalleryDetail } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function GalleryDetailPage() {
  const { t } = useTranslation()
  const { gallery, error, message } = usePage().props

  if (error || !gallery || !gallery.slug) {
    return <ErrorState message={message || t('gallery.detail.not_found')} />
  }

  const imageCount = gallery.images.length
  const subtitle = `${imageCount} ${t('gallery.page.images')} • ${gallery.createdAt}`

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={gallery.name} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={gallery.name}
          subtitle={subtitle}
          icon={<Icon name="ti ti-photo" className="w-10 h-10" />}
        />

        <GalleryDetail gallery={gallery} />
      </div>
    </div>
  )
}

GalleryDetailPage.layout = (page) => <PublicLayout children={page} />
