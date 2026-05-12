import { Icon } from '@/components/shared/icon'
import { PremiumGrid } from './components'
import { ShopInfoBanner } from '@/components/shared/ShopInfoBanner'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function PremiumsPage() {
  const { t } = useTranslation()
  const { premiums, page, error, message } = usePage().props

  if (error || !premiums) {
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
          count={premiums.length}
          countLabel={t('shop.premiums.total_premiums')}
          title={t('shop.premiums.premium_benefits')}
          description={t('shop.premiums.premium_benefits_desc')}
        />

        {premiums.length > 0 ? (
          <PremiumGrid premiums={premiums} />
        ) : (
          <EmptyState
            icon="ti ti-crown"
            title={t('shop.premiums.no_premiums')}
            description={t('shop.premiums.premiums_coming_soon')}
            className="min-h-0 py-12 bg-ko-card border border-ko-border-primary rounded-xl"
          />
        )}
      </div>
    </div>
  )
}

PremiumsPage.layout = (page) => <PublicLayout children={page} />
