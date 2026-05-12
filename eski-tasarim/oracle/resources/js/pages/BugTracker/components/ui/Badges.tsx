import { Icon } from '@/components/shared/icon'

export function PriorityBadge({ priority, showLabel = true }) {
  const { t } = useTranslation()

  const config = {
    low: {
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      label: t('bug_tracker.form.create_bug.priority_low'),
      icon: 'ti ti-arrow-down',
    },
    medium: {
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      label: t('bug_tracker.form.create_bug.priority_medium'),
      icon: 'ti ti-minus',
    },
    high: {
      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      label: t('bug_tracker.form.create_bug.priority_high'),
      icon: 'ti ti-arrow-up',
    },
    critical: {
      color: 'bg-red-500/10 text-red-500 border-red-500/20',
      label: t('bug_tracker.form.create_bug.priority_critical'),
      icon: 'ti ti-alert-circle-filled',
    },
  }

  const { color, label, icon } = config[priority]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${color}`}>
      <Icon name={icon} size={10} />
      {showLabel && <span>{label}</span>}
    </span>
  )
}

export function StatusBadge({ status, showLabel = true }) {
  const { t } = useTranslation()

  const config = {
    open: {
      color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      label: t('bug_tracker.detail.status_open'),
      icon: 'ti ti-circle-dashed',
    },
    in_progress: {
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      label: t('bug_tracker.detail.status_in_progress'),
      icon: 'ti ti-loader',
    },
    resolved: {
      color: 'bg-green-500/10 text-green-500 border-green-500/20',
      label: t('bug_tracker.detail.status_resolved'),
      icon: 'ti ti-check',
    },
    closed: {
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      label: t('bug_tracker.detail.status_closed'),
      icon: 'ti ti-circle-check',
    },
  }

  const { color, label, icon } = config[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${color}`}>
      <Icon name={icon} size={10} />
      {showLabel && <span>{label}</span>}
    </span>
  )
}
