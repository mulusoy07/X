import { useState } from 'react'
import { Icon } from '@/components/shared/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MemberRow } from './MemberRow'

export function MembersList({ members }) {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState('fame')

  // Sort members
  const sortedMembers = [...(members || [])].sort((a, b) => {
    if (sortBy === 'loyalty') return b.loyalty - a.loyalty
    if (sortBy === 'level') return b.level - a.level
    return 0 // fame is default order from backend
  })

  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-ko-card border-b border-ko-border-primary">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse flex-shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-ko-text-primary uppercase tracking-wider flex items-center gap-1 sm:gap-2">
              <Icon name="ti ti-users" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('plugins.game.profile.clan.clan_members')}</span>
              <span className="sm:hidden">{t('plugins.game.profile.clan.members')}</span>
            </h3>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="hidden sm:inline text-xs text-ko-text-muted">{t('plugins.game.profile.clan.sort_by')}:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger aria-label={t('plugins.game.profile.clan.sort_by')} className="w-24 sm:w-32 bg-ko-widget-bg border-ko-border-primary text-ko-text-primary focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 hover:border-ko-brand-primary/50 transition-colors h-7 sm:h-8 text-[11px] sm:text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-ko-card-bg border-ko-border-primary shadow-lg">
                <SelectItem
                  value="fame"
                  className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer text-xs"
                >
                  {t('plugins.game.profile.clan.rank')}
                </SelectItem>
                <SelectItem
                  value="loyalty"
                  className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer text-xs"
                >
                  {t('plugins.game.profile.clan.np')}
                </SelectItem>
                <SelectItem
                  value="level"
                  className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer text-xs"
                >
                  {t('plugins.game.profile.clan.level')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="space-y-1.5 sm:space-y-2">
          {sortedMembers.map((player, index) => (
            <div
              key={`${player.userId}-${player.rank}`}
              className={`transition-colors hover:bg-ko-card/50 ${
                index % 2 === 0 ? 'bg-ko-card/30' : 'bg-ko-widget-bg/30'
              }`}
            >
              <MemberRow player={player} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
