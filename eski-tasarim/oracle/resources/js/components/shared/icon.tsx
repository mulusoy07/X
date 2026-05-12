import { memo } from 'react'
import type { CSSProperties } from 'react'
import * as TablerIcons from '@tabler/icons-react'

interface IconProps {
  name: string
  size?: number
  className?: string
  stroke?: number
  style?: CSSProperties
}

export const Icon = memo(({ name, size = 24, className = '', stroke = 2, style }: IconProps) => {
  const iconName = 'Icon' + name
    .replace('ti ti-', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  const IconComponent = (TablerIcons as any)[iconName]

  if (!IconComponent) {
    return <span className={className} style={{ width: size, height: size, display: 'inline-block', ...style }} />
  }

  return (
    <IconComponent
      size={size}
      className={className}
      stroke={stroke}
      style={style}
    />
  )
})

Icon.displayName = 'Icon'
