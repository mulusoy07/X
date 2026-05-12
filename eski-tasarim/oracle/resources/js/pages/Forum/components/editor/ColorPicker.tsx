import { useState } from 'react'
import { Icon } from '@/components/shared/icon'

interface ColorPickerProps {
  color?: string
  onChange: (color: string) => void
  children: React.ReactNode
}

const PRESET_COLORS = [
  // Reds
  '#EF4444', '#DC2626', '#B91C1C',
  // Oranges
  '#F97316', '#EA580C', '#C2410C',
  // Yellows
  '#EAB308', '#CA8A04', '#A16207',
  // Greens
  '#22C55E', '#16A34A', '#15803D',
  // Blues
  '#3B82F6', '#2563EB', '#1D4ED8',
  // Purples
  '#A855F7', '#9333EA', '#7E22CE',
  // Pinks
  '#EC4899', '#DB2777', '#BE185D',
  // Grays
  '#6B7280', '#4B5563', '#374151',
]

export function ColorPicker({ color, onChange, children }: ColorPickerProps) {
  const { t } = useTranslation()
  const [customColor, setCustomColor] = useState(color || '#000000')
  const [open, setOpen] = useState(false)

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    setCustomColor(selectedColor)
    setOpen(false)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomColor(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value)
    }
  }

  if (!open) {
    return <div onClick={() => setOpen(true)}>{children}</div>
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setOpen(false)}
      />
      
      {/* Popover */}
      <div className="relative">
        <div onClick={() => setOpen(true)}>{children}</div>
        
        <div className="absolute top-full left-0 mt-2 z-50 w-64 bg-ko-card border border-ko-border-primary rounded-lg shadow-2xl p-3">
          <div className="space-y-3">
            {/* Preset Colors */}
            <div>
              <p className="text-xs font-medium text-ko-text-muted mb-2">
                {t('plugins.forum.components.color_picker.preset_colors')}
              </p>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => handleColorSelect(presetColor)}
                    className="w-8 h-8 rounded border-2 border-ko-border-primary hover:border-ko-brand-primary transition-colors relative"
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  >
                    {color === presetColor && (
                      <Icon name="ti ti-check" size={16} className="text-white absolute inset-0 m-auto drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div>
              <p className="text-xs font-bold text-ko-text-card-title uppercase tracking-wider mb-2">
                {t('plugins.forum.components.color_picker.custom_color')}
              </p>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded border-2 border-ko-border-primary flex-shrink-0"
                  style={{ backgroundColor: customColor }}
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  placeholder="#000000"
                  className="flex-1 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-primary h-10 px-3 placeholder:text-ko-text-muted focus:border-ko-brand-primary/50 focus:outline-none transition-all duration-200"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => handleColorSelect(customColor)}
              disabled={!/^#[0-9A-F]{6}$/i.test(customColor)}
              className="w-full bg-ko-brand-primary hover:bg-ko-brand-secondary text-white rounded-lg py-2 px-4 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('plugins.forum.components.color_picker.apply')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
