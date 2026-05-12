interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

export function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <div className="bg-ko-widget-bg/50 rounded-xl p-4 border border-ko-border-primary hover:border-ko-brand-primary/50 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ko-card rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ko-text-card-meta mb-1">{label}</div>
          <div className="text-sm font-bold text-ko-text-card-title truncate">
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
