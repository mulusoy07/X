import { Icon } from '@/components/shared/icon'
import { SectionHeader, BalanceProductsGrid, ResellerGrid } from './components'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function ResellersPage() {
  const { t } = useTranslation()
  const { resellers, products, page, error, message } = usePage().props

  if (error) {
    return <ErrorState message={message || t('components.errors.generic_retry')} />
  }

  const resellerList = resellers || []
  const balanceProducts = products || []

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={page?.title} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={page?.title}
          subtitle={page?.description}
          icon={page?.icon ? <Icon name={page.icon} className="w-8 h-8" /> : undefined}
        />

        <div className="space-y-6">
          {resellerList.length > 0 ? (
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-5">
              <SectionHeader
                icon="ti ti-building-store"
                title={t('shop.resellers.authorized_resellers')}
                description={t('shop.resellers.resellers_desc')}
                count={resellerList.length}
              />
              <ResellerGrid resellers={resellerList} />
            </div>
          ) : (
            <EmptyState
              icon="ti ti-building-store"
              title={t('shop.resellers.no_resellers')}
              description={t('shop.resellers.resellers_coming_soon')}
              className="min-h-0 py-12 bg-ko-card border border-ko-border-primary rounded-xl"
            />
          )}

          {balanceProducts.length > 0 ? (
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-5">
              <SectionHeader
                icon="ti ti-wallet"
                title={t('shop.resellers.balance_packages')}
                description={t('shop.resellers.balance_desc')}
                count={balanceProducts.length}
              />
              <BalanceProductsGrid products={balanceProducts} />
            </div>
          ) : (
            <EmptyState
              icon="ti ti-wallet"
              title={t('shop.resellers.no_balance')}
              description={t('shop.resellers.balance_coming_soon')}
              className="min-h-0 py-12 bg-ko-card border border-ko-border-primary rounded-xl"
            />
          )}
        </div>
      </div>
    </div>
  )
}

ResellersPage.layout = (page) => <PublicLayout children={page} />
