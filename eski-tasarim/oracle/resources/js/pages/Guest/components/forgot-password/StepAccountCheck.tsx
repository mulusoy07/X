import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/shared/icon'
import { TurnstileWrapper } from '../TurnstileWrapper'

export function StepAccountCheck({ onNext, turnstile }) {
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const form = useForm({
    accountName: '',
    'cf-turnstile-response': '',
  }).withPrecognition('post', route('public.guest.forgot-password.check'))

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await form.submit()

      if (response?.emailMasked && response?.gsmMasked) {
        await onNext(form.data.accountName, {
          emailMasked: response.emailMasked,
          gsmMasked: response.gsmMasked,
        })
      }
    } catch (error) {
      setTurnstileResetKey(prev => prev + 1)
      form.setData('cf-turnstile-response', '')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Icon name="ti ti-shield-check" className="h-5 w-5 text-ko-brand-primary" />
          <p className="text-sm text-ko-text-primary">
            {t('auth.forgot.account_check.info')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative group/input">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ko-text-muted pointer-events-none transition-colors group-focus-within/input:text-ko-brand-primary">
            <Icon name="ti ti-user" className="w-5 h-5" />
          </div>
          <Input
            type="text"
            value={form.data.accountName}
            onChange={(e) => form.setData('accountName', e.target.value)}
            onBlur={() => form.validate('accountName')}
            placeholder={t('auth.forgot.account_check.placeholder')}
            className={`bg-ko-widget-bg border-ko-border-primary text-ko-text-primary h-12 pl-11 placeholder:text-ko-text-muted transition-all duration-200 focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 ${form.invalid('accountName') ? 'border-ko-karus focus:border-ko-karus' : ''}`}
            disabled={form.processing}
            maxLength={20}
            autoComplete="username"
            autoFocus
          />
        </div>
        {form.invalid('accountName') && (
          <div className="flex items-center gap-2 text-ko-karus text-xs mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{form.errors.accountName}</span>
          </div>
        )}
      </div>

      <TurnstileWrapper
        turnstile={turnstile}
        onVerify={(token) => form.setData('cf-turnstile-response', token)}
        onError={() => form.setData('cf-turnstile-response', '')}
        error={form.invalid('cf-turnstile-response') ? form.errors['cf-turnstile-response'] : undefined}
        resetKey={turnstileResetKey}
      />

      <Button
        type="submit"
        disabled={form.processing || !form.data.accountName}
        className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
      >
        {form.processing ? (
          <>
            <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
            {t('auth.forgot.account_check.checking')}
          </>
        ) : (
          <>
            {t('auth.forgot.account_check.check_button')}
            <Icon name="ti ti-arrow-right" className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  )
}
