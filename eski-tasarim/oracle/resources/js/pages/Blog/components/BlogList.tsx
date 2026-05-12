import { Icon } from '@/components/shared/icon'
import { Pagination } from '@/components/ui/pagination'
import { BlogPostCard } from './BlogPostCard'
import { BlogSidebar } from './BlogSidebar'

export function BlogList({ posts, pagination, categories, tags }) {
  const { t } = useTranslation()

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {posts && posts.length > 0 ? (
          <>
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {pagination && pagination.lastPage > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.currentPage}
                  lastPage={pagination.lastPage}
                  total={pagination.total}
                  from={pagination.from}
                  to={pagination.to}
                  itemName={t('blog.page.item_name')}
                />
              </div>
            )}
          </>
        ) : (
          <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-ko-border-primary">
              <Icon name="ti ti-calendar" className="w-8 h-8 text-ko-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-ko-text-primary mb-2">
              {t('blog.page.no_news_yet')}
            </h3>
            <p className="text-ko-text-muted text-sm">
              {t('blog.page.news_coming_soon')}
            </p>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <BlogSidebar categories={categories} tags={tags} />
      </div>
    </div>
  )
}
