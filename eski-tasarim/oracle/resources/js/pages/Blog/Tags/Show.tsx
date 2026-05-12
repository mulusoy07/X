import { Icon } from '@/components/shared/icon'
import { PageHeader } from '@/components/shared/PageHeader'
import { BlogList } from '../components'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'

function BlogTagShow() {
  const { t } = useTranslation()
  const { posts, pagination, categories, tags, tag, error, message } = usePage().props

  if (error || !tag) {
    return <ErrorState message={message || t('blog.tag.not_found_message')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <Head title={tag.name} />
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          title={tag.name}
          subtitle={tag.description}
          icon={<Icon name="ti ti-tag" className="w-8 h-8" />}
        />
        <BlogList posts={posts} pagination={pagination} categories={categories} tags={tags} />
      </div>
    </div>
  )
}

BlogTagShow.layout = (page) => <PublicLayout children={page} />

export default BlogTagShow
