import { CategoryCard } from '../cards/CategoryCard'
import { Icon } from '@/components/shared/icon'
import type { ForumNode } from '../../types'

interface SectionListProps {
  sections: ForumNode[]
}

export function SectionList({ sections }: SectionListProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary"
        >
          {/* Section Header */}
          <div className="relative bg-gradient-to-r from-ko-brand-primary/10 via-ko-brand-secondary/5 to-transparent p-4 border-b border-ko-border-primary overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-ko-brand-primary/20 to-transparent blur-3xl rounded-full" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary flex items-center justify-center text-white">
                  <Icon name={section.icon || 'ti ti-layout-grid'} size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-ko-text-primary flex items-center gap-2">
                    {section.title}
                    <Icon name="ti ti-stack-2" size={16} className="text-ko-brand-primary" />
                  </h2>
                  {section.description && (
                    <div className="text-sm text-ko-text-muted mt-0.5 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: section.description }} />
                  )}
                </div>
              </div>
              {/* Stats only for Forum type */}
              {section.nodeType === 'forum' && section.topicCount !== undefined && (
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-black text-ko-brand-primary">{section.topicCount}</div>
                    <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.topic_count')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-500">{section.postCount}</div>
                    <div className="text-xs text-ko-text-muted">{t('plugins.forum.page.message_count')}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="divide-y divide-ko-border-primary">
            {section.children && section.children.length > 0 ? (
              section.children.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-ko-text-muted">{t('plugins.forum.page.no_categories_in_section')}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
