import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'

export function FilterSection({ filters, nations, sortOptions, searchRef, isRefreshing, onFilterChange, onReset }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card-bg border border-ko-border-primary rounded-lg p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="w-full sm:flex-1 relative order-1">
          <Icon name="ti ti-search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ko-text-card-meta" />
          <Input
            key={filters.clanName}
            ref={searchRef}
            placeholder={t('rankings.clans.search')}
            defaultValue={filters.clanName || ''}
            className="pl-10 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title placeholder:text-ko-text-card-meta focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 h-9"
            disabled={isRefreshing}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onFilterChange('clanName', e.currentTarget.value)
            }}
          />
        </div>

        <div className="hidden sm:block w-px h-8 bg-ko-border-primary order-2" />

        <div className="flex items-center gap-2 w-full sm:w-auto order-3">
          <Select
            value={filters.nation.toString()}
            onValueChange={(value) => onFilterChange('nation', parseInt(value))}
            disabled={isRefreshing}
          >
            <SelectTrigger aria-label={t('rankings.select_nation')} className="flex-1 sm:flex-none sm:w-36 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 hover:border-ko-brand-primary/50 transition-colors h-9">
              <SelectValue placeholder={t('rankings.select_nation')} />
            </SelectTrigger>
            <SelectContent className="bg-ko-card-bg border-ko-border-primary shadow-lg">
              {nations.map((name, index) => (
                <SelectItem key={index} value={index.toString()} className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFilterChange('sortBy', value)}
            disabled={isRefreshing}
          >
            <SelectTrigger aria-label={t('rankings.sort_by')} className="flex-1 sm:flex-none sm:w-36 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 hover:border-ko-brand-primary/50 transition-colors h-9">
              <SelectValue placeholder={t('rankings.sort_by')} />
            </SelectTrigger>
            <SelectContent className="bg-ko-card-bg border-ko-border-primary shadow-lg">
              {Object.entries(sortOptions).map(([value, label]) => (
                <SelectItem key={value} value={value} className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto order-4">
          <Button
            type="button"
            disabled={isRefreshing}
            className="flex-1 sm:flex-none bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-semibold text-sm h-9 px-4 hover:shadow-lg cursor-pointer"
            onClick={() => {
              if (searchRef?.current) onFilterChange('clanName', searchRef.current.value)
            }}
          >
            {isRefreshing
              ? <Icon name="ti ti-loader-2" className="w-4 h-4 mr-1 animate-spin" />
              : <Icon name="ti ti-search" className="w-4 h-4 mr-1" />
            }
            <span className="hidden sm:inline">{t('rankings.search')}</span>
          </Button>

          <Button
            type="button"
            disabled={isRefreshing}
            variant="outline"
            className="flex-1 sm:flex-none bg-ko-widget-bg text-ko-text-card-title font-semibold text-sm h-9 px-4 hover:bg-ko-card-hover cursor-pointer"
            onClick={onReset}
          >
            <Icon name="ti ti-eraser" className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{t('rankings.reset')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
