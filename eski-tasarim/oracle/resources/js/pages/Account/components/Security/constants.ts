// Verification & Security Constants

export const VERIFICATION_CODE_EXPIRY = 900 // 15 minutes in seconds
export const VERIFICATION_CODE_LENGTH = 6
export const ITEM_LOCK_LENGTH = 8
export const PHONE_NUMBER_LENGTH = 10
export const PASSWORD_MIN_LENGTH = 4
export const PASSWORD_MAX_LENGTH = 16
export const RESEND_COOLDOWN = 60 // seconds

// Info Tips for different security pages
export const PASSWORD_TIPS = [
  { icon: 'ti ti-lock', titleKey: 'tip_strong_password_title', descKey: 'tip_strong_password_desc' },
  { icon: 'ti ti-refresh', titleKey: 'tip_regular_change_title', descKey: 'tip_regular_change_desc' },
  { icon: 'ti ti-eye-off', titleKey: 'tip_keep_secret_title', descKey: 'tip_keep_secret_desc' },
] as const

export const EMAIL_TIPS = [
  { icon: 'ti ti-mail-check', titleKey: 'verification', descKey: 'verification_desc' },
  { icon: 'ti ti-bell', titleKey: 'notifications', descKey: 'notifications_desc' },
  { icon: 'ti ti-lock', titleKey: 'security_notify', descKey: 'security_notify_desc' },
] as const

export const GSM_TIPS = [
  { icon: 'ti ti-message', titleKey: 'sms_verification', descKey: 'sms_verification_desc' },
  { icon: 'ti ti-shield-check', titleKey: '2fa_update', descKey: '2fa_update_desc' },
  { icon: 'ti ti-clock', titleKey: 'instant_change', descKey: 'instant_change_desc' },
] as const

export const ITEM_LOCK_TIPS = [
  { icon: 'ti ti-lock', titleKey: 'item_protection', descKey: 'item_protection_desc' },
  { icon: 'ti ti-numbers', titleKey: 'eight_digits', descKey: 'eight_digits_desc' },
  { icon: 'ti ti-eye-off', titleKey: 'tip_keep_secret_title', descKey: 'tip_keep_secret_desc' },
] as const

export const TWO_FACTOR_STEPS = [
  { n: '1', titleKey: 'step_login', descKey: 'step_login_desc' },
  { n: '2', titleKey: 'step_get_code', descKey: 'step_get_code_desc' },
  { n: '3', titleKey: 'step_verify', descKey: 'step_verify_desc' },
] as const
