import { Icon } from '@/components/shared/icon'

interface AccountMenuItem {
  name: string
  href: string
  iconName: string
  key: string
  routePattern: string
}

function createAccountMenuItems(t: (key: string) => string): AccountMenuItem[] {
  return [
    {
      name: t('account.my_account'),
      href: route('public.account.index'),
      iconName: 'ti ti-user',
      key: 'account',
      routePattern: 'public.account.index'
    },
    {
      name: t('account.security.title'),
      href: route('public.account.security.index'),
      iconName: 'ti ti-shield',
      key: 'security',
      routePattern: 'public.account.security.*'
    },
    {
      name: t('account.forum_profile'),
      href: '',//route('public.account.forum.index'),
      iconName: 'ti ti-messages',
      key: 'forum',
      routePattern: 'public.account.forum.*'
    },
    {
      name: t('account.shop_history.title'),
      href: route('public.account.shop-history'),
      iconName: 'ti ti-shopping-cart',
      key: 'shop',
      routePattern: 'public.account.shop-history'
    }
  ]
}

export function AccountSidebar() {
  const { t } = useTranslation()

  const menuItems = createAccountMenuItems(t)

  const isActive = (routePattern: string) => {
    return route().current(routePattern)
  }

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-4 sticky top-4 max-h-screen overflow-y-auto">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.routePattern)

          return (
            <Link
              key={item.key}
              href={item.href}
              className={[
                'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                active
                  ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
                  : 'text-ko-text-card-meta hover:bg-ko-widget-bg hover:text-ko-brand-primary'
              ].join(' ')}
            >
              <div className={`w-5 h-5 ${active ? 'text-ko-text-dark' : 'text-ko-text-card-meta group-hover:text-ko-brand-primary'}`}>
                <Icon name={item.iconName} />
              </div>
              <span className="font-semibold text-sm flex-1">{item.name}</span>
              <Icon name="ti ti-chevron-right" className={`w-4 h-4 transition-transform ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
