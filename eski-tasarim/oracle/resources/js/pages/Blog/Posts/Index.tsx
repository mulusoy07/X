import { Icon } from '@/components/shared/icon'
import { PageHeader } from '@/components/shared/PageHeader'
import { BlogList } from '../components'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'

function BlogPostsPage() {
  const { t } = useTranslation()
  const { posts, pagination, categories, tags, error, message } = usePage().props

  if (error || !posts) {
    return <ErrorState message={message || t('blog.page.load_error')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={t('blog.page.title')} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={t('blog.page.title')}
          subtitle={t('blog.page.description')}
          icon={<Icon name="ti ti-news" className="w-8 h-8" />}
        />

        <div className="mt-6 bg-ko-card border border-ko-border-primary rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-ko-brand-primary/10 border border-ko-brand-primary/30 flex items-center justify-center flex-shrink-0">
              <Icon name="ti ti-info-circle" className="w-5 h-5 text-ko-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ko-text-primary mb-1">
                {t('blog.page.about_news')}
              </h2>
              <p className="text-sm text-ko-text-muted leading-relaxed">
                {t('blog.page.about_news_description')}
              </p>
            </div>
          </div>
        </div>

        <BlogList posts={posts} pagination={pagination} categories={categories} tags={tags} />
      </div>
    </div>
  )
}

BlogPostsPage.layout = (page) => <PublicLayout children={page} />

export default BlogPostsPage
