import { Icon } from '@/components/shared/icon'
import { PageHeader } from '@/components/shared/PageHeader'
import { BlogList } from '../components'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'

function BlogCategoryShow() {
  const { t } = useTranslation()
  const { posts, pagination, categories, tags, category, error, message } = usePage().props

  if (error || !category) {
    return <ErrorState message={message || t('blog.category.not_found_message')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={category.name} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={category.name}
          subtitle={category.description}
          icon={<Icon name="ti ti-folder" className="w-8 h-8" />}
        />
        <BlogList posts={posts} pagination={pagination} categories={categories} tags={tags} />
      </div>
    </div>
  )
}

BlogCategoryShow.layout = (page) => <PublicLayout children={page} />

export default BlogCategoryShow
