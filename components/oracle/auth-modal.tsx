"use client"

import { useState } from "react"
import {
  IconUser,
  IconLock,
  IconMail,
  IconPhone,
  IconKey,
  IconEye,
  IconEyeOff,
  IconX,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string, password: string) => void
  defaultTab?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, onLogin, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showItemLockPassword, setShowItemLockPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Form states
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerItemLock, setRegisterItemLock] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo login - accepts any credentials
    onLogin(loginUsername || "DemoUser", loginPassword || "demo")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo register - automatically logs in
    onLogin(registerUsername || "NewUser", registerPassword || "demo")
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-gradient-to-b from-ink-800 to-ink-900 border border-gold-500/20 rounded-2xl shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,184,54,0.1)_inset] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-line">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center">
              {activeTab === "login" ? (
                <IconLogin className="w-5 h-5" />
              ) : (
                <IconUserPlus className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-cream leading-tight">
                {activeTab === "login" ? "Giris Yap" : "Kayit Ol"}
              </h3>
              <p className="text-xs text-muted leading-tight">
                {activeTab === "login" ? "Hesabiniza giris yapin" : "Yeni hesap olusturun"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-ink-700 text-cream-dim hover:text-cream flex items-center justify-center transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4">
          <div className="flex bg-ink-900/50 rounded-lg p-1 border border-line">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${
                activeTab === "login"
                  ? "gold-btn"
                  : "text-cream-dim hover:text-cream"
              }`}
            >
              <IconLogin className="w-4 h-4" />
              Giris Yap
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${
                activeTab === "register"
                  ? "gold-btn"
                  : "text-cream-dim hover:text-cream"
              }`}
            >
              <IconUserPlus className="w-4 h-4" />
              Kayit Ol
            </button>
          </div>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="p-5 space-y-4">
            {/* Username */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Kullanici adinizi girin"
                className="w-full h-12 pl-12 pr-4 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconLock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Sifrenizi girin"
                className="w-full h-12 pl-12 pr-12 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-dim hover:text-cream transition-colors"
              >
                {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="oracle-checkbox"
                />
                <span className="text-sm text-cream-dim group-hover:text-cream transition-colors">Beni hatirla</span>
              </label>
              <button type="button" className="text-sm text-gold-400 hover:text-gold-300 font-medium">
                Sifremi unuttum?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="gold-btn w-full h-12 rounded-lg flex items-center justify-center gap-2 font-bold text-sm"
            >
              <IconLogin className="w-4 h-4" />
              Giris Yap
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-line" />
              <span className="text-xs text-muted uppercase tracking-wider">veya</span>
              <div className="flex-1 h-px bg-line" />
            </div>

            {/* Switch to Register */}
            <p className="text-center text-sm text-cream-dim">
              Hesabiniz yok mu?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className="text-gold-400 hover:text-gold-300 font-semibold"
              >
                Kayit Ol
              </button>
            </p>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="p-5 space-y-3">
            {/* Username */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="Kullanici adinizi girin (4-16 karakter)"
                className="w-full h-12 pl-12 pr-4 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconLock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Sifrenizi girin (4-16 karakter)"
                className="w-full h-12 pl-12 pr-12 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-dim hover:text-cream transition-colors"
              >
                {showConfirmPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconMail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="E-posta adresinizi girin"
                className="w-full h-12 pl-12 pr-4 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="relative flex">
              <div className="flex items-center gap-2 px-3 bg-ink-900/50 border border-r-0 border-line rounded-l-lg">
                <span className="text-lg">🇹🇷</span>
                <span className="text-sm text-cream-dim">+90</span>
              </div>
              <input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="Telefon numaraniz"
                className="flex-1 h-12 px-4 bg-ink-900/50 border border-line rounded-r-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {/* Item Lock Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim">
                <IconKey className="w-5 h-5" />
              </div>
              <input
                type={showItemLockPassword ? "text" : "password"}
                value={registerItemLock}
                onChange={(e) => setRegisterItemLock(e.target.value)}
                placeholder="8 haneli esya kilidi sifresini girin"
                className="w-full h-12 pl-12 pr-12 bg-ink-900/50 border border-line rounded-lg text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowItemLockPassword(!showItemLockPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-dim hover:text-cream transition-colors"
              >
                {showItemLockPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="gold-btn w-full h-12 rounded-lg flex items-center justify-center gap-2 font-bold text-sm"
            >
              <IconUserPlus className="w-4 h-4" />
              Kayit Ol
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-line" />
              <span className="text-xs text-muted uppercase tracking-wider">veya</span>
              <div className="flex-1 h-px bg-line" />
            </div>

            {/* Switch to Login */}
            <p className="text-center text-sm text-cream-dim">
              Zaten hesabiniz var mi?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="text-gold-400 hover:text-gold-300 font-semibold"
              >
                Giris Yap
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
