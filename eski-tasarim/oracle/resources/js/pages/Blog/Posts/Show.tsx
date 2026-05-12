import { BlogDetail } from '../components'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ErrorState } from '@/components/shared/ErrorState'

function BlogPostShow() {
  const { t } = useTranslation()
  const { post, categories, tags, error, message } = usePage().props

  if (error || !post) {
    return <ErrorState message={message || t('blog.post.not_found_message')} />
  }

  return (
    <BlogDetail
      post={post}
      categories={categories}
      tags={tags}
    />
  )
}

BlogPostShow.layout = (page) => <PublicLayout children={page} />

export default BlogPostShow
