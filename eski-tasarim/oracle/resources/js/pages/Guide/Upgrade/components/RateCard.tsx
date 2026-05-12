export function RateCard({ rate }) {
  const grade = Number(rate.itemGrade)

  return (
    <div className="bg-ko-card hover:bg-ko-card/80 border border-ko-border-primary hover:border-ko-brand-primary rounded-xl p-4 transition-all duration-200">
      {/* Grade Badge */}
      <div className="flex items-center justify-center mb-3 relative">
        <div className="w-14 h-14 bg-ko-widget-bg rounded-lg flex items-center justify-center border border-ko-border-primary">
          <span className="text-lg font-bold text-ko-brand-primary">+{grade}</span>
        </div>

        <div
          className="absolute -top-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          style={{
            backgroundColor: rate.rarity.color,
            color: rate.rarity.textColor,
            borderColor: rate.rarity.color
          }}
        >
          {rate.rarity.text}
        </div>
      </div>

      {/* Upgrade Info */}
      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-ko-text-primary leading-tight">
          +{grade} → +{grade + 1}
        </p>
      </div>

      {/* Success Rate */}
      <div className="mb-3">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-bold text-ko-brand-primary">
            {rate.successRate}%
          </span>
        </div>

        {/* Progress Bar - CSS Animation */}
        <div className="w-full bg-ko-widget-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${Math.min(parseFloat(rate.successRate), 100)}%`,
              backgroundColor: rate.rarity.color
            }}
          />
        </div>
      </div>

      {/* Required Coins */}
      <div className="text-center">
        <span className="text-[9px] text-ko-text-muted font-medium bg-ko-widget-bg px-2 py-1 rounded-full border border-ko-border-primary inline-block">
          {rate.itemReqCoins}
        </span>
      </div>
    </div>
  )
}
