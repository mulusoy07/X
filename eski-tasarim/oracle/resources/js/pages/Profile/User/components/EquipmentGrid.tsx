import { ItemSlot } from './ItemSlot'

export function EquipmentGrid({ user }) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Costume */}
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
              {t('plugins.game.profile.user.costume')}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-0.5 items-center">
              <div 
                className="grid gap-0.5" 
                style={{ 
                  gridTemplateColumns: "repeat(3, min-content)", 
                  gridTemplateRows: "repeat(3, min-content)", 
                  gridTemplateAreas: `"s50 s43 s49" "s44 s42 s45" ". s46 ."` 
                }}
              >
                <div style={{ gridArea: "s50" }}>
                  <ItemSlot slotId={50} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s43" }}>
                  <ItemSlot slotId={43} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s49" }}>
                  <ItemSlot slotId={49} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s44" }}>
                  <ItemSlot slotId={44} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s42" }}>
                  <ItemSlot slotId={42} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s45" }}>
                  <ItemSlot slotId={45} items={user.cospreItems} />
                </div>
                <div style={{ gridArea: "s46" }}>
                  <ItemSlot slotId={46} items={user.cospreItems} />
                </div>
              </div>
              <div className="flex gap-0.5 mt-1">
                <ItemSlot slotId={47} items={user.cospreItems} />
                <ItemSlot slotId={48} items={user.cospreItems} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-ko-card border-b border-ko-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider">
              {t('plugins.game.profile.user.equipment')}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(14)].map((_, i) => (
                <ItemSlot key={i} slotId={i} items={user.equipmentItems} />
              ))}
              <div className="w-[45px] h-[45px] border border-ko-border-primary bg-ko-card rounded flex items-center justify-center">
                <span className="text-ko-text-muted text-lg">🗑️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
