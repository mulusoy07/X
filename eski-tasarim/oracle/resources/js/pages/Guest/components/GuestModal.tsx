import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

interface GuestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GuestModal({ open, onOpenChange }: GuestModalProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[520px] !p-0 !bg-ko-card/90 !backdrop-blur-md !border-ko-border-primary !rounded-2xl overflow-hidden !shadow-2xl">
        <DialogTitle className="sr-only">
          {activeTab === 'login' ? t('auth.tabs.login') : t('auth.tabs.register')}
        </DialogTitle>
        <div className="relative">
          <div className="relative p-6 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
            
            {/* Close button - theme styled */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-ko-card-bg/50 hover:bg-ko-widget-bg border border-ko-border-primary hover:border-ko-brand-primary/50 flex items-center justify-center transition-all group/close z-10"
            >
              <Icon name="ti ti-x" className="w-4 h-4 text-ko-text-muted group-hover/close:text-ko-brand-primary transition-colors" />
            </button>
            
            <div className="flex items-center gap-3 mb-4 pr-8 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/20 flex items-center justify-center border border-ko-brand-primary/30 group-hover:scale-110 transition-transform duration-300 text-ko-brand-primary">
                <Icon name={activeTab === 'login' ? 'ti ti-login' : 'ti ti-user-plus'} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-ko-text-primary">
                  {activeTab === 'login' ? t('auth.tabs.login') : t('auth.tabs.register')}
                </h2>
                <p className="text-xs text-ko-text-muted">
                  {activeTab === 'login' ? t('auth.modal.login_subtitle') : t('auth.modal.register_subtitle')}
                </p>
              </div>
            </div>

            <div className="relative bg-ko-widget-bg/50 rounded-xl p-1 border border-ko-border-primary">
              <div className="flex relative">
                <div className={cn(
                  'absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary transition-all duration-300 shadow-md',
                  activeTab === 'login' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
                )} />
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={cn(
                    'relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2',
                    activeTab === 'login' ? 'text-white' : 'text-ko-text-muted hover:text-ko-text-primary'
                  )}
                >
                  <Icon name="ti ti-login" className="w-4 h-4" />
                  {t('auth.tabs.login')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={cn(
                    'relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2',
                    activeTab === 'register' ? 'text-white' : 'text-ko-text-muted hover:text-ko-text-primary'
                  )}
                >
                  <Icon name="ti ti-user-plus" className="w-4 h-4" />
                  {t('auth.tabs.register')}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'login' ? (
              <LoginForm
                showFooterLink={false}
                showTurnstile={false}
                isModal={true}
                onSuccess={() => onOpenChange(false)}
              />
            ) : (
              <RegisterForm
                showFooterLink={false}
                showTurnstile={false}
                showTermsCheckbox={true}
                isModal={true}
                onSuccess={() => onOpenChange(false)}
              />
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-ko-border-primary/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-ko-card px-3 text-xs text-ko-text-muted/60 uppercase tracking-wider">
                    {t('auth.common.or')}
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-ko-text-muted">
                  {activeTab === 'login' ? t('auth.login.no_account') : t('auth.register.have_account')}{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                    className="text-ko-brand-primary hover:text-ko-brand-secondary transition-colors hover:underline font-medium"
                  >
                    {activeTab === 'login' ? t('auth.tabs.register') : t('auth.tabs.login')}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
