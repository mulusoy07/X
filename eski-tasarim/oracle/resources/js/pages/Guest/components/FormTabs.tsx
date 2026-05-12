import { Icon } from '@/components/shared/icon'

export function FormTabs({ active = 'login' }) {
  const { t } = useTranslation()
  const isLogin = active === 'login'

  return (
    <div className="flex gap-3 mb-6 p-1.5 bg-ko-widget-bg/50 backdrop-blur-sm rounded-xl border border-ko-border-primary">
      <Link
        href={route('public.guest.login')}
        className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all duration-500 flex items-center justify-center ${
          isLogin
            ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg scale-[1.02]'
            : 'text-ko-text-muted hover:text-ko-text-primary'
        }`}
      >
        <Icon name="ti ti-login" className="w-4 h-4 mr-2" />
        {t('auth.tabs.login')}
      </Link>
      <Link
        href={route('public.guest.register')}
        className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all duration-500 flex items-center justify-center ${
          !isLogin
            ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg scale-[1.02]'
            : 'text-ko-text-muted hover:text-ko-text-primary'
        }`}
      >
        <Icon name="ti ti-user-plus" className="w-4 h-4 mr-2" />
        {t('auth.tabs.register')}
      </Link>
    </div>
  )
}
