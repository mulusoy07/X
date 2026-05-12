import { Icon } from '@/components/shared/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Imagex } from '@/components/shared/Imagex'
import { ItemIcon } from '@/components/shared/ItemIcon'
import { InteractiveMap } from './InteractiveMap'

export function MobDetails({ mobDetail, zones, selectedZoneId }) {
  const { t } = useTranslation()
  const { mob: mobData, spawnsByZone, drops } = mobDetail
  const isBoss = mobData.boss === 1

  const [selectedZone, setSelectedZone] = useState(
    selectedZoneId || spawnsByZone[0]?.zoneId || null
  )

  const currentZoneData = spawnsByZone.find(z => z.zoneId === selectedZone) || spawnsByZone[0]
  const currentZone = zones.find(z => z.zoneId === currentZoneData?.zoneId)

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* TOP SECTION - LEFT (Avatar+Stats+Zones) + RIGHT (Map) */}
      <div className="bg-ko-widget-bg border border-ko-border-primary rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">

          {/* LEFT SIDE - STACK: Avatar + Stats + Zones */}
          <div className="border-b lg:border-b-0 lg:border-r border-ko-border-primary bg-gradient-to-br from-ko-card/50 to-transparent">
            {/* Avatar + Name + Stats */}
            <div className="p-4 border-b border-ko-border-primary/50">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {isBoss ? (
                    <div className="relative">
                      <div className="w-36 h-36 rounded-full bg-ko-widget-bg border-2 border-amber-500 overflow-hidden">
                        <Imagex
                          src={`/assets/images/mobs/${mobData.pictureId}.webp`}
                          alt={mobData.strName}
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Icon name="ti ti-crown" className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-full bg-ko-widget-bg border-2 border-ko-border-primary overflow-hidden ">
                      <Imagex
                        src={`/assets/images/mobs/${mobData.pictureId}.webp`}
                        alt={mobData.strName}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Name + Badge */}
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-ko-text-primary mb-1">
                  {mobData.strName}
                </h2>
                {isBoss && (
                  <span className="inline-block px-2.5 py-0.5 bg-amber-500/10 border border-amber-500 rounded text-xs font-semibold text-amber-400 uppercase">
                    Boss
                  </span>
                )}
              </div>

              {/* Kompakt Statlar - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* Seviye */}
                <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg px-2.5 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="ti ti-star" className="w-3 h-3 text-ko-brand-primary flex-shrink-0" />
                    <span className="text-[11px] text-ko-text-muted uppercase tracking-wide font-semibold">Level</span>
                  </div>
                  <div className="text-base font-bold text-ko-text-primary">{mobData.level}</div>
                </div>

                {/* Can */}
                <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg px-2.5 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="ti ti-heart" className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="text-[11px] text-ko-text-muted uppercase tracking-wide font-semibold">HP</span>
                  </div>
                  <div className="text-base font-bold text-ko-text-primary">{mobData.hpPoint}</div>
                </div>

                {/* Savunma */}
                <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg px-2.5 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="ti ti-shield" className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span className="text-[11px] text-ko-text-muted uppercase tracking-wide font-semibold">Def</span>
                  </div>
                  <div className="text-base font-bold text-ko-text-primary">{mobData.defense}</div>
                </div>

                {/* Gold */}
                <div className="bg-ko-widget-bg border border-ko-border-primary rounded-lg px-2.5 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="ti ti-coins" className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    <span className="text-[11px] text-ko-text-muted uppercase tracking-wide font-semibold">Gold</span>
                  </div>
                  <div className="text-base font-bold text-ko-text-primary">{mobData.money}</div>
                </div>
              </div>
            </div>

            {/* Zone Listesi */}
            {spawnsByZone.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-ko-text-primary mb-3 flex items-center gap-2">
                  <Icon name="ti ti-map-pin" className="w-4 h-4 text-ko-brand-primary" />
                  {t('guide.mobs.zones_found')}
                </h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 pr-3">
                    {spawnsByZone.map((zone) => (
                      <button
                        key={zone.zoneId}
                        onClick={() => setSelectedZone(zone.zoneId)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-200 text-sm font-medium",
                          selectedZone === zone.zoneId
                            ? "border-ko-brand-primary bg-ko-brand-primary/10 text-ko-text-primary shadow-md"
                            : "border-ko-border-primary bg-ko-card text-ko-text-muted hover:border-ko-brand-primary/50 hover:text-ko-text-primary hover:bg-ko-brand-primary/5"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{zone.zoneName}</span>
                          <span className="text-xs bg-ko-widget-bg px-2 py-0.5 rounded-full border border-ko-border-primary">
                            {zone.spawns.length} spawn
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Interactive Map */}
          <div className="p-4 bg-ko-card/30 flex items-center justify-center min-h-[400px]">
            {spawnsByZone.length > 0 ? (
              currentZone && currentZoneData ? (
                <InteractiveMap
                  zone={currentZone}
                  spawns={currentZoneData.spawns}
                  mobName={mobData.strName}
                />
              ) : (
                <div className="w-full bg-ko-widget-bg rounded-lg p-6 text-center border border-ko-border-primary">
                  <Icon name="ti ti-map-pin" className="w-10 h-10 mx-auto mb-3 text-ko-text-muted opacity-50" />
                  <p className="text-ko-text-muted text-sm">{t('guide.mobs.no_map_data')}</p>
                </div>
              )
            ) : (
              <div className="w-full bg-ko-widget-bg rounded-lg p-6 text-center border border-ko-border-primary">
                <Icon name="ti ti-map-pin" className="w-10 h-10 mx-auto mb-3 text-ko-text-muted opacity-50" />
                <p className="text-ko-text-muted text-sm">{t('guide.mobs.no_spawn_data')}</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* DROPS SECTION */}
      <div className="bg-ko-widget-bg border border-ko-border-primary rounded-xl p-4">
        <h3 className="text-base font-semibold text-ko-text-primary mb-3 flex items-center gap-2">
          <Icon name="ti ti-package" className="w-4 h-4 text-ko-brand-primary" />
          {t('guide.drops')}
        </h3>

        <div className="space-y-3">
          {/* Normal Drops */}
          {drops.normal.length > 0 && (
            <div>
              <h4 className="font-medium text-ko-text-primary mb-2 flex items-center gap-2">
                <div className="w-0.5 h-3 bg-gradient-to-b from-ko-brand-primary to-ko-brand-secondary rounded-full" />
                {t('guide.chests.normal_items')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {drops.normal.map((item, index) => (
                  <div
                    key={`normal-${item.itemId}-${index}`}
                    className="bg-ko-card border border-ko-border-primary rounded-lg p-2.5 hover:border-ko-brand-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 bg-ko-widget-bg rounded border border-ko-border-primary flex items-center justify-center">
                        <ItemIcon
                          id={item.itemId}
                          alt={item.itemName || 'Unknown Item'}
                          width={48}
                          height={48}
                          showTooltip={true}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-ko-text-primary text-sm">
                          {item.itemName || `Item ${item.itemId}`}
                        </div>
                        <div className="text-xs text-ko-text-muted">
                          Drop: {item.dropRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group Drops */}
          {drops.groups.length > 0 && (
            <div>
              <h4 className="font-medium text-ko-text-primary mb-2 flex items-center gap-2">
                <Icon name="ti ti-trophy" className="w-3.5 h-3.5 text-ko-brand-primary" />
                {t('guide.chests.group_items')}
              </h4>
              <div className="max-h-[250px] overflow-y-auto pr-2 space-y-2">
                {drops.groups.map((group, groupIndex) => (
                  <div key={`group-${group.groupId}-${groupIndex}`} className="bg-ko-card border border-ko-border-primary rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-ko-brand-primary/10 to-ko-brand-secondary/10 border-b border-ko-border-primary px-3 py-2">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-ko-brand-primary uppercase tracking-wide">
                            {t('guide.chests.group_items')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-3">
                          <div className="w-1.5 h-1.5 bg-ko-brand-primary rounded-full" />
                          <span className="text-xs font-bold text-ko-text-primary">
                            {group.groupDropRate}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.items.map((item, itemIndex) => (
                          <div
                            key={`group-item-${group.groupId}-${item.itemId}-${itemIndex}`}
                            className="bg-ko-widget-bg border border-ko-border-primary rounded p-2.5 hover:border-ko-brand-primary/30 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-12 h-12 bg-ko-card rounded border border-ko-border-primary flex items-center justify-center flex-shrink-0">
                                <ItemIcon
                                  id={item.itemId}
                                  alt={item.itemName || 'Unknown Item'}
                                  width={48}
                                  height={48}
                                  showTooltip={true}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-ko-text-primary text-sm">
                                  {item.itemName || `Item ${item.itemId}`}
                                </div>
                                <div className="text-xs text-ko-text-muted">
                                  {item.dropRate}% • {item.itemCount || 1}x
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Drops */}
          {drops.normal.length === 0 && drops.groups.length === 0 && (
            <div className="text-center text-ko-text-muted py-6">
              <Icon name="ti ti-package" className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">{t('guide.mobs.no_drops')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
