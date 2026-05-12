<?php

/**
 * Frontend Layout Translations
 * 
 * This file contains all frontend UI translations for the Knight Online theme.
 * These translations are used ONLY in JSX components (not in backend/controllers).
 * 
 * Usage in JSX: const { t } = useTranslation()
 * Example: <button>{t('oracle.layout.auth.login.submit')}</button>
 * 
 * Note: Backend meta/validation/messages are in plugins/knight-online/lang/
 */

return [
    
    // ============================================================================
    // GUEST/LOGIN PAGE (Login.jsx)
    // ============================================================================
    'login.username_placeholder' => 'Enter your username',
    'login.password_placeholder' => 'Enter your password',
    'login.remember_me' => 'Remember me',
    'login.forgot_password' => 'Forgot password?',
    'login.submit' => 'Login',
    'login.no_account' => "Don't have an account?",
    'login.register_link' => 'Register now',
    'login.success' => 'Login successful! Redirecting...',
    'login.logout' => 'Logout',
    
    // ============================================================================
    // GUEST/REGISTER PAGE (Register.jsx)
    // ============================================================================
    'register.username_placeholder' => 'Enter your username (4-16 characters)',
    'register.password_placeholder' => 'Enter your password (4-16 characters)',
    'register.email_placeholder' => 'Enter your email address',
    'register.phone_placeholder' => 'Enter your phone number (optional)',
    'register.seal_password_placeholder' => 'Enter 8-digit item lock password',
    'register.seal_password_help' => 'This password protects your items from being dropped or traded',
    'register.terms_label' => 'I accept the terms and conditions',
    'register.submit' => 'Register',
    'register.have_account' => 'Already have an account?',
    'register.login_link' => 'Login',
    'register.success' => 'Registration successful! Redirecting...',
    
    // ============================================================================
    // GUEST/FORGOT PASSWORD PAGE (ForgotPassword.jsx)
    // ============================================================================
    'forgot.step1.username_placeholder' => 'Enter your username',
    'forgot.step1.submit' => 'Continue',
    'forgot.step2.method_email' => 'Email',
    'forgot.step2.method_sms' => 'SMS',
    'forgot.step2.submit' => 'Send Code',
    'forgot.step3.code_placeholder' => 'Enter 6-digit code',
    'forgot.step3.resend' => 'Resend code',
    'forgot.step3.submit' => 'Verify',
    'forgot.step4.password_placeholder' => 'Enter new password (4-16 characters)',
    'forgot.step4.password_confirm_placeholder' => 'Re-enter your password',
    'forgot.step4.submit' => 'Reset Password',
    'forgot.back_to_login' => 'Back to login',
    'forgot.back' => 'Back',
    'forgot.steps.enter_username' => 'Enter your username to begin',
    'forgot.steps.select_method' => 'Choose verification method',
    'forgot.steps.enter_code' => 'Enter verification code',
    'forgot.steps.set_password' => 'Set your new password',
    'forgot.steps.completed' => 'Password reset successful',
    'forgot.step_of' => 'Step :current of :total',
    'forgot.success.title' => 'Password Reset Successful!',
    'forgot.success.description' => 'Your password has been successfully reset.',
    'forgot.success.info' => 'You can now login with your new password.',
    'forgot.success.login_button' => 'Go to Login',
    
    // Forgot Password Hero (ForgotHero.jsx)
    'forgot.hero.secure_operation' => 'Secure Operation',
    'forgot.hero.title_line1' => 'Reset Your',
    'forgot.hero.title_line2' => 'Password',
    'forgot.hero.description' => 'Follow the secure steps to reset your password and regain access to your account.',
    'forgot.hero.step1_title' => 'Account Verification',
    'forgot.hero.step1_desc' => 'Enter your username',
    'forgot.hero.step2_title' => 'Choose Method',
    'forgot.hero.step2_desc' => 'Select verification method',
    'forgot.hero.step3_title' => 'Verify Code',
    'forgot.hero.step3_desc' => 'Enter the code sent to you',
    'forgot.hero.step4_title' => 'New Password',
    'forgot.hero.step4_desc' => 'Set your new password',
    'forgot.hero.security_title' => 'Secure & Fast',
    'forgot.hero.security_desc' => 'Your password reset is protected with multi-step verification.',
    
    // Step 1: Account Check (StepAccountCheck.jsx)
    'forgot.account_check.info' => 'Enter your account username to begin the password reset process.',
    'forgot.account_check.placeholder' => 'Enter your username',
    'forgot.account_check.checking' => 'Checking...',
    'forgot.account_check.check_button' => 'Check Account',
    
    // Step 2: Method Selector (StepMethodSelector.jsx)
    'forgot.method_selector.info' => 'Choose how you want to receive your verification code.',
    'forgot.method_selector.sending' => 'Sending...',
    'forgot.method_selector.send_button' => 'Send Code',
    
    // Step 3: Verify Code (StepVerifyCode.jsx)
    'forgot.verify_code.validity' => 'Code valid for',
    'forgot.verify_code.placeholder' => 'Enter 6-digit code',
    'forgot.verify_code.verifying' => 'Verifying...',
    'forgot.verify_code.verify_button' => 'Verify Code',
    'forgot.verify_code.sending' => 'Sending...',
    'forgot.verify_code.resend' => 'Resend Code',
    'forgot.verify_code.resend_in' => 'Resend available in',
    
    // Step 4: Reset Password (StepResetPassword.jsx)
    'forgot.reset_password.code_verified' => 'Verification code confirmed. You can now set your new password.',
    'forgot.reset_password.new_password' => 'New Password',
    'forgot.reset_password.new_password_placeholder' => 'Enter new password (4-16 characters)',
    'forgot.reset_password.confirm_password' => 'Confirm Password',
    'forgot.reset_password.confirm_password_placeholder' => 'Re-enter your password',
    'forgot.reset_password.updating' => 'Updating...',
    'forgot.reset_password.reset_button' => 'Reset Password',
    
    // ============================================================================
    // USER/ACCOUNT PAGE (Account.jsx)
    // ============================================================================
    'account.security.change_password' => 'Change Password',
    'account.security.change_email' => 'Change Email',
    'account.security.change_phone' => 'Change Phone',
    'account.security.two_factor' => 'Two-Factor Authentication',
    'account.security.enable' => 'Enable',
    'account.security.disable' => 'Disable',
    
    // ============================================================================
    // TWO-FACTOR AUTHENTICATION (2FA)
    // ============================================================================
    '2fa.title' => 'Two-Factor Authentication',
    '2fa.description' => 'Enter the verification code sent to your device',
    '2fa.invalid_code' => 'Invalid verification code. Please try again.',
    '2fa.verification_failed' => 'Verification failed. Please try again.',
    '2fa.code_send_failed' => 'Failed to send verification code. Please try again.',
    '2fa.code_expired' => 'Verification code has expired. Please request a new one.',
    '2fa.too_many_attempts' => 'Too many failed attempts. Please try again later.',
    
    // ============================================================================
    // COMMON ELEMENTS
    // ============================================================================
    'common.loading' => 'Loading...',
    'common.submit' => 'Submit',
    'common.cancel' => 'Cancel',
    'common.back' => 'Back',
    'common.next' => 'Next',
    'common.save' => 'Save',
    'common.edit' => 'Edit',
    'common.delete' => 'Delete',
    'common.confirm' => 'Confirm',
    'common.close' => 'Close',
    'common.or' => 'or',
    
    // ============================================================================
    // AUTH HERO (AuthHero.jsx)
    // ============================================================================
    'hero.title_line1' => 'Join the',
    'hero.title_line2' => 'Battle',
    'hero.description' => 'Experience epic battles, forge alliances, and become a legend in the world of Knight Online.',
    'hero.pvp_battles' => 'Epic PvP Battles',
    'hero.pvp_battles_desc' => 'Intense player vs player combat',
    'hero.weekly_tournaments' => 'Weekly Tournaments',
    'hero.weekly_tournaments_desc' => 'Compete for glory and rewards',
    'hero.premium_bonuses' => 'Premium Bonuses',
    'hero.premium_bonuses_desc' => 'Exclusive benefits for members',
    'hero.server_load' => 'Server Load',
    
    // ============================================================================
    // GUEST MODAL (GuestModal.tsx)
    // ============================================================================
    'modal.login_subtitle' => 'Sign in to your account',
    'modal.register_subtitle' => 'Create a new account',

    // ============================================================================
    // FORM TABS (FormTabs.jsx)
    // ============================================================================
    'tabs.login' => 'Login',
    'tabs.register' => 'Register',
    
    // ============================================================================
    // FORM DISABLED (FormDisabled.jsx)
    // ============================================================================
    'disabled.login.title' => 'Login is Currently Disabled',
    'disabled.login.description' => 'Login functionality is temporarily unavailable. Please try again later or create a new account.',
    'disabled.login.go_to_register' => 'Create Account',
    'disabled.login.forgot_password' => 'Forgot Password?',
    'disabled.register.title' => 'Registration is Currently Disabled',
    'disabled.register.description' => 'New account registration is temporarily unavailable. Please try again later.',
    'disabled.register.go_to_login' => 'Go to Login',
    'disabled.forgot.title' => 'Password Reset is Currently Disabled',
    'disabled.forgot.description' => 'Password reset functionality is temporarily unavailable. Please try again later.',
    'disabled.forgot.go_to_login' => 'Go to Login',
    
];
