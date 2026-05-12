import { useState, useEffect, ReactNode } from 'react'
import { router } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { VerificationStepper } from './VerificationStepper'
import { ChannelSelector, type VerificationChannel } from './ChannelSelector'
import { OtpInput } from './OtpInput'
import { useCountdown } from './useCountdown'
import { VERIFICATION_CODE_EXPIRY } from './constants'

export type VerificationAction = 'password_change' | 'email_change' | 'gsm_change' | 'item_lock_change'

interface SecurityStepFlowProps {
  maskedPhone?: string
  maskedEmail?: string
  action: VerificationAction
  verificationToken?: string | null
  children: ReactNode
  verificationTitle?: string
  verificationDescription?: string
  formTitle?: string
  formDescription?: string
  error?: string
  info?: string
  onTranslate: (key: string) => string
}

type VerifyStep = 'select' | 'code'

export function SecurityStepFlow({
  maskedPhone,
  maskedEmail,
  action,
  verificationToken,
  children,
  verificationTitle,
  verificationDescription,
  formTitle,
  formDescription,
  error: serverError,
  info,
  onTranslate: t,
}: SecurityStepFlowProps) {
  // Main step: verify or form
  const [step, setStep] = useState<'verify' | 'form'>(() => (verificationToken ? 'form' : 'verify'))
  
  // Verification sub-step: select channel or enter code
  const [verifyStep, setVerifyStep] = useState<VerifyStep>(() => (info ? 'code' : 'select'))
  
  // Selected channel
  const [channel, setChannel] = useState<VerificationChannel | null>(() => {
    // Auto-select if only one option available
    if (maskedEmail && !maskedPhone) return 'email'
    if (maskedPhone && !maskedEmail) return 'sms'
    return null
  })
  
  // OTP code (6 digits)
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  
  // Loading state
  const [loading, setLoading] = useState(false)
  
  // Countdown timer using custom hook
  const { countdown, formatted: formattedCountdown, reset: resetCountdown, isExpired } = useCountdown(
    info ? VERIFICATION_CODE_EXPIRY : 0
  )
  
  // Client-side error
  const [clientError, setClientError] = useState<string | null>(null)

  // Sync with server state
  useEffect(() => {
    if (verificationToken) {
      setStep('form')
    }
  }, [verificationToken])

  useEffect(() => {
    if (info && verifyStep === 'select') {
      setVerifyStep('code')
      resetCountdown(VERIFICATION_CODE_EXPIRY)
    }
  }, [info, verifyStep, resetCountdown])

  const handleSendCode = () => {
    if (!channel) return

    setLoading(true)
    setClientError(null)

    router.post(
      route('public.account.security.send-code'),
      { action, channel },
      {
        onSuccess: () => {
          setVerifyStep('code')
          resetCountdown(VERIFICATION_CODE_EXPIRY)
          setCode(['', '', '', '', '', ''])
        },
        onError: () => {
          setClientError(t('account.security.otp.send_failed'))
        },
        onFinish: () => setLoading(false),
        preserveScroll: true,
      }
    )
  }

  const handleVerifyCode = () => {
    const codeStr = code.join('')
    if (codeStr.length !== 6) return

    setLoading(true)
    setClientError(null)

    router.post(
      route('public.account.security.verify-code'),
      { code: codeStr, action },
      {
        onError: () => {
          setCode(['', '', '', '', '', ''])
          setClientError(t('account.security.otp.invalid_code'))
        },
        onFinish: () => setLoading(false),
        preserveScroll: true,
      }
    )
  }

  const handleResendCode = () => {
    if (!isExpired || !channel) return
    handleSendCode()
  }

  const handleBackToSelect = () => {
    setVerifyStep('select')
    setCode(['', '', '', '', '', ''])
    setClientError(null)
  }

  const displayError = serverError || clientError

  // STEP 2: Form (after verification)
  if (step === 'form') {
    return (
      <div>
        <VerificationStepper
          currentStep="form"
          verificationLabel={t('account.security.verification')}
          updateLabel={t('account.security.update')}
        />

        {/* Success Indicator */}
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Icon name="ti ti-shield-check" className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-500">
              {t('account.security.identity_verified')}
            </p>
            <p className="text-xs text-ko-text-card-meta">
              {channel === 'sms'
                ? t('account.security.verification_successful_sms')
                : t('account.security.verification_successful_email')}
            </p>
          </div>
        </div>

        {/* Form Title */}
        {(formTitle || formDescription) && (
          <div className="mb-6">
            {formTitle && <h3 className="text-lg font-bold text-ko-text-card-title">{formTitle}</h3>}
            {formDescription && <p className="text-sm text-ko-text-card-meta mt-1">{formDescription}</p>}
          </div>
        )}

        {children}
      </div>
    )
  }

  // STEP 1: Verification
  return (
    <div>
      <VerificationStepper
        currentStep="verify"
        verificationLabel={t('account.security.verification')}
        updateLabel={t('account.security.update')}
      />

      {/* Title */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-ko-brand-primary/20 flex items-center justify-center mx-auto mb-4">
          <Icon name="ti ti-shield-lock" className="w-8 h-8 text-ko-brand-primary" />
        </div>
        <h3 className="text-lg font-bold text-ko-text-card-title">
          {verificationTitle || t('account.security.identity_verification')}
        </h3>
        <p className="text-sm text-ko-text-card-meta mt-1">
          {verificationDescription || t('account.security.continue_verification')}
        </p>
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500 flex items-center gap-2">
            <Icon name="ti ti-alert-circle" className="w-4 h-4" />
            {displayError}
          </p>
        </div>
      )}

      {/* Sub-step: Channel Selection */}
      {verifyStep === 'select' && (
        <div className="space-y-6">
          <p className="text-sm text-ko-text-card-meta text-center">
            {t('account.security.select_verification_method')}
          </p>

          <ChannelSelector
            maskedPhone={maskedPhone}
            maskedEmail={maskedEmail}
            selectedChannel={channel}
            onChannelSelect={setChannel}
            disabled={loading}
          />

          <button
            type="button"
            onClick={handleSendCode}
            disabled={!channel || loading}
            className="w-full h-14 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-base rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                {t('account.security.otp.sending')}
              </>
            ) : (
              <>
                <Icon name="ti ti-send" className="w-5 h-5" />
                {t('account.security.send_verification_code')}
              </>
            )}
          </button>
        </div>
      )}

      {/* Sub-step: Code Entry */}
      {verifyStep === 'code' && (
        <div className="space-y-6">
          {/* Selected Channel Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ko-brand-primary/10 text-ko-brand-primary text-sm font-medium mb-4">
              <Icon name={channel === 'sms' ? 'ti ti-device-mobile' : 'ti ti-mail'} className="w-4 h-4" />
              {channel === 'sms' ? maskedPhone : maskedEmail}
            </div>
            <p className="text-sm text-ko-text-card-meta">
              {t('account.security.enter_6_digit_sent')}
            </p>
          </div>

          {/* OTP Input */}
          <OtpInput
            value={code}
            onChange={setCode}
            disabled={loading}
            error={!!displayError}
            autoFocus
          />

          {/* Resend Link */}
          <div className="text-center">
            {!isExpired ? (
              <p className="text-sm text-ko-text-card-meta">
                {t('account.security.wait_to_resend')}: <span className="font-bold text-ko-brand-primary">{formattedCountdown}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-sm text-ko-brand-primary hover:underline font-semibold disabled:opacity-50"
              >
                {t('account.security.resend_code')}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBackToSelect}
              disabled={loading}
              className="flex-1 h-14 rounded-xl border border-ko-border-primary bg-ko-card-bg hover:bg-ko-widget-bg text-ko-text-card-title font-semibold transition-colors disabled:opacity-50"
            >
              {t('account.security.back')}
            </button>

            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={code.join('').length !== 6 || loading}
              className="flex-[2] h-14 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-base rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                  {t('account.security.otp.verifying')}
                </>
              ) : (
                <>
                  <Icon name="ti ti-shield-check" className="w-5 h-5" />
                  {t('account.security.verify_continue')}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
