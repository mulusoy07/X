export function FormSeparator() {
  const { t } = useTranslation()
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-ko-border-primary to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-ko-card px-4 text-xs text-ko-text-muted uppercase tracking-wider">{t('auth.common.or')}</span>
      </div>
    </div>
  )
}
