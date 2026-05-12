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
  GSM_TIPS,
  PHONE_NUMBER_LENGTH,
  type SecurityPageProps,
} from '../components/Security'
import { useTranslation } from '@/hooks/useTranslation'

export default function ChangeGSM() {
  const { t } = useTranslation()
  const { maskedEmail, maskedPhone, verificationToken, errors, info } =
    usePage<InertiaPageProps<SecurityPageProps>>().props

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.post(
      route('public.account.security.gsm.store'),
      { verificationToken, phone },
      {
        onFinish: () => setLoading(false),
        preserveScroll: true,
      }
    )
  }

  const isValidPhone = useMemo(() => phone.length === PHONE_NUMBER_LENGTH, [phone])

  return (
    <AccountPageWrapper>
      <Head title={t('account.security.change_gsm_title')} />

      <SecurityPageHeader
        title={t('account.security.change_gsm_title')}
        subtitle={t('account.security.change_gsm_subtitle')}
      />

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader
          title={
            verificationToken
              ? t('account.security.new_phone_number')
              : t('account.security.security_verification')
          }
        />

        <div className="p-6">
          <SecurityStepFlow
            maskedPhone={maskedPhone ?? undefined}
            maskedEmail={maskedEmail ?? undefined}
            action="gsm_change"
            verificationToken={verificationToken}
            error={errors?.code}
            info={info}
            verificationTitle={t('account.security.verify_identity')}
            verificationDescription={t('account.security.verify_identity_gsm')}
            formTitle={t('account.security.enter_new_phone')}
            formDescription={t('account.security.phone_format_hint')}
            onTranslate={t}
          >
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-ko-text-card-title font-semibold text-sm flex items-center gap-2">
                  <Icon name="ti ti-smartphone" className="w-4 h-4 text-ko-brand-primary" />
                  {t('account.security.new_phone_number')}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-ko-card-bg border border-r-0 border-ko-border-primary rounded-l-xl text-ko-text-card-meta text-sm font-mono">
                    +90
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('account.security.phone_placeholder')}
                    disabled={loading}
                    maxLength={PHONE_NUMBER_LENGTH}
                    inputMode="numeric"
                    className={`flex-1 px-4 py-3 bg-ko-widget-bg border rounded-r-xl text-ko-text-card-title focus:outline-none focus:border-ko-brand-primary transition-colors ${
                      errors?.phone ? 'border-red-400' : 'border-ko-border-primary'
                    }`}
                  />
                </div>
                {errors?.phone && (
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <Icon name="ti ti-alert-circle" className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Phone Format Info */}
              <div className="p-4 rounded-xl bg-ko-widget-bg border border-ko-border-primary">
                <p className="text-xs font-semibold text-ko-text-card-title mb-3 uppercase tracking-wider">
                  {t('account.security.phone_requirements')}
                </p>
                <div className="flex items-center gap-2">
                  <Icon
                    name={isValidPhone ? 'ti ti-circle-check-filled' : 'ti ti-circle'}
                    className={`w-4 h-4 ${isValidPhone ? 'text-green-500' : 'text-ko-text-muted'}`}
                  />
                  <span className={`text-xs ${isValidPhone ? 'text-green-500' : 'text-ko-text-card-meta'}`}>
                    {t('account.security.valid_phone_format')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !isValidPhone}
                  className="h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                      {t('account.security.updating')}
                    </>
                  ) : (
                    <>
                      <Icon name="ti ti-phone" className="w-5 h-5" />
                      {t('account.security.update_gsm')}
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

      <SecurityInfoCard tips={GSM_TIPS} />
    </AccountPageWrapper>
  )
}

ChangeGSM.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
