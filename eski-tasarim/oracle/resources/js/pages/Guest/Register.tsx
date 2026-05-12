import { Icon } from '@/components/shared/icon'
import {
  AuthHero,
  BackgroundLayer,
  FormTabs,
  FormHeader,
  FormDisabled,
  RegisterForm,
} from './components'

export default function RegisterPage() {
  const { config, meta } = usePage().props as any
  const [isFormFocused, setIsFormFocused] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-ko-main via-ko-card to-ko-main flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundLayer isFormFocused={isFormFocused} />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-20 w-96 h-96 opacity-20 transition-all duration-1000">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-ko-brand-primary/40 via-ko-brand-primary/20 to-transparent blur-2xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-ko-brand-secondary/20 via-transparent to-transparent blur-3xl scale-150" />
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden lg:block">
          <AuthHero />
        </div>

        <div className="w-full">
          <FormTabs active="register" />

          <div
            className="border border-ko-border-primary bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl relative"
            style={{ backdropFilter: isFormFocused ? 'blur(20px)' : 'blur(12px)' }}
            onFocus={() => setIsFormFocused(true)}
            onBlur={() => setIsFormFocused(false)}
          >
            <FormHeader
              icon={meta?.page?.icon ? <Icon name={meta.page.icon} className="w-5 h-5" /> : undefined}
              title={meta?.page?.title}
              subtitle={meta?.page?.description}
            />

            {!config.enabled ? (
              <FormDisabled type="register" />
            ) : (
              <div className="p-6">
                <RegisterForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
