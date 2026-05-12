import Turnstile from './Turnstile'
import { Icon } from '@/components/shared/icon'

export function TurnstileWrapper({ turnstile, onVerify, onError, error, resetKey }) {
  if (!turnstile.enabled || !turnstile.siteKey) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className="bg-ko-widget-bg/50 border border-ko-border-primary rounded-lg p-2 transition-all hover:border-ko-brand-primary/30 h-[82px] w-80 min-h-[82px]">
        <Turnstile
          siteKey={turnstile.siteKey}
          onVerify={onVerify}
          onError={onError}
          resetKey={resetKey}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-ko-karus text-xs mt-1">
          <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
