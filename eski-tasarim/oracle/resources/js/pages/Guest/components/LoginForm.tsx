import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { OtpVerificationModal } from '@/components/shared'
import { FormInput, FormSeparator, TurnstileWrapper } from './index'

interface LoginFormProps {
  onSuccess?: () => void
  showFooterLink?: boolean
  showTurnstile?: boolean
  isModal?: boolean
}

export function LoginForm({
  onSuccess,
  showFooterLink = true,
  showTurnstile = true,
  isModal = false,
}: LoginFormProps) {
  const { t } = useTranslation()
  const page = usePage()
  const { config } = page.props as any

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const [show2FAModal, setShow2FAModal] = useState(false)
  const [twoFactorMethod, setTwoFactorMethod] = useState(0)
  const [twoFactorPhone, setTwoFactorPhone] = useState<string | null>(null)
  const [twoFactorEmail, setTwoFactorEmail] = useState<string | null>(null)

  const form = useForm({
    AccountName: '',
    Password: '',
    remember: false,
    'cf-turnstile-response': '',
  }).withPrecognition('post', route('public.guest.login.store'))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setLoginSuccess(false)

    form.submit({
      onSuccess: () => {
        setLoginSuccess(true)
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.visit(route('public.home'))
          }
        }, 1000)
      },
      onError: () => {
        const pageProps = page.props as any
        if (pageProps.requires_2fa) {
          setTwoFactorMethod(pageProps.method || 0)
          setTwoFactorPhone(pageProps.phone || null)
          setTwoFactorEmail(pageProps.email || null)
          setShow2FAModal(true)
          setIsSubmitting(false)
          return
        }

        setIsSubmitting(false)
        setTurnstileResetKey(prev => prev + 1)
        form.setData('cf-turnstile-response', '')
      },
    })
  }

  const handle2FAVerify = async (code: string) => {
    try {
      const response = await axios.post(route('public.guest.two-factor.verify'), { otp: code })

      if (response.data.error) {
        return {
          success: false,
          message: response.data.message || t('auth.2fa.invalid_code')
        }
      }

      setLoginSuccess(true)
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        } else {
          router.visit(route('public.home'))
        }
      }, 1000)

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || t('auth.2fa.verification_failed')
      }
    }
  }

  const handle2FAResend = async () => {
    try {
      const response = await axios.post(route('public.guest.two-factor.resend'), {})

      if (response.data.error) {
        return {
          success: false,
          message: response.data.message || t('auth.2fa.code_send_failed')
        }
      }

      return { success: true, expiresIn: 300 }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || t('auth.2fa.code_send_failed')
      }
    }
  }

  return (
    <>
      {loginSuccess && (
        <div className="absolute inset-0 bg-ko-bg/80 backdrop-blur-md z-50 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-green-500/30 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-transparent border-t-green-500 rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-center">
              <p className="text-green-400 font-bold text-lg mb-1">{t('auth.login.success')}</p>
              <p className="text-ko-text-muted text-sm">{t('auth.common.loading')}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          icon={() => <Icon name="ti ti-user" />}
          value={form.data.AccountName}
          onChange={(e: any) => form.setData('AccountName', e.target.value)}
          onBlur={() => form.validate('AccountName')}
          placeholder={t('auth.login.username_placeholder')}
          error={form.invalid('AccountName') ? form.errors.AccountName : undefined}
          disabled={isSubmitting}
          showValidIcon
          autoComplete="username"
        />

        <FormInput
          icon={() => <Icon name="ti ti-lock" />}
          value={form.data.Password}
          onChange={(e: any) => form.setData('Password', e.target.value)}
          onBlur={() => form.validate('Password')}
          placeholder={t('auth.login.password_placeholder')}
          error={form.invalid('Password') ? form.errors.Password : undefined}
          disabled={isSubmitting}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label htmlFor={isModal ? 'remember-login-modal' : 'remember-login'} className="flex items-center gap-2.5 cursor-pointer group">
            <Checkbox
              id={isModal ? 'remember-login-modal' : 'remember-login'}
              checked={form.data.remember}
              onCheckedChange={(checked) => form.setData('remember', checked === true)}
              disabled={isSubmitting}
              className="border-ko-border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-ko-brand-primary data-[state=checked]:to-ko-brand-secondary data-[state=checked]:border-transparent"
            />
            <Label
              htmlFor={isModal ? 'remember-login-modal' : 'remember-login'}
              className="text-sm font-medium text-ko-text-muted cursor-pointer select-none hover:text-ko-text-primary transition-colors"
            >
              {t('auth.login.remember_me')}
            </Label>
          </label>

          {isModal ? (
            <button
              type="button"
              className="text-sm font-medium text-ko-brand-primary hover:text-ko-brand-secondary transition-colors hover:underline"
            >
              {t('auth.login.forgot_password')}?
            </button>
          ) : (
            <Link
              href={route('public.guest.forgot-password.index')}
              className="text-sm font-medium text-ko-brand-primary hover:text-ko-brand-secondary transition-colors hover:underline"
            >
              {t('auth.login.forgot_password')}?
            </Link>
          )}
        </div>

        {showTurnstile && config?.turnstile && (
          <TurnstileWrapper
            turnstile={config.turnstile}
            onVerify={(token: string) => form.setData('cf-turnstile-response', token)}
            onError={() => form.setData('cf-turnstile-response', '')}
            error={form.invalid('cf-turnstile-response') ? form.errors['cf-turnstile-response'] : undefined}
            resetKey={turnstileResetKey}
          />
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
        >
          {isSubmitting && !loginSuccess ? (
            <>
              <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
              {t('auth.common.loading')}
            </>
          ) : (
            <>
              <Icon name="ti ti-login" className="w-5 h-5 mr-2" />
              {t('auth.login.submit')}
            </>
          )}
        </Button>

        {showFooterLink && (
          <>
            <FormSeparator />

            <div className="text-center">
              <p className="text-sm text-ko-text-muted">
                {t('auth.login.no_account')}{' '}
                <Link
                  href={route('public.guest.register')}
                  className="text-ko-brand-primary hover:text-ko-brand-secondary transition-colors hover:underline font-medium"
                >
                  {t('auth.login.register_link')}
                </Link>
              </p>
            </div>
          </>
        )}
      </form>

      <OtpVerificationModal
        open={show2FAModal}
        onOpenChange={setShow2FAModal}
        title={t('auth.2fa.title')}
        description={t('auth.2fa.description')}
        icon="ti ti-shield-lock"
        iconColor="blue"
        mode="direct"
        method={twoFactorMethod}
        maskedPhone={twoFactorPhone}
        maskedEmail={twoFactorEmail}
        initialCountdown={300}
        onVerify={handle2FAVerify}
        onResend={handle2FAResend}
      />
    </>
  )
}
