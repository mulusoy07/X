import { useState, useEffect } from 'react'

export function CharacterInfo({ user }) {
  const [animatedExpPercent, setAnimatedExpPercent] = useState(0)
  const hasRebirth = user.rebirthLevel > 0
  const expPercent = user.reqExp > 0 ? Math.round((user.exp / user.reqExp) * 100) : 100

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedExpPercent(expPercent), 100)
    return () => clearTimeout(timer)
  }, [expPercent])

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
            Karakter Bilgileri
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Character Identity */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-ko-text-primary">{user.userName}</h2>
          <p className="text-sm font-semibold text-ko-brand-primary">
            {user.className}
            {hasRebirth && <span className="text-purple-400"> (Master)</span>}
          </p>
          <p className="text-xs text-ko-text-muted">{user.nationText}</p>
        </div>

        <div className="h-px bg-ko-border-primary" />

        {/* General Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-ko-text-muted text-sm">Level</span>
            <span className="text-ko-text-primary font-medium">
              {user.level}
              {hasRebirth && <span className="text-purple-400"> / {user.rebirthLevel}</span>}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ko-text-muted text-sm">EXP</span>
            <span className="text-ko-text-primary font-medium">{user.formattedExp}</span>
          </div>
          <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-[width] duration-1000 ease-in-out ${
                hasRebirth
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary'
              }`}
              style={{ width: `${animatedExpPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ko-text-muted text-sm">National Points</span>
            <span className="text-ko-text-primary font-medium">{user.formattedLoyalty}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ko-text-muted text-sm">Manner</span>
            <span className="text-ko-text-primary font-medium">{user.mannerPoint}</span>
          </div>
        </div>

        <div className="h-px bg-ko-border-primary" />

        {/* Core Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-ko-widget-bg/50 rounded-lg p-2 border border-ko-border-primary text-center">
            <div className="text-sm font-bold text-ko-text-primary">{user.strong}</div>
            <div className="text-xs text-ko-text-muted">STR</div>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-2 border border-ko-border-primary text-center">
            <div className="text-sm font-bold text-ko-text-primary">{user.sta}</div>
            <div className="text-xs text-ko-text-muted">HP</div>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-2 border border-ko-border-primary text-center">
            <div className="text-sm font-bold text-ko-text-primary">{user.dex}</div>
            <div className="text-xs text-ko-text-muted">DEX</div>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-2 border border-ko-border-primary text-center">
            <div className="text-sm font-bold text-ko-text-primary">{user.cha}</div>
            <div className="text-xs text-ko-text-muted">MP</div>
          </div>
          <div className="bg-ko-widget-bg/50 rounded-lg p-2 border border-ko-border-primary text-center">
            <div className="text-sm font-bold text-ko-text-primary">{user.intel}</div>
            <div className="text-xs text-ko-text-muted">INT</div>
          </div>
        </div>

        <div className="h-px bg-ko-border-primary" />

        {/* Stat Points Card */}
        <div className="bg-ko-widget-bg/50 rounded-lg p-3 border border-ko-border-primary">
          <div className="text-center">
            <div className="text-xs text-ko-text-muted mb-1">Stat Point</div>
            <div className={`text-lg font-bold ${user.points < 0 ? 'text-red-500' : 'text-ko-brand-primary'}`}>
              {user.points}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
