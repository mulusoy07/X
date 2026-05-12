<?php

/**
 * Frontend Layout Translations (Turkish)
 * 
 * Bu dosya Knight Online teması için tüm frontend UI çevirilerini içerir.
 * Bu çeviriler SADECE JSX componentlerinde kullanılır (backend/controller'larda değil).
 * 
 * JSX'te Kullanım: const { t } = useTranslation()
 * Örnek: <button>{t('oracle.layout.auth.login.submit')}</button>
 * 
 * Not: Backend meta/validation/messages plugins/knight-online/lang/ dizinindedir
 */

return [
    
    // ============================================================================
    // GUEST/LOGIN SAYFASI (Login.jsx)
    // ============================================================================
    'login.username_placeholder' => 'Kullanıcı adınızı girin',
    'login.password_placeholder' => 'Şifrenizi girin',
    'login.remember_me' => 'Beni hatırla',
    'login.forgot_password' => 'Şifremi unuttum?',
    'login.submit' => 'Giriş Yap',
    'login.no_account' => 'Hesabınız yok mu?',
    'login.register_link' => 'Hemen kayıt ol',
    'login.success' => 'Giriş başarılı! Yönlendiriliyorsunuz...',
    'login.logout'  => 'Çıkış yap',
    
    // ============================================================================
    // GUEST/REGISTER SAYFASI (Register.jsx)
    // ============================================================================
    'register.username_placeholder' => 'Kullanıcı adınızı girin (4-16 karakter)',
    'register.password_placeholder' => 'Şifrenizi girin (4-16 karakter)',
    'register.email_placeholder' => 'E-posta adresinizi girin',
    'register.phone_placeholder' => 'Telefon numaranızı girin (opsiyonel)',
    'register.seal_password_placeholder' => '8 haneli eşya kilidi şifresini girin',
    'register.seal_password_help' => 'Bu şifre eşyalarınızın düşürülmesini veya takas edilmesini engeller',
    'register.terms_label' => 'Kullanım koşullarını kabul ediyorum',
    'register.submit' => 'Kayıt Ol',
    'register.have_account' => 'Zaten hesabınız var mı?',
    'register.login_link' => 'Giriş yap',
    'register.success' => 'Kayıt başarılı! Yönlendiriliyorsunuz...',
    
    // ============================================================================
    // GUEST/FORGOT PASSWORD SAYFASI (ForgotPassword.jsx)
    // ============================================================================
    'forgot.step1.username_placeholder' => 'Kullanıcı adınızı girin',
    'forgot.step1.submit' => 'Devam Et',
    'forgot.step2.method_email' => 'E-posta',
    'forgot.step2.method_sms' => 'SMS',
    'forgot.step2.submit' => 'Kod Gönder',
    'forgot.step3.code_placeholder' => '6 haneli kodu girin',
    'forgot.step3.resend' => 'Kodu tekrar gönder',
    'forgot.step3.submit' => 'Doğrula',
    'forgot.step4.password_placeholder' => 'Yeni şifrenizi girin (4-16 karakter)',
    'forgot.step4.password_confirm_placeholder' => 'Şifrenizi tekrar girin',
    'forgot.step4.submit' => 'Şifreyi Sıfırla',
    'forgot.back_to_login' => 'Girişe dön',
    'forgot.back' => 'Geri',
    'forgot.steps.enter_username' => 'Başlamak için kullanıcı adınızı girin',
    'forgot.steps.select_method' => 'Doğrulama yöntemini seçin',
    'forgot.steps.enter_code' => 'Doğrulama kodunu girin',
    'forgot.steps.set_password' => 'Yeni şifrenizi belirleyin',
    'forgot.steps.completed' => 'Şifre sıfırlama başarılı',
    'forgot.step_of' => 'Adım :current / :total',
    'forgot.success.title' => 'Şifre Sıfırlama Başarılı!',
    'forgot.success.description' => 'Şifreniz başarıyla sıfırlandı.',
    'forgot.success.info' => 'Artık yeni şifrenizle giriş yapabilirsiniz.',
    'forgot.success.login_button' => 'Girişe Git',
    
    // Forgot Password Hero (ForgotHero.jsx)
    'forgot.hero.secure_operation' => 'Güvenli İşlem',
    'forgot.hero.title_line1' => 'Şifrenizi',
    'forgot.hero.title_line2' => 'Sıfırlayın',
    'forgot.hero.description' => 'Şifrenizi sıfırlamak ve hesabınıza yeniden erişim sağlamak için güvenli adımları izleyin.',
    'forgot.hero.step1_title' => 'Hesap Doğrulama',
    'forgot.hero.step1_desc' => 'Kullanıcı adınızı girin',
    'forgot.hero.step2_title' => 'Yöntem Seçin',
    'forgot.hero.step2_desc' => 'Doğrulama yöntemini seçin',
    'forgot.hero.step3_title' => 'Kodu Doğrula',
    'forgot.hero.step3_desc' => 'Size gönderilen kodu girin',
    'forgot.hero.step4_title' => 'Yeni Şifre',
    'forgot.hero.step4_desc' => 'Yeni şifrenizi belirleyin',
    'forgot.hero.security_title' => 'Güvenli ve Hızlı',
    'forgot.hero.security_desc' => 'Şifre sıfırlama işleminiz çok adımlı doğrulama ile korunmaktadır.',
    
    // Step 1: Account Check (StepAccountCheck.jsx)
    'forgot.account_check.info' => 'Şifre sıfırlama işlemini başlatmak için hesap kullanıcı adınızı girin.',
    'forgot.account_check.placeholder' => 'Kullanıcı adınızı girin',
    'forgot.account_check.checking' => 'Kontrol ediliyor...',
    'forgot.account_check.check_button' => 'Hesabı Kontrol Et',
    
    // Step 2: Method Selector (StepMethodSelector.jsx)
    'forgot.method_selector.info' => 'Doğrulama kodunuzu nasıl almak istediğinizi seçin.',
    'forgot.method_selector.sending' => 'Gönderiliyor...',
    'forgot.method_selector.send_button' => 'Kod Gönder',
    
    // Step 3: Verify Code (StepVerifyCode.jsx)
    'forgot.verify_code.validity' => 'Kod geçerlilik süresi',
    'forgot.verify_code.placeholder' => '6 haneli kodu girin',
    'forgot.verify_code.verifying' => 'Doğrulanıyor...',
    'forgot.verify_code.verify_button' => 'Kodu Doğrula',
    'forgot.verify_code.sending' => 'Gönderiliyor...',
    'forgot.verify_code.resend' => 'Kodu Tekrar Gönder',
    'forgot.verify_code.resend_in' => 'Tekrar gönderim için',
    
    // Step 4: Reset Password (StepResetPassword.jsx)
    'forgot.reset_password.code_verified' => 'Doğrulama kodu onaylandı. Artık yeni şifrenizi belirleyebilirsiniz.',
    'forgot.reset_password.new_password' => 'Yeni Şifre',
    'forgot.reset_password.new_password_placeholder' => 'Yeni şifrenizi girin (4-16 karakter)',
    'forgot.reset_password.confirm_password' => 'Şifre Onayı',
    'forgot.reset_password.confirm_password_placeholder' => 'Şifrenizi tekrar girin',
    'forgot.reset_password.updating' => 'Güncelleniyor...',
    'forgot.reset_password.reset_button' => 'Şifreyi Sıfırla',
    
    // ============================================================================
    // USER/ACCOUNT SAYFASI (Account.jsx)
    // ============================================================================
    'account.security.change_password' => 'Şifre Değiştir',
    'account.security.change_email' => 'E-posta Değiştir',
    'account.security.change_phone' => 'Telefon Değiştir',
    'account.security.two_factor' => 'İki Faktörlü Doğrulama',
    'account.security.enable' => 'Etkinleştir',
    'account.security.disable' => 'Devre Dışı Bırak',
    
    // ============================================================================
    // İKİ FAKTÖRLÜ DOĞRULAMA (2FA)
    // ============================================================================
    '2fa.title' => 'İki Faktörlü Doğrulama',
    '2fa.description' => 'Cihazınıza gönderilen doğrulama kodunu girin',
    '2fa.invalid_code' => 'Geçersiz doğrulama kodu. Lütfen tekrar deneyin.',
    '2fa.verification_failed' => 'Doğrulama başarısız. Lütfen tekrar deneyin.',
    '2fa.code_send_failed' => 'Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin..',
    '2fa.code_expired' => 'Doğrulama kodunun süresi doldu. Lütfen yeni bir kod isteyin.',
    '2fa.too_many_attempts' => 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.',
    
    // ============================================================================
    // ORTAK ELEMANLAR
    // ============================================================================
    'common.loading' => 'Yükleniyor...',
    'common.submit' => 'Gönder',
    'common.cancel' => 'İptal',
    'common.back' => 'Geri',
    'common.next' => 'İleri',
    'common.save' => 'Kaydet',
    'common.edit' => 'Düzenle',
    'common.delete' => 'Sil',
    'common.confirm' => 'Onayla',
    'common.close' => 'Kapat',
    'common.or' => 'veya',
    
    // ============================================================================
    // AUTH HERO (AuthHero.jsx)
    // ============================================================================
    'hero.title_line1' => 'Savaşa',
    'hero.title_line2' => 'Katıl',
    'hero.description' => 'Epik savaşlar yaşa, ittifaklar kur ve Knight Online dünyasında bir efsane ol.',
    'hero.pvp_battles' => 'Epik PvP Savaşları',
    'hero.pvp_battles_desc' => 'Yoğun oyuncu vs oyuncu mücadelesi',
    'hero.weekly_tournaments' => 'Haftalık Turnuvalar',
    'hero.weekly_tournaments_desc' => 'Şan ve ödüller için yarış',
    'hero.premium_bonuses' => 'Premium Bonuslar',
    'hero.premium_bonuses_desc' => 'Üyeler için özel avantajlar',
    'hero.server_load' => 'Sunucu Yükü',
    
    // ============================================================================
    // MISAFIR MODAL (GuestModal.tsx)
    // ============================================================================
    'modal.login_subtitle' => 'Hesabınıza giriş yapın',
    'modal.register_subtitle' => 'Yeni hesap oluşturun',

    // ============================================================================
    // FORM TABS (FormTabs.jsx)
    // ============================================================================
    'tabs.login' => 'Giriş Yap',
    'tabs.register' => 'Kayıt Ol',
    
    // ============================================================================
    // FORM DISABLED (FormDisabled.jsx)
    // ============================================================================
    'disabled.login.title' => 'Giriş Şu Anda Devre Dışı',
    'disabled.login.description' => 'Giriş işlevi geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin veya yeni bir hesap oluşturun.',
    'disabled.login.go_to_register' => 'Hesap Oluştur',
    'disabled.login.forgot_password' => 'Şifremi Unuttum?',
    'disabled.register.title' => 'Kayıt Şu Anda Devre Dışı',
    'disabled.register.description' => 'Yeni hesap kaydı geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
    'disabled.register.go_to_login' => 'Girişe Git',
    'disabled.forgot.title' => 'Şifre Sıfırlama Şu Anda Devre Dışı',
    'disabled.forgot.description' => 'Şifre sıfırlama işlevi geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
    'disabled.forgot.go_to_login' => 'Girişe Git',
    
];
