import { memo, useMemo } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import type { InertiaPageProps } from '@/types/inertia'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AccountPageWrapper } from '../components'
import { SecurityCardHeader, type SecurityPageProps, type TwoFactorStatus } from '../components/Security'
import { useTranslation } from '@/hooks/useTranslation'

interface SecurityIndexProps extends SecurityPageProps {
  gameTwoFactor: TwoFactorStatus
  webTwoFactor: TwoFactorStatus
}

interface SecurityNavItem {
  title: string
  description: string
  iconName: string
  href: string
  active: boolean
  color: string
}

interface SecurityNavCardProps {
  item: SecurityNavItem
}

const SecurityNavCard = memo(function SecurityNavCard({ item }: SecurityNavCardProps) {
  const { t } = useTranslation()

  if (item.active) {
    return (
      <Link href={item.href} className="group">
        <div className="relative bg-ko-card border border-ko-border-primary rounded-2xl p-6 hover:border-ko-brand-primary transition-all duration-300 overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
          />
          <div className="relative flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon name={item.iconName} className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-ko-text-card-title mb-1 group-hover:text-ko-brand-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-ko-text-card-meta">{item.description}</p>
            </div>
            <Icon
              name="ti ti-arrow-right"
              className="w-5 h-5 text-ko-text-card-meta group-hover:text-ko-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
            />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="relative bg-ko-card border border-ko-border-primary rounded-2xl p-6 opacity-60 cursor-not-allowed overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-full -mr-16 -mt-16`} />
      <div className="relative flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} opacity-50 flex items-center justify-center flex-shrink-0`}>
          <Icon name={item.iconName} className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-ko-text-card-title">{item.title}</h3>
            <span className="px-2 py-0.5 bg-ko-widget-bg border border-ko-border-primary rounded text-xs font-semibold text-ko-text-card-meta">
              {t('account.security.coming_soon')}
            </span>
          </div>
          <p className="text-sm text-ko-text-card-meta">{item.description}</p>
        </div>
      </div>
    </div>
  )
})

export default function SecurityIndex() {
  const { t } = useTranslation()
  const { maskedEmail, maskedPhone } = usePage<InertiaPageProps<SecurityIndexProps>>().props

  const items: SecurityNavItem[] = useMemo(
    () => [
      {
        title: t('account.security.change_password'),
        description: t('account.security.change_password_desc'),
        iconName: 'ti ti-lock',
        href: route('public.account.security.password'),
        active: true,
        color: 'from-blue-500 to-blue-600',
      },
      {
        title: t('account.security.item_lock'),
        description: t('account.security.item_lock_desc'),
        iconName: 'ti ti-shield',
        href: route('public.account.security.item-lock'),
        active: true,
        color: 'from-purple-500 to-purple-600',
      },
      {
        title: t('account.security.change_email'),
        description: t('account.security.change_email_desc'),
        iconName: 'ti ti-mail',
        href: route('public.account.security.email'),
        active: true,
        color: 'from-green-500 to-green-600',
      },
      {
        title: t('account.security.change_gsm'),
        description: t('account.security.change_gsm_desc'),
        iconName: 'ti ti-smartphone',
        href: route('public.account.security.gsm'),
        active: true,
        color: 'from-orange-500 to-orange-600',
      },
      {
        title: t('account.security.two_factor'),
        description: t('account.security.two_factor_desc'),
        iconName: 'ti ti-shield-check',
        href: route('public.account.security.two-factor.index'),
        active: true,
        color: 'from-cyan-500 to-cyan-600',
      },
    ],
    [t]
  )

  return (
    <AccountPageWrapper>
      <Head title={t('account.security.title')} />

      <div className="bg-gradient-to-r from-ko-card to-ko-widget-bg border border-ko-border-primary rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-ko-text-card-title flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          {t('account.security.title')}
        </h1>
        <p className="text-ko-text-card-meta mt-2 ml-7">{t('account.security.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <SecurityNavCard key={item.href} item={item} />
        ))}
      </div>

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader title={t('account.security.registered_info')} />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ko-widget-bg/50 rounded-xl p-4 border border-ko-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ko-card rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="ti ti-mail" className="w-5 h-5 text-ko-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-ko-text-card-meta mb-1">{t('account.security.registered_email')}</div>
                  <div className="text-sm font-bold text-ko-text-card-title truncate font-mono">
                    {maskedEmail ?? t('account.security.not_set')}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-ko-widget-bg/50 rounded-xl p-4 border border-ko-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ko-card rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="ti ti-smartphone" className="w-5 h-5 text-ko-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-ko-text-card-meta mb-1">{t('account.security.registered_phone')}</div>
                  <div className="text-sm font-bold text-ko-text-card-title truncate font-mono">
                    {maskedPhone ?? t('account.security.not_set')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-ko-card-bg rounded-xl border border-ko-border-primary">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ti ti-shield-check" className="w-5 h-5 text-ko-brand-primary" />
              <h4 className="font-semibold text-ko-text-card-title">{t('account.security.security_tips')}</h4>
            </div>
            <ul className="text-sm text-ko-text-card-meta space-y-1">
              <li>• {t('account.security.tip_change_password')}</li>
              <li>• {t('account.security.tip_strong_password')}</li>
              <li>• {t('account.security.tip_item_lock')}</li>
            </ul>
          </div>
        </div>
      </div>
    </AccountPageWrapper>
  )
}

SecurityIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
