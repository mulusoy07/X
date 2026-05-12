import { Icon } from '@/components/shared/icon'
import { BugList } from './components'
import { ForumBreadcrumb } from '../Forum/components'
import { CreateBugButton } from './components/buttons/CreateBugButton'
import { ErrorState } from '@/components/shared/ErrorState'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function CategoryPage() {
  const { t } = useTranslation()
  const { error, message, category, bugs, breadcrumbs } = usePage().props

  if (error || !category) {
    return <ErrorState message={message || t('bug_tracker.errors.category_not_found')} />
  }

  return (
    <>
      <Head title={category.name} />

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-4">
              <ForumBreadcrumb items={breadcrumbs} />
            </div>
          )}

          <div className="mb-6">
            <div className="relative bg-gradient-to-r from-ko-card/90 via-ko-card/50 to-transparent backdrop-blur-md rounded-2xl p-6 border border-ko-border-primary overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-ko-brand-primary blur-3xl rounded-full opacity-20" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center border-2 border-ko-brand-primary/30">
                    <Icon name="ti ti-bug" size={32} className="text-ko-brand-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-ko-text-primary mb-1">{category.name}</h1>
                    {category.description && (
                      <div className="text-ko-text-muted text-sm">{category.description}</div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-ko-brand-primary">{category.bugCount || 0}</div>
                  <div className="text-xs text-ko-text-muted uppercase tracking-wider">{t('bug_tracker.category.bug_count')}</div>
                </div>
              </div>
            </div>
          </div>

          {bugs && bugs.length > 0 ? (
            <BugList bugs={bugs} title={t('bug_tracker.category.bugs_in_category', { name: category.name })} />
          ) : (
            <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-ko-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="ti ti-bug-off" size={32} className="text-ko-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-ko-text-primary mb-2">
                {t('bug_tracker.category.no_bugs')}
              </h3>
              <p className="text-ko-text-muted mb-4">
                {t('bug_tracker.category.be_first')}
              </p>
              <CreateBugButton />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

CategoryPage.layout = (page) => <PublicLayout children={page} />
