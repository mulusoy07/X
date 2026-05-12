import { Icon } from '@/components/shared/icon'
import { cn } from '@/lib/utils'

const requirementKeys = [
  { key: 'windows', required: true },
  { key: 'ram', required: true },
  { key: 'disk_space', required: true },
  { key: 'internet', required: true },
  { key: 'directx', required: false },
]

export function SystemRequirements() {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-ko-text-primary mb-4">
        {t('downloads.system_requirements')}
      </h3>
      <div className="space-y-3">
        {requirementKeys.map((req) => (
          <div key={req.key} className="flex items-center gap-3">
            <Icon
              name="ti ti-circle-check"
              className={cn(
                'w-4 h-4',
                req.required ? 'text-ko-brand-primary' : 'text-ko-text-muted'
              )}
            />
            <span
              className={cn(
                'text-sm',
                req.required ? 'text-ko-text-primary' : 'text-ko-text-muted'
              )}
            >
              {t(`downloads.requirements.${req.key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
