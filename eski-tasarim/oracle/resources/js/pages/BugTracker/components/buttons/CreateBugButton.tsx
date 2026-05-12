import { Icon } from '@/components/shared/icon'

export function CreateBugButton({ userCanCreateBug = true }) {
  const { t } = useTranslation()

  return (
    <Link
      href={userCanCreateBug ? route('public.bug-tracker.create') : route('public.guest.login')}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
      title={!userCanCreateBug ? t('bug_tracker.comment_form.login_required') + ' ' + t('bug_tracker.comment_form.login_link') : undefined}
    >
      <Icon name="ti ti-plus" size={20} />
      <span>{t('bug_tracker.form.create_bug.title')}</span>
    </Link>
  )
}
