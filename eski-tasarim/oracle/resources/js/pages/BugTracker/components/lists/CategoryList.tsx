import { CategoryCard } from '../cards/CategoryCard'
import { CreateBugButton } from '../buttons/CreateBugButton'
import { Icon } from '@/components/shared/icon'

export function CategoryList({ categories, userCanCreateBug = false }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
      <div className="relative bg-gradient-to-r from-ko-brand-primary/10 via-ko-brand-secondary/5 to-transparent p-4 border-b border-ko-border-primary overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-ko-brand-primary/20 to-transparent blur-3xl rounded-full" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary flex items-center justify-center text-white">
              <Icon name="ti ti-alert-circle" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-ko-text-primary flex items-center gap-2">
                {t('bug_tracker.common.categories_title')}
                <Icon name="ti ti-bug" size={16} className="text-ko-brand-primary" />
              </h2>
              <div className="text-sm text-ko-text-muted mt-0.5">{t('bug_tracker.common.categories_subtitle')}</div>
            </div>
          </div>

          <CreateBugButton userCanCreateBug={userCanCreateBug} />
        </div>
      </div>

      <div className="divide-y divide-ko-border-primary">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-ko-text-muted">{t('bug_tracker.common.no_categories')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
