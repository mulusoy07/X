export interface SecurityErrors {
  code?: string
  password?: string
  email?: string
  phone?: string
  itemLock?: string
  message?: string
}

export interface SecurityPageProps {
  maskedEmail: string | null
  maskedPhone: string | null
  verificationToken?: string | null
  errors?: SecurityErrors
  info?: string
}

export interface TwoFactorStatus {
  enabled: boolean
  method: 'sms' | 'email' | 'both' | null
}
