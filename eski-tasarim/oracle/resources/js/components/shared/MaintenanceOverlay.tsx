import { Icon } from '@/components/shared/icon'

export interface MaintenanceConfig {
  title?: string
  subtitle?: string
  description?: string
}

interface MaintenanceOverlayProps {
  maintenanceData?: MaintenanceConfig
}

export function MaintenanceOverlay({ maintenanceData }: MaintenanceOverlayProps) {
  // Use backend data or fallback to defaults
  const title = maintenanceData?.title || ''
  const subtitle = maintenanceData?.subtitle || ''
  const description = maintenanceData?.description || ''

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      {/* Blurred Background - showing site behind */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Main Content Card - Same style as site components */}
      <div className="relative max-w-lg w-full mx-auto">
        <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Top Gradient Line */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

          {/* Content */}
          <div className="p-8">
            {/* Typography Section */}
            <div className="text-center space-y-4">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-ko-brand-primary">
                {title}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base text-ko-text-muted leading-relaxed">
                {description}
              </p>

              {/* Status Indicator */}
              {subtitle && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full bg-ko-brand-primary animate-pulse" />
                  <span className="text-xs text-ko-text-secondary">{subtitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
