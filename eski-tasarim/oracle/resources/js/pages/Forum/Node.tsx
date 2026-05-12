import { Icon } from '@/components/shared/icon'
import { Link } from '@inertiajs/react'
import { ErrorState } from '@/components/shared/ErrorState'
import {
  CategoryCard,
  TopicList,
  ForumPagination,
  ForumBreadcrumb,
} from './components'

export default function NodePage({ node, childNodes, topics, breadcrumbs, userCan, error }) {
  const { t } = useTranslation()

  if (error || !node) {
    return <ErrorState message={t('plugins.forum.page.category_load_error')} />
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <ForumBreadcrumb items={breadcrumbs} />
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6">
          <div
            className="relative bg-gradient-to-r from-ko-card/90 via-ko-card/50 to-transparent backdrop-blur-md rounded-2xl p-6 border overflow-hidden"
            style={{ borderColor: `${node.color || '#3b82f6'}40` }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 blur-3xl rounded-full opacity-30"
              style={{ backgroundColor: node.color || '#3b82f6' }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl"
                  style={{
                    backgroundColor: `${node.color || '#3b82f6'}15`,
                    border: `2px solid ${node.color || '#3b82f6'}30`,
                  }}
                >
                  {node.icon ? (
                    <Icon name={node.icon} size={32} style={{ color: node.color || '#3b82f6' }} />
                  ) : (
                    <Icon name="ti ti-message" size={32} style={{ color: node.color || '#3b82f6' }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-black text-ko-text-primary">{node.title}</h1>
                    <span
                      className="px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                      style={{
                        color: node.color || '#3b82f6',
                        backgroundColor: `${node.color || '#3b82f6'}20`,
                      }}
                    >
                      {node.nodeType}
                    </span>
                  </div>
                  {node.description && <div className="text-ko-text-muted [&>p]:m-0" dangerouslySetInnerHTML={{ __html: node.description }} />}
                </div>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-ko-text-primary">{node.topicCount}</div>
                  <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.topics')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: node.color || '#3b82f6' }}>
                    {node.postCount}
                  </div>
                  <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.messages')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Child Nodes (Subcategories) */}
        {childNodes && childNodes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-ko-text-primary mb-4">{t('plugins.forum.page.subcategories')}</h3>
            <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary divide-y divide-ko-border-primary">
              {childNodes.map((child) => (
                <CategoryCard key={child.id} category={child} />
              ))}
            </div>
          </div>
        )}

        {/* Topics List */}
        <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
          {/* Header */}
          <div className="relative p-4 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent border-b border-ko-border-primary">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-40" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
                <Icon name="ti ti-message" size={20} className="text-ko-brand-primary" />
                {t('plugins.forum.page.topics')}
                {topics && (
                  <span className="text-sm font-normal text-ko-text-muted">
                    ({t('plugins.forum.page.topic_total', { count: topics.total })})
                  </span>
                )}
              </h2>
              {userCan.createTopic && !node.isLocked && (
                <Link
                  href={route('api.ko-forum-v2.topic.create', { slug: node.slug })}
                  className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Icon name="ti ti-plus" size={16} />
                  {t('plugins.forum.page.new_topic')}
                </Link>
              )}
            </div>
          </div>

          {/* Topics */}
          {topics && topics.data.length > 0 ? (
            <>
              <TopicList topics={topics.data} showNode={false} />
              {topics.total > topics.per_page && (
                <div className="border-t border-ko-border-primary">
                  <ForumPagination pagination={topics} />
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-ko-widget-bg flex items-center justify-center mx-auto mb-4">
                <Icon name="ti ti-message" size={40} className="text-ko-text-muted" />
              </div>
              <h3 className="text-lg font-bold text-ko-text-primary mb-2">{t('plugins.forum.page.no_topics_yet')}</h3>
              <p className="text-ko-text-muted mb-4">
                {t('plugins.forum.page.no_topics_message')}
              </p>
              {userCan.createTopic && !node.isLocked && (
                <Link
                  href={route('api.ko-forum-v2.topic.create', { slug: node.slug })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Icon name="ti ti-plus" size={16} />
                  {t('plugins.forum.page.open_first_topic')}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
