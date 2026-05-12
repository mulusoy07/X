import { memo } from 'react'
import { Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import type { ForumNode } from '../../types'

interface CategoryCardProps {
  category: ForumNode
}

export const CategoryCard = memo(function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useTranslation()
  
  // Handle Link type nodes differently (external links)
  const isLink = category.nodeType === 'link'
  const linkHref = isLink && category.externalUrl ? category.externalUrl : route('api.ko-forum-v2.node.show', { slug: category.slug })
  const LinkWrapper = isLink ? 'a' : Link
  const linkProps = isLink ? { href: linkHref, target: '_blank', rel: 'noopener noreferrer' } : { href: linkHref }

  return (
    <div className="group">
      {/* Category Header */}
      <div className="relative p-4 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent hover:bg-ko-widget-bg/30 transition-all">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <LinkWrapper
            {...linkProps}
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
            style={{
              backgroundColor: `${category.color || '#3b82f6'}15`,
              border: `2px solid ${category.color || '#3b82f6'}30`,
              color: category.color || '#3b82f6'
            }}
          >
            <Icon name={category.icon || 'ti ti-folder'} size={28} />
          </LinkWrapper>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <LinkWrapper
                {...linkProps}
                className="text-lg font-bold text-ko-text-primary hover:text-ko-brand-primary transition-colors"
              >
                {category.title}
              </LinkWrapper>
              {isLink && (
                <Icon name="ti ti-external-link" size={16} className="text-ko-brand-primary flex-shrink-0" />
              )}
              {category.isLocked && (
                <Icon name="ti ti-lock" size={16} className="text-ko-text-muted flex-shrink-0" />
              )}
              {category.isPrivate && (
                <Icon name="ti ti-crown" size={16} className="text-amber-500 flex-shrink-0" />
              )}
            </div>
            {category.description && (
              <div className="text-sm text-ko-text-muted line-clamp-1 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: category.description }} />
            )}
          </div>

          {/* Stats - Only show for Forum type */}
          {category.nodeType === 'forum' && category.topicCount !== undefined && (
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="text-lg font-black text-ko-text-primary">{category.topicCount}</div>
                <div className="text-xs text-ko-text-muted">{t('plugins.forum.components.category_card.topics')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-ko-brand-primary">{category.postCount}</div>
                <div className="text-xs text-ko-text-muted">{t('plugins.forum.components.category_card.messages')}</div>
              </div>
            </div>
          )}

          {/* Arrow/Icon */}
          {isLink ? (
            <Icon name="ti ti-external-link" size={20} className="text-ko-brand-primary group-hover:scale-110 transition-all flex-shrink-0" />
          ) : (
            <Icon name="ti ti-chevron-right" size={20} className="text-ko-text-muted group-hover:text-ko-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          )}
        </div>

        {/* Last Activity - Same line as category */}
        {category.lastTopic && (
          <div className="flex items-center gap-3 mt-3 text-xs text-ko-text-muted pl-[72px]">
            <Icon name="ti ti-clock" size={12} className="flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span>{t('plugins.forum.components.category_card.last_activity')}:</span>
              <Link
                href={route('api.ko-forum-v2.topic.show', { slug: category.lastTopic.slug })}
                className="text-ko-brand-primary hover:text-ko-brand-secondary font-semibold truncate"
              >
                {category.lastTopic.title}
              </Link>
            </div>
            <span className="flex-shrink-0">
              {category.lastTopic.updatedAt}
            </span>
          </div>
        )}
      </div>

      {/* Subcategories - Link type should not have children */}
      {!isLink && category.children && category.children.length > 0 && (
        <div className="px-4 pb-4 bg-ko-widget-bg/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-0.5 h-4 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full ml-[72px]" />
            <span className="text-xs font-bold text-ko-text-muted uppercase tracking-wider">{t('plugins.forum.components.category_card.subcategories')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-[72px]">
            {category.children.map((sub) => {
              const isSubLink = sub.nodeType === 'link'
              const SubLinkWrapper = isSubLink ? 'a' : Link
              const subLinkHref = isSubLink && sub.externalUrl ? sub.externalUrl : route('api.ko-forum-v2.node.show', { slug: sub.slug })
              const subLinkProps = isSubLink ? { href: subLinkHref, target: '_blank', rel: 'noopener noreferrer' } : { href: subLinkHref }

              return (
                <SubLinkWrapper
                  key={sub.id}
                  {...subLinkProps}
                  className="group/sub"
                >
                  <div className="flex items-center gap-3 p-3 bg-ko-card/80 border border-ko-border-primary rounded-lg hover:border-ko-brand-primary hover:bg-ko-card transition-all">
                    {/* Sub Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${sub.color || '#3b82f6'}10`,
                        border: `1px solid ${sub.color || '#3b82f6'}30`,
                        color: sub.color || '#3b82f6'
                      }}
                    >
                      <Icon name={sub.icon || 'ti ti-folder-open'} size={20} />
                    </div>

                    {/* Sub Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {isSubLink ? (
                          <Icon name="ti ti-external-link" size={12} className="text-ko-brand-primary flex-shrink-0" />
                        ) : (
                          <Icon name="ti ti-chevron-right" size={12} className="text-ko-text-muted group-hover/sub:text-ko-brand-primary transition-colors flex-shrink-0" />
                        )}
                        <span className="text-sm font-bold text-ko-text-primary group-hover/sub:text-ko-brand-primary truncate">
                          {sub.title}
                        </span>
                      </div>
                      {sub.description && (
                        <div className="text-xs text-ko-text-muted line-clamp-1 pl-5 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: sub.description }} />
                      )}
                    </div>

                    {/* Sub Stats - Only show for Forum type */}
                    {sub.nodeType === 'forum' && sub.topicCount !== undefined && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-sm font-black text-ko-text-primary">{sub.topicCount}</div>
                          <div className="text-xs text-ko-text-muted">{t('plugins.forum.components.category_card.topics')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </SubLinkWrapper>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
})
