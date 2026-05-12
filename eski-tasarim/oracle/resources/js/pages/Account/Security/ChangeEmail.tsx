import { useState, useMemo } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import type { InertiaPageProps } from '@/types/inertia'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AccountPageWrapper } from '../components'
import {
  SecurityStepFlow,
  SecurityPageHeader,
  SecurityCardHeader,
  SecurityInfoCard,
  EMAIL_TIPS,
  type SecurityPageProps,
} from '../components/Security'
import { useTranslation } from '@/hooks/useTranslation'

export default function ChangeEmail() {
  const { t } = useTranslation()
  const { maskedEmail, maskedPhone, verificationToken, errors, info } =
    usePage<InertiaPageProps<SecurityPageProps>>().props

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.post(
      route('public.account.security.email.store'),
      { verificationToken, email },
      {
        onFinish: () => setLoading(false),
        preserveScroll: true,
      }
    )
  }

  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])

  return (
    <AccountPageWrapper>
      <Head title={t('account.security.change_email_title')} />

      <SecurityPageHeader
        title={t('account.security.change_email_title')}
        subtitle={t('account.security.change_email_subtitle')}
      />

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader
          title={
            verificationToken
              ? t('account.security.new_email_address')
              : t('account.security.security_verification')
          }
        />

        <div className="p-6">
          <SecurityStepFlow
            maskedPhone={maskedPhone ?? undefined}
            maskedEmail={maskedEmail ?? undefined}
            action="email_change"
            verificationToken={verificationToken}
            error={errors?.code}
            info={info}
            verificationTitle={t('account.security.verify_identity')}
            verificationDescription={t('account.security.verify_identity_email')}
            formTitle={t('account.security.enter_new_email')}
            formDescription={t('account.security.email_format_hint')}
            onTranslate={t}
          >
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('account.security.email_placeholder')}
                  disabled={loading}
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-xl bg-ko-widget-bg border text-ko-text-card-title focus:outline-none focus:border-ko-brand-primary transition-colors ${
                    errors?.email ? 'border-red-400' : 'border-ko-border-primary'
                  }`}
                />
                {errors?.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Email Format Info */}
              <div className="p-4 rounded-xl bg-ko-widget-bg border border-ko-border-primary">
                <p className="text-xs font-semibold text-ko-text-card-title mb-3 uppercase tracking-wider">
                  {t('account.security.email_requirements')}
                </p>
                <div className="flex items-center gap-2">
                  <Icon
                    name={isValidEmail ? 'ti ti-circle-check-filled' : 'ti ti-circle'}
                    className={`w-4 h-4 ${isValidEmail ? 'text-green-500' : 'text-ko-text-muted'}`}
                  />
                  <span className={`text-xs ${isValidEmail ? 'text-green-500' : 'text-ko-text-card-meta'}`}>
                    {t('account.security.valid_email_format')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !email || !isValidEmail}
                  className="h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                      {t('account.security.updating')}
                    </>
                  ) : (
                    <>
                      <Icon name="ti ti-mail" className="w-5 h-5" />
                      {t('account.security.update_email')}
                    </>
                  )}
                </button>
                <Link
                  href={route('public.account.security.index')}
                  className="h-12 px-6 rounded-lg border border-ko-border-primary bg-ko-card-bg hover:bg-ko-widget-bg text-ko-text-card-title font-semibold flex items-center justify-center transition-colors"
                >
                  {t('account.security.cancel')}
                </Link>
              </div>
            </form>
          </SecurityStepFlow>
        </div>
      </div>

      <SecurityInfoCard tips={EMAIL_TIPS} />
    </AccountPageWrapper>
  )
}

ChangeEmail.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
