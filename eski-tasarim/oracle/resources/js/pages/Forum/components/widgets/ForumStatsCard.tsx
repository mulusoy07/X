import { Icon } from '@/components/shared/icon'
import type { ForumStats } from '../../types'

interface ForumStatsProps {
  stats: ForumStats
}

export function ForumStatsCard({ stats }: ForumStatsProps) {
  const { t } = useTranslation()

  // Mock online users count (not available in backend yet, using fixed value for now)
  const onlineUsers = 0

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary overflow-hidden">
      <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        <h3 className="text-sm font-bold text-ko-text-primary flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-ko-brand-primary/20 to-ko-brand-secondary/10 flex items-center justify-center">
            <Icon name="ti ti-message" size={12} className="text-ko-brand-primary" />
          </div>
          {t('plugins.forum.components.stats_card.title')}
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Total Topics */}
        <div className="flex items-center justify-between p-3 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary hover:border-ko-brand-primary transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Icon name="ti ti-message" size={16} className="text-blue-500" />
            </div>
            <span className="text-sm text-ko-text-muted">{t('plugins.forum.components.stats_card.topics')}</span>
          </div>
          <div className="text-lg font-black text-ko-text-primary group-hover:text-blue-500 transition-colors">
            {stats.totalTopics}
          </div>
        </div>

        {/* Total Posts */}
        <div className="flex items-center justify-between p-3 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary hover:border-emerald-500/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Icon name="ti ti-message-circle" size={16} className="text-emerald-500" />
            </div>
            <span className="text-sm text-ko-text-muted">{t('plugins.forum.components.stats_card.posts')}</span>
          </div>
          <div className="text-lg font-black text-ko-text-primary group-hover:text-emerald-500 transition-colors">
            {stats.totalPosts}
          </div>
        </div>

        {/* Total Members */}
        <div className="flex items-center justify-between p-3 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary hover:border-purple-500/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Icon name="ti ti-users" size={16} className="text-purple-500" />
            </div>
            <span className="text-sm text-ko-text-muted">{t('plugins.forum.components.stats_card.members')}</span>
          </div>
          <div className="text-lg font-black text-ko-text-primary group-hover:text-purple-500 transition-colors">
            {stats.totalUsers}
          </div>
        </div>

        {/* Online */}
        <div className="flex items-center justify-between p-3 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center relative">
              <Icon name="ti ti-bolt" size={16} className="text-emerald-500" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <span className="text-sm text-ko-text-muted">{t('plugins.forum.components.stats_card.online')}</span>
          </div>
          <div className="relative text-lg font-black text-emerald-500">
            {onlineUsers}
          </div>
        </div>
      </div>
    </div>
  )
}
