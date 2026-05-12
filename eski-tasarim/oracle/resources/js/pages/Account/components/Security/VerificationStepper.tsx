import { Icon } from '@/components/shared/icon'

interface VerificationStepperProps {
  currentStep: 'verify' | 'form'
  verificationLabel?: string
  updateLabel?: string
}

export function VerificationStepper({
  currentStep,
  verificationLabel = 'Verification',
  updateLabel = 'Update',
}: VerificationStepperProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {/* Step 1: Verification */}
      <div className="flex items-center gap-2">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            currentStep === 'verify'
              ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
              : 'bg-green-500 text-white'
          }`}
        >
          {currentStep === 'form' ? <Icon name="ti ti-check" className="w-5 h-5" /> : '1'}
        </div>
        <span
          className={`text-sm font-medium ${
            currentStep === 'verify' ? 'text-ko-text-card-title' : 'text-green-500'
          }`}
        >
          {verificationLabel}
        </span>
      </div>

      {/* Connector Line */}
      <div
        className={`w-16 h-1 rounded-full transition-all ${
          currentStep === 'form'
            ? 'bg-gradient-to-r from-green-500 to-ko-brand-primary'
            : 'bg-ko-border-primary'
        }`}
      />

      {/* Step 2: Update */}
      <div className="flex items-center gap-2">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            currentStep === 'form'
              ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
              : 'bg-ko-widget-bg text-ko-text-muted border border-ko-border-primary'
          }`}
        >
          2
        </div>
        <span
          className={`text-sm font-medium ${
            currentStep === 'form' ? 'text-ko-text-card-title' : 'text-ko-text-muted'
          }`}
        >
          {updateLabel}
        </span>
      </div>
    </div>
  )
}
