import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import { PageHeader } from '@/components/shared/PageHeader'
import { BlogSidebar } from './BlogSidebar'

export function BlogDetail({ post, categories, tags }) {
  const { t } = useTranslation()

  const firstCategory = post.categories?.[0]

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={post.name} />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <PageHeader
                title={post.name}
                subtitle={`${firstCategory?.name || ''} • ${post.createdAt}`}
              />
            </div>
            <Link
              href={route('public.blog.posts.index')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ko-card border border-ko-border-primary hover:border-ko-brand-primary text-ko-text-muted hover:text-ko-brand-primary rounded-lg transition-all group flex-shrink-0"
            >
              <Icon name="ti ti-arrow-left" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">{t('blog.page.go_back')}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <article className="bg-ko-card border border-ko-border-primary rounded-xl overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Imagex
                  src={post.imageDetail || post.image}
                  alt={post.name}
                  className="w-full h-full object-cover object-top"
                />

                {firstCategory && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded text-xs font-bold text-white bg-ko-brand-primary">
                      {firstCategory.name}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-ko-text-muted mb-6 pb-6 border-b border-ko-border-primary">
                  <div className="flex items-center gap-2">
                    <Icon name="ti ti-calendar" className="w-4 h-4" />
                    <span>{post.createdAt}</span>
                  </div>
                </div>

                <div
                  className="tiptap-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogSidebar categories={categories} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
