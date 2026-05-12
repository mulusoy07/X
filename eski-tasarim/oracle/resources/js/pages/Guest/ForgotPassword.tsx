import { Icon } from '@/components/shared/icon'
import { FormDisabled } from './components/FormDisabled'
import { BackgroundLayer } from './components/BackgroundLayer'
import { FormHeader } from './components/FormHeader'
import {
  ForgotHero,
  StepAccountCheck,
  StepMethodSelector,
  StepVerifyCode,
  StepResetPassword,
} from './components/forgot-password'

export default function ForgotPassword() {
  const { meta, config } = usePage().props
  const [currentStep, setCurrentStep] = useState(1)
  const [isFormFocused, setIsFormFocused] = useState(false)

  const [accountName, setAccountName] = useState('')
  const [emailMasked, setEmailMasked] = useState('')
  const [gsmMasked, setGsmMasked] = useState('')

  const [selectedMethod, setSelectedMethod] = useState('email')

  const [countdown, setCountdown] = useState(0)
  const [canResend, setCanResend] = useState(true)

  const [resetToken, setResetToken] = useState('')

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleStep1 = (accountNameValue, data) => {
    setAccountName(accountNameValue)
    setEmailMasked(data.emailMasked)
    setGsmMasked(data.gsmMasked)
    setCurrentStep(2)
  }

  const handleStep2 = (method, expiresIn) => {
    setSelectedMethod(method)
    setCountdown(expiresIn || 120)
    setCanResend(false)
    setCurrentStep(3)
  }

  const handleStep3 = (token) => {
    setResetToken(token)
    setCurrentStep(4)
  }

  const handleResend = (expiresIn) => {
    setCountdown(expiresIn || 120)
    setCanResend(false)
  }

  const handleStep4 = () => {
    setCurrentStep(5)
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return t('auth.forgot.steps.enter_username')
      case 2: return t('auth.forgot.steps.select_method')
      case 3: return t('auth.forgot.steps.enter_code')
      case 4: return t('auth.forgot.steps.set_password')
      case 5: return t('auth.forgot.steps.completed')
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ko-main via-ko-card to-ko-main flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundLayer isFormFocused={isFormFocused} />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 opacity-20">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-ko-brand-primary/40 via-ko-brand-primary/20 to-transparent blur-2xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-ko-brand-secondary/20 via-transparent to-transparent blur-3xl scale-150" />
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden lg:block">
          <ForgotHero currentStep={currentStep} />
        </div>

        <div className="w-full">
          <div
            className="border border-ko-border-primary bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 relative"
            style={{ backdropFilter: isFormFocused ? 'blur(20px)' : 'blur(12px)' }}
            onFocus={() => setIsFormFocused(true)}
            onBlur={() => setIsFormFocused(false)}
          >
            <FormHeader
              icon={meta?.page?.icon ? <Icon name={meta.page.icon} className="w-5 h-5" /> : undefined}
              title={meta?.page?.title}
              subtitle={config.enabled ? getStepSubtitle() : meta?.page?.description}
            />

            {!config.enabled ? (
              <FormDisabled type="forgot-password" />
            ) : (
              <div className="p-6">
                {currentStep === 1 && (
                  <StepAccountCheck onNext={handleStep1} turnstile={config.turnstile} />
                )}

                {currentStep === 2 && (
                  <StepMethodSelector
                    accountName={accountName}
                    emailMasked={emailMasked}
                    gsmMasked={gsmMasked}
                    onNext={handleStep2}
                  />
                )}

                {currentStep === 3 && (
                  <StepVerifyCode
                    accountName={accountName}
                    selectedMethod={selectedMethod}
                    countdown={countdown}
                    canResend={canResend}
                    onNext={handleStep3}
                    onResend={handleResend}
                  />
                )}

                {currentStep === 4 && (
                  <StepResetPassword
                    accountName={accountName}
                    resetToken={resetToken}
                    onNext={handleStep4}
                  />
                )}

                {currentStep === 5 && (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-20 h-20 bg-ko-status-online/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="ti ti-key" className="w-10 h-10 text-ko-status-online" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-ko-text-primary mb-2">{t('auth.forgot.success.title')}</h3>
                      <p className="text-ko-text-muted">{t('auth.forgot.success.description')}</p>
                    </div>

                    <div className="bg-ko-status-online/10 border border-ko-status-online/30 rounded-xl p-4">
                      <p className="text-sm text-ko-text-primary">{t('auth.forgot.success.info')}</p>
                    </div>

                    <Link
                      href={route('public.guest.login')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold rounded-lg transition-all hover:scale-105"
                    >
                      {t('auth.forgot.success.login_button')}
                    </Link>
                  </div>
                )}

                {currentStep < 5 && (
                  <div className="pt-4 text-center border-t border-ko-border-primary mt-6">
                    <Link
                      href={route('public.guest.login')}
                      className="inline-flex items-center gap-2 text-sm text-ko-brand-primary hover:text-ko-brand-secondary font-semibold transition-colors"
                    >
                      <Icon name="ti ti-arrow-left" className="w-4 h-4" />
                      {t('auth.forgot.back_to_login')}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:hidden mt-8 text-center space-y-4">
            <p className="text-ko-text-muted text-sm max-w-md mx-auto">
              {t('auth.forgot.step_of', { current: currentStep, total: 4 })} - {getStepSubtitle()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
