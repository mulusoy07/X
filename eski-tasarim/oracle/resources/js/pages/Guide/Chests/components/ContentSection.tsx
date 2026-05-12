import { Icon } from '@/components/shared/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RewardCard } from './RewardCard'

const ITEM_TYPES = { UNIQUE: 4, UPGRADE: 5 }

export function ContentSection({ chest }) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [itemTypeFilter, setItemTypeFilter] = useState('all')

  const filteredRewards = useMemo(() => chest.exchangeItems.filter(item => {
    const matchesSearch = !searchTerm || item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = itemTypeFilter === 'all' || Number(item.itemType) === itemTypeFilter
    return matchesSearch && matchesType
  }), [chest.exchangeItems, searchTerm, itemTypeFilter])

  return (
    <>
      {/* Search & Filter Section */}
      <div className="p-4">
        <div className="bg-ko-card border border-ko-border-primary rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Icon name="ti ti-search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ko-text-muted" />
              <Input
                placeholder={t('guide.search_item')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-ko-widget-bg border-ko-border-primary text-ko-text-primary placeholder:text-ko-text-muted focus:border-ko-brand-primary focus:ring-ko-brand-primary/20 h-9"
              />
            </div>
            <div className="w-px h-8 bg-ko-border-primary" />
            <div className="flex gap-2">
              {[
                { key: 'all', label: t('guide.all') },
                { key: ITEM_TYPES.UNIQUE, label: 'Unique' },
                { key: ITEM_TYPES.UPGRADE, label: 'Upgrade' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  variant={itemTypeFilter === key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setItemTypeFilter(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Rewards Grid */}
      <div className="p-4">
        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {filteredRewards.map((item) => (
              <RewardCard key={item.itemId} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-ko-widget-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ti ti-mood-sad" className="w-8 h-8 text-ko-text-muted" />
            </div>
            <p className="text-ko-text-muted text-sm">{t('guide.item_mix.no_matching_item')}</p>
          </div>
        )}
      </div>
    </>
  )
}
