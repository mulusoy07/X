import { Icon } from '@/components/shared/icon'
import { PackageGrid } from './components'
import { ShopInfoBanner } from '@/components/shared/ShopInfoBanner'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function PackagesPage() {
  const { t } = useTranslation()
  const { packages, page, error, message } = usePage().props

  if (error || !packages) {
    return <ErrorState message={message || t('components.errors.generic')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={page?.title} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={page?.title}
          subtitle={page?.description}
          icon={page?.icon ? <Icon name={page.icon} className="w-8 h-8" /> : undefined}
        />

        <ShopInfoBanner
          count={packages.length}
          countLabel={t('shop.packages.special_package')}
          title={t('shop.packages.premium_package_benefits')}
          description={t('shop.packages.package_usage_hint')}
        />

        {packages.length > 0 ? (
          <PackageGrid packages={packages} />
        ) : (
          <EmptyState
            icon="ti ti-package"
            title={t('shop.packages.no_packages')}
            description={t('shop.packages.packages_coming_soon')}
            className="min-h-0 py-12 bg-ko-card border border-ko-border-primary rounded-xl"
          />
        )}
      </div>
    </div>
  )
}

PackagesPage.layout = (page) => <PublicLayout children={page} />
