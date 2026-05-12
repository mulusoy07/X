import { Icon } from '@/components/shared/icon'

export function BlogSidebar({ categories, tags }) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
          <div className="flex items-center gap-2">
            <Icon name="ti ti-category" className="w-5 h-5 text-ko-brand-primary" />
            <h3 className="text-base font-bold text-ko-text-primary">{t('blog.page.categories')}</h3>
          </div>
        </div>

        <div className="divide-y divide-ko-border-primary">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={route('public.blog.categories.show', { slug: category.slug })}
              className="block hover:bg-ko-card/80 transition-colors"
            >
              <div className="px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-ko-brand-primary" />
                  <span className="text-sm text-ko-text-primary">{category.name}</span>
                </div>
                {category.postsCount !== undefined && (
                  <span className="text-xs text-ko-text-muted bg-ko-widget-bg px-2.5 py-1 rounded-full border border-ko-border-primary">
                    {category.postsCount}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-ko-border-primary bg-ko-widget-bg/30">
          <div className="flex items-center gap-2">
            <Icon name="ti ti-tags" className="w-5 h-5 text-ko-brand-primary" />
            <h3 className="text-base font-bold text-ko-text-primary">{t('blog.page.tags')}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={route('public.blog.tags.show', { slug: tag.slug })}
                className="px-3 py-1.5 bg-ko-widget-bg hover:bg-ko-brand-primary/10 hover:text-ko-brand-primary text-ko-text-muted text-xs rounded-lg transition-colors border border-ko-border-primary hover:border-ko-brand-primary/30"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
