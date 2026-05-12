import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import type { InertiaPageProps } from '@/types/inertia'
import { Icon } from '@/components/shared/icon'
import { OtpVerificationModal } from '@/components/shared'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AccountPageWrapper } from '../components'
import { SecurityPageHeader, SecurityCardHeader, TWO_FACTOR_STEPS, type SecurityPageProps, type TwoFactorStatus } from '../components/Security'
import { useTranslation } from '@/hooks/useTranslation'

interface TwoFactorProps extends SecurityPageProps {
  gameTwoFactor: TwoFactorStatus
  webTwoFactor: TwoFactorStatus
}

type LoginType = 'game' | 'web'
type VerificationMethod = 'sms' | 'email' | 'both'

interface ToggleSwitchProps {
  checked: boolean
  onChange: () => void
}

const ToggleSwitch = memo(function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={checked ? 'Disable' : 'Enable'}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-ko-brand-primary' : 'bg-ko-border-primary'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
})

interface MethodSelectorProps {
  type: LoginType
  value: VerificationMethod | null
  disabled: boolean
  maskedEmail: string | null
  maskedPhone: string | null
  onChange: (type: LoginType, method: VerificationMethod) => void
}

const MethodSelector = memo(function MethodSelector({
  type,
  value,
  disabled,
  maskedEmail,
  maskedPhone,
  onChange,
}: MethodSelectorProps) {
  const { t } = useTranslation()
  
  const methods = useMemo(
    () => [
      {
        id: 'sms' as VerificationMethod,
        icon: 'ti ti-device-mobile',
        label: 'SMS',
        desc: maskedPhone ?? '+90 *** *** ** **',
      },
      {
        id: 'email' as VerificationMethod,
        icon: 'ti ti-mail',
        label: 'Email',
        desc: maskedEmail ?? '***@***.***',
      },
      {
        id: 'both' as VerificationMethod,
        icon: 'ti ti-shield-lock',
        label: t('account.security.both'),
        desc: t('account.security.both_desc'),
      },
    ],
    [maskedPhone, maskedEmail, t]
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {methods.map((m) => (
        <label
          key={m.id}
          className={[
            'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all',
            value === m.id
              ? 'border-ko-brand-primary bg-ko-brand-primary/10'
              : 'border-ko-border-primary bg-ko-widget-bg hover:border-ko-brand-primary/50',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
          onClick={() => !disabled && onChange(type, m.id)}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
              value === m.id ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
            }`}
          >
            <Icon
              name={m.icon}
              className={`w-5 h-5 ${value === m.id ? 'text-ko-brand-primary' : 'text-ko-text-muted'}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-ko-text-card-title text-sm block">{m.label}</span>
            <p className="text-xs text-ko-text-card-meta truncate">{m.desc}</p>
          </div>
          {value === m.id && (
            <div className="w-5 h-5 rounded-full bg-ko-brand-primary flex items-center justify-center flex-shrink-0">
              <Icon name="ti ti-check" className="w-3 h-3 text-white" />
            </div>
          )}
        </label>
      ))}
    </div>
  )
})

export default function TwoFactor() {
  const { t } = useTranslation()
  const { maskedEmail, maskedPhone, gameTwoFactor, webTwoFactor, verificationToken } =
    usePage<InertiaPageProps<TwoFactorProps>>().props

  const [gameLogin, setGameLogin] = useState({ enabled: gameTwoFactor.enabled, method: gameTwoFactor.method })
  const [webLogin, setWebLogin] = useState({ enabled: webTwoFactor.enabled, method: webTwoFactor.method })
  const [openAccordion, setOpenAccordion] = useState<LoginType>('game')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<LoginType | null>(null)
  const [modalAction, setModalAction] = useState<'enable' | 'disable' | null>(null)

  // Handle verification token from backend
  useEffect(() => {
    if (!verificationToken || !modalType || modalAction === null) return

    const type = modalType
    const enabled = modalAction === 'enable'
    const currentLogin = type === 'game' ? gameLogin : webLogin
    const method = enabled ? currentLogin.method || 'email' : currentLogin.method

    router.post(
      route('public.account.security.two-factor.toggle'),
      { verificationToken, type, enabled, method },
      {
        onSuccess: () => {
          if (type === 'game') {
            setGameLogin((prev) => ({ ...prev, enabled, method: enabled ? method || 'email' : prev.method }))
          } else {
            setWebLogin((prev) => ({ ...prev, enabled, method: enabled ? method || 'email' : prev.method }))
          }
          setModalType(null)
          setModalAction(null)
        },
        onError: () => {
          setModalType(null)
          setModalAction(null)
        },
      }
    )
  }, [verificationToken, modalType, modalAction, gameLogin, webLogin])

  const handleSwitchToggle = useCallback((type: LoginType, currentEnabled: boolean) => {
    setModalType(type)
    setModalAction(currentEnabled ? 'disable' : 'enable')
    setShowModal(true)
  }, [])

  const handleSendCode = useCallback(
    async (channel: 'sms' | 'email'): Promise<{ success: boolean; expiresIn?: number; message?: string }> => {
      return new Promise((resolve) => {
        router.post(
          route('public.account.security.send-code'),
          { action: '2fa_toggle', channel },
          {
            preserveState: true,
            onSuccess: () => resolve({ success: true, expiresIn: 900 }),
            onError: (errors) => resolve({ success: false, message: errors?.message || t('common.otp.code_send_failed') }),
          }
        )
      })
    },
    [t]
  )

  const handleVerify = useCallback(
    async (code: string): Promise<{ success: boolean; message?: string }> => {
      return new Promise((resolve) => {
        router.post(
          route('public.account.security.verify-code'),
          { code, action: '2fa_toggle' },
          {
            preserveState: true,
            onSuccess: () => resolve({ success: true }),
            onError: (errors) => resolve({ success: false, message: errors?.code || t('common.otp.invalid_code') }),
          }
        )
      })
    },
    [t]
  )

  const handleMethodChange = useCallback((type: LoginType, method: VerificationMethod) => {
    if (type === 'game') setGameLogin((prev) => ({ ...prev, method }))
    else setWebLogin((prev) => ({ ...prev, method }))
    router.post(route('public.account.security.two-factor.method'), { type, method })
  }, [])

  const getMethodLabel = useCallback(
    (method: VerificationMethod | null) => {
      if (!method) return ''
      if (method === 'sms') return t('account.security.sms')
      if (method === 'email') return 'Email'
      if (method === 'both') return t('account.security.both')
      return ''
    },
    [t]
  )

  const renderLoginSection = useCallback(
    (type: LoginType) => {
      const login = type === 'game' ? gameLogin : webLogin
      const isOpen = openAccordion === type

      return (
        <div
          key={type}
          className={`rounded-xl border transition-all overflow-hidden ${
            login.enabled
              ? 'border-ko-brand-primary/50 bg-ko-brand-primary/5'
              : 'border-ko-border-primary bg-ko-widget-bg'
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <button
              type="button"
              onClick={() => setOpenAccordion(isOpen ? (type === 'game' ? 'web' : 'game') : type)}
              className="flex-1 flex items-center gap-3 text-left"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  login.enabled ? 'bg-ko-brand-primary/20' : 'bg-ko-card-bg'
                }`}
              >
                <Icon
                  name={type === 'game' ? 'ti ti-device-gamepad-2' : 'ti ti-world-www'}
                  className={`w-5 h-5 ${login.enabled ? 'text-ko-brand-primary' : 'text-ko-text-muted'}`}
                />
              </div>
              <div>
                <h5 className="font-semibold text-ko-text-card-title flex items-center gap-2">
                  {type === 'game' ? t('account.security.game_login') : t('account.security.web_login')}
                  {login.enabled && login.method && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ko-brand-primary/20 text-ko-brand-primary font-medium">
                      {getMethodLabel(login.method)}
                    </span>
                  )}
                </h5>
                <p className="text-xs text-ko-text-card-meta">
                  {type === 'game' ? t('account.security.game_login_desc') : t('account.security.web_login_desc')}
                </p>
              </div>
            </button>
            <div className="flex items-center gap-3">
              <Icon
                name="ti ti-chevron-down"
                className={`w-5 h-5 text-ko-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
              <ToggleSwitch checked={login.enabled} onChange={() => handleSwitchToggle(type, login.enabled)} />
            </div>
          </div>

          {isOpen && (
            <div className="px-4 pb-4 pt-0">
              <div className="pt-4 border-t border-ko-border-primary">
                <p className="text-sm text-ko-text-card-meta mb-4">{t('account.security.select_verification_method')}</p>
                <MethodSelector
                  type={type}
                  value={login.method}
                  disabled={!login.enabled}
                  maskedEmail={maskedEmail}
                  maskedPhone={maskedPhone}
                  onChange={handleMethodChange}
                />
              </div>
            </div>
          )}
        </div>
      )
    },
    [gameLogin, webLogin, openAccordion, maskedEmail, maskedPhone, t, getMethodLabel, handleSwitchToggle, handleMethodChange]
  )

  return (
    <AccountPageWrapper>
      <Head title={t('account.security.two_factor_title')} />

      <SecurityPageHeader
        title={t('account.security.two_factor_title')}
        subtitle={t('account.security.two_factor_subtitle')}
      />

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader title={t('account.security.login_types')} />
        <div className="p-6 space-y-4">
          {renderLoginSection('game')}
          {renderLoginSection('web')}

          <div className="pt-2">
            <Link
              href={route('public.account.security.index')}
              className="h-12 px-6 rounded-lg border border-ko-border-primary bg-ko-card-bg hover:bg-ko-widget-bg text-ko-text-card-title font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Icon name="ti ti-arrow-left" className="w-5 h-5" />
              {t('account.security.back_to_security')}
            </Link>
          </div>
        </div>
      </div>

      <div className="border border-ko-border-primary bg-ko-card rounded-2xl overflow-hidden">
        <SecurityCardHeader title={t('account.security.how_it_works')} icon="ti ti-info-circle" animated={false} />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TWO_FACTOR_STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-3 p-4 bg-ko-widget-bg rounded-xl">
                <div className="w-8 h-8 rounded-full bg-ko-brand-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-ko-brand-primary font-bold text-sm">{step.n}</span>
                </div>
                <div>
                  <h5 className="font-semibold text-ko-text-card-title text-sm">
                    {t(`account.security.${step.titleKey}`)}
                  </h5>
                  <p className="text-xs text-ko-text-card-meta mt-1">{t(`account.security.${step.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        open={showModal}
        onOpenChange={setShowModal}
        title={modalAction === 'enable' ? t('account.security.enable_2fa') : t('account.security.disable_2fa')}
        description={modalType === 'game' ? t('account.security.game_login') : t('account.security.web_login')}
        icon={modalAction === 'enable' ? 'ti ti-shield-check' : 'ti ti-shield-off'}
        iconColor={modalAction === 'enable' ? 'green' : 'red'}
        mode="select"
        maskedPhone={maskedPhone}
        maskedEmail={maskedEmail}
        onSendCode={handleSendCode}
        onVerify={handleVerify}
      />
    </AccountPageWrapper>
  )
}

TwoFactor.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>
