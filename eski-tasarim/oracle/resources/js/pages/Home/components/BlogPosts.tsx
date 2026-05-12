import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import type { BlogPost } from './types'

const DEFAULT_CATEGORY_COLOR = '#EAB308'
const DEFAULT_CATEGORY_TEXT_COLOR = '#FFFFFF'

interface BlogPostsProps {
  posts: BlogPost[]
}

export function BlogPosts({ posts }: BlogPostsProps) {
  const { t } = useTranslation()

  if (!posts || posts.length === 0) return null

  const featuredPost = posts.find(post => post.isFeatured) || posts[0]
  const secondaryPosts = posts.filter(post => post.id !== featuredPost.id).slice(0, 3)

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
              <Icon name="ti ti-news" size={18} className="text-ko-brand-primary" />
            </div>
            {t('home.blog.title')}
          </h2>
          <Link
            href={route('public.blog.posts.index')}
            className="text-xs text-ko-brand-primary hover:text-ko-brand-secondary transition-colors font-semibold flex items-center gap-1 group/link"
          >
            {t('home.blog.view_all')}
            <Icon name="ti ti-arrow-right" size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-12 gap-4">
          <Link
            href={route('public.blog.posts.show', { slug: featuredPost.slug })}
            className="col-span-12 md:col-span-6 group/featured relative rounded-xl overflow-hidden transition-all duration-500 bg-ko-widget-bg/50 backdrop-blur-sm border border-ko-border-primary hover:border-ko-brand-primary/50 hover:shadow-lg hover:shadow-ko-brand-primary/10"
          >
            <div className="relative h-90 overflow-hidden">
              <Imagex
                src={featuredPost.image}
                srcset={featuredPost.imageSrcset}
                alt={featuredPost.title}
                className="w-full h-full object-cover object-[50%_30%] transition-transform duration-700 group-hover/featured:scale-110 will-change-transform"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

              {featuredPost.categoryName && (
                <div className="absolute top-4 right-4 z-10">
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md border"
                    style={{
                      backgroundColor: `${featuredPost.categoryColor || DEFAULT_CATEGORY_COLOR}40`,
                      color: featuredPost.categoryTextColor || DEFAULT_CATEGORY_TEXT_COLOR,
                      borderColor: `${featuredPost.categoryColor || DEFAULT_CATEGORY_COLOR}60`
                    }}
                  >
                    {featuredPost.categoryName}
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-10">
                <h3 className="font-black text-white text-xl leading-tight line-clamp-2 group-hover/featured:text-ko-brand-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/70 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Icon name="ti ti-calendar" size={14} className="flex-shrink-0" />
                    <span>{featuredPost.publishedAt}</span>
                  </span>
                  {featuredPost.author && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="ti ti-user" size={14} className="flex-shrink-0" />
                      <span className="text-ko-brand-primary font-semibold">{featuredPost.author}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-white/70">
                    <Icon name="ti ti-eye" size={14} className="flex-shrink-0" />
                    <span>{featuredPost.viewsCount}</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="col-span-12 md:col-span-6 grid grid-rows-3 gap-3">
            {secondaryPosts.map((post) => (
              <Link
                key={post.id}
                href={route('public.blog.posts.show', { slug: post.slug })}
                className="group/item relative rounded-xl overflow-hidden transition-all duration-300 bg-ko-widget-bg/50 backdrop-blur-sm border border-ko-border-primary hover:border-ko-brand-primary/50 hover:shadow-lg hover:shadow-ko-brand-primary/10 flex"
              >
                <div className="relative aspect-[4/3] w-28 flex-shrink-0 overflow-hidden">
                  <Imagex
                    src={post.image}
                    srcset={post.imageSrcset}
                    alt={post.title}
                    className="w-full h-full object-cover object-[50%_30%] transition-transform duration-700 group-hover/item:scale-110 will-change-transform"
                    loading="lazy"
                    sizes="120px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ko-widget-bg/50" />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between relative min-w-0">
                  <h3 className="font-bold text-ko-text-primary text-base line-clamp-2 group-hover/item:text-ko-brand-primary transition-colors leading-tight pr-20 mb-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-ko-text-muted">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <Icon name="ti ti-calendar" size={12} className="flex-shrink-0" />
                        <span className="truncate">{post.publishedAt}</span>
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1.5">
                          <Icon name="ti ti-user" size={12} className="text-ko-brand-primary flex-shrink-0" />
                          <span className="font-semibold text-ko-brand-primary truncate">{post.author}</span>
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1.5">
                      <Icon name="ti ti-eye" size={12} className="flex-shrink-0" />
                      <span className="font-bold">{post.viewsCount}</span>
                    </span>
                  </div>

                  {post.categoryName && (
                    <div className="absolute top-4 right-4 z-10">
                      <div
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-sm whitespace-nowrap"
                        style={{
                          backgroundColor: `${post.categoryColor || DEFAULT_CATEGORY_COLOR}30`,
                          color: post.categoryTextColor || DEFAULT_CATEGORY_TEXT_COLOR
                        }}
                      >
                        {post.categoryName}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
