import { Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { useTranslation } from '@/hooks/useTranslation'

interface SecurityPageHeaderProps {
  title: string
  subtitle: string
  backRoute?: string
}

export function SecurityPageHeader({ title, subtitle, backRoute }: SecurityPageHeaderProps) {
  const { t } = useTranslation()
  const href = backRoute || route('public.account.security.index')

  return (
    <div className="bg-gradient-to-r from-ko-card to-ko-widget-bg border border-ko-border-primary rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <Link
          href={href}
          className="w-10 h-10 rounded-lg bg-ko-card-bg border border-ko-border-primary hover:border-ko-brand-primary hover:bg-ko-brand-primary/10 flex items-center justify-center transition-all group"
        >
          <Icon
            name="ti ti-arrow-left"
            className="w-5 h-5 text-ko-text-card-meta group-hover:text-ko-brand-primary transition-colors"
          />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-ko-text-card-title flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
            {title}
          </h1>
          <p className="text-ko-text-card-meta mt-2 ml-7">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
