import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/shared/icon'

export function FilterSection({ filters, zones, onFilterChange, onReset, isRefreshing }) {
  const { t } = useTranslation()

  return (
    <div className="bg-ko-card-bg border border-ko-border-primary rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="ti ti-search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ko-text-card-meta" />
          <Input
            key={filters.strName}
            placeholder={t('guide.mobs.search')}
            defaultValue={filters.strName || ''}
            className="pl-10 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title placeholder:text-ko-text-card-meta focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 h-9"
            disabled={isRefreshing}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onFilterChange('strName', e.currentTarget.value)
              }
            }}
          />
        </div>
        <div className="w-px h-8 bg-ko-border-primary" />
        <Select
          value={filters.zoneId.toString()}
          onValueChange={(value) => onFilterChange('zoneId', parseInt(value))}
          disabled={isRefreshing}
        >
          <SelectTrigger aria-label={t('guide.mobs.select_zone')} className="w-52 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 hover:border-ko-brand-primary/50 transition-colors h-9">
            <SelectValue placeholder={t('guide.mobs.select_zone')} />
          </SelectTrigger>
          <SelectContent className="bg-ko-card-bg border-ko-border-primary shadow-lg">
            {zones.map((zone) => (
              <SelectItem
                key={zone.zoneId}
                value={zone.zoneId.toString()}
                className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer"
              >
                {zone.zoneName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-px h-8 bg-ko-border-primary" />
        <Select
          value={filters.boss === null || filters.boss === undefined ? 'all' : filters.boss.toString()}
          onValueChange={(value) => onFilterChange('boss', value === 'all' ? null : parseInt(value))}
          disabled={isRefreshing}
        >
          <SelectTrigger aria-label={t('guide.boss')} className="w-32 bg-ko-widget-bg border-ko-border-primary text-ko-text-card-title focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 hover:border-ko-brand-primary/50 transition-colors h-9">
            <SelectValue placeholder={t('guide.boss')} />
          </SelectTrigger>
          <SelectContent className="bg-ko-card-bg border-ko-border-primary shadow-lg">
            <SelectItem value="all" className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer">{t('guide.all')}</SelectItem>
            <SelectItem value="1" className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer">{t('guide.boss')}</SelectItem>
            <SelectItem value="0" className="text-ko-text-card-title hover:bg-ko-card-hover hover:text-ko-brand-primary focus:bg-ko-card-hover focus:text-ko-brand-primary data-[highlighted]:bg-ko-card-hover data-[highlighted]:text-ko-brand-primary data-[state=checked]:bg-ko-brand-primary/20 data-[state=checked]:text-ko-brand-primary cursor-pointer">{t('guide.others')}</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px h-8 bg-ko-border-primary" />
        <Button
          type="button"
          disabled={isRefreshing}
          variant="outline"
          className="bg-transparent hover:bg-ko-card-hover text-ko-text-card-title h-9 px-4 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-semibold text-sm hover:shadow-lg cursor-pointer"
          onClick={(e) => {
            const input = e.currentTarget.closest('div')?.querySelector('input')
            onFilterChange('strName', input?.value ?? '')
          }}
        >
          {isRefreshing ? (
            <Icon name="ti ti-loader-2" className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <Icon name="ti ti-search" className="w-4 h-4 mr-1" />
          )}
          {t('components.buttons.search')}
        </Button>
        <div className="w-px h-8 bg-ko-border-primary" />
        <Button
          type="button"
          disabled={isRefreshing}
          variant="outline"
          className="bg-transparent hover:bg-ko-card-hover text-ko-text-card-title h-9 px-4 bg-ko-widget-bg font-semibold text-sm hover:shadow-lg cursor-pointer"
          onClick={onReset}
        >
          <Icon name="ti ti-eraser" className="w-4 h-4 mr-1" />
          {t('guide.reset')}
        </Button>
      </div>
    </div>
  )
}
