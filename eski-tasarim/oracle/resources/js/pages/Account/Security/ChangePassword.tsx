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
  PASSWORD_TIPS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  type SecurityPageProps,
} from '../components/Security'
import { useTranslation } from '@/hooks/useTranslation'

export default function ChangePassword() {
  const { t } = useTranslation()
  const { maskedEmail, maskedPhone, verificationToken, errors, info } =
    usePage<InertiaPageProps<SecurityPageProps>>().props

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.post(
      route('public.account.security.password.store'),
      { verificationToken, password, password_confirmation: passwordConfirm },
      {
        onFinish: () => setLoading(false),
        preserveScroll: true,
      }
    )
  }

  const passwordRequirements = useMemo(
    () => [
      {
        label: t('account.security.req_4_16_chars'),
        valid: password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH,
      },
      {
        label: t('account.security.req_passwords_match'),
        valid: password === passwordConfirm && password.length > 0,
      },
    ],
    [password, passwordConfirm, t]
  )

  const isFormValid = passwordRequirements.every((req) => req.valid)

  return (
    <AccountPageWrapper>
      <Head title={t('account.security.change_password')} />

      <SecurityPageHeader
        title={t('account.security.change_password')}
        subtitle={t('account.security.tip_change_regularly')}
      />

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader
          title={
            verificationToken
              ? t('account.security.new_password_set')
              : t('account.security.security_verification')
          }
        />

        <div className="p-6">
          <SecurityStepFlow
            maskedPhone={maskedPhone ?? undefined}
            maskedEmail={maskedEmail ?? undefined}
            action="password_change"
            verificationToken={verificationToken}
            error={errors?.code}
            info={info}
            verificationTitle={t('account.security.verify_identity')}
            verificationDescription={t('account.security.verify_identity_password')}
            formTitle={t('account.security.set_new_password')}
            formDescription={t('account.security.password_hint')}
            onTranslate={t}
          >
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
              {/* New Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('account.security.new_password')}
                  disabled={loading}
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-ko-widget-bg border text-ko-text-card-title focus:outline-none focus:border-ko-brand-primary transition-colors ${
                    errors?.password ? 'border-red-400' : 'border-ko-border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t('account.security.hide_password') : t('account.security.show_password')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-text-card-meta hover:text-ko-brand-primary transition-colors"
                >
                  <Icon name={showPassword ? 'ti ti-eye-off' : 'ti ti-eye'} className="w-5 h-5" />
                </button>
                {errors?.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder={t('account.security.new_password_confirm')}
                  disabled={loading}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-ko-widget-bg border border-ko-border-primary text-ko-text-card-title focus:outline-none focus:border-ko-brand-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? t('account.security.hide_password') : t('account.security.show_password')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-text-card-meta hover:text-ko-brand-primary transition-colors"
                >
                  <Icon name={showConfirm ? 'ti ti-eye-off' : 'ti ti-eye'} className="w-5 h-5" />
                </button>
              </div>

              {/* Password Requirements */}
              <div className="p-4 rounded-xl bg-ko-widget-bg border border-ko-border-primary">
                <p className="text-xs font-semibold text-ko-text-card-title mb-3 uppercase tracking-wider">
                  {t('account.security.password_requirements')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      <Icon
                        name={req.valid ? 'ti ti-circle-check-filled' : 'ti ti-circle'}
                        className={`w-4 h-4 ${req.valid ? 'text-green-500' : 'text-ko-text-muted'}`}
                      />
                      <span className={`text-xs ${req.valid ? 'text-green-500' : 'text-ko-text-card-meta'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                      {t('account.security.updating')}
                    </>
                  ) : (
                    <>
                      <Icon name="ti ti-key" className="w-5 h-5" />
                      {t('account.security.update_password')}
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

      <SecurityInfoCard tips={PASSWORD_TIPS} headerTitle={t('account.security.security_tips')} />
    </AccountPageWrapper>
  )
}

ChangePassword.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
