import { Imagex } from '@/components/shared/Imagex'

export function ClassTabs({ classes, selectedSlug, onClassSelect, isRefreshing }) {
  return (
    <div className="bg-ko-card border border-ko-border-primary rounded-xl p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => {
          const isActive = cls.classKey === selectedSlug

          return (
            <button
              type="button"
              key={cls.classKey}
              onClick={() => onClassSelect(cls.classKey)}
              disabled={isRefreshing}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 justify-center min-w-[100px] ${
                isActive
                  ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
                  : 'text-ko-text-muted hover:text-ko-text-primary hover:bg-ko-widget-bg/50'
              }`}
            >
              <Imagex
                width={22}
                height={22}
                icon={cls.classIcon}
                alt={cls.className}
                className="w-[22px] h-[22px]"
              />
              <span>{cls.className}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
