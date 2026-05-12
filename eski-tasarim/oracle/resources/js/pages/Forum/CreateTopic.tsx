import { Head, Link } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import {
  TopicForm,
  ForumBreadcrumb,
} from './components'

export default function CreateTopic({ node, breadcrumbs, prefixes, userCan, error }) {
  const { t } = useTranslation()

  // Error state
  if (error || !node) {
    return (
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ti ti-alert-triangle" size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-ko-text-primary mb-2">{t('components.errors.generic')}</h2>
            <p className="text-ko-text-muted mb-6">{error || t('plugins.forum.page.page_load_failed')}</p>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-primary hover:bg-ko-card-hover transition-colors"
            >
              <Icon name="ti ti-arrow-left" size={20} />
              {t('plugins.forum.page.back_to_forum')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <ForumBreadcrumb
              items={[
                ...breadcrumbs,
                { title: t('plugins.forum.page.new_topic'), routeName: null, routeParams: {} },
              ]}
            />
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

            <div className="relative flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${node.color || '#3b82f6'}15`,
                  border: `2px solid ${node.color || '#3b82f6'}30`,
                }}
              >
                <Icon name="ti ti-plus" size={28} style={{ color: node.color || '#3b82f6' }} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-ko-text-primary">{t('plugins.forum.page.create_new_topic')}</h1>
                <p className="text-ko-text-muted">
                  {t('plugins.forum.page.open_new_topic_in', { category: node.title })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary overflow-hidden">
          <div className="relative p-4 bg-gradient-to-r from-ko-widget-bg/50 via-transparent to-transparent border-b border-ko-border-primary">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-40" />
            <h2 className="text-lg font-bold text-ko-text-primary flex items-center gap-2">
              <Icon name="ti ti-edit" size={20} className="text-ko-brand-primary" />
              {t('plugins.forum.page.topic_details')}
            </h2>
          </div>

          <div className="p-6">
            <TopicForm
              mode="create"
              nodeSlug={node.slug}
              prefixes={prefixes}
              onCancel={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CreateTopic.layout = (page) => <PublicLayout children={page} />
