import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog'

type VerificationChannel = 'sms' | 'email'
type IconColor = 'green' | 'red' | 'blue' | 'yellow'

interface OtpVerificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  // Display options
  title?: string
  description?: string
  icon?: string
  iconColor?: IconColor

  // Contact info (masked)
  maskedPhone?: string | null
  maskedEmail?: string | null

  // Mode: 'select' = user picks channel, 'direct' = skip channel selection
  mode?: 'select' | 'direct'

  // For direct mode: which method(s) code was sent to (0=SMS, 1=Email, 2=Both)
  method?: number

  // Countdown in seconds (for direct mode, code already sent)
  initialCountdown?: number

  // Callbacks
  onSendCode?: (channel: VerificationChannel) => Promise<{ success: boolean; expiresIn?: number; message?: string }>
  onVerify: (code: string, channel?: VerificationChannel) => Promise<{ success: boolean; message?: string }>
  onResend?: (channel?: VerificationChannel) => Promise<{ success: boolean; expiresIn?: number; message?: string }>
}

export function OtpVerificationModal({
  open,
  onOpenChange,
  title,
  description,
  icon = 'ti ti-shield-check',
  iconColor = 'blue',
  maskedPhone,
  maskedEmail,
  mode = 'select',
  method = 0,
  initialCountdown = 300,
  onSendCode,
  onVerify,
  onResend,
}: OtpVerificationModalProps) {
  const { t } = useTranslation()
  const displayTitle = title ?? t('common.otp.verification')
  const [step, setStep] = useState<'select' | 'verify'>('select')
  const [channel, setChannel] = useState<VerificationChannel | null>(null)
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Icon color classes - updated to match GuestModal gradient style
  const iconColorClasses: Record<IconColor, string> = {
    green: 'from-green-500/20 to-green-600/20 text-green-500',
    red: 'from-red-500/20 to-red-600/20 text-red-500',
    blue: 'from-ko-brand-primary/20 to-ko-brand-secondary/20 text-ko-brand-primary',
    yellow: 'from-yellow-500/20 to-yellow-600/20 text-yellow-500',
  }

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setCode(['', '', '', '', '', ''])
      setLoading(false)
      setError(null)

      if (mode === 'direct') {
        // Direct mode: skip channel selection, code already sent
        setStep('verify')
        setCountdown(initialCountdown)
        setResendCooldown(0)
        // Determine channel from method for display
        setChannel(method === 1 ? 'email' : 'sms')
        setTimeout(() => inputRefs.current[0]?.focus(), 100)
      } else {
        // Select mode: user picks channel first
        setStep('select')
        setChannel(null)
        setCountdown(0)
        setResendCooldown(0)
      }
    }
  }, [open, mode, initialCountdown, method])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Get display message based on method (for direct mode)
  const getMethodDisplay = () => {
    switch (method) {
      case 0: // SMS
        return {
          icon: 'ti ti-device-mobile',
          text: maskedPhone ? t('common.otp.to_phone_number', { phone: maskedPhone }) : t('common.otp.to_your_phone'),
        }
      case 1: // Email
        return {
          icon: 'ti ti-mail',
          text: maskedEmail ? t('common.otp.to_email_address', { email: maskedEmail }) : t('common.otp.to_your_email'),
        }
      case 2: // Both
        return {
          icon: 'ti ti-shield-lock',
          text: t('common.otp.to_phone_and_email'),
        }
      default:
        return {
          icon: 'ti ti-shield-lock',
          text: t('common.otp.to_you'),
        }
    }
  }

  // Handle send code (select mode)
  const handleSendCode = async () => {
    if (!channel || !onSendCode) return

    setLoading(true)
    setError(null)

    try {
      const result = await onSendCode(channel)

      if (!result.success) {
        setError(result.message || t('common.otp.code_send_failed'))
        setLoading(false)
        return
      }

      setStep('verify')
      setCountdown(result.expiresIn || 300)
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    } catch {
      setError(t('common.otp.generic_error'))
    } finally {
      setLoading(false)
    }
  }

  // Handle code input change
  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    setError(null)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all filled
    if (value && index === 5 && newCode.every(d => d)) {
      handleVerify(newCode.join(''))
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()

      if (code[index]) {
        const newCode = [...code]
        newCode[index] = ''
        setCode(newCode)
      } else if (index > 0) {
        const newCode = [...code]
        newCode[index - 1] = ''
        setCode(newCode)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)

    if (pastedData.length === 0) return

    const newCode = [...code]
    pastedData.split('').forEach((char, i) => {
      newCode[i] = char
    })
    setCode(newCode)
    setError(null)

    const focusIndex = Math.min(pastedData.length, 5)
    inputRefs.current[focusIndex]?.focus()

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  // Handle verify
  const handleVerify = async (codeStr?: string) => {
    const otpCode = codeStr || code.join('')
    if (otpCode.length !== 6) {
      setError(t('common.otp.enter_6_digit_code'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await onVerify(otpCode, channel || undefined)

      if (!result.success) {
        setError(result.message || t('common.otp.invalid_code'))
        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        setLoading(false)
        return
      }

      // Success - modal will be closed by parent
      onOpenChange(false)
    } catch {
      setError(t('common.otp.generic_error'))
    } finally {
      setLoading(false)
    }
  }

  // Handle resend
  const handleResend = async () => {
    if (resendCooldown > 0) return

    setLoading(true)
    setError(null)

    try {
      if (onResend) {
        const result = await onResend(channel || undefined)

        if (!result.success) {
          setError(result.message || t('common.otp.code_send_failed'))
          setLoading(false)
          return
        }

        setCountdown(result.expiresIn || 300)
      } else if (onSendCode && channel) {
        const result = await onSendCode(channel)

        if (!result.success) {
          setError(result.message || t('common.otp.code_send_failed'))
          setLoading(false)
          return
        }

        setCountdown(result.expiresIn || 300)
      }

      setResendCooldown(60)
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch {
      setError(t('common.otp.code_send_failed'))
    } finally {
      setLoading(false)
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const methodDisplay = getMethodDisplay()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="!bg-black/80" />
        <DialogContent 
          className="sm:max-w-md !bg-ko-card/95 !backdrop-blur-md !border-ko-border-primary !rounded-2xl !shadow-2xl !p-0 overflow-hidden"
          showCloseButton={false}
        >
          {/* Header with gradient background - matching GuestModal design */}
          <div className="relative">
            <div className="relative p-6 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
              
              {/* Close button - theme styled */}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-ko-card-bg/50 hover:bg-ko-widget-bg border border-ko-border-primary hover:border-ko-brand-primary/50 flex items-center justify-center transition-all group/close"
              >
                <Icon name="ti ti-x" className="w-4 h-4 text-ko-text-muted group-hover/close:text-ko-brand-primary transition-colors" />
              </button>
              
              {/* Icon + Title + Description */}
              <div className="flex items-center gap-3 pr-8 group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColorClasses[iconColor]} flex items-center justify-center border border-ko-brand-primary/30 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={icon} className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-lg font-bold text-ko-text-primary">
                    {displayTitle}
                  </DialogTitle>
                  {description && (
                    <DialogDescription className="text-xs text-ko-text-muted">
                      {description}
                    </DialogDescription>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <Icon name="ti ti-alert-circle" className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            {step === 'select' ? (
              <>
                <p className="text-sm text-ko-text-card-meta mb-4">
                  {t('common.otp.select_method')}
                </p>

                <div className="space-y-3">
                  {/* SMS Option */}
                  <button
                    type="button"
                    onClick={() => setChannel('sms')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      channel === 'sms'
                        ? 'border-ko-brand-primary bg-ko-brand-primary/10'
                        : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      channel === 'sms' ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
                    }`}>
                      <Icon name="ti ti-device-mobile" className={`w-5 h-5 ${channel === 'sms' ? 'text-ko-brand-primary' : 'text-ko-text-muted'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-semibold text-ko-text-card-title text-sm block">{t('common.otp.verify_via_sms')}</span>
                      <p className="text-xs text-ko-text-card-meta">{maskedPhone || '+90 *** *** ** **'}</p>
                    </div>
                    {channel === 'sms' && (
                      <div className="w-5 h-5 rounded-full bg-ko-brand-primary flex items-center justify-center">
                        <Icon name="ti ti-check" className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Email Option */}
                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      channel === 'email'
                        ? 'border-ko-brand-primary bg-ko-brand-primary/10'
                        : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      channel === 'email' ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
                    }`}>
                      <Icon name="ti ti-mail" className={`w-5 h-5 ${channel === 'email' ? 'text-ko-brand-primary' : 'text-ko-text-muted'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-semibold text-ko-text-card-title text-sm block">{t('common.otp.verify_via_email')}</span>
                      <p className="text-xs text-ko-text-card-meta">{maskedEmail || '***@***.***'}</p>
                    </div>
                    {channel === 'email' && (
                      <div className="w-5 h-5 rounded-full bg-ko-brand-primary flex items-center justify-center">
                        <Icon name="ti ti-check" className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={!channel || loading}
                  className="w-full mt-6 h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold"
                >
                  {loading ? (
                    <>
                      <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
                      {t('common.otp.sending')}
                    </>
                  ) : (
                    <>
                      <Icon name="ti ti-send" className="w-5 h-5 mr-2" />
                      {t('common.otp.send_code')}
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                {/* Verify Step */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-ko-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon name={methodDisplay.icon} className="w-8 h-8 text-ko-brand-primary" />
                  </div>
                  <p className="text-sm text-ko-text-card-meta">
                    {t('common.otp.enter_6_digit_code_sent', { destination: methodDisplay.text })}
                  </p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-ko-border-primary bg-ko-widget-bg text-ko-text-card-title focus:border-ko-brand-primary focus:ring-2 focus:ring-ko-brand-primary/20 outline-none transition-all disabled:opacity-50"
                    />
                  ))}
                </div>

                {/* Countdown */}
                <div className="text-center mb-4">
                  <p className={`text-sm font-medium ${countdown < 30 ? 'text-red-500' : 'text-ko-text-muted'}`}>
                    {t('common.otp.remaining_time')} {formatTime(countdown)}
                  </p>
                </div>

                {/* Verify Button */}
                <Button
                  onClick={() => handleVerify()}
                  disabled={loading || code.some(d => !d) || countdown === 0}
                  className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold"
                >
                  {loading ? (
                    <>
                      <Icon name="ti ti-loader-2" className="w-5 h-5 mr-2 animate-spin" />
                      {t('common.otp.verifying')}
                    </>
                  ) : (
                    <>
                      <Icon name="ti ti-shield-check" className="w-5 h-5 mr-2" />
                      {t('common.otp.verify')}
                    </>
                  )}
                </Button>

                {/* Resend */}
                <div className="text-center mt-4">
                  {resendCooldown > 0 ? (
                    <p className="text-sm text-ko-text-card-meta">
                      {t('common.otp.wait_seconds_to_resend', { seconds: resendCooldown })}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      className="text-sm text-ko-brand-primary hover:underline font-semibold disabled:opacity-50"
                    >
                      {t('common.otp.resend_code')}
                    </button>
                  )}
                </div>

                {/* Back to select (only in select mode) */}
                {mode === 'select' && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep('select')
                      setCode(['', '', '', '', '', ''])
                      setError(null)
                    }}
                    className="w-full mt-3 text-sm text-ko-text-card-meta hover:text-ko-brand-primary transition-colors"
                  >
                    {t('common.otp.choose_different_method')}
                  </button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
