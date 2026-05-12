import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/shared/icon'

export function StepVerifyCode({
  accountName,
  selectedMethod,
  countdown,
  canResend,
  onNext,
  onResend
}) {
  const verifyForm = useForm({
    accountName: accountName,
    code: '',
  }).withPrecognition('post', route('public.guest.forgot-password.verify-code'))

  const resendForm = useForm({
    accountName: accountName,
    method: selectedMethod,
  }).withPrecognition('post', route('public.guest.forgot-password.send-code'))

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerifySubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await verifyForm.submit()

      if (response?.resetToken) {
        await onNext(response.resetToken)
      }
    } catch (error) {
      //
    }
  }

  const handleResendClick = async () => {
    try {
      const response = await resendForm.submit()

      if (response?.expiresIn) {
        verifyForm.setData('code', '')
        verifyForm.clearErrors()
        await onResend(response.expiresIn)
      }
    } catch (error) {
      //
    }
  }

  return (
    <form onSubmit={handleVerifySubmit} className="space-y-5">
      {countdown > 0 && (
        <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Icon name="ti ti-clock" className="h-5 w-5 text-ko-brand-primary" />
            <p className="text-sm text-ko-text-primary">
              {t('auth.forgot.verify_code.validity')} <span className="font-bold">{formatCountdown(countdown)}</span>
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Input
          type="text"
          value={verifyForm.data.code}
          onChange={(e) => verifyForm.setData('code', e.target.value.replace(/\D/g, ''))}
          onBlur={() => verifyForm.validate('code')}
          placeholder={t('auth.forgot.verify_code.placeholder')}
          className={`bg-ko-widget-bg border-ko-border-primary text-ko-text-primary h-14 text-center text-2xl tracking-widest font-bold placeholder:text-ko-text-muted transition-all duration-200 focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 ${verifyForm.invalid('code') ? 'border-ko-karus focus:border-ko-karus' : ''}`}
          disabled={verifyForm.processing || resendForm.processing}
          maxLength={6}
          inputMode="numeric"
          autoFocus
        />
        {verifyForm.invalid('code') && (
          <div className="flex items-center gap-2 text-ko-karus text-xs mt-1 justify-center animate-in fade-in slide-in-from-top-1 duration-200">
            <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{verifyForm.errors.code}</span>
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={verifyForm.processing || resendForm.processing || verifyForm.data.code.length !== 6}
        className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
      >
        {verifyForm.processing ? (
          <>
            <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
            {t('auth.forgot.verify_code.verifying')}
          </>
        ) : (
          <>
            {t('auth.forgot.verify_code.verify_button')}
            <Icon name="ti ti-arrow-right" className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      {resendForm.invalid('error') && (
        <div className="flex items-center gap-2 text-ko-karus text-sm bg-ko-karus/10 border border-ko-karus/30 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <Icon name="ti ti-alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{resendForm.errors.error}</span>
        </div>
      )}

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={verifyForm.processing || resendForm.processing}
            className="text-sm text-ko-brand-primary hover:text-ko-brand-secondary font-semibold transition-colors disabled:opacity-50"
          >
            {resendForm.processing ? (
              <span className="inline-flex items-center gap-2">
                <Icon name="ti ti-loader-2" className="w-3 h-3 animate-spin" />
                {t('auth.forgot.verify_code.sending')}
              </span>
            ) : (
              t('auth.forgot.verify_code.resend')
            )}
          </button>
        ) : (
          <p className="text-sm text-ko-text-muted">
            {t('auth.forgot.verify_code.resend_in')} {formatCountdown(countdown)}
          </p>
        )}
      </div>
    </form>
  )
}
