import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'

export function BlogPostCard({ post }) {
  return (
    <article className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden hover:bg-ko-card/80 hover:border-ko-brand-primary/50 transition-all duration-200 group">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={route('public.blog.posts.show', { slug: post.slug })}
          className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden block"
        >
          <Imagex
            src={post.image || '/images/placeholder-news.jpg'}
            alt={post.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex-1 p-6">
          <Link href={route('public.blog.posts.show', { slug: post.slug })}>
            <h3 className="text-lg font-bold text-ko-text-primary mb-2 group-hover:text-ko-brand-primary transition-colors line-clamp-2">
              {post.name}
            </h3>
          </Link>

          <p className="text-ko-text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-ko-text-muted">
            {post.firstCategory && (
              <Link
                href={route('public.blog.categories.show', { slug: post.firstCategory.slug })}
                className="flex items-center gap-1.5 hover:text-ko-brand-primary transition-colors"
              >
                <Icon name="ti ti-category" className="w-3.5 h-3.5" />
                <span>{post.firstCategory.name}</span>
              </Link>
            )}
            {post.author?.name && (
              <div className="flex items-center gap-1.5">
                <Icon name="ti ti-user" className="w-3.5 h-3.5" />
                <span>{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Icon name="ti ti-clock" className="w-3.5 h-3.5" />
              <span>{post.createdAt}</span>
            </div>
            <Link
              href={route('public.blog.posts.show', { slug: post.slug })}
              className="ml-auto"
            >
              <Icon name="ti ti-chevron-right" className="w-5 h-5 text-ko-text-muted group-hover:text-ko-brand-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
