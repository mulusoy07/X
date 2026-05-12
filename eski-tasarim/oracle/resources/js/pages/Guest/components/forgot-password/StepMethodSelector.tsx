import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'

export function StepMethodSelector({ accountName, emailMasked, gsmMasked, onNext }) {
  const [selectedMethod, setSelectedMethod] = useState('email')

  const form = useForm({
    accountName: accountName,
    method: 'email',
  }).withPrecognition('post', route('public.guest.forgot-password.send-code'))

  const handleSubmit = async (e) => {
    e.preventDefault()

    form.setData('method', selectedMethod)

    try {
      const response = await form.submit()

      if (response?.expiresIn) {
        await onNext(selectedMethod, response.expiresIn)
      }
    } catch (error) {
      //
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Icon name="ti ti-shield-check" className="h-5 w-5 text-ko-brand-primary" />
          <p className="text-sm text-ko-text-primary">
            {t('auth.forgot.method_selector.info')}
          </p>
        </div>
      </div>

      <div
        onClick={() => setSelectedMethod('email')}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'email'
          ? 'border-ko-brand-primary bg-ko-brand-primary/10'
          : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'email' ? 'border-ko-brand-primary' : 'border-ko-border-primary'}`}>
            {selectedMethod === 'email' && (
              <div className="w-3 h-3 rounded-full bg-ko-brand-primary" />
            )}
          </div>
          <Icon name="ti ti-mail" className="w-6 h-6 text-ko-brand-primary" />
          <div className="flex-1">
            <div className="font-semibold text-ko-text-primary">Email</div>
            <div className="text-sm text-ko-text-muted font-mono">{emailMasked}</div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setSelectedMethod('sms')}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'sms'
          ? 'border-ko-brand-primary bg-ko-brand-primary/10'
          : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'sms' ? 'border-ko-brand-primary' : 'border-ko-border-primary'}`}>
            {selectedMethod === 'sms' && <div className="w-3 h-3 rounded-full bg-ko-brand-primary" />}
          </div>
          <Icon name="ti ti-smartphone" className="w-6 h-6 text-ko-brand-primary" />
          <div className="flex-1">
            <div className="font-semibold text-ko-text-primary">SMS</div>
            <div className="text-sm text-ko-text-muted font-mono">{gsmMasked}</div>
          </div>
        </div>
      </div>

      {form.invalid('method') && (
        <div className="flex items-center gap-2 text-ko-karus text-sm bg-ko-karus/10 border border-ko-karus/30 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <Icon name="ti ti-alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{form.errors.method}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={form.processing}
        className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
      >
        {form.processing ? (
          <>
            <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
            {t('auth.forgot.method_selector.sending')}
          </>
        ) : (
          <>
            {t('auth.forgot.method_selector.send_button')}
            <Icon name="ti ti-arrow-right" className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  )
}
