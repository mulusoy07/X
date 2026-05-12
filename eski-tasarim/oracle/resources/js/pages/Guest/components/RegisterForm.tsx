import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'
import { Checkbox } from '@/components/ui/checkbox'
import { PhoneInput } from '@/components/shared/PhoneInput'
import { FormInput, FormSeparator, TurnstileWrapper } from './index'

interface RegisterFormProps {
  onSuccess?: () => void
  showFooterLink?: boolean
  showTurnstile?: boolean
  showTermsCheckbox?: boolean
  isModal?: boolean
}

export function RegisterForm({
  onSuccess,
  showFooterLink = true,
  showTurnstile = true,
  showTermsCheckbox = true,
  isModal = false,
}: RegisterFormProps) {
  const { t } = useTranslation()
  const page = usePage()
  const { config } = page.props as any

  const [showPassword, setShowPassword] = useState(false)
  const [showSealPassword, setShowSealPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const form = useForm({
    AccountName: '',
    Password: '',
    Email: '',
    GSMNumber: '',
    SealPassword: '',
    'cf-turnstile-response': '',
    termsAccepted: false,
  }).withPrecognition('post', route('public.guest.register.store'))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setRegisterSuccess(false)

    form.submit({
      onSuccess: () => {
        setRegisterSuccess(true)
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.visit(route('public.home'))
          }
        }, 1000)
      },
      onError: () => {
        setIsSubmitting(false)
        setTurnstileResetKey(prev => prev + 1)
        form.setData('cf-turnstile-response', '')
      },
    })
  }

  return (
    <>
      {registerSuccess && (
        <div className="absolute inset-0 bg-ko-bg/80 backdrop-blur-md z-50 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-green-500/30 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-transparent border-t-green-500 rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-center">
              <p className="text-green-400 font-bold text-lg mb-1">{t('auth.register.success')}</p>
              <p className="text-ko-text-muted text-sm">{t('auth.common.loading')}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon={() => <Icon name="ti ti-user" />}
          value={form.data.AccountName}
          onChange={(e: any) => form.setData('AccountName', e.target.value)}
          onBlur={() => form.validate('AccountName')}
          placeholder={t('auth.register.username_placeholder')}
          error={form.invalid('AccountName') ? form.errors.AccountName : undefined}
          disabled={isSubmitting}
          maxLength={16}
          showValidIcon
          autoComplete="username"
        />

        <FormInput
          icon={() => <Icon name="ti ti-lock" />}
          value={form.data.Password}
          onChange={(e: any) => form.setData('Password', e.target.value)}
          onBlur={() => form.validate('Password')}
          placeholder={t('auth.register.password_placeholder')}
          error={form.invalid('Password') ? form.errors.Password : undefined}
          disabled={isSubmitting}
          maxLength={16}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          autoComplete="new-password"
        />

        <FormInput
          icon={() => <Icon name="ti ti-mail" />}
          type="email"
          value={form.data.Email}
          onChange={(e: any) => form.setData('Email', e.target.value)}
          onBlur={() => form.validate('Email')}
          placeholder={t('auth.register.email_placeholder')}
          error={form.invalid('Email') ? form.errors.Email : undefined}
          disabled={isSubmitting}
          maxLength={100}
          showValidIcon
          autoComplete="email"
        />

        <div className="space-y-2">
          <PhoneInput
            international
            defaultCountry="TR"
            value={form.data.GSMNumber}
            onChange={(value) => form.setData('GSMNumber', value || '')}
            disabled={isSubmitting}
            placeholder={t('auth.register.phone_placeholder')}
            className={form.invalid('GSMNumber') ? 'border-ko-karus focus:border-ko-karus' : ''}
            countryCallingCodeEditable={false}
            limitMaxLength={true}
          />
          {form.invalid('GSMNumber') && (
            <div className="flex items-center gap-2 text-ko-karus text-xs animate-in fade-in slide-in-from-top-1 duration-200">
              <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{form.errors.GSMNumber}</span>
            </div>
          )}
        </div>

        <FormInput
          icon={() => <Icon name="ti ti-key" />}
          value={form.data.SealPassword}
          onChange={(e: any) => {
            const value = e.target.value.replace(/\D/g, '')
            form.setData('SealPassword', value)
          }}
          onBlur={() => form.validate('SealPassword')}
          placeholder={t('auth.register.seal_password_placeholder')}
          error={form.invalid('SealPassword') ? form.errors.SealPassword : undefined}
          disabled={isSubmitting}
          maxLength={8}
          showPasswordToggle
          showPassword={showSealPassword}
          onTogglePassword={() => setShowSealPassword(!showSealPassword)}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        {showTurnstile && config?.turnstile && (
          <TurnstileWrapper
            turnstile={config.turnstile}
            onVerify={(token: string) => form.setData('cf-turnstile-response', token)}
            onError={() => form.setData('cf-turnstile-response', '')}
            error={form.invalid('cf-turnstile-response') ? form.errors['cf-turnstile-response'] : undefined}
            resetKey={turnstileResetKey}
          />
        )}

        {showTermsCheckbox && config?.showTermsCheckbox && (
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={form.data.termsAccepted}
                onCheckedChange={(checked) => form.setData('termsAccepted', checked === true)}
                disabled={isSubmitting}
                className="mt-0.5 border-ko-border-primary data-[state=checked]:bg-ko-brand-primary data-[state=checked]:border-ko-brand-primary"
              />
              <span className="text-sm text-ko-text-muted leading-relaxed group-hover:text-ko-text-secondary transition-colors">
                {t('auth.register.terms_label')}
              </span>
            </label>
            {form.invalid('termsAccepted') && (
              <div className="flex items-center gap-2 text-ko-karus text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{form.errors.termsAccepted}</span>
              </div>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
        >
          {isSubmitting && !registerSuccess ? (
            <>
              <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
              {t('auth.common.loading')}
            </>
          ) : (
            <>
              <Icon name="ti ti-user-plus" className="w-5 h-5 mr-2" />
              {t('auth.register.submit')}
            </>
          )}
        </Button>

        {showFooterLink && (
          <>
            <FormSeparator />

            <div className="text-center">
              <p className="text-sm text-ko-text-muted">
                {t('auth.register.have_account')}{' '}
                <Link
                  href={route('public.guest.login.create')}
                  className="text-ko-brand-primary hover:text-ko-brand-secondary transition-colors hover:underline font-medium"
                >
                  {t('auth.register.login_link')}
                </Link>
              </p>
            </div>
          </>
        )}
      </form>
    </>
  )
}
