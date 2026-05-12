import { Icon } from '@/components/shared/icon'

export function ForgotHero({ currentStep }) {
  const steps = [
    {
      number: 1,
      title: t('auth.forgot.hero.step1_title'),
      description: t('auth.forgot.hero.step1_desc'),
    },
    {
      number: 2,
      title: t('auth.forgot.hero.step2_title'),
      description: t('auth.forgot.hero.step2_desc'),
    },
    {
      number: 3,
      title: t('auth.forgot.hero.step3_title'),
      description: t('auth.forgot.hero.step3_desc'),
    },
    {
      number: 4,
      title: t('auth.forgot.hero.step4_title'),
      description: t('auth.forgot.hero.step4_desc'),
    },
  ]

  return (
    <div className="flex flex-col justify-center space-y-8 relative">
      <div className="relative space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-full backdrop-blur-sm hover:bg-ko-brand-primary/20 transition-all duration-300 group">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <span className="text-sm font-bold text-ko-brand-primary uppercase tracking-wider">
              {t('auth.forgot.hero.secure_operation')}
            </span>
            <Icon name="ti ti-sparkles" className="w-3 h-3 text-ko-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h1 className="text-6xl font-black text-ko-text-primary leading-tight">
            {t('auth.forgot.hero.title_line1')}
            <br />
            <span className="bg-gradient-to-r from-ko-brand-primary via-ko-brand-secondary to-ko-brand-primary bg-clip-text text-transparent animate-gradient">
              {t('auth.forgot.hero.title_line2')}
            </span>
          </h1>

          <p className="text-lg text-ko-text-muted max-w-lg leading-relaxed">
            {t('auth.forgot.hero.description')}
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${currentStep > step.number
                    ? 'bg-ko-status-online'
                    : currentStep === step.number
                      ? 'bg-ko-brand-primary'
                      : 'bg-ko-widget-bg border border-ko-border-primary'
                  }`}
              >
                {currentStep > step.number ? (
                  <Icon name="ti ti-check" className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={`font-bold ${currentStep === step.number ? 'text-white' : 'text-ko-text-muted'
                      }`}
                  >
                    {step.number}
                  </span>
                )}
              </div>
              <div>
                <h3
                  className={`font-semibold mb-1 ${currentStep === step.number ? 'text-ko-brand-primary' : 'text-ko-text-primary'
                    }`}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-ko-text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-ko-card/80 backdrop-blur-sm border border-ko-border-primary rounded-xl p-6 hover:border-ko-brand-primary/50 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="ti ti-shield-check" className="w-5 h-5 text-ko-brand-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-ko-text-primary mb-2">{t('auth.forgot.hero.security_title')}</h4>
              <p className="text-sm text-ko-text-muted">
                {t('auth.forgot.hero.security_desc')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
