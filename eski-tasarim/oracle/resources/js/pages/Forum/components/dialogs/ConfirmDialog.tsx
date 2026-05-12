import { Icon } from '@/components/shared/icon'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText: string
  confirmingText: string
  onConfirm: () => void
  isProcessing?: boolean
  variant?: 'default' | 'warning' | 'danger'
  icon?: string
}

const variantStyles = {
  default: {
    accent: 'ko-brand-primary',
    bgGradient: 'from-ko-brand-primary/5',
    iconBg: 'bg-ko-brand-primary/10 border-ko-brand-primary/20',
    iconColor: 'text-ko-brand-primary',
    buttonClass: 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark hover:opacity-90',
  },
  warning: {
    accent: 'amber-500',
    bgGradient: 'from-amber-500/5',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    iconColor: 'text-amber-500',
    buttonClass: 'bg-amber-500/20 border border-amber-500/30 text-amber-500 hover:bg-amber-500/30',
  },
  danger: {
    accent: 'red-500',
    bgGradient: 'from-red-500/5',
    iconBg: 'bg-red-500/10 border-red-500/20',
    iconColor: 'text-red-500',
    buttonClass: 'bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30',
  },
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  confirmingText,
  onConfirm,
  isProcessing = false,
  variant = 'default',
  icon = 'ti ti-alert-circle',
}: ConfirmDialogProps) {
  const { t } = useTranslation()
  const styles = variantStyles[variant]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[420px] w-full">
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${styles.accent} to-transparent opacity-60`} />

        {/* Header */}
        <div className={`relative p-6 border-b border-ko-border-primary bg-gradient-to-r ${styles.bgGradient} via-transparent to-transparent`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 ${styles.iconBg} border rounded-lg`}>
              <Icon name={icon} size={20} className={styles.iconColor} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ko-text-primary">
                {title}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {description}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
              className="p-2 hover:bg-ko-widget-bg rounded-lg transition-colors disabled:opacity-50"
            >
              <Icon name="ti ti-x" size={20} className="text-ko-text-muted" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {t('plugins.forum.page.cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50 ${styles.buttonClass}`}
          >
            {isProcessing ? (
              <>
                <Icon name="ti ti-loader-2" size={16} className="animate-spin" />
                <span>{confirmingText}</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
