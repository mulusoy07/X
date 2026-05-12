import { Icon } from '@/components/shared/icon'

export function FormDisabled({ type }) {
  const config = {
    login: {
      icon: 'ti ti-login-2',
      title: t('auth.disabled.login.title'),
      description: t('auth.disabled.login.description'),
      linkText: t('auth.disabled.login.go_to_register'),
      linkHref: route('public.guest.register'),
      secondaryLinkText: t('auth.disabled.login.forgot_password'),
      secondaryLinkHref: route('public.guest.forgot-password.index'),
    },
    register: {
      icon: 'ti ti-user-plus',
      title: t('auth.disabled.register.title'),
      description: t('auth.disabled.register.description'),
      linkText: t('auth.disabled.register.go_to_login'),
      linkHref: route('public.guest.login'),
    },
    'forgot-password': {
      icon: 'ti ti-key',
      title: t('auth.disabled.forgot.title'),
      description: t('auth.disabled.forgot.description'),
      linkText: t('auth.disabled.forgot.go_to_login'),
      linkHref: route('public.guest.login'),
    },
  }

  const { icon, title, description, linkText, linkHref, secondaryLinkText, secondaryLinkHref } = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-ko-brand-primary/20 to-ko-brand-secondary/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-20 h-20 bg-ko-widget-bg border border-ko-border-primary rounded-full flex items-center justify-center">
          <Icon name={icon} className="w-10 h-10 text-ko-text-muted" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-ko-karus/20 border border-ko-karus/30 rounded-full flex items-center justify-center">
            <Icon name="ti ti-lock" className="w-3.5 h-3.5 text-ko-karus" />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-ko-text-primary mb-2">
        {title}
      </h3>

      <p className="text-sm text-ko-text-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-medium text-sm rounded-lg transition-all hover:scale-105 hover:shadow-lg"
        >
          <Icon name="ti ti-arrow-right" className="w-4 h-4" />
          {linkText}
        </Link>
        {secondaryLinkText && secondaryLinkHref && (
          <Link
            href={secondaryLinkHref}
            className="inline-flex items-center gap-2 text-sm text-ko-brand-primary hover:text-ko-brand-secondary transition-colors"
          >
            {secondaryLinkText}
          </Link>
        )}
      </div>
    </div>
  )
}
