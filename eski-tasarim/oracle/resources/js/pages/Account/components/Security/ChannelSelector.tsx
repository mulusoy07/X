import { Icon } from '@/components/shared/icon'

export type VerificationChannel = 'sms' | 'email'

interface ChannelSelectorProps {
  maskedPhone?: string
  maskedEmail?: string
  selectedChannel: VerificationChannel | null
  onChannelSelect: (channel: VerificationChannel) => void
  disabled?: boolean
}

export function ChannelSelector({
  maskedPhone,
  maskedEmail,
  selectedChannel,
  onChannelSelect,
  disabled = false,
}: ChannelSelectorProps) {
  const hasPhone = !!maskedPhone
  const hasEmail = !!maskedEmail

  if (!hasPhone && !hasEmail) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <p className="text-sm text-red-500 flex items-center gap-2">
          <Icon name="ti ti-alert-circle" className="w-4 h-4" />
          No verification methods available
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* SMS Option */}
      {hasPhone && (
        <button
          type="button"
          onClick={() => onChannelSelect('sms')}
          disabled={disabled}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedChannel === 'sms'
              ? 'border-ko-brand-primary bg-ko-brand-primary/10 shadow-lg shadow-ko-brand-primary/10'
              : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50 hover:shadow-md'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedChannel === 'sms' ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
            }`}
          >
            <Icon
              name="ti ti-device-mobile"
              className={`w-7 h-7 ${
                selectedChannel === 'sms' ? 'text-ko-brand-primary' : 'text-ko-text-muted'
              }`}
            />
          </div>
          <div className="flex-1 text-left">
            <span className="font-bold text-ko-text-card-title block">SMS</span>
            <p className="text-sm text-ko-text-card-meta mt-0.5">{maskedPhone}</p>
          </div>
          {selectedChannel === 'sms' && (
            <div className="w-6 h-6 rounded-full bg-ko-brand-primary flex items-center justify-center">
              <Icon name="ti ti-check" className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
      )}

      {/* Email Option */}
      {hasEmail && (
        <button
          type="button"
          onClick={() => onChannelSelect('email')}
          disabled={disabled}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedChannel === 'email'
              ? 'border-ko-brand-primary bg-ko-brand-primary/10 shadow-lg shadow-ko-brand-primary/10'
              : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50 hover:shadow-md'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedChannel === 'email' ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
            }`}
          >
            <Icon
              name="ti ti-mail"
              className={`w-7 h-7 ${
                selectedChannel === 'email' ? 'text-ko-brand-primary' : 'text-ko-text-muted'
              }`}
            />
          </div>
          <div className="flex-1 text-left">
            <span className="font-bold text-ko-text-card-title block">Email</span>
            <p className="text-sm text-ko-text-card-meta mt-0.5">{maskedEmail}</p>
          </div>
          {selectedChannel === 'email' && (
            <div className="w-6 h-6 rounded-full bg-ko-brand-primary flex items-center justify-center">
              <Icon name="ti ti-check" className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
      )}
    </div>
  )
}
