import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@/components/shared/icon'

export function StepResetPassword({ accountName, resetToken, onNext }) {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm(
    'post',
    route('public.guest.forgot-password.reset'),
    {
      accountName: accountName,
      resetToken: resetToken,
      newPassword: '',
      newPasswordConfirmation: '',
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await form.submit()
      await onNext()
    } catch (error) {
      //
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-ko-status-online/10 border border-ko-status-online/30 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Icon name="ti ti-check" className="h-5 w-5 text-ko-status-online" />
          <p className="text-sm text-ko-text-primary">
            {t('auth.forgot.reset_password.code_verified')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-ko-text-primary font-semibold flex items-center gap-2">
          <Icon name="ti ti-lock" className="w-4 h-4 text-ko-brand-primary" />
          {t('auth.forgot.reset_password.new_password')}
          <span className="text-ko-karus">*</span>
        </Label>
        <div className="relative group/input">
          <Input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={form.data.newPassword}
            onChange={(e) => form.setData('newPassword', e.target.value)}
            onBlur={() => form.validate('newPassword')}
            placeholder={t('auth.forgot.reset_password.new_password_placeholder')}
            className={`bg-ko-widget-bg border-ko-border-primary text-ko-text-primary h-12 pr-11 placeholder:text-ko-text-muted transition-all duration-200 focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 ${form.invalid('newPassword') ? 'border-ko-karus focus:border-ko-karus' : ''}`}
            disabled={form.processing}
            maxLength={16}
            autoComplete="new-password"
          />

          {form.data.newPassword && !form.invalid('newPassword') && (
            <div className="absolute right-11 top-1/2 -translate-y-1/2 text-ko-status-online pointer-events-none animate-scale-in">
              <Icon name="ti ti-circle-check" className="w-5 h-5" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-text-muted hover:text-ko-brand-primary transition-all z-10 hover:scale-110"
            disabled={form.processing}
          >
            {showNewPassword ? <Icon name="ti ti-eye-off" className="w-5 h-5" /> : <Icon name="ti ti-eye" className="w-5 h-5" />}
          </button>
        </div>
        {form.invalid('newPassword') && (
          <div className="flex items-center gap-2 text-ko-karus text-xs mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{form.errors.newPassword}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPasswordConfirmation" className="text-ko-text-primary font-semibold flex items-center gap-2">
          <Icon name="ti ti-lock" className="w-4 h-4 text-ko-brand-primary" />
          {t('auth.forgot.reset_password.confirm_password')}
          <span className="text-ko-karus">*</span>
        </Label>
        <div className="relative group/input">
          <Input
            id="newPasswordConfirmation"
            type={showConfirmPassword ? 'text' : 'password'}
            value={form.data.newPasswordConfirmation}
            onChange={(e) => form.setData('newPasswordConfirmation', e.target.value)}
            onBlur={() => form.validate('newPasswordConfirmation')}
            placeholder={t('auth.forgot.reset_password.confirm_password_placeholder')}
            className={`bg-ko-widget-bg border-ko-border-primary text-ko-text-primary h-12 pr-11 placeholder:text-ko-text-muted transition-all duration-200 focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 ${form.invalid('newPasswordConfirmation') ? 'border-ko-karus focus:border-ko-karus' : ''}`}
            disabled={form.processing}
            maxLength={16}
            autoComplete="new-password"
          />

          {form.data.newPasswordConfirmation && !form.invalid('newPasswordConfirmation') && (
            <div className="absolute right-11 top-1/2 -translate-y-1/2 text-ko-status-online pointer-events-none animate-scale-in">
              <Icon name="ti ti-circle-check" className="w-5 h-5" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-text-muted hover:text-ko-brand-primary transition-all z-10 hover:scale-110"
            disabled={form.processing}
          >
            {showConfirmPassword ? <Icon name="ti ti-eye-off" className="w-5 h-5" /> : <Icon name="ti ti-eye" className="w-5 h-5" />}
          </button>
        </div>
        {form.invalid('newPasswordConfirmation') && (
          <div className="flex items-center gap-2 text-ko-karus text-xs mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{form.errors.newPasswordConfirmation}</span>
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={form.processing || !form.data.newPassword || !form.data.newPasswordConfirmation}
        className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-105"
      >
        {form.processing ? (
          <>
            <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
            {t('auth.forgot.reset_password.updating')}
          </>
        ) : (
          <>
            <Icon name="ti ti-check" className="w-5 h-5 mr-2" />
            {t('auth.forgot.reset_password.reset_button')}
          </>
        )}
      </Button>
    </form>
  )
}
