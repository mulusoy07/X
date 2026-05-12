import { Head, Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import {
  TopicForm,
  ForumBreadcrumb,
} from './components'

export default function EditTopic({ topic, node, path, prefixes, userCan, error }) {
  const { t } = useTranslation()

  if (error || !topic) {
    return (
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-red-500/30 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ti ti-alert-triangle" size={40} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-ko-text-primary mb-2">{t('components.errors.generic')}</h3>
            <p className="text-ko-text-muted">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user can edit topic
  // Note: userCan.edit already considers moderator permissions,
  // so if it's true, the user can edit even if topic is locked
  if (!userCan.edit) {
    return (
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-red-500/30 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ti ti-lock" size={40} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-ko-text-primary mb-2">{t('plugins.forum.page.access_denied')}</h3>
            <p className="text-ko-text-muted">{t('plugins.forum.page.no_edit_permission')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {path && path.length > 0 && (
          <div className="mb-4">
            <ForumBreadcrumb items={path} />
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
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${node.color || '#3b82f6'}15`,
                    border: `2px solid ${node.color || '#3b82f6'}30`,
                  }}
                >
                  {node.icon ? (
                    <Icon name={node.icon} size={32} style={{ color: node.color || '#3b82f6' }} />
                  ) : (
                    <Icon name="ti ti-edit" size={32} style={{ color: node.color || '#3b82f6' }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-black text-ko-text-primary">{t('plugins.forum.page.edit_topic')}</h1>
                    <span
                      className="px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                      style={{
                        color: node.color || '#3b82f6',
                        backgroundColor: `${node.color || '#3b82f6'}20`,
                      }}
                    >
                      {node.title}
                    </span>
                  </div>
                  <p className="text-ko-text-muted">{topic.title}</p>
                </div>
              </div>

              {/* Back Button */}
              <Link
                href={`/forum/topic/${topic.slug}`}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-card transition-all"
              >
                <Icon name="ti ti-arrow-left" size={16} />
                {t('plugins.forum.page.back_to_topic')}
              </Link>
            </div>
          </div>
        </div>

        {/* Topic Form */}
        <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
          <div className="relative p-4 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent border-b border-ko-border-primary">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-40" />
            <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
              <Icon name="ti ti-forms" size={20} className="text-ko-brand-primary" />
              {t('plugins.forum.page.edit_topic_info')}
            </h2>
          </div>

          <div className="p-6">
            <TopicForm
              mode="edit"
              topicSlug={topic.slug}
              initialData={{
                title: topic.title,
                content: topic.content,
                prefix_id: topic.prefixId || undefined,
              }}
              prefixes={prefixes}
              onCancel={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

EditTopic.layout = (page) => <PublicLayout children={page} />
