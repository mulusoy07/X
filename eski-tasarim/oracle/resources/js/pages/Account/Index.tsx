import type { InertiaPageProps } from '@/types/inertia'
import type { AccountData, PremiumData, Character, AuthorityInfo } from './components/types'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { CharacterCard, StatsCard, PremiumBadge, AccountPageWrapper } from './components'

interface DashboardData {
  account: AccountData
  characters: Character[]
  premium: PremiumData | null
}

type TFunc = (key: string, options?: Record<string, unknown>) => string

function getAuthorityInfo(authority: number, t: TFunc): AuthorityInfo {
  switch (authority) {
    case 0:   return { text: t('account.authority.admin'),     className: 'text-purple-400',         iconName: 'ti ti-shield' }
    case 1:   return { text: t('account.authority.user'),      className: 'text-green-400',          iconName: 'ti ti-user' }
    case 250:
    case 251: return { text: t('account.authority.moderator'), className: 'text-purple-300',         iconName: 'ti ti-alert-circle' }
    case 255: return { text: t('account.authority.banned'),    className: 'text-red-400',            iconName: 'ti ti-ban' }
    default:  return { text: t('account.authority.unknown'),   className: 'text-ko-text-card-title', iconName: 'ti ti-circle-check' }
  }
}

export default function AccountDashboard() {
  const { t } = useTranslation()
  const { data } = usePage<InertiaPageProps<{ data: DashboardData }>>().props

  const { account, characters, premium } = data
  const pageTitle = t('account.dashboard')
  const authorityInfo = getAuthorityInfo(account.Authority, t)

  return (
    <AccountPageWrapper>
      <Head title={pageTitle} />

      <div className="bg-gradient-to-r from-ko-card to-ko-widget-bg border border-ko-border-primary rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-ko-text-card-title flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
          {pageTitle}
        </h1>
      </div>

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card-bg border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
              {t('account.account_info')}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard
              icon={<Icon name="ti ti-activity" className="w-8 h-8" />}
              label={t('account.last_login')}
              value={account.LastLoginTime}
            />

            <StatsCard
              icon={<Icon name="ti ti-mail" className="w-8 h-8" />}
              label={t('account.email')}
              value={account.Email}
            />

            {account.GSMNumber && (
              <StatsCard
                icon={<Icon name="ti ti-smartphone" className="w-8 h-8" />}
                label={t('account.phone')}
                value={account.GSMNumber}
              />
            )}

            <StatsCard
              icon={<Icon name={authorityInfo.iconName} className={`w-8 h-8 ${authorityInfo.className}`} />}
              label={t('account.account_status')}
              value={account.AuthorityTime
                ? `${authorityInfo.text} — ${t('account.until_date', { date: account.AuthorityTime })}`
                : authorityInfo.text
              }
            />
          </div>

          {premium && (
            <div className="mt-4">
              <PremiumBadge premium={premium} />
            </div>
          )}
        </div>
      </div>

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card-bg border-b border-ko-border-primary">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
              <h3 className="text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
                {t('account.my_characters')}
              </h3>
            </div>

            {characters.length > 0 && (
              <div className="relative group/gc overflow-hidden rounded-lg bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 translate-x-[-100%] group-hover/gc:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative px-5 py-2 flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ti ti-currency-dollar" className="w-3 h-3 text-red-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-red-400/70 uppercase tracking-wider font-medium leading-none mb-0.5">
                      {t('account.game_cash')}
                    </div>
                    <div className="text-sm font-black text-red-400 tabular-nums leading-none">
                      {characters[0].GameCash}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {characters.length > 0 ? (
            <div className="space-y-3">
              {characters.map((character) => (
                <CharacterCard key={character.UserID} character={character} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ti ti-user" className="w-8 h-8 text-ko-text-muted" />
              </div>
              <p className="text-ko-text-muted text-sm">
                {t('account.no_characters')}
              </p>
            </div>
          )}
        </div>
      </div>
    </AccountPageWrapper>
  )
}

AccountDashboard.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
